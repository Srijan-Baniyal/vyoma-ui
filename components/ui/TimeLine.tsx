"use client";

import {
  IconArrowRight as ArrowRight,
  IconCalendar as Calendar,
  IconCircleCheck as CheckCircle,
  IconClock as Clock,
  IconSparkles as Sparkles,
  IconTag as Tag,
} from "@tabler/icons-react";
import { motion, useInView } from "motion/react";
import type React from "react";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

interface TimelineEntry {
  color?: string;
  content: React.ReactNode;
  date?: string;
  icon?: React.ReactNode;
  tag?: string;
  title: string;
}

interface TimelineProps {
  data: TimelineEntry[];
  subtitle?: string;
  title?: string;
}

const TimelineItem = ({
  item,
  index,
  isLast,
}: {
  item: TimelineEntry;
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorSchemes = {
    purple: {
      gradient: "from-purple-500/5 via-transparent to-purple-500/5",
      topBorder: "from-purple-500/50 to-purple-500/50",
      iconBg: "from-purple-500/20 to-purple-500/10",
      iconBorder: "border-purple-500/20",
      iconText: "text-purple-600",
      tagBg: "from-purple-500 to-purple-600",
      hoverGlow: "group-hover:shadow-purple-500/25",
      decorative1: "from-purple-400/20 to-purple-500/10",
      decorative2: "from-purple-300/15 to-purple-400/5",
    },
    blue: {
      gradient: "from-blue-500/5 via-transparent to-blue-500/5",
      topBorder: "from-blue-500/50 to-blue-500/50",
      iconBg: "from-blue-500/20 to-blue-500/10",
      iconBorder: "border-blue-500/20",
      iconText: "text-blue-600",
      tagBg: "from-blue-500 to-blue-600",
      hoverGlow: "group-hover:shadow-blue-500/25",
      decorative1: "from-blue-400/20 to-blue-500/10",
      decorative2: "from-blue-300/15 to-blue-400/5",
    },
    green: {
      gradient: "from-green-500/5 via-transparent to-green-500/5",
      topBorder: "from-green-500/50 to-green-500/50",
      iconBg: "from-green-500/20 to-green-500/10",
      iconBorder: "border-green-500/20",
      iconText: "text-green-600",
      tagBg: "from-green-500 to-green-600",
      hoverGlow: "group-hover:shadow-green-500/25",
      decorative1: "from-green-400/20 to-green-500/10",
      decorative2: "from-green-300/15 to-green-400/5",
    },
    orange: {
      gradient: "from-orange-500/5 via-transparent to-orange-500/5",
      topBorder: "from-orange-500/50 to-orange-500/50",
      iconBg: "from-orange-500/20 to-orange-500/10",
      iconBorder: "border-orange-500/20",
      iconText: "text-orange-600",
      tagBg: "from-orange-500 to-orange-600",
      hoverGlow: "group-hover:shadow-orange-500/25",
      decorative1: "from-orange-400/20 to-orange-500/10",
      decorative2: "from-orange-300/15 to-orange-400/5",
    },
    pink: {
      gradient: "from-pink-500/5 via-transparent to-pink-500/5",
      topBorder: "from-pink-500/50 to-pink-500/50",
      iconBg: "from-pink-500/20 to-pink-500/10",
      iconBorder: "border-pink-500/20",
      iconText: "text-pink-600",
      tagBg: "from-pink-500 to-pink-600",
      hoverGlow: "group-hover:shadow-pink-500/25",
      decorative1: "from-pink-400/20 to-pink-500/10",
      decorative2: "from-pink-300/15 to-pink-400/5",
    },
    red: {
      gradient: "from-red-500/5 via-transparent to-red-500/5",
      topBorder: "from-red-500/50 to-red-500/50",
      iconBg: "from-red-500/20 to-red-500/10",
      iconBorder: "border-red-500/20",
      iconText: "text-red-600",
      tagBg: "from-red-500 to-red-600",
      hoverGlow: "group-hover:shadow-red-500/25",
      decorative1: "from-red-400/20 to-red-500/10",
      decorative2: "from-red-300/15 to-red-400/5",
    },
  };

  const selectedScheme =
    item.color && colorSchemes[item.color as keyof typeof colorSchemes]
      ? colorSchemes[item.color as keyof typeof colorSchemes]
      : colorSchemes.purple;

  return (
    <motion.div
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.95 }
      }
      className="group relative flex items-start"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      ref={ref}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.25, 0, 1],
      }}
    >
      {/* Enhanced Connector Line */}
      {!isLast && (
        <motion.div
          animate={isInView ? { height: "100%" } : { height: 0 }}
          className="absolute top-20 left-8 w-0.5 bg-gradient-to-b from-border via-border/50 to-transparent"
          initial={{ height: 0 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
        />
      )}

      {/* Enhanced Timeline Node */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        whileHover={{ scale: 1.15, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${selectedScheme.iconBg} ${selectedScheme.iconBorder} flex items-center justify-center border shadow-lg transition-all duration-500 ${selectedScheme.hoverGlow} group-hover:border-opacity-50 group-hover:shadow-2xl`}
        >
          {item.icon ? (
            <motion.div
              className={`${selectedScheme.iconText} text-xl`}
              transition={{ type: "spring", stiffness: 400 }}
              whileHover={{ scale: 1.1 }}
            >
              {item.icon}
            </motion.div>
          ) : (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              className={`h-3 w-3 ${selectedScheme.iconText} rounded-full`}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        {/* Pulse Animation */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0, 0.3, 0],
          }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${selectedScheme.iconBg} -z-10`}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />
      </motion.div>

      {/* Enhanced Content Card */}
      <motion.div
        className="mb-16 ml-8 flex-1"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        whileHover={{
          y: -8,
          boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card
          className={`relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl transition-all duration-700 group-hover:shadow-3xl ${selectedScheme.hoverGlow}`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${selectedScheme.gradient}`}
          />
          <div
            className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${selectedScheme.topBorder}`}
          />

          {/* Decorative Elements */}
          <div
            className={`absolute top-6 right-6 h-24 w-24 bg-gradient-to-br ${selectedScheme.decorative1} rounded-full opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-70`}
          />
          <div
            className={`absolute bottom-6 left-6 h-20 w-20 bg-gradient-to-br ${selectedScheme.decorative2} rounded-full opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
          />

          <div className="relative p-8 md:p-10">
            {/* Enhanced Header */}
            <div className="mb-8 flex flex-col justify-between lg:flex-row lg:items-start">
              <div className="flex-1">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <motion.h3
                    className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text font-black text-2xl text-transparent md:text-3xl lg:text-4xl"
                    transition={{ type: "spring", stiffness: 400 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.title}
                  </motion.h3>
                  {item.tag && (
                    <motion.span
                      animate={{ scale: 1, rotate: 0 }}
                      className={`rounded-full bg-gradient-to-r px-4 py-2 font-bold text-sm ${selectedScheme.tagBg} flex items-center gap-2 self-start text-white shadow-lg`}
                      initial={{ scale: 0, rotate: -10 }}
                      transition={{
                        delay: index * 0.15 + 0.6,
                        type: "spring",
                        stiffness: 300,
                      }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <Tag className="h-3 w-3" />
                      {item.tag}
                    </motion.span>
                  )}
                </div>
                {item.date && (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-3 rounded-xl border border-border/50 bg-muted/50 px-4 py-2 font-semibold text-muted-foreground text-sm backdrop-blur-sm transition-colors duration-300 hover:border-border"
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    <Calendar className="h-4 w-4" />
                    {item.date}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Enhanced Content */}
            <motion.div
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="relative z-10 text-base text-muted-foreground leading-relaxed md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.15 + 0.7, duration: 0.8 }}
            >
              {item.content}
            </motion.div>

            {/* Hover Arrow Indicator */}
            <motion.div
              className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              <div
                className={`h-10 w-10 rounded-full bg-gradient-to-br ${selectedScheme.iconBg} ${selectedScheme.iconBorder} flex items-center justify-center border shadow-lg`}
              >
                <ArrowRight className={`h-4 w-4 ${selectedScheme.iconText}`} />
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export const Timeline = ({
  data,
  title = "Timeline of Innovation",
  subtitle = "A journey through remarkable milestones and achievements",
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      ref={containerRef}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          className="absolute top-3/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          className="absolute top-1/2 right-1/3 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl"
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </div>

      {/* Enhanced Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-20 px-6 py-20">
        {/* Enhanced Header */}
        <div className="space-y-8 text-center">
          <motion.div
            animate={
              isTitleInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 40, scale: 0.95 }
            }
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            ref={titleRef}
            transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
          >
            <motion.div
              transition={{ type: "spring", stiffness: 400 }}
              whileHover={{ scale: 1.05 }}
            >
              <Pill
                className="mb-10"
                icon={<Clock className="h-5 w-5" />}
                status="active"
              >
                Timeline Journey
              </Pill>
            </motion.div>

            <motion.h1
              className="mb-8 font-black text-5xl tracking-tight md:text-7xl lg:text-8xl"
              transition={{ type: "spring", stiffness: 400 }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                {title.split(" ").slice(0, -1).join(" ")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                {title.split(" ").at(-1)}
              </span>
            </motion.h1>

            <motion.p
              animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
              className="mx-auto max-w-4xl text-muted-foreground text-xl leading-relaxed md:text-2xl"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>

            {/* Decorative line with animation */}
            <motion.div
              animate={
                isTitleInView
                  ? { width: "120px", opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              className="mx-auto mt-10 h-1.5 rounded-full bg-gradient-to-r from-primary via-primary to-primary/60"
              initial={{ width: 0, opacity: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            />
          </motion.div>
        </div>

        {/* Enhanced Timeline Container */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          ref={ref}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/60 to-secondary/60" />

            {/* Enhanced decorative elements */}
            <div className="absolute top-8 right-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 opacity-60 blur-3xl" />
            <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full bg-gradient-to-br from-secondary/10 to-primary/5 opacity-50 blur-2xl" />

            <div className="relative p-10 md:p-16">
              <div className="space-y-0">
                {data.map((item, index) => (
                  <TimelineItem
                    index={index}
                    isLast={index === data.length - 1}
                    item={item}
                    key={`${item.title}-${item.date || index}`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Enhanced Completion Badge */}
          <motion.div
            className="mt-20 flex justify-center"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              type: "spring",
              stiffness: 300,
            }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
          >
            <Card className="group relative overflow-hidden border-0 bg-card/90 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500" />

              <div className="relative p-8">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/20 to-emerald-500/10 shadow-lg"
                    transition={{ type: "spring", stiffness: 400 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center gap-3 font-bold text-xl">
                      <Sparkles className="h-6 w-6 text-primary" />
                      Journey Continues...
                    </h3>
                    <p className="text-muted-foreground">
                      More incredible milestones await on the horizon
                    </p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    className="opacity-50"
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-6 w-6 text-green-600" />
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
