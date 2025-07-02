"use client"

import { PixelatedButton } from "@/components/pixelated-ui"
import { User, Target, Mail, Gamepad2, BarChart3, BookOpen, FolderOpen } from "lucide-react"

interface SidebarProps {
  onAboutClick: () => void
  onSkillsClick: () => void
  onContactClick: () => void
  onProjectsClick: () => void
  onGameClick: () => void
  onStatsClick: () => void
  onGuideClick: () => void
  onButtonClick: () => void
}

export function Sidebar({
  onAboutClick,
  onSkillsClick,
  onContactClick,
  onProjectsClick,
  onGameClick,
  onStatsClick,
  onGuideClick,
  onButtonClick,
}: SidebarProps) {
  return (
    <div className="absolute left-6 top-48 bottom-6 z-10 w-72">
      <div className="space-y-3 h-full flex flex-col gap-1">
        <PixelatedButton
          variant="blue"
          className="w-full px-4 py-4 text-center pixel-cursor-pointer"
          onClick={() => {
            onAboutClick()
            onButtonClick()
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <User className="w-5 h-5" />
            <div className="font-bold text-base">SOBRE MIM</div>
          </div>
        </PixelatedButton>

        <PixelatedButton
          variant="green"
          className="w-full px-4 py-4 text-center pixel-cursor-pointer"
          onClick={() => {
            onSkillsClick()
            onButtonClick()
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Target className="w-5 h-5" />
            <div className="font-bold text-base">HABILIDADES</div>
          </div>
        </PixelatedButton>

        <PixelatedButton
          variant="purple"
          className="w-full px-4 py-4 text-center pixel-cursor-pointer"
          onClick={() => {
            onProjectsClick()
            onButtonClick()
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <FolderOpen className="w-5 h-5" />
            <div className="font-bold text-base">PROJETOS</div>
          </div>
        </PixelatedButton>

        <PixelatedButton
          variant="twitter"
          className="w-full px-4 py-4 text-center pixel-cursor-pointer"
          onClick={() => {
            onContactClick()
            onButtonClick()
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Mail className="w-5 h-5" />
            <div className="font-bold text-base">CONTATO</div>
          </div>
        </PixelatedButton>

        <PixelatedButton
          variant="red"
          className="w-full px-4 py-4 text-center pixel-cursor-pointer"
          onClick={() => {
            onGameClick()
            onButtonClick()
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gamepad2 className="w-5 h-5" />
            <div className="font-bold text-base">JOGAR SNAKE</div>
          </div>
        </PixelatedButton>

        <PixelatedButton
          variant="orange"
          className="w-full px-4 py-4 text-center pixel-cursor-pointer"
          onClick={() => {
            onStatsClick()
            onButtonClick()
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5" />
            <div className="font-bold text-base">ESTATÍSTICAS</div>
          </div>
        </PixelatedButton>

        <PixelatedButton
          variant="default"
          className="w-full px-4 py-4 text-center pixel-cursor-pointer"
          onClick={() => {
            onGuideClick()
            onButtonClick()
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <BookOpen className="w-5 h-5" />
            <div className="font-bold text-base">GUIA DE PROJETOS</div>
          </div>
        </PixelatedButton>
      </div>
    </div>
  )
}
