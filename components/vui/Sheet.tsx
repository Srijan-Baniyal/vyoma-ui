"use client";

import {
  BarChart3,
  Camera,
  FileText,
  Home,
  ImageIcon,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import {
  Sheet as BaseSheet,
  SheetClose as BaseSheetClose,
  SheetContent as BaseSheetContent,
  SheetDescription as BaseSheetDescription,
  SheetFooter as BaseSheetFooter,
  SheetHeader as BaseSheetHeader,
  SheetTitle as BaseSheetTitle,
  SheetTrigger as BaseSheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * Enhanced VUI Sheet Properties
 */
export interface VUISheetProps {
  /** Which side of the screen the sheet slides from */
  side?: "top" | "right" | "bottom" | "left";
  /** Size variant for the sheet */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Enable glassmorphism effect */
  glassmorphism?: boolean;
  /** Show gradient border accent */
  showGradientBorder?: boolean;
  /** Custom className for the sheet content */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
  /** Custom animation duration */
  animationDuration?: number;
}

/**
 * Animation variants for consistent motion
 */
const animationVariants = {
  content: {
    initial: (side: string) => ({
      opacity: 0,
      y: side === "top" ? -30 : side === "bottom" ? 30 : 0,
      x: side === "left" ? -30 : side === "right" ? 30 : 0,
      scale: 0.96,
    }),
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: (side: string) => ({
      opacity: 0,
      y: side === "top" ? -15 : side === "bottom" ? 15 : 0,
      x: side === "left" ? -15 : side === "right" ? 15 : 0,
      scale: 0.98,
    }),
  },
  gradientBorder: {
    initial: (side: string) => ({
      scaleY: side === "right" || side === "left" ? 0 : 1,
      scaleX: side === "top" || side === "bottom" ? 0 : 1,
      opacity: 0,
    }),
    animate: {
      scaleY: 1,
      scaleX: 1,
      opacity: 1,
    },
  },
  closeButton: {
    initial: { opacity: 0, scale: 0, rotate: -90 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 90 },
    tap: { scale: 0.95 },
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
};

/**
 * Enhanced Sheet Content with VUI styling
 */
const VUISheetContent = React.forwardRef<
  React.ComponentRef<typeof BaseSheetContent>,
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
      animationDuration = 0.7,
      ...props
    },
    ref
  ) => {
    const getSizeClasses = React.useCallback(() => {
      const sizeMap = {
        sm: side === "right" || side === "left" ? "w-64 sm:max-w-sm" : "h-64",
        md: side === "right" || side === "left" ? "w-80 sm:max-w-md" : "h-80",
        lg: side === "right" || side === "left" ? "w-96 sm:max-w-lg" : "h-96",
        xl:
          side === "right" || side === "left"
            ? "w-[32rem] sm:max-w-2xl"
            : "h-[32rem]",
        full:
          side === "right" || side === "left"
            ? "w-full sm:max-w-none"
            : "h-full",
      };
      return sizeMap[size] || sizeMap.md;
    }, [side, size]);

    const getBorderClasses = React.useCallback(() => {
      const borderMap = {
        right: "border-l-0",
        left: "border-r-0",
        top: "border-b-0",
        bottom: "border-t-0",
      };
      return borderMap[side];
    }, [side]);

    const getGradientPosition = React.useCallback(() => {
      const positionMap = {
        right: "left-0 top-0 w-1 h-full",
        left: "right-0 top-0 w-1 h-full",
        top: "bottom-0 left-0 h-1 w-full",
        bottom: "top-0 left-0 h-1 w-full",
      };
      return positionMap[side];
    }, [side]);

    return (
      <BaseSheetContent
        className={cn(
          // Base styles
          "border-border/50 bg-background/95 focus:outline-none",
          glassmorphism && "bg-background/80 backdrop-blur-xl",

          // Size classes
          getSizeClasses(),

          // Enhanced shadow and border
          "border-2 shadow-2xl",
          showGradientBorder && "border-primary/20",

          // Position specific styles
          getBorderClasses(),

          className
        )}
        ref={ref}
        side={side}
        {...props}
      >
        {/* Gradient accent line */}
        <AnimatePresence>
          {showGradientBorder && (
            <motion.div
              animate="animate"
              className={cn(
                "absolute z-10 bg-gradient-to-r from-primary/60 via-primary to-primary/60",
                getGradientPosition()
              )}
              custom={side}
              exit="initial"
              initial="initial"
              transition={{
                delay: 0.15,
                duration: animationDuration * 1.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              variants={animationVariants.gradientBorder}
            />
          )}
        </AnimatePresence>

        {/* Content wrapper with stagger animation */}
        <motion.div
          animate="animate"
          className="relative z-20 flex h-full flex-col"
          custom={side}
          exit="exit"
          initial="initial"
          transition={{
            delay: 0.05,
            duration: animationDuration,
            ease: [0.23, 1, 0.32, 1],
          }}
          variants={animationVariants.content}
        >
          {children}
        </motion.div>

        {/* Enhanced close button */}
        <motion.div
          animate="animate"
          className="absolute top-4 right-4 z-30"
          initial="initial"
          transition={{
            delay: 0.3,
            duration: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          variants={animationVariants.closeButton}
          whileHover="hover"
          whileTap="tap"
        >
          <BaseSheetClose
            aria-label="Close sheet"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              "bg-muted/50 backdrop-blur-sm hover:bg-muted/80",
              "border border-border/50 hover:border-border",
              "transition-all duration-200 ease-out",
              "focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
              "group focus:outline-none"
            )}
          >
            <X className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          </BaseSheetClose>
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
  React.ComponentRef<typeof BaseSheetHeader>,
  React.ComponentPropsWithoutRef<typeof BaseSheetHeader>
>(({ className, children, ...props }, ref) => (
  <BaseSheetHeader
    className={cn(
      "border-border/30 border-b bg-gradient-to-r from-background/50 to-background/30 px-6 py-4 backdrop-blur-sm",
      className
    )}
    ref={ref}
    {...props}
  >
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      initial={{ opacity: 0, y: -15, scale: 0.95 }}
      transition={{
        delay: 0.15,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
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
  React.ComponentRef<typeof BaseSheetFooter>,
  React.ComponentPropsWithoutRef<typeof BaseSheetFooter>
>(({ className, children, ...props }, ref) => (
  <BaseSheetFooter
    className={cn(
      "border-border/30 border-t bg-gradient-to-r from-background/30 to-background/50 px-6 py-4 backdrop-blur-sm",
      className
    )}
    ref={ref}
    {...props}
  >
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{
        delay: 0.25,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
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
  React.ComponentRef<typeof BaseSheetTitle>,
  React.ComponentPropsWithoutRef<typeof BaseSheetTitle> & {
    gradient?: boolean;
  }
>(({ className, gradient = true, children, ...props }, ref) => (
  <motion.div
    animate={{ opacity: 1, x: 0, scale: 1 }}
    initial={{ opacity: 0, x: -12, scale: 0.98 }}
    transition={{
      delay: 0.2,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    }}
  >
    <BaseSheetTitle
      className={cn(
        "font-semibold text-xl tracking-tight",
        gradient &&
          "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",
        className
      )}
      ref={ref}
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
  React.ComponentRef<typeof BaseSheetDescription>,
  React.ComponentPropsWithoutRef<typeof BaseSheetDescription>
>(({ className, children, ...props }, ref) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 3 }}
    transition={{
      delay: 0.3,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    }}
  >
    <BaseSheetDescription
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      ref={ref}
      {...props}
    >
      {children}
    </BaseSheetDescription>
  </motion.div>
));

VUISheetDescription.displayName = "VUISheetDescription";

/**
 * Enhanced Sheet Trigger with hover effects
 */
const VUISheetTrigger = React.forwardRef<
  React.ComponentRef<typeof BaseSheetTrigger>,
  React.ComponentPropsWithoutRef<typeof BaseSheetTrigger>
>(({ className, children, ...props }, ref) => (
  <BaseSheetTrigger className={cn("group", className)} ref={ref} {...props}>
    <motion.div
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8,
      }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
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
    className={cn("flex-1 overflow-auto px-6 py-4", className)}
    ref={ref}
    {...props}
  >
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 8 }}
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

/**
 * Main VUI Sheet component
 */
const VUISheet = BaseSheet;

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
 * Enhanced Button Component for consistent styling
 */
const EnhancedButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof motion.button> & {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
  }
>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseClasses =
      "font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantClasses = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/50",
      ghost: "text-foreground hover:bg-muted focus:ring-muted/50",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
          mass: 0.8,
        }}
        type="button"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98, y: 0 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

/**
 * Feature Card Component
 */
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => (
  <motion.div
    className={cn(
      "rounded-lg border p-4 transition-all duration-200 hover:shadow-md",
      `bg-${color}-500/10 border-${color}-500/20 hover:border-${color}-500/30`
    )}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    whileHover={{ scale: 1.02, y: -2 }}
  >
    <div className={cn("mb-2 flex items-center gap-3", `text-${color}-600`)}>
      {icon}
      <h4 className="font-medium">{title}</h4>
    </div>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

/**
 * Navigation Item Component
 */
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}> = ({ icon, label, href = "#", onClick }) => (
  <motion.a
    className="group flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted/50"
    href={href}
    onClick={onClick}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    whileHover={{ x: 4 }}
  >
    <div className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground">
      {icon}
    </div>
    <span className="text-foreground group-hover:text-foreground/90">
      {label}
    </span>
  </motion.a>
);

/**
 * Toggle Switch Component
 */
const ToggleSwitch: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label, checked = false, onChange }) => (
  <div className="flex items-center justify-between">
    <label className="font-medium text-sm">{label}</label>
    <motion.button
      className={cn(
        "h-6 w-11 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
        checked ? "bg-primary" : "bg-muted"
      )}
      onClick={() => onChange?.(!checked)}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ x: checked ? 20 : 0 }}
        className="h-4 w-4 rounded-full bg-white shadow-sm"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  </div>
);

/**
 * VUI Sheet Showcase Component
 * Demonstrates various sheet configurations and features
 */
export function VUISheetShowcase() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div className="min-h-5 bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-6xl items-center justify-center space-y-12">
        {/* Sheet Variations */}
        <div className="space-y-12">
          {/* Right Side Sheets */}
          <motion.section
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-semibold text-2xl">Right Side Sheets</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Standard Right Sheet */}
              <VUISheet>
                <VUISheetTrigger asChild>
                  <EnhancedButton variant="primary">
                    Standard (MD)
                  </EnhancedButton>
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
                      <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                        <h3 className="mb-3 font-medium text-foreground">
                          Key Features
                        </h3>
                        <ul className="space-y-3 text-sm">
                          {[
                            "Smooth Framer Motion animations",
                            "Glassmorphism backdrop effects",
                            "Gradient border accents",
                            "Enhanced accessibility",
                            "Responsive design",
                            "TypeScript support",
                          ].map((feature, index) => (
                            <motion.li
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-3 text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              key={feature}
                              transition={{ delay: 0.1 * index }}
                            >
                              <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <label className="block font-medium text-sm">
                          Sample Form Field
                        </label>
                        <input
                          className="w-full rounded-md border border-border bg-background px-3 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                          placeholder="Enter some text..."
                          type="text"
                        />
                      </div>
                    </div>
                  </VUISheetBody>
                  <VUISheetFooter>
                    <div className="ml-auto flex gap-3">
                      <EnhancedButton size="sm" variant="ghost">
                        Cancel
                      </EnhancedButton>
                      <EnhancedButton size="sm" variant="primary">
                        Save Changes
                      </EnhancedButton>
                    </div>
                  </VUISheetFooter>
                </VUISheetContent>
              </VUISheet>

              {/* Large Right Sheet */}
              <VUISheet>
                <VUISheetTrigger asChild>
                  <EnhancedButton
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                    variant="secondary"
                  >
                    Large (LG)
                  </EnhancedButton>
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
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FeatureCard
                          color="blue"
                          description="View detailed analytics and insights"
                          icon={<BarChart3 className="h-5 w-5" />}
                          title="Analytics"
                        />
                        <FeatureCard
                          color="purple"
                          description="Configure your preferences"
                          icon={<Settings className="h-5 w-5" />}
                          title="Settings"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Configuration</h3>
                        <div className="space-y-4">
                          <ToggleSwitch
                            checked={notifications}
                            label="Enable notifications"
                            onChange={setNotifications}
                          />
                          <ToggleSwitch
                            checked={darkMode}
                            label="Dark mode"
                            onChange={setDarkMode}
                          />
                        </div>
                      </div>
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>

              {/* Small Right Sheet */}
              <VUISheet>
                <VUISheetTrigger asChild>
                  <EnhancedButton
                    className="bg-orange-600 text-white hover:bg-orange-700"
                    variant="secondary"
                  >
                    Small (SM)
                  </EnhancedButton>
                </VUISheetTrigger>
                <VUISheetContent side="right" size="sm">
                  <VUISheetHeader>
                    <VUISheetTitle>Quick Actions</VUISheetTitle>
                    <VUISheetDescription>
                      Compact sheet for quick interactions.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <div className="space-y-2">
                      {[
                        {
                          icon: <FileText className="h-4 w-4" />,
                          title: "Export Data",
                          desc: "Download your data",
                        },
                        {
                          icon: <Users className="h-4 w-4" />,
                          title: "Share",
                          desc: "Share with others",
                        },
                        {
                          icon: <X className="h-4 w-4" />,
                          title: "Delete",
                          desc: "Remove permanently",
                        },
                      ].map((action, index) => (
                        <motion.button
                          animate={{ opacity: 1, y: 0 }}
                          className="group w-full rounded-md p-3 text-left transition-colors hover:bg-muted/50"
                          initial={{ opacity: 0, y: 10 }}
                          key={action.title}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 4 }}
                        >
                          <div className="mb-1 flex items-center gap-3">
                            <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                              {action.icon}
                            </div>
                            <div className="font-medium">{action.title}</div>
                          </div>
                          <div className="ml-7 text-muted-foreground text-sm">
                            {action.desc}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>
            </div>
          </motion.section>

          {/* Bottom Sheets */}
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, y: 60 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-semibold text-2xl">Bottom Sheets</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <VUISheet>
                <VUISheetTrigger asChild>
                  <EnhancedButton
                    className="bg-violet-600 text-white hover:bg-violet-700"
                    variant="secondary"
                  >
                    Bottom Sheet
                  </EnhancedButton>
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
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FeatureCard
                        color="blue"
                        description="Take a new photo"
                        icon={<Camera className="h-5 w-5" />}
                        title="Camera"
                      />
                      <FeatureCard
                        color="green"
                        description="Choose from gallery"
                        icon={<ImageIcon className="h-5 w-5" />}
                        title="Gallery"
                      />
                      <FeatureCard
                        color="purple"
                        description="Upload documents"
                        icon={<FileText className="h-5 w-5" />}
                        title="Documents"
                      />
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>

              <VUISheet>
                <VUISheetTrigger asChild>
                  <EnhancedButton
                    className="border-rose-600 bg-white text-rose-600 hover:bg-rose-600 hover:text-white"
                    variant="outline"
                  >
                    No Gradient Border
                  </EnhancedButton>
                </VUISheetTrigger>
                <VUISheetContent
                  showGradientBorder={false}
                  side="bottom"
                  size="md"
                >
                  <VUISheetHeader>
                    <VUISheetTitle>Clean Design</VUISheetTitle>
                    <VUISheetDescription>
                      Sometimes simplicity is the key to elegance.
                    </VUISheetDescription>
                  </VUISheetHeader>
                  <VUISheetBody>
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">
                        This sheet has the gradient border disabled for a
                        cleaner, more minimal look.
                      </p>
                    </div>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>
            </div>
          </motion.section>

          {/* Left Sheet */}
          <motion.section
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, x: 60 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-semibold text-2xl">Left Side Sheets</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <VUISheet>
                <VUISheetTrigger asChild>
                  <EnhancedButton
                    className="bg-cyan-600 text-white hover:bg-cyan-700"
                    variant="secondary"
                  >
                    <Menu className="mr-2 h-4 w-4" />
                    Left Navigation
                  </EnhancedButton>
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
                      <NavItem icon={<Home />} label="Dashboard" />
                      <NavItem icon={<FileText />} label="Projects" />
                      <NavItem icon={<Users />} label="Team" />
                      <NavItem icon={<BarChart3 />} label="Analytics" />
                      <NavItem icon={<Settings />} label="Settings" />
                    </nav>
                  </VUISheetBody>
                </VUISheetContent>
              </VUISheet>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default function SheetShowcase() {
  return <VUISheetShowcase />;
}
