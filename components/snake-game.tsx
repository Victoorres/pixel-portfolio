"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { PixelatedButton, PixelatedBox, PixelatedModal } from "./pixelated-ui"
import { Play, Pause, RotateCcw, Trophy } from "lucide-react"

interface Position {
  x: number
  y: number
}

interface GameState {
  snake: Position[]
  food: Position
  direction: Position
  gameOver: boolean
  score: number
  isPlaying: boolean
  isPaused: boolean
}

interface SnakeGameProps {
  isOpen: boolean
  onClose: () => void
}

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = { x: 1, y: 0 }

export function SnakeGame({ isOpen, onClose }: SnakeGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: INITIAL_DIRECTION,
    gameOver: false,
    score: 0,
    isPlaying: false,
    isPaused: false,
  })
  const [highScore, setHighScore] = useState(0)
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore")
    if (saved) {
      setHighScore(Number.parseInt(saved))
    }
  }, [])

  // Generate random food position
  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  // Check collision
  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Self collision
    return snake.some((segment) => segment.x === head.x && segment.y === head.y)
  }, [])

  // Game loop
  const gameLoop = useCallback(() => {
    setGameState((prev) => {
      if (!prev.isPlaying || prev.isPaused || prev.gameOver) {
        return prev
      }

      const newSnake = [...prev.snake]
      const head = { ...newSnake[0] }
      head.x += prev.direction.x
      head.y += prev.direction.y

      // Check collision
      if (checkCollision(head, newSnake)) {
        // Play game over sound
        if ((window as any).playPixelSound) {
          ;(window as any).playPixelSound(200, 500)
        }

        // Update high score
        if (prev.score > highScore) {
          setHighScore(prev.score)
          localStorage.setItem("snakeHighScore", prev.score.toString())
        }

        return { ...prev, gameOver: true, isPlaying: false }
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === prev.food.x && head.y === prev.food.y) {
        // Play eat sound
        if ((window as any).playPixelSound) {
          ;(window as any).playPixelSound(800, 100)
        }

        return {
          ...prev,
          snake: newSnake,
          food: generateFood(newSnake),
          score: prev.score + 10,
        }
      } else {
        newSnake.pop()
        return { ...prev, snake: newSnake }
      }
    })
  }, [checkCollision, generateFood, highScore])

  // Start game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
      gameLoopRef.current = setInterval(gameLoop, 150)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.isPlaying || gameState.gameOver) return

      const { direction } = gameState
      let newDirection = { ...direction }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y === 0) newDirection = { x: 0, y: -1 }
          break
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y === 0) newDirection = { x: 0, y: 1 }
          break
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x === 0) newDirection = { x: -1, y: 0 }
          break
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x === 0) newDirection = { x: 1, y: 0 }
          break
        case " ":
          e.preventDefault()
          togglePause()
          break
      }

      if (newDirection.x !== direction.x || newDirection.y !== direction.y) {
        // Play direction change sound
        if ((window as any).playPixelSound) {
          ;(window as any).playPixelSound(600, 50)
        }
        setGameState((prev) => ({ ...prev, direction: newDirection }))
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [gameState, isOpen])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#e1dac5"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#cabcae"
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * 20, 0)
      ctx.lineTo(i * 20, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * 20)
      ctx.lineTo(canvas.width, i * 20)
      ctx.stroke()
    }

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#476323" : "#a5da60" // Head darker, body lighter
      ctx.fillRect(segment.x * 20 + 1, segment.y * 20 + 1, 18, 18)

      // Add eyes to head
      if (index === 0) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(segment.x * 20 + 5, segment.y * 20 + 5, 3, 3)
        ctx.fillRect(segment.x * 20 + 12, segment.y * 20 + 5, 3, 3)
        ctx.fillStyle = "#000000"
        ctx.fillRect(segment.x * 20 + 6, segment.y * 20 + 6, 1, 1)
        ctx.fillRect(segment.x * 20 + 13, segment.y * 20 + 6, 1, 1)
      }
    })

    // Draw food
    ctx.fillStyle = "#df644c"
    ctx.fillRect(gameState.food.x * 20 + 1, gameState.food.y * 20 + 1, 18, 18)

    // Add sparkle to food
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(gameState.food.x * 20 + 8, gameState.food.y * 20 + 4, 4, 4)
    ctx.fillRect(gameState.food.x * 20 + 4, gameState.food.y * 20 + 8, 4, 4)
    ctx.fillRect(gameState.food.x * 20 + 12, gameState.food.y * 20 + 12, 4, 4)
  }, [gameState])

  const startGame = () => {
    // Play start sound
    if ((window as any).playPixelSound) {
      ;(window as any).playPixelSound(1000, 200)
    }

    setGameState({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: INITIAL_DIRECTION,
      gameOver: false,
      score: 0,
      isPlaying: true,
      isPaused: false,
    })
  }

  const togglePause = () => {
    if ((window as any).playPixelSound) {
      ;(window as any).playPixelSound(400, 100)
    }

    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }))
  }

  const resetGame = () => {
    if ((window as any).playPixelSound) {
      ;(window as any).playPixelSound(600, 150)
    }

    setGameState({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: INITIAL_DIRECTION,
      gameOver: false,
      score: 0,
      isPlaying: false,
      isPaused: false,
    })
  }

  return (
    <PixelatedModal isOpen={isOpen} onClose={onClose} title="🐍 PIXEL SNAKE GAME" showStar={true}>
      <div className="space-y-6">
        {/* Game Stats */}
        <div className="flex justify-between items-center">
          <PixelatedBox variant="green" className="px-4 py-2">
            <div className="text-sm">PONTUAÇÃO: {gameState.score}</div>
          </PixelatedBox>
          <PixelatedBox variant="orange" className="px-4 py-2">
            <div className="text-sm flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              RECORDE: {highScore}
            </div>
          </PixelatedBox>
        </div>

        {/* Game Canvas */}
        <div className="flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="border-4 border-[#594c3d] bg-[#e1dac5]"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Game Over Overlay */}
            {gameState.gameOver && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <PixelatedBox variant="red" className="p-6 text-center">
                  <div className="text-xl font-bold mb-2">GAME OVER!</div>
                  <div className="text-sm mb-4">PONTUAÇÃO FINAL: {gameState.score}</div>
                  {gameState.score === highScore && gameState.score > 0 && (
                    <div className="text-sm mb-4 text-yellow-600">🏆 NOVO RECORDE!</div>
                  )}
                </PixelatedBox>
              </div>
            )}

            {/* Pause Overlay */}
            {gameState.isPaused && !gameState.gameOver && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <PixelatedBox variant="blue" className="p-4 text-center">
                  <div className="text-lg font-bold">PAUSADO</div>
                </PixelatedBox>
              </div>
            )}
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4">
          {!gameState.isPlaying ? (
            <PixelatedButton
              variant="green"
              className="flex items-center gap-2 px-6 py-3 pixel-cursor-pointer"
              onClick={startGame}
            >
              <Play className="w-5 h-5" />
              {gameState.gameOver ? "JOGAR NOVAMENTE" : "INICIAR"}
            </PixelatedButton>
          ) : (
            <PixelatedButton
              variant="orange"
              className="flex items-center gap-2 px-6 py-3 pixel-cursor-pointer"
              onClick={togglePause}
            >
              <Pause className="w-5 h-5" />
              {gameState.isPaused ? "CONTINUAR" : "PAUSAR"}
            </PixelatedButton>
          )}

          <PixelatedButton
            variant="grey"
            className="flex items-center gap-2 px-6 py-3 pixel-cursor-pointer"
            onClick={resetGame}
          >
            <RotateCcw className="w-5 h-5" />
            REINICIAR
          </PixelatedButton>
        </div>

        {/* Instructions */}
        <PixelatedBox variant="blue" className="p-4">
          <div className="text-sm space-y-2">
            <div className="font-bold mb-2">🎮 COMO JOGAR:</div>
            <div>• USE AS SETAS OU WASD PARA MOVER</div>
            <div>• COLETE A COMIDA VERMELHA PARA CRESCER</div>
            <div>• NÃO BATA NAS PAREDES OU EM VOCÊ MESMO</div>
            <div>• PRESSIONE ESPAÇO PARA PAUSAR</div>
            <div className="mt-3 font-bold">🏆 META: BATA O RECORDE DE {highScore} PONTOS!</div>
          </div>
        </PixelatedBox>
      </div>
    </PixelatedModal>
  )
}
