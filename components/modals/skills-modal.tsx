"use client"

import { PixelatedModal } from "@/components/pixelated-ui"

interface SkillsModalProps {
  isOpen: boolean
  onClose: () => void
  onButtonClick: () => void
}

export function SkillsModal({ isOpen, onClose, onButtonClick }: SkillsModalProps) {
  const skills = [
    { name: "HTML", level: 85, color: "#f1753f", icon: "🌐" },
    { name: "CSS", level: 92, color: "#2965f1", icon: "🎨" },
    { name: "JAVASCRIPT", level: 78, color: "#f3e273", icon: "⚡" },
    { name: "REACT", level: 88, color: "#61dafb", icon: "⚛️" },
    { name: "NODE.JS", level: 75, color: "#68a063", icon: "🚀" },
    { name: "JAVA", level: 65, color: "#9d28e0", icon: "🎭" },
  ]

  return (
    <PixelatedModal isOpen={isOpen} onClose={onClose} title="HABILIDADES" showStar={false}>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5" style={{ backgroundColor: skill.color }} />
                <span>{skill.name}</span>
              </div>
              <span className="font-bold">{skill.level}%</span>
            </div>
            <div className="w-full h-3 bg-gray-300 relative">
              <div
                className="h-full transition-all duration-1000"
                style={{
                  backgroundColor: skill.color,
                  width: `${skill.level}%`,
                }}
              />
            </div>
          </div>
        ))}
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h4 className="font-bold mb-2 text-sm">OUTRAS TECNOLOGIAS:</h4>
          <div className="text-xs space-y-1">
            <p>• TYPESCRIPT, C, PYTHON</p>
            <p>• ORACLE, POSTGRESQL, MYSQL</p>
            <p>• AWS, DOCKER, MAVEN</p>
            <p>• GIT, FIGMA</p>
          </div>
        </div>
      </div>
    </PixelatedModal>
  )
}
