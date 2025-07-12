"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./auth-provider"
import { useToast } from "@/hooks/use-toast"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isLogin) {
        await login(email, password)
        toast({
          title: "Login Successful!",
          description: "Welcome back to ReWear.",
        })
      } else {
        await signup(email, password, name)
        toast({
          title: "Signup Successful!",
          description: "Welcome to ReWear! Your account has been created.",
        })
      }
      navigate("/") // Redirect to home or dashboard after successful auth
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-off-white to-soft-lilac-gray p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg animate-fade-in">
        <CardHeader className="text-center space-y-2 pt-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <Recycle className="h-10 w-10 text-electric-violet" />
            <span className="text-4xl font-extrabold text-charcoal-black">ReWear</span>
          </Link>
          <CardTitle className="text-3xl font-bold text-charcoal-black">
            {isLogin ? "Welcome Back!" : "Join ReWear Today!"}
          </CardTitle>
          <p className="text-gray-600">{isLogin ? "Sign in to your account" : "Create your account to get started"}</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-soft-lilac-gray focus:border-electric-violet focus:ring-electric-violet"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-electric-violet hover:bg-electric-violet-dark text-off-white text-lg font-semibold shadow-md transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-off-white border-t-transparent"></div>
                  <span>{isLogin ? "Signing In..." : "Signing Up..."}</span>
                </div>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-electric-violet hover:text-electric-violet-dark px-0"
              disabled={isLoading}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
