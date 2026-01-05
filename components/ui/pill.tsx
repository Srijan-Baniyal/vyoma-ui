import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-2 font-medium backdrop-blur-sm transition-all md:gap-3 md:px-6 md:py-3",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/5 text-primary",
        secondary:
          "border-secondary/20 bg-secondary/5 text-secondary-foreground",
        success: "border-green-500/20 bg-green-500/5 text-green-600",
        warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-600",
        error: "border-red-500/20 bg-red-500/5 text-red-600",
        info: "border-blue-500/20 bg-blue-500/5 text-blue-600",
        outline: "border-border bg-background/50 text-foreground",
      },
      size: {
        default: "px-3 py-2 text-xs md:px-6 md:py-3 md:text-sm",
        sm: "px-2 py-1 text-xs md:px-4 md:py-2",
        lg: "px-4 py-3 text-sm md:px-8 md:py-4 md:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const statusVariants = cva("rounded-full", {
  variants: {
    status: {
      none: "hidden",
      active: "h-1.5 w-1.5 animate-pulse bg-green-500 md:h-2 md:w-2",
      inactive: "h-1.5 w-1.5 bg-gray-400 md:h-2 md:w-2",
      warning: "h-1.5 w-1.5 animate-pulse bg-yellow-500 md:h-2 md:w-2",
      error: "h-1.5 w-1.5 animate-pulse bg-red-500 md:h-2 md:w-2",
      info: "h-1.5 w-1.5 animate-pulse bg-blue-500 md:h-2 md:w-2",
    },
  },
  defaultVariants: {
    status: "none",
  },
});

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  status?: VariantProps<typeof statusVariants>["status"];
  asChild?: boolean;
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      children,
      status,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        className={cn(pillVariants({ variant, size }), className)}
        data-slot="pill"
        ref={ref}
        {...props}
      >
        {icon && (
          <span className="flex h-3 w-3 flex-shrink-0 items-center justify-center md:h-4 md:w-4 lg:h-5 lg:w-5">
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
        <div className={cn(statusVariants({ status }), "flex-shrink-0")} />
      </Comp>
    );
  }
);

Pill.displayName = "Pill";

export { Pill, pillVariants };
