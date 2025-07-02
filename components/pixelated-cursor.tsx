"use client"

import { useEffect, useState } from "react"

export function PixelatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", updatePosition)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
    }
  }, [])

  return (
    <>
      {/* Main cursor - sempre marrom */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          width: "16px",
          height: "16px",
          backgroundColor: "#594c3d", // Sempre marrom
          clipPath: "polygon(0 0, 12px 0, 12px 8px, 8px 8px, 8px 12px, 0 12px)",
          imageRendering: "pixelated",
          zIndex: 9999,
          // Borda para visibilidade
          boxShadow: `
            0 0 0 1px #2d251e,
            0 0 0 2px rgba(255, 255, 255, 0.3),
            0 0 4px rgba(0, 0, 0, 0.2)
          `,
        }}
      />

      {/* Cursor outline para melhor visibilidade */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: position.x - 9,
          top: position.y - 9,
          width: "18px",
          height: "18px",
          backgroundColor: "transparent",
          clipPath: "polygon(0 0, 13px 0, 13px 9px, 9px 9px, 9px 13px, 0 13px)",
          imageRendering: "pixelated",
          zIndex: 9998,
          border: "1px solid rgba(255, 255, 255, 0.5)",
          filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))",
        }}
      />
    </>
  )
}
