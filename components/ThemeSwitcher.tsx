"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { componentMap, type ComponentEntry } from "@/data/ComponentMapping";

// Enhanced component preview wrapper with better containment
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
          transform transition-all duration-500 ease-out
          ${isActive ? "scale-105" : "scale-100"}
          hover:scale-110 origin-center
          w-full h-full flex items-center justify-center
          overflow-hidden
        `}
      >
        {/* Natural component preview container */}
        <div className="relative overflow-hidden rounded-md flex items-center justify-center w-full h-full min-h-[100px] p-2">
          <Component />
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering ${name}:`, error);
    return (
      <div className="text-sm text-muted-foreground p-3 text-center">
        <div className="w-6 h-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full mx-auto mb-2" />
        <p className="font-medium text-xs">Preview</p>
        <p className="text-xs opacity-60">({name})</p>
      </div>
    );
  }
}

export default function ThemeSwitcher() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Flatten all components
  const allComponents = Object.entries(componentMap)
    .filter(([category]) => category !== "Get Started")
    .flatMap(([category, components]) =>
      components.map((component: ComponentEntry) => ({
        ...component,
        category,
        id: `${category}-${component.name}`,
      }))
    );

  // Perfect bento grid pattern - optimized for tight layout
  const gridClasses = [
    "col-span-5 row-span-10", // 0
    "col-span-2 row-span-1", // 1
    "col-span-1 row-span-2", // 2
    "col-span-2 row-span-1", // 3
    "col-span-1 row-span-1", // 4
    "col-span-2 row-span-2", // 5
    "col-span-1 row-span-1", // 6
    "col-span-1 row-span-1", // 7
    "col-span-1 row-span-2", // 8
    "col-span-2 row-span-1", // 9
    "col-span-1 row-span-1", // 10
    "col-span-1 row-span-1", // 11
  ];

  return (
    <div className="bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-2 py-4 max-w-7xl">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-2">
            VUI Component Gallery
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Beautiful, responsive components for modern applications
          </p>
        </div>

        {/* Ultra-tight Bento Grid - No gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 auto-rows-min">
          {allComponents.slice(0, 12).map((component, index) => {
            const ComponentToRender = component.component;
            const gridClass = gridClasses[index % gridClasses.length];
            const isLarge =
              gridClass.includes("row-span-2") &&
              gridClass.includes("col-span-2");
            const isTall =
              gridClass.includes("row-span-2") &&
              !gridClass.includes("col-span-2");
            const isWide =
              gridClass.includes("col-span-2") &&
              !gridClass.includes("row-span-2");

            return (
              <Card
                key={component.id}
                className={`
                  ${gridClass}
                  ${
                    isLarge
                      ? "min-h-[260px]"
                      : isTall
                      ? "min-h-[220px]"
                      : isWide
                      ? "min-h-[130px]"
                      : "min-h-[150px]"
                  }
                  group relative overflow-hidden
                  border transition-all duration-500 ease-out
                  hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5
                  bg-card/95 backdrop-blur-sm
                  hover:bg-card
                  transform hover:-translate-y-0.5
                  ${
                    activeCard === index
                      ? "ring-1 ring-primary/30 shadow-md shadow-primary/10"
                      : ""
                  }
                  rounded-lg
                `}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/2 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Ultra-compact Category Badge */}
                <div className="absolute top-1.5 right-1.5 z-10">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-background/95 backdrop-blur-sm border-0 px-1.5 py-0.5 group-hover:bg-primary/10 transition-colors"
                  >
                    {component.category}
                  </Badge>
                </div>

                {/* Minimal Header */}
                <CardHeader className="pb-1 pt-2 px-2">
                  <CardTitle className="text-xs font-semibold group-hover:text-primary transition-colors leading-tight truncate">
                    {component.name}
                  </CardTitle>
                </CardHeader>

                {/* Optimized Preview Area with perfect containment */}
                <div className="flex-1 flex items-center justify-center">
                  <div
                    className="
                      w-full h-full 
                      bg-gradient-to-br from-muted/10 to-muted/5 
                      group-hover:bg-gradient-to-br group-hover:from-muted/20 group-hover:to-muted/10
                      group-hover:border-primary/15
                      transition-all duration-500
                    "
                  >
                    {/* Minimal inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/1 via-transparent to-secondary/1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <ComponentPreview
                      component={ComponentToRender}
                      name={component.name}
                      isActive={activeCard === index}
                    />
                  </div>
                </div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Compact Stats */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: allComponents.length, label: "Components" },
              { value: Object.keys(componentMap).length, label: "Categories" },
              { value: "100%", label: "Responsive" },
              { value: "∞", label: "Customizable" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
