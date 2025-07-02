"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { PixelatedButton, PixelatedModal } from "./pixelated-ui"

interface SoundManagerProps {
  children: React.ReactNode
}

export function SoundManager({ children }: SoundManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const musicIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentOscillatorsRef = useRef<OscillatorNode[]>([])
  const masterGainRef = useRef<GainNode | null>(null)
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const musicGainNodeRef = useRef<GainNode | null>(null)

  const [showSoundModal, setShowSoundModal] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [musicVolume, setMusicVolume] = useState(0.05)
  const [soundVolume, setSoundVolume] = useState(0.1)
  const [isMobile, setIsMobile] = useState(false)
  const [useImportedMusic, setUseImportedMusic] = useState(true) // Preferir música importada

  // Lista de músicas disponíveis - adicione seus arquivos aqui
  const musicTracks = [
    {
      name: "Pixel Adventure",
      file: "/audio/pixel-adventure.mp3", // Adicione seu arquivo aqui
      loop: true,
    },
    {
      name: "Retro Beats",
      file: "/audio/retro-beats.ogg", // Suporte para OGG também
      loop: true,
    },
    // Adicione mais faixas conforme necessário
  ]

  const currentTrack = musicTracks[0] // Usar primeira faixa por padrão

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Load preferences on mount and check if user has already made a choice
  useEffect(() => {
    const savedSound = localStorage.getItem("soundEnabled")
    const savedMusic = localStorage.getItem("musicEnabled")
    const savedMusicVolume = localStorage.getItem("musicVolume")
    const savedSoundVolume = localStorage.getItem("soundVolume")
    const hasUserMadeChoice = localStorage.getItem("audioChoiceMade")
    const userHasInteracted = sessionStorage.getItem("userHasInteracted") // Use sessionStorage

    // Only show modal if user hasn't made a choice before
    if (hasUserMadeChoice !== "true") {
      setShowSoundModal(true)
    } else {
      setShowSoundModal(false)
    }

    // Load saved preferences
    if (savedSound !== null) {
      setSoundEnabled(savedSound === "true")
    }
    if (savedMusic !== null) {
      setMusicEnabled(savedMusic === "true")
    }
    if (savedMusicVolume) {
      updateMusicVolume(Number.parseInt(savedMusicVolume))
    }
    if (savedSoundVolume) {
      updateSoundVolume(Number.parseInt(savedSoundVolume))
    }

    // Initialize audio if music was enabled and user has interacted in this session
    if (savedMusic === "true" && hasUserMadeChoice === "true" && userHasInteracted === "true") {
      initAudio().then(() => {
        setTimeout(() => {
          startMusic()
        }, 1000)
      })
    }
  }, [])

  // Initialize audio context and background music
  const initAudio = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      // Resume context if suspended
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume()
      }

      // Create master gain node
      if (!masterGainRef.current && audioContextRef.current) {
        masterGainRef.current = audioContextRef.current.createGain()
        masterGainRef.current.connect(audioContextRef.current.destination)
      }

      // Initialize background music
      if (useImportedMusic && !backgroundMusicRef.current) {
        await initBackgroundMusic()
      }

      setIsInitialized(true)
      console.log("Audio initialized successfully")
    } catch (error) {
      console.error("Failed to initialize audio:", error)
      // Fallback to generated music if imported music fails
      setUseImportedMusic(false)
      setIsInitialized(true)
    }
  }

  // Initialize background music from imported file
  const initBackgroundMusic = async () => {
    try {
      if (!audioContextRef.current || !masterGainRef.current) return

      // Create audio element
      backgroundMusicRef.current = new Audio()
      backgroundMusicRef.current.src = currentTrack.file
      backgroundMusicRef.current.loop = currentTrack.loop
      backgroundMusicRef.current.preload = "auto"

      // Create gain node for music volume control
      const source = audioContextRef.current.createMediaElementSource(backgroundMusicRef.current)
      musicGainNodeRef.current = audioContextRef.current.createGain()

      source.connect(musicGainNodeRef.current)
      musicGainNodeRef.current.connect(masterGainRef.current)

      // Set initial volume
      musicGainNodeRef.current.gain.setValueAtTime(musicVolume, audioContextRef.current.currentTime)

      // Handle loading events
      backgroundMusicRef.current.addEventListener("canplaythrough", () => {
        console.log("Background music loaded successfully")
      })

      backgroundMusicRef.current.addEventListener("error", (e) => {
        console.warn("Failed to load background music, falling back to generated music:", e)
        setUseImportedMusic(false)
      })

      // Load the audio
      await backgroundMusicRef.current.load()
    } catch (error) {
      console.warn("Failed to initialize background music:", error)
      setUseImportedMusic(false)
    }
  }

  // Start music (imported or generated)
  const startMusic = async () => {
    if (!musicEnabled) return

    // Resume audio context if suspended
    if (audioContextRef.current?.state === "suspended") {
      try {
        await audioContextRef.current.resume()
      } catch (error) {
        console.log("Could not resume audio context:", error)
        throw error
      }
    }

    if (useImportedMusic && backgroundMusicRef.current) {
      try {
        // Reset to beginning and play
        backgroundMusicRef.current.currentTime = 0
        await backgroundMusicRef.current.play()
        console.log("Playing imported background music")
      } catch (error) {
        console.warn("Failed to play imported music, falling back to generated:", error)
        setUseImportedMusic(false)
        startMusicLoop()
      }
    } else {
      // Fallback to generated music
      startMusicLoop()
    }
  }

  // Stop music (imported or generated)
  const stopMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause()
      backgroundMusicRef.current.currentTime = 0
    }
    stopMusicLoop()
  }

  // Update music volume
  const updateMusicVolumeControl = (volume: number) => {
    if (useImportedMusic && musicGainNodeRef.current && audioContextRef.current) {
      musicGainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime)
    }
  }

  // Stop all current oscillators (for generated music)
  const stopAllOscillators = () => {
    currentOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    currentOscillatorsRef.current = []
  }

  // Create 8-bit style background music (fallback)
  const playBackgroundMusic = () => {
    if (
      !audioContextRef.current ||
      !musicEnabled ||
      audioContextRef.current.state !== "running" ||
      !masterGainRef.current ||
      useImportedMusic // Don't play generated music if using imported
    ) {
      return
    }

    const context = audioContextRef.current
    const musicGain = context.createGain()
    musicGain.connect(masterGainRef.current)
    musicGain.gain.setValueAtTime(musicVolume, context.currentTime)

    // Classic 8-bit melody
    const melody = [
      { freq: 659.25, duration: 0.4 }, // E5
      { freq: 659.25, duration: 0.2 }, // E5
      { freq: 0, duration: 0.2 }, // Rest
      { freq: 659.25, duration: 0.2 }, // E5
      { freq: 0, duration: 0.2 }, // Rest
      { freq: 523.25, duration: 0.2 }, // C5
      { freq: 659.25, duration: 0.4 }, // E5
      { freq: 783.99, duration: 0.8 }, // G5
      { freq: 0, duration: 0.4 }, // Rest
      { freq: 392.0, duration: 0.8 }, // G4
    ]

    const bass = [
      { freq: 130.81, duration: 1.6 }, // C3
      { freq: 196.0, duration: 1.6 }, // G3
      { freq: 130.81, duration: 1.6 }, // C3
      { freq: 164.81, duration: 1.6 }, // E3
    ]

    const currentTime = context.currentTime
    let timeOffset = 0

    // Play melody
    melody.forEach((note) => {
      if (note.freq > 0) {
        const osc = context.createOscillator()
        const noteGain = context.createGain()

        osc.connect(noteGain)
        noteGain.connect(musicGain)

        osc.frequency.setValueAtTime(note.freq, currentTime + timeOffset)
        osc.type = "square"

        noteGain.gain.setValueAtTime(0, currentTime + timeOffset)
        noteGain.gain.linearRampToValueAtTime(0.3, currentTime + timeOffset + 0.01)
        noteGain.gain.exponentialRampToValueAtTime(0.01, currentTime + timeOffset + note.duration)

        osc.start(currentTime + timeOffset)
        osc.stop(currentTime + timeOffset + note.duration)

        currentOscillatorsRef.current.push(osc)
      }
      timeOffset += note.duration
    })

    // Play bass line
    let bassOffset = 0
    bass.forEach((note) => {
      const osc = context.createOscillator()
      const noteGain = context.createGain()

      osc.connect(noteGain)
      noteGain.connect(musicGain)

      osc.frequency.setValueAtTime(note.freq, currentTime + bassOffset)
      osc.type = "triangle"

      noteGain.gain.setValueAtTime(0, currentTime + bassOffset)
      noteGain.gain.linearRampToValueAtTime(0.15, currentTime + bassOffset + 0.01)
      noteGain.gain.exponentialRampToValueAtTime(0.01, currentTime + bassOffset + note.duration)

      osc.start(currentTime + bassOffset)
      osc.stop(currentTime + bassOffset + note.duration)

      currentOscillatorsRef.current.push(osc)
      bassOffset += note.duration
    })
  }

  const startMusicLoop = () => {
    if (!musicEnabled || !audioContextRef.current || useImportedMusic) return

    playBackgroundMusic()

    // Clear existing interval
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current)
    }

    // Set up loop with longer interval to prevent performance issues
    musicIntervalRef.current = setInterval(() => {
      if (musicEnabled && audioContextRef.current?.state === "running" && !useImportedMusic) {
        playBackgroundMusic()
      }
    }, 6400) // Loop every 6.4 seconds
  }

  const stopMusicLoop = () => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current)
      musicIntervalRef.current = null
    }
    stopAllOscillators()
  }

  const playPixelSound = (frequency = 800, duration = 100) => {
    // Check if sound is enabled before playing
    if (
      !audioContextRef.current ||
      !soundEnabled ||
      audioContextRef.current.state !== "running" ||
      !masterGainRef.current
    )
      return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(masterGainRef.current)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = "square"

    gainNode.gain.setValueAtTime(soundVolume, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000)
  }

  const playStartSound = () => {
    // Check if sound is enabled before playing
    if (!audioContextRef.current || !soundEnabled) return

    const notes = [523, 659, 784, 1047] // C, E, G, C
    notes.forEach((freq, index) => {
      setTimeout(() => playPixelSound(freq, 150), index * 100)
    })
  }

  const handleSoundChoice = async (enableSound: boolean, enableMusic: boolean) => {
    // Update states immediately
    setSoundEnabled(enableSound)
    setMusicEnabled(enableMusic)
    setShowSoundModal(false)

    // Store preferences AND mark that user has made a choice
    localStorage.setItem("soundEnabled", enableSound.toString())
    localStorage.setItem("musicEnabled", enableMusic.toString())
    localStorage.setItem("audioChoiceMade", "true")

    // Dispatch custom events to notify other components about the state change
    window.dispatchEvent(
      new CustomEvent("audioStateChanged", {
        detail: { soundEnabled: enableSound, musicEnabled: enableMusic },
      }),
    )

    if (enableMusic) {
      try {
        await initAudio()
        // Since user came from home page and clicked, we can start music immediately
        setTimeout(async () => {
          await startMusic()
        }, 500)
      } catch (error) {
        console.log("Audio initialization failed:", error)
      }
    }

    // Play test sound if sound is enabled
    if (enableSound) {
      setTimeout(() => {
        playPixelSound(800, 100)
      }, 600)
    }
  }

  const toggleMusic = async () => {
    const newMusicState = !musicEnabled

    if (newMusicState) {
      // Ativando música
      setMusicEnabled(true)
      localStorage.setItem("musicEnabled", "true")

      try {
        if (!isInitialized) {
          await initAudio()
        }
        // Since user came from home page, we can start music immediately
        await startMusic()
      } catch (error) {
        console.log("Failed to start music:", error)
      }
    } else {
      // Desativando música
      stopMusic()
      setMusicEnabled(false)
      localStorage.setItem("musicEnabled", "false")
    }

    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent("audioStateChanged", {
        detail: { soundEnabled, musicEnabled: newMusicState },
      }),
    )
  }

  const toggleSound = async () => {
    if (!isInitialized) {
      await initAudio()
    }

    const newSoundState = !soundEnabled
    setSoundEnabled(newSoundState)
    localStorage.setItem("soundEnabled", newSoundState.toString())

    // Play test sound if enabling
    if (newSoundState && audioContextRef.current) {
      setTimeout(() => {
        playPixelSound(800, 100)
      }, 100)
    }

    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent("audioStateChanged", {
        detail: { soundEnabled: newSoundState, musicEnabled },
      }),
    )
  }

  // Update volume functions
  const updateMusicVolume = (volume: number) => {
    const newVolume = (volume / 100) * 0.1 // Max 0.1 for music
    setMusicVolume(newVolume)
    localStorage.setItem("musicVolume", volume.toString())

    // Update volume for imported music
    updateMusicVolumeControl(newVolume)
  }

  const updateSoundVolume = (volume: number) => {
    const newVolume = (volume / 100) * 0.3 // Max 0.3 for sound effects
    setSoundVolume(newVolume)
    localStorage.setItem("soundVolume", volume.toString())
  }

  // Update sound enabled state
  const updateSoundEnabled = (enabled: boolean) => {
    setSoundEnabled(enabled)
    localStorage.setItem("soundEnabled", enabled.toString())
  }

  // Sync music state when it changes
  useEffect(() => {
    if (musicEnabled && isInitialized && audioContextRef.current) {
      startMusic()
    } else {
      stopMusic()
    }
  }, [musicEnabled, isInitialized])

  // Update volume when it changes
  useEffect(() => {
    updateMusicVolumeControl(musicVolume)
  }, [musicVolume])

  // Attach sound functions to window for global access
  useEffect(() => {
    ;(window as any).playPixelSound = playPixelSound
    ;(window as any).playStartSound = playStartSound
    ;(window as any).toggleMusic = toggleMusic
    ;(window as any).toggleSound = toggleSound
    ;(window as any).musicEnabled = musicEnabled
    ;(window as any).soundEnabled = soundEnabled
    ;(window as any).setSoundEnabled = updateSoundEnabled
    ;(window as any).setMusicVolume = updateMusicVolume
    ;(window as any).setSoundVolume = updateSoundVolume
  }, [soundEnabled, musicEnabled, isInitialized, soundVolume, musicVolume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic()
      stopAllOscillators()
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause()
        backgroundMusicRef.current = null
      }
    }
  }, [])

  return (
    <>
      {/* Sound Configuration Modal */}
      <PixelatedModal
        isOpen={showSoundModal}
        onClose={() => {
          // If user closes without choosing, default to no sound and mark as chosen
          handleSoundChoice(false, false)
        }}
        title="CONFIGURAÇÕES DE ÁUDIO"
        showStar={false}
      >
        <div className="space-y-6 text-center">
          <div className="space-y-4">
            <div className="text-lg font-bold">🎮 BEM-VINDO AO PIXEL PORTFOLIO!</div>
            <p className="text-sm">ESTA EXPERIÊNCIA INCLUI EFEITOS SONOROS E MÚSICA DE FUNDO ESTILO JOGOS RETRÔ.</p>
            <p className="text-sm opacity-80">ESCOLHA SUAS PREFERÊNCIAS DE ÁUDIO:</p>
          </div>

          <div className="space-y-4">
            <PixelatedButton
              variant="green"
              className="w-full py-4 pixel-cursor-pointer"
              onClick={() => handleSoundChoice(true, true)}
            >
              🔊 SOM + MÚSICA
              <div className="text-xs mt-1 opacity-80">EXPERIÊNCIA COMPLETA</div>
            </PixelatedButton>

            <PixelatedButton
              variant="blue"
              className="w-full py-4 pixel-cursor-pointer"
              onClick={() => handleSoundChoice(true, false)}
            >
              🔉 APENAS EFEITOS
              <div className="text-xs mt-1 opacity-80">SEM MÚSICA DE FUNDO</div>
            </PixelatedButton>

            <PixelatedButton
              variant="grey"
              className="w-full py-4 pixel-cursor-pointer"
              onClick={() => handleSoundChoice(false, false)}
            >
              🔇 SEM SOM
              <div className="text-xs mt-1 opacity-80">EXPERIÊNCIA SILENCIOSA</div>
            </PixelatedButton>
          </div>

          <div className="text-xs opacity-60 mt-4">
            VOCÊ PODE ALTERAR ESSAS CONFIGURAÇÕES A QUALQUER MOMENTO NOS CONTROLES DE ÁUDIO
          </div>
        </div>
      </PixelatedModal>

      {children}
    </>
  )
}
