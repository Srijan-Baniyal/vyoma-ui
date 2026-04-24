"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import type { ParticleSettings } from "@/lib/Particle_setting";
import ParticleControls from "@/lib/ParticleControls";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttonShadcn";

interface ParticleSettingsButtonProps {
  buttonClassName?: string;
  buttonSize?: "sm" | "md" | "lg";
  className?: string;
  fps: number;
  iconOnly?: boolean;
  isEnabled: boolean;
  panelClassName?: string;
  particleCount: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "custom";
  settings: ParticleSettings;
  toggleSystem: () => void;
  updateSettings: (settings: Partial<ParticleSettings>) => void;
}

export default function ParticleSettingsButton({
  settings,
  updateSettings,
  particleCount,
  fps,
  isEnabled,
  toggleSystem,
  className = "",
  buttonClassName = "",
  panelClassName = "",
  position = "top-right",
  buttonSize = "md",
  iconOnly = true,
}: ParticleSettingsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Position classes based on the position prop
  const positionClasses = {
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4",
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    custom: "", // No position classes, use className for custom positioning
  };

  // Button size classes
  const sizeClasses = {
    sm: "p-1.5 rounded-full",
    md: "p-2 rounded-full",
    lg: "p-3 rounded-full",
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className={cn("z-50", positionClasses[position], className)}>
      <Button
        aria-label="Particle system settings"
        className={cn(
          "bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/40",
          sizeClasses[buttonSize],
          buttonClassName
        )}
        onClick={() => setIsOpen(!isOpen)}
        title="Particle system settings"
      >
        {iconOnly ? (
          <Settings className={cn("text-white", iconSizeClasses[buttonSize])} />
        ) : (
          <div className="flex items-center gap-2">
            <Settings
              className={cn("text-white", iconSizeClasses[buttonSize])}
            />
            <span>Settings</span>
          </div>
        )}
      </Button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2",
            position === "bottom-left" || position === "bottom-right"
              ? "bottom-full mb-2"
              : "",
            position === "top-left" || position === "bottom-left"
              ? "left-0"
              : "right-0"
          )}
        >
          <ParticleControls
            className={cn(panelClassName)}
            fps={fps}
            isEnabled={isEnabled}
            onClose={() => setIsOpen(false)}
            particleCount={particleCount}
            settings={settings}
            toggleSystem={toggleSystem}
            updateSettings={updateSettings}
          />
        </div>
      )}
    </div>
  );
}
