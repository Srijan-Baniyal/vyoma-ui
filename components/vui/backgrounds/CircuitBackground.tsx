"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile"; // Optional if you already have it

export default function CircuitBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [color, setColor] = useState<"blue" | "purple" | "cyan">("purple");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile?.() ?? false;

  const colorMap = {
    blue: { primary: "#1e90ff", secondary: "#0d47a1", glow: "rgba(30, 144, 255, 0.5)" },
    purple: { primary: "#9d4edd", secondary: "#5a189a", glow: "rgba(157, 78, 221, 0.5)" },
    cyan: { primary: "#00ff88", secondary: "#00cc6a", glow: "rgba(0, 255, 136, 0.5)" },
  };

  const colors = colorMap[color];

  useEffect(() => {
    if (!svgRef.current) return;

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
      const timing: KeyframeAnimationOptions = { duration: 2000, delay, iterations: Infinity };
      line.animate(keyframes, timing);
    };

    const animateNode = (node: SVGCircleElement, delay: number) => {
      const keyframes = [
        { r: 3, opacity: 0 },
        { r: 5, opacity: 1 },
        { r: 3, opacity: 0.4 },
      ];
      const timing: KeyframeAnimationOptions = { duration: 2000, delay, iterations: Infinity };
      node.animate(keyframes, timing);
    };

    lines.forEach((line, i) => animateLine(line, i * 200));
    circles.forEach((circle, i) => animateNode(circle, i * 200));

    return () => {
      lines.forEach((line) => line.getAnimations().forEach((a) => a.cancel()));
      circles.forEach((circle) => circle.getAnimations().forEach((a) => a.cancel()));
    };
  }, [color]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* SVG Circuit Animation */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
            <stop offset="50%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Horizontal Circuit Paths */}
        <path
          className="circuit-line"
          d="M 100 100 L 300 150 L 500 120 L 700 200 L 900 150 L 1100 250"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
        />
        <path
          className="circuit-line"
          d="M 150 300 L 400 280 L 600 350 L 850 320 L 1050 400"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
        />
        <path
          className="circuit-line"
          d="M 50 500 L 250 480 L 450 550 L 650 500 L 850 580 L 1100 550"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
        />
        <path
          className="circuit-line"
          d="M 200 700 L 400 650 L 600 720 L 800 680 L 1000 750"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
        />

        {/* Vertical Lines */}
        {[
          { x1: 300, y1: 150, x2: 300, y2: 400 },
          { x1: 600, y1: 120, x2: 600, y2: 300 },
          { x1: 850, y1: 200, x2: 850, y2: 500 },
        ].map((l, i) => (
          <line
            key={i}
            className="circuit-line"
            {...l}
            stroke={colors.primary}
            strokeWidth="1.5"
            opacity="0.6"
            filter="url(#glow)"
          />
        ))}

        {/* Nodes */}
        {[
          [100, 100], [300, 150], [500, 120], [700, 200], [900, 150], [1100, 250],
          [150, 300], [400, 280], [600, 350], [850, 320], [1050, 400],
          [50, 500], [250, 480], [450, 550], [650, 500], [850, 580], [1100, 550],
          [200, 700], [400, 650], [600, 720], [800, 680], [1000, 750],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            className="circuit-node"
            cx={cx}
            cy={cy}
            r="4"
            fill={colors.primary}
            filter="url(#glow)"
          />
        ))}
      </svg>

      {/* UI Overlay */}
      <div className="relative z-20 text-center flex flex-col items-center space-y-10 px-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-3">
            CIRCUIT
          </h1>
          <div
            className="h-1 w-32 mx-auto"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
            }}
          ></div>
        </div>

        {/* Theme Selector */}
        <div className="relative w-72">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 uppercase text-sm tracking-widest flex items-center justify-between border-2"
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
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {isOpen && (
            <div
              className="absolute top-full mt-2 w-full bg-black border-2 rounded-xl overflow-hidden shadow-2xl z-50"
              style={{
                borderColor: colors.primary,
                boxShadow: `0 0 20px ${colors.primary}40`,
              }}
            >
              {(Object.keys(colorMap) as Array<keyof typeof colorMap>).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    setIsOpen(false);
                  }}
                  className={`w-full px-8 py-4 text-left font-semibold uppercase text-sm tracking-wider transition-all duration-200 flex items-center justify-between ${
                    color === c ? "bg-opacity-30" : "hover:bg-opacity-20"
                  }`}
                  style={{
                    backgroundColor: color === c ? colorMap[c].primary : "transparent",
                    color: color === c ? "#000" : colorMap[c].primary,
                    borderBottom: `1px solid ${colorMap[c].primary}40`,
                  }}
                >
                  <span className="capitalize">{c}</span>
                  {color === c && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Theme Display */}
        <p className="text-sm text-gray-400 uppercase tracking-widest">
          Active Theme:{" "}
          <span style={{ color: colors.primary }} className="font-bold">
            {color}
          </span>
        </p>
      </div>
    </section>
  );
}
