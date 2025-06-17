"use client";

import * as React from "react";
import { motion } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet as BaseSheet,
  SheetTrigger as BaseSheetTrigger,
  SheetClose as BaseSheetClose,
  SheetContent as BaseSheetContent,
  SheetHeader as BaseSheetHeader,
  SheetFooter as BaseSheetFooter,
  SheetTitle as BaseSheetTitle,
  SheetDescription as BaseSheetDescription,
} from "@/components/ui/sheet";

/**
 * VUI Sheet Properties
 */
export interface VUISheetProps {
  /**
   * Which side of the screen the sheet slides from
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Size variant for the sheet
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Enable glassmorphism effect
   */
  glassmorphism?: boolean;
  /**
   * Show gradient border accent
   */
  showGradientBorder?: boolean;
  /**
   * Custom className for the sheet content
   */
  className?: string;
  /**
   * Children content
   */
  children?: React.ReactNode;
}

/**
 * Enhanced Sheet Content with VUI styling
 */
const VUISheetContent = React.forwardRef<
  React.ElementRef<typeof BaseSheetContent>,
  React.ComponentPropsWithoutRef<typeof BaseSheetContent> & VUISheetProps
>(
  (
    {
      className,
      children,
      side = "right",
      size = "md",
      glassmorphism = true,
      showGradientBorder = true,
      ...props
    },
    ref
  ) => {
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return side === "right" || side === "left"
            ? "w-64 sm:max-w-sm"
            : "h-64";
        case "md":
          return side === "right" || side === "left"
            ? "w-80 sm:max-w-md"
            : "h-80";
        case "lg":
          return side === "right" || side === "left"
            ? "w-96 sm:max-w-lg"
            : "h-96";
        case "xl":
          return side === "right" || side === "left"
            ? "w-[32rem] sm:max-w-2xl"
            : "h-[32rem]";
        case "full":
          return side === "right" || side === "left"
            ? "w-full sm:max-w-none"
            : "h-full";
        default:
          return side === "right" || side === "left"
            ? "w-80 sm:max-w-md"
            : "h-80";
      }
    };

    return (
      <BaseSheetContent
        ref={ref}
        side={side}
        className={cn(
          // Base styles
          "bg-background/95 border-border/50",
          glassmorphism && "backdrop-blur-xl bg-background/80",

          // Size classes
          getSizeClasses(),

          // Enhanced shadow and border
          "shadow-2xl border-2",
          showGradientBorder && "border-primary/20",

          // Position specific styles
          side === "right" && "border-l-0",
          side === "left" && "border-r-0",
          side === "top" && "border-b-0",
          side === "bottom" && "border-t-0",

          className
        )}
        {...props}
      >
        {/* Gradient accent line */}
        {showGradientBorder && (
          <motion.div
            className={cn(
              "absolute bg-gradient-to-r from-primary/60 via-primary to-primary/60",
              side === "right" && "left-0 top-0 w-1 h-full",
              side === "left" && "right-0 top-0 w-1 h-full",
              side === "top" && "bottom-0 left-0 h-1 w-full",
              side === "bottom" && "top-0 left-0 h-1 w-full"
            )}
            initial={{
              scaleY: side === "right" || side === "left" ? 0 : 1,
              scaleX: side === "top" || side === "bottom" ? 0 : 1,
              opacity: 0,
            }}
            animate={{
              scaleY: 1,
              scaleX: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { delay: 0.25, duration: 0.4 },
            }}
          />
        )}

        {/* Content wrapper with stagger animation */}
        <motion.div
          className="flex flex-col h-full relative z-10"
          initial={{
            opacity: 0,
            y: side === "top" ? -30 : side === "bottom" ? 30 : 0,
            x: side === "left" ? -30 : side === "right" ? 30 : 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.05,
            duration: 0.7,
            ease: [0.23, 1, 0.32, 1],
            scale: { delay: 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] },
          }}
        >
          {children}
        </motion.div>

        {/* Enhanced close button */}
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: 90,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <BaseSheetClose
              className={cn(
                "rounded-full w-8 h-8 flex items-center justify-center",
                "bg-muted/50 hover:bg-muted/80 backdrop-blur-sm",
                "border border-border/50 hover:border-border",
                "transition-all duration-200 ease-out",
                "focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
                "group"
              )}
            >
              <motion.div
                whileHover={{ rotate: -90 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <XIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.div>
              <span className="sr-only">Close</span>
            </BaseSheetClose>
          </motion.div>
        </motion.div>
      </BaseSheetContent>
    );
  }
);

VUISheetContent.displayName = "VUISheetContent";

/**
 * Enhanced Sheet Header with animation
 */
const VUISheetHeader = React.forwardRef<
  React.ElementRef<typeof BaseSheetHeader>,
  React.ComponentPropsWithoutRef<typeof BaseSheetHeader>
>(({ className, children, ...props }, ref) => (
  <BaseSheetHeader
    ref={ref}
    className={cn(
      "border-b border-border/30 bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: -15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.15,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        scale: { delay: 0.2, duration: 0.4 },
      }}
    >
      {children}
    </motion.div>
  </BaseSheetHeader>
));

