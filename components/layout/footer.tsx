"use client"

import { PixelatedBox } from "@/components/pixelated-ui"
import { Heart, Code, Coffee } from "lucide-react"

interface FooterProps {
  isMobile?: boolean
}

export function Footer({ isMobile = false }: FooterProps) {
  const currentYear = new Date().getFullYear()

  if (isMobile) {
    // Footer mais compacto e bem posicionado para mobile
    return (
      <div className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-[#e1dac5]/90 backdrop-blur-sm">
        <PixelatedBox variant="default" className="px-4 py-3 text-center">
          <div className="text-xs font-bold">© {currentYear} VICTOR TORRES • TODOS OS DIREITOS RESERVADOS</div>
        </PixelatedBox>
      </div>
    )
  }

  // Footer completo para desktop
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 p-4 md:p-6">
      <div className="flex justify-center">
        <PixelatedBox variant="default" className="px-6 py-3 text-center">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <span></span>
            </div>
            <div className="flex items-center gap-1">
              <span>FEITO COM</span>
              <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              <Code className="w-3 h-3 text-blue-500" />
              <Coffee className="w-3 h-3 text-orange-500" />
            </div>
          </div>
          <div className="text-xs opacity-60 mt-1">© {currentYear} VICTOR TORRES • TODOS OS DIREITOS RESERVADOS</div>
        </PixelatedBox>
      </div>
    </div>
  )
}
