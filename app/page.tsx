"use client"

import { useState, useEffect } from "react"
import { PixelatedButton } from "@/components/pixelated-ui"
import { SoundManager } from "@/components/sound-manager"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const router = useRouter()

  useEffect(() => {
    // Create random sparkles
    const createSparkle = () => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }
      setSparkles((prev) => [...prev, newSparkle])

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
      }, 1500)
    }

    const interval = setInterval(createSparkle, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleStartClick = () => {
    // Play start sound
    if ((window as any).playStartSound) {
      ;(window as any).playStartSound()
    }

    sessionStorage.setItem("userHasInteracted", "true")
    sessionStorage.setItem("cameFromHomePage", "true")
    sessionStorage.setItem("interactionTimestamp", Date.now().toString())

    // Also set in localStorage for audio preferences persistence
    localStorage.setItem("userHasInteracted", "true")
    localStorage.setItem("cameFromHomePage", "true")

    // Navigate to portfolio
    router.push("/portfolio")
  }

  const handleButtonHover = () => {
    // Play hover sound
    if ((window as any).playPixelSound) {
      ;(window as any).playPixelSound(600, 80)
    }
  }

  const handleSocialClick = (platform: string) => {
    if ((window as any).playPixelSound) {
      ;(window as any).playPixelSound(800, 100)
    }

    const links = {
      github: "https://github.com/victortorres",
      linkedin: "https://linkedin.com/in/victortorres",
      instagram: "https://twitter.com/victortorres",
    }

    window.open(links[platform as keyof typeof links], "_blank", "noopener,noreferrer")
  }

  return (
    <SoundManager>
      <div
        className="min-h-screen relative overflow-hidden font-mono text-[#594c3d] scanlines pixel-grid"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#e1dac5]/40" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Pixels */}
          <div className="absolute top-20 left-20 w-5 h-5 bg-[#a5da60] opacity-60 float-animation" />
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-[#fcab0b] opacity-50 float-animation"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-32 left-40 w-5 h-5 bg-[#1e4b56] opacity-40 float-animation"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-60 right-20 w-3 h-3 bg-[#c557e1] opacity-50 float-animation"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-20 right-40 w-5 h-5 bg-[#df644c] opacity-45 float-animation"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Dynamic Sparkles */}
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute w-2 h-2 bg-[#a5da60] pixel-sparkle"
              style={{
                left: sparkle.x,
                top: sparkle.y,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          {/* Title */}
          <div className="mb-16 float-animation">
            <h1 className="text-8xl font-bold text-[#594c3d] mb-4 tracking-wider drop-shadow-lg">PIXEL</h1>
            <h2 className="text-6xl font-bold text-[#1e4b56] mb-6 tracking-wider drop-shadow-lg">PORTFOLIO</h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-1 bg-[#a5da60]" />
              <div className="w-5 h-5 bg-[#fcab0b] rotate-45" />
              <div className="w-16 h-1 bg-[#a5da60]" />
            </div>
            <p className="text-2xl text-[#594c3d] font-medium tracking-wide opacity-80">
              DESENVOLVEDOR FULL-STACK • REACT & NODE.JS
            </p>
          </div>

          {/* Start Button - Corrigido */}
          <div className="relative mb-12">
            <Link href="/portfolio">
              <PixelatedButton
                variant="green"
                className="text-3xl px-16 py-6 pixel-cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={handleStartClick}
                onMouseEnter={handleButtonHover}
              >
                📁 VER PORTFÓLIO
              </PixelatedButton>
            </Link>
          </div>

          {/* Social Media - Centralizado */}
          <div className="mb-12">
            <div className="text-lg text-[#594c3d] tracking-wide mb-6 opacity-80">CONECTE-SE COMIGO:</div>
            <div className="flex items-center justify-center gap-6">
              <PixelatedButton
                variant="default"
                className="p-4 pixel-cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => handleSocialClick("github")}
                onMouseEnter={handleButtonHover}
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </PixelatedButton>

              <PixelatedButton
                variant="blue"
                className="p-4 pixel-cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => handleSocialClick("linkedin")}
                onMouseEnter={handleButtonHover}
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </PixelatedButton>

              <PixelatedButton
                variant="twitter"
                className="p-4 pixel-cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => handleSocialClick("twitter")}
                onMouseEnter={handleButtonHover}
                title="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </PixelatedButton>
            </div>
          </div>

          {/* Subtitle */}
          <div className="opacity-70">
            <p className="text-lg text-[#594c3d] tracking-wide">EXPLORE MEUS PROJETOS E HABILIDADES</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-[#a5da60] animate-pulse" />
              <div className="w-2 h-2 bg-[#fcab0b] animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-[#c557e1] animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 opacity-60">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#1e4b56] opacity-50" />
            ))}
          </div>
        </div>

        <div className="absolute top-8 right-8 opacity-60">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#fcab0b] opacity-50" />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-8 opacity-60">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#c557e1] opacity-50" />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 opacity-60">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#df644c] opacity-50" />
            ))}
          </div>
        </div>

        {/* Version Info */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[#594c3d] opacity-50 text-sm">
          VERSION 1.0.0 - PIXEL EDITION
        </div>
      </div>
    </SoundManager>
  )
}
