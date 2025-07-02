"use client"

import { useState, useEffect } from "react"
import { PixelatedButton, PixelatedModal } from "./pixelated-ui"
import { Volume2, VolumeX, Music, RotateCcw } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [musicVolume, setMusicVolume] = useState(50)
  const [soundVolume, setSoundVolume] = useState(50)

  // Load settings from localStorage
  useEffect(() => {
    const savedSound = localStorage.getItem("soundEnabled")
    const savedMusic = localStorage.getItem("musicEnabled")
    const savedMusicVolume = localStorage.getItem("musicVolume")
    const savedSoundVolume = localStorage.getItem("soundVolume")

    if (savedSound !== null) setSoundEnabled(savedSound === "true")
    if (savedMusic !== null) setMusicEnabled(savedMusic === "true")
    if (savedMusicVolume !== null) setMusicVolume(Number.parseInt(savedMusicVolume))
    if (savedSoundVolume !== null) setSoundVolume(Number.parseInt(savedSoundVolume))
  }, [])

  const handleSoundToggle = () => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    localStorage.setItem("soundEnabled", newValue.toString())

    // Update global sound state
    if ((window as any).setSoundEnabled) {
      ;(window as any).setSoundEnabled(newValue)
    }

    // Play test sound
    if (newValue && (window as any).playPixelSound) {
      ;(window as any).playPixelSound(800, 100)
    }
  }

  const handleMusicToggle = () => {
    const newValue = !musicEnabled
    setMusicEnabled(newValue)
    localStorage.setItem("musicEnabled", newValue.toString())

    // Update global music state
    if ((window as any).toggleMusic) {
      ;(window as any).toggleMusic()
    }
  }

  const handleMusicVolumeChange = (volume: number) => {
    setMusicVolume(volume)
    localStorage.setItem("musicVolume", volume.toString())

    // Update global music volume
    if ((window as any).setMusicVolume) {
      ;(window as any).setMusicVolume(volume / 100)
    }
  }

  const handleSoundVolumeChange = (volume: number) => {
    setSoundVolume(volume)
    localStorage.setItem("soundVolume", volume.toString())

    // Update global sound volume
    if ((window as any).setSoundVolume) {
      ;(window as any).setSoundVolume(volume / 100)
    }

    // Play test sound
    if (soundEnabled && (window as any).playPixelSound) {
      ;(window as any).playPixelSound(800, 100)
    }
  }

  const resetSettings = () => {
    setSoundEnabled(true)
    setMusicEnabled(true)
    setMusicVolume(50)
    setSoundVolume(50)

    localStorage.setItem("soundEnabled", "true")
    localStorage.setItem("musicEnabled", "true")
    localStorage.setItem("musicVolume", "50")
    localStorage.setItem("soundVolume", "50")

    // Update global settings
    if ((window as any).setSoundEnabled) {
      ;(window as any).setSoundEnabled(true)
    }
    if ((window as any).setMusicVolume) {
      ;(window as any).setMusicVolume(0.5)
    }
    if ((window as any).setSoundVolume) {
      ;(window as any).setSoundVolume(0.5)
    }

    // Play confirmation sound
    if ((window as any).playPixelSound) {
      ;(window as any).playPixelSound(1000, 200)
    }
  }

  return (
    <PixelatedModal isOpen={isOpen} onClose={onClose} title="⚙️ CONFIGURAÇÕES" showStar={false}>
      <div className="space-y-6">
        {/* Audio Settings */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">🔊 CONFIGURAÇÕES DE ÁUDIO</h3>

          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              <div>
                <div className="font-bold text-sm">EFEITOS SONOROS</div>
                <div className="text-xs opacity-70">SONS DE CLIQUE E INTERAÇÃO</div>
              </div>
            </div>
            <PixelatedButton
              variant={soundEnabled ? "green" : "grey"}
              className="px-4 py-2 pixel-cursor-pointer"
              onClick={handleSoundToggle}
            >
              {soundEnabled ? "LIGADO" : "DESLIGADO"}
            </PixelatedButton>
          </div>

          {/* Sound Volume */}
          {soundEnabled && (
            <div className="p-4 bg-gray-50 rounded">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm">VOLUME DOS EFEITOS</span>
                <span className="text-sm">{soundVolume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <PixelatedButton
                  variant="orange"
                  className="px-3 py-2 pixel-cursor-pointer"
                  onClick={() => handleSoundVolumeChange(Math.max(0, soundVolume - 10))}
                >
                  -
                </PixelatedButton>
                <div className="flex-1 bg-gray-300 h-3 relative rounded">
                  <div
                    className="h-full bg-orange-500 rounded transition-all duration-300"
                    style={{ width: `${soundVolume}%` }}
                  />
                </div>
                <PixelatedButton
                  variant="orange"
                  className="px-3 py-2 pixel-cursor-pointer"
                  onClick={() => handleSoundVolumeChange(Math.min(100, soundVolume + 10))}
                >
                  +
                </PixelatedButton>
              </div>
            </div>
          )}

          {/* Background Music Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5" />
              <div>
                <div className="font-bold text-sm">MÚSICA DE FUNDO</div>
                <div className="text-xs opacity-70">TRILHA SONORA RETRÔ</div>
              </div>
            </div>
            <PixelatedButton
              variant={musicEnabled ? "green" : "grey"}
              className="px-4 py-2 pixel-cursor-pointer"
              onClick={handleMusicToggle}
            >
              {musicEnabled ? "LIGADO" : "DESLIGADO"}
            </PixelatedButton>
          </div>

          {/* Music Volume */}
          {musicEnabled && (
            <div className="p-4 bg-gray-50 rounded">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm">VOLUME DA MÚSICA</span>
                <span className="text-sm">{musicVolume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <PixelatedButton
                  variant="purple"
                  className="px-3 py-2 pixel-cursor-pointer"
                  onClick={() => handleMusicVolumeChange(Math.max(0, musicVolume - 10))}
                >
                  -
                </PixelatedButton>
                <div className="flex-1 bg-gray-300 h-3 relative rounded">
                  <div
                    className="h-full bg-purple-500 rounded transition-all duration-300"
                    style={{ width: `${musicVolume}%` }}
                  />
                </div>
                <PixelatedButton
                  variant="purple"
                  className="px-3 py-2 pixel-cursor-pointer"
                  onClick={() => handleMusicVolumeChange(Math.min(100, musicVolume + 10))}
                >
                  +
                </PixelatedButton>
              </div>
            </div>
          )}
        </div>

        {/* Visual Settings */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">🎨 CONFIGURAÇÕES VISUAIS</h3>

          <div className="p-4 bg-gray-50 rounded">
            <div className="text-sm opacity-70 text-center">
              MAIS OPÇÕES VISUAIS EM BREVE...
              <br />🌙 MODO ESCURO | 🎭 TEMAS | ✨ EFEITOS
            </div>
          </div>
        </div>

        {/* Game Settings */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">🎮 CONFIGURAÇÕES DO JOGO</h3>

          <div className="p-4 bg-gray-50 rounded">
            <div className="text-sm opacity-70 text-center">
              CONFIGURAÇÕES DE JOGO EM BREVE...
              <br />🐍 VELOCIDADE | 🏆 DIFICULDADE | 🎯 CONTROLES
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-300">
          <PixelatedButton
            variant="red"
            className="flex items-center gap-2 px-4 py-3 pixel-cursor-pointer"
            onClick={resetSettings}
          >
            <RotateCcw className="w-5 h-5" />
            RESETAR TUDO
          </PixelatedButton>

          <PixelatedButton variant="green" className="flex-1 px-4 py-3 pixel-cursor-pointer" onClick={onClose}>
            SALVAR E FECHAR
          </PixelatedButton>
        </div>

        {/* Info */}
        <div className="text-xs opacity-60 text-center p-3 bg-blue-50 rounded">
          💡 SUAS CONFIGURAÇÕES SÃO SALVAS AUTOMATICAMENTE NO SEU NAVEGADOR
        </div>
      </div>
    </PixelatedModal>
  )
}
