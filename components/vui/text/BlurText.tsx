"use client";

import { motion, Transition } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type Easing =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | number[]
  | ((t: number) => number);

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  autoPlay?: boolean;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOut",
  onAnimationComplete,
  stepDuration = 0.35,
  autoPlay = false,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(autoPlay);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !mounted || autoPlay) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, mounted, autoPlay]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p ref={ref} className={cn("blur-text flex flex-wrap", className)}>
      {!mounted ? (
        // Show plain text on server to prevent hydration issues
        <span className="opacity-100">{text}</span>
      ) : (
        elements.map((segment, index) => {
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

          const spanTransition: Transition = {
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing as any,
          };

          return (
            <motion.span
              key={index}
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={spanTransition}
              onAnimationComplete={
                index === elements.length - 1 ? onAnimationComplete : undefined
              }
              style={{
                display: "inline-block",
                willChange: "transform, filter, opacity",
              }}
            >
              {segment === " " ? "\u00A0" : segment}
              {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
            </motion.span>
          );
        })
      )}
    </p>
  );
};

export default BlurText;

// Showcase Component
export function BlurTextShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="relative p-12 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-2xl">
            <BlurText
              text="Beautiful Blur Animations"
              animateBy="words"
              direction="top"
              delay={350}
              autoPlay={true}
              stepDuration={0.6}
              className="text-4xl md:text-5xl font-bold text-primary"
            />
          </div>
        </section>

        {/* Animation Direction */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Animation Directions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Top */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    From Top
                  </h3>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    ↓
                  </span>
                </div>
                <div className="min-h-24 flex items-center justify-center">
                  <BlurText
                    text="Descending from above"
                    direction="top"
                    delay={250}
                    stepDuration={0.5}
                    className="text-2xl font-semibold text-blue-600 dark:text-blue-400"
                  />
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Text blurs in from the top downwards
                </p>
              </div>
            </div>

            {/* From Bottom */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50/50 to-violet-100/30 dark:from-purple-950/30 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                    From Bottom
                  </h3>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                    ↑
                  </span>
                </div>
                <div className="min-h-24 flex items-center justify-center">
                  <BlurText
                    text="Rising from below"
                    direction="bottom"
                    delay={250}
                    stepDuration={0.5}
                    className="text-2xl font-semibold text-purple-600 dark:text-purple-400"
                  />
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Text blurs in from the bottom upwards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Animation Modes */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Animation Modes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Words */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50/50 to-emerald-100/30 dark:from-green-950/30 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                    Word by Word
                  </h3>
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                    WORDS
                  </span>
                </div>
                <div className="min-h-24 flex items-center justify-center">
                  <BlurText
                    text="Each word appears sequentially"
                    animateBy="words"
                    delay={300}
                    stepDuration={0.5}
                    className="text-2xl font-semibold text-green-600 dark:text-green-400"
                  />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Animates one word at a time
                </p>
              </div>
            </div>

            {/* By Letters */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50/50 to-amber-100/30 dark:from-orange-950/30 dark:to-amber-900/20 border border-orange-200/50 dark:border-orange-800/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                    Letter by Letter
                  </h3>
                  <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                    LETTERS
                  </span>
                </div>
                <div className="min-h-24 flex items-center justify-center">
                  <BlurText
                    text="Character by character"
                    animateBy="letters"
                    delay={50}
                    className="text-2xl font-semibold text-orange-600 dark:text-orange-400"
                  />
                </div>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Animates one letter at a time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Speed Variations */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Speed Variations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fast */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Fast
                </h3>
                <div className="min-h-20 flex items-center justify-center">
                  <BlurText
                    text="Quick and snappy!"
                    delay={50}
                    stepDuration={0.2}
                    className="text-xl font-semibold text-red-500"
                  />
                </div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                  delay: 50ms
                </div>
              </div>
            </div>

            {/* Medium */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Medium
                </h3>
                <div className="min-h-20 flex items-center justify-center">
                  <BlurText
                    text="Balanced timing"
                    delay={150}
                    stepDuration={0.35}
                    className="text-xl font-semibold text-yellow-500"
                  />
                </div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                  delay: 150ms
                </div>
              </div>
            </div>

            {/* Slow */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Slow
                </h3>
                <div className="min-h-20 flex items-center justify-center">
                  <BlurText
                    text="Smooth elegance"
                    delay={300}
                    stepDuration={0.5}
                    className="text-xl font-semibold text-cyan-500"
                  />
                </div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                  delay: 300ms
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Real-World Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hero Title */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Hero Title
                </h3>
                <div className="min-h-32 flex items-center justify-center">
                  <BlurText
                    text="Welcome to the Future"
                    animateBy="words"
                    direction="top"
                    delay={300}
                    stepDuration={0.5}
                    className="text-3xl font-bold text-foreground"
                  />
                </div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  {`<BlurText 
  text="Welcome to the Future"
  animateBy="words"
  direction="top"
  delay={200}
/>`}
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Subtitle Effect
                </h3>
                <div className="min-h-32 flex items-center justify-center">
                  <BlurText
                    text="Building amazing experiences with blur animations"
                    animateBy="letters"
                    direction="bottom"
                    delay={30}
                    className="text-lg text-muted-foreground text-center"
                  />
                </div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  {`<BlurText 
  text="Building amazing experiences..."
  animateBy="letters"
  delay={30}
/>`}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Call to Action
                </h3>
                <div className="min-h-32 flex items-center justify-center">
                  <BlurText
                    text="Get Started Today! 🚀"
                    animateBy="words"
                    direction="top"
                    delay={150}
                    stepDuration={0.3}
                    className="text-2xl font-bold text-primary"
                  />
                </div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  {`<BlurText 
  text="Get Started Today! 🚀"
  animateBy="words"
  stepDuration={0.3}
/>`}
                </div>
              </div>
            </div>

            {/* Feature Highlight */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Feature Highlight
                </h3>
                <div className="min-h-32 flex items-center justify-center">
                  <BlurText
                    text="✨ Smooth • Fast • Beautiful ✨"
                    animateBy="letters"
                    direction="bottom"
                    delay={40}
                    className="text-xl font-medium text-pink-500"
                  />
                </div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  {`<BlurText 
  text="✨ Smooth • Fast • Beautiful ✨"
  animateBy="letters"
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
export function BlurTextTheme() {
  return (
    <BlurText
      text="Beautiful blur-in text animations"
      animateBy="words"
      direction="top"
      delay={300}
      autoPlay={true}
      stepDuration={0.5}
      className="text-foreground font-medium text-lg"
    />
  );
}
