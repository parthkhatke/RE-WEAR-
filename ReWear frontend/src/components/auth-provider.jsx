"use client"

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("rewear_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = {
      id: "1",
      email,
      name: email.split("@")[0],
      points: 150,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setUser(mockUser)
    localStorage.setItem("rewear_user", JSON.stringify(mockUser))
  }

  const signup = async (email, password, name) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = {
      id: "1",
      email,
      name,
      points: 50, // Welcome bonus
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setUser(mockUser)
    localStorage.setItem("rewear_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rewear_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
