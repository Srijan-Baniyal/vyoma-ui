"use client";

import type React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
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
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "z-50 rounded-lg",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        style={{ maxWidth }}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export default function ToolTipShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          
          {/* Main Demo */}
          <div className="relative p-8 rounded-3xl bg-card/30 backdrop-blur-sm border border-border/50 shadow-2xl">
            <div className="flex justify-center gap-6 flex-wrap">
              <ToolTip content="Clean default styling that adapts to your theme" variant="default">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Default Style
                </button>
              </ToolTip>
              <ToolTip content="Beautiful gradient styling with vibrant colors" variant="gradient">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium">
                  Gradient Magic
                </button>
              </ToolTip>
              <ToolTip content="Glassmorphism effect with backdrop blur" variant="glass">
                <button className="px-6 py-3 bg-background/20 backdrop-blur-sm border border-border rounded-lg hover:bg-background/30 transition-all font-medium">
                  Glass Effect
                </button>
              </ToolTip>
            </div>
          </div>
        </div>

        {/* Variant Styles */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Variant Styles</h2>
            <p className="text-muted-foreground">Choose the perfect style for your design system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Default Variant */}
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Default</h3>
                <p className="text-sm text-muted-foreground">Theme-adaptive styling</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50/30 to-blue-100/20 dark:from-blue-950/20 dark:to-blue-900/10 p-6 rounded-2xl border border-blue-200/30 dark:border-blue-800/20">
                <div className="text-center">
                  <ToolTip content="Clean default styling that adapts to your theme">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                      Hover for Default
                    </button>
                  </ToolTip>
                </div>
              </div>
            </div>

            {/* Dark Variant */}
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Dark</h3>
                <p className="text-sm text-muted-foreground">Always dark theme</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50/30 to-gray-100/20 dark:from-gray-950/20 dark:to-gray-900/10 p-6 rounded-2xl border border-gray-200/30 dark:border-gray-800/20">
                <div className="text-center">
                  <ToolTip content="Dark themed tooltip for modern interfaces" variant="dark">
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium">
                      Hover for Dark
                    </button>
                  </ToolTip>
                </div>
              </div>
            </div>

            {/* Gradient Variant */}
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">Gradient</h3>
                <p className="text-sm text-muted-foreground">Vibrant gradient styling</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50/30 to-pink-100/20 dark:from-purple-950/20 dark:to-pink-900/10 p-6 rounded-2xl border border-purple-200/30 dark:border-purple-800/20">
                <div className="text-center">
                  <ToolTip content="Beautiful gradient styling with vibrant colors" variant="gradient">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium">
                      Hover for Gradient
                    </button>
                  </ToolTip>
                </div>
              </div>
            </div>

            {/* Glass Variant */}
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">Glass</h3>
                <p className="text-sm text-muted-foreground">Glassmorphism effect</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50/30 to-blue-100/20 dark:from-cyan-950/20 dark:to-blue-900/10 p-6 rounded-2xl border border-cyan-200/30 dark:border-cyan-800/20">
                <div className="text-center">
                  <ToolTip content="Glassmorphism effect with backdrop blur" variant="glass">
                    <button className="px-6 py-3 bg-background/20 backdrop-blur-sm border border-border rounded-lg hover:bg-background/30 transition-all font-medium">
                      Hover for Glass
                    </button>
                  </ToolTip>
                </div>
              </div>
            </div>

            {/* Colorful Variant */}
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-rainbow bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Colorful</h3>
                <p className="text-sm text-muted-foreground">Multi-color gradient</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-100/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-900/10 p-6 rounded-2xl border border-gradient-to-r border-blue-200/30 dark:border-blue-800/20">
                <div className="text-center">
                  <ToolTip content="Vibrant multi-color gradient design" variant="colorful">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform font-medium">
                      Hover for Colorful
                    </button>
                  </ToolTip>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position Demonstration */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Position Options</h2>
            <p className="text-muted-foreground">Tooltips can appear from any direction</p>
          </div>
          
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 p-16 rounded-3xl border border-border/50">
            <div className="flex flex-col items-center space-y-12">
              <ToolTip content="Tooltip positioned at the top" side="top" variant="gradient">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg">
                  Top Position
                </button>
              </ToolTip>

              <div className="flex space-x-16">
                <ToolTip content="Tooltip positioned to the left" side="left" variant="dark">
                  <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg">
                    Left Position
                  </button>
                </ToolTip>

                <ToolTip content="Tooltip positioned to the right" side="right" variant="colorful">
                  <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-lg">
                    Right Position
                  </button>
                </ToolTip>
              </div>

              <ToolTip content="Tooltip positioned at the bottom" side="bottom" variant="glass">
                <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors shadow-lg">
                  Bottom Position
                </button>
              </ToolTip>
            </div>
          </div>
        </div>

        {/* Size Options */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Size Variations</h2>
            <p className="text-muted-foreground">Different sizes for different content amounts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">Small</h3>
              <div className="bg-gradient-to-br from-orange-50/30 to-amber-100/20 dark:from-orange-950/20 dark:to-amber-900/10 p-6 rounded-2xl border border-orange-200/30 dark:border-orange-800/20">
                <ToolTip content="Small tooltip" size="sm" variant="default">
                  <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                    Small Size
                  </button>
                </ToolTip>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Medium</h3>
              <div className="bg-gradient-to-br from-blue-50/30 to-blue-100/20 dark:from-blue-950/20 dark:to-blue-900/10 p-6 rounded-2xl border border-blue-200/30 dark:border-blue-800/20">
                <ToolTip content="Medium sized tooltip with more content" size="md" variant="gradient">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Medium Size
                  </button>
                </ToolTip>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Large</h3>
              <div className="bg-gradient-to-br from-purple-50/30 to-violet-100/20 dark:from-purple-950/20 dark:to-violet-900/10 p-6 rounded-2xl border border-purple-200/30 dark:border-purple-800/20">
                <ToolTip content="Large tooltip with even more detailed content and comprehensive information" size="lg" variant="colorful">
                  <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg text-lg hover:bg-secondary/80 transition-colors">
                    Large Size
                  </button>
                </ToolTip>
              </div>
            </div>
          </div>
        </div>

        {/* Rich Content */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Rich Content Examples</h2>
            <p className="text-muted-foreground">Tooltips can contain complex layouts and interactive elements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">User Profile</h3>
              <div className="bg-gradient-to-br from-blue-50/30 to-blue-100/20 dark:from-blue-950/20 dark:to-blue-900/10 p-6 rounded-2xl border border-blue-200/30 dark:border-blue-800/20">
                <ToolTip
                  content={
                    <div className="space-y-2">
                      <div className="font-semibold">User Profile</div>
                      <div className="text-sm opacity-90">John Doe</div>
                      <div className="text-xs opacity-75">Software Engineer</div>
                    </div>
                  }
                  variant="dark"
                  maxWidth="180px"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-110 transition-transform mx-auto">
                    JD
                  </div>
                </ToolTip>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Status Indicator</h3>
              <div className="bg-gradient-to-br from-green-50/30 to-emerald-100/20 dark:from-green-950/20 dark:to-emerald-900/10 p-6 rounded-2xl border border-green-200/30 dark:border-green-800/20">
                <div className="flex justify-center">
                  <ToolTip
                    content={
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="font-medium">Online</span>
                        </div>
                        <div className="text-sm">Last seen: Just now</div>
                      </div>
                    }
                    variant="glass"
                    side="top"
                  >
                    <div className="w-6 h-6 bg-green-400 rounded-full cursor-pointer hover:scale-125 transition-transform"></div>
                  </ToolTip>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Progress Tracker</h3>
              <div className="bg-gradient-to-br from-purple-50/30 to-violet-100/20 dark:from-purple-950/20 dark:to-violet-900/10 p-6 rounded-2xl border border-purple-200/30 dark:border-purple-800/20">
                <ToolTip
                  content={
                    <div className="space-y-2">
                      <div className="font-medium">Progress: 75%</div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                      </div>
                      <div className="text-xs opacity-75">3 of 4 tasks completed</div>
                    </div>
                  }
                  variant="gradient"
                  side="top"
                  maxWidth="200px"
                >
                  <div className="px-6 py-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                    Project Status
                  </div>
                </ToolTip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ToolTip };
