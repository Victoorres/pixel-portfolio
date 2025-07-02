import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface PixelatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success"
  size?: "sm" | "md" | "lg"
}

const PixelatedButton = forwardRef<HTMLButtonElement, PixelatedButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-teal-600 text-white hover:bg-teal-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      success: "bg-green-500 text-white hover:bg-green-600",
    }

    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "relative font-mono font-bold uppercase tracking-wide transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
          // Pixelated border effect
          "before:absolute before:inset-0 before:border-2 before:border-black",
          "before:shadow-[2px_0_0_0_black,0_2px_0_0_black,-2px_0_0_0_black,0_-2px_0_0_black]",
          // Corner pixels
          "after:absolute after:inset-0",
          "after:shadow-[2px_2px_0_0_black,2px_-2px_0_0_black,-2px_2px_0_0_black,-2px_-2px_0_0_black]",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)

PixelatedButton.displayName = "PixelatedButton"

export { PixelatedButton }
