"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menu,
  X,
  Brain,
  BarChart3,
  SnowflakeIcon as Crystal,
  Target,
  Play,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { useEmailSignup } from "@/hooks/useEmailSignup"

export default function VibeCheckLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [ctaEmail, setCtaEmail] = useState("")

  // Email signup hooks for different forms
  const heroSignup = useEmailSignup()
  const ctaSignup = useEmailSignup()

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleHeroEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await heroSignup.submitEmail(email, 'waitlist')
      if (heroSignup.state === 'success') {
        setEmail("")
      }
    }
  }

  const handleCtaEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (ctaEmail) {
      await ctaSignup.submitEmail(ctaEmail, 'waitlist')
      if (ctaSignup.state === 'success') {
        setCtaEmail("")
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-violet-400">iKORU</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                How it Works
              </a>
              <a href="#early-access" className="text-slate-300 hover:text-white transition-colors">
                Early Access
              </a>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">Get Started</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                  How it Works
                </a>
                <a href="#early-access" className="text-slate-300 hover:text-white transition-colors">
                  Early Access
                </a>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white w-full">Get Started</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-slate-950 to-slate-900"></div>

        {/* Floating Animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Making <span className="text-violet-400">emotional intelligence</span> as easy as checking the weather 
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Stop guessing why you feel anxious. AI-powered mood tracking that reveals your hidden patterns with zero
                effort.
              </p>

              <form onSubmit={handleHeroEmailSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  required
                  disabled={heroSignup.state === 'loading'}
                />
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                  disabled={heroSignup.state === 'loading' || !email}
                >
                  {heroSignup.state === 'loading' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Join Waitlist →
                </Button>
              </form>

              {/* Success/Error Messages */}
              {heroSignup.message && (
                <div className={`flex items-center space-x-2 text-sm mb-4 ${
                  heroSignup.state === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {heroSignup.state === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span>{heroSignup.message}</span>
                </div>
              )}

              <p className="text-sm text-slate-400">🎁 First 500 users get lifetime 50% off</p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-700">
                  <div className="bg-slate-700 rounded-2xl h-full p-4 flex flex-col">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-violet-400">Today's Mood</h3>
                      <div className="text-3xl mt-2">😌</div>
                      <p className="text-sm text-slate-300 mt-1">Calm & Focused</p>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="bg-slate-600 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Energy</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-slate-500 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>

                      <div className="bg-slate-600 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Stress</span>
                          <span>23%</span>
                        </div>
                        <div className="w-full bg-slate-500 rounded-full h-2">
                          <div className="bg-violet-500 h-2 rounded-full w-1/4"></div>
                        </div>
                      </div>

                      <div className="bg-slate-600 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Focus</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-slate-500 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              😔 The Hidden Cost of Not Understanding Your Emotions
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🤯</div>
                <h3 className="text-xl font-semibold mb-4 text-violet-400">Unexplained Anxiety</h3>
                <p className="text-slate-300">"73% of people can't identify their stress triggers"</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">💸</div>
                <h3 className="text-xl font-semibold mb-4 text-violet-400">Expensive Solutions</h3>
                <p className="text-slate-300">"Therapy costs €100+/session"</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-semibold mb-4 text-violet-400">Apps That Don't Work</h3>
                <p className="text-slate-300">"87% abandon meditation apps in 30 days"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ✨ Finally, Therapy-Level Insights Without the Therapist Price
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Install in 2 Minutes</h3>
              <p className="text-slate-300">"Quick setup, no lengthy questionnaires"</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">AI Learns Your Patterns</h3>
              <p className="text-slate-300">"Tracks mood through typing, music, sleep"</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Get Actionable Insights</h3>
              <p className="text-slate-300">"Discover why Tuesday afternoons drain you"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🚀 Features That Actually Make a Difference</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-violet-400">Passive Tracking</h3>
                <p className="text-slate-300 text-sm">"Zero effort required. Works in background."</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-emerald-400">Pattern Detection</h3>
                <p className="text-slate-300 text-sm">"Identifies your personal emotional triggers"</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <Crystal className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Mood Predictions</h3>
                <p className="text-slate-300 text-sm">"78% accurate next-day mood forecasts"</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-orange-400">Smart Interventions</h3>
                <p className="text-slate-300 text-sm">"Right help at the right moment"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions? We've Got Answers</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Is my data private?",
                answer: "Yes, encrypted and never sold. You own your data.",
              },
              {
                question: "How is this different from meditation apps?",
                answer: "No daily commitment. It works automatically.",
              },
              {
                question: "What devices are supported?",
                answer: "iOS and Android, with Apple Watch and Fitbit.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-violet-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-violet-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-300">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="early-access" className="py-20 bg-gradient-to-br from-violet-600/20 via-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Understand Your Emotions?</h2>
          <p className="text-xl text-slate-300 mb-8">Join early adopters transforming their mental health</p>

          <form onSubmit={handleCtaEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={ctaEmail}
              onChange={(e) => setCtaEmail(e.target.value)}
              className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              required
              disabled={ctaSignup.state === 'loading'}
            />
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              disabled={ctaSignup.state === 'loading' || !ctaEmail}
            >
              {ctaSignup.state === 'loading' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Get Early Access →
            </Button>
          </form>

          {/* Success/Error Messages */}
          {ctaSignup.message && (
            <div className={`flex items-center justify-center space-x-2 text-sm mb-4 ${
              ctaSignup.state === 'success' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {ctaSignup.state === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span>{ctaSignup.message}</span>
            </div>
          )}

          <p className="text-sm text-slate-400">⏰ Limited spots available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400">Made with 💜 in Greece</p>
            </div>

            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="/admin" className="text-slate-400 hover:text-white transition-colors">
                Admin
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Blog
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}