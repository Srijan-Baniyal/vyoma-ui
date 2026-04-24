"use client";

import ParticleSettingsButton from "@/lib/ParticleSetting";
import { cn } from "@/lib/utils";
import {
  ParticleProvider,
  useOptionalParticleContext,
  useParticleContext,
} from "@/providers/ParticleProvider";

interface BackgroundProps {
  className?: string;
  settingsButtonClassName?: string;
  settingsButtonPosition?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "custom";
  showControls?: boolean;
}

export default function Background({
  showControls = false,
  className = "",
  settingsButtonPosition = "top-right",
  settingsButtonClassName = "",
}: BackgroundProps) {
  const context = useOptionalParticleContext();

  if (!context) {
    return (
      <ParticleProvider>
        <BackgroundCanvas
          className={className}
          settingsButtonClassName={settingsButtonClassName}
          settingsButtonPosition={settingsButtonPosition}
          showControls={showControls}
        />
      </ParticleProvider>
    );
  }

  return (
    <BackgroundCanvas
      className={className}
      settingsButtonClassName={settingsButtonClassName}
      settingsButtonPosition={settingsButtonPosition}
      showControls={showControls}
    />
  );
}

function BackgroundCanvas({
  showControls = false,
  className = "",
  settingsButtonPosition = "top-right",
  settingsButtonClassName = "",
}: BackgroundProps) {
  const {
    canvasRef,
    settings,
    updateSettings,
    particleCount,
    fps,
    isEnabled,
    toggleSystem,
  } = useParticleContext();

  return (
    <>
      <canvas
        className={cn("fixed top-0 left-0 -z-10 h-full w-full", className)}
        id="particle-canvas"
        ref={canvasRef}
      />

      {/* Settings button */}
      {showControls && (
        <ParticleSettingsButton
          className={settingsButtonClassName}
          fps={fps}
          isEnabled={isEnabled}
          particleCount={particleCount}
          position={settingsButtonPosition}
          settings={settings}
          toggleSystem={toggleSystem}
          updateSettings={updateSettings}
        />
      )}
    </>
  );
}
