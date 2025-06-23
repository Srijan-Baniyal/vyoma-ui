"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";


interface CursorAnimationVariants extends Variants {
  initial: Variants["initial"];
  animate: Variants["animate"];
}
interface TypingTextProps {
  text: string | string[];
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | React.ReactNode;
  cursorAnimationVariants?: CursorAnimationVariants;
  cursorClassName?: string;
  onTypingStart?: () => void;
  onTypingComplete?: () => void;
  onDeletingStart?: () => void;
  onDeletingComplete?: () => void;
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
      repeat: Infinity,
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

    const animate = () => {
      const currentText = texts[currentTextIndex];

      // Handle initial delay
      if (!hasStarted) {
        hasStarted = true;
        onTypingStart?.();
        if (initialDelay > 0) {
          timeout = setTimeout(animate, initialDelay);
          return;
        }
      }

      if (isDeleting) {
        // Deleting phase
        setDisplayText(currentText.substring(0, currentIndex));
        currentIndex--;

        if (currentIndex < 0) {
          // Finished deleting
          isDeleting = false;
          onDeletingComplete?.();

          // Move to next text
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
      } else {
        // Typing phase
        setDisplayText(currentText.substring(0, currentIndex + 1));
        currentIndex++;

        if (currentIndex === currentText.length) {
          // Finished typing current text
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
    text,
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
          variants={cursorAnimationVariants}
          className={cn(cursorClassName, shouldHideCursor && "hidden")}
          initial="initial"
          animate="animate"
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
    <div className="space-y-8 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">TypingText Component</h2>
        <p className="text-muted-foreground mb-8">
          Animated typing effects with customizable options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl border bg-card">
          <h3 className="text-lg font-semibold mb-4">Multi-line Text</h3>
          <TypingText
            text={[
              "Welcome to VUI! ✨",
              "Modern UI components 🎨",
              "Built with TypeScript 💪",
            ]}
            speed={50}
            deleteSpeed={30}
            loop
            showCursor
            waitTime={1500}
            className="text-lg text-primary"
          />
        </div>

        <div className="p-6 rounded-2xl border bg-card">
          <h3 className="text-lg font-semibold mb-4">Single Line</h3>
          <TypingText
            text="Simple typing animation"
            speed={80}
            showCursor
            loop={false}
            className="text-lg"
          />
        </div>

        <div className="p-6 rounded-2xl border bg-card">
          <h3 className="text-lg font-semibold mb-4">Fast Typing</h3>
          <TypingText
            text="Lightning fast typing effect! ⚡"
            speed={20}
            showCursor
            loop={false}
            className="text-lg text-green-500"
          />
        </div>

        <div className="p-6 rounded-2xl border bg-card">
          <h3 className="text-lg font-semibold mb-4">Custom Cursor</h3>
          <TypingText
            text="Custom styled cursor..."
            speed={100}
            showCursor
            loop={false}
            cursorChar="|"
            cursorClassName="text-primary font-bold text-xl"
            className="text-lg"
          />
        </div>
      </div>
    </div>
  );
}
