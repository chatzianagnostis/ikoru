// app/api/signup/route.ts
// REPLACE YOUR EXISTING app/api/signup/route.ts FILE WITH THIS CONTENT

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional()
})

// POST - Public endpoint for email signups (NO CHANGES - still public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the input
    const result = emailSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const { email, source = 'waitlist' } = result.data

    // Simple rate limiting (NEW SECURITY FEATURE)
    const recentSignups = await prisma.emailSignup.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        }
      }
    })

    // Max 3 signups per 5 minutes
    if (recentSignups.length >= 3) {
      return NextResponse.json(
        { error: 'Too many signups. Please try again later.' },
        { status: 429 }
      )
    }

    // Try to create the email signup
    const emailSignup = await prisma.emailSignup.create({
      data: {
        email: email.toLowerCase(),
        source
      }
    })

    return NextResponse.json(
      { 
        message: 'Successfully signed up!',
        id: emailSignup.id 
      },
      { status: 201 }
    )

  } catch (error: any) {
    // Handle duplicate email
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already signed up!' },
        { status: 409 }
      )
    }

    console.error('Email signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// GET - NOW PROTECTED! Only authenticated admins can access emails
export async function GET(request: NextRequest) {
  try {
    // NEW: Check authentication
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      )
    }

    // NEW: Additional IP check for extra security
    const allowedIPs = process.env.ALLOWED_IPS?.split(',') || []
    if (allowedIPs.length > 0 && allowedIPs[0] !== '') {
      const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || request.ip || '127.0.0.1'
      
      if (!allowedIPs.includes(clientIP.trim())) {
        return NextResponse.json(
          { error: 'Access denied from this IP address' },
          { status: 403 }
        )
      }
    }

    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source')

    const signups = await prisma.emailSignup.findMany({
      where: source ? { source } : undefined,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(signups)
  } catch (error) {
    console.error('Error fetching signups:', error)
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    )
  }
}

// CHANGES MADE:
// 1. Added NextAuth imports and session checking
// 2. GET route now requires admin authentication 
// 3. Added IP restriction checking for extra security
// 4. Added rate limiting to POST route (3 signups per 5 minutes)
// 5. POST route remains public for users to sign up