import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pillVariants = cva(
  "inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/5 text-primary",
        secondary: "border-secondary/20 bg-secondary/5 text-secondary-foreground",
        success: "border-green-500/20 bg-green-500/5 text-green-600",
        warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-600",
        error: "border-red-500/20 bg-red-500/5 text-red-600",
        info: "border-blue-500/20 bg-blue-500/5 text-blue-600",
        outline: "border-border bg-background/50 text-foreground",
      },
      size: {
        default: "px-6 py-3 text-sm",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const statusVariants = cva("rounded-full", {
  variants: {
    status: {
      none: "hidden",
      active: "w-2 h-2 bg-green-500 animate-pulse",
      inactive: "w-2 h-2 bg-gray-400",
      warning: "w-2 h-2 bg-yellow-500 animate-pulse",
      error: "w-2 h-2 bg-red-500 animate-pulse",
      info: "w-2 h-2 bg-blue-500 animate-pulse",
    },
  },
  defaultVariants: {
    status: "none",
  },
})

export interface PillProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  icon?: React.ReactNode
  children: React.ReactNode
  status?: VariantProps<typeof statusVariants>["status"]
  asChild?: boolean
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant, size, icon, children, status, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        data-slot="pill"
        className={cn(pillVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <span className="w-5 h-5 flex items-center justify-center">
            {icon}
          </span>
        )}
        <span>{children}</span>
        <div className={cn(statusVariants({ status }))} />
      </Comp>
    )
  }
)

Pill.displayName = "Pill"

export { Pill, pillVariants } 