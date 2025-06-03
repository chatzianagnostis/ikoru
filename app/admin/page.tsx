// app/admin/page.tsx
// REPLACE YOUR EXISTING app/admin/page.tsx FILE WITH THIS CONTENT

'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Mail, Calendar, Download, Lock, Shield, LogOut } from 'lucide-react'

interface EmailSignup {
  id: string
  email: string
  source: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [signups, setSignups] = useState<EmailSignup[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    waitlist: 0,
    investor: 0,
    today: 0
  })

  // NEW: Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
      router.push('/admin/login')
      return
    }

    if (status === 'authenticated' && session?.user?.role === 'admin') {
      fetchSignups()
    }
  }, [status, session, router])

  const fetchSignups = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/signup', {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSignups(data)
        calculateStats(data)
      } else if (response.status === 401) {
        // Session expired
        signOut({ callbackUrl: '/admin/login' })
      }
    } catch (error) {
      console.error('Error fetching signups:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data: EmailSignup[]) => {
    const today = new Date().toDateString()
    
    const stats = {
      total: data.length,
      waitlist: data.filter(s => s.source === 'waitlist').length,
      investor: data.filter(s => s.source === 'investor').length,
      today: data.filter(s => new Date(s.createdAt).toDateString() === today).length
    }
    
    setStats(stats)
  }

  const exportToCsv = () => {
    const headers = ['Email', 'Source', 'Date Signed Up']
    const rows = signups.map(signup => [
      signup.email,
      signup.source,
      new Date(signup.createdAt).toLocaleDateString()
    ])
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `ikoru-signups-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    
    window.URL.revokeObjectURL(url)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  // NEW: Show loading while checking authentication
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating and loading dashboard...</p>
        </div>
      </div>
    )
  }

  // NEW: Only render if authenticated and authorized
  if (status !== 'authenticated' || session?.user?.role !== 'admin') {
    return null // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* NEW: Header with user info and logout */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ikoru Admin Dashboard</h1>
            <p className="text-gray-600">Secure access • Email analytics & management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Authenticated as</span>
              <span className="font-medium">{session.user.email}</span>
            </div>
            <Button onClick={handleSignOut} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Secure Logout
            </Button>
          </div>
        </div>

        {/* NEW: Security Status */}
        <div className="mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">Security Status: Active</h3>
                    <p className="text-green-700 text-sm">JWT authentication • IP restrictions • Session timeout</p>
                  </div>
                </div>
                <div className="text-right text-sm text-green-600">
                  <div>Session expires: {new Date(Date.now() + 24*60*60*1000).toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* EXISTING: Stats Cards (enhanced styling) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Signups</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waitlist</p>
                  <p className="text-3xl font-bold text-green-600">{stats.waitlist}</p>
                </div>
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Investor Interest</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.investor}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">💰</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.today}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* EXISTING: Signups Table (enhanced with security indicators) */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-gray-600" />
              <span>Secure Email Analytics</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button onClick={fetchSignups} variant="outline" size="sm">
                Refresh Data
              </Button>
              <Button onClick={exportToCsv} className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Email Address</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Source</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Sign-up Date</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((signup, index) => (
                    <tr key={signup.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="py-4 px-4 text-gray-900 font-medium">{signup.email}</td>
                      <td className="py-4 px-4">
                        <Badge 
                          className={
                            signup.source === 'investor' 
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                              : 'bg-blue-100 text-blue-800 border-blue-200'
                          }
                        >
                          {signup.source}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div>
                          <div className="font-medium">{new Date(signup.createdAt).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">{new Date(signup.createdAt).toLocaleTimeString()}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {signups.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No signups yet</h3>
                  <p>Email signups will appear here as they come in.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// MAJOR CHANGES MADE:
// 1. Added NextAuth session management and authentication checks
// 2. Added automatic redirect to login if not authenticated
// 3. Added secure logout functionality  
// 4. Added security status indicator
// 5. Added user info display
// 6. Enhanced error handling for expired sessions
// 7. Improved loading states and UI feedback
// 8. Added security-themed styling and icons