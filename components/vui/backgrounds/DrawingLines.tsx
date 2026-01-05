"use client";

import { useEffect, useState } from "react";

export default function DrawingLinesShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Horizontal lines animating from left and right */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            className="absolute h-px bg-gray-600 opacity-40"
            key={`h-${i}`}
            style={{
              top: `${i * 40}px`,
              left: 0,
              right: 0,
              transformOrigin: i % 2 === 0 ? "left" : "right",
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
              transition: `transform ${1.8 + Math.sin(i * 0.1) * 0.3}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.04 + Math.random() * 0.02}s`,
            }}
          />
        ))}
      </div>

      {/* Vertical lines animating from top and bottom */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            className="absolute w-px bg-gray-600 opacity-40"
            key={`v-${i}`}
            style={{
              left: `${i * 40}px`,
              top: 0,
              bottom: 0,
              transformOrigin: i % 2 === 0 ? "top" : "bottom",
              transform: isVisible ? "scaleY(1)" : "scaleY(0)",
              transition: `transform ${1.6 + Math.sin(i * 0.15) * 0.4}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.025 + Math.random() * 0.015}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
        <div
          className={`text-center transition-all delay-1000 duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="mb-6 font-bold font-sans text-4xl text-white md:text-6xl">
            Grid Generation
          </h1>
          <p className="mb-8 max-w-2xl text-gray-300 text-lg leading-relaxed md:text-xl">
            Watch as each line draws itself into existence, creating a living
            grid that emerges from multiple directions in perfect harmony.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors duration-200 hover:bg-gray-200">
              Get Started
            </button>
            <button className="rounded-lg border border-gray-600 px-8 py-3 font-medium text-white transition-colors duration-200 hover:border-gray-400">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
