"use client";

import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export interface SkeletonProps {
  /**
   * Width of the skeleton element. Can be a string (CSS value) or number (pixels)
   */
  width?: string | number;
  /**
   * Height of the skeleton element. Can be a string (CSS value) or number (pixels)
   */
  height?: string | number;
  /**
   * Border radius of the skeleton element
   */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Animation type for the skeleton loading effect
   */
  animation?: "pulse" | "wave" | "none";
  /**
   * Additional class names for the skeleton element
   */
  className?: string;
}

/**
 * A versatile skeleton loading component for creating placeholder UI
 */
export default function Skeleton({
  width = "100%",
  height = "1rem",
  radius = "md",
  animation = "pulse",
  className,
}: SkeletonProps) {
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "bg-linear-to-r from-muted via-muted/70 to-muted",
        "dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
        radiusClasses[radius],
        animation === "pulse" && "animate-pulse",
        animation === "wave" && "animate-shimmer",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}

/**
 * A beautiful profile card skeleton with animated loading states
 */
export function ProfileCardSkeleton() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="mx-auto w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-lg backdrop-blur-sm"
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header with avatar and basic info */}
      <div className="mb-6 flex items-center space-x-4">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
        >
          <Skeleton className="shrink-0" height={80} radius="full" width={80} />
        </motion.div>

        <div className="flex-1 space-y-3">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Skeleton height="1.5rem" radius="md" width="70%" />
          </motion.div>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Skeleton height="1rem" radius="md" width="50%" />
          </motion.div>
        </div>
      </div>

      {/* Bio section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Skeleton height="1rem" radius="md" width="100%" />
        <Skeleton height="1rem" radius="md" width="85%" />
        <Skeleton height="1rem" radius="md" width="60%" />
      </motion.div>

      {/* Stats section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {Array.from({ length: 3 }, (_, i) => {
          const featureId = `feature-${i}`;
          return (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              key={featureId}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
            >
              <Skeleton height="1.5rem" radius="md" width="100%" />
              <Skeleton
                className="mx-auto"
                height="0.875rem"
                radius="md"
                width="80%"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tags/Skills section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <div className="flex flex-wrap gap-2">
          {[40, 60, 35, 50, 45].map((width) => (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0 }}
              key={`skill-tag-${width}px`}
              transition={{
                delay: 1.0 + [40, 60, 35, 50, 45].indexOf(width) * 0.1,
                duration: 0.3,
              }}
            >
              <Skeleton height="1.5rem" radius="full" width={width} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        >
          <Skeleton height="2.5rem" radius="lg" width="100%" />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ delay: 1.7, duration: 0.3 }}
        >
          <Skeleton height="2.5rem" radius="lg" width="2.5rem" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function SkeletonShowcase() {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2">
          {/* Profile Card Skeleton Demo */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
              initial={{ opacity: 0, x: -32 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-muted-foreground text-sm md:text-base">
                A comprehensive loading state for user profile cards
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <ProfileCardSkeleton />
            </motion.div>
          </div>

          {/* Basic Skeleton Examples */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
              initial={{ opacity: 0, x: 32 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-muted-foreground text-sm md:text-base">
                Flexible building blocks for custom loading states
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 rounded-2xl border border-border/50 bg-card p-4 md:space-y-6 md:p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Text lines */}
              <div className="space-y-3 md:space-y-4">
                <h3
                  className={`${isMobile ? "text-base" : "text-lg"} font-medium text-foreground`}
                >
                  Text Content
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <Skeleton
                    height={isMobile ? "0.75rem" : "1rem"}
                    width="100%"
                  />
                  <Skeleton
                    height={isMobile ? "0.75rem" : "1rem"}
                    width="85%"
                  />
                  <Skeleton
                    height={isMobile ? "0.75rem" : "1rem"}
                    width="70%"
                  />
                </div>
              </div>

              {/* Avatar examples */}
              <div className="space-y-3 md:space-y-4">
                <h3
                  className={`${isMobile ? "text-base" : "text-lg"} font-medium text-foreground`}
                >
                  Avatars
                </h3>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <Skeleton
                    height={isMobile ? 32 : 40}
                    radius="full"
                    width={isMobile ? 32 : 40}
                  />
                  <Skeleton
                    height={isMobile ? 40 : 50}
                    radius="full"
                    width={isMobile ? 40 : 50}
                  />
                  <Skeleton
                    height={isMobile ? 48 : 60}
                    radius="full"
                    width={isMobile ? 48 : 60}
                  />
                </div>
              </div>

              {/* Button examples */}
              <div className="space-y-3 md:space-y-4">
                <h3
                  className={`${isMobile ? "text-base" : "text-lg"} font-medium text-foreground`}
                >
                  Buttons & Cards
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <Skeleton
                    height={isMobile ? "2rem" : "2.5rem"}
                    radius="lg"
                    width={isMobile ? "100px" : "120px"}
                  />
                  <Skeleton
                    height={isMobile ? "3rem" : "4rem"}
                    radius="xl"
                    width="100%"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Usage Example */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border/50 bg-card p-4 md:p-6"
          initial={{ opacity: 0, y: 32 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3
            className={`${isMobile ? "text-lg" : "text-xl"} mb-3 font-semibold md:mb-4`}
          >
            Usage Examples
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <h4
                className={`font-medium text-foreground ${isMobile ? "text-sm" : "text-base"}`}
              >
                Basic Skeleton
              </h4>
              <div className="rounded-lg bg-muted/50 p-3 md:p-4">
                <code
                  className={`${isMobile ? "text-xs" : "text-sm"} text-foreground/80`}
                >
                  {`<Skeleton width="100%" height="1rem" />`}
                </code>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <h4
                className={`font-medium text-foreground ${isMobile ? "text-sm" : "text-base"}`}
              >
                Profile Card
              </h4>
              <div className="rounded-lg bg-muted/50 p-3 md:p-4">
                <code
                  className={`${isMobile ? "text-xs" : "text-sm"} text-foreground/80`}
                >
                  {"<ProfileCardSkeleton />"}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function SkeletonTheme() {
  return (
    <div className="space-y-4 md:space-y-6">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="text-center"
        initial={{ opacity: 0, x: -32 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p className="text-muted-foreground text-sm md:text-base">
          A comprehensive loading state for user profile cards
        </p>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ProfileCardSkeleton />
      </motion.div>
    </div>
  );
}
