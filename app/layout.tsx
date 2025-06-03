// app/layout.tsx
// REPLACE YOUR EXISTING app/layout.tsx FILE WITH THIS CONTENT

import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'ikoru - AI Mental Wellness',
  description: 'Proactive mental health through AI-powered insights',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

// CHANGES MADE:
// 1. Added import for Providers component
// 2. Wrapped {children} with <Providers> component
// 3. This enables NextAuth session management throughout the app