VUISheetHeader.displayName = "VUISheetHeader";

/**
 * Enhanced Sheet Footer with animation
 */
const VUISheetFooter = React.forwardRef<
  React.ElementRef<typeof BaseSheetFooter>,
  React.ComponentPropsWithoutRef<typeof BaseSheetFooter>
>(({ className, children, ...props }, ref) => (
  <BaseSheetFooter
    ref={ref}
    className={cn(
      "border-t border-border/30 bg-gradient-to-r from-background/30 to-background/50 backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.25,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        scale: { delay: 0.3, duration: 0.4 },
      }}
    >
      {children}
    </motion.div>
  </BaseSheetFooter>
));

VUISheetFooter.displayName = "VUISheetFooter";

/**
 * Enhanced Sheet Title with gradient effect
 */
const VUISheetTitle = React.forwardRef<
  React.ElementRef<typeof BaseSheetTitle>,
  React.ComponentPropsWithoutRef<typeof BaseSheetTitle> & {
    gradient?: boolean;
  }
>(({ className, gradient = true, children, ...props }, ref) => (
  <motion.div
    initial={{ opacity: 0, x: -12, scale: 0.98 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{
      delay: 0.2,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
      scale: { delay: 0.25, duration: 0.3 },
    }}
  >
    <BaseSheetTitle
      ref={ref}
      className={cn(
        "text-xl font-semibold tracking-tight",
        gradient &&
          "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </BaseSheetTitle>
  </motion.div>
));

VUISheetTitle.displayName = "VUISheetTitle";

/**
 * Enhanced Sheet Description with subtle animation
 */
const VUISheetDescription = React.forwardRef<
  React.ElementRef<typeof BaseSheetDescription>,
  React.ComponentPropsWithoutRef<typeof BaseSheetDescription>
>(({ className, children, ...props }, ref) => (
  <motion.div
    initial={{ opacity: 0, y: 3 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    }}
  >
    <BaseSheetDescription
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    >
      {children}
    </BaseSheetDescription>
  </motion.div>
));

VUISheetDescription.displayName = "VUISheetDescription";

/**
 * Main VUI Sheet component
 */
const VUISheet = BaseSheet;

/**
 * Enhanced Sheet Trigger with hover effects
 */
const VUISheetTrigger = React.forwardRef<
  React.ElementRef<typeof BaseSheetTrigger>,
  React.ComponentPropsWithoutRef<typeof BaseSheetTrigger>
>(({ className, children, ...props }, ref) => (
  <BaseSheetTrigger ref={ref} className={cn("group", className)} {...props}>
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8,
      }}
    >
      {children}
    </motion.div>
  </BaseSheetTrigger>
));

VUISheetTrigger.displayName = "VUISheetTrigger";

/**
 * VUI Sheet Body for content area
 */
const VUISheetBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto p-6", className)}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.35,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  </div>
));

VUISheetBody.displayName = "VUISheetBody";

// Export all components
export {
  VUISheet as Sheet,
  VUISheetTrigger as SheetTrigger,
  BaseSheetClose as SheetClose,
  VUISheetContent as SheetContent,
  VUISheetHeader as SheetHeader,
  VUISheetFooter as SheetFooter,
  VUISheetTitle as SheetTitle,
  VUISheetDescription as SheetDescription,
  VUISheetBody as SheetBody,
};

/**
 * VUI Sheet Showcase Component
 * Demonstrates various sheet configurations and features
 */
