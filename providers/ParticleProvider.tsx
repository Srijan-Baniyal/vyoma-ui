"use client";

import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useParticleSystem } from "@/hooks/use-particle-system";
import { defaultSettings, type ParticleSettings } from "@/lib/Particle_setting";

interface ParticleContextType {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  fps: number;
  isEnabled: boolean;
  particleCount: number;
  settings: ParticleSettings;
  toggleSystem: () => void;
  updateSettings: (newSettings: Partial<ParticleSettings>) => void;
}

const ParticleContext = createContext<ParticleContextType | undefined>(
  undefined
);

export function ParticleProvider({
  children,
  initialSettings = {},
}: {
  children: React.ReactNode;
  initialSettings?: Partial<ParticleSettings>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [settings, setSettings] = useState<ParticleSettings>({
    ...defaultSettings,
    ...initialSettings,
  });
  const [isEnabled, setIsEnabled] = useState(true);
  const [fps, setFps] = useState(0);

  const {
    particleCount,
    initialize,
    toggleSystem: toggleParticleSystem,
  } = useParticleSystem(canvasRef, settings, setFps);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // Initialize the particle system
    const cleanup = initialize();

    return () => {
      cleanup();
    };
  }, [initialize]);

  // Update particle system when settings change
  useEffect(() => {
    toggleParticleSystem(isEnabled);
  }, [isEnabled, toggleParticleSystem]);

  const updateSettings = (newSettings: Partial<ParticleSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  const toggleSystem = () => {
    setIsEnabled((prev) => !prev);
  };

  const value = {
    settings,
    updateSettings,
    particleCount,
    fps,
    isEnabled,
    toggleSystem,
    canvasRef,
  };

  return (
    <ParticleContext.Provider value={value}>
      {children}
    </ParticleContext.Provider>
  );
}

export function useParticleContext() {
  const context = useContext(ParticleContext);
  if (context === undefined) {
    throw new Error(
      "useParticleContext must be used within a ParticleProvider"
    );
  }
  return context;
}

export function useOptionalParticleContext() {
  return useContext(ParticleContext);
}
