"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit = "",
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label className="font-medium text-sm">{label}</Label>
          <span className="font-mono text-muted-foreground text-sm">
            {value}
            {unit}
          </span>
        </div>
      )}
      <div className="relative">
        <input
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted",
            "slider-thumb:h-4 slider-thumb:w-4 slider-thumb:appearance-none slider-thumb:rounded-full",
            "slider-thumb:cursor-pointer slider-thumb:bg-primary slider-thumb:shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          max={max}
          min={min}
          onChange={handleChange}
          step={step}
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) ${percentage}%, hsl(var(--muted)) 100%)`,
          }}
          type="range"
          value={value}
        />
      </div>
    </div>
  );
}
