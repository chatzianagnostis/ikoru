// components/Providers.tsx
// CREATE THIS FILE IN THE components/ DIRECTORY (create the directory if it doesn't exist)

'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}