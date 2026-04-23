"use client";

import {
  type Easing as FramerEasing,
  motion,
  type Transition,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  animateBy?: "words" | "letters";
  animationFrom?: Record<string, string | number>;
  animationTo?: Record<string, string | number>[];
  autoPlay?: boolean;
  className?: string;
  delay?: number;
  direction?: "top" | "bottom";
  easing?: FramerEasing | FramerEasing[];
  onAnimationComplete?: () => void;
  rootMargin?: string;
  stepDuration?: number;
  text?: string;
  threshold?: number;
}

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Record<string, string | number>[]
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  for (const k of keys) {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  }
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
    if (!(ref.current && mounted) || autoPlay) {
      return;
    }
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
  const segmentOccurrences = new Map<string, number>();

  return (
    <p className={cn("flex flex-wrap blur-text", className)} ref={ref}>
      {mounted ? (
        elements.map((segment, index) => {
          const occurrence = (segmentOccurrences.get(segment) ?? 0) + 1;
          segmentOccurrences.set(segment, occurrence);
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

          const spanTransition: Transition = {
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing,
          };

          return (
            <motion.span
              animate={inView ? animateKeyframes : fromSnapshot}
              initial={fromSnapshot}
              key={`${segment}-${occurrence}-${text}`}
              onAnimationComplete={
                index === elements.length - 1 ? onAnimationComplete : undefined
              }
              style={{
                display: "inline-block",
                willChange: "transform, filter, opacity",
              }}
              transition={spanTransition}
            >
              {segment === " " ? "\u00A0" : segment}
              {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
            </motion.span>
          );
        })
      ) : (
        // Show plain text on server to prevent hydration issues
        <span className="opacity-100">{text}</span>
      )}
    </p>
  );
};

export default BlurText;

