"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
 * Accessible, animated accordion component
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
      className={cn(
        "w-[600px] max-w-[90vw] rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const buttonId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <motion.div
            key={item.id}
            className="relative border-b border-border/30 last:border-b-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
          >
            <motion.div
              className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/80 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                delay: index * 0.2 + 0.5,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { delay: index * 0.2 + 0.8, duration: 0.5 },
              }}
            />

            <motion.div
              className="absolute left-3 sm:left-6 top-0 w-px h-full bg-gradient-to-b from-primary/20 via-primary/60 to-primary/20"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                delay: index * 0.2 + 1.0,
                duration: 0.8,
                ease: "easeOut",
                opacity: { delay: index * 0.2 + 1.2, duration: 0.4 },
              }}
            />

            <h3 className="relative">
              <motion.button
                id={buttonId}
                type="button"
                className="group relative w-full flex items-center justify-between gap-4 py-6 pl-6 sm:pl-12 pr-4 sm:pr-8 text-left font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 hover:bg-muted/30"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2 + 1.3,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="text-sm sm:text-lg font-semibold tracking-tight flex-1 min-w-0 pr-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.2 + 1.5,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {item.header}
                </motion.span>

                <motion.div
                  className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: isOpen ? 180 : 0,
                  }}
                  transition={{
                    opacity: { delay: index * 0.2 + 1.7, duration: 0.3 },
                    scale: {
                      delay: index * 0.2 + 1.7,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                    },
                    rotate: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3 w-3 sm:h-4 sm:w-4 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </motion.div>
              </motion.button>
            </h3>

            <div
              className="overflow-hidden w-full"
              style={{
                height: isOpen ? "auto" : "0px",
                minHeight: isOpen ? "140px" : "0px",
              }}
            >
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="relative pl-6 sm:pl-12 pr-4 sm:pr-8 pb-8 pt-2 w-full box-border"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <div className="absolute left-3 sm:left-6 top-0 w-px h-full bg-gradient-to-b from-primary/30 to-transparent" />
                    <div className="text-muted-foreground text-sm sm:text-base leading-relaxed pl-3 sm:pl-6 min-h-[100px] w-full overflow-hidden">
                      <div className="w-full overflow-hidden break-words">
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Accordion Component
          </h1>
          <p className="text-xl text-muted-foreground">
            Beautifully animated and accessible
          </p>
        </motion.div>

        <Accordion
          items={[
            {
              id: "item-1",
              header: "What is VUI?",
              content: (
                <>
                  <p className="mb-3">
                    VUI is a collection of modern, accessible UI components
                    built with React & Tailwind CSS. Each component is crafted
                    with attention to detail and smooth animations.
                  </p>
                  <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex-shrink whitespace-nowrap">
                      React
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex-shrink whitespace-nowrap">
                      Tailwind
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex-shrink whitespace-nowrap">
                      Framer Motion
                    </span>
                  </div>
                </>
              ),
            },
            {
              id: "item-2",
              header: "How does this accordion work?",
              content: (
                <>
                  <p className="mb-3">
                    Click on the headers to expand or collapse content. The
                    animations are powered by Framer Motion and follow
                    accessibility best practices with proper ARIA attributes and
                    keyboard navigation.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-3 border">
                    <code className="text-xs sm:text-sm text-foreground/80 break-all">
                      allowMultiple={`{true}`} defaultOpenIds={`{['item-1']}`}
                    </code>
                  </div>
                </>
              ),
            },
            {
              id: "item-3",
              header: "Can I keep multiple items open?",
              content: (
                <p>
                  Absolutely! Pass{" "}
                  <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
                    allowMultiple
                  </code>
                  to enable multiple panels to be open simultaneously. The
                  component handles all the state management for you.
                </p>
              ),
            },
            {
              id: "item-4",
              header: "Is it accessible?",
              content: (
                <>
                  <p className="mb-3">
                    Yes! This accordion follows WAI-ARIA guidelines and
                    includes:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="break-words">
                        Proper ARIA attributes and roles
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="break-words">
                        Keyboard navigation support
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="break-words">
                        Focus management and indicators
                      </span>
                    </li>
                  </ul>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
