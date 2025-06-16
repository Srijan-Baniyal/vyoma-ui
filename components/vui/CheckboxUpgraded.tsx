"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// Enhanced animated check icon with multiple animation styles
const AnimatedCheckIcon = ({
  variant = "default",
  colorScheme = "default",
}: {
  variant?: "default" | "bouncy" | "smooth" | "elastic";
  colorScheme?: "default" | "success" | "warning" | "error" | "purple" | "blue";
}) => {
  const pathRef = React.useRef<SVGPathElement>(null);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    const checkboxElement = pathRef.current?.closest('[data-slot="checkbox"]');
    if (!checkboxElement) return;

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
      default: "#1d4ed8", // blue-700 - darker for better contrast
      success: "#16a34a", // green-600 - darker for better contrast
      warning: "#d97706", // amber-600 - darker for better contrast
      error: "#dc2626", // red-600 - darker for better contrast
      purple: "#9333ea", // purple-600 - darker for better contrast
      blue: "#1d4ed8", // blue-700 - darker for better contrast
    };
    return colors[colorScheme];
  };

  const getAnimationStyle = () => {
    const baseStyle = {
      strokeDasharray: 20,
      strokeDashoffset: isChecked ? 0 : 20,
      transformOrigin: "center",
      stroke: getTickColor(),
    };

    switch (variant) {
      case "default":
        return {
          ...baseStyle,
          transition: "stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        };
      case "bouncy":
        return {
          ...baseStyle,
          transition: isChecked
            ? "stroke-dashoffset 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "stroke-dashoffset 0.3s ease-out",
          strokeDashoffset: isChecked ? 0 : 20,
        };
      case "smooth":
        return {
          ...baseStyle,
          transition:
            "stroke-dashoffset 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      case "elastic":
        return {
          ...baseStyle,
          transition: isChecked
            ? "stroke-dashoffset 0.7s cubic-bezier(0.68, -0.6, 0.32, 1.6), transform 0.7s cubic-bezier(0.68, -0.6, 0.32, 1.6)"
            : "stroke-dashoffset 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transform: isChecked
            ? "scale(1.05) rotate(2deg)"
            : "scale(0.7) rotate(-8deg)",
          strokeDashoffset: isChecked ? 0 : 20,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <svg
      viewBox="0 0 13 10"
      height="10px"
      width="13px"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <path
        ref={pathRef}
        d="M1 5.39437L4.54286 9L12 1"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={getAnimationStyle()}
        fill="none"
      />
    </svg>
  );
};

// Ripple effect component
const RippleEffect = ({ trigger }: { trigger: boolean }) => {
  const [ripples, setRipples] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (trigger) {
      const newRipple = Date.now();
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple !== newRipple));
      }, 600);
    }
  }, [trigger]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[6px] pointer-events-none">
      {ripples.map((ripple) => (
        <div
          key={ripple}
          className="absolute inset-0 bg-primary/20 rounded-[6px]"
          style={{
            animation: "ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            transformOrigin: "center",
            transform: "scale(0)",
            opacity: 1,
          }}
        />
      ))}
      <style jsx global>{`
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
      `}</style>
    </div>
  );
};

interface CheckboxUpgradedProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label: string;
  variant?: "default" | "bouncy" | "smooth" | "elastic";
  size?: "sm" | "md" | "lg";
  colorScheme?: "default" | "success" | "warning" | "error" | "purple" | "blue";
  description?: string;
  showRipple?: boolean;
}

