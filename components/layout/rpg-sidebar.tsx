"use client"

import { PixelatedBox } from "@/components/pixelated-ui"
import { Sword, Shield, Zap } from "lucide-react"

interface RPGSidebarProps {
  onButtonClick: () => void
}

export function RPGSidebar({ onButtonClick }: RPGSidebarProps) {
  const developerStats = {
    attack: 90,
    defense: 92,
    magic: 95,
  }

  return (
    <div className="absolute right-6 top-48 bottom-6 z-10">
      <div className="space-y-4 h-full flex flex-col">
        {/* Combat Stats - Apenas stats, sem conquistas */}
        <div className="grid grid-cols-3 gap-4">
          <PixelatedBox variant="red" className="p-4 text-center">
            <Sword className="w-5 h-5 mx-auto mb-2" />
            <div className="text-xs font-bold">ATTACK</div>
            <div className="text-xl font-bold">{developerStats.attack}</div>
            <div className="text-xs opacity-70">PODER DE IMPLEMENTAÇÃO</div>
          </PixelatedBox>

          <PixelatedBox variant="green" className="p-4 text-center">
            <Shield className="w-5 h-5 mx-auto mb-2" />
            <div className="text-xs font-bold">DEFENSE</div>
            <div className="text-xl font-bold">{developerStats.defense}</div>
            <div className="text-xs opacity-70">DOMÍNIO NA HORA DO PERRENGUE</div>
          </PixelatedBox>

          <PixelatedBox variant="purple" className="p-4 text-center">
            <Zap className="w-5 h-5 mx-auto mb-2" />
            <div className="text-xs font-bold">MAGIC</div>
            <div className="text-xl font-bold">{developerStats.magic}</div>
            <div className="text-xs opacity-70">INOVAÇÃO E ENGENHO</div>
          </PixelatedBox>
        </div>       
      </div>
    </div>
  )
}
