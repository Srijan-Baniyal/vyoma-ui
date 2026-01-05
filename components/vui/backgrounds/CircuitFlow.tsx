"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile"; // Optional if you already have it

export default function CircuitFlow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [color, setColor] = useState<"blue" | "purple" | "cyan">("purple");
  const [isOpen, setIsOpen] = useState(false);
  const _isMobile = useIsMobile?.() ?? false;

  const colorMap = {
    blue: {
      primary: "#1e90ff",
      secondary: "#0d47a1",
      glow: "rgba(30, 144, 255, 0.5)",
    },
    purple: {
      primary: "#9d4edd",
      secondary: "#5a189a",
      glow: "rgba(157, 78, 221, 0.5)",
    },
    cyan: {
      primary: "#00ff88",
      secondary: "#00cc6a",
      glow: "rgba(0, 255, 136, 0.5)",
    },
  };

  const colors = colorMap[color];

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = svgRef.current;
    const lines = svg.querySelectorAll<SVGPathElement>(".circuit-line");
    const circles = svg.querySelectorAll<SVGCircleElement>(".circuit-node");

    const animateLine = (line: SVGPathElement, delay: number) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
      const keyframes = [
        { strokeDashoffset: length, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1 },
        { strokeDashoffset: 0, opacity: 0.3 },
      ];
      const timing: KeyframeAnimationOptions = {
        duration: 2000,
        delay,
        iterations: Number.POSITIVE_INFINITY,
      };
      line.animate(keyframes, timing);
    };

    const animateNode = (node: SVGCircleElement, delay: number) => {
      const keyframes = [
        { r: 3, opacity: 0 },
        { r: 5, opacity: 1 },
        { r: 3, opacity: 0.4 },
      ];
      const timing: KeyframeAnimationOptions = {
        duration: 2000,
        delay,
        iterations: Number.POSITIVE_INFINITY,
      };
      node.animate(keyframes, timing);
    };

    lines.forEach((line, i) => animateLine(line, i * 200));
    circles.forEach((circle, i) => animateNode(circle, i * 200));

    return () => {
      lines.forEach((line) => line.getAnimations().forEach((a) => a.cancel()));
      circles.forEach((circle) =>
        circle.getAnimations().forEach((a) => a.cancel())
      );
    };
  }, []);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
      {/* SVG Circuit Animation */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        ref={svgRef}
        viewBox="0 0 1200 800"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur result="coloredBlur" stdDeviation="2" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
            <stop offset="50%" stopColor={colors.primary} />
            <stop
              offset="100%"
              stopColor={colors.secondary}
              stopOpacity="0.3"
            />
          </linearGradient>
        </defs>

        {/* Horizontal Circuit Paths */}
        <path
          className="circuit-line"
          d="M 100 100 L 300 150 L 500 120 L 700 200 L 900 150 L 1100 250"
          fill="none"
          filter="url(#glow)"
          stroke="url(#lineGradient)"
          strokeWidth="2"
        />
        <path
          className="circuit-line"
          d="M 150 300 L 400 280 L 600 350 L 850 320 L 1050 400"
          fill="none"
          filter="url(#glow)"
          stroke="url(#lineGradient)"
          strokeWidth="2"
        />
        <path
          className="circuit-line"
          d="M 50 500 L 250 480 L 450 550 L 650 500 L 850 580 L 1100 550"
          fill="none"
          filter="url(#glow)"
          stroke="url(#lineGradient)"
          strokeWidth="2"
        />
        <path
          className="circuit-line"
          d="M 200 700 L 400 650 L 600 720 L 800 680 L 1000 750"
          fill="none"
          filter="url(#glow)"
          stroke="url(#lineGradient)"
          strokeWidth="2"
        />

        {/* Vertical Lines */}
        {[
          { x1: 300, y1: 150, x2: 300, y2: 400 },
          { x1: 600, y1: 120, x2: 600, y2: 300 },
          { x1: 850, y1: 200, x2: 850, y2: 500 },
        ].map((l, i) => (
          <line
            className="circuit-line"
            key={i}
            {...l}
            filter="url(#glow)"
            opacity="0.6"
            stroke={colors.primary}
            strokeWidth="1.5"
          />
        ))}

        {/* Nodes */}
        {[
          [100, 100],
          [300, 150],
          [500, 120],
          [700, 200],
          [900, 150],
          [1100, 250],
          [150, 300],
          [400, 280],
          [600, 350],
          [850, 320],
          [1050, 400],
          [50, 500],
          [250, 480],
          [450, 550],
          [650, 500],
          [850, 580],
          [1100, 550],
          [200, 700],
          [400, 650],
          [600, 720],
          [800, 680],
          [1000, 750],
        ].map(([cx, cy], i) => (
          <circle
            className="circuit-node"
            cx={cx}
            cy={cy}
            fill={colors.primary}
            filter="url(#glow)"
            key={i}
            r="4"
          />
        ))}
      </svg>

      {/* UI Overlay */}
      <div className="relative z-20 flex flex-col items-center space-y-10 px-4 text-center">
        <div>
          <h1 className="mb-3 font-bold text-5xl text-white drop-shadow-lg md:text-7xl">
            CIRCUIT
          </h1>
          <div
            className="mx-auto h-1 w-32"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
            }}
          />
        </div>

        {/* Theme Selector */}
        <div className="relative w-72">
          <button
            className="flex w-full items-center justify-between rounded-xl border-2 px-8 py-4 font-semibold text-sm uppercase tracking-widest transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.primary,
              color: "#000",
              boxShadow: isOpen
                ? `0 0 30px ${colors.primary}, 0 0 60px ${colors.primary}80`
                : `0 0 15px ${colors.primary}40`,
            }}
          >
            <span>Select a Theme</span>
            <svg
              className={`h-5 w-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border-2 bg-black shadow-2xl"
              style={{
                borderColor: colors.primary,
                boxShadow: `0 0 20px ${colors.primary}40`,
              }}
            >
              {(Object.keys(colorMap) as Array<keyof typeof colorMap>).map(
                (c) => (
                  <button
                    className={`flex w-full items-center justify-between px-8 py-4 text-left font-semibold text-sm uppercase tracking-wider transition-all duration-200 ${
                      color === c ? "bg-opacity-30" : "hover:bg-opacity-20"
                    }`}
                    key={c}
                    onClick={() => {
                      setColor(c);
                      setIsOpen(false);
                    }}
                    style={{
                      backgroundColor:
                        color === c ? colorMap[c].primary : "transparent",
                      color: color === c ? "#000" : colorMap[c].primary,
                      borderBottom: `1px solid ${colorMap[c].primary}40`,
                    }}
                  >
                    <span className="capitalize">{c}</span>
                    {color === c && <span>✓</span>}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Active Theme Display */}
        <p className="text-gray-400 text-sm uppercase tracking-widest">
          Active Theme:{" "}
          <span className="font-bold" style={{ color: colors.primary }}>
            {color}
          </span>
        </p>
      </div>
    </section>
  );
}
