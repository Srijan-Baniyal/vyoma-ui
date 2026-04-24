"use client";

import type React from "react";
import type { ParticleSettings } from "@/lib/Particle_setting";

export interface Particle {
  color: string;
  draw: (ctx: CanvasRenderingContext2D) => void;
  size: number;
  speedX: number;
  speedY: number;
  tail: { x: number; y: number }[];
  update: () => void;
  x: number;
  y: number;
}

export class ParticleClass implements Particle {
  x = 0;
  y = 0;
  size = 0;
  speedX = 0;
  speedY = 0;
  color = "";
  tail: { x: number; y: number }[] = [];
  angle = 0;
  angleSpeed = 0;
  tailLength = 1;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  settings: ParticleSettings;

  constructor(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    settings: ParticleSettings
  ) {
    this.canvasRef = canvasRef;
    this.settings = settings;

    const canvas = canvasRef.current;
    if (!canvas) {
      return; // Don't throw, just skip initialization
    }

    // Initialize with random position across the entire screen
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Use a more even distribution method
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    // Apply settings
    this.size = Math.random() * settings.sizeVariation + settings.baseSize;
    this.tailLength = Math.floor(Math.random() * settings.maxTailLength) + 1; // Minimum tail length of 1

    // Initialize movement with more controlled angles
    this.speedX = 0;
    this.speedY = 0;
    // Use a more controlled angle range to prevent corner clustering
    this.angle = Math.random() * Math.PI * 2;
    // Reduce the angle variation for smoother movement
    this.angleSpeed = (Math.random() - 0.5) * settings.movementSpeed * 0.01;

    // Set color based on settings
    this.color = this.getParticleColor();

    // Initialize tail
    this.tail = [];
  }

  getParticleColor(): string {
    if (
      this.settings.useCustomColors &&
      this.settings.customColors.length > 0
    ) {
      const colors = this.settings.customColors;
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Default colors if no custom colors provided
    const colors = [
      "rgba(255, 51, 51, 0.6)",
      "rgba(255, 204, 51, 0.6)",
      "rgba(255, 255, 77, 0.6)",
      "rgba(51, 255, 255, 0.6)",
      "rgba(255, 51, 255, 0.6)",
      "rgba(255, 255, 255, 0.6)",
      "rgba(0, 255, 255, 1)",
      "rgba(0, 0, 255, 1)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    const canvas = this.canvasRef.current;
    if (!canvas) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Update angle and calculate new speed with smoother transitions
    this.angle += this.angleSpeed;
    // Add some randomness to prevent straight lines while maintaining smooth movement
    const speedVariation = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    this.speedX =
      Math.cos(this.angle) * this.settings.movementSpeed * speedVariation;
    this.speedY =
      Math.sin(this.angle) * this.settings.movementSpeed * speedVariation;

    // Update position
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around screen edges with smoother transitions
    if (this.x < -50) {
      this.x = width + 50;
    }
    if (this.x > width + 50) {
      this.x = -50;
    }
    if (this.y < -50) {
      this.y = height + 50;
    }
    if (this.y > height + 50) {
      this.y = -50;
    }

    // Update tail with proper length control
    this.tail.unshift({ x: this.x, y: this.y });
    while (this.tail.length > this.tailLength) {
      this.tail.pop();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw tail with proper opacity gradient
    if (this.tail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.tail[0].x, this.tail[0].y);

      for (let i = 1; i < this.tail.length; i++) {
        const dx = this.tail[i].x - this.tail[i - 1].x;
        const dy = this.tail[i].y - this.tail[i - 1].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Break if points are too far apart (prevents lines across screen)
        if (distance > 50) {
          break;
        }

        // Calculate opacity based on position in tail
        const opacity = 1 - i / this.tail.length;
        ctx.strokeStyle = this.color.replace("0.6", opacity.toString());
        ctx.lineWidth = this.size * 0.8;
        ctx.lineTo(this.tail[i].x, this.tail[i].y);
      }

      ctx.stroke();
    }

    // Draw particle
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
