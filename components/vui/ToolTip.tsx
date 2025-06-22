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

interface ToolTipShowcaseProps {
  className?: string;
}

export default function ToolTipShowcase({ className }: ToolTipShowcaseProps) {
  return (
    <div className={cn("w-full max-w-7xl mx-auto p-8 space-y-12", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          VUI ToolTip Collection
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Beautiful, accessible tooltips with multiple variants, positions, and
          rich content support.
        </p>
      </div>

      {/* Basic Variants Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Variant Styles</h2>
          <p className="text-muted-foreground">
            Different visual styles for various design needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <div className="flex flex-col items-center space-y-4">
            <ToolTip content="Clean default styling that adapts to your theme">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Default
              </button>
            </ToolTip>
            <span className="text-xs text-muted-foreground text-center">
              Theme-adaptive default
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <ToolTip
              content="Dark themed tooltip for modern interfaces"
              variant="dark"
            >
              <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium">
                Dark
              </button>
            </ToolTip>
            <span className="text-xs text-muted-foreground text-center">
              Always dark theme
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <ToolTip
              content="Beautiful gradient styling with vibrant colors"
              variant="gradient"
            >
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium">
                Gradient
              </button>
            </ToolTip>
            <span className="text-xs text-muted-foreground text-center">
              Purple to pink gradient
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <ToolTip
              content="Glassmorphism effect with backdrop blur"
              variant="glass"
            >
              <button className="px-6 py-3 bg-background/20 backdrop-blur-sm border border-border rounded-lg hover:bg-background/30 transition-all font-medium">
                Glass
              </button>
            </ToolTip>
            <span className="text-xs text-muted-foreground text-center">
              Glassmorphism effect
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <ToolTip
              content="Vibrant multi-color gradient design"
              variant="colorful"
            >
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform font-medium">
                Colorful
              </button>
            </ToolTip>
            <span className="text-xs text-muted-foreground text-center">
              Multi-color gradient
            </span>
          </div>
        </div>
      </section>

      {/* Position Variants Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Position Options</h2>
          <p className="text-muted-foreground">
            Tooltips can appear from any direction
          </p>
        </div>
        <div className="bg-muted/30 p-12 rounded-lg">
          <div className="flex flex-col items-center space-y-8">
            <ToolTip
              content="Tooltip positioned at the top"
              side="top"
              variant="gradient"
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Top
              </button>
            </ToolTip>

            <div className="flex space-x-12">
              <ToolTip
                content="Tooltip positioned to the left"
                side="left"
                variant="dark"
              >
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Left
                </button>
              </ToolTip>

              <ToolTip
                content="Tooltip positioned to the right"
                side="right"
                variant="colorful"
              >
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Right
                </button>
              </ToolTip>
            </div>

            <ToolTip
              content="Tooltip positioned at the bottom"
              side="bottom"
              variant="glass"
            >
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                Bottom
              </button>
            </ToolTip>
          </div>
        </div>
      </section>

      {/* Size Variants Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Size Options</h2>
          <p className="text-muted-foreground">
            Different sizes for different content amounts
          </p>
        </div>
        <div className="bg-card border rounded-lg p-8">
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex flex-col items-center space-y-2">
              <ToolTip content="Small tooltip" size="sm" variant="default">
                <button className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/80 transition-colors">
                  Small
                </button>
              </ToolTip>
              <span className="text-xs text-muted-foreground">Small (sm)</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <ToolTip
                content="Medium sized tooltip with more content"
                size="md"
                variant="gradient"
              >
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                  Medium
                </button>
              </ToolTip>
              <span className="text-xs text-muted-foreground">Medium (md)</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <ToolTip
                content="Large tooltip with even more detailed content and comprehensive information"
                size="lg"
                variant="colorful"
              >
                <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-lg hover:bg-secondary/80 transition-colors">
                  Large
                </button>
              </ToolTip>
              <span className="text-xs text-muted-foreground">Large (lg)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Content Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Rich Content</h2>
          <p className="text-muted-foreground">
            Tooltips can contain complex content and layouts
          </p>
        </div>
        <div className="bg-card border rounded-lg p-8">
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="flex flex-col items-center space-y-2">
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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-110 transition-transform">
                  JD
                </div>
              </ToolTip>
              <span className="text-xs text-muted-foreground">
                User profile
              </span>
            </div>

            <div className="flex flex-col items-center space-y-2">
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
                side="right"
              >
                <div className="w-3 h-3 bg-green-400 rounded-full cursor-pointer hover:scale-125 transition-transform"></div>
              </ToolTip>
              <span className="text-xs text-muted-foreground">
                Status indicator
              </span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <ToolTip
                content={
                  <div className="space-y-1">
                    <div className="font-medium">Progress: 75%</div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                    </div>
                    <div className="text-xs opacity-75">
                      3 of 4 tasks completed
                    </div>
                  </div>
                }
                variant="gradient"
                side="top"
                maxWidth="200px"
              >
                <div className="px-4 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                  Project Status
                </div>
              </ToolTip>
              <span className="text-xs text-muted-foreground">
                Progress indicator
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Elements Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Interactive Elements</h2>
          <p className="text-muted-foreground">
            Tooltips work great with form elements and inputs
          </p>
        </div>
        <div className="bg-card border rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <ToolTip
                content="Enter your unique username (3-20 characters)"
                variant="default"
                side="top"
              >
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                  placeholder="Enter username"
                />
              </ToolTip>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <ToolTip
                content="We'll never share your email address"
                variant="dark"
                side="top"
              >
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                  placeholder="Enter email"
                />
              </ToolTip>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <ToolTip
                content={
                  <div className="space-y-1">
                    <div className="font-medium">Password Requirements:</div>
                    <ul className="text-xs space-y-1">
                      <li>• At least 8 characters</li>
                      <li>• One uppercase letter</li>
                      <li>• One number</li>
                      <li>• One special character</li>
                    </ul>
                  </div>
                }
                variant="gradient"
                side="top"
                maxWidth="220px"
              >
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                  placeholder="Enter password"
                />
              </ToolTip>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Options */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Advanced Features</h2>
          <p className="text-muted-foreground">
            Customizable delay and disabled states
          </p>
        </div>
        <div className="bg-card border rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-4">
              <ToolTip
                content="This tooltip has a longer delay"
                delayDuration={1000}
                variant="default"
              >
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Long Delay (1s)
                </button>
              </ToolTip>
              <span className="text-xs text-muted-foreground text-center">
                Custom delay timing
              </span>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <ToolTip
                content="This tooltip appears instantly"
                delayDuration={0}
                variant="gradient"
              >
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                  No Delay
                </button>
              </ToolTip>
              <span className="text-xs text-muted-foreground text-center">
                Instant appearance
              </span>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <ToolTip
                content="This won't show because it's disabled"
                disabled
                variant="dark"
              >
                <button className="px-4 py-2 bg-gray-400 text-gray-700 rounded-lg cursor-not-allowed">
                  Disabled Tooltip
                </button>
              </ToolTip>
              <span className="text-xs text-muted-foreground text-center">
                Tooltip disabled
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Tips */}
      <section className="bg-muted/30 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold">Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
            <ul className="space-y-1">
              <li>• Keep tooltip content concise and helpful</li>
              <li>• Use appropriate positioning to avoid viewport edges</li>
              <li>• Consider using rich content for complex information</li>
              <li>• Test with keyboard navigation for accessibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">
              Variant Selection
            </h4>
            <ul className="space-y-1">
              <li>
                • <strong>Default:</strong> Best for most use cases, adapts to
                theme
              </li>
              <li>
                • <strong>Dark:</strong> Great for light backgrounds
              </li>
              <li>
                • <strong>Gradient:</strong> Eye-catching for important info
              </li>
              <li>
                • <strong>Glass:</strong> Modern look on complex backgrounds
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export { ToolTip };
