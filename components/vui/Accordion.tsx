"use client";

import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Single accordion item definition
 */
export interface AccordionItem {
  /**
   * Unique identifier for the item. Required for proper ARIA wiring and state management
   */
  id: string;
  /**
   * Header content shown in the trigger button (e.g., a string or any React node)
   */
  header: React.ReactNode;
  /**
   * Body content revealed when the item is expanded. Accepts any React node
   */
  content: React.ReactNode;
}

export interface AccordionProps {
  /**
   * Array of accordion items to render
   */
  items: AccordionItem[];
  allowMultiple?: boolean;
  /**
   * Array of item IDs that should be open by default
   */
  defaultOpenIds?: string[];
  /**
   * Additional class names for the root element
   */
  className?: string;
}

/**
 * Mobile-optimized, accessible, animated accordion component
 */
export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className,
}: AccordionProps) {
  // Using a Set for constant-time lookups when toggling/opening panels
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        // Mobile-first responsive design
        "mx-auto w-full max-w-none overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-lg backdrop-blur-sm",
        // Tablet and up
        "sm:max-w-[90vw] sm:rounded-2xl",
        // Desktop
        "lg:w-150 lg:max-w-150",
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const buttonId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <motion.div
            animate={{ opacity: 1 }}
            className="relative border-border/30 border-b last:border-b-0"
            initial={{ opacity: 0 }}
            key={item.id}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          >
            {/* Decorative gradient line - hidden on mobile for cleaner look */}
            <motion.div
              animate={{ scaleX: 1, opacity: 1 }}
              className="absolute top-0 left-0 hidden h-px w-full bg-linear-to-r from-transparent via-primary/60 to-transparent sm:block"
              initial={{ scaleX: 0, opacity: 0 }}
              transition={{
                delay: index * 0.15 + 0.4,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />

            {/* Vertical accent line - simplified for mobile */}
            <motion.div
              animate={{ scaleY: 1, opacity: 1 }}
              className="absolute top-0 left-2 h-full w-0.5 rounded-full bg-linear-to-b from-primary/30 via-primary/50 to-primary/30 sm:left-4"
              initial={{ scaleY: 0, opacity: 0 }}
              transition={{
                delay: index * 0.15 + 0.6,
                duration: 0.6,
                ease: "easeOut",
              }}
            />

            <h3 className="relative">
              <motion.button
                animate={{ opacity: 1, x: 0 }}
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={cn(
                  "group relative flex w-full items-center justify-between gap-3",
                  // Mobile-optimized touch targets and spacing
                  "min-h-15 py-5 pr-4 pl-6",
                  // Tablet and up
                  "sm:min-h-18 sm:py-6 sm:pr-6 sm:pl-10",
                  // Desktop
                  "lg:pr-8 lg:pl-12",
                  "text-left font-medium text-foreground",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "transition-all duration-200 hover:bg-muted/30",
                  // Mobile-specific active states
                  "active:scale-[0.99] active:bg-muted/50"
                )}
                id={buttonId}
                initial={{ opacity: 0, x: -16 }}
                onClick={() => toggleItem(item.id)}
                transition={{
                  delay: index * 0.15 + 0.8,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                type="button"
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "min-w-0 flex-1 pr-2 font-semibold tracking-tight",
                    // Mobile-first typography
                    "text-base leading-snug",
                    // Tablet and up
                    "sm:text-lg sm:leading-relaxed",
                    // Desktop
                    "lg:text-xl"
                  )}
                  initial={{ opacity: 0, y: 8 }}
                  transition={{
                    delay: index * 0.15 + 1.0,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {item.header}
                </motion.span>

                <motion.div
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: isOpen ? 180 : 0,
                  }}
                  className={cn(
                    "relative flex shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20 group-active:bg-primary/30",
                    // Mobile-optimized touch target
                    "h-10 w-10 min-w-10",
                    // Tablet and up
                    "sm:h-12 sm:w-12 sm:min-w-12"
                  )}
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  transition={{
                    opacity: { delay: index * 0.15 + 1.2, duration: 0.2 },
                    scale: {
                      delay: index * 0.15 + 1.2,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200,
                    },
                    rotate: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Toggle accordion</title>
                    <path
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.button>
            </h3>

            <div className="w-full overflow-hidden">
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    aria-labelledby={buttonId}
                    className={cn(
                      "relative box-border w-full",
                      // Mobile-optimized spacing
                      "pt-2 pr-4 pb-6 pl-6",
                      // Tablet and up
                      "sm:pt-3 sm:pr-6 sm:pb-8 sm:pl-10",
                      // Desktop
                      "lg:pr-8 lg:pl-12"
                    )}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    id={panelId}
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    key="content"
                    role="region"
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      height: { duration: 0.4 },
                    }}
                  >
                    {/* Vertical accent line for content */}
                    <div className="absolute top-0 left-2 h-full w-0.5 rounded-full bg-linear-to-b from-primary/40 to-transparent sm:left-4" />

                    <div
                      className={cn(
                        "w-full overflow-hidden text-muted-foreground leading-relaxed",
                        // Mobile-first content spacing
                        "min-h-20 pl-4 text-sm",
                        // Tablet and up
                        "sm:min-h-25 sm:pl-6 sm:text-base",
                        // Desktop
                        "lg:text-base"
                      )}
                    >
                      <div className="wrap-break-words w-full overflow-hidden">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function AccordionShowcase() {
  return (
    <div className="min-h-1.5 bg-linear-to-br from-background via-muted/20 to-background p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-8 sm:space-y-16">
        <div className="space-y-4 text-center sm:space-y-6">
          <div className="relative rounded-2xl border border-border/50 bg-card/30 p-4 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-8">
            <div className="flex justify-center">
              <Accordion
                allowMultiple={true}
                defaultOpenIds={[]}
                items={[
                  {
                    id: "demo-1",
                    header: "🚀 Mobile-First Design",
                    content: (
                      <div className="space-y-3 sm:space-y-4">
                        <p className="text-muted-foreground">
                          Optimized for touch interactions with larger tap
                          targets, improved spacing, and mobile-first responsive
                          design that scales beautifully across all devices.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs sm:px-3 sm:text-sm">
                            Touch Optimized
                          </span>
                          <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs sm:px-3 sm:text-sm">
                            Responsive
                          </span>
                          <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs sm:px-3 sm:text-sm">
                            Fast
                          </span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "demo-2",
                    header: "✨ Smooth Mobile Animations",
                    content: (
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          Optimized animations that perform smoothly on mobile
                          devices with reduced motion complexity and faster
                          transitions for better user experience.
                        </p>
                        <div className="rounded-lg border bg-muted/50 p-3 sm:p-4">
                          <code className="break-all text-foreground/80 text-xs sm:text-sm">
                            {"duration: 0.3s + spring(200)"}
                          </code>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "demo-3",
                    header: "📱 Enhanced Touch Experience",
                    content: (
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          Larger touch targets, improved active states, and
                          mobile-specific interactions for the best possible
                          touch experience.
                        </p>
                        <ul className="ml-2 space-y-2 sm:ml-4">
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span className="text-muted-foreground text-xs sm:text-sm">
                              60px minimum touch targets
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span className="text-muted-foreground text-xs sm:text-sm">
                              Active state feedback
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span className="text-muted-foreground text-xs sm:text-sm">
                              Optimized spacing
                            </span>
                          </li>
                        </ul>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccordionTheme() {
  return (
    <div className="p-4 sm:p-0">
      <Accordion
        defaultOpenIds={[]}
        items={[
          {
            id: "demo-1",
            header: "🚀 Mobile-First Design",
            content: (
              <div className="space-y-3 sm:space-y-4">
                <p className="text-muted-foreground">
                  Built with mobile users in mind, featuring optimized touch
                  targets, improved spacing, and responsive design that works
                  perfectly on any device size.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs sm:px-3 sm:text-sm">
                    Touch Friendly
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs sm:px-3 sm:text-sm">
                    Responsive
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs sm:px-3 sm:text-sm">
                    Accessible
                  </span>
                </div>
              </div>
            ),
          },
          {
            id: "demo-2",
            header: "✨ Optimized Performance",
            content: (
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Streamlined animations and optimized rendering for smooth
                  performance on mobile devices, with reduced complexity where
                  it matters most.
                </p>
                <div className="rounded-lg border bg-muted/50 p-3 sm:p-4">
                  <code className="text-foreground/80 text-xs sm:text-sm">
                    {"mobile: { duration: 0.3, spring: 200 }"}
                  </code>
                </div>
              </div>
            ),
          },
          {
            id: "demo-3",
            header: "🎯 Enhanced Accessibility",
            content: (
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Full ARIA support with mobile-optimized focus management,
                  larger touch targets, and improved screen reader experience.
                </p>
                <ul className="ml-2 space-y-2 sm:ml-4">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      WCAG 2.1 compliant touch targets
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      Enhanced focus indicators
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      Screen reader optimized
                    </span>
                  </li>
                </ul>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
