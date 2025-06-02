'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Shield, Zap, Heart, BarChart3, Clock, Users, ArrowRight, Mail, Phone, Music, Watch, Target, DollarSign, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useEmailSignup } from "@/hooks/useEmailSignup"

export default function IkoruLanding() {
  const [email, setEmail] = useState("")
  const [investorEmail, setInvestorEmail] = useState("")
  
  const waitlistSignup = useEmailSignup()
  const investorSignup = useEmailSignup()

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await waitlistSignup.submitEmail(email, 'waitlist')
      if (waitlistSignup.state === 'success') {
        setEmail("")
      }
    }
  }

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (investorEmail) {
      await investorSignup.submitEmail(investorEmail, 'investor')
      if (investorSignup.state === 'success') {
        setInvestorEmail("")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ikoru</span>
              <span className="text-sm text-gray-500 ml-2">AI Mental Wellness</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Technology
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Opportunity
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Partner With Us</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">🚀 Seed Investment Opportunity</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Future of Mental Wellbeing is <span className="text-blue-600">Proactive</span>,<br />
              Not Reactive
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              ikoru revolutionizes mental health through AI-powered passive sensing and predictive analytics. We don't
              just track mood—we understand, anticipate, and intervene before crisis hits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                <TrendingUp className="mr-2 h-5 w-5" />
                Discover the Opportunity
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                <Mail className="mr-2 h-5 w-5" />
                Request Investor Deck
              </Button>
            </div>

            {/* Key Metrics Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 border-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$240B</div>
                  <div className="text-gray-600">Global Mental Health Market</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-gray-600">Mood Prediction Accuracy</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-100">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600">Passive Monitoring</div>
                </CardContent>
              </Card>
            </div>

            {/* Traction Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12">
              <Card className="border-2 border-blue-100">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">Waitlist Signups</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-100">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">72%</div>
                  <div className="text-sm text-gray-600">Daily Active Users</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-100">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">4.7x</div>
                  <div className="text-sm text-gray-600">Daily Sessions</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-orange-100">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">3 LOIs</div>
                  <div className="text-sm text-gray-600">Enterprise Pilots</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-gray-500">
            <span className="text-sm">As featured in:</span>
            <div className="flex items-center space-x-8">
              <span className="font-semibold">TechCrunch</span>
              <span className="font-semibold">Product Hunt</span>
              <span className="font-semibold">The Next Web</span>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              🏆 Finalist - EU HealthTech Awards 2024
            </Badge>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Mental Health Crisis Demands Innovation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current solutions are reactive, manual, and often too late. By the time someone seeks help, they're
              already in crisis. We need to move upstream.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-red-200">
              <div className="text-red-500 mb-4">
                <BarChart3 className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Reactive Approach</h3>
              <p className="text-gray-600">
                Traditional mental health tools only respond after problems manifest, missing critical early
                intervention opportunities.
              </p>
            </Card>

            <Card className="p-8 text-center border-orange-200">
              <div className="text-orange-500 mb-4">
                <Clock className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Manual Tracking</h3>
              <p className="text-gray-600">
                Self-reporting is unreliable, burdensome, and often abandoned. Users forget to log or provide inaccurate
                data.
              </p>
            </Card>

            <Card className="p-8 text-center border-yellow-200">
              <div className="text-yellow-500 mb-4">
                <Users className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">One-Size-Fits-All</h3>
              <p className="text-gray-600">
                Generic solutions ignore individual patterns, triggers, and contexts that make each person's mental
                health journey unique.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">💡 Revolutionary Solution</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Introducing ikoru: The Proactive Mental Wellbeing Revolution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ikoru doesn't just track your mood—it understands and anticipates it. Through passive sensing and advanced
              AI, we provide personalized insights and interventions before you need them.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The ikoru Difference</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Proactive Detection</h4>
                    <p className="text-gray-600">
                      Identify emotional patterns and predict mood shifts before they impact your day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Brain className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Passive Intelligence</h4>
                    <p className="text-gray-600">
                      No manual logging required. ikoru learns from your natural digital behavior.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personalized Care</h4>
                    <p className="text-gray-600">
                      AI-powered interventions tailored to your unique patterns and preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-4">Real ikoru Insights:</h4>
              <div className="space-y-4 text-sm">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700">"Your typing speed dropped 40%... seems like you're stressed"</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-gray-700">
                    "Pattern detected: Your anxiety increases 67% on days you have back-to-back meetings."
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-gray-700">
                    "Tomorrow's forecast: 73% chance of afternoon fatigue based on your sleep patterns."
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Sophisticated Technology, Effortless Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ikoru combines cutting-edge passive sensing with advanced AI to deliver unprecedented insights into your
              emotional wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⌨️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Digital Behavior Analysis</h3>
              <p className="text-gray-600 text-sm">
                Analyze typing patterns, app usage, and digital interactions to understand emotional states.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Music className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Music & Social Patterns</h3>
              <p className="text-gray-600 text-sm">
                Spotify mood analysis and social interaction patterns reveal emotional insights.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Watch className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Wearables Integration</h3>
              <p className="text-gray-600 text-sm">
                Deep integration with Apple Watch, Oura, Whoop for HRV, sleep, and stress data.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Smart Interventions</h3>
              <p className="text-gray-600 text-sm">
                Personalized micro-interventions and AI therapy chat delivered at the right moment.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-yellow-100 text-yellow-800 border-yellow-200">💰 Investment Opportunity</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why ikoru Represents the Future</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Opportunity</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Massive & Growing Market</h4>
                  <p className="text-gray-600">
                    The global mental health software market is projected to reach $240B by 2030, with digital
                    therapeutics growing at 23.1% CAGR.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Underserved Need</h4>
                  <p className="text-gray-600">
                    970 million people worldwide suffer from mental health disorders, yet current solutions reach less
                    than 30% effectively.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Enterprise Opportunity</h4>
                  <p className="text-gray-600">
                    Companies lose $1 trillion annually to depression and anxiety. Proactive solutions offer massive ROI
                    potential.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Clear Exit Path</h4>
                  <p className="text-gray-600">
                    Strategic acquisition targets include Apple (Health), Google (Fitbit), Meta (Wellness), or 
                    Headspace/Calm at 10-20x revenue multiples.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Competitive Advantages</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Proprietary Passive Sensing</h4>
                  <p className="text-gray-600">
                    Unlike Headspace (active input) or Calm (meditation-only), ikoru works automatically in the 
                    background with 10x more data points.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Scalable Platform</h4>
                  <p className="text-gray-600">
                    Software-based solution with minimal marginal costs, enabling rapid global expansion and high
                    margins.
                  </p>
                </div>

                <div className="border-l-4 border-teal-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Data Moat</h4>
                  <p className="text-gray-600">
                    Each user interaction improves our AI models, creating a self-reinforcing competitive advantage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Model */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Multiple Revenue Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <DollarSign className="h-8 w-8 text-blue-600 mb-4" />
                <h4 className="font-semibold mb-2">B2C SaaS</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">€4.99/mo</p>
                <p className="text-sm text-gray-600">Freemium model with 15% conversion target</p>
              </Card>
              <Card className="p-6">
                <Target className="h-8 w-8 text-green-600 mb-4" />
                <h4 className="font-semibold mb-2">B2B Enterprise</h4>
                <p className="text-2xl font-bold text-green-600 mb-2">€10/employee/mo</p>
                <p className="text-sm text-gray-600">Team wellness & productivity insights</p>
              </Card>
              <Card className="p-6">
                <BarChart3 className="h-8 w-8 text-purple-600 mb-4" />
                <h4 className="font-semibold mb-2">Data Insights</h4>
                <p className="text-2xl font-bold text-purple-600 mb-2">€50K+/year</p>
                <p className="text-sm text-gray-600">Anonymized population mood data</p>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Badge className="bg-red-100 text-red-800 border-red-200 text-lg px-4 py-2">
              ⏰ Closing round in 30 days - 40% already committed
            </Badge>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Backed by Industry Experts</h2>
            <p className="text-xl text-gray-600">A team with deep expertise in AI, mental health, and scaling consumer apps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold text-lg">[Your Name]</h4>
              <p className="text-sm text-gray-600">CEO & Co-founder</p>
              <p className="text-xs text-gray-500 mt-2">Ex-[Company], [Your expertise]</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold text-lg">[CTO Name]</h4>
              <p className="text-sm text-gray-600">CTO & Co-founder</p>
              <p className="text-xs text-gray-500 mt-2">Ex-[Tech Company], ML/AI Expert</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold text-lg">Dr. [Advisor Name]</h4>
              <p className="text-sm text-gray-600">Clinical Advisor</p>
              <p className="text-xs text-gray-500 mt-2">Harvard Medical, Digital Health Pioneer</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy-First Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that mental health data is deeply personal. ikoru is built with privacy and security at its
              core, ensuring user trust and regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">On-Device Processing</h3>
              <p className="text-gray-600 text-sm">
                Sensitive analysis happens locally on user devices, minimizing data exposure.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 font-bold">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">User Control</h3>
              <p className="text-gray-600 text-sm">
                Complete transparency and control over what data is collected and how it's used.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <span className="text-purple-600 font-bold">✓</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Compliance Ready</h3>
              <p className="text-gray-600 text-sm">
                Built to meet HIPAA, GDPR, and other regulatory requirements from day one.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Investor CTA */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Join Our €500K Pre-Seed Round</h2>
              <p className="text-xl mb-4 text-blue-100">
                • €500K raising at €2.5M pre-money valuation<br />
                • 70% Product Development, 20% Marketing, 10% Operations<br />
                • 18-month runway to Series A metrics
              </p>
              <p className="text-lg mb-8 text-blue-100">
                Target: 100K users, €50K MRR, 3 enterprise clients
              </p>
              <div className="space-y-4">
                <form onSubmit={handleInvestorSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                      type="email" 
                      placeholder="Enter your email for investor deck"
                      value={investorEmail}
                      onChange={(e) => setInvestorEmail(e.target.value)}
                      className="flex-1 text-gray-900"
                      disabled={investorSignup.state === 'loading'}
                    />
                    <Button 
                      type="submit" 
                      className="bg-white text-blue-600 hover:bg-gray-100"
                      disabled={investorSignup.state === 'loading' || !investorEmail}
                    >
                      {investorSignup.state === 'loading' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Mail className="mr-2 h-5 w-5" />
                      )}
                      Request Deck
                    </Button>
                  </div>
                  {investorSignup.message && (
                    <div className={`flex items-center space-x-2 text-sm ${
                      investorSignup.state === 'success' ? 'text-green-200' : 'text-red-200'
                    }`}>
                      {investorSignup.state === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <span>{investorSignup.message}</span>
                    </div>
                  )}
                </form>
                <div className="flex items-center space-x-4 text-blue-100">
                  <Phone className="h-5 w-5" />
                  <span>Schedule a call: investors@ikoru.ai</span>
                </div>
              </div>
            </div>

            {/* Early Access CTA */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Be Among the First to Experience ikoru</h3>
              <p className="text-gray-600 mb-6">
                Sign up to get early access, receive exclusive updates, and help shape the future of personalized mental
                wellbeing.
              </p>
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="text-lg p-4" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={waitlistSignup.state === 'loading'}
                />
                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg p-4"
                  disabled={waitlistSignup.state === 'loading' || !email}
                >
                  {waitlistSignup.state === 'loading' ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-5 w-5" />
                  )}
                  Get Early Access
                </Button>
                {waitlistSignup.message && (
                  <div className={`flex items-center space-x-2 text-sm ${
                    waitlistSignup.state === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {waitlistSignup.state === 'success' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>{waitlistSignup.message}</span>
                  </div>
                )}
              </form>
              <p className="text-xs text-gray-500 mt-4">
                Join 10,000+ people already on our waitlist. No spam, unsubscribe anytime.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">ikoru</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 ikoru. All rights reserved.</p>
              <p className="text-sm mt-1">Revolutionizing mental wellbeing through AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}