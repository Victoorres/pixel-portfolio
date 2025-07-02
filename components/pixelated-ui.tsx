"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { type HTMLAttributes, forwardRef, type ButtonHTMLAttributes, useEffect } from "react"

// Pixelated Button Component - Implementação fiel ao design original
interface PixelatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "orange" | "green" | "red" | "grey" | "purple" | "blue" | "twitter"
}

const PixelatedButton = forwardRef<HTMLButtonElement, PixelatedButtonProps>(
  ({ className, variant = "green", children, ...props }, ref) => {
    const variants = {
      default: {
        bg: "#ffffff",
        text: "#594c3d",
        border: "#b6a695",
        highlight: "#e7e7e7",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      orange: {
        bg: "#fcab0b",
        text: "#9b5c19",
        border: "#e8861c",
        highlight: "#fdbc3d",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      green: {
        bg: "#a5da60",
        text: "#476323",
        border: "#89b74c",
        highlight: "#c4ed8e",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      red: {
        bg: "#df644c",
        text: "#892e1f",
        border: "#ba513d",
        highlight: "#ea7f6a",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      grey: {
        bg: "#d1d1d1",
        text: "#959595",
        border: "#c4c4c4",
        highlight: "#e0e0e0",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      purple: {
        bg: "#c557e1",
        text: "#75168d",
        border: "#a848c0",
        highlight: "#d77ded",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      blue: {
        bg: "#1e4b56",
        text: "#c4ebfd",
        border: "#16414c",
        highlight: "#315962",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      twitter: {
        bg: "#55c6e2",
        text: "#1c3940",
        border: "#439db3",
        highlight: "#94e5f9",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
    }

    const colors = variants[variant]

    return (
      <button
        ref={ref}
        className={cn(
          "relative font-mono text-base leading-5 uppercase select-none cursor-pointer",
          "transition-transform active:translate-y-[2px]",
          className,
        )}
        style={{
          background: colors.bg,
          color: colors.text,
          padding: "8px",
          boxShadow: `
            0px 3px ${colors.highlight}, 
            0px -3px ${colors.bg},
            3px 0px ${colors.bg}, 
            -3px 0px ${colors.bg},
            0px -6px ${colors.border}, 
            0px 6px ${colors.border},
            6px 0px ${colors.border}, 
            -6px 0px ${colors.border},
            9px 0px ${colors.shadow}, 
            0px 9px ${colors.shadow}
          `,
        }}
        {...props}
      >
        {/* Corner pixels - 90° corners com z-index maior */}
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            left: "-3px",
            top: "-3px",
            background: colors.border,
          }}
        />
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            right: "-3px",
            top: "-3px",
            background: colors.border,
          }}
        />
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            left: "-3px",
            bottom: "-3px",
            background: colors.highlight,
            boxShadow: `0px 3px ${colors.border}, -3px 3px ${colors.shadow}`,
          }}
        />
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            right: "-3px",
            bottom: "-3px",
            background: colors.highlight,
            boxShadow: `0px 3px ${colors.border}, 3px 3px ${colors.shadow}`,
          }}
        />

        {/* pixelsTop */}
        <div
          className="pixelsTop absolute z-10"
          style={{
            width: "calc(100% + 12px)",
            left: "-6px",
            top: "-3px",
            height: "0px",
          }}
        >
          {/* Top left pixel */}
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              left: "3px",
              top: "0px",
              background: colors.border,
            }}
          />
          {/* Top right pixel */}
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              right: "3px",
              top: "0px",
              background: colors.border,
            }}
          />
        </div>

        {/* pixelsBottom */}
        <div
          className="pixelsBottom absolute z-10"
          style={{
            width: "calc(100% + 12px)",
            left: "-6px",
            bottom: "0px",
            height: "0px",
          }}
        >
          {/* Bottom left pixel */}
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              left: "3px",
              top: "-3px",
              background: colors.highlight,
              boxShadow: `
                0px 3px ${colors.border},
                0px 6px ${colors.shadow},
                -3px 3px ${colors.shadow}
              `,
            }}
          />
          {/* Bottom right pixel */}
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              right: "3px",
              top: "-3px",
              background: colors.highlight,
              boxShadow: `
                0px 3px ${colors.border},
                0px 6px ${colors.shadow},
                3px 3px ${colors.shadow}
              `,
            }}
          />
        </div>

        <span className="relative z-30">{children}</span>
      </button>
    )
  },
)

