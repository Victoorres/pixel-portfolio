import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

interface PixelatedCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark"
}

const PixelatedCard = forwardRef<HTMLDivElement, PixelatedCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 border-gray-800",
      dark: "bg-gray-800 border-gray-200 text-white",
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "relative p-6 font-mono",
          // Pixelated border effect
          "before:absolute before:inset-0 before:border-2",
          "before:shadow-[2px_0_0_0_currentColor,0_2px_0_0_currentColor,-2px_0_0_0_currentColor,0_-2px_0_0_currentColor]",
          // Corner pixels
          "after:absolute after:inset-0",
          "after:shadow-[2px_2px_0_0_currentColor,2px_-2px_0_0_currentColor,-2px_2px_0_0_currentColor,-2px_-2px_0_0_currentColor]",
          variants[variant],
          className,
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    )
  },
)

PixelatedCard.displayName = "PixelatedCard"

const PixelatedCardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4 pb-2 border-b-2 border-current", className)} {...props} />
  ),
)

PixelatedCardHeader.displayName = "PixelatedCardHeader"

const PixelatedCardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-bold uppercase tracking-wide", className)} {...props} />
  ),
)

PixelatedCardTitle.displayName = "PixelatedCardTitle"

const PixelatedCardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm leading-relaxed", className)} {...props} />,
)

PixelatedCardContent.displayName = "PixelatedCardContent"

export { PixelatedCard, PixelatedCardHeader, PixelatedCardTitle, PixelatedCardContent }
