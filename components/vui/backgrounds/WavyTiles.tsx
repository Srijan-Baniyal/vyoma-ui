"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    VANTA: {
      WAVES: (config: {
        el: HTMLElement;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number;
        backgroundColor?: number;
        shininess?: number;
        waveHeight?: number;
        waveSpeed?: number;
        zoom?: number;
        forceAnimate?: boolean;
      }) => {
        destroy: () => void;
      };
    };
    THREE: object;
  }
}

export default function Background() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);

  useEffect(() => {
    const loadVanta = async () => {
      if (
        typeof window !== "undefined" &&
        vantaRef.current &&
        !vantaEffect.current
      ) {
        try {
          // Load Three.js
          if (!window.THREE) {
            const script1 = document.createElement("script");
            script1.src =
              "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
            document.head.appendChild(script1);

            await new Promise((resolve, reject) => {
              script1.onload = resolve;
              script1.onerror = reject;
              setTimeout(reject, 5000); // 5 second timeout
            });
          }

          // Load Vanta Waves
          if (!window.VANTA) {
            const script2 = document.createElement("script");
            script2.src =
              "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";
            document.head.appendChild(script2);

            await new Promise((resolve, reject) => {
              script2.onload = resolve;
              script2.onerror = reject;
              setTimeout(reject, 5000); // 5 second timeout
            });
          }

          // Initialize Vanta effect with theme-proof settings
          if (window.VANTA && window.THREE && vantaRef.current) {
            vantaEffect.current = window.VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x000000, // Pure black - theme proof
              backgroundColor: 0x000000, // Force black background
              shininess: 40.0,
              waveHeight: 25.0,
              waveSpeed: 1.2,
              zoom: 0.8,
              forceAnimate: true,
            });
            setVantaLoaded(true);
          }
        } catch (error) {
          console.warn("Vanta.js failed to load:", error);
          setVantaLoaded(false);
        }
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(loadVanta, 100);

    return () => {
      clearTimeout(timer);
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.warn("Error destroying Vanta effect:", error);
        }
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Fallback background - theme proof */}
      <div className="absolute inset-0 bg-black z-0"></div>

      {/* Vanta.js container with theme-proof styling */}
      <div
        ref={vantaRef}
        className="absolute inset-0 z-10"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000000", // Force black background
          background: "#000000", // Additional fallback
        }}
      ></div>

      {/* Loading indicator */}
      {!vantaLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="mb-8 space-y-6">
          <div className="inline-block">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-pulse">
              MINIMALIST
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent mt-4 animate-pulse" />
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
            We create clean, sophisticated designs that communicate clearly and
            stand the test of time with 
            <span className="text-white font-medium"> interactive waves </span>
            that respond to your movement.
          </p>
        </div>
      </div>
    </section>
  );
}

// Showcase Component for WavyTiles
export function WavyTilesShowcase() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);

  useEffect(() => {
    const loadVanta = async () => {
      if (
        typeof window !== "undefined" &&
        vantaRef.current &&
        !vantaEffect.current
      ) {
        try {
          // Load Three.js
          if (!window.THREE) {
            const script1 = document.createElement("script");
            script1.src =
              "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
            document.head.appendChild(script1);

            await new Promise((resolve, reject) => {
              script1.onload = resolve;
              script1.onerror = reject;
              setTimeout(reject, 5000);
            });
          }

          // Load Vanta Waves
          if (!window.VANTA) {
            const script2 = document.createElement("script");
            script2.src =
              "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js";
            document.head.appendChild(script2);

            await new Promise((resolve, reject) => {
              script2.onload = resolve;
              script2.onerror = reject;
              setTimeout(reject, 5000);
            });
          }

          // Initialize Vanta effect
          if (window.VANTA && window.THREE && vantaRef.current) {
            vantaEffect.current = window.VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x1a1a2e,
              backgroundColor: 0x0f0f23,
              shininess: 30.0,
              waveHeight: 20.0,
              waveSpeed: 1.0,
              zoom: 0.9,
              forceAnimate: true,
            });
            setVantaLoaded(true);
          }
        } catch (error) {
          console.warn("Vanta.js failed to load:", error);
          setVantaLoaded(false);
        }
      }
    };

    const timer = setTimeout(loadVanta, 100);

    return () => {
      clearTimeout(timer);
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.warn("Error destroying Vanta effect:", error);
        }
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Showcase Container */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden border">
          {/* Fallback background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>

          {/* Vanta.js container */}
          <div
            ref={vantaRef}
            className="absolute inset-0"
            style={{
              width: "100%",
              height: "100%",
            }}
          ></div>

          {/* Loading indicator */}
          {!vantaLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Overlay content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Interactive Waves</h2>
              <p className="text-lg opacity-80">
                Move your mouse to interact with the waves
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
