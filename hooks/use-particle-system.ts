"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Particle, ParticleClass } from "@/lib/Particle";
import type { ParticleSettings } from "@/lib/Particle_setting";

type ChromiumWindow = Window & {
  chrome?: {
    runtime?: unknown;
    webstore?: unknown;
  };
};

export function useParticleSystem(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  settings: ParticleSettings,
  setFps?: (fps: number) => void
) {
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const fpsRef = useRef<{ value: number; frames: number; lastTime: number }>({
    value: 0,
    frames: 0,
    lastTime: performance.now(),
  });
  const [particleCount, setParticleCount] = useState(0);
  const isRunningRef = useRef(false);

  // Adjust particle count to match target
  const adjustParticleCount = useCallback(
    (targetCount: number) => {
      const currentCount = particlesRef.current.length;

      if (currentCount < targetCount) {
        // Add more particles
        for (let i = currentCount; i < targetCount; i++) {
          particlesRef.current.push(new ParticleClass(canvasRef, settings));
        }
      } else if (currentCount > targetCount) {
        // Remove excess particles
        particlesRef.current = particlesRef.current.slice(0, targetCount);
      }
    },
    [canvasRef, settings]
  );

  // Add effect to handle settings changes
  useEffect(() => {
    // Update existing particles with new settings
    for (const particle of particlesRef.current) {
      if (particle instanceof ParticleClass) {
        particle.settings = settings;
        // Update particle properties based on new settings
        particle.size =
          Math.random() * settings.sizeVariation + settings.baseSize;
        particle.tailLength =
          Math.floor(Math.random() * settings.maxTailLength) + 5;
        particle.angleSpeed =
          (Math.random() - 0.5) * settings.movementSpeed * 0.02;
        particle.color = particle.getParticleColor();
      }
    }

    // Use settings.particleCount directly
    setParticleCount(settings.particleCount);
    adjustParticleCount(settings.particleCount);
  }, [settings, adjustParticleCount]);

  // Resize canvas and adjust particles
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    // Set canvas to full screen with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Adjust existing particle positions
    if (oldWidth > 0 && oldHeight > 0) {
      const widthRatio = canvas.width / oldWidth;
      const heightRatio = canvas.height / oldHeight;
      for (const particle of particlesRef.current) {
        particle.x *= widthRatio;
        particle.y *= heightRatio;
        particle.tail = particle.tail.map((point) => ({
          x: point.x * widthRatio,
          y: point.y * heightRatio,
        }));
      }
    }

    // Use settings.particleCount directly
    setParticleCount(settings.particleCount);
    adjustParticleCount(settings.particleCount);
  }, [settings.particleCount, adjustParticleCount, canvasRef.current]);

  // Animation loop
  const animate = useCallback(() => {
    if (!isRunningRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // Clear with fade effect
    ctx.fillStyle = `rgba(0, 0, 0, ${settings.fadeAmount})`;
    ctx.fillRect(
      0,
      0,
      canvas.width / (window.devicePixelRatio || 1),
      canvas.height / (window.devicePixelRatio || 1)
    );

    // Update and draw particles
    for (const particle of particlesRef.current) {
      particle.update();
      particle.draw(ctx);
    }

    // Calculate FPS
    const now = performance.now();
    fpsRef.current.frames++;

    if (now >= fpsRef.current.lastTime + 1000) {
      fpsRef.current.value = Math.round(
        (fpsRef.current.frames * 1000) / (now - fpsRef.current.lastTime)
      );
      fpsRef.current.frames = 0;
      fpsRef.current.lastTime = now;

      if (setFps) {
        setFps(fpsRef.current.value);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [canvasRef, setFps, settings]);

  // Initialize the particle system
  const initialize = useCallback(() => {
    if (!canvasRef.current) {
      return () => {
        // No cleanup is needed when the canvas is unavailable.
      };
    }

    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(canvasRef.current);

    // Initial setup
    resizeCanvas();

    // Aggressive fix for Chrome canvas sizing bug
    function fixCanvasSizing(attempt = 0) {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      const bufferWidth = canvas.width / dpr;
      const bufferHeight = canvas.height / dpr;
      if (
        (cssWidth !== bufferWidth || cssHeight !== bufferHeight) &&
        attempt < 10
      ) {
        resizeCanvas();
        // Try again on next frame
        requestAnimationFrame(() => fixCanvasSizing(attempt + 1));
      }
    }
    fixCanvasSizing(0);
    Promise.resolve().then(() => fixCanvasSizing(0));
    setTimeout(() => fixCanvasSizing(0), 100);

    // --- Chromium bug workaround: force resize event on load ---
    if (typeof window !== "undefined") {
      // Only run in Chromium browsers
      const chromiumWindow = window as ChromiumWindow;
      const chromiumApi = chromiumWindow.chrome;
      const isChromium = Boolean(
        chromiumApi && (chromiumApi.webstore || chromiumApi.runtime)
      );
      if (isChromium) {
        // Schedule a resizeCanvas in the next animation frame
        requestAnimationFrame(() => {
          resizeCanvas();
          // Then, schedule another resizeCanvas after a short delay
          setTimeout(() => {
            resizeCanvas();
            window.dispatchEvent(new Event("resize"));
          }, 50);
        });
      }
    }
    // --- End workaround ---

    // Start animation if enabled
    if (settings.autoStart) {
      isRunningRef.current = true;
      animationRef.current = requestAnimationFrame(animate);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
      isRunningRef.current = false;
    };
  }, [animate, resizeCanvas, settings.autoStart, canvasRef.current]);

  // Toggle the particle system on/off
  const toggleSystem = useCallback(
    (enabled: boolean) => {
      isRunningRef.current = enabled;

      if (enabled && !animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (!enabled && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    },
    [animate]
  );

  return {
    particleCount,
    initialize,
    toggleSystem,
  };
}
