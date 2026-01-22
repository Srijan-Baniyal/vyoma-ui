"use client";

import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type ComponentEntry, componentMap } from "@/data/ComponentMapping";

const CARD_CONFIG = {
  height: "h-[45rem]",
  cols: "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2",
};

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
        className={`relative flex h-full w-full items-center justify-center transition-all duration-300 ease-out ${isActive ? "scale-[1.01]" : "scale-100"}overflow-hidden`}
      >
        <div
          className={`relative h-full w-full p-4 ${
            name.toLowerCase() !== "bento grid"
              ? "flex items-center justify-center"
              : ""
          }`}
        >
          <div
            className={`max-h-full max-w-full ${
              name.toLowerCase() !== "bento grid"
                ? "flex items-center justify-center"
                : ""
            }`}
          >
            <Component />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering ${name}:`, error);
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-linear-to-r from-primary/20 to-secondary/20" />
          <p className="font-medium text-sm">{name}</p>
          <p className="text-sm opacity-60">Preview</p>
        </div>
      </div>
    );
  }
}

export default function ThemeSwitcher() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const allComponents = Object.entries(componentMap)
    .filter(([category]) => category !== "Get Started")
    .flatMap(([category, components]) =>
      components
        .map((component: ComponentEntry) => ({
          ...component,
          category,
          id: `${category}-${component.name}`,
        }))
        .filter((component) => component.name !== "Navigation")
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6">
        <div className="mb-8 text-center">
          <h1 className="mb-3 bg-linear-to-r from-primary via-secondary to-primary bg-clip-text font-bold text-2xl text-transparent tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            VUI Component Gallery
          </h1>
          <p className="mx-auto mb-4 max-w-2xl px-4 text-muted-foreground text-sm sm:text-base">
            Beautiful, responsive components for modern applications
          </p>
        </div>

        <div className={`grid ${CARD_CONFIG.cols} gap-4 sm:gap-6 lg:gap-8`}>
          {allComponents.map((component, index) => {
            const ComponentToRender = component.theme || component.component;

            return (
              <Card
                className={`group relative overflow-hidden ${CARD_CONFIG.height} w-full transform border bg-card/95 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/10 ${
                  activeCard === index
                    ? "-translate-y-1 shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                    : ""
                }
                `}
                key={component.id}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="absolute top-3 left-3 z-20">
                  <Badge
                    className="bg-background/80 text-xs backdrop-blur-sm"
                    variant="outline"
                  >
                    {component.category}
                  </Badge>
                </div>

                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 m-3 rounded-lg bg-linear-to-br from-muted/10 to-muted/5 transition-all duration-300 group-hover:from-muted/20 group-hover:to-muted/10">
                    <ComponentPreview
                      component={ComponentToRender}
                      isActive={activeCard === index}
                      name={component.name}
                    />
                  </div>
                </div>

                <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-card via-card/90 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-foreground text-sm sm:text-base">
                        {component.name}
                      </h3>
                      <p className="truncate text-muted-foreground text-xs sm:text-sm">
                        {component.category}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
