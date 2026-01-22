"use client";

import type React from "react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ToolTipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  variant?: "default" | "dark" | "gradient" | "glass" | "colorful";
  size?: "sm" | "md" | "lg";
  delayDuration?: number;
  disabled?: boolean;
  className?: string;
  maxWidth?: string;
  forceOpen?: boolean;
}

function ToolTip({
  children,
  content,
  side = "top",
  variant = "default",
  size = "md",
  delayDuration = 200,
  disabled = false,
  className,
  maxWidth = "200px",
  forceOpen = false,
}: ToolTipProps) {
  const variantStyles = {
    default: "bg-background text-foreground border border-border shadow-md",
    dark: "bg-gray-900 text-white border border-gray-700 shadow-lg",
    gradient:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg",
    glass:
      "bg-background/80 backdrop-blur-md text-foreground border border-border/50 shadow-xl",
    colorful:
      "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-lg",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip delayDuration={delayDuration} open={forceOpen ? true : undefined}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className={cn(
          "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 animate-in data-[state=closed]:animate-out",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "z-50 rounded-lg",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        side={side}
        style={{ maxWidth }}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

// Mobile-friendly tooltip that shows/hides on tap
function MobileTooltipDemo({
  children,
  content,
  variant = "default",
  size = "md",
  side = "top",
  maxWidth = "200px",
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  variant?: "default" | "dark" | "gradient" | "glass" | "colorful";
  size?: "sm" | "md" | "lg";
  side?: "top" | "bottom" | "left" | "right";
  maxWidth?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <ToolTip
        content={content}
        maxWidth={maxWidth}
        side={side}
        size={size}
        variant={variant}
      >
        {children}
      </ToolTip>
    );
  }

  return (
    <ToolTip
      content={content}
      forceOpen={isOpen}
      maxWidth={maxWidth}
      side={side}
      size={size}
      variant={variant}
    >
      <button
        className="cursor-pointer"
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {children}
      </button>
    </ToolTip>
  );
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Showcase component with extensive demo UI
export default function ToolTipShowcase() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8 md:space-y-16">
        {/* Hero Section */}
        <div className="space-y-4 text-center md:space-y-6">
          {/* Main Demo */}
          <div className="relative rounded-3xl border border-border/50 bg-card/30 p-4 shadow-2xl backdrop-blur-sm md:p-8">
            {isMobile && (
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
                <p className="text-center text-blue-700 text-xs dark:text-blue-300">
                  💡 Tap buttons to see tooltips on mobile
                </p>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              <MobileTooltipDemo
                content="Clean default styling that adapts to your theme"
                size={isMobile ? "sm" : "md"}
                variant="default"
              >
                <button
                  className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90`}
                  type="button"
                >
                  Default Style
                </button>
              </MobileTooltipDemo>
              <MobileTooltipDemo
                content="Beautiful gradient styling with vibrant colors"
                size={isMobile ? "sm" : "md"}
                variant="gradient"
              >
                <button
                  className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-linear-to-r from-purple-500 to-pink-500 font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600`}
                  type="button"
                >
                  Gradient Magic
                </button>
              </MobileTooltipDemo>
              <MobileTooltipDemo
                content="Glassmorphism effect with backdrop blur"
                size={isMobile ? "sm" : "md"}
                variant="glass"
              >
                <button
                  className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg border border-border bg-background/20 font-medium backdrop-blur-sm transition-all hover:bg-background/30`}
                  type="button"
                >
                  Glass Effect
                </button>
              </MobileTooltipDemo>
            </div>
          </div>
        </div>

        {/* Variant Styles */}
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-2xl md:text-3xl">Variant Styles</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Choose the perfect style for your design system
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {/* Default Variant */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-blue-700 text-lg md:text-xl dark:text-blue-300">
                  Default
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Theme-adaptive styling
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200/30 bg-linear-to-br from-blue-50/30 to-blue-100/20 p-4 md:p-6 dark:border-blue-800/20 dark:from-blue-950/20 dark:to-blue-900/10">
                <div className="text-center">
                  <MobileTooltipDemo
                    content="Clean default styling that adapts to your theme"
                    size={isMobile ? "sm" : "md"}
                  >
                    <button
                      className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90`}
                      type="button"
                    >
                      {isMobile ? "Tap for Default" : "Hover for Default"}
                    </button>
                  </MobileTooltipDemo>
                </div>
              </div>
            </div>

            {/* Dark Variant */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-gray-700 text-lg md:text-xl dark:text-gray-300">
                  Dark
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Always dark theme
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200/30 bg-linear-to-br from-gray-50/30 to-gray-100/20 p-4 md:p-6 dark:border-gray-800/20 dark:from-gray-950/20 dark:to-gray-900/10">
                <div className="text-center">
                  <MobileTooltipDemo
                    content="Dark themed tooltip for modern interfaces"
                    size={isMobile ? "sm" : "md"}
                    variant="dark"
                  >
                    <button
                      className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-gray-800 font-medium text-white transition-colors hover:bg-gray-900`}
                      type="button"
                    >
                      {isMobile ? "Tap for Dark" : "Hover for Dark"}
                    </button>
                  </MobileTooltipDemo>
                </div>
              </div>
            </div>

            {/* Gradient Variant */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-lg text-purple-700 md:text-xl dark:text-purple-300">
                  Gradient
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Vibrant gradient styling
                </p>
              </div>
              <div className="rounded-2xl border border-purple-200/30 bg-linear-to-br from-purple-50/30 to-pink-100/20 p-4 md:p-6 dark:border-purple-800/20 dark:from-purple-950/20 dark:to-pink-900/10">
                <div className="text-center">
                  <MobileTooltipDemo
                    content="Beautiful gradient styling with vibrant colors"
                    size={isMobile ? "sm" : "md"}
                    variant="gradient"
                  >
                    <button
                      className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-linear-to-r from-purple-500 to-pink-500 font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600`}
                      type="button"
                    >
                      {isMobile ? "Tap for Gradient" : "Hover for Gradient"}
                    </button>
                  </MobileTooltipDemo>
                </div>
              </div>
            </div>

            {/* Glass Variant */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-cyan-700 text-lg md:text-xl dark:text-cyan-300">
                  Glass
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Glassmorphism effect
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-200/30 bg-linear-to-br from-cyan-50/30 to-blue-100/20 p-4 md:p-6 dark:border-cyan-800/20 dark:from-cyan-950/20 dark:to-blue-900/10">
                <div className="text-center">
                  <MobileTooltipDemo
                    content="Glassmorphism effect with backdrop blur"
                    size={isMobile ? "sm" : "md"}
                    variant="glass"
                  >
                    <button
                      className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg border border-border bg-background/20 font-medium backdrop-blur-sm transition-all hover:bg-background/30`}
                      type="button"
                    >
                      {isMobile ? "Tap for Glass" : "Hover for Glass"}
                    </button>
                  </MobileTooltipDemo>
                </div>
              </div>
            </div>

            {/* Colorful Variant */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text font-semibold text-lg text-rainbow text-transparent md:text-xl">
                  Colorful
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Multi-color gradient
                </p>
              </div>
              <div className="rounded-2xl border border-blue-200/30 border-linear-to-r bg-linear-to-br from-blue-50/30 via-purple-50/20 to-pink-100/20 p-4 md:p-6 dark:border-blue-800/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-900/10">
                <div className="text-center">
                  <MobileTooltipDemo
                    content="Vibrant multi-color gradient design"
                    size={isMobile ? "sm" : "md"}
                    variant="colorful"
                  >
                    <button
                      className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 font-medium text-white transition-transform hover:scale-105`}
                      type="button"
                    >
                      {isMobile ? "Tap for Colorful" : "Hover for Colorful"}
                    </button>
                  </MobileTooltipDemo>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position Demonstration */}
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-2xl md:text-3xl">Position Options</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Tooltips can appear from any direction
            </p>
          </div>

          <div className="rounded-3xl border border-border/50 bg-linear-to-br from-muted/50 to-muted/30 p-8 md:p-16">
            <div className="flex flex-col items-center space-y-8 md:space-y-12">
              <MobileTooltipDemo
                content="Tooltip positioned at the top"
                side="top"
                size={isMobile ? "sm" : "md"}
                variant="gradient"
              >
                <button
                  className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-blue-500 text-white shadow-lg transition-colors hover:bg-blue-600`}
                  type="button"
                >
                  Top Position
                </button>
              </MobileTooltipDemo>

              <div className="flex space-x-8 md:space-x-16">
                <MobileTooltipDemo
                  content="Tooltip positioned to the left"
                  side="left"
                  size={isMobile ? "sm" : "md"}
                  variant="dark"
                >
                  <button
                    className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600`}
                    type="button"
                  >
                    Left Position
                  </button>
                </MobileTooltipDemo>

                <MobileTooltipDemo
                  content="Tooltip positioned to the right"
                  side="right"
                  size={isMobile ? "sm" : "md"}
                  variant="colorful"
                >
                  <button
                    className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-purple-500 text-white shadow-lg transition-colors hover:bg-purple-600`}
                    type="button"
                  >
                    Right Position
                  </button>
                </MobileTooltipDemo>
              </div>

              <MobileTooltipDemo
                content="Tooltip positioned at the bottom"
                side="bottom"
                size={isMobile ? "sm" : "md"}
                variant="glass"
              >
                <button
                  className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-pink-500 text-white shadow-lg transition-colors hover:bg-pink-600`}
                  type="button"
                >
                  Bottom Position
                </button>
              </MobileTooltipDemo>
            </div>
          </div>
        </div>

        {/* Size Options */}
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-2xl md:text-3xl">Size Variations</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Different sizes for different content amounts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-base text-orange-700 md:text-lg dark:text-orange-300">
                Small
              </h3>
              <div className="rounded-2xl border border-orange-200/30 bg-linear-to-br from-orange-50/30 to-amber-100/20 p-4 md:p-6 dark:border-orange-800/20 dark:from-orange-950/20 dark:to-amber-900/10">
                <MobileTooltipDemo
                  content="Small tooltip"
                  size="sm"
                  variant="default"
                >
                  <button
                    className={`${isMobile ? "px-3 py-2 text-xs" : "px-4 py-2"} rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-muted/80`}
                    type="button"
                  >
                    Small Size
                  </button>
                </MobileTooltipDemo>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-base text-blue-700 md:text-lg dark:text-blue-300">
                Medium
              </h3>
              <div className="rounded-2xl border border-blue-200/30 bg-linear-to-br from-blue-50/30 to-blue-100/20 p-4 md:p-6 dark:border-blue-800/20 dark:from-blue-950/20 dark:to-blue-900/10">
                <MobileTooltipDemo
                  content="Medium sized tooltip with more content"
                  size="md"
                  variant="gradient"
                >
                  <button
                    className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90`}
                    type="button"
                  >
                    Medium Size
                  </button>
                </MobileTooltipDemo>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-base text-purple-700 md:text-lg dark:text-purple-300">
                Large
              </h3>
              <div className="rounded-2xl border border-purple-200/30 bg-linear-to-br from-purple-50/30 to-violet-100/20 p-4 md:p-6 dark:border-purple-800/20 dark:from-purple-950/20 dark:to-violet-900/10">
                <MobileTooltipDemo
                  content="Large tooltip with even more detailed content and comprehensive information"
                  size={isMobile ? "md" : "lg"}
                  variant="colorful"
                >
                  <button
                    className={`${isMobile ? "px-4 py-2 text-sm" : "px-8 py-4 text-lg"} rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80`}
                    type="button"
                  >
                    Large Size
                  </button>
                </MobileTooltipDemo>
              </div>
            </div>
          </div>
        </div>

        {/* Rich Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-2xl md:text-3xl">
              Rich Content Examples
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Tooltips can contain complex layouts and interactive elements
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-base text-blue-700 md:text-lg dark:text-blue-300">
                User Profile
              </h3>
              <div className="rounded-2xl border border-blue-200/30 bg-linear-to-br from-blue-50/30 to-blue-100/20 p-4 md:p-6 dark:border-blue-800/20 dark:from-blue-950/20 dark:to-blue-900/10">
                <MobileTooltipDemo
                  content={
                    <div className="space-y-2">
                      <div className="font-semibold">User Profile</div>
                      <div className="text-sm opacity-90">John Doe</div>
                      <div className="text-xs opacity-75">
                        Software Engineer
                      </div>
                    </div>
                  }
                  maxWidth="180px"
                  size={isMobile ? "sm" : "md"}
                  variant="dark"
                >
                  <div
                    className={`${isMobile ? "h-12 w-12" : "h-16 w-16"} mx-auto flex cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-500 font-semibold text-white transition-transform hover:scale-110 ${isMobile ? "text-sm" : ""}`}
                  >
                    JD
                  </div>
                </MobileTooltipDemo>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-base text-green-700 md:text-lg dark:text-green-300">
                Status Indicator
              </h3>
              <div className="rounded-2xl border border-green-200/30 bg-linear-to-br from-green-50/30 to-emerald-100/20 p-4 md:p-6 dark:border-green-800/20 dark:from-green-950/20 dark:to-emerald-900/10">
                <div className="flex justify-center">
                  <MobileTooltipDemo
                    content={
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-green-400" />
                          <span className="font-medium">Online</span>
                        </div>
                        <div className="text-sm">Last seen: Just now</div>
                      </div>
                    }
                    side="top"
                    size={isMobile ? "sm" : "md"}
                    variant="glass"
                  >
                    <div
                      className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} cursor-pointer rounded-full bg-green-400 transition-transform hover:scale-125`}
                    />
                  </MobileTooltipDemo>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-base text-purple-700 md:text-lg dark:text-purple-300">
                Progress Tracker
              </h3>
              <div className="rounded-2xl border border-purple-200/30 bg-linear-to-br from-purple-50/30 to-violet-100/20 p-4 md:p-6 dark:border-purple-800/20 dark:from-purple-950/20 dark:to-violet-900/10">
                <MobileTooltipDemo
                  content={
                    <div className="space-y-2">
                      <div className="font-medium">Progress: 75%</div>
                      <div
                        className={`${isMobile ? "h-1.5 w-24" : "h-2 w-32"} overflow-hidden rounded-full bg-gray-200`}
                      >
                        <div className="h-full w-3/4 rounded-full bg-linear-to-r from-green-400 to-blue-500" />
                      </div>
                      <div className="text-xs opacity-75">
                        3 of 4 tasks completed
                      </div>
                    </div>
                  }
                  maxWidth="180px"
                  side="top"
                  size={isMobile ? "sm" : "md"}
                  variant="gradient"
                >
                  <div
                    className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} cursor-pointer rounded-lg bg-muted transition-colors hover:bg-muted/80`}
                  >
                    Project Status
                  </div>
                </MobileTooltipDemo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ToolTipTheme() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 text-center md:space-y-6">
      {/* Main Demo */}
      <div className="relative rounded-3xl border border-border/50 bg-card/30 p-4 shadow-2xl backdrop-blur-sm md:p-8">
        {isMobile && (
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
            <p className="text-center text-blue-700 text-xs dark:text-blue-300">
              💡 Tap buttons to see tooltips on mobile
            </p>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <MobileTooltipDemo
            content="Clean default styling that adapts to your theme"
            size={isMobile ? "sm" : "md"}
            variant="default"
          >
            <button
              className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90`}
              type="button"
            >
              Default Style
            </button>
          </MobileTooltipDemo>
          <MobileTooltipDemo
            content="Beautiful gradient styling with vibrant colors"
            size={isMobile ? "sm" : "md"}
            variant="gradient"
          >
            <button
              className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg bg-linear-to-r from-purple-500 to-pink-500 font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600`}
              type="button"
            >
              Gradient Magic
            </button>
          </MobileTooltipDemo>
          <MobileTooltipDemo
            content="Glassmorphism effect with backdrop blur"
            size={isMobile ? "sm" : "md"}
            variant="glass"
          >
            <button
              className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-lg border border-border bg-background/20 font-medium backdrop-blur-sm transition-all hover:bg-background/30`}
              type="button"
            >
              Glass Effect
            </button>
          </MobileTooltipDemo>
        </div>
      </div>
    </div>
  );
}
