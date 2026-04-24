"use client";

export interface ParticleSettings {
  autoStart: boolean;
  // Particle count settings
  baseParticleCount: number;

  // Appearance settings
  baseSize: number;
  customColors: string[];
  fadeAmount: number;
  maxParticles: number;
  maxTailLength: number;
  minParticles: number;

  // Movement settings
  movementSpeed: number;
  particleCount: number;
  particleDensity: number; // deprecated, use particleCount
  sizeVariation: number;

  // Performance settings
  targetFps: number;

  // Color settings
  useCustomColors: boolean;
}

export const defaultSettings: ParticleSettings = {
  // Particle count settings
  baseParticleCount: 150,
  minParticles: 1,
  maxParticles: 1000,
  particleDensity: 8, // deprecated
  particleCount: 400,

  // Appearance settings
  baseSize: 1.5,
  sizeVariation: 1.2,
  maxTailLength: 15,
  fadeAmount: 0.08,

  // Movement settings
  movementSpeed: 1.5,

  // Color settings
  useCustomColors: false,
  customColors: [],

  // Performance settings
  targetFps: 60,
  autoStart: true,
};
