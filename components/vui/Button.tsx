"use client";

import { Button } from "@/components/ui/buttonShadcn";
import { FlipButton } from "./buttons/FlipButton";
import MagneticButton from "./buttons/MagneticButton";
import { AnimatedOpenInV0Button } from "./buttons/OpenInv0";
import { ShimmerButton } from "./buttons/ShimmerButton";
import { ShinyButton } from "./buttons/ShinyButtons";
import { SpotlightButton } from "./buttons/SpotLight";
import VideoButton from "./buttons/VideoButton";

interface ButtonShowcaseProps {
  className?: string;
}

export function ButtonShowcase({ className }: ButtonShowcaseProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl space-y-12 p-8 ${className}`}>
      {/* Flip Buttons Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 font-semibold text-2xl">Flip Buttons</h2>
          <p className="text-muted-foreground">
            3D flip animations from different directions
          </p>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-2">
            <FlipButton backText="From Top!" from="top" frontText="Hover me" />
            <span className="text-muted-foreground text-xs">From Top</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FlipButton
              backText="From Bottom!"
              from="bottom"
              frontText="Hover me"
            />
            <span className="text-muted-foreground text-xs">From Bottom</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FlipButton
              backText="From Left!"
              from="left"
              frontText="Hover me"
            />
            <span className="text-muted-foreground text-xs">From Left</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FlipButton
              backText="From Right!"
              from="right"
              frontText="Hover me"
            />
            <span className="text-muted-foreground text-xs">From Right</span>
          </div>
        </div>
      </section>

      {/* Interactive Buttons Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 font-semibold text-2xl">Interactive Buttons</h2>
          <p className="text-muted-foreground">
            Buttons with dynamic hover and magnetic effects
          </p>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4">
            <MagneticButton distance={0.6}>
              <Button className="rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
                Magnetic Button
              </Button>
            </MagneticButton>
            <span className="text-center text-muted-foreground text-xs">
              Follows your cursor
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <SpotlightButton text="Spotlight Effect" />
            <span className="text-center text-muted-foreground text-xs">
              Radial gradient spotlight
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <AnimatedOpenInV0Button url="https://google.com" />
            <span className="text-center text-muted-foreground text-xs">
              Open in v0 with animation
            </span>
          </div>
        </div>
      </section>

      {/* Shimmer & Shine Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 font-semibold text-2xl">
            Shimmer & Shine Effects
          </h2>
          <p className="text-muted-foreground">
            Buttons with beautiful light and shimmer animations
          </p>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-4">
            <ShimmerButton
              background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              className="px-8 py-3 font-semibold"
              shimmerColor="#ffffff"
            >
              Shimmer Button
            </ShimmerButton>
            <span className="text-center text-muted-foreground text-xs">
              Rotating shimmer effect
            </span>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <ShinyButton className="border-pink-500/20 bg-linear-to-r from-pink-500 to-violet-500 px-8 py-3">
              Shiny Button
            </ShinyButton>
            <span className="text-center text-muted-foreground text-xs">
              Moving shine animation
            </span>
          </div>
        </div>
      </section>

      {/* Special Effects Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 font-semibold text-2xl">Special Effects</h2>
          <p className="text-muted-foreground">
            Unique button designs with video backgrounds and special effects
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="scale-75 transform">
              <VideoButton />
            </div>
            <span className="text-center text-muted-foreground text-xs">
              Video background button
            </span>
          </div>
        </div>
      </section>

      {/* Color Variations Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 font-semibold text-2xl">Color Variations</h2>
          <p className="text-muted-foreground">
            Different color schemes for the same button types
          </p>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2">
            <ShimmerButton
              background="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
              className="px-6 py-2"
              shimmerColor="#ff6b6b"
            >
              Pink Shimmer
            </ShimmerButton>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <ShimmerButton
              background="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
              className="px-6 py-2"
              shimmerColor="#4ecdc4"
            >
              Teal Shimmer
            </ShimmerButton>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <ShimmerButton
              background="linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
              className="px-6 py-2"
              shimmerColor="#ffd93d"
            >
              Gold Shimmer
            </ShimmerButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ButtonTheme() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <MagneticButton distance={0.6}>
        <Button className="rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
          Magnetic Button
        </Button>
      </MagneticButton>
      <ShimmerButton
        background="linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
        className="px-6 py-2"
        shimmerColor="#ffd93d"
      >
        Gold Shimmer
      </ShimmerButton>
      <AnimatedOpenInV0Button url="https://google.com" />
      <FlipButton backText="From Top!" from="top" frontText="Hover me" />
      <FlipButton backText="From Bottom!" from="bottom" frontText="Hover me" />
      <FlipButton backText="From Left!" from="left" frontText="Hover me" />
      <FlipButton backText="From Right!" from="right" frontText="Hover me" />
      <SpotlightButton text="Spotlight Effect" />
    </div>
  );
}