// Showcase Component
export function BlurTextShowcase() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background p-8">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="relative rounded-3xl border border-border/50 bg-card/50 p-12 shadow-2xl backdrop-blur-sm">
            <BlurText
              animateBy="words"
              autoPlay={true}
              className="font-bold text-4xl text-primary md:text-5xl"
              delay={350}
              direction="top"
              stepDuration={0.6}
              text="Beautiful Blur Animations"
            />
          </div>
        </section>

        {/* Animation Direction */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Animation Directions
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* From Top */}
            <div className="group rounded-2xl border border-blue-200/50 bg-linear-to-br from-blue-50/50 to-blue-100/30 p-8 transition-all duration-300 hover:shadow-lg dark:border-blue-800/30 dark:from-blue-950/30 dark:to-blue-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-blue-700 text-lg dark:text-blue-300">
                    From Top
                  </h3>
                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-700 text-xs dark:bg-blue-900 dark:text-blue-300">
                    ↓
                  </span>
                </div>
                <div className="flex min-h-24 items-center justify-center">
                  <BlurText
                    className="font-semibold text-2xl text-blue-600 dark:text-blue-400"
                    delay={250}
                    direction="top"
                    stepDuration={0.5}
                    text="Descending from above"
                  />
                </div>
                <p className="text-blue-600 text-sm dark:text-blue-400">
                  Text blurs in from the top downwards
                </p>
              </div>
            </div>

            {/* From Bottom */}
            <div className="group rounded-2xl border border-purple-200/50 bg-linear-to-br from-purple-50/50 to-violet-100/30 p-8 transition-all duration-300 hover:shadow-lg dark:border-purple-800/30 dark:from-purple-950/30 dark:to-violet-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">
                    From Bottom
                  </h3>
                  <span className="rounded bg-purple-100 px-2 py-1 text-purple-700 text-xs dark:bg-purple-900 dark:text-purple-300">
                    ↑
                  </span>
                </div>
                <div className="flex min-h-24 items-center justify-center">
                  <BlurText
                    className="font-semibold text-2xl text-purple-600 dark:text-purple-400"
                    delay={250}
                    direction="bottom"
                    stepDuration={0.5}
                    text="Rising from below"
                  />
                </div>
                <p className="text-purple-600 text-sm dark:text-purple-400">
                  Text blurs in from the bottom upwards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Animation Modes */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Animation Modes
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* By Words */}
            <div className="rounded-2xl border border-green-200/50 bg-linear-to-br from-green-50/50 to-emerald-100/30 p-8 dark:border-green-800/30 dark:from-green-950/30 dark:to-emerald-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-700 text-lg dark:text-green-300">
                    Word by Word
                  </h3>
                  <span className="rounded bg-green-100 px-2 py-1 text-green-700 text-xs dark:bg-green-900 dark:text-green-300">
                    WORDS
                  </span>
                </div>
                <div className="flex min-h-24 items-center justify-center">
                  <BlurText
                    animateBy="words"
                    className="font-semibold text-2xl text-green-600 dark:text-green-400"
                    delay={300}
                    stepDuration={0.5}
                    text="Each word appears sequentially"
                  />
                </div>
                <p className="text-green-600 text-sm dark:text-green-400">
                  Animates one word at a time
                </p>
              </div>
            </div>

            {/* By Letters */}
            <div className="rounded-2xl border border-orange-200/50 bg-linear-to-br from-orange-50/50 to-amber-100/30 p-8 dark:border-orange-800/30 dark:from-orange-950/30 dark:to-amber-900/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-orange-700 dark:text-orange-300">
                    Letter by Letter
                  </h3>
                  <span className="rounded bg-orange-100 px-2 py-1 text-orange-700 text-xs dark:bg-orange-900 dark:text-orange-300">
                    LETTERS
                  </span>
                </div>
                <div className="flex min-h-24 items-center justify-center">
                  <BlurText
                    animateBy="letters"
                    className="font-semibold text-2xl text-orange-600 dark:text-orange-400"
                    delay={50}
                    text="Character by character"
                  />
                </div>
                <p className="text-orange-600 text-sm dark:text-orange-400">
                  Animates one letter at a time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Speed Variations */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Speed Variations
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Fast */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Fast</h3>
                <div className="flex min-h-20 items-center justify-center">
                  <BlurText
                    className="font-semibold text-red-500 text-xl"
                    delay={50}
                    stepDuration={0.2}
                    text="Quick and snappy!"
                  />
                </div>
                <div className="rounded bg-muted p-2 font-mono text-muted-foreground text-sm">
                  delay: 50ms
                </div>
              </div>
            </div>

            {/* Medium */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">
                  Medium
                </h3>
                <div className="flex min-h-20 items-center justify-center">
                  <BlurText
                    className="font-semibold text-xl text-yellow-500"
                    delay={150}
                    stepDuration={0.35}
                    text="Balanced timing"
                  />
                </div>
                <div className="rounded bg-muted p-2 font-mono text-muted-foreground text-sm">
                  delay: 150ms
                </div>
              </div>
            </div>

            {/* Slow */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Slow</h3>
                <div className="flex min-h-20 items-center justify-center">
                  <BlurText
                    className="font-semibold text-cyan-500 text-xl"
                    delay={300}
                    stepDuration={0.5}
                    text="Smooth elegance"
                  />
                </div>
                <div className="rounded bg-muted p-2 font-mono text-muted-foreground text-sm">
                  delay: 300ms
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-8">
          <h2 className="text-center font-bold text-3xl text-foreground">
            Real-World Examples
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Hero Title */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">
                  Hero Title
                </h3>
                <div className="flex min-h-32 items-center justify-center">
                  <BlurText
                    animateBy="words"
                    className="font-bold text-3xl text-foreground"
                    delay={300}
                    direction="top"
                    stepDuration={0.5}
                    text="Welcome to the Future"
                  />
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
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
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">
                  Subtitle Effect
                </h3>
                <div className="flex min-h-32 items-center justify-center">
                  <BlurText
                    animateBy="letters"
                    className="text-center text-lg text-muted-foreground"
                    delay={30}
                    direction="bottom"
                    text="Building amazing experiences with blur animations"
                  />
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
                  {`<BlurText
  text="Building amazing experiences..."
  animateBy="letters"
  delay={30}
/>`}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">
                  Call to Action
                </h3>
                <div className="flex min-h-32 items-center justify-center">
                  <BlurText
                    animateBy="words"
                    className="font-bold text-2xl text-primary"
                    delay={150}
                    direction="top"
                    stepDuration={0.3}
                    text="Get Started Today! 🚀"
                  />
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
                  {`<BlurText
  text="Get Started Today! 🚀"
  animateBy="words"
  stepDuration={0.3}
/>`}
                </div>
              </div>
            </div>

            {/* Feature Highlight */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">
                  Feature Highlight
                </h3>
                <div className="flex min-h-32 items-center justify-center">
                  <BlurText
                    animateBy="letters"
                    className="font-medium text-pink-500 text-xl"
                    delay={40}
                    direction="bottom"
                    text="✨ Smooth • Fast • Beautiful ✨"
                  />
                </div>
                <div className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
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
      animateBy="words"
      autoPlay={true}
      className="font-medium text-foreground text-lg"
      delay={300}
      direction="top"
      stepDuration={0.5}
      text="Beautiful blur-in text animations"
    />
  );
}
