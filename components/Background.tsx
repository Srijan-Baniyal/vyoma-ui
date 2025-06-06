"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Define Vanta.js types
declare global {
  interface Window {
    VANTA: {
      WAVES: (config: {
        el: HTMLElement
        mouseControls?: boolean
        touchControls?: boolean
        gyroControls?: boolean
        minHeight?: number
        minWidth?: number
        scale?: number
        scaleMobile?: number
        color?: number
        backgroundColor?: number
        shininess?: number
        waveHeight?: number
        waveSpeed?: number
        zoom?: number
        forceAnimate?: boolean
      }) => {
        destroy: () => void
      }
    }
    THREE: object
  }
}

export default function HeroSection() {
  // Animation visibility state
  const [isVisible, setIsVisible] = useState(false)

  // Mouse tracking for subtle effects
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Vanta.js references and state
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<{ destroy: () => void } | null>(null)
  const [vantaLoaded, setVantaLoaded] = useState(false)

  // Initialize visibility for entrance animations
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Track mouse position for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Initialize Vanta.js background
  useEffect(() => {
    const loadVanta = async () => {
      if (typeof window !== "undefined" && vantaRef.current && !vantaEffect.current) {
        try {
          // Load Three.js
          if (!window.THREE) {
            const script1 = document.createElement("script")
            script1.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
            document.head.appendChild(script1)

            await new Promise((resolve, reject) => {
              script1.onload = resolve
              script1.onerror = reject
              setTimeout(reject, 5000) // 5 second timeout
            })
          }

          // Load Vanta Waves
          if (!window.VANTA) {
            const script2 = document.createElement("script")
            script2.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
            document.head.appendChild(script2)

            await new Promise((resolve, reject) => {
              script2.onload = resolve
              script2.onerror = reject
              setTimeout(reject, 5000) // 5 second timeout
            })
          }

          // Initialize Vanta effect with theme-proof settings (always black)
          if (window.VANTA && window.THREE && vantaRef.current) {
            vantaEffect.current = window.VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x000000, // Pure black
              backgroundColor: 0x000000, // Pure black
              shininess: 30.0,
              waveHeight: 20.0,
              waveSpeed: 1.0,
              zoom: 1.0,
              forceAnimate: true,
            })
            setVantaLoaded(true)
          }
        } catch (error) {
          console.warn("Vanta.js failed to load:", error)
          setVantaLoaded(false)
        }
      }
    }

    const timer = setTimeout(loadVanta, 100)

    return () => {
      clearTimeout(timer)
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy()
        } catch (error) {
          console.warn("Error destroying Vanta effect:", error)
        }
        vantaEffect.current = null
      }
    }
  }, [])

  return (
    <>
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Vanta.js Animation Layer */}
      <div
        ref={vantaRef}
        className="absolute inset-0 z-10"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          background: "#000000",
        }}
      />

      {/* Loading Indicator */}
      {!vantaLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Theme-proof Overlay */}
      <div className="absolute inset-0 bg-black/10 z-20" />

      {/* Main Content Layer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 h-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-white leading-[0.8] tracking-tighter mb-12 uppercase">
              <span className="block">TRULY</span>
              <span className="block">BEYOND</span>
              <span className="block text-gray-300">UI</span>
            </h1>
          </div>

          {/* Tagline */}
          <div
            className={`mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-wide">
              DESIGNED WITH <span className="font-black text-white">SPATIAL WISDOM</span> INSIDE.
            </p>
          </div>

          {/* Description */}
          <div
            className={`mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "0.7s" }}
          >
            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light mb-6">
                A UI design system born from silence, depth, and clarity — inspired by the infinite space above and the
                intelligence within.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
                Every element flows with intention.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`mb-24 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "0.9s" }}
          >
            <div className="flex justify-center">
              <Button
                size="lg"
                className="group relative px-20 py-8 bg-white text-black hover:bg-gray-100 border-0 rounded-none text-xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
                aria-label="Get started with the system"
              >
                <span className="flex items-center gap-4">
                  <Link href="/get-started/introduction">
                    GET STARTED
                  </Link>
                  <div className="w-8 h-px bg-black transition-all group-hover:w-16" />
                </span>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "1.1s" }}
          >
            <div className="flex justify-center items-center gap-20 lg:gap-32">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 tabular-nums">∞</div>
                <div className="text-gray-300 text-xs uppercase tracking-[0.3em] font-light">
                  SPACE
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 tabular-nums">01</div>
                <div className="text-gray-300 text-xs uppercase tracking-[0.3em] font-light">
                  SYSTEM
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 tabular-nums">∅</div>
                <div className="text-gray-300 text-xs uppercase tracking-[0.3em] font-light">
                  SILENCE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
