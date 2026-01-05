"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

          // Initialize Vanta effect with consistent mobile-optimized settings
          if (window.VANTA && window.THREE && vantaRef.current) {
            vantaEffect.current = window.VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: isMobile ? 0.8 : 1.0,
              scaleMobile: 0.8,
              color: 0x1a_1a_2e, // Consistent color scheme
              backgroundColor: 0x0f_0f_23, // Consistent background
              shininess: isMobile ? 25.0 : 30.0,
              waveHeight: isMobile ? 15.0 : 20.0,
              waveSpeed: isMobile ? 0.8 : 1.0,
              zoom: isMobile ? 1.0 : 0.9,
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
  }, [isMobile]);

  return (
    <section className="relative flex h-screen items-center overflow-hidden">
      {/* Fallback background - consistent with showcase */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 to-slate-800" />

      {/* Vanta.js container */}
      <div
        className="absolute inset-0 z-10"
        ref={vantaRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* Loading indicator */}
      {!vantaLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div
            className={`${
              isMobile ? "h-6 w-6" : "h-8 w-8"
            } animate-spin rounded-full border-2 border-white border-t-transparent`}
          />
        </div>
      )}

      {/* Content - consistent responsive styling */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div
          className={`${
            isMobile ? "mb-4 space-y-2" : "mb-8 space-y-3 md:space-y-6"
          }`}
        >
          <div className="inline-block">
            <h1
              className={`${
                isMobile ? "text-3xl" : "text-6xl md:text-8xl"
              } animate-pulse bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text font-black text-transparent tracking-tighter`}
            >
              INTERACTIVE WAVES
            </h1>
            <div
              className={`h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent ${
                isMobile ? "mt-2" : "mt-4"
              } animate-pulse`}
            />
          </div>

          <p
            className={`${
              isMobile
                ? "px-4 text-sm leading-relaxed"
                : "px-0 text-lg leading-relaxed md:text-xl"
            } max-w-2xl font-light text-gray-300`}
          >
            Experience mesmerizing fluid dynamics with
            <span className="font-medium text-white"> Vanta.js </span>
            powered interactive waves that respond to your{" "}
            {isMobile ? "touch" : "movement"}
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
  const isMobile = useIsMobile();

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
              scale: isMobile ? 0.8 : 1.0,
              scaleMobile: 0.8,
              color: 0x1a_1a_2e,
              backgroundColor: 0x0f_0f_23,
              shininess: isMobile ? 25.0 : 30.0,
              waveHeight: isMobile ? 15.0 : 20.0,
              waveSpeed: isMobile ? 0.8 : 1.0,
              zoom: isMobile ? 1.0 : 0.9,
              forceAnimate: true,
            });
            setVantaLoaded(true);
          }
        } catch (error) {
          console.warn(`Vanta.js failed to load: ${error}`);
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
  }, [isMobile]);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-4 md:space-y-6">
        {/* Showcase Container */}
        <div className="relative h-96 w-full overflow-hidden rounded-lg border">
          {/* Fallback background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />

          {/* Vanta.js container */}
          <div
            className="absolute inset-0"
            ref={vantaRef}
            style={{
              width: "100%",
              height: "100%",
            }}
          />

          {/* Loading indicator */}
          {!vantaLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`${
                  isMobile ? "h-6 w-6" : "h-8 w-8"
                } animate-spin rounded-full border-2 border-white border-t-transparent`}
              />
            </div>
          )}

          {/* Overlay content */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="text-center text-white">
              <h2
                className={`${
                  isMobile ? "text-2xl" : "text-4xl"
                } mb-2 font-bold md:mb-4`}
              >
                Interactive Waves
              </h2>
              <p className={`${isMobile ? "text-sm" : "text-lg"} opacity-80`}>
                {isMobile
                  ? "Touch to interact"
                  : "Move your mouse to interact with the waves"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WavyTilesTheme() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const isMobile = useIsMobile();

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
              scale: isMobile ? 0.8 : 1.0,
              scaleMobile: 0.8,
              color: 0x1a_1a_2e,
              backgroundColor: 0x0f_0f_23,
              shininess: isMobile ? 25.0 : 30.0,
              waveHeight: isMobile ? 15.0 : 20.0,
              waveSpeed: isMobile ? 0.8 : 1.0,
              zoom: isMobile ? 1.0 : 0.9,
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
  }, [isMobile]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg bg-black">
      {/* Vanta.js container */}
      <div
        className="absolute inset-0"
        ref={vantaRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* Loading indicator */}
      {!vantaLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${
              isMobile ? "h-6 w-6" : "h-8 w-8"
            } animate-spin rounded-full border-2 border-white border-t-transparent`}
          />
        </div>
      )}

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white">
          <h2
            className={`${
              isMobile ? "text-2xl" : "text-4xl"
            } mb-2 font-bold md:mb-4`}
          >
            Interactive Waves
          </h2>
          <p className={`${isMobile ? "text-sm" : "text-lg"} opacity-80`}>
            {isMobile
              ? "Touch to interact"
              : "Move your mouse to interact with the waves"}
          </p>
        </div>
      </div>
    </div>
  );
}
