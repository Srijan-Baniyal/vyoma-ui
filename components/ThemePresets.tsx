"use client";

import React from "react";
import { useThemeCustomizer, type ThemeConfig } from "@/contexts/ThemeCustomizerContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const presetThemes: Array<{ name: string; description: string; theme: Partial<ThemeConfig> }> = [
  {
    name: "Default",
    description: "The default shadcn/ui theme",
    theme: {
      primary: "hsl(222.2 84% 4.9%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Blue",
    description: "A calming blue theme",
    theme: {
      primary: "hsl(221.2 83.2% 53.3%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Green",
    description: "A fresh green theme",
    theme: {
      primary: "hsl(142.1 76.2% 36.3%)",
      primaryForeground: "hsl(355.7 100% 97.3%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Orange",
    description: "An energetic orange theme",
    theme: {
      primary: "hsl(24.6 95% 53.1%)",
      primaryForeground: "hsl(60 9.1% 97.8%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Red",
    description: "A bold red theme",
    theme: {
      primary: "hsl(0 72.2% 50.6%)",
      primaryForeground: "hsl(0 0% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Purple",
    description: "A creative purple theme",
    theme: {
      primary: "hsl(262.1 83.3% 57.8%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Rose",
    description: "A romantic rose theme",
    theme: {
      primary: "hsl(346.8 77.2% 49.8%)",
      primaryForeground: "hsl(355.7 100% 97.3%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Yellow",
    description: "A bright yellow theme",
    theme: {
      primary: "hsl(47.9 95.8% 53.1%)",
      primaryForeground: "hsl(26 83.3% 14.1%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  },
  {
    name: "Minimal",
    description: "A minimal monochrome theme",
    theme: {
      primary: "hsl(0 0% 0%)",
      primaryForeground: "hsl(0 0% 100%)",
      secondary: "hsl(0 0% 96%)",
      secondaryForeground: "hsl(0 0% 9%)",
      accent: "hsl(0 0% 96%)",
      accentForeground: "hsl(0 0% 9%)",
    }
  },
  {
    name: "Rounded",
    description: "A highly rounded theme",
    theme: {
      primary: "hsl(221.2 83.2% 53.3%)",
      primaryForeground: "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96%)",
      secondaryForeground: "hsl(222.2 84% 4.9%)",
      accent: "hsl(210 40% 96%)",
      accentForeground: "hsl(222.2 84% 4.9%)",
    }
  }
];

export function ThemePresets() {
  const { updateTheme } = useThemeCustomizer();

  const applyPreset = (preset: Partial<ThemeConfig>) => {
    updateTheme(preset);
  };

  const getPreviewColor = (preset: Partial<ThemeConfig>) => {
    return preset.primary || "hsl(222.2 84% 4.9%)";
  };

  return (
    <Card className="border-none dark:text-white dark:bg-transparent">
      <CardHeader>
        <CardTitle>Theme Presets</CardTitle>
        <CardDescription>
          Quick access to popular theme configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {presetThemes.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              className="h-auto p-3 flex flex-col items-start gap-2"
              onClick={() => applyPreset(preset.theme)}
            >
              <div className="flex items-center gap-2 w-full">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: getPreviewColor(preset.theme) }}
                />
                <span className="font-medium text-sm">{preset.name}</span>
              </div>
              <p className="text-xs text-muted-foreground text-left leading-tight">
                {preset.description}
              </p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 