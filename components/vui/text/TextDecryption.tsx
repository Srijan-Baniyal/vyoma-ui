"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

const EMOJI_REGEX =
  /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

interface TextDecryptionProps extends HTMLMotionProps<"span"> {
  animateOn?: "view" | "hover";
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  glowEffect?: boolean;
  loop?: boolean;
  loopDelay?: number;
  maxIterations?: number;
  parentClassName?: string;
  revealDirection?: "start" | "end" | "center";
  sequential?: boolean;
  speed?: number;
  text: string;
  typewriterEffect?: boolean;
  useOriginalCharsOnly?: boolean;
}

function TextDecryption({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  glowEffect = false,
  typewriterEffect = false,
  loop = false,
  loopDelay = 2000,
  ...props
}: TextDecryptionProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  // Theme-aware default styling classes
  const getThemeAwareClasses = () => {
    if (className) {
      return className;
    }

    return theme === "dark"
      ? "text-green-400 font-mono transition-all duration-300"
      : "text-green-600 font-mono transition-all duration-300";
  };

  const getThemeAwareEncryptedClasses = () => {
    if (encryptedClassName) {
      return encryptedClassName;
    }

    return theme === "dark"
      ? "text-gray-500 font-mono opacity-70 transition-all duration-150"
      : "text-gray-400 font-mono opacity-60 transition-all duration-150";
  };

  const getThemeAwareParentClasses = () => {
    if (parentClassName) {
      return parentClassName;
    }

    return "inline-block cursor-pointer transition-all duration-300";
  };

  const defaultClassName = getThemeAwareClasses();
  const defaultEncryptedClassName = getThemeAwareEncryptedClasses();
  const defaultParentClassName = getThemeAwareParentClasses();

  // Helper to get next index for center reveal
  const getCenterRevealIndex = useCallback(
    (revealedSet: Set<number>, textLength: number): number => {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex =
        revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

      if (
        nextIndex >= 0 &&
        nextIndex < textLength &&
        !revealedSet.has(nextIndex)
      ) {
        return nextIndex;
      }
      for (let i = 0; i < textLength; i++) {
        if (!revealedSet.has(i)) {
          return i;
        }
      }
      return 0;
    },
    []
  );

  // Helper to get next index based on reveal direction
  const getNextIndex = useCallback(
    (revealedSet: Set<number>): number => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center":
          return getCenterRevealIndex(revealedSet, textLength);
        default:
          return revealedSet.size;
      }
    },
    [text.length, revealDirection, getCenterRevealIndex]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");

    // Helper function to check if a character is an emoji or special Unicode character
    const isEmojiOrSpecial = (char: string): boolean =>
      EMOJI_REGEX.test(char) || char.charCodeAt(0) > 127;

    // Use Array.from for proper Unicode character handling
    const getTextChars = (text: string): string[] => Array.from(text);

    const shuffleText = (
      originalText: string,
      currentRevealed: Set<number>
    ): string => {
      const textChars = getTextChars(originalText);

      if (useOriginalCharsOnly) {
        const positions = textChars.map((char, i) => ({
          char,
          isSpace: char === " ",
          isEmoji: isEmojiOrSpecial(char),
          index: i,
          isRevealed: currentRevealed.has(i),
        }));

        const nonSpecialChars = positions
          .filter((p) => !(p.isSpace || p.isEmoji || p.isRevealed))
          .map((p) => p.char);

        for (let i = nonSpecialChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpecialChars[i], nonSpecialChars[j]] = [
            nonSpecialChars[j],
            nonSpecialChars[i],
          ];
        }

        let charIndex = 0;
        return positions
          .map((p) => {
            if (p.isSpace || p.isEmoji) {
              return p.char; // Preserve spaces and emojis
            }
            if (p.isRevealed) {
              return textChars[p.index];
            }
            return nonSpecialChars[charIndex++] || p.char;
          })
          .join("");
      }
      return textChars
        .map((char, i) => {
          if (char === " " || isEmojiOrSpecial(char)) {
            return char; // Preserve spaces and emojis
          }
          if (currentRevealed.has(i)) {
            return textChars[i];
          }
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join("");
    };

    const startLoopCycle = () => {
      if (loop && animateOn === "view" && !isLooping) {
        setIsLooping(true);
        loopTimeoutRef.current = setTimeout(() => {
          setRevealedIndices(new Set());
          setIsHovering(false);
          setIsLooping(false);
          setTimeout(() => {
            setIsHovering(true);
          }, 100);
        }, loopDelay);
      }
    };

    const handleSequentialReveal = (prevRevealed: Set<number>) => {
      if (prevRevealed.size < text.length) {
        const nextIndex = getNextIndex(prevRevealed);
        const newRevealed = new Set(prevRevealed);
        newRevealed.add(nextIndex);
        setDisplayText(shuffleText(text, newRevealed));
        return newRevealed;
      }
      clearInterval(interval);
      setIsScrambling(false);
      startLoopCycle();
      return prevRevealed;
    };

    const handleRandomReveal = (prevRevealed: Set<number>) => {
      setDisplayText(shuffleText(text, prevRevealed));
      currentIteration++;
      if (currentIteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
        setDisplayText(text);
        startLoopCycle();
      }
      return prevRevealed;
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            return handleSequentialReveal(prevRevealed);
          }
          return handleRandomReveal(prevRevealed);
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    characters,
    useOriginalCharsOnly,
    loop,
    loopDelay,
    animateOn,
    isLooping,
    getNextIndex,
  ]);

  useEffect(() => {
    if (animateOn !== "view") {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting && (!hasAnimated || loop)) {
          setIsHovering(true);
          if (!loop) {
            setHasAnimated(true);
          }
        }
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOn, hasAnimated, loop]);

  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  const getThemeAwareGlow = () => {
    if (!(glowEffect && isHovering)) {
      return "";
    }

    return theme === "dark"
      ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
      : "drop-shadow-[0_0_8px_rgba(22,163,74,0.4)]";
  };

  const containerClasses = [
    defaultParentClassName,
    getThemeAwareGlow(),
    isScrambling ? "animate-pulse" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const characterOccurrences = new Map<string, number>();

  return (
    <motion.span
      animate={{ opacity: 1, y: 0 }}
      className={`inline-block whitespace-pre-wrap ${containerClasses}`}
      initial={{ opacity: 0, y: 10 }}
      ref={containerRef}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...hoverProps}
      {...props}
    >
      {/* Screen reader accessible text */}
      <span className="sr-only">{text}</span>

      {/* Visual text with scramble effect */}
      <span aria-hidden="true" className="relative">
        {Array.from(displayText).map((char, index) => {
          const occurrence = (characterOccurrences.get(char) ?? 0) + 1;
          characterOccurrences.set(char, occurrence);
          const isRevealedOrDone =
            revealedIndices.has(index) || !isScrambling || !isHovering;

          const getAnimateProps = () => {
            if (!typewriterEffect) {
              return;
            }
            if (isRevealedOrDone) {
              return { opacity: 1, scale: 1 };
            }
            return { opacity: 0.7, scale: 0.9 };
          };

          return (
            <motion.span
              animate={getAnimateProps()}
              className={`${
                isRevealedOrDone ? defaultClassName : defaultEncryptedClassName
              } relative inline-block`}
              initial={
                typewriterEffect ? { opacity: 0, scale: 0.8 } : undefined
              }
              key={`${char}-${occurrence}-${displayText}`}
              transition={{
                duration: 0.2,
                delay: typewriterEffect ? index * 0.05 : 0,
                ease: "easeOut",
              }}
            >
              {char}
              {/* Subtle glow effect for revealed characters */}
              {glowEffect && isRevealedOrDone && (
                <span className="pointer-events-none absolute inset-0 text-green-400 opacity-50 blur-sm">
                  {char}
                </span>
              )}
            </motion.span>
          );
        })}

        {/* Cursor effect for typewriter mode */}
        {typewriterEffect && isScrambling && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            className="ml-1 inline-block h-5 w-0.5 bg-green-400"
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        )}
      </span>
    </motion.span>
  );
}