PixelatedButton.displayName = "PixelatedButton"

// Pixelated Box Component
interface PixelatedBoxProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "orange" | "green" | "red" | "grey" | "purple" | "blue" | "twitter"
}

const PixelatedBox = forwardRef<HTMLDivElement, PixelatedBoxProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: {
        bg: "#ffffff",
        text: "#594c3d",
        border: "#b6a695",
        highlight: "#e7e7e7",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      orange: {
        bg: "#fcab0b",
        text: "#9b5c19",
        border: "#e8861c",
        highlight: "#fdbc3d",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      green: {
        bg: "#a5da60",
        text: "#476323",
        border: "#89b74c",
        highlight: "#c4ed8e",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      red: {
        bg: "#df644c",
        text: "#892e1f",
        border: "#ba513d",
        highlight: "#ea7f6a",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      grey: {
        bg: "#d1d1d1",
        text: "#959595",
        border: "#c4c4c4",
        highlight: "#e0e0e0",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      purple: {
        bg: "#c557e1",
        text: "#75168d",
        border: "#a848c0",
        highlight: "#d77ded",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      blue: {
        bg: "#1e4b56",
        text: "#c4ebfd",
        border: "#16414c",
        highlight: "#315962",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      twitter: {
        bg: "#55c6e2",
        text: "#1c3940",
        border: "#439db3",
        highlight: "#94e5f9",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
    }

    const colors = variants[variant]

    return (
      <div
        ref={ref}
        className={cn("relative font-mono text-base leading-5 uppercase select-none", className)}
        style={{
          background: colors.bg,
          color: colors.text,
          padding: "12px",
          boxShadow: `
            0px 3px ${colors.highlight}, 
            0px -3px ${colors.bg},
            3px 0px ${colors.bg}, 
            -3px 0px ${colors.bg},
            0px -6px ${colors.border}, 
            0px 6px ${colors.border},
            6px 0px ${colors.border}, 
            -6px 0px ${colors.border},
            9px 0px ${colors.shadow}, 
            0px 9px ${colors.shadow}
          `,
        }}
        {...props}
      >
        {/* Corner pixels - 90° corners com z-index maior */}
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            left: "-3px",
            top: "-3px",
            background: colors.border,
          }}
        />
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            right: "-3px",
            top: "-3px",
            background: colors.border,
          }}
        />
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            left: "-3px",
            bottom: "-3px",
            background: colors.highlight,
            boxShadow: `0px 3px ${colors.border}, -3px 3px ${colors.shadow}`,
          }}
        />
        <div
          className="absolute z-20"
          style={{
            width: "3px",
            height: "3px",
            right: "-3px",
            bottom: "-3px",
            background: colors.highlight,
            boxShadow: `0px 3px ${colors.border}, 3px 3px ${colors.shadow}`,
          }}
        />

        {/* pixelsTop */}
        <div
          className="pixelsTop absolute z-10"
          style={{
            width: "calc(100% + 12px)",
            left: "-6px",
            top: "-3px",
            height: "0px",
          }}
        >
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              left: "3px",
              top: "0px",
              background: colors.border,
            }}
          />
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              right: "3px",
              top: "0px",
              background: colors.border,
            }}
          />
        </div>

        {/* pixelsBottom */}
        <div
          className="pixelsBottom absolute z-10"
          style={{
            width: "calc(100% + 12px)",
            left: "-6px",
            bottom: "0px",
            height: "0px",
          }}
        >
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              left: "3px",
              top: "-3px",
              background: colors.highlight,
              boxShadow: `
                0px 3px ${colors.border},
                0px 6px ${colors.shadow},
                -3px 3px ${colors.shadow}
              `,
            }}
          />
          <div
            className="absolute block"
            style={{
              width: "3px",
              height: "3px",
              right: "3px",
              top: "-3px",
              background: colors.highlight,
              boxShadow: `
                0px 3px ${colors.border},
                0px 6px ${colors.shadow},
                3px 3px ${colors.shadow}
              `,
            }}
          />
        </div>

        <div className="relative z-30">{children}</div>
      </div>
    )
  },
)

