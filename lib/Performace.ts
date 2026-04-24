"use client";

// Type definition for BatteryManager if not present
// See: https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => void) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => void) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => void) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => void) | null;
}
const MOBILE_DEVICE_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

// Detect device performance capabilities
export function detectDevicePerformance(): number {
  // Start with a base performance factor
  let performanceFactor = 1.0;

  // Check for low-end devices
  if (navigator.hardwareConcurrency) {
    // Adjust based on CPU cores
    if (navigator.hardwareConcurrency <= 2) {
      performanceFactor *= 0.5; // Low-end device
    } else if (navigator.hardwareConcurrency >= 8) {
      performanceFactor *= 1.5; // High-end device
    }
  }

  // Check for mobile devices
  if (MOBILE_DEVICE_REGEX.test(navigator.userAgent)) {
    performanceFactor *= 0.7; // Mobile devices generally have less GPU power
  }

  // Check for battery status if available
  if ("getBattery" in navigator) {
    // @ts-expect-error - getBattery is not in the standard navigator type
    navigator
      .getBattery()
      .then((battery: BatteryManager) => {
        if (battery.charging === false && battery.level < 0.2) {
          performanceFactor *= 0.8; // Reduce performance on low battery
        }
      })
      .catch(() => {
        // Battery API not available, ignore
      });
  }

  // Check for reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    performanceFactor *= 0.5; // Respect user's motion preference
  }

  // Detect WebGL capabilities as a proxy for GPU power
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext;

    if (gl) {
      // Check for WebGL extensions and capabilities
      const extensions = gl.getSupportedExtensions();
      if (extensions && extensions.length < 20) {
        performanceFactor *= 0.8; // Limited WebGL support
      }
    } else {
      performanceFactor *= 0.6; // WebGL not supported
    }
  } catch {
    performanceFactor *= 0.7; // Error detecting WebGL
  }

  // Clamp the performance factor to a reasonable range
  return Math.max(0.3, Math.min(2.0, performanceFactor));
}

// Check if the browser supports required features
export function checkBrowserSupport(): {
  supported: boolean;
  features: { [key: string]: boolean };
} {
  const features = {
    canvas: !!document.createElement("canvas").getContext,
    requestAnimationFrame: !!window.requestAnimationFrame,
    devicePixelRatio: !!window.devicePixelRatio,
    resizeObserver: !!window.ResizeObserver,
  };

  const supported = Object.values(features).every(Boolean);

  return { supported, features };
}
