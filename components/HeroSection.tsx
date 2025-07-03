"use client";

import { Button } from "@/components/ui/buttonShadcn";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Pill } from "@/components/ui/pill";
import { CountUp } from "@/components/vui/text/CountUp";

export default function HeroSection() {
  const [gridCells, setGridCells] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize grid cells (20x15 grid = 300 cells)
    const totalCells = 900;
    const cells = new Array(totalCells).fill(false);
    setGridCells(cells);

    // Progressive grid animation with random patterns
    const animateGrid = () => {
      let filledCells = 0;
      // Random fill percentage between 65-67% (increased from 60%)
      const targetFillPercentage = 0.65 + Math.random() * 0.02;
      const targetCells = Math.floor(totalCells * targetFillPercentage);

      // Random interval timing for more variation (20% faster)
      const baseInterval = 64 + Math.random() * 32; // 64-96ms

      const fillInterval = setInterval(() => {
        setGridCells((prev) => {
          const newCells = [...prev];

          // Variable number of cells to fill per iteration (2-4 cells)
          const cellsToFill = 2 + Math.floor(Math.random() * 3);

          for (let i = 0; i < cellsToFill; i++) {
            let randomIndex;
            let attempts = 0;

            // Try to find an empty cell, with fallback to prevent infinite loops
            do {
              randomIndex = Math.floor(Math.random() * totalCells);
              attempts++;
            } while (newCells[randomIndex] && attempts < 50);

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
      }, baseInterval);
    };

    // Random delay before starting animation (500-1500ms)
    const startDelay = 50 + Math.random() * 1000;
    const timer = setTimeout(animateGrid, startDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="grid grid-cols-20 gap-1 w-full h-full p-4">
          {gridCells.map((filled, index) => (
            <div
              key={index}
              className={`aspect-square rounded-sm transition-all duration-1000 ease-out ${
                filled
                  ? "bg-gradient-to-br from-primary/40 to-secondary/40 shadow-lg scale-100"
                  : "bg-transparent scale-75"
              }`}
              style={{
                animationDelay: `${index * 20}ms`,
                transitionDelay: `${index * 10}ms`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="space-y-8 mb-12">
            <Pill
              icon={<Sparkles className="w-4 h-4" />}
              status="active"
              className="mb-8 bg-background/50 backdrop-blur-sm text-sm text-muted-foreground"
            >
              Introducing Vyoma UI v1.0
            </Pill>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                TRULY BEYOND
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                UI DESIGN
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Layers className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Component Library</h3>
              <p className="text-sm text-muted-foreground">
                Rich collection of reusable components built with modern
                standards
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for performance with minimal bundle size
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Design System</h3>
              <p className="text-sm text-muted-foreground">
                Consistent design language with thoughtful spacing and
                typography
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link href="/get-started/introduction">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              asChild
            >
              <Link href="/components/accordion">View Components</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center gap-16 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text">
                <CountUp
                  to={10}
                  suffix="+"
                  duration={2.5}
                  delay={0.5}
                  effect="elastic"
                  hoverEffect
                />
              </div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-secondary to-primary bg-clip-text">
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
              <div className="text-sm text-muted-foreground">TypeScript</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text">
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
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