const CheckboxUpgraded = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxUpgradedProps
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
        "bg-white data-[state=checked]:border-primary data-[state=checked]:bg-white data-[state=checked]:text-primary",
      success:
        "bg-white data-[state=checked]:border-green-500 data-[state=checked]:bg-white data-[state=checked]:text-green-500",
      warning:
        "bg-white data-[state=checked]:border-amber-500 data-[state=checked]:bg-white data-[state=checked]:text-amber-500",
      error:
        "bg-white data-[state=checked]:border-red-500 data-[state=checked]:bg-white data-[state=checked]:text-red-500",
      purple:
        "bg-white data-[state=checked]:border-purple-500 data-[state=checked]:bg-white data-[state=checked]:text-purple-500",
      blue: "bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500",
    };

    const handleCheckedChange = (checked: boolean | "indeterminate") => {
      if (showRipple) {
        setRippleTrigger((prev) => !prev);
      }
      props.onCheckedChange?.(checked);
    };

    return (
      <div className="group flex items-start gap-3 relative">
        <div className="relative">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            data-slot="checkbox"
            className={cn(
              "peer shrink-0 rounded-[6px] border border-gray-300 bg-white shadow-xs transition-all duration-300 hover:border-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 group-data-[disabled=true]:hover:border-gray-300 aria-invalid:border-destructive aria-invalid:ring-destructive/20 transform hover:scale-105 active:scale-95",
              sizeClasses[size],
              colorSchemes[colorScheme],
              "hover:shadow-md transition-shadow",
              className
            )}
            onCheckedChange={handleCheckedChange}
            {...props}
          >
            <CheckboxPrimitive.Indicator
              data-slot="checkbox-indicator"
              className="flex items-center justify-center text-current transition-all duration-200"
            >
              <AnimatedCheckIcon variant={variant} colorScheme={colorScheme} />
            </CheckboxPrimitive.Indicator>
            {showRipple && <RippleEffect trigger={rippleTrigger} />}
          </CheckboxPrimitive.Root>
        </div>
        <div className="flex flex-col gap-1">
          <Label
            htmlFor={checkboxId}
            className="cursor-pointer text-base font-medium transition-colors hover:text-primary"
          >
            {label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

CheckboxUpgraded.displayName = "CheckboxUpgraded";

export { CheckboxUpgraded };

export function CheckboxUpgradedShowcase() {
  const [states, setStates] = React.useState<{
    basic: boolean;
    interactive: boolean;
    controlled: boolean | "indeterminate";
  }>({
    basic: false,
    interactive: false,
    controlled: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CheckboxUpgraded Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of checkbox interactions with smooth
            animations, multiple variants, and beautiful visual feedback.
          </p>
        </div>

        {/* Animation Variants */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Animation Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-4">
              <h3 className="font-medium text-slate-700 dark:text-slate-300">
                Default
              </h3>
              <CheckboxUpgraded
                label="Smooth & Clean"
                variant="default"
                description="Perfect for professional interfaces"
              />
            </div>
            <div className="text-center space-y-4">
              <h3 className="font-medium text-slate-700 dark:text-slate-300">
                Bouncy
              </h3>
              <CheckboxUpgraded
                label="Playful Bounce"
                variant="bouncy"
                description="Adds personality to your forms"
              />
            </div>
            <div className="text-center space-y-4">
              <h3 className="font-medium text-slate-700 dark:text-slate-300">
                Smooth
              </h3>
              <CheckboxUpgraded
                label="Ultra Smooth"
                variant="smooth"
                description="Butter-smooth animation"
              />
            </div>
            <div className="text-center space-y-4">
              <h3 className="font-medium text-slate-700 dark:text-slate-300">
                Elastic
              </h3>
              <CheckboxUpgraded
                label="Elastic Spring"
                variant="elastic"
                description="Dynamic spring-like motion"
              />
            </div>
          </div>
        </div>

        {/* Size Variants */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Size Options
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <CheckboxUpgraded
              label="Small"
              size="sm"
              variant="bouncy"
              description="Compact for tight spaces"
            />
            <CheckboxUpgraded
              label="Medium"
              size="md"
              variant="bouncy"
              description="Perfect balance of size and visibility"
            />
            <CheckboxUpgraded
              label="Large"
              size="lg"
              variant="bouncy"
              description="Great for accessibility"
            />
          </div>
        </div>

        {/* Color Schemes */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Color Schemes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CheckboxUpgraded
              label="Default Theme"
              colorScheme="default"
              variant="elastic"
              defaultChecked
            />
            <CheckboxUpgraded
              label="Success Green"
              colorScheme="success"
              variant="elastic"
              defaultChecked
            />
            <CheckboxUpgraded
              label="Warning Amber"
              colorScheme="warning"
              variant="elastic"
              defaultChecked
            />
            <CheckboxUpgraded
              label="Error Red"
              colorScheme="error"
              variant="elastic"
              defaultChecked
            />
            <CheckboxUpgraded
              label="Purple Magic"
              colorScheme="purple"
              variant="elastic"
              defaultChecked
            />
            <CheckboxUpgraded
              label="Ocean Blue"
              colorScheme="blue"
              variant="elastic"
              defaultChecked
            />
          </div>
        </div>

        {/* Interactive States */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Interactive States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Normal States</h3>
              <CheckboxUpgraded
                label="Unchecked State"
                variant="smooth"
                colorScheme="blue"
                description="Click to see the beautiful animation"
              />
              <CheckboxUpgraded
                label="Pre-checked State"
                variant="smooth"
                colorScheme="success"
                defaultChecked
                description="Already checked with animation on load"
              />
              <CheckboxUpgraded
                label="Controlled Checkbox"
                variant="elastic"
                colorScheme="purple"
                checked={states.controlled}
                onCheckedChange={(checked) =>
                  setStates((prev) => ({
                    ...prev,
                    controlled: checked === true,
                  }))
                }
                description="Externally controlled state"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Disabled States</h3>
              <CheckboxUpgraded
                label="Disabled Unchecked"
                disabled
                variant="default"
                description="Cannot be interacted with"
              />
              <CheckboxUpgraded
                label="Disabled Checked"
                disabled
                defaultChecked
                variant="default"
                description="Locked in checked state"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() =>
                  setStates((prev) => ({ ...prev, controlled: true }))
                }
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Check Controlled
              </button>
              <button
                onClick={() =>
                  setStates((prev) => ({ ...prev, controlled: false }))
                }
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Uncheck Controlled
              </button>
              <button
                onClick={() =>
                  setStates((prev) => ({
                    ...prev,
                    controlled: "indeterminate",
                  }))
                }
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Set Indeterminate
              </button>
            </div>
            <p className="text-center mt-4 text-sm text-muted-foreground">
              Current controlled state:{" "}
              <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {String(states.controlled)}
              </span>
            </p>
          </div>
        </div>

        {/* Special Features */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Special Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <CheckboxUpgraded
                label="With Ripple Effect"
                variant="bouncy"
                colorScheme="blue"
                showRipple={true}
                description="Beautiful ripple animation on interaction"
              />
              <CheckboxUpgraded
                label="Without Ripple"
                variant="bouncy"
                colorScheme="purple"
                showRipple={false}
                description="Clean interaction without ripple"
              />
            </div>
            <div className="space-y-4">
              <CheckboxUpgraded
                label="Long Label with Description"
                variant="elastic"
                colorScheme="success"
                description="This checkbox demonstrates how the component handles longer labels and descriptions gracefully. The layout remains clean and readable even with extensive text content."
              />
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Real-World Examples
          </h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Settings Panel</h3>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 space-y-4">
                <CheckboxUpgraded
                  label="Enable notifications"
                  variant="smooth"
                  colorScheme="default"
                  description="Receive email notifications for important updates"
                />
                <CheckboxUpgraded
                  label="Auto-save documents"
                  variant="smooth"
                  colorScheme="success"
                  defaultChecked
                  description="Automatically save your work every 5 minutes"
                />
                <CheckboxUpgraded
                  label="Dark mode"
                  variant="elastic"
                  colorScheme="purple"
                  description="Switch to dark theme for better night viewing"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Terms & Conditions</h3>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 space-y-4">
                <CheckboxUpgraded
                  label="I agree to the Terms of Service"
                  variant="bouncy"
                  colorScheme="blue"
                  size="lg"
                  description="By checking this box, you acknowledge that you have read and agree to our Terms of Service"
                />
                <CheckboxUpgraded
                  label="Subscribe to marketing emails"
                  variant="default"
                  colorScheme="default"
                  description="Optional: Receive updates about new features and promotions"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
