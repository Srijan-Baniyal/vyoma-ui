"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// Enhanced types for better developer experience
type NumberFormat =
  | "default"
  | "currency"
  | "percentage"
  | "compact"
  | "scientific";

type AnimationEffect = "none" | "fade" | "slide" | "bounce" | "elastic";

interface CountUpProps {
  // Core functionality
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;

  // Styling
  className?: string;
  style?: React.CSSProperties;

  // Animation controls
  startWhen?: boolean;
  effect?: AnimationEffect;
  stiffness?: number;
  damping?: number;

  // Formatting
  format?: NumberFormat;
  separator?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locale?: string;
  currency?: string;

  // Advanced features
  enableGlow?: boolean;
  colorTransition?: boolean;
  hoverEffect?: boolean;

  // Accessibility
  ariaLabel?: string;
  announceValue?: boolean;
  reducedMotion?: boolean;

  // Callbacks
  onStart?: () => void;
  onEnd?: () => void;
  onUpdate?: (value: number) => void;

  // Advanced customization
  renderValue?: (value: number, formattedValue: string) => React.ReactNode;
  debug?: boolean;
}

export function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  style = {},
  startWhen = true,
  effect = "none",
  stiffness,
  damping,
  format = "default",
  separator = "",
  prefix = "",
  suffix = "",
  decimals = 0,
  locale = "en-US",
  currency = "USD",
  enableGlow = false,
  hoverEffect = false,
  ariaLabel,
  announceValue = false,
  reducedMotion = false,
  onStart,
  onEnd,
  onUpdate,
  renderValue,
  debug = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [currentValue, setCurrentValue] = useState(
    direction === "down" ? to : from
  );
  const [isHovered, setIsHovered] = useState(false);

  const motionValue = useMotionValue(direction === "down" ? to : from);

  // Respect user's reduced motion preference
  const shouldReduceMotion =
    reducedMotion ||
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Dynamic spring configuration
  const springConfig = {
    damping: damping || 20 + 40 * (1 / duration),
    stiffness: stiffness || 100 * (1 / duration),
    ...(shouldReduceMotion && { duration: 0.1 }),
  };

  const springValue = useSpring(motionValue, springConfig);

  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Enhanced number formatting
  const formatNumber = useCallback(
    (value: number): string => {
      const roundedValue = Number(value.toFixed(decimals));

      let formattedValue: string;

      switch (format) {
        case "currency":
          formattedValue = new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(roundedValue);
          break;

        case "percentage":
          formattedValue = new Intl.NumberFormat(locale, {
            style: "percent",
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(roundedValue / 100);
          break;

        case "compact":
          formattedValue = new Intl.NumberFormat(locale, {
            notation: "compact",
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(roundedValue);
          break;

        default: {
          const options: Intl.NumberFormatOptions = {
            useGrouping: !!separator,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          };

          formattedValue = new Intl.NumberFormat(locale, options).format(
            roundedValue
          );

          if (separator && separator !== ",") {
            formattedValue = formattedValue.replace(/,/g, separator);
          }
          break;
        }
      }

      return `${prefix}${formattedValue}${suffix}`;
    },
    [format, locale, currency, decimals, separator, prefix, suffix]
  );

  // Initialize display value
  useEffect(() => {
    if (ref.current && !renderValue) {
      const initialValue = direction === "down" ? to : from;
      ref.current.textContent = formatNumber(initialValue);
      setCurrentValue(initialValue);
    } else if (renderValue) {
      const initialValue = direction === "down" ? to : from;
      setCurrentValue(initialValue);
    }
  }, [from, to, direction, formatNumber, renderValue]);

  // Main animation effect
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === "function") {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    duration,
    onStart,
    onEnd,
  ]);

  // Handle value changes and effects
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const newValue = Number(latest);
      setCurrentValue(newValue);

      if (ref.current && !renderValue) {
        const formattedValue = formatNumber(newValue);
        ref.current.textContent = formattedValue;
      }

      if (typeof onUpdate === "function") {
        onUpdate(newValue);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatNumber, onUpdate, renderValue]);

  // Effect-specific animations
  const getEffectAnimation = () => {
    switch (effect) {
      case "fade":
        return {
          opacity: 1,
          transition: { duration: 0.5 },
        };

      case "slide":
        return {
          x: 0,
          transition: { duration: 0.5 },
        };

      case "bounce":
        return {
          y: 0,
          transition: {
            duration: 0.6,
          },
        };

      case "elastic":
        return {
          scale: 1,
          transition: {
            duration: 1,
          },
        };

      default:
        return {};
    }
  };

  // Accessibility attributes
  const accessibilityProps = {
    "aria-label": ariaLabel || `Count ${direction} from ${from} to ${to}`,
    "aria-live": announceValue ? ("polite" as const) : undefined,
    "aria-atomic": announceValue ? true : undefined,
    role: "status" as const,
  };

  // Dynamic styles
  const dynamicStyles = {
    ...style,
    filter: enableGlow ? "drop-shadow(0 0 10px currentColor)" : style.filter,
    transition: hoverEffect ? "all 0.3s ease" : style.transition,
    cursor: hoverEffect ? "pointer" : style.cursor,
    ...(isHovered &&
      hoverEffect && {
        transform: "scale(1.05)",
        filter: `brightness(1.2) ${
          enableGlow ? "drop-shadow(0 0 10px currentColor)" : ""
        }`,
      }),
  };

  const content = renderValue
    ? renderValue(currentValue, formatNumber(currentValue))
    : formatNumber(currentValue);

  if (debug) {
    console.log("CountUp Debug:", {
      currentValue,
      formattedValue: formatNumber(currentValue),
      isInView,
      effect,
      springConfig,
    });
  }

  return (
    <motion.span
      animate={getEffectAnimation()}
      className={`inline-block ${className}`}
      onHoverEnd={() => setIsHovered(false)}
      onHoverStart={() => setIsHovered(true)}
      ref={ref}
      style={dynamicStyles}
      {...accessibilityProps}
    >
      {content}
    </motion.span>
  );
}

// Showcase component for the component mapping
export default function CountUpShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <h3 className="mb-2 font-semibold text-lg">Basic Count Up</h3>
          <div className="font-bold text-3xl text-primary">
            <CountUp duration={2} to={100} />
          </div>
        </div>

        <div className="text-center">
          <h3 className="mb-2 font-semibold text-lg">With Prefix/Suffix</h3>
          <div className="font-bold text-3xl text-green-600">
            <CountUp duration={2.5} prefix="$" suffix="K" to={100} />
          </div>
        </div>

        <div className="text-center">
          <h3 className="mb-2 font-semibold text-lg">Percentage</h3>
          <div className="font-bold text-3xl text-blue-600">
            <CountUp duration={2} suffix="%" to={100} />
          </div>
        </div>

        <div className="text-center">
          <h3 className="mb-2 font-semibold text-lg">Bounce Effect</h3>
          <div className="font-bold text-3xl text-purple-600">
            <CountUp duration={3} effect="bounce" to={1000} />
          </div>
        </div>

        <div className="text-center">
          <h3 className="mb-2 font-semibold text-lg">Elastic Effect</h3>
          <div className="font-bold text-3xl text-orange-600">
            <CountUp duration={2.5} effect="elastic" to={1000} />
          </div>
        </div>

        <div className="text-center">
          <h3 className="mb-2 font-semibold text-lg">Custom Render</h3>
          <div className="font-bold text-3xl">
            <CountUp
              duration={2}
              renderValue={() => (
                <span className="bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  ∞
                </span>
              )}
              to={999}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CountUpTheme() {
  return <CountUp duration={2} to={100} />;
}
