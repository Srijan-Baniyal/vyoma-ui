"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface CursorAnimationVariants extends Variants {
  animate: Variants["animate"];
  initial: Variants["initial"];
}
interface TypingTextProps {
  className?: string;
  cursorAnimationVariants?: CursorAnimationVariants;
  cursorChar?: string | React.ReactNode;
  cursorClassName?: string;
  deleteSpeed?: number;
  hideCursorOnType?: boolean;
  initialDelay?: number;
  loop?: boolean;
  onDeletingComplete?: () => void;
  onDeletingStart?: () => void;
  onTypingComplete?: () => void;
  onTypingStart?: () => void;
  showCursor?: boolean;
  speed?: number;
  text: string | string[];
  waitTime?: number;
}

/**
 * Default cursor animation variants
 */
const DEFAULT_CURSOR_VARIANTS: CursorAnimationVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.01,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 0.4,
      repeatType: "reverse",
    },
  },
};

const TypingText = ({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "|",
  cursorClassName = "ml-1",
  cursorAnimationVariants = DEFAULT_CURSOR_VARIANTS,
  onTypingStart,
  onTypingComplete,
  onDeletingStart,
  onDeletingComplete,
}: TypingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoize texts array to prevent unnecessary re-renders
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let isDeleting = false;
    let currentTextIndex = 0;
    let hasStarted = false;

    const handleDeletingPhase = (currentText: string, animate: () => void) => {
      setDisplayText(currentText.slice(0, currentIndex));
      currentIndex--;

      if (currentIndex < 0) {
        isDeleting = false;
        onDeletingComplete?.();

        if (currentTextIndex === texts.length - 1 && !loop) {
          setIsAnimating(false);
          return;
        }

        currentTextIndex = (currentTextIndex + 1) % texts.length;
        onTypingStart?.();
        timeout = setTimeout(animate, waitTime);
      } else {
        timeout = setTimeout(animate, deleteSpeed);
      }
    };

    const handleTypingPhase = (currentText: string, animate: () => void) => {
      setDisplayText(currentText.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === currentText.length) {
        onTypingComplete?.();

        if (texts.length > 1 && loop) {
          onDeletingStart?.();
          isDeleting = true;
          timeout = setTimeout(animate, waitTime);
        } else {
          setIsAnimating(false);
        }
      } else {
        timeout = setTimeout(animate, speed);
      }
    };

    const handleInitialDelay = (animate: () => void) => {
      hasStarted = true;
      onTypingStart?.();
      if (initialDelay > 0) {
        timeout = setTimeout(animate, initialDelay);
        return true;
      }
      return false;
    };

    const animate = () => {
      const currentText = texts[currentTextIndex];

      if (!hasStarted && handleInitialDelay(animate)) {
        return;
      }

      if (isDeleting) {
        handleDeletingPhase(currentText, animate);
      } else {
        handleTypingPhase(currentText, animate);
      }
    };

    setIsAnimating(true);
    animate();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [
    speed,
    deleteSpeed,
    waitTime,
    initialDelay,
    loop,
    texts,
    onTypingStart,
    onTypingComplete,
    onDeletingStart,
    onDeletingComplete,
  ]);

  /**
   * Determine if cursor should be hidden
   */
  const shouldHideCursor = useMemo(
    () => hideCursorOnType && isAnimating,
    [hideCursorOnType, isAnimating]
  );

  return (
    <div className={cn("inline whitespace-pre-wrap tracking-tight", className)}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          animate="animate"
          className={cn(cursorClassName, shouldHideCursor && "hidden")}
          initial="initial"
          variants={cursorAnimationVariants}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
};

export default TypingText;

