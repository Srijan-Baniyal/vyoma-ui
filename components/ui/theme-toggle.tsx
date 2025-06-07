"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 px-0">
        <div className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 px-0 hover:bg-muted rounded-full transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <Sun 
          className={`h-4 w-4 transition-all duration-500 ${
            theme === "light" 
              ? "rotate-0 scale-100" 
              : "rotate-90 scale-0"
          }`} 
        />
        <Moon 
          className={`absolute top-0 left-0 h-4 w-4 transition-all duration-500 ${
            theme === "dark" 
              ? "rotate-0 scale-100" 
              : "-rotate-90 scale-0"
          }`} 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 