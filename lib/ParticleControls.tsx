"use client";

import {
  Cpu,
  Droplets,
  Eye,
  EyeOff,
  RotateCcw,
  Ruler,
  Sliders,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/buttonShadcn";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { ParticleSettings } from "@/lib/Particle_setting";
import { defaultSettings } from "@/lib/Particle_setting";
import { cn } from "@/lib/utils";

interface ParticleControlsProps {
  className?: string;
  fps: number;
  isEnabled: boolean;
  onClose?: () => void;
  particleCount: number;
  settings: ParticleSettings;
  toggleSystem: () => void;
  updateSettings: (settings: Partial<ParticleSettings>) => void;
}

export default function ParticleControls({
  settings,
  updateSettings,
  particleCount,
  fps,
  isEnabled,
  toggleSystem,
  className = "",
  onClose,
}: ParticleControlsProps) {
  return (
    <div
      className={cn(
        "w-80 rounded-lg bg-black/70 p-4 text-white backdrop-blur-md",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-lg">Particle Settings</h3>
        <div className="flex items-center gap-2">
          <Button
            className="h-8 px-2 text-xs"
            onClick={() => updateSettings(defaultSettings)}
            size="sm"
            title="Reset to default settings"
            variant="ghost"
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset
          </Button>
          {onClose && (
            <Button
              className="h-8 w-8 p-0"
              onClick={onClose}
              size="sm"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Performance Stats */}
        <div className="rounded-md bg-black/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>Performance</span>
            </div>
            <Button
              className="h-8"
              onClick={toggleSystem}
              size="sm"
              variant="outline"
            >
              {isEnabled ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" /> Disable
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" /> Enable
                </>
              )}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Particles: {particleCount}</div>
            <div>FPS: {fps}</div>
          </div>
        </div>

        {/* Particle Count */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            <Label>Particle Count</Label>
          </div>
          <Slider
            max={1000}
            min={1}
            onChange={(value: number) =>
              updateSettings({ particleCount: value })
            }
            step={1}
            value={settings.particleCount}
          />
          <div className="flex justify-between text-gray-400 text-xs">
            <span>1</span>
            <span>1000</span>
          </div>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <Label>Particle Size</Label>
          </div>
          <Slider
            max={4}
            min={0.5}
            onChange={(value: number) => updateSettings({ baseSize: value })}
            step={0.25}
            value={settings.baseSize}
          />
          <div className="flex justify-between text-gray-400 text-xs">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>

        {/* Speed */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <Label>Movement Speed</Label>
          </div>
          <Slider
            max={3}
            min={0.25}
            onChange={(value: number) =>
              updateSettings({ movementSpeed: value })
            }
            step={0.25}
            value={settings.movementSpeed}
          />
          <div className="flex justify-between text-gray-400 text-xs">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>

        {/* Trail Length */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <Label>Tail Length</Label>
          </div>
          <Slider
            max={30}
            min={1}
            onChange={(value: number) =>
              updateSettings({ maxTailLength: value })
            }
            step={1}
            value={settings.maxTailLength}
          />
          <div className="flex justify-between text-gray-400 text-xs">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>
      </div>
    </div>
  );
}
