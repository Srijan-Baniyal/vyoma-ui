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

          // Initialize Vanta effect with full window dimensions
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

    // Handle window resize
    const handleResize = () => {
      if (vantaEffect.current && vantaRef.current) {
        // Trigger resize for Vanta effect
        vantaEffect.current.destroy();
        vantaEffect.current = null;
        setTimeout(() => {
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
          }
        }, 100);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
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
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>

      {/* Vanta.js container - full screen */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>

      {/* Loading indicator */}
      {!vantaLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="mb-8 space-y-6">
          <div className="inline-block">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-pulse">
              WAVY TILES
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent mt-4 animate-pulse" />
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
            Experience mesmerizing interactive waves that respond to your movement with 
            <span className="text-white font-medium"> Vanta.js </span> 
            powered dynamic effects
          </p>
        </div>
      </div>
    </div>
  );
}