PixelatedBox.displayName = "PixelatedBox"

// Pixelated Card Component
const PixelatedCard = forwardRef<HTMLDivElement, PixelatedBoxProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <PixelatedBox ref={ref} variant={variant} className={cn("p-6", className)} {...props}>
        {children}
      </PixelatedBox>
    )
  },
)

PixelatedCard.displayName = "PixelatedCard"

// Pixelated Modal Component - COM BOTÃO X PIXELADO
interface PixelatedModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  showStar?: boolean
}

const PixelatedModal = forwardRef<HTMLDivElement, PixelatedModalProps>(
  ({ className, isOpen, onClose, title, showStar = false, children, ...props }, ref) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }

      return () => {
        document.body.style.overflow = "unset"
      }
    }, [isOpen])

    if (!isOpen) return null

    const variants = {
      default: {
        bg: "#ffffff",
        text: "#594c3d",
        border: "#b6a695",
        highlight: "#e7e7e7",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      blue: {
        bg: "#1e4b56",
        text: "#c4ebfd",
        border: "#16414c",
        highlight: "#315962",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
    }

    const modalColors = variants.default
    const headerColors = variants.blue

    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[9000]">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={onClose} />

        {/* Modal Container */}
        <div
          ref={ref}
          className={cn("relative w-full max-w-4xl max-h-[80vh] md:max-h-[90vh] flex flex-col z-[9001]", className)}
          style={{
            background: modalColors.bg,
            color: modalColors.text,
            boxShadow: `
              0px 3px ${modalColors.highlight}, 
              0px -3px ${modalColors.bg},
              3px 0px ${modalColors.bg}, 
              -3px 0px ${modalColors.bg},
              0px -6px ${modalColors.border}, 
              0px 6px ${modalColors.border},
              6px 0px ${modalColors.border}, 
              -6px 0px ${modalColors.border},
              9px 0px ${modalColors.shadow}, 
              0px 9px ${modalColors.shadow}
            `,
          }}
          {...props}
        >
          {/* Corner pixels do modal */}
          <div
            className="absolute z-20"
            style={{
              width: "3px",
              height: "3px",
              left: "-3px",
              top: "-3px",
              background: modalColors.border,
            }}
          />
          <div
            className="absolute z-20"
            style={{
              width: "3px",
              height: "3px",
              right: "-3px",
              top: "-3px",
              background: modalColors.border,
            }}
          />
          <div
            className="absolute z-20"
            style={{
              width: "3px",
              height: "3px",
              left: "-3px",
              bottom: "-3px",
              background: modalColors.highlight,
              boxShadow: `0px 3px ${modalColors.border}, -3px 3px ${modalColors.shadow}`,
            }}
          />
          <div
            className="absolute z-20"
            style={{
              width: "3px",
              height: "3px",
              right: "-3px",
              bottom: "-3px",
              background: modalColors.highlight,
              boxShadow: `0px 3px ${modalColors.border}, 3px 3px ${modalColors.shadow}`,
            }}
          />

          {/* pixelsTop do modal */}
          <div
            className="absolute z-10"
            style={{
              width: "calc(100% + 12px)",
              left: "-6px",
              top: "-3px",
              height: "0px",
            }}
          >
            <div
              className="absolute block"
              style={{
                width: "3px",
                height: "3px",
                left: "3px",
                top: "0px",
                background: modalColors.border,
              }}
            />
            <div
              className="absolute block"
              style={{
                width: "3px",
                height: "3px",
                right: "3px",
                top: "0px",
                background: modalColors.border,
              }}
            />
          </div>

          {/* pixelsBottom do modal */}
          <div
            className="absolute z-10"
            style={{
              width: "calc(100% + 12px)",
              left: "-6px",
              bottom: "0px",
              height: "0px",
            }}
          >
            <div
              className="absolute block"
              style={{
                width: "3px",
                height: "3px",
                left: "3px",
                top: "-3px",
                background: modalColors.highlight,
                boxShadow: `
                  0px 3px ${modalColors.border},
                  0px 6px ${modalColors.shadow},
                  -3px 3px ${modalColors.shadow}
                `,
              }}
            />
            <div
              className="absolute block"
              style={{
                width: "3px",
                height: "3px",
                right: "3px",
                top: "-3px",
                background: modalColors.highlight,
                boxShadow: `
                  0px 3px ${modalColors.border},
                  0px 6px ${modalColors.shadow},
                  3px 3px ${modalColors.shadow}
                `,
              }}
            />
          </div>

          {/* Header com botão X PIXELADO */}
          {title && (
            <div
              className="relative flex-shrink-0 text-center p-4 z-30"
              style={{
                background: headerColors.bg,
                color: headerColors.text,
                boxShadow: `
                  0px 3px ${headerColors.highlight}, 
                  0px -3px ${headerColors.bg},
                  3px 0px ${headerColors.bg}, 
                  -3px 0px ${headerColors.bg},
                  0px -6px ${headerColors.border}, 
                  0px 6px ${headerColors.border},
                  6px 0px ${headerColors.border}, 
                  -6px 0px ${headerColors.border}
                `,
              }}
            >
              {/* Corner pixels do header */}
              <div
                className="absolute z-20"
                style={{
                  width: "3px",
                  height: "3px",
                  left: "-3px",
                  top: "-3px",
                  background: headerColors.border,
                }}
              />
              <div
                className="absolute z-20"
                style={{
                  width: "3px",
                  height: "3px",
                  right: "-3px",
                  top: "-3px",
                  background: headerColors.border,
                }}
              />
              <div
                className="absolute z-20"
                style={{
                  width: "3px",
                  height: "3px",
                  left: "-3px",
                  bottom: "-3px",
                  background: headerColors.highlight,
                }}
              />
              <div
                className="absolute z-20"
                style={{
                  width: "3px",
                  height: "3px",
                  right: "-3px",
                  bottom: "-3px",
                  background: headerColors.highlight,
                }}
              />

              {/* pixelsTop do header */}
              <div
                className="absolute z-10"
                style={{
                  width: "calc(100% + 12px)",
                  left: "-6px",
                  top: "-3px",
                  height: "0px",
                }}
              >
                <div
                  className="absolute block"
                  style={{
                    width: "3px",
                    height: "3px",
                    left: "3px",
                    top: "0px",
                    background: headerColors.border,
                  }}
                />
                <div
                  className="absolute block"
                  style={{
                    width: "3px",
                    height: "3px",
                    right: "3px",
                    top: "0px",
                    background: headerColors.border,
                  }}
                />
              </div>

              {/* pixelsBottom do header */}
              <div
                className="absolute z-10"
                style={{
                  width: "calc(100% + 12px)",
                  left: "-6px",
                  bottom: "0px",
                  height: "0px",
                }}
              >
                <div
                  className="absolute block"
                  style={{
                    width: "3px",
                    height: "3px",
                    left: "3px",
                    top: "-3px",
                    background: headerColors.highlight,
                  }}
                />
                <div
                  className="absolute block"
                  style={{
                    width: "3px",
                    height: "3px",
                    right: "3px",
                    top: "-3px",
                    background: headerColors.highlight,
                  }}
                />
              </div>

              <div className="relative flex items-center md:justify-center gap-2 font-mono uppercase z-40">
                {showStar && <span className="text-yellow-400 text-xl md:display hidden">★</span>}
                <span className="font-bold tracking-wide">{title}</span>

                {/* Botão X PIXELADO usando PixelatedButton */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
                  <PixelatedButton
                    variant="red"
                    className="p-2 pixel-cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onClose()
                      // Play close sound
                      if ((window as any).playPixelSound) {
                        ;(window as any).playPixelSound(400, 100)
                      }
                    }}
                  >
                    <X className="w-5 h-5" />
                  </PixelatedButton>
                </div>
              </div>
            </div>
          )}

          {/* Content com SCROLL */}
          <div className="relative flex-1 overflow-y-auto p-8 font-mono uppercase text-left z-30 mt-1.5">{children}</div>
        </div>
      </div>
    )
  },
)

PixelatedModal.displayName = "PixelatedModal"

export { PixelatedBox, PixelatedButton, PixelatedCard, PixelatedModal }