export default function TextDecryptionShowcase() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl space-y-16 bg-background p-8 text-foreground">
      <section className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-green-500 dark:hover:border-green-400">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-card-foreground text-xl">
                Hover to Decrypt
              </h3>
              <span className="rounded bg-green-100 px-2 py-1 text-green-700 text-xs dark:bg-green-900 dark:text-green-300">
                HOVER
              </span>
            </div>
            <div className="mb-6 rounded-lg bg-muted p-4">
              <TextDecryption
                animateOn="hover"
                className="text-green-600 text-xl dark:text-green-400"
                text="Hover over me to see the magic!"
              />
            </div>
            <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-xs">
              {`<TextDecryption
  text="Hover over me to see the magic!"
  animateOn="hover"
/>`}
            </div>
          </div>

          <div className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-card-foreground text-xl">
                Auto Decrypt on View
              </h3>
              <span className="rounded bg-blue-100 px-2 py-1 text-blue-700 text-xs dark:bg-blue-900 dark:text-blue-300">
                AUTO
              </span>
            </div>
            <div className="mb-6 rounded-lg bg-muted p-4">
              <TextDecryption
                animateOn="view"
                className="text-blue-600 text-xl dark:text-blue-400"
                loop={true}
                loopDelay={1000}
                revealDirection="start"
                sequential={true}
                speed={120}
                text="I decrypt when you see me"
              />
            </div>
            <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-xs">
              {`<TextDecryption
  text="I decrypt automatically when you see me"
  animateOn="view"
  loop={true}
  loopDelay={3000}
/>`}
            </div>
          </div>
        </div>
      </section>

      {/* Sequential vs Random */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="mb-3 font-semibold text-3xl text-primary">
            Sequential vs Random Decryption
          </h2>
          <p className="text-muted-foreground">
            Compare different animation styles
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-3 font-medium text-card-foreground text-lg">
              Sequential (Left to Right)
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-lg text-purple-600 dark:text-purple-400"
              revealDirection="start"
              sequential={true}
              text="Sequential decryption from start"
            />
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-3 font-medium text-card-foreground text-lg">
              Random Scramble
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-lg text-yellow-600 dark:text-yellow-400"
              maxIterations={15}
              sequential={false}
              text="Random character scrambling"
            />
          </div>
        </div>
      </section>

      {/* Reveal Directions */}
      <section className="space-y-6">
        <h2 className="border-green-800 border-b pb-2 font-semibold text-2xl text-green-300">
          Reveal Directions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <h3 className="mb-3 font-medium text-gray-200 text-sm">
              From Start
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-green-400"
              revealDirection="start"
              sequential={true}
              text="Start to End"
            />
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <h3 className="mb-3 font-medium text-gray-200 text-sm">From End</h3>
            <TextDecryption
              animateOn="hover"
              className="text-red-400"
              revealDirection="end"
              sequential={true}
              text="End to Start"
            />
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <h3 className="mb-3 font-medium text-gray-200 text-sm">
              From Center
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-cyan-400"
              revealDirection="center"
              sequential={true}
              text="Center Outward"
            />
          </div>
        </div>
      </section>

      {/* Speed Variations */}
      <section className="space-y-6">
        <h2 className="border-green-800 border-b pb-2 font-semibold text-2xl text-green-300">
          Speed Variations
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <h3 className="mb-3 font-medium text-gray-200 text-sm">
              Slow (200ms)
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-orange-400"
              sequential={true}
              speed={200}
              text="Slow and steady"
            />
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <h3 className="mb-3 font-medium text-gray-200 text-sm">
              Normal (50ms)
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-pink-400"
              sequential={true}
              speed={50}
              text="Normal speed"
            />
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <h3 className="mb-3 font-medium text-gray-200 text-sm">
              Fast (20ms)
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-indigo-400"
              sequential={true}
              speed={20}
              text="Lightning fast"
            />
          </div>
        </div>
      </section>

      {/* Character Sets */}
      <section className="space-y-6">
        <h2 className="border-green-800 border-b pb-2 font-semibold text-2xl text-green-300">
          Custom Character Sets
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
            <h3 className="mb-3 font-medium text-gray-200 text-lg">
              Numbers Only
            </h3>
            <TextDecryption
              animateOn="hover"
              characters="0123456789"
              className="font-mono text-2xl text-green-400"
              sequential={true}
              text="1234567890"
            />
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
            <h3 className="mb-3 font-medium text-gray-200 text-lg">
              Symbols Only
            </h3>
            <TextDecryption
              animateOn="hover"
              characters="!@#$%^&*()_+-=[]{}|;:,.<>?"
              className="font-mono text-2xl text-red-400"
              sequential={true}
              text="!@#$%^&*()"
            />
          </div>
        </div>
      </section>

      {/* Original Characters Only */}
      <section className="space-y-6">
        <h2 className="border-green-800 border-b pb-2 font-semibold text-2xl text-green-300">
          Original Characters Mode
        </h2>

        <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
          <h3 className="mb-3 font-medium text-gray-200 text-lg">
            Scrambles only using characters from the original text
          </h3>
          <TextDecryption
            animateOn="hover"
            className="text-2xl text-cyan-400"
            maxIterations={20}
            sequential={false}
            text="Hello World"
            useOriginalCharsOnly={true}
          />
        </div>
      </section>

      {/* Visual Effects */}
      <section className="space-y-6">
        <h2 className="border-green-800 border-b pb-2 font-semibold text-2xl text-green-300">
          Visual Effects
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
            <h3 className="mb-3 font-medium text-gray-200 text-lg">
              Glow Effect
            </h3>
            <TextDecryption
              animateOn="hover"
              className="font-bold text-green-400 text-xl"
              glowEffect={true}
              sequential={true}
              text="Glowing text effect"
            />
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
            <h3 className="mb-3 font-medium text-gray-200 text-lg">
              Typewriter Effect
            </h3>
            <TextDecryption
              animateOn="hover"
              className="text-blue-400 text-xl"
              sequential={true}
              text="Typewriter style reveal"
              typewriterEffect={true}
            />
          </div>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="mb-3 font-semibold text-3xl text-primary">
            Real-World Use Cases
          </h2>
          <p className="text-muted-foreground">
            See how TextDecryption works in practical scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Loading State */}
          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="mb-4 font-medium text-card-foreground text-xl">
              Loading State
            </h3>
            <div className="mb-6 space-y-3">
              <TextDecryption
                animateOn="view"
                className="text-blue-600 dark:text-blue-400"
                loop={true}
                loopDelay={2500}
                sequential={true}
                speed={80}
                text="Loading user profile..."
              />
              <TextDecryption
                animateOn="view"
                className="text-yellow-600 dark:text-yellow-400"
                loop={true}
                loopDelay={2800}
                sequential={true}
                speed={90}
                text="Fetching data from server..."
              />
              <TextDecryption
                animateOn="view"
                className="text-green-600 dark:text-green-400"
                loop={true}
                loopDelay={2200}
                sequential={true}
                speed={60}
                text="Almost ready!"
              />
            </div>
          </div>

          {/* Hero Section */}
          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="mb-4 font-medium text-card-foreground text-xl">
              Hero Section
            </h3>
            <div className="mb-6 space-y-4">
              <TextDecryption
                animateOn="view"
                className="font-bold text-2xl text-green-600 dark:text-green-400"
                glowEffect={true}
                loop={true}
                loopDelay={4000}
                revealDirection="center"
                sequential={true}
                speed={120}
                text="Welcome to the Future"
              />
              <TextDecryption
                animateOn="view"
                className="text-muted-foreground"
                loop={true}
                loopDelay={3500}
                sequential={true}
                speed={60}
                text="Experience next-generation technology"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ultimate Showcase */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="mb-3 font-semibold text-3xl text-primary">
            Ultimate Showcase
          </h2>
          <p className="text-muted-foreground">
            All effects combined for maximum impact
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-card p-12">
          <div className="absolute inset-0 animate-pulse bg-linear-to-r from-primary/5 to-blue-500/5" />
          <div className="relative space-y-6 text-center">
            <TextDecryption
              animateOn="view"
              className="font-bold text-3xl text-green-600 tracking-wider dark:text-green-400"
              encryptedClassName="text-red-600 dark:text-red-400 opacity-60"
              glowEffect={true}
              loop={true}
              loopDelay={5000}
              revealDirection="center"
              sequential={true}
              speed={100}
              text="🚀 ADVANCED DECRYPTION PROTOCOL ACTIVATED 🚀"
              typewriterEffect={true}
            />
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-muted-foreground text-sm backdrop-blur">
              {`<TextDecryption
  text="🚀 ADVANCED DECRYPTION PROTOCOL ACTIVATED 🚀"
  sequential={true}
  revealDirection="center"
  speed={100}
  glowEffect={true}
  typewriterEffect={true}
  animateOn="view"
  loop={true}
  loopDelay={5000}
  className="text-green-400 text-3xl font-bold"
  encryptedClassName="text-red-500 opacity-60"
/>`}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TextDecryptionTheme() {
  return (
    <TextDecryption
      animateOn="view"
      className="text-blue-600 text-xl dark:text-blue-400"
      loop={true}
      loopDelay={1000}
      revealDirection="start"
      sequential={true}
      speed={120}
      text="I decrypt when you see me"
    />
  );
}
