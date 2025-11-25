"use client"

import { useEffect, useState } from "react"
import LoginForm from "@/components/login-form"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if session exists
    const session = sessionStorage.getItem("user")
    if (session) {
      setUser(JSON.parse(session))
    }
    setLoading(false)
  }, [])

  const handleLogin = (email: string) => {
    const userData = { email }
    sessionStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    setUser(null)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return user ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />
}
