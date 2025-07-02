"use client"

import { PixelatedButton, PixelatedBox } from "@/components/pixelated-ui"
import {
  User,
  Target,
  Mail,
  BarChart3,
  BookOpen,
  FolderOpen,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Briefcase,
  Award,
  X,
} from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onAboutClick: () => void
  onSkillsClick: () => void
  onProjectsClick: () => void
  onContactClick: () => void
  onStatsClick: () => void
  onGuideClick: () => void
  onButtonClick: () => void
}

export function MobileMenu({
  isOpen,
  onClose,
  onAboutClick,
  onSkillsClick,
  onProjectsClick,
  onContactClick,
  onStatsClick,
  onGuideClick,
  onButtonClick,
}: MobileMenuProps) {
  if (!isOpen) return null

  const handleSocialClick = (platform: string) => {
    onButtonClick()
    const links = {
      github: "https://github.com/victortorres",
      linkedin: "https://linkedin.com/in/victortorres",
      twitter: "https://twitter.com/victortorres",
    }
    window.open(links[platform as keyof typeof links], "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-sm h-[80vh] bg-white overflow-hidden"
        style={{
          boxShadow: `
            0px 3px #e7e7e7, 0px -3px #ffffff, 3px 0px #ffffff, -3px 0px #ffffff,
            0px -6px #b6a695, 0px 6px #b6a695, 6px 0px #b6a695, -6px 0px #b6a695,
            9px 0px rgba(0, 0, 0, 0.1), 0px 9px rgba(0, 0, 0, 0.1)
          `,
        }}
      >
        {/* Corner pixels */}
        <div className="absolute w-[3px] h-[3px] left-[-3px] top-[-3px] bg-[#b6a695] z-20" />
        <div className="absolute w-[3px] h-[3px] right-[-3px] top-[-3px] bg-[#b6a695] z-20" />
        <div className="absolute w-[3px] h-[3px] left-[-3px] bottom-[-3px] bg-[#e7e7e7] z-20" />
        <div className="absolute w-[3px] h-[3px] right-[-3px] bottom-[-3px] bg-[#e7e7e7] z-20" />

        {/* Header - Removidos os controles de áudio duplicados */}
        <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-300 bg-white relative z-10">
          <h3 className="font-bold text-lg text-[#594c3d] font-mono uppercase">MENU</h3>
          <PixelatedButton
            variant="red"
            className="p-2 pixel-cursor-pointer"
            onClick={() => {
              onClose()
              onButtonClick()
            }}
          >
            <X className="w-5 h-5" />
          </PixelatedButton>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100%-80px)] overflow-y-auto bg-white">
          <div className="space-y-3 h-full flex flex-col gap-1 p-4">
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
            <div className="font-bold text-base">GUIA DE PROJETOS</div>
          </div>
        </PixelatedButton>

            {/* Social Media Section */}
            <div className="pt-4 mt-6">
              <div className="text-xs mb-3 font-bold opacity-60 text-center font-mono uppercase text-[#594c3d]">
                REDES SOCIAIS
              </div>

              <div className="flex justify-center gap-4">
                <PixelatedButton
                  variant="default"
                  className="p-3 pixel-cursor-pointer"
                  onClick={() => handleSocialClick("github")}
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </PixelatedButton>
                <PixelatedButton
                  variant="blue"
                  className="p-3 pixel-cursor-pointer"
                  onClick={() => handleSocialClick("linkedin")}
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </PixelatedButton>
                <PixelatedButton
                  variant="twitter"
                  className="p-3 pixel-cursor-pointer"
                  onClick={() => handleSocialClick("twitter")}
                  title="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </PixelatedButton>
              </div>
            </div>

            {/* Professional Info */}
            {/* <div className="pt-4 mt-6">
              <div className="text-xs mb-3 font-bold opacity-60 text-center font-mono uppercase text-[#594c3d]">
                INFORMAÇÕES PROFISSIONAIS
              </div>

              <div className="space-y-3">
                <PixelatedBox variant="orange" className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <div className="text-xs font-bold">SÃO PAULO, BRASIL</div>
                  </div>
                </PixelatedBox>

                <PixelatedBox variant="green" className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    <div className="text-xs font-bold">DISPONÍVEL PARA PROJETOS</div>
                  </div>
                </PixelatedBox>

                <PixelatedBox variant="blue" className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-5 h-5" />
                    <div className="text-xs font-bold">NEXTREACT & NODE.JS</div>
                  </div>
                </PixelatedBox>
              </div>
            </div> */}

            {/* Quick Contact */}
            <div className="pt-4 mt-6">
              <div className="text-xs mb-3 font-bold opacity-60 text-center font-mono uppercase text-[#594c3d]">
                CONTATO RÁPIDO
              </div>

              <PixelatedBox variant="purple" className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  <div className="text-xs font-bold">VICTOR@EMAIL.COM</div>
                </div>
              </PixelatedBox>
            </div>

            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
