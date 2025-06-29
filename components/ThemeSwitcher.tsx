"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { componentMap, type ComponentEntry } from "@/data/ComponentMapping";

// Enhanced component preview wrapper with consistent sizing
function ComponentPreview({
  component: Component,
  name,
  isActive = false,
}: {
  component: React.ComponentType;
  name: string;
  isActive?: boolean;
}) {
  try {
    return (
      <div
        className={`
          relative w-full h-full flex items-center justify-center
          transition-transform duration-300 ease-out
          ${isActive ? "scale-[1.02]" : "scale-100"}
          overflow-hidden
        `}
      >
        <div className="relative w-full h-full flex items-center justify-center p-3">
          <div className="max-w-full max-h-full flex items-center justify-center">
            <Component />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering ${name}:`, error);
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full mx-auto mb-2" />
          <p className="font-medium text-xs">{name}</p>
          <p className="text-xs opacity-60">Preview</p>
        </div>
      </div>
    );
  }
}

export default function ThemeSwitcher() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Flatten all components (excluding problematic ones)
  const allComponents = Object.entries(componentMap)
    .filter(([category]) => category !== "Get Started")
    .flatMap(([category, components]) =>
      components.map((component: ComponentEntry) => ({
        ...component,
        category,
        id: `${category}-${component.name}`,
      }))
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-3">
            VUI Component Gallery
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Beautiful, responsive components for modern applications
          </p>
        </div>

        {/* Consistent Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allComponents.map((component, index) => {
            const ComponentToRender = component.theme || component.component;
            return (
              <Card
                key={component.id}
                className={`
                  group relative overflow-hidden
                  h-72 w-full 
                  border transition-all duration-300 ease-out
                  hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10
                  bg-card/95 backdrop-blur-sm
                  hover:bg-card
                  transform hover:-translate-y-1
                  ${
                    activeCard === index
                      ? "ring-2 ring-primary/20 shadow-lg shadow-primary/10 -translate-y-1"
                      : ""
                  }
                  rounded-xl
                  cursor-pointer
                `}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Subtle background animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-background/90 backdrop-blur-sm border-0 px-2 py-1 group-hover:bg-primary/10 transition-colors duration-200"
                  >
                    {component.category}
                  </Badge>
                </div>

                {/* Header */}
                <CardHeader className="pb-2 pt-3 px-4">
                  <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors duration-200 leading-tight">
                    {component.name}
                  </CardTitle>
                </CardHeader>

                {/* Preview Area - Fixed Height */}
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-0 m-2 rounded-lg bg-gradient-to-br from-muted/10 to-muted/5 group-hover:from-muted/20 group-hover:to-muted/10 transition-all duration-300">
                    <ComponentPreview
                      component={ComponentToRender}
                      name={component.name}
                      isActive={activeCard === index}
                    />
                  </div>
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
