import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional()
})

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

// Get all email signups (for admin purposes)
export async function GET(request: NextRequest) {
  try {
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