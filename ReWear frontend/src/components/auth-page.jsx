"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Recycle, Sparkles, Users, Leaf, Shield, CheckCircle } from "lucide-react"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        })
      } else {
        await signup(email, password, name)
        toast({
          title: "Welcome to ReWear!",
          description: "Your account has been created. You've earned 50 welcome points!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-off-white flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-charcoal-black text-off-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=800&width=600"
            alt="Sustainable Fashion"
            width={600}
            height={800}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-black/80 to-charcoal-black/90"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="flex items-center space-x-3 mb-12">
            <div className="bg-electric-violet rounded-full p-3">
              <Recycle className="h-8 w-8 text-off-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-off-white">ReWear</h1>
              <p className="text-gray-600">Sustainable Fashion Exchange</p>
            </div>
          </div>

          <h2 className="text-5xl font-bold mb-8 leading-tight text-off-white">
            Fashion
            <br />
            <span className="text-electric-violet">Reimagined</span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join thousands of conscious consumers building a sustainable fashion future through community-driven
            exchange.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center space-x-4 bg-electric-violet/20 backdrop-blur-sm rounded-lg p-4 border border-electric-violet/30">
              <div className="bg-electric-violet/30 rounded-full p-2">
                <Users className="h-5 w-5 text-electric-violet" />
              </div>
              <div>
                <h4 className="font-semibold text-off-white">3K+ Community</h4>
                <p className="text-sm text-gray-600">Active users worldwide</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-electric-violet/20 backdrop-blur-sm rounded-lg p-4 border border-electric-violet/30">
              <div className="bg-electric-violet/30 rounded-full p-2">
                <Leaf className="h-5 w-5 text-electric-violet" />
              </div>
              <div>
                <h4 className="font-semibold text-off-white">8K+ kg CO₂ Saved</h4>
                <p className="text-sm text-gray-600">Environmental impact</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-electric-violet/20 backdrop-blur-sm rounded-lg p-4 border border-electric-violet/30">
              <div className="bg-electric-violet/30 rounded-full p-2">
                <Shield className="h-5 w-5 text-electric-violet" />
              </div>
              <div>
                <h4 className="font-semibold text-off-white">Verified Quality</h4>
                <p className="text-sm text-gray-600">Every item reviewed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-off-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-electric-violet rounded-full p-3">
                <Recycle className="h-8 w-8 text-off-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-charcoal-black">ReWear</h1>
                <p className="text-gray-600">Sustainable Fashion Exchange</p>
              </div>
            </div>
          </div>

          {/* Auth Card */}
          <Card className="bg-off-white border-soft-lilac-gray shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-charcoal-black">
                {isLogin ? "Welcome Back" : "Join ReWear"}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {isLogin
                  ? "Sign in to continue your sustainable fashion journey"
                  : "Create your account and start reducing textile waste today"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-charcoal-black">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet text-lg bg-off-white"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-charcoal-black">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet text-lg bg-off-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-charcoal-black">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet text-lg bg-off-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-electric-violet hover:bg-electric-violet-dark text-off-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-off-white border-t-transparent"></div>
                      <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                    </div>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      <Sparkles className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-electric-violet hover:text-electric-violet-dark font-semibold hover:underline transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>

              {/* Features for new users */}
              {!isLogin && (
                <div className="mt-8 pt-6 border-t border-soft-lilac-gray">
                  <p className="text-sm text-gray-600 mb-4 font-medium">What you'll get:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-mint-green" />
                      <span className="text-sm text-charcoal-black">50 welcome points to start</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-mint-green" />
                      <span className="text-sm text-charcoal-black">Access to premium items</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-mint-green" />
                      <span className="text-sm text-charcoal-black">Community support & ratings</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Demo Info */}
          <div className="text-center text-sm text-gray-600 bg-soft-lilac-gray rounded-lg p-6 border border-soft-lilac-gray">
            <p className="font-semibold mb-2 text-charcoal-black">🚀 Demo Mode</p>
            <p>Use any email/password combination to explore the platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}
