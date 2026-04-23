"use client";

import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Helper: Generate stable particle positions
const generateParticles = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: `particle-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
  }));

// Helper: Set up mouse tracking
const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
};

// Helper: Update caret position with sub-pixel precision
const useCaretPosition = (
  text: string,
  hasStartedTyping: boolean,
  inputRef: React.RefObject<HTMLInputElement | null>,
  measureRef: React.RefObject<HTMLSpanElement | null>
) => {
  const [caretPosition, setCaretPosition] = useState(0);
  const [caretHeight, setCaretHeight] = useState(72);

  const updateCaretPosition = useCallback(() => {
    if (!(measureRef.current && inputRef.current) || hasStartedTyping) {
      return;
    }

    const input = inputRef.current;
    const measure = measureRef.current;
    const cursorPos = input.selectionStart || 0;
    const textBeforeCaret = text.slice(0, cursorPos);

    measure.textContent = textBeforeCaret;
    const rect = measure.getBoundingClientRect();
    const textWidth = rect.width;

    const computedStyle = window.getComputedStyle(input);
    const fontSize = Number.parseFloat(computedStyle.fontSize);
    const newCaretHeight = fontSize * 1.2;

    setCaretPosition(textWidth);
    setCaretHeight(newCaretHeight);
  }, [text, hasStartedTyping, inputRef, measureRef]);

  // Event handling
  useEffect(() => {
    const input = inputRef.current;
    if (!input || hasStartedTyping) {
      return;
    }

    const events = [
      "keyup",
      "keydown",
      "click",
      "focus",
      "blur",
      "select",
      "selectstart",
      "selectionchange",
      "mouseup",
      "touchend",
    ];

    const handleUpdate = () => {
      requestAnimationFrame(() => {
        updateCaretPosition();
      });
    };

    for (const event of events) {
      input.addEventListener(event, handleUpdate);
    }

    document.addEventListener("selectionchange", handleUpdate);

    return () => {
      for (const event of events) {
        input.removeEventListener(event, handleUpdate);
      }
      document.removeEventListener("selectionchange", handleUpdate);
    };
  }, [updateCaretPosition, hasStartedTyping, inputRef]);

  return { caretPosition, caretHeight, updateCaretPosition };
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Showcase component with complex animation and interaction logic
export default function MagicalCaret() {
  const [text, setText] = useState("Let's make");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(generateParticles, []);
  const mousePosition = useMouseTracking();
  const { caretPosition, caretHeight, updateCaretPosition } = useCaretPosition(
    text,
    hasStartedTyping,
    inputRef,
    measureRef
  );

  useEffect(() => {
    if (!hasStartedTyping) {
      updateCaretPosition();
    }
  }, [updateCaretPosition, hasStartedTyping]);

  useEffect(() => {
    // Auto-focus on mount to show demo
    if (inputRef.current && !hasStartedTyping) {
      const input = inputRef.current;
      input.focus();

      // Simulate a random key press to trigger positioning
      setTimeout(() => {
        // Create a synthetic keyboard event to trigger positioning
        const randomKeys = ["ArrowRight", "End", "Home", "ArrowLeft"];
        const randomKey =
          randomKeys[Math.floor(Math.random() * randomKeys.length)];

        // Simulate key press event
        const keyEvent = new KeyboardEvent("keydown", {
          key: randomKey,
          code: randomKey,
          bubbles: true,
          cancelable: true,
        });

        input.dispatchEvent(keyEvent);

        // Also simulate keyup to complete the cycle
        const keyUpEvent = new KeyboardEvent("keyup", {
          key: randomKey,
          code: randomKey,
          bubbles: true,
          cancelable: true,
        });

        input.dispatchEvent(keyUpEvent);

        // Ensure cursor is at end of text after simulation
        setTimeout(() => {
          input.setSelectionRange(text.length, text.length);
          updateCaretPosition();
        }, 10);
      }, 100);
    }
  }, [hasStartedTyping, text, updateCaretPosition]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
    }
    setText(e.target.value);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleReset = () => {
    setText("Let's make");
    setHasStartedTyping(false);
    setIsFocused(false);
    // Focus the input to show the demo effect
    setTimeout(() => {
      if (inputRef.current) {
        const input = inputRef.current;
        input.focus();
        setIsFocused(true);

        // Simulate random key press after reset
        setTimeout(() => {
          const randomKeys = ["ArrowRight", "End", "Home", "ArrowLeft"];
          const randomKey =
            randomKeys[Math.floor(Math.random() * randomKeys.length)];

          const keyEvent = new KeyboardEvent("keydown", {
            key: randomKey,
            code: randomKey,
            bubbles: true,
            cancelable: true,
          });

          input.dispatchEvent(keyEvent);

          const keyUpEvent = new KeyboardEvent("keyup", {
            key: randomKey,
            code: randomKey,
            bubbles: true,
            cancelable: true,
          });

          input.dispatchEvent(keyUpEvent);

          // Ensure proper positioning
          setTimeout(() => {
            input.setSelectionRange("Let's make".length, "Let's make".length);
            updateCaretPosition();
          }, 10);
        }, 50);
      }
    }, 100);
  };

  // Calculate dynamic effects
  let glowIntensity = 0.4;
  if (isFocused) {
    glowIntensity = 1;
  } else if (isHovered) {
    glowIntensity = 0.7;
  }

  let scaleValue = 1;
  if (isFocused) {
    scaleValue = 1.02;
  } else if (isHovered) {
    scaleValue = 1.01;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background with gradient mesh */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%,
              rgba(99, 102, 241, 0.1) 0%,
              transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x * 0.05}% ${100 - mousePosition.y * 0.05}%,
              rgba(168, 85, 247, 0.08) 0%,
              transparent 50%),
            linear-gradient(135deg,
              #0f172a 0%,
              #1e293b 25%,
              #334155 50%,
              #1e293b 75%,
              #0f172a 100%)
          `,
        }}
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            className="absolute h-1 w-1 animate-pulse rounded-full bg-white/10"
            key={particle.id}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        {/* Main text area with premium styling */}
        <div className="mb-16 w-full max-w-6xl">
          {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Visual effect container requires mouse interaction */}
          {/* biome-ignore lint/a11y/useSemanticElements: Region role is appropriate for this interactive visual container */}
          <div
            aria-label="Interactive text area"
            className="group relative transition-all duration-500 ease-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
            role="region"
          >
            {/* Backdrop with advanced glassmorphism */}
            <div
              className="absolute inset-0 rounded-3xl transition-all duration-500"
              style={{
                background: `
                  linear-gradient(135deg,
                    rgba(255, 255, 255, ${0.05 + (isFocused ? 0.05 : 0)}) 0%,
                    rgba(255, 255, 255, ${0.02 + (isFocused ? 0.03 : 0)}) 100%)
                `,
                backdropFilter: `blur(${20 + (isFocused ? 10 : 0)}px)`,
                border: `1px solid rgba(255, 255, 255, ${0.1 + (isFocused ? 0.1 : 0)})`,
                boxShadow: `
                  0 0 0 1px rgba(255, 255, 255, ${0.05 + (isFocused ? 0.1 : 0)}),
                  0 ${isFocused ? 40 : 20}px ${isFocused ? 80 : 40}px -10px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                transform: `scale(${scaleValue}) translateY(${isFocused ? -2 : 0}px)`,
              }}
            />

            {/* Content container */}
            <div className="relative cursor-text p-16">
              {/* Hidden measuring span */}
              {!hasStartedTyping && (
                <span
                  className="pointer-events-none invisible absolute whitespace-pre font-extralight text-6xl md:text-7xl"
                  ref={measureRef}
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    left: "64px",
                    top: "64px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                />
              )}

              {/* Premium input field */}
              <input
                autoComplete="off"
                className="relative z-20 w-full border-none bg-transparent font-extralight text-6xl text-white placeholder-slate-400/60 transition-all duration-300 focus:outline-none md:text-7xl"
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Let's make a miracle"
                ref={inputRef}
                spellCheck="false"
                style={{
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  caretColor: hasStartedTyping ? "#ffffff" : "transparent",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  textShadow: isFocused
                    ? "0 0 30px rgba(255, 255, 255, 0.3)"
                    : "none",
                }}
                type="text"
                value={text}
              />

              {/* Ultra-premium cursor animation - FIXED */}
              {!hasStartedTyping && isFocused && (
                <div
                  className="pointer-events-none absolute z-30 transition-all duration-200 ease-out"
                  style={{
                    left: `${caretPosition + 64}px`,
                    top: "64px",
                    height: `${caretHeight}px`,
                  }}
                >
                  {/* Main caret with enhanced glow */}
                  <div
                    className="relative z-50 animate-caret-blink"
                    style={{
                      width: "3px",
                      height: `${caretHeight}px`,
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                      borderRadius: "2px",
                      boxShadow: `
                        0 0 4px rgba(255, 255, 255, 0.9),
                        0 0 8px rgba(255, 255, 255, 0.6),
                        0 0 16px rgba(255, 255, 255, 0.3)
                      `,
                    }}
                  />

                  {/* Primary light burst */}
                  <div
                    className="pointer-events-none absolute top-0 left-0 z-25 animate-caret-blink"
                    style={{
                      width: "600px",
                      height: `${caretHeight * 2.5}px`,
                      top: `${-caretHeight * 0.75}px`,
                      left: "-2px",
                      background: `
                        radial-gradient(ellipse 90% 70% at 0% 50%,
                          rgba(255, 235, 200, ${0.8 * glowIntensity}) 0%,
                          rgba(255, 220, 180, ${0.6 * glowIntensity}) 10%,
                          rgba(255, 200, 150, ${0.4 * glowIntensity}) 25%,
                          rgba(255, 180, 120, ${0.25 * glowIntensity}) 40%,
                          rgba(255, 160, 100, ${0.15 * glowIntensity}) 55%,
                          rgba(255, 140, 80, ${0.08 * glowIntensity}) 70%,
                          rgba(255, 120, 60, ${0.04 * glowIntensity}) 85%,
                          transparent 100%
                        )
                      `,
                      filter: "blur(1px)",
                    }}
                  />

                  {/* Secondary atmospheric glow */}
                  <div
                    className="pointer-events-none absolute top-0 left-0 z-20 animate-caret-blink"
                    style={{
                      width: "800px",
                      height: `${caretHeight * 3}px`,
                      top: `${-caretHeight}px`,
                      left: "-2px",
                      background: `
                        radial-gradient(ellipse 100% 60% at 0% 50%,
                          rgba(255, 220, 180, ${0.5 * glowIntensity}) 0%,
                          rgba(255, 200, 150, ${0.3 * glowIntensity}) 15%,
                          rgba(255, 180, 120, ${0.2 * glowIntensity}) 30%,
                          rgba(255, 160, 100, ${0.12 * glowIntensity}) 45%,
                          rgba(255, 140, 80, ${0.06 * glowIntensity}) 60%,
                          rgba(255, 120, 60, ${0.03 * glowIntensity}) 75%,
                          transparent 90%
                        )
                      `,
                      filter: "blur(3px)",
                    }}
                  />
                </div>
              )}

              {/* Continuation text with FIXED spacing */}
              {text === "Let's make" && !hasStartedTyping && (
                <div
                  className="pointer-events-none absolute font-extralight text-6xl transition-all duration-300 md:text-7xl"
                  style={{
                    left: `${caretPosition + 64 + 20}px`, // Added proper spacing
                    top: "64px",
                    fontFamily:
                      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    color: `rgba(156, 163, 175, ${0.6 + glowIntensity * 0.3})`,
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                    textShadow: `0 0 20px rgba(255, 180, 120, ${0.2 * glowIntensity})`,
                  }}
                >
                  a miracle
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced search bar */}
        <div className="mb-12 w-full max-w-3xl">
          <div className="group relative">
            <div
              className="absolute inset-0 rounded-2xl transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            />
            <div className="relative flex items-center gap-6 p-6">
              {/* Avatar with glow */}
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-slate-500 to-slate-700 shadow-lg">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-slate-300 to-slate-500" />
                </div>
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400/20 to-purple-400/20 blur-sm" />
              </div>

              {/* Link icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-600/30 bg-slate-700/50 backdrop-blur-sm">
                <div className="h-5 w-5 rotate-45 transform rounded border-2 border-slate-400" />
              </div>

              {/* Search section */}
              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-7 w-7 rounded-full border-2 border-slate-400/60" />
                <span className="font-light text-xl">Search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator with reset button */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  hasStartedTyping
                    ? "bg-green-400 shadow-green-400/50 shadow-lg"
                    : "animate-pulse bg-amber-400 shadow-amber-400/50 shadow-lg"
                }`}
              />
              <span className="font-medium text-slate-300 text-sm">
                {hasStartedTyping ? "Normal typing mode" : "Demo mode active"}
              </span>
            </div>

            {/* Reset button */}
            {hasStartedTyping && (
              <button
                className="group relative inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-linear-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 font-medium text-blue-300 text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:from-blue-500/30 hover:to-purple-500/30 hover:text-blue-200 hover:shadow-blue-500/25 hover:shadow-lg active:scale-95"
                onClick={handleReset}
                type="button"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-400/10 to-purple-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <svg
                  aria-label="Reset icon"
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Reset</title>
                  <path
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <span className="relative z-10">Reset to Demo</span>
              </button>
            )}
          </div>

          <p className="mx-auto max-w-md text-slate-500 text-xs leading-relaxed">
            {hasStartedTyping
              ? "You're now in standard input mode - click reset to see the premium cursor animation again"
              : "Experience the premium cursor animation - start typing to switch to normal mode"}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes caret-blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .animate-caret-blink {
          animation: caret-blink 1s infinite;
        }
      `}</style>
    </div>
  );
}
