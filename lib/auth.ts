// lib/auth.ts
// CREATE THIS FILE IN THE lib/ DIRECTORY

import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check against environment variables for admin access
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "admin",
            email: adminEmail,
            name: "Admin",
            role: "admin"
          }
        }

        // Check against database users (for future expansion)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (user && user.password) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}