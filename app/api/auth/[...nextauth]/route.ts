// app/api/auth/[...nextauth]/route.ts
// CREATE THIS FILE IN app/api/auth/[...nextauth]/ DIRECTORY
// First create the directory: mkdir -p app/api/auth/[...nextauth]

import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }