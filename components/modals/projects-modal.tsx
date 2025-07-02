"use client"

import { PixelatedButton, PixelatedBox, PixelatedModal } from "@/components/pixelated-ui"
import { Github, Globe, Code, Zap, Star } from "lucide-react"

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
  onButtonClick: () => void
}

export function ProjectsModal({ isOpen, onClose, onButtonClick }: ProjectsModalProps) {
  const projects = [
    {
      id: 1,
      title: "E-COMMERCE MODERNO",
      description: "PLATAFORMA COMPLETA DE VENDAS ONLINE COM REACT E NODE.JS",
      image: "/project-1.png",
      technologies: ["REACT", "NODE.JS", "MONGODB", "STRIPE"],
      status: "CONCLUÍDO",
      featured: true,
      links: {
      },
    },
    {
      id: 2,
      title: "DASHBOARD ANALYTICS",
      description: "SISTEMA DE ANÁLISE DE DADOS COM GRÁFICOS INTERATIVOS",
      image: "/project-2.png",
      technologies: ["NEXT.JS", "TYPESCRIPT", "CHART.JS", "POSTGRESQL"],
      status: "CONCLUÍDO",
      featured: true,
      links: {

      },
    },
    {
      id: 3,
      title: "APP MOBILE DELIVERY",
      description: "APLICATIVO DE DELIVERY COM REACT NATIVE E GEOLOCALIZAÇÃO",
      image: "/project-3.png",
      technologies: ["REACT NATIVE", "EXPO", "FIREBASE", "MAPS API"],
      status: "EM DESENVOLVIMENTO",
      featured: false,
      links: {
      },
    },
    {
      id: 4,
      title: "PIXEL PORTFOLIO",
      description: "PORTFÓLIO INTERATIVO ESTILO PIXEL ART COM JOGOS",
      image: "/project-4.png",
      technologies: ["NEXT.JS", "TAILWIND", "CANVAS API", "WEB AUDIO"],
      status: "CONCLUÍDO",
      featured: true,
      links: {
      },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONCLUÍDO":
        return "green"
      case "EM DESENVOLVIMENTO":
        return "orange"
      case "PLANEJAMENTO":
        return "blue"
      default:
        return "grey"
    }
  }

  const handleLinkClick = (url: string) => {
    onButtonClick()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <PixelatedModal isOpen={isOpen} onClose={onClose} title="💼 MEUS PROJETOS" showStar={true}>
      <div className="space-y-6">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <PixelatedBox key={project.id} variant="default" className="p-4">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm">{project.title}</h3>
                    {project.featured && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                  </div>
                  {/* <PixelatedBox variant={getStatusColor(project.status) as any} className="px-2 py-1 inline-block">
                    <span className="text-xs font-bold">{project.status}</span>
                  </PixelatedBox> */}
                </div>
              </div>

              {/* Project Image */}
              <div className="mb-3 bg-gray-200 h-32 rounded flex items-center justify-center">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover rounded pixelated"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.nextElementSibling?.classList.remove("hidden")
                  }}
                />
                <div className="hidden flex items-center justify-center text-gray-500">
                  <Code className="w-8 h-8" />
                </div>
              </div>

              {/* Project Description */}
              <p className="text-xs mb-3 leading-relaxed">{project.description}</p>

              {/* Technologies */}
              <div className="mb-4">
                <div className="text-xs font-bold mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  TECNOLOGIAS:
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-blue-100 px-2 py-1 rounded font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-4">
                {project.links.demo && (
                  <PixelatedButton
                    variant="green"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs pixel-cursor-pointer"
                    onClick={() => handleLinkClick(project.links.demo!)}
                  >
                    <Globe className="w-3 h-3" />
                    DEMO
                  </PixelatedButton>
                )}

                {project.links.github && (
                  <PixelatedButton
                    variant="default"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs pixel-cursor-pointer"
                    onClick={() => handleLinkClick(project.links.github!)}
                  >
                    <Github className="w-3 h-3" />
                    CÓDIGO
                  </PixelatedButton>
                )}
              </div>
            </PixelatedBox>
          ))}
        </div>

        {/* Project Stats */}
        {/* <div className="grid grid-cols-3 gap-4">
          <PixelatedBox variant="green" className="p-3 text-center">
            <div className="text-2xl font-bold mb-1">{projects.filter((p) => p.status === "CONCLUÍDO").length}</div>
            <div className="text-xs opacity-80">PROJETOS CONCLUÍDOS</div>
          </PixelatedBox>

          <PixelatedBox variant="orange" className="p-3 text-center">
            <div className="text-2xl font-bold mb-1">
              {projects.filter((p) => p.status === "EM DESENVOLVIMENTO").length}
            </div>
            <div className="text-xs opacity-80">EM DESENVOLVIMENTO</div>
          </PixelatedBox>

          <PixelatedBox variant="purple" className="p-3 text-center">
            <div className="text-2xl font-bold mb-1">{projects.filter((p) => p.featured).length}</div>
            <div className="text-xs opacity-80">PROJETOS DESTAQUE</div>
          </PixelatedBox>
        </div> */}

        {/* Call to Action */}
        <PixelatedBox variant="blue" className="p-4 text-center">
          <div className="text-sm font-bold mb-2">🚀 INTERESSADO EM UM PROJETO?</div>
          <div className="text-xs mb-3 opacity-80">
            ESTOU SEMPRE ABERTO A NOVOS DESAFIOS E OPORTUNIDADES DE COLABORAÇÃO!
          </div>
          <PixelatedButton
            variant="twitter"
            className="px-6 py-3 pixel-cursor-pointer"
            onClick={() => {
              onClose()
              onButtonClick()
              // Aqui você pode abrir o modal de contato ou redirecionar
            }}
          >
            VAMOS CONVERSAR!
          </PixelatedButton>
        </PixelatedBox>       
      </div>
    </PixelatedModal>
  )
}
