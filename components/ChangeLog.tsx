"use client";

import {
  IconCode as Code,
  IconGift as Gift,
  IconMoon as Moon,
  IconPackage as Package,
  IconPalette as Palette,
  IconRocket as Rocket,
  IconDeviceMobile as Smartphone,
  IconSparkles as Sparkles,
  IconStar as Star,
  IconBolt as Zap,
} from "@tabler/icons-react";
import { Timeline } from "@/components/ui/TimeLine";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ChangeLog() {
  const isMobile = useIsMobile();

  const data = [
    {
      title: "July 09, 2025 - v1.0.0 Public Release",
      date: "July 9, 2025",
      icon: <Gift />,
      tag: "Major Release",
      color: "purple",
      content: (
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <div className="mb-4 text-6xl">🎉</div>
            <p
              className={`${
                isMobile ? "text-sm" : "text-base"
              } font-medium text-neutral-800 leading-relaxed dark:text-neutral-200`}
            >
              We&apos;re thrilled to announce the public release of{" "}
              <strong>VyomaUI v1.0.0</strong>! Our comprehensive React component
              library is now available to help developers build beautiful,
              modern interfaces with ease. This release includes{" "}
              <strong>40+ carefully crafted components</strong> with TypeScript
              support, dark mode compatibility, and stunning animations.
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h4
                className={`${
                  isMobile ? "text-lg" : "text-xl"
                } mb-6 flex items-center justify-center gap-2 font-bold text-neutral-900 dark:text-neutral-100`}
              >
                <Rocket className="h-5 w-5 text-purple-600" />
                Core Components Released
              </h4>
            </div>

            <div
              className={`grid ${
                isMobile
                  ? "grid-cols-1 gap-4"
                  : "grid-cols-1 gap-6 lg:grid-cols-2"
              }`}
            >
              {/* Interactive Buttons */}
              <div className="rounded-xl border border-blue-200 bg-linear-to-br from-blue-50 to-blue-100 p-4 dark:border-blue-700/50 dark:from-blue-900/20 dark:to-blue-800/20">
                <div className="mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <h5
                    className={`${
                      isMobile ? "text-sm" : "text-base"
                    } font-semibold text-blue-900 dark:text-blue-100`}
                  >
                    Interactive Buttons
                  </h5>
                </div>
                <div
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } space-y-1 text-blue-800 dark:text-blue-200`}
                >
                  <div>• FlipButton - Smooth flip animations</div>
                  <div>• MagneticButton - Magnetic hover effects</div>
                  <div>• ShimmerButton - Elegant shimmer effects</div>
                  <div>• ShinyButtons - Premium shine animations</div>
                  <div>• SpotLight - Interactive spotlight effects</div>
                </div>
              </div>

              {/* Text Animations */}
              <div className="rounded-xl border border-green-200 bg-linear-to-br from-green-50 to-green-100 p-4 dark:border-green-700/50 dark:from-green-900/20 dark:to-green-800/20">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-green-600" />
                  <h5
                    className={`${
                      isMobile ? "text-sm" : "text-base"
                    } font-semibold text-green-900 dark:text-green-100`}
                  >
                    Text Animations
                  </h5>
                </div>
                <div
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } space-y-1 text-green-800 dark:text-green-200`}
                >
                  <div>• AnimatedNumber - Smooth number transitions</div>
                  <div>• CountUp - Dynamic counting animations</div>
                  <div>• TextDecryption - Matrix-style text reveals</div>
                  <div>• TypingText - Realistic typing effects</div>
                </div>
              </div>

              {/* Layout Components */}
              <div className="rounded-xl border border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-4 dark:border-purple-700/50 dark:from-purple-900/20 dark:to-purple-800/20">
                <div className="mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-600" />
                  <h5
                    className={`${
                      isMobile ? "text-sm" : "text-base"
                    } font-semibold text-purple-900 dark:text-purple-100`}
                  >
                    Layout & Structure
                  </h5>
                </div>
                <div
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } space-y-1 text-purple-800 dark:text-purple-200`}
                >
                  <div>• BentoGrid - Modern grid layouts</div>
                  <div>• Card - Versatile content containers</div>
                  <div>• Sheet - Slide-out panels</div>
                  <div>• Accordion - Collapsible content sections</div>
                  <div>• Navigation - Advanced navigation systems</div>
                </div>
              </div>

              {/* Form Elements */}
              <div className="rounded-xl border border-orange-200 bg-linear-to-br from-orange-50 to-orange-100 p-4 dark:border-orange-700/50 dark:from-orange-900/20 dark:to-orange-800/20">
                <div className="mb-3 flex items-center gap-2">
                  <Code className="h-4 w-4 text-orange-600" />
                  <h5
                    className={`${
                      isMobile ? "text-sm" : "text-base"
                    } font-semibold text-orange-900 dark:text-orange-100`}
                  >
                    Form & Input
                  </h5>
                </div>
                <div
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } space-y-1 text-orange-800 dark:text-orange-200`}
                >
                  <div>• CheckboxUpgraded - Enhanced checkboxes</div>
                  <div>• WheelPicker - Smooth wheel selectors</div>
                </div>
              </div>
              {/* Navigation & Utils */}
              <div className="rounded-xl border border-indigo-200 bg-linear-to-br from-indigo-50 to-indigo-100 p-4 dark:border-indigo-700/50 dark:from-indigo-900/20 dark:to-indigo-800/20">
                <div className="mb-3 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-indigo-600" />
                  <h5
                    className={`${
                      isMobile ? "text-sm" : "text-base"
                    } font-semibold text-indigo-900 dark:text-indigo-100`}
                  >
                    Navigation & Utils
                  </h5>
                </div>
                <div
                  className={`${
                    isMobile ? "text-xs" : "text-sm"
                  } space-y-1 text-indigo-800 dark:text-indigo-200`}
                >
                  <div>• ResizeableNavbar - Adaptive navigation</div>
                  <div>• ToolTip - Contextual information</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-slate-100 p-6 dark:border-slate-700/50 dark:from-slate-900/50 dark:to-slate-800/50">
            <h4
              className={`${
                isMobile ? "text-lg" : "text-xl"
              } mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100`}
            >
              <Star className="h-5 w-5 text-yellow-500" />
              Key Features & Benefits
            </h4>
            <div
              className={`grid ${
                isMobile ? "grid-cols-1 gap-3" : "grid-cols-2 gap-4"
              } ${isMobile ? "text-sm" : "text-base"}`}
            >
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Code className="h-4 w-4 shrink-0 text-blue-600" />
                <span>Full TypeScript support</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Moon className="h-4 w-4 shrink-0 text-indigo-600" />
                <span>Complete dark mode compatibility</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Zap className="h-4 w-4 shrink-0 text-yellow-600" />
                <span>Optimized performance</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Smartphone className="h-4 w-4 shrink-0 text-green-600" />
                <span>Fully responsive design</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Palette className="h-4 w-4 shrink-0 text-purple-600" />
                <span>Customizable with Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Package className="h-4 w-4 shrink-0 text-orange-600" />
                <span>Easy npm/yarn installation</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline
        data={data}
        subtitle={
          isMobile
            ? "Building the future of React components"
            : "A journey through remarkable milestones and revolutionary component development"
        }
        title="VyomaUI Evolution"
      />
    </div>
  );
}
