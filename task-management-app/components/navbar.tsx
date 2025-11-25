"use client"

import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useState, useEffect } from "react"

interface NavbarProps {
  user: { email: string }
  onLogout: () => void
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    setIsDark(!isDark)
    localStorage.setItem("theme", isDark ? "light" : "dark")
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      onLogout()
    }
  }

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">TaskMaster</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </Button>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
