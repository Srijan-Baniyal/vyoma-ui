import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGradientTextProps
  extends ComponentPropsWithoutRef<"div"> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 2,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline animate-gradient bg-[length:var(--bg-size)_100%] bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-clip-text text-transparent",
        className
      )}
      style={
        {
          "--bg-size": `${speed * 300}%`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </span>
  );
}
