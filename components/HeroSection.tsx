"use client";

import { Button } from "@/components/ui/buttonShadcn";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Pill } from "@/components/ui/pill";
import { CountUp } from "@/components/vui/text/CountUp";
import { getDynamicStats } from "@/lib/ComponentCounter";

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
      let filledCells = 0;
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

      const fillInterval = setInterval(() => {
        setGridCells((prev) => {
          const newCells = [...prev];

          // Mobile: fewer cells per iteration for smoother animation
          const cellsToFill = isMobile ? 1 : 2 + Math.floor(Math.random() * 3);

          for (let i = 0; i < cellsToFill; i++) {
            let randomIndex;
            let attempts = 0;

            do {
              randomIndex = Math.floor(Math.random() * totalCells);
              attempts++;
            } while (newCells[randomIndex] && attempts < 30);

            if (!newCells[randomIndex]) {
              newCells[randomIndex] = true;
              filledCells++;
            }
          }

          if (filledCells >= targetCells) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Mobile-Optimized Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 md:opacity-30">
        <div
          className={`grid gap-1 w-full h-full p-2 md:p-4 ${
            isMobile ? "grid-cols-12" : "grid-cols-20"
          }`}
        >
          {gridCells.map((filled, index) => (
            <div
              key={index}
              className={`aspect-square rounded-sm transition-all ease-out ${
                isMobile ? "duration-700" : "duration-1000"
              } ${
                filled
                  ? "bg-gradient-to-br from-primary/40 to-secondary/40 shadow-lg scale-100"
                  : "bg-transparent scale-75"
              }`}
              style={{
                animationDelay: `${index * (isMobile ? 15 : 20)}ms`,
                transitionDelay: `${index * (isMobile ? 8 : 10)}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
            <Pill
              icon={<Sparkles className="w-3 h-3 md:w-4 md:h-4" />}
              status="active"
              className="mb-6 md:mb-8 bg-background/50 backdrop-blur-sm text-xs md:text-sm text-muted-foreground"
            >
              Introducing Vyoma UI v1.0
            </Pill>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] px-2">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                TRULY BEYOND
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                UI DESIGN
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              A modern UI design system crafted with{" "}
              <span className="text-foreground font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text">
                spatial wisdom
              </span>{" "}
              and{" "}
              <span className="text-foreground font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text ">
                thoughtful design
              </span>
              . Build beautiful interfaces that feel natural and intuitive.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 max-w-4xl mx-auto px-4">
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Layers className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-3 md:mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Component Library
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Rich collection of reusable components built with modern
                standards
              </p>
            </div>
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-3 md:mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Lightning Fast
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Optimized for performance with minimal bundle size
              </p>
            </div>
            <div className="p-4 md:p-6 rounded-2xl border bg-card/50 backdrop-blur-sm sm:col-span-2 md:col-span-1">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-3 md:mb-4" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Design System
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Consistent design language with thoughtful spacing and
                typography
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-12 md:mb-20 px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold"
              asChild
            >
              <Link href="/get-started/introduction">
                Get Started
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-sm"
              asChild
            >
              <Link href="/components/accordion">View Components</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 md:gap-16 text-center px-4">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text">
                <CountUp
                  to={getDynamicStats().totalComponents}
                  suffix="+"
                  duration={2.5}
                  delay={0.5}
                  effect="elastic"
                  hoverEffect
                />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Components
              </div>
            </div>
            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-secondary to-primary bg-clip-text">
                <CountUp
                  to={100}
                  suffix="%"
                  duration={3}
                  delay={1}
                  effect="bounce"
                  colorTransition
                  hoverEffect
                />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                TypeScript
              </div>
            </div>
            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text">
                <CountUp
                  to={999}
                  format="compact"
                  duration={2}
                  delay={1.5}
                  hoverEffect
                  renderValue={() => (
                    <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                      ∞
                    </span>
                  )}
                />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Possibilities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
