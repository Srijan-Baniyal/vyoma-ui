"use client";

import {
  type HTMLMotionProps,
  motion,
  type TargetAndTransition,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WaveVariant extends TargetAndTransition {
  y?: number[];
  rotate?: number[];
  scale?: number[];
  x?: number[];
}

interface WavingTextProps extends Omit<HTMLMotionProps<"div">, "children"> {
  text: string | string[];
  variant?:
    | "sine"
    | "bounce"
    | "elastic"
    | "rotate"
    | "scale"
    | "float"
    | "dance"
    | "quantum";
  intensity?: "subtle" | "normal" | "strong" | "extreme";
  speed?: number;
  direction?: "forward" | "reverse" | "alternate";
  stagger?: number;
  trigger?: "none" | "hover" | "view" | "continuous";
  loop?: boolean;
  className?: string;
  letterClassName?: string;
  wordClassName?: string;
  containerClassName?: string;
  animateAsWords?: boolean;
  preserveSpaces?: boolean;
  viewTriggerOptions?: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  };
  customWave?: WaveVariant;
  duration?: number;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

// Predefined wave variants with different intensities
const waveVariants = {
  sine: {
    subtle: { y: [0, -3, 0, 3, 0] },
    normal: { y: [0, -8, 0, 8, 0] },
    strong: { y: [0, -15, 0, 15, 0] },
    extreme: { y: [0, -25, 0, 25, 0] },
  },
  bounce: {
    subtle: { y: [0, -5, 0], scale: [1, 1.05, 1] },
    normal: { y: [0, -12, 0], scale: [1, 1.1, 1] },
    strong: { y: [0, -20, 0], scale: [1, 1.15, 1] },
    extreme: { y: [0, -30, 0], scale: [1, 1.25, 1] },
  },
  elastic: {
    subtle: { y: [0, -4, 0, -2, 0], scale: [1, 1.02, 1, 1.01, 1] },
    normal: { y: [0, -10, 0, -5, 0], scale: [1, 1.05, 1, 1.03, 1] },
    strong: { y: [0, -18, 0, -8, 0], scale: [1, 1.1, 1, 1.05, 1] },
    extreme: { y: [0, -28, 0, -12, 0], scale: [1, 1.2, 1, 1.1, 1] },
  },
  rotate: {
    subtle: { rotate: [0, 3, -3, 0], y: [0, -2, 0] },
    normal: { rotate: [0, 8, -8, 0], y: [0, -5, 0] },
    strong: { rotate: [0, 15, -15, 0], y: [0, -10, 0] },
    extreme: { rotate: [0, 25, -25, 0], y: [0, -15, 0] },
  },
  scale: {
    subtle: { scale: [1, 1.05, 1], y: [0, -2, 0] },
    normal: { scale: [1, 1.15, 1], y: [0, -5, 0] },
    strong: { scale: [1, 1.25, 1], y: [0, -8, 0] },
    extreme: { scale: [1, 1.4, 1], y: [0, -12, 0] },
  },
  float: {
    subtle: { y: [0, -3, 0, 3, 0], x: [0, 1, 0, -1, 0] },
    normal: { y: [0, -8, 0, 8, 0], x: [0, 3, 0, -3, 0] },
    strong: { y: [0, -15, 0, 15, 0], x: [0, 5, 0, -5, 0] },
    extreme: { y: [0, -25, 0, 25, 0], x: [0, 8, 0, -8, 0] },
  },
  dance: {
    subtle: {
      y: [0, -4, 0, -2, 0],
      rotate: [0, 2, -2, 1, 0],
      scale: [1, 1.02, 1],
    },
    normal: {
      y: [0, -10, 0, -5, 0],
      rotate: [0, 5, -5, 3, 0],
      scale: [1, 1.05, 1],
    },
    strong: {
      y: [0, -18, 0, -8, 0],
      rotate: [0, 10, -10, 5, 0],
      scale: [1, 1.1, 1],
    },
    extreme: {
      y: [0, -25, 0, -12, 0],
      rotate: [0, 20, -20, 10, 0],
      scale: [1, 1.2, 1],
    },
  },
  quantum: {
    subtle: {
      y: [0, -2, 0, 2, 0],
      x: [0, 1, 0, -1, 0],
      scale: [1, 1.01, 1, 1.01, 1],
      rotate: [0, 1, -1, 0],
    },
    normal: {
      y: [0, -6, 0, 6, 0],
      x: [0, 2, 0, -2, 0],
      scale: [1, 1.03, 1, 1.03, 1],
      rotate: [0, 3, -3, 0],
    },
    strong: {
      y: [0, -12, 0, 12, 0],
      x: [0, 4, 0, -4, 0],
      scale: [1, 1.08, 1, 1.08, 1],
      rotate: [0, 8, -8, 0],
    },
    extreme: {
      y: [0, -20, 0, 20, 0],
      x: [0, 6, 0, -6, 0],
      scale: [1, 1.15, 1, 1.15, 1],
      rotate: [0, 15, -15, 0],
    },
  },
};

const WavingText = ({
  text,
  variant = "sine",
  intensity = "normal",
  speed = 2,
  direction = "forward",
  stagger = 0.1,
  trigger = "continuous",
  loop = true,
  className,
  letterClassName,
  wordClassName,
  containerClassName,
  animateAsWords = false,
  preserveSpaces = true,
  viewTriggerOptions = {},
  customWave,
  duration,
  onAnimationStart,
  onAnimationComplete,
  ...props
}: WavingTextProps) => {
  const [isVisible, setIsVisible] = useState(trigger !== "view");
  const [isHovering, setIsHovering] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const texts = Array.isArray(text) ? text : [text];
  const currentText = texts[currentTextIndex];

  // Cycle through texts if multiple provided
  useEffect(() => {
    if (
      texts.length > 1 &&
      (trigger === "continuous" || (trigger === "view" && isVisible))
    ) {
      const interval = setInterval(
        () => {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        },
        (duration || speed * 1000) * 2
      );
      return () => clearInterval(interval);
    }
  }, [texts.length, trigger, isVisible, speed, duration]);

  // Intersection Observer for view trigger
  useEffect(() => {
    if (trigger !== "view") {
      return;
    }

    const {
      threshold = 0.1,
      rootMargin = "0px",
      triggerOnce = false,
    } = viewTriggerOptions;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onAnimationStart?.();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [trigger, viewTriggerOptions, onAnimationStart]);

  // Get animation variant
  const getAnimationVariant = (): WaveVariant => {
    if (customWave) {
      return customWave;
    }

    // Ensure variant and intensity exist in waveVariants
    if (waveVariants[variant]?.[intensity]) {
      return waveVariants[variant][intensity];
    }

    // Fallback to default
    return waveVariants.sine.normal;
  };

  // Get initial state (neutral position)
  const getInitialVariant = () => {
    return { y: 0, x: 0, scale: 1, rotate: 0 };
  };

  // Determine if animation should play
  const shouldAnimate = () => {
    switch (trigger) {
      case "hover":
        return isHovering;
      case "view":
        return isVisible;
      case "continuous":
        return true;
      case "none":
        return false;
      default:
        return true;
    }
  };

  // Create animation transition
  const createTransition = (index: number) => {
    const baseDelay =
      direction === "reverse"
        ? (animateAsWords
            ? currentText.split(" ").length - index - 1
            : currentText.length - index - 1) * stagger
        : index * stagger;

    const transition = {
      duration: duration || speed,
      repeat: loop ? Number.POSITIVE_INFINITY : 0,
      repeatType: (direction === "alternate" ? "reverse" : "loop") as
        | "loop"
        | "reverse"
        | "mirror",
      delay: baseDelay,
      ease: "easeInOut" as const,
    };

    return transition;
  };

  // Split text into units (letters or words)
  // Properly handles emojis and Unicode characters
  const splitTextIntoUnits = (text: string): string[] => {
    if (animateAsWords) {
      return preserveSpaces ? text.split(/(\s+)/) : text.split(" ");
    }
    // Use Array.from() or spread operator to properly handle Unicode characters including emojis
    const characters = Array.from(text);
    return preserveSpaces
      ? characters
      : characters.filter((char) => !/\s/.test(char));
  };

  const textUnits = splitTextIntoUnits(currentText);
  const animationVariant = getAnimationVariant();

  const hoverProps =
    trigger === "hover"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.div
      className={cn("inline-flex items-baseline", containerClassName)}
      ref={containerRef}
      {...hoverProps}
      {...props}
    >
      {textUnits.map((unit, index) => {
        const isSpace = unit.trim() === "";
        const shouldSkipAnimation = isSpace && !preserveSpaces;

        if (isSpace && preserveSpaces) {
          return (
            <span className="whitespace-pre" key={`space-${index}`}>
              {unit}
            </span>
          );
        }

        if (shouldSkipAnimation) {
          return null;
        }

        return (
          <motion.span
            animate={shouldAnimate() ? animationVariant : getInitialVariant()}
            className={cn(
              "inline-block",
              animateAsWords ? wordClassName : letterClassName,
              className
            )}
            initial={getInitialVariant()}
            key={`${currentTextIndex}-${index}-${unit}`}
            onAnimationComplete={index === 0 ? onAnimationComplete : undefined}
            style={{
              transformOrigin: "center center",
            }}
            transition={createTransition(index)}
          >
            {unit}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default WavingText;

// Showcase Component
export function WavingTextShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Variant Showcase */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Animation Variants
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.keys(waveVariants).map((variantKey) => (
              <div
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50"
                key={variantKey}
              >
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-lg capitalize">
                    {variantKey}
                  </h3>
                  <div className="flex h-16 items-center justify-center">
                    <WavingText
                      className="font-medium text-primary"
                      intensity="normal"
                      speed={2}
                      stagger={0.1}
                      text={`${
                        variantKey.charAt(0).toUpperCase() + variantKey.slice(1)
                      } Wave`}
                      variant={
                        variantKey as
                          | "sine"
                          | "bounce"
                          | "elastic"
                          | "rotate"
                          | "scale"
                          | "float"
                          | "dance"
                          | "quantum"
                      }
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {variantKey === "sine" && "Classic sine wave motion"}
                    {variantKey === "bounce" && "Energetic bouncing effect"}
                    {variantKey === "elastic" && "Spring-like elasticity"}
                    {variantKey === "rotate" && "Rotating wave motion"}
                    {variantKey === "scale" && "Scaling transformation"}
                    {variantKey === "float" && "Floating in all directions"}
                    {variantKey === "dance" && "Combined dance movements"}
                    {variantKey === "quantum" && "Multi-dimensional chaos"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intensity Levels */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Intensity Levels
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(["subtle", "normal", "strong", "extreme"] as const).map(
              (intensityLevel) => (
                <div
                  className="rounded-2xl border border-border bg-card p-6"
                  key={intensityLevel}
                >
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground text-lg capitalize">
                      {intensityLevel}
                    </h3>
                    <div className="flex h-16 items-center justify-center">
                      <WavingText
                        className={cn(
                          "font-semibold",
                          intensityLevel === "subtle" && "text-blue-500",
                          intensityLevel === "normal" && "text-green-500",
                          intensityLevel === "strong" && "text-orange-500",
                          intensityLevel === "extreme" && "text-red-500"
                        )}
                        intensity={intensityLevel}
                        speed={2}
                        stagger={0.15}
                        text="Wave Text"
                        variant="bounce"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Trigger Types */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Animation Triggers
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Continuous */}
            <div className="rounded-2xl border border-green-200/50 bg-gradient-to-br from-green-50/50 to-emerald-100/30 p-6 dark:border-green-800/30 dark:from-green-950/30 dark:to-emerald-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-700 text-lg dark:text-green-300">
                    Continuous
                  </h3>
                  <span className="rounded bg-green-100 px-2 py-1 text-green-700 text-xs dark:bg-green-900 dark:text-green-300">
                    AUTO
                  </span>
                </div>
                <div className="flex h-16 items-center justify-center">
                  <WavingText
                    className="font-medium text-green-600 dark:text-green-400"
                    intensity="normal"
                    speed={2}
                    text="Always Waving!"
                    trigger="continuous"
                    variant="sine"
                  />
                </div>
                <p className="text-green-600 text-sm dark:text-green-400">
                  Animations run continuously
                </p>
              </div>
            </div>

            {/* Hover */}
            <div className="rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-blue-100/30 p-6 dark:border-blue-800/30 dark:from-blue-950/30 dark:to-blue-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-blue-700 text-lg dark:text-blue-300">
                    Hover
                  </h3>
                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-700 text-xs dark:bg-blue-900 dark:text-blue-300">
                    HOVER
                  </span>
                </div>
                <div className="flex h-16 items-center justify-center">
                  <WavingText
                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-400"
                    intensity="strong"
                    speed={1.5}
                    text="Hover over me!"
                    trigger="hover"
                    variant="bounce"
                  />
                </div>
                <p className="text-blue-600 text-sm dark:text-blue-400">
                  Waves on mouse hover
                </p>
              </div>
            </div>

            {/* View */}
            <div className="rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-violet-100/30 p-6 dark:border-purple-800/30 dark:from-purple-950/30 dark:to-violet-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">
                    On View
                  </h3>
                  <span className="rounded bg-purple-100 px-2 py-1 text-purple-700 text-xs dark:bg-purple-900 dark:text-purple-300">
                    VIEW
                  </span>
                </div>
                <div className="flex h-16 items-center justify-center">
                  <WavingText
                    className="font-medium text-purple-600 dark:text-purple-400"
                    intensity="normal"
                    speed={2}
                    text="Scroll to see me!"
                    trigger="view"
                    variant="elastic"
                  />
                </div>
                <p className="text-purple-600 text-sm dark:text-purple-400">
                  Animates when in viewport
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Advanced Features
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Word Animation */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">
                  Word-based Animation
                </h3>
                <div className="flex h-20 items-center justify-center">
                  <WavingText
                    animateAsWords={true}
                    className="font-medium text-lg text-orange-500"
                    intensity="normal"
                    speed={2}
                    stagger={0.3}
                    text="Each word waves separately!"
                    variant="rotate"
                  />
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
                  {`<WavingText 
  text="Each word waves separately!" 
  animateAsWords={true} 
  stagger={0.3} 
/>`}
                </div>
              </div>
            </div>

            {/* Multiple Texts */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">
                  Multiple Texts
                </h3>
                <div className="flex h-20 items-center justify-center">
                  <WavingText
                    className="font-medium text-lg text-pink-500"
                    intensity="normal"
                    speed={2}
                    stagger={0.1}
                    text={["First Message", "Second Message", "Third Message"]}
                    variant="dance"
                  />
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
                  {`<WavingText 
  text={["First Message", "Second Message", "Third Message"]} 
  variant="dance" 
/>`}
                </div>
              </div>
            </div>

            {/* Direction Control */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-6">
                <h3 className="font-semibold text-foreground text-xl">
                  Direction Control
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="mb-4 text-muted-foreground text-sm">
                      Forward
                    </p>
                    <div className="flex h-16 items-center justify-center">
                      <WavingText
                        className="font-medium text-cyan-500 text-lg"
                        direction="forward"
                        intensity="normal"
                        speed={2}
                        stagger={0.15}
                        text="Left to Right"
                        trigger="continuous"
                        variant="scale"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="mb-4 text-muted-foreground text-sm">
                      Reverse
                    </p>
                    <div className="flex h-16 items-center justify-center">
                      <WavingText
                        className="font-medium text-cyan-500 text-lg"
                        direction="reverse"
                        intensity="normal"
                        speed={2}
                        stagger={0.15}
                        text="Right to Left"
                        trigger="continuous"
                        variant="scale"
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
                  {`<WavingText 
  text="Left to Right" 
  direction="forward" 
  stagger={0.15} 
/>
<WavingText 
  text="Right to Left" 
  direction="reverse" 
  stagger={0.15} 
/>`}
                </div>
              </div>
            </div>

            {/* Custom Styling */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">
                  Custom Styling
                </h3>
                <div className="flex h-60 items-center justify-center">
                  <WavingText
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-2xl text-transparent"
                    intensity="strong"
                    speed={2}
                    stagger={0.1}
                    text="🌊 Styled Waves 🌊"
                    trigger="continuous"
                    variant="quantum"
                  />
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
                  {`<WavingText 
  text="🌊 Styled Waves 🌊" 
  className="text-transparent bg-gradient-to-r 
    from-blue-500 via-purple-500 to-pink-500 
    bg-clip-text font-bold text-2xl" 
/>`}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Theme Component for Documentation
export function WavingTextTheme() {
  return (
    <WavingText
      className="font-medium text-primary"
      intensity="normal"
      speed={2.5}
      stagger={0.08}
      text="Beautiful wave animations for your text content"
      variant="sine"
    />
  );
}
