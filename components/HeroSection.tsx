"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [gridCells, setGridCells] = useState<boolean[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize grid cells (20x15 grid = 300 cells)
    const totalCells = 300;
    const cells = new Array(totalCells).fill(false);
    setGridCells(cells);

    // Start visibility animation
    setTimeout(() => setIsVisible(true), 500);

    // Progressive grid animation
    const animateGrid = () => {
      let filledCells = 0;
      const fillInterval = setInterval(() => {
        setGridCells((prev) => {
          const newCells = [...prev];

          // Fill cells in a wave pattern
          for (let i = 0; i < 3; i++) {
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * totalCells);
            } while (newCells[randomIndex]);

            newCells[randomIndex] = true;
            filledCells++;
          }

          if (filledCells >= totalCells * 0.6) {
            clearInterval(fillInterval);
          }

          return newCells;
        });
      }, 100);
    };

    const timer = setTimeout(animateGrid, 1000);
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
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm text-sm text-muted-foreground mb-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Introducing Vyoma UI v1.0
            </div>

            <h1
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent animate-pulse">
                TRULY BEYOND
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                UI DESIGN
              </span>
            </h1>

            <p
              className={`text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: "400ms" }}
            >
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
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "600ms" }}
          >
            <div className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <Layers className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Component Library</h3>
              <p className="text-sm text-muted-foreground">
                Rich collection of reusable components built with modern
                standards
              </p>
            </div>
            <div
              className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: "100ms" }}
            >
              <Zap className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for performance with minimal bundle size
              </p>
            </div>
            <div
              className="group p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: "200ms" }}
            >
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Design System</h3>
              <p className="text-sm text-muted-foreground">
                Consistent design language with thoughtful spacing and
                typography
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "800ms" }}
          >
            <Button
              size="lg"
              className="group px-8 py-6 text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/get-started/introduction">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/docs">View Components</Link>
            </Button>
          </div>

          {/* Stats with enhanced animation */}
          <div
            className={`flex justify-center items-center gap-16 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ animationDelay: "1000ms" }}
          >
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text ">
                10+
              </div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-secondary to-primary bg-clip-text ">
                100%
              </div>
              <div className="text-sm text-muted-foreground">TypeScript</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text  animate-pulse">
                ∞
              </div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
