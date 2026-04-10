"use client";

import {
  IconArrowRight as ArrowRight,
  IconCircleDot as CircleDot,
  IconGrid3x3 as Grid3x3,
  IconMessage as MessageSquare,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";

// Data model for featured items
interface FeaturedItem {
  accent: "purple" | "blue" | "amber";
  description: string;
  icon: React.ReactElement;
  name: string;
  route: string;
}

const items: FeaturedItem[] = [
  {
    name: "Magical Chat Input",
    description:
      "AI-powered chat interface with fluid cursor + micro-interactions. Perfect for conversational & assistant UIs.",
    icon: <MessageSquare className="h-8 w-8" />,
    route: "/ai-components/magical-chat-input",
    accent: "purple",
  },
  {
    name: "Bento Grid",
    description:
      "Apple-inspired responsive grid layout with elegant hover depth & adaptive sizing for rich showcases.",
    icon: <Grid3x3 className="h-8 w-8" />,
    route: "/components/bento-grid",
    accent: "blue",
  },
  {
    name: "Wheel Picker",
    description:
      "Physics‑based iOS style wheel for natural selection gestures with momentum & smooth scroll feel.",
    icon: <CircleDot className="h-8 w-8" />,
    route: "/components/wheel-picker",
    accent: "amber",
  },
  {
    name: "AI Chat",
    description:
      "Complete chat interface with OpenAI integration, real-time messaging & beautiful animations. Ready to use!",
    icon: <MessageSquare className="h-8 w-8" />,
    route: "/ai-components/ai-chat",
    accent: "blue",
  },
];

// Accent styling helpers centralised for consistency
const accentClasses: Record<
  FeaturedItem["accent"],
  { ring: string; bg: string; glow: string; text: string; grad: string }
> = {
  purple: {
    ring: "ring-purple-400/40",
    bg: "from-purple-600/20 to-violet-600/20",
    glow: "shadow-[0_0_0_1px_rgba(147,51,234,0.4)] shadow-purple-600/30",
    text: "text-purple-300",
    grad: "from-purple-500/30 via-violet-500/20 to-purple-600/30",
  },
  blue: {
    ring: "ring-sky-400/40",
    bg: "from-sky-600/20 to-cyan-600/20",
    glow: "shadow-[0_0_0_1px_rgba(2,132,199,0.4)] shadow-cyan-600/30",
    text: "text-sky-300",
    grad: "from-sky-500/30 via-cyan-500/20 to-sky-600/30",
  },
  amber: {
    ring: "ring-amber-400/40",
    bg: "from-amber-600/20 to-orange-600/20",
    glow: "shadow-[0_0_0_1px_rgba(217,119,6,0.4)] shadow-amber-600/30",
    text: "text-amber-300",
    grad: "from-amber-500/30 via-orange-500/20 to-amber-600/30",
  },
};

export default function FeaturedComponents() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative overflow-hidden bg-linear-to-b from-background via-background to-background/95 py-20 md:py-28"
    >
      {/* Ambient background: subtle grid + blurred gradient orbs (very low opacity for uniform dark theme) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size[42px_42px] opacity-10" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
          className="absolute -top-40 -left-32 h-130 w-130 rounded-full bg-linear-to-br from-purple-600/25 via-violet-700/10 to-transparent opacity-20 blur-3xl"
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.3, 0.18] }}
          className="absolute -right-32 -bottom-44 h-140 w-140 rounded-full bg-linear-to-tr from-sky-600/25 via-cyan-700/10 to-transparent opacity-20 blur-3xl"
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center md:mb-20">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 px-4 py-2 font-medium text-xs backdrop-blur-sm md:text-sm"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Curated Highlights
            </span>
          </motion.div>
          <motion.h2
            className="mt-6 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl"
            id="featured-heading"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Featured Components
            </span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed md:text-base"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Production‑ready, animated, and accessible building blocks to
            accelerate your UI development.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item, i) => {
            const accent = accentClasses[item.accent];
            return (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                key={item.name}
                onHoverEnd={() => setHoverIndex(null)}
                onHoverStart={() => setHoverIndex(i)}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Link
                  className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  href={item.route}
                >
                  <div
                    className={
                      "relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-border/40 md:p-7" +
                      " " +
                      accent.glow
                    }
                  >
                    {/* Localized soft gradient highlight */}
                    <motion.div
                      animate={{ opacity: hoverIndex === i ? 1 : 0 }}
                      aria-hidden="true"
                      className={`absolute inset-0 bg-linear-to-br ${accent.grad}`}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Subtle moving sheen */}
                    <motion.div
                      animate={{ x: hoverIndex === i ? "120%" : "-120%" }}
                      aria-hidden="true"
                      className="absolute inset-0 skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-120%" }}
                      transition={{
                        duration: 1.8,
                        ease: "easeInOut",
                        repeat: hoverIndex === i ? Number.POSITIVE_INFINITY : 0,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br ${accent.bg}`}
                    >
                      <motion.div
                        animate={{
                          scale: hoverIndex === i ? [1, 1.08, 1] : 1,
                          rotate: hoverIndex === i ? [0, -3, 3, -3, 0] : 0,
                        }}
                        aria-hidden="true"
                        className="text-white"
                        transition={{
                          duration: 1.6,
                          ease: "easeInOut",
                          repeat:
                            hoverIndex === i ? Number.POSITIVE_INFINITY : 0,
                        }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-semibold text-lg tracking-tight md:text-xl">
                      <span className="bg-linear-to-r from-white to-white/90 bg-clip-text text-black transition-colors duration-300 group-hover:from-primary group-hover:to-secondary dark:text-white">
                        {item.name}
                      </span>
                    </h3>

                    {/* Description */}
                    <p className="grow text-muted-foreground/90 text-xs leading-relaxed md:text-sm">
                      {item.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-5 flex items-center gap-2 font-medium text-xs">
                      <motion.span
                        animate={{ x: hoverIndex === i ? [0, 4, 0] : 0 }}
                        className={`${accent.text}`}
                        transition={{
                          duration: 1.4,
                          repeat:
                            hoverIndex === i ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
                      >
                        Explore
                      </motion.span>
                      <ArrowRight className={`h-4 w-4 ${accent.text}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all components CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Button
            asChild
            className="group relative overflow-hidden border-border/50 bg-card/40 px-8 py-5 font-semibold backdrop-blur-xl transition-colors hover:border-primary/40"
            size="lg"
            variant="outline"
          >
            <Link
              className="inline-flex items-center gap-2"
              href="/components/accordion"
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 skew-x-12 bg-linear-to-r from-transparent via-primary/10 to-transparent"
                initial={{ x: "-110%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                whileHover={{ x: "110%" }}
              />
              <span className="relative z-10">Explore All Components</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                aria-hidden="true"
                className="relative z-10"
                transition={{
                  duration: 1.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