export function VUISheetShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
            scale: { delay: 0.1, duration: 0.5 },
          }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            VUI Sheet Component
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beautiful, accessible sheet components with glassmorphism effects,
            smooth animations, and flexible configurations.
          </p>
        </motion.div>

        {/* Sheet Variations */}
        <div className="space-y-8">
          {/* Right Side Sheets */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
              scale: { delay: 0.4, duration: 0.5 },
            }}
          >
            <h2 className="text-2xl font-semibold">Right Side Sheets</h2>
            <div className="flex flex-wrap gap-4">
              {/* Standard Right Sheet */}
              <VUISheet>
                <VUISheetTrigger asChild>
                  <motion.button
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      boxShadow:
                        "0 25px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      mass: 0.8,
                    }}
                  >
                    Standard (MD)
                  </motion.button>
                </VUISheetTrigger>
                <VUISheetContent side="right" size="md">
                  <VUISheetHeader>
                    <VUISheetTitle>Beautiful VUI Sheet</VUISheetTitle>
                    <VUISheetDescription>
                      This is an elegant sheet component with smooth animations
                      and glassmorphism effects.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <div className="space-y-6">
                      <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                        <h3 className="font-medium mb-2 text-foreground">
                          Features
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            Smooth Framer Motion animations
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            Glassmorphism backdrop effects
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            Gradient border accents
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            Enhanced close button design
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Sample Form Field
                        </label>
                        <input
                          type="text"
                          placeholder="Enter some text..."
                          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </VUISheetBody>
                  <VUISheetFooter>
                    <button className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      Save Changes
                    </button>
                  </VUISheetFooter>
                </VUISheetContent>
              </VUISheet>

              {/* Large Right Sheet */}
              <VUISheet>
                <VUISheetTrigger asChild>
                  <motion.button
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Large (LG)
                  </motion.button>
                </VUISheetTrigger>
                <VUISheetContent side="right" size="lg">
                  <VUISheetHeader>
                    <VUISheetTitle gradient={false}>Large Sheet</VUISheetTitle>
                    <VUISheetDescription>
                      Perfect for detailed forms and comprehensive content.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <h4 className="font-medium mb-2 text-blue-600">
                            Analytics
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            View detailed analytics and insights
                          </p>
                        </div>
                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <h4 className="font-medium mb-2 text-purple-600">
                            Settings
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Configure your preferences
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Configuration</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm">
                              Enable notifications
                            </label>
                            <div className="w-10 h-6 bg-primary rounded-full p-1">
                              <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm">Dark mode</label>
                            <div className="w-10 h-6 bg-muted rounded-full p-1">
                              <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>

              {/* Small Right Sheet */}
              <VUISheet>
                <VUISheetTrigger asChild>
                  <motion.button
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Small (SM)
                  </motion.button>
                </VUISheetTrigger>
                <VUISheetContent side="right" size="sm">
                  <VUISheetHeader>
                    <VUISheetTitle>Quick Actions</VUISheetTitle>
                    <VUISheetDescription>
                      Compact sheet for quick interactions.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <div className="space-y-3">
                      <button className="w-full p-3 text-left rounded-md hover:bg-muted/50 transition-colors">
                        <div className="font-medium">Export Data</div>
                        <div className="text-sm text-muted-foreground">
                          Download your data
                        </div>
                      </button>
                      <button className="w-full p-3 text-left rounded-md hover:bg-muted/50 transition-colors">
                        <div className="font-medium">Share</div>
                        <div className="text-sm text-muted-foreground">
                          Share with others
                        </div>
                      </button>
                      <button className="w-full p-3 text-left rounded-md hover:bg-muted/50 transition-colors">
                        <div className="font-medium">Delete</div>
                        <div className="text-sm text-muted-foreground">
                          Remove permanently
                        </div>
                      </button>
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>
            </div>
          </motion.div>

          {/* Bottom Sheets */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
              scale: { delay: 0.7, duration: 0.5 },
            }}
          >
            <h2 className="text-2xl font-semibold">Bottom Sheets</h2>
            <div className="flex flex-wrap gap-4">
              <VUISheet>
                <VUISheetTrigger asChild>
                  <motion.button
                    className="px-6 py-3 bg-violet-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Bottom Sheet
                  </motion.button>
                </VUISheetTrigger>
                <VUISheetContent side="bottom" size="lg">
                  <VUISheetHeader>
                    <VUISheetTitle gradient={false}>
                      Mobile Actions
                    </VUISheetTitle>
                    <VUISheetDescription>
                      Perfect for mobile-friendly interfaces and action panels.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg border border-blue-500/20">
                        <h4 className="font-medium mb-2">Camera</h4>
                        <p className="text-sm text-muted-foreground">
                          Take a new photo
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg border border-green-500/20">
                        <h4 className="font-medium mb-2">Gallery</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose from gallery
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg border border-purple-500/20">
                        <h4 className="font-medium mb-2">Documents</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload documents
                        </p>
                      </div>
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>

              <VUISheet>
                <VUISheetTrigger asChild>
                  <motion.button
                    className="px-6 py-3 bg-rose-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    No Gradient Border
                  </motion.button>
                </VUISheetTrigger>
                <VUISheetContent
                  side="bottom"
                  size="md"
                  showGradientBorder={false}
                >
                  <VUISheetHeader>
                    <VUISheetTitle>Clean Design</VUISheetTitle>
                    <VUISheetDescription>
                      Sometimes simplicity is the key to elegance.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        This sheet has the gradient border disabled for a
                        cleaner look.
                      </p>
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>
            </div>
          </motion.div>

          {/* Left Sheet */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
              scale: { delay: 1.0, duration: 0.5 },
            }}
          >
            <h2 className="text-2xl font-semibold">Left Side Sheets</h2>
            <div className="flex flex-wrap gap-4">
              <VUISheet>
                <VUISheetTrigger asChild>
                  <motion.button
                    className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Left Navigation
                  </motion.button>
                </VUISheetTrigger>
                <VUISheetContent side="left" size="md">
                  <VUISheetHeader>
                    <VUISheetTitle>Navigation Menu</VUISheetTitle>
                    <VUISheetDescription>
                      Perfect for navigation and menu systems.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <nav className="space-y-2">
                      <a
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-5 h-5 bg-primary/20 rounded-md"></div>
                        Dashboard
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-5 h-5 bg-primary/20 rounded-md"></div>
                        Projects
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-5 h-5 bg-primary/20 rounded-md"></div>
                        Team
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-5 h-5 bg-primary/20 rounded-md"></div>
                        Settings
                      </a>
                    </nav>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SheetShowcase() {
  return <VUISheetShowcase />;
}
