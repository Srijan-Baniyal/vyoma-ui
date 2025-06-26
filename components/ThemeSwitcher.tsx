"use client";

import React, { useState, useEffect } from "react";
import { useThemeCustomizer } from "@/contexts/ThemeCustomizerContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "@/components/ui/color-picker";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, RotateCcw, Palette, Type, RulerIcon } from "lucide-react";
import { ThemePresets } from "./ThemePresets";
import { componentMap, type ComponentEntry } from "@/data/ComponentMapping";

// Simple component preview wrapper with error handling
function ComponentPreview({ component: Component, name }: { component: React.ComponentType; name: string }) {
  try {
    return <Component />;
  } catch (error) {
    console.error(`Error rendering ${name}:`, error);
    return (
      <div className="text-sm text-muted-foreground p-4 text-center">
        <p>Component Preview</p>
        <p className="text-xs">({name})</p>
      </div>
    );
  }
}

export function ThemeSwitcher() {
  const { theme, updateTheme, resetTheme, exportTheme, applyTheme } = useThemeCustomizer();
  const [activeTab, setActiveTab] = useState("colors");

  // Ensure theme is applied when component mounts
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  const handleExport = () => {
    const themeData = exportTheme();
    navigator.clipboard.writeText(themeData);
  };

  const updateBorderRadius = (key: keyof typeof theme.borderRadius, value: string) => {
    updateTheme({
      borderRadius: {
        ...theme.borderRadius,
        [key]: value
      }
    });
  };

  const updateFontSize = (key: keyof typeof theme.fontSize, value: string) => {
    updateTheme({
      fontSize: {
        ...theme.fontSize,
        [key]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-background" data-theme-customizer>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Theme Customizer</h1>
            <p className="text-muted-foreground mt-1">
              Customize your theme colors, typography, and spacing
            </p>
          </div>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={resetTheme}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset to default theme</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Copy className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy theme to clipboard</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Theme Presets */}
        <div className="mb-8">
          <ThemePresets />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="spacing" className="flex items-center gap-2">
                  <RulerIcon className="w-4 h-4" />
                  Spacing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Colors</CardTitle>
                    <CardDescription>
                      Customize the main colors used throughout your interface
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Primary Colors */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Primary</h4>
                        <div className="space-y-3">
                          <ColorPicker
                            label="Primary"
                            value={theme.primary}
                            onChange={(value) => updateTheme({ primary: value })}
                          />
                          <ColorPicker
                            label="Primary Foreground"
                            value={theme.primaryForeground}
                            onChange={(value) => updateTheme({ primaryForeground: value })}
                          />
                        </div>
                      </div>
                      
                      {/* Secondary Colors */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Secondary</h4>
                        <div className="space-y-3">
                          <ColorPicker
                            label="Secondary"
                            value={theme.secondary}
                            onChange={(value) => updateTheme({ secondary: value })}
                          />
                          <ColorPicker
                            label="Secondary Foreground"
                            value={theme.secondaryForeground}
                            onChange={(value) => updateTheme({ secondaryForeground: value })}
                          />
                        </div>
                      </div>

                      {/* Background Colors */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Background</h4>
                        <div className="space-y-3">
                          <ColorPicker
                            label="Background"
                            value={theme.background}
                            onChange={(value) => updateTheme({ background: value })}
                          />
                          <ColorPicker
                            label="Foreground"
                            value={theme.foreground}
                            onChange={(value) => updateTheme({ foreground: value })}
                          />
                        </div>
                      </div>

                      {/* Accent Colors */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Accent</h4>
                        <div className="space-y-3">
                          <ColorPicker
                            label="Accent"
                            value={theme.accent}
                            onChange={(value) => updateTheme({ accent: value })}
                          />
                          <ColorPicker
                            label="Border"
                            value={theme.border}
                            onChange={(value) => updateTheme({ border: value })}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Font Sizes</CardTitle>
                    <CardDescription>
                      Adjust the font sizes for different text elements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(theme.fontSize).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <Label className="capitalize text-sm font-medium">{key}</Label>
                          <Input
                            value={value}
                            onChange={(e) => updateFontSize(key as keyof typeof theme.fontSize, e.target.value)}
                            placeholder="1rem"
                            className="font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="spacing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Border Radius</CardTitle>
                    <CardDescription>
                      Adjust border radius for different components
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(theme.borderRadius).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <Label className="capitalize text-sm font-medium">{key}</Label>
                          <Input
                            value={value}
                            onChange={(e) => updateBorderRadius(key as keyof typeof theme.borderRadius, e.target.value)}
                            placeholder="0.375rem"
                            className="font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Component Scale</CardTitle>
                    <CardDescription>
                      Adjust the overall scale of components
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-w-md">
                      <Slider
                        label="Scale"
                        value={theme.componentScale}
                        onChange={(value) => updateTheme({ componentScale: value })}
                        min={0.8}
                        max={1.2}
                        step={0.1}
                        unit="x"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>
                    See your theme changes in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Elements */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Basic Elements</h4>
                    <div className="grid grid-cols-2 gap-2 theme-scalable">
                      <Button size="sm">Primary</Button>
                      <Button size="sm" variant="secondary">Secondary</Button>
                      <Button size="sm" variant="outline">Outline</Button>
                      <Button size="sm" variant="destructive">Destructive</Button>
                    </div>

                    <div className="flex flex-wrap gap-2 theme-scalable">
                      <Badge>Badge</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>

                    <div className="space-y-2 theme-scalable">
                      <Input placeholder="Input field" className="text-sm" />
                      <div className="flex items-center space-x-2">
                        <Checkbox id="preview-check" />
                        <Label htmlFor="preview-check" className="text-sm">Checkbox</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* VUI Components */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">VUI Components</h4>
                    <div className="space-y-3">
                      {Object.entries(componentMap).slice(0, 2).map(([category, components]) => {
                        if (category === "Get Started") return null;
                        
                        return components.slice(0, 1).map((component: ComponentEntry) => {
                          const ComponentToRender = component.component;
                          
                          return (
                            <Card key={component.name} className="border theme-scalable">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-xs">{component.name}</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="border rounded p-3 bg-muted/30 min-h-[80px] flex items-center justify-center">
                                  <div className="scale-75 origin-center">
                                    <ComponentPreview 
                                      component={ComponentToRender} 
                                      name={component.name} 
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        });
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 