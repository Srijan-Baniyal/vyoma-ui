"use client";

import { ArrowRight, Layers, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";
import { Pill } from "@/components/ui/pill";
import { CountUp } from "@/components/vui/text/CountUp";
import { getDynamicStats } from "@/lib/ComponentCounter";
import { version as vuiVersion } from "@/lib/version";

// Helper function to fill grid cells
function fillGridCells(
  prevCells: boolean[],
  cellsToFill: number,
  totalCells: number,
  filledCellsRef: { current: number }
): boolean[] {
  const newCells = [...prevCells];

  for (let i = 0; i < cellsToFill; i++) {
    let randomIndex = 0;
    let attempts = 0;

    do {
      randomIndex = Math.floor(Math.random() * totalCells);
      attempts++;
    } while (newCells[randomIndex] && attempts < 30);

    if (!newCells[randomIndex]) {
      newCells[randomIndex] = true;
      filledCellsRef.current++;
    }
  }

  return newCells;
}

export default function HeroSection() {
  const [gridCells, setGridCells] = useState<boolean[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Mobile-optimized grid: 12x10 = 120 cells, Desktop: 20x15 = 300 cells
    const totalCells = isMobile ? 120 : 300;
    const cells = new Array(totalCells).fill(false);
    setGridCells(cells);

    // Progressive grid animation with mobile optimization
    const animateGrid = () => {
      const filledCells = 0;
      // Mobile: lighter animation (50-55%), Desktop: (65-67%)
      const baseFillPercentage = isMobile ? 0.5 : 0.65;
      const variationRange = isMobile ? 0.05 : 0.02;
      const targetFillPercentage =
        baseFillPercentage + Math.random() * variationRange;
      const targetCells = Math.floor(totalCells * targetFillPercentage);

      // Mobile: slower interval for better performance
      const baseInterval = isMobile ? 120 : 64;
      const randomVariation = isMobile ? 60 : 32;
      const intervalTiming = baseInterval + Math.random() * randomVariation;

      const filledCellsRef = { current: filledCells };

      const fillInterval = setInterval(() => {
        setGridCells((prev) => {
          // Mobile: fewer cells per iteration for smoother animation
          const cellsToFill = isMobile ? 1 : 2 + Math.floor(Math.random() * 3);

          const newCells = fillGridCells(
            prev,
            cellsToFill,
            totalCells,
            filledCellsRef
          );

          if (filledCellsRef.current >= targetCells) {
            clearInterval(fillInterval);
          }

          return newCells;
        });
      }, intervalTiming);
    };

    // Mobile: quicker start, Desktop: varied delay
    const startDelay = isMobile ? 200 : 50 + Math.random() * 1000;
    const timer = setTimeout(animateGrid, startDelay);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-background via-background to-secondary/20 pt-20 md:pt-24">
      {/* Mobile-Optimized Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 md:opacity-30">
        <div
          className={`grid h-full w-full gap-1 p-2 md:p-4 ${
            isMobile ? "grid-cols-12" : "grid-cols-20"
          }`}
        >
          {gridCells.map((filled, index) => (
            <div
              className={`aspect-square rounded-sm transition-all ease-out ${
                isMobile ? "duration-700" : "duration-1000"
              } ${
                filled
                  ? "scale-100 bg-linear-to-br from-primary/40 to-secondary/40 shadow-lg"
                  : "scale-75 bg-transparent"
              }`}
              key={`grid-cell-${index}-${filled ? "filled" : "empty"}`}
              style={{
                animationDelay: `${index * (isMobile ? 15 : 20)}ms`,
                transitionDelay: `${index * (isMobile ? 8 : 10)}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Main Headline */}
          <div className="mb-8 space-y-6 md:mb-12 md:space-y-8">
            <Pill
              className="mb-6 bg-background/50 text-muted-foreground text-xs backdrop-blur-sm md:mb-8 md:text-sm"
              icon={<Sparkles className="h-3 w-3 md:h-4 md:w-4" />}
              status="active"
            >
              {`Introducing Vyoma UI v${vuiVersion}`}
            </Pill>

            <h1 className="px-2 font-black text-3xl leading-[0.9] tracking-tight sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                TRULY BEYOND
              </span>
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                UI DESIGN
              </span>
            </h1>

            <p className="mx-auto max-w-3xl px-4 text-base text-muted-foreground leading-relaxed sm:text-lg md:text-xl lg:text-2xl">
              A modern UI design system crafted with{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text font-semibold text-foreground">
                spatial wisdom
              </span>{" "}
              and{" "}
              <span className="bg-linear-to-r from-secondary to-primary bg-clip-text font-semibold text-foreground">
                thoughtful design
              </span>
              . Build beautiful interfaces that feel natural and intuitive.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:mb-16 md:grid-cols-3 md:gap-6">
            <div className="rounded-2xl border bg-card/50 p-4 backdrop-blur-sm md:p-6">
              <Layers className="mx-auto mb-3 h-6 w-6 text-primary md:mb-4 md:h-8 md:w-8" />
              <h3 className="mb-2 font-semibold text-sm md:text-base">
                Component Library
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Rich collection of reusable components built with modern
                standards
              </p>
            </div>
            <div className="rounded-2xl border bg-card/50 p-4 backdrop-blur-sm md:p-6">
              <Zap className="mx-auto mb-3 h-6 w-6 text-primary md:mb-4 md:h-8 md:w-8" />
              <h3 className="mb-2 font-semibold text-sm md:text-base">
                Lightning Fast
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Optimized for performance with minimal bundle size
              </p>
            </div>
            <div className="rounded-2xl border bg-card/50 p-4 backdrop-blur-sm sm:col-span-2 md:col-span-1 md:p-6">
              <Sparkles className="mx-auto mb-3 h-6 w-6 text-primary md:mb-4 md:h-8 md:w-8" />
              <h3 className="mb-2 font-semibold text-sm md:text-base">
                Design System
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Consistent design language with thoughtful spacing and
                typography
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row md:mb-20 md:gap-4">
            <Button
              asChild
              className="w-full px-6 py-4 font-semibold text-base sm:w-auto md:px-8 md:py-6 md:text-lg"
              size="lg"
            >
              <Link href="/get-started/introduction">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
            <Button
              asChild
              className="w-full px-6 py-4 font-semibold text-base backdrop-blur-sm sm:w-auto md:px-8 md:py-6 md:text-lg"
              size="lg"
              variant="outline"
            >
              <Link href="/components/accordion">View Components</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 px-4 text-center md:gap-16">
            <div>
              <div className="mb-1 bg-linear-to-r from-primary to-secondary bg-clip-text font-bold text-foreground text-xl sm:text-2xl md:text-3xl">
                <CountUp
                  delay={0.5}
                  duration={2.5}
                  effect="elastic"
                  hoverEffect
                  suffix="+"
                  to={getDynamicStats().totalComponents}
                />
              </div>
              <div className="text-muted-foreground text-xs md:text-sm">
                Components
              </div>
            </div>
            <div className="h-8 w-px bg-linear-to-b from-transparent via-border to-transparent md:h-12" />
            <div>
              <div className="mb-1 bg-linear-to-r from-secondary to-primary bg-clip-text font-bold text-foreground text-xl sm:text-2xl md:text-3xl">
                <CountUp
                  colorTransition
                  delay={1}
                  duration={3}
                  effect="bounce"
                  hoverEffect
                  suffix="%"
                  to={100}
                />
              </div>
              <div className="text-muted-foreground text-xs md:text-sm">
                TypeScript
              </div>
            </div>
            <div className="h-8 w-px bg-linear-to-b from-transparent via-border to-transparent md:h-12" />
            <div>
              <div className="mb-1 bg-linear-to-r from-primary to-secondary bg-clip-text font-bold text-foreground text-xl sm:text-2xl md:text-3xl">
                <CountUp
                  delay={1.5}
                  duration={2}
                  format="compact"
                  hoverEffect
                  renderValue={() => (
                    <span className="bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                      ∞
                    </span>
                  )}
                  to={999}
                />
              </div>
              <div className="text-muted-foreground text-xs md:text-sm">
                Possibilities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
