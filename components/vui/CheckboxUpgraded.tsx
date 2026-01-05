"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Streamlined animated check icon with clean animation styles
const AnimatedCheckIcon = ({
  variant = "default",
  colorScheme = "default",
  size = "md",
}: {
  variant?: "default" | "smooth";
  colorScheme?: "default" | "success" | "warning" | "error" | "purple" | "blue";
  size?: "sm" | "md" | "lg";
}) => {
  const pathRef = React.useRef<SVGPathElement>(null);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    const checkboxElement = pathRef.current?.closest('[data-slot="checkbox"]');
    if (!checkboxElement) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-state"
        ) {
          const isNowChecked =
            checkboxElement.getAttribute("data-state") === "checked";
          setIsChecked(isNowChecked);
        }
      });
    });

    observer.observe(checkboxElement, { attributes: true });

    // Initial state check
    setIsChecked(checkboxElement.getAttribute("data-state") === "checked");

    return () => observer.disconnect();
  }, []);

  const getTickColor = () => {
    const colors = {
      default: "#1d4ed8",
      success: "#16a34a",
      warning: "#d97706",
      error: "#dc2626",
      purple: "#9333ea",
      blue: "#1d4ed8",
    };
    return colors[colorScheme];
  };

  const getSizeProps = () => {
    const sizes = {
      sm: {
        height: "8px",
        width: "10px",
        strokeWidth: "2",
        viewBox: "0 0 10 8",
        path: "M1 4L3.5 6.5L9 1",
      },
      md: {
        height: "10px",
        width: "13px",
        strokeWidth: "2.5",
        viewBox: "0 0 13 10",
        path: "M1 5.39437L4.54286 9L12 1",
      },
      lg: {
        height: "12px",
        width: "16px",
        strokeWidth: "3",
        viewBox: "0 0 16 12",
        path: "M1 6L5 10L15 1",
      },
    };
    return sizes[size];
  };

  const getAnimationStyle = () => {
    const sizeProps = getSizeProps();
    const baseStyle = {
      strokeDasharray: 20,
      strokeDashoffset: isChecked ? 0 : 20,
      stroke: getTickColor(),
      strokeWidth: sizeProps.strokeWidth,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      fill: "none",
    };

    switch (variant) {
      case "smooth":
        return {
          ...baseStyle,
          transition:
            "stroke-dashoffset 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      default:
        return {
          ...baseStyle,
          transition: "stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        };
    }
  };

  const sizeProps = getSizeProps();

  return (
    <svg
      className="overflow-visible"
      height={sizeProps.height}
      viewBox={sizeProps.viewBox}
      width={sizeProps.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={sizeProps.path} ref={pathRef} style={getAnimationStyle()} />
    </svg>
  );
};

// Refined ripple effect component
const RippleEffect = ({ trigger }: { trigger: boolean }) => {
  const [ripples, setRipples] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (trigger) {
      const newRipple = Date.now();
      setRipples((prev) => [...prev, newRipple]);

      const timer = setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple !== newRipple));
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[6px]">
        {ripples.map((ripple) => (
          <div
            className="absolute inset-0 animate-ripple rounded-[6px] bg-primary/20"
            key={ripple}
          />
        ))}
      </div>
      <style global jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center;
          transform: scale(0);
          opacity: 1;
        }
      `}</style>
    </>
  );
};

interface CheckboxRefinedProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label: string;
  variant?: "default" | "smooth";
  size?: "sm" | "md" | "lg";
  colorScheme?: "default" | "success" | "warning" | "error" | "purple" | "blue";
  description?: string;
  showRipple?: boolean;
}

const CheckboxRefined = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxRefinedProps
>(
  (
    {
      className,
      label,
      id,
      variant = "default",
      size = "md",
      colorScheme = "default",
      description,
      showRipple = true,
      ...props
    },
    ref
  ) => {
    const uId = React.useId();
    const checkboxId = id || uId;
    const [rippleTrigger, setRippleTrigger] = React.useState(false);

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    const colorSchemes = {
      default:
        "bg-white data-[state=checked]:border-primary data-[state=checked]:bg-white",
      success:
        "bg-white data-[state=checked]:border-green-500 data-[state=checked]:bg-white",
      warning:
        "bg-white data-[state=checked]:border-amber-500 data-[state=checked]:bg-white",
      error:
        "bg-white data-[state=checked]:border-red-500 data-[state=checked]:bg-white",
      purple:
        "bg-white data-[state=checked]:border-purple-500 data-[state=checked]:bg-white",
      blue: "bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-white",
    };

    const handleCheckedChange = (checked: boolean | "indeterminate") => {
      if (showRipple) {
        setRippleTrigger((prev) => !prev);
      }
      props.onCheckedChange?.(checked);
    };

    return (
      <div className="group flex items-start gap-3">
        <div className="relative">
          <CheckboxPrimitive.Root
            className={cn(
              "peer shrink-0 rounded-[6px] border border-gray-300 shadow-sm transition-all duration-200",
              "hover:border-primary hover:shadow-md focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
              "disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
              "transform hover:scale-105 active:scale-95",
              sizeClasses[size],
              colorSchemes[colorScheme],
              className
            )}
            data-slot="checkbox"
            id={checkboxId}
            onCheckedChange={handleCheckedChange}
            ref={ref}
            {...props}
          >
            <CheckboxPrimitive.Indicator
              className="flex items-center justify-center text-current"
              data-slot="checkbox-indicator"
            >
              <AnimatedCheckIcon
                colorScheme={colorScheme}
                size={size}
                variant={variant}
              />
            </CheckboxPrimitive.Indicator>
            {showRipple && <RippleEffect trigger={rippleTrigger} />}
          </CheckboxPrimitive.Root>
        </div>
        <div className="flex flex-col gap-1">
          <Label
            className="cursor-pointer font-medium text-sm transition-colors hover:text-primary"
            htmlFor={checkboxId}
          >
            {label}
          </Label>
          {description && (
            <p className="text-muted-foreground text-xs leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

CheckboxRefined.displayName = "CheckboxRefined";

export { CheckboxRefined };

export function CheckboxRefinedShowcase() {
  const [controlled, setControlled] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-5 overflow-hidden text-white">
      <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 py-8 md:space-y-32 md:px-8 md:py-16">
        {/* Interactive Animation Demo */}
        <div className="grid items-center gap-8 md:gap-16 lg:grid-cols-2">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-slate-400 text-sm md:text-base">
                Choose your preferred interaction style
              </p>
            </div>
            <div className="grid gap-4 md:gap-8">
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10 md:p-8">
                <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h3
                      className={`${isMobile ? "text-base" : "text-lg"} font-medium text-white`}
                    >
                      Default Animation
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm">
                      Clean and professional
                    </p>
                  </div>
                  <div
                    className={`${isMobile ? "h-8 w-8" : "h-12 w-12"} flex items-center justify-center rounded-xl bg-blue-500/20 transition-colors group-hover:bg-blue-500/30`}
                  >
                    <div
                      className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} rounded bg-blue-400 opacity-70`}
                    />
                  </div>
                </div>
                <CheckboxRefined
                  colorScheme="blue"
                  description="Crisp and immediate visual feedback"
                  label="Enable default animations"
                  size={isMobile ? "sm" : "md"}
                  variant="default"
                />
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/10 md:p-8">
                <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h3
                      className={`${isMobile ? "text-base" : "text-lg"} font-medium text-white`}
                    >
                      Smooth Animation
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm">
                      Fluid and elegant
                    </p>
                  </div>
                  <div
                    className={`${isMobile ? "h-8 w-8" : "h-12 w-12"} flex items-center justify-center rounded-xl bg-purple-500/20 transition-colors group-hover:bg-purple-500/30`}
                  >
                    <div
                      className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} rounded bg-purple-400 opacity-70`}
                    />
                  </div>
                </div>
                <CheckboxRefined
                  colorScheme="purple"
                  description="Graceful transitions with organic motion"
                  label="Enable smooth animations"
                  size={isMobile ? "sm" : "md"}
                  variant="smooth"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
            <div className="relative rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl md:p-12">
              <div className="space-y-6 text-center md:space-y-8">
                <h3
                  className={`${isMobile ? "text-lg" : "text-2xl"} font-light text-white`}
                >
                  Live Preview
                </h3>
                <div className="grid grid-cols-3 gap-4 md:gap-8">
                  <div className="space-y-4 text-center">
                    <div className="text-slate-400 text-xs md:text-sm">
                      Small
                    </div>
                    <CheckboxRefined
                      colorScheme="success"
                      label="SM"
                      size="sm"
                      variant="smooth"
                    />
                  </div>
                  <div className="space-y-4 text-center">
                    <div className="text-slate-400 text-xs md:text-sm">
                      Medium
                    </div>
                    <CheckboxRefined
                      colorScheme="blue"
                      label="MD"
                      size="md"
                      variant="smooth"
                    />
                  </div>
                  <div className="space-y-4 text-center">
                    <div className="text-slate-400 text-xs md:text-sm">
                      Large
                    </div>
                    <CheckboxRefined
                      colorScheme="purple"
                      label="LG"
                      size={isMobile ? "md" : "lg"}
                      variant="smooth"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette Showcase */}
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-slate-400 text-sm md:text-lg">
              Semantic colors that speak your design language
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
            {[
              {
                scheme: "default",
                label: "Default",
                color: "from-blue-500 to-blue-600",
                bg: "bg-blue-500/10",
              },
              {
                scheme: "success",
                label: "Success",
                color: "from-emerald-500 to-emerald-600",
                bg: "bg-emerald-500/10",
              },
              {
                scheme: "warning",
                label: "Warning",
                color: "from-amber-500 to-amber-600",
                bg: "bg-amber-500/10",
              },
              {
                scheme: "error",
                label: "Error",
                color: "from-red-500 to-red-600",
                bg: "bg-red-500/10",
              },
              {
                scheme: "purple",
                label: "Purple",
                color: "from-purple-500 to-purple-600",
                bg: "bg-purple-500/10",
              },
              {
                scheme: "blue",
                label: "Blue",
                color: "from-sky-500 to-sky-600",
                bg: "bg-sky-500/10",
              },
            ].map((item) => (
              <div
                className={`group p-3 md:p-6 ${item.bg} rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-105`}
                key={item.scheme}
              >
                <div className="space-y-3 md:space-y-4">
                  <div
                    className={`h-2 bg-gradient-to-r md:h-3 ${item.color} rounded-full`}
                  />
                  <CheckboxRefined
                    colorScheme={
                      item.scheme as
                        | "default"
                        | "success"
                        | "warning"
                        | "error"
                        | "purple"
                        | "blue"
                    }
                    defaultChecked
                    label={`${item.label} State`}
                    size={isMobile ? "sm" : "md"}
                    variant="smooth"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Features */}
        <div className="grid gap-8 md:gap-16 lg:grid-cols-2">
          <div className="space-y-6 md:space-y-8">
            <div>
              <p className="text-slate-400 text-sm md:text-base">
                Advanced interaction patterns for modern interfaces
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`font-medium text-white ${isMobile ? "text-sm" : "text-base"}`}
                  >
                    Ripple Effects
                  </span>
                  <div
                    className={`bg-blue-500/20 px-2 py-1 text-blue-300 md:px-3 ${isMobile ? "text-xs" : "text-xs"} rounded-full`}
                  >
                    Enhanced
                  </div>
                </div>
                <CheckboxRefined
                  colorScheme="blue"
                  label="Enable ripple animations"
                  showRipple={true}
                  size={isMobile ? "sm" : "md"}
                  variant="smooth"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`font-medium text-white ${isMobile ? "text-sm" : "text-base"}`}
                  >
                    Clean Interaction
                  </span>
                  <div
                    className={`bg-slate-500/20 px-2 py-1 text-slate-300 md:px-3 ${isMobile ? "text-xs" : "text-xs"} rounded-full`}
                  >
                    Minimal
                  </div>
                </div>
                <CheckboxRefined
                  colorScheme="purple"
                  label="Disable ripple effects"
                  showRipple={false}
                  size={isMobile ? "sm" : "md"}
                  variant="smooth"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div>
              <p className="text-slate-400 text-sm md:text-base">
                Programmatic control with external state management
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl md:p-8">
              <div className="space-y-4 text-center md:space-y-6">
                <div className="rounded-xl bg-black/20 p-4 md:p-6">
                  <CheckboxRefined
                    checked={controlled}
                    colorScheme="success"
                    description="State managed by external controls"
                    label="Externally controlled checkbox"
                    onCheckedChange={(checked) =>
                      setControlled(checked === true)
                    }
                    size={isMobile ? "sm" : "md"}
                    variant="smooth"
                  />
                </div>

                <div className="flex flex-col justify-center gap-3 md:flex-row md:gap-4">
                  <button
                    className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/25`}
                    onClick={() => setControlled(true)}
                  >
                    Activate
                  </button>
                  <button
                    className={`${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-slate-700 hover:to-slate-800 hover:shadow-slate-500/25`}
                    onClick={() => setControlled(false)}
                  >
                    Deactivate
                  </button>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 md:px-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        controlled ? "bg-emerald-400" : "bg-slate-400"
                      } transition-colors`}
                    />
                    <span
                      className={`${isMobile ? "text-xs" : "text-sm"} text-slate-300`}
                    >
                      State:{" "}
                      <span className="font-mono text-white">
                        {String(controlled)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckboxRefinedTheme() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="space-y-4 text-center">
        <p className="text-slate-400 text-sm md:text-lg">
          Semantic colors that speak your design language
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {[
          {
            scheme: "default",
            label: "Default",
            color: "from-blue-500 to-blue-600",
            bg: "bg-blue-500/10",
          },
          {
            scheme: "success",
            label: "Success",
            color: "from-emerald-500 to-emerald-600",
            bg: "bg-emerald-500/10",
          },
          {
            scheme: "warning",
            label: "Warning",
            color: "from-amber-500 to-amber-600",
            bg: "bg-amber-500/10",
          },
          {
            scheme: "error",
            label: "Error",
            color: "from-red-500 to-red-600",
            bg: "bg-red-500/10",
          },
          {
            scheme: "purple",
            label: "Purple",
            color: "from-purple-500 to-purple-600",
            bg: "bg-purple-500/10",
          },
          {
            scheme: "blue",
            label: "Blue",
            color: "from-sky-500 to-sky-600",
            bg: "bg-sky-500/10",
          },
        ].map((item) => (
          <div
            className={`group p-3 md:p-6 ${item.bg} rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-105`}
            key={item.scheme}
          >
            <div className="space-y-3 md:space-y-4">
              <div
                className={`h-2 bg-gradient-to-r md:h-3 ${item.color} rounded-full`}
              />
              <CheckboxRefined
                colorScheme={
                  item.scheme as
                    | "default"
                    | "success"
                    | "warning"
                    | "error"
                    | "purple"
                    | "blue"
                }
                defaultChecked
                label={`${item.label} State`}
                size={isMobile ? "sm" : "md"}
                variant="smooth"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
