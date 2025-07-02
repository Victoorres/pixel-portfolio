"use client"

import { cn } from "@/lib/utils"
import { X, Star } from "lucide-react"
import { type HTMLAttributes, forwardRef, useEffect } from "react"

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

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            // Base styles
            "relative bg-gray-100 font-mono max-w-md w-full mx-4",
            // Pixelated border effect
            "before:absolute before:inset-0 before:border-2 before:border-black",
            "before:shadow-[2px_0_0_0_black,0_2px_0_0_black,-2px_0_0_0_black,0_-2px_0_0_black]",
            // Corner pixels
            "after:absolute after:inset-0",
            "after:shadow-[2px_2px_0_0_black,2px_-2px_0_0_black,-2px_2px_0_0_black,-2px_-2px_0_0_black]",
            className,
          )}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="relative bg-teal-600 text-white p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                {showStar && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
                <h2 className="font-bold uppercase tracking-wide">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 p-6">{children}</div>
        </div>
      </div>
    )
  },
)

PixelatedModal.displayName = "PixelatedModal"

export { PixelatedModal }
