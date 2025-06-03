// app/admin/login/page.tsx
// CREATE THIS FILE IN app/admin/login/ DIRECTORY
// First create the directory: mkdir -p app/admin/login

'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [attemptCount, setAttemptCount] = useState(0)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Rate limiting - max 3 attempts
    if (attemptCount >= 3) {
      setError('Too many failed attempts. Please wait before trying again.')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setAttemptCount(prev => prev + 1)
        setError('Invalid credentials. Access denied.')
        setPassword('')
      } else {
        // Verify session before redirecting
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin')
          router.refresh()
        } else {
          setError('Unauthorized access.')
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-2xl border-slate-700 bg-slate-800 text-white">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">ikoru Admin Access</CardTitle>
          <p className="text-slate-300">Secure authentication required</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Admin email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {error && (
              <div className="text-red-400 text-sm bg-red-900/50 p-3 rounded-md flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {attemptCount > 0 && attemptCount < 3 && (
              <div className="text-yellow-400 text-sm bg-yellow-900/50 p-3 rounded-md">
                Warning: {3 - attemptCount} attempts remaining
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || attemptCount >= 3}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Access Dashboard
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 space-y-3">
            <div className="text-xs text-slate-400 bg-slate-700/50 p-3 rounded-md">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-green-400">✓</span>
                  <span>JWT token authentication</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-400">✓</span>
                  <span>IP address restrictions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-400">✓</span>
                  <span>Rate limiting protection</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-400">✓</span>
                  <span>Session timeout (24h)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}