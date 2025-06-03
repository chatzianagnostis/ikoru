// middleware.ts
// CREATE THIS FILE IN THE ROOT DIRECTORY (same level as package.json)

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function isIPAllowed(request: NextRequest): boolean {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') || []
  
  if (allowedIPs.length === 0 || allowedIPs[0] === '') {
    return true
  }

  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : request.ip || "127.0.0.1"
  
  return allowedIPs.includes(ip.trim())
}

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl

    if (pathname.startsWith("/admin")) {
      if (!isIPAllowed(request)) {
        return new NextResponse("Access denied from this IP address", { status: 403 })
      }
    }

    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
      const token = request.nextauth.token
      
      if (!token || token.role !== "admin") {
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        return NextResponse.redirect(url)
      }
    }

    if (pathname.startsWith("/api/signup") && request.method === "GET") {
      if (!isIPAllowed(request)) {
        return new NextResponse("Access denied", { status: 403 })
      }
      
      const token = request.nextauth.token
      if (!token || token.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!req.nextUrl.pathname.startsWith("/admin")) {
          return true
        }
        
        if (req.nextUrl.pathname === "/admin/login") {
          return true
        }
        
        return !!token && token.role === "admin"
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/api/signup"]
}