export function TypingTextShowcase() {
  return (
    <div className="min-h-5 bg-linear-to-br from-background via-muted/20 to-background p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          {/* Main Demo */}
          <div className="relative rounded-3xl border border-border/50 bg-card/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center">
              <TypingText
                className="font-semibold text-2xl text-foreground md:text-3xl"
                cursorClassName="text-primary font-bold"
                deleteSpeed={40}
                loop
                showCursor
                speed={60}
                text={[
                  "Welcome to the future of UI! 🚀",
                  "Beautiful typing animations ✨",
                  "Smooth. Fast. Elegant. 💎",
                  "Built for modern web apps 🎯",
                ]}
                waitTime={2000}
              />
            </div>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="space-y-8">
          <h2 className="mb-8 text-center font-bold text-3xl">
            Examples & Variations
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Professional Use Case */}
            <div className="group rounded-2xl border border-blue-200/50 bg-linear-to-br from-blue-50/50 to-blue-100/30 p-6 transition-all duration-300 hover:shadow-lg dark:border-blue-800/30 dark:from-blue-950/30 dark:to-blue-900/20">
              <div className="space-y-3">
                <h3 className="font-semibold text-blue-700 text-lg dark:text-blue-300">
                  Professional
                </h3>
                <p className="text-muted-foreground text-sm">
                  Perfect for landing pages and hero sections
                </p>
                <div className="flex h-16 items-center">
                  <TypingText
                    className="font-medium text-blue-800 dark:text-blue-200"
                    cursorChar="▋"
                    cursorClassName="text-blue-600 dark:text-blue-400"
                    deleteSpeed={50}
                    loop
                    speed={80}
                    text={[
                      "Building the future...",
                      "One component at a time...",
                      "Innovation never stops...",
                    ]}
                    waitTime={1800}
                  />
                </div>
              </div>
            </div>

            {/* Fast & Energetic */}
            <div className="group rounded-2xl border border-green-200/50 bg-linear-to-br from-green-50/50 to-emerald-100/30 p-6 transition-all duration-300 hover:shadow-lg dark:border-green-800/30 dark:from-green-950/30 dark:to-emerald-900/20">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-700 text-lg dark:text-green-300">
                  Lightning Fast
                </h3>
                <p className="text-muted-foreground text-sm">
                  High-speed typing for dynamic content
                </p>
                <div className="flex h-16 items-center">
                  <TypingText
                    className="font-semibold text-green-800 dark:text-green-200"
                    cursorChar="●"
                    cursorClassName="text-green-500 animate-pulse"
                    loop={true}
                    speed={25}
                    text={[
                      "⚡ Super fast typing effect! Ready in milliseconds!",
                      "Ready in milliseconds!",
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Elegant & Slow */}
            <div className="group rounded-2xl border border-purple-200/50 bg-linear-to-br from-purple-50/50 to-violet-100/30 p-6 transition-all duration-300 hover:shadow-lg dark:border-purple-800/30 dark:from-purple-950/30 dark:to-violet-900/20">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">
                  Elegant
                </h3>
                <p className="text-muted-foreground text-sm">
                  Smooth and thoughtful pacing
                </p>
                <div className="flex h-16 items-center">
                  <TypingText
                    className="font-medium text-purple-800 italic dark:text-purple-200"
                    cursorChar="│"
                    cursorClassName="text-purple-500"
                    initialDelay={500}
                    loop={true}
                    speed={120}
                    text={[
                      "Elegance in every keystroke... ✨",
                      "Elegance is the key to success",
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Code Style */}
            <div className="group rounded-2xl border border-slate-200/50 bg-linear-to-br from-slate-50/50 to-gray-100/30 p-6 transition-all duration-300 hover:shadow-lg dark:border-slate-800/30 dark:from-slate-950/30 dark:to-gray-900/20">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-300">
                  Code Terminal
                </h3>
                <p className="text-muted-foreground text-sm">
                  Developer-friendly monospace styling
                </p>
                <div className="flex h-16 items-center">
                  <TypingText
                    className="rounded bg-slate-100/50 px-3 py-1 font-mono text-slate-800 text-sm dark:bg-slate-800/50 dark:text-slate-200"
                    cursorChar="_"
                    cursorClassName="text-slate-600 dark:text-slate-400"
                    deleteSpeed={35}
                    loop
                    speed={70}
                    text={[
                      "$ npm install awesome-ui",
                      "$ yarn add beautiful-components",
                      "$ pnpm install modern-design",
                    ]}
                    waitTime={2500}
                  />
                </div>
              </div>
            </div>

            {/* No Cursor */}
            <div className="group rounded-2xl border border-orange-200/50 bg-linear-to-br from-orange-50/50 to-amber-100/30 p-6 transition-all duration-300 hover:shadow-lg dark:border-orange-800/30 dark:from-orange-950/30 dark:to-amber-900/20">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-orange-700 dark:text-orange-300">
                  Clean & Minimal
                </h3>
                <p className="text-muted-foreground text-sm">
                  No cursor distraction
                </p>
                <div className="flex h-16 items-center">
                  <TypingText
                    className="font-medium text-orange-800 dark:text-orange-200"
                    loop={true}
                    showCursor={false}
                    speed={90}
                    text={[
                      "Pure text, no distractions",
                      "Only the best for you",
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Custom Styled */}
            <div className="group rounded-2xl border border-rose-200/50 bg-linear-to-br from-rose-50/50 to-pink-100/30 p-6 transition-all duration-300 hover:shadow-lg dark:border-rose-800/30 dark:from-rose-950/30 dark:to-pink-900/20">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-rose-700 dark:text-rose-300">
                  Creative Cursor
                </h3>
                <p className="text-muted-foreground text-sm">
                  Custom cursor characters and styling
                </p>
                <div className="flex h-16 items-center">
                  <TypingText
                    className="font-semibold text-rose-800 dark:text-rose-200"
                    cursorChar="✨"
                    cursorClassName="text-rose-500 text-lg"
                    loop={true}
                    speed={75}
                    text={[
                      "Creativity knows no bounds! 🎨",
                      "Innovation never stops... 🚀",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypingTextTheme() {
  return (
    <TypingText
      className="font-semibold text-2xl text-foreground md:text-3xl"
      cursorChar="✨"
      cursorClassName="text-primary font-bold"
      deleteSpeed={40}
      loop={true}
      showCursor={true}
      speed={60}
      text={[
        "Welcome to the future of UI! 🚀",
        "Beautiful typing animations ✨",
        "Smooth. Fast. Elegant. 💎",
        "Built for modern web apps 🎯",
      ]}
      waitTime={2000}
    />
  );
}
