'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Mail, Calendar, Download } from 'lucide-react'

interface EmailSignup {
  id: string
  email: string
  source: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [signups, setSignups] = useState<EmailSignup[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    waitlist: 0,
    investor: 0,
    today: 0
  })

  useEffect(() => {
    fetchSignups()
  }, [])

  const fetchSignups = async () => {
    try {
      const response = await fetch('/api/signup')
      if (response.ok) {
        const data = await response.json()
        setSignups(data)
        calculateStats(data)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading signups...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ikoru Admin Dashboard</h1>
          <p className="text-gray-600">Manage email signups and track growth metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Signups</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waitlist</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.waitlist}</p>
                </div>
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Investor Interest</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.investor}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">💰</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Signups Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Signups</CardTitle>
            <Button onClick={exportToCsv} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((signup) => (
                    <tr key={signup.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{signup.email}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            signup.source === 'investor' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                          }
                        >
                          {signup.source}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(signup.createdAt).toLocaleDateString()} at{' '}
                        {new Date(signup.createdAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {signups.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No signups yet. Start promoting your landing page!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}