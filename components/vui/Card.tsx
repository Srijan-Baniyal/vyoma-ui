"use client";

import Image, { type StaticImageData } from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import GIRL from "@/public/BG.jpg";

interface VuiCardProps {
  imageSrc: StaticImageData | string;
  imageAlt: string;
  category?: string;
  title?: string;
  description?: React.ReactNode;
}

function VuiCard({
  imageSrc,
  imageAlt,
  category = "Animations / Design / Branding",
  title = "Ideas Made Visuals",
  description = (
    <>
      We help brands break the mold with visuals that do{" "}
      <span className="text-orange-400">more than look good</span> — they tell{" "}
      <span className="text-orange-400">stories, spark</span> interest, and
      drive action.
    </>
  ),
}: VuiCardProps) {
  const isMobile = useIsMobile();

  return (
    <Card className="h-full w-full overflow-hidden border border-gray-500 bg-white/5 backdrop-blur-md">
      <Image
        alt={imageAlt}
        aria-hidden="true"
        className="object-cover"
        fill
        priority
        src={imageSrc}
      />
      <div
        className={`absolute inset-1 ${isMobile ? "p-1" : "p-2"} flex h-full flex-col justify-between`}
      >
        <CardHeader className={isMobile ? "p-2" : ""}>
          <CardDescription
            className={`text-white/80 ${isMobile ? "text-xs" : "text-sm"} font-medium tracking-wide`}
          >
            {category}
          </CardDescription>
        </CardHeader>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 rounded-xl bg-white/20 shadow-2xl shadow-black/30 blur-2xl backdrop-blur-xl"
          />
          <CardContent className={`relative z-10 ${isMobile ? "p-2" : "p-4"}`}>
            <CardTitle
              className={`text-white ${isMobile ? "text-base" : "text-xl"} font-bold text-shadow-md leading-tight`}
            >
              {title}
            </CardTitle>
            <p
              className={`text-white/90 ${isMobile ? "text-xs" : "text-sm"} mt-2 text-shadow-sm leading-relaxed`}
            >
              {description}
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export default function CardShowcase() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8 md:space-y-16">
        {/* Hero Section */}
        <div className="space-y-4 text-center md:space-y-6">
          <div className="space-y-2">
            <h1 className="bg-linear-to-r from-primary to-primary/60 bg-clip-text font-bold text-2xl text-transparent md:text-4xl lg:text-5xl">
              Card Component
            </h1>
            <p className="mx-auto max-w-2xl px-4 text-base text-muted-foreground md:text-xl">
              Beautiful overlay cards with backdrop blur effects and dynamic
              content positioning
            </p>
          </div>

          {/* Main Demo */}
          <div className="relative rounded-3xl border border-border/50 bg-card/30 p-4 shadow-2xl backdrop-blur-sm md:p-8">
            <div className="flex justify-center">
              <section
                aria-label="Featured Card: Ideas Made Visuals"
                className={`relative w-full ${isMobile ? "h-75 max-w-sm" : "h-100 max-w-xl md:h-125"} mx-auto overflow-hidden rounded-3xl shadow-2xl`}
              >
                <div aria-hidden="true" className="absolute inset-0">
                  <Image
                    alt="Abstract background with a girl, used for card visual design."
                    className="object-cover"
                    fill
                    priority
                    src={GIRL}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div
                  className={`absolute ${isMobile ? "inset-3" : "inset-6 sm:inset-12"}`}
                >
                  <VuiCard
                    imageAlt="Card background visual, blurred for effect."
                    imageSrc={GIRL}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Card Variations */}
        <div className="space-y-8 md:space-y-12">
          <h2 className="text-center font-bold text-2xl md:text-3xl">
            Card Variations
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {/* Design Agency Card */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-blue-700 text-lg md:text-xl dark:text-blue-300">
                  Design Agency
                </h3>
                <p className="text-muted-foreground text-sm">
                  Creative portfolio showcase
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200/30 bg-linear-to-br from-blue-50/30 to-blue-100/20 p-4 dark:border-blue-800/20 dark:from-blue-950/20 dark:to-blue-900/10">
                <section
                  aria-label="Design Agency Card"
                  className={`relative w-full ${isMobile ? "h-62.5" : "h-75 md:h-100"} overflow-hidden rounded-2xl shadow-xl`}
                >
                  <div aria-hidden="true" className="absolute inset-0">
                    <Image
                      alt="Creative design background"
                      className="object-cover"
                      fill
                      src={GIRL}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-purple-900/20" />
                  </div>
                  <div
                    className={`absolute ${isMobile ? "inset-2" : "inset-4"}`}
                  >
                    <VuiCard
                      category="Design / Branding / Strategy"
                      description={
                        <>
                          We craft digital experiences that{" "}
                          <span className="text-blue-400">captivate</span> and{" "}
                          <span className="text-blue-400">convert</span>,
                          blending creativity with strategy.
                        </>
                      }
                      imageAlt="Design portfolio background"
                      imageSrc={GIRL}
                      title="Creative Excellence"
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Tech Startup Card */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-green-700 text-lg md:text-xl dark:text-green-300">
                  Tech Startup
                </h3>
                <p className="text-muted-foreground text-sm">
                  Modern technology focus
                </p>
              </div>

              <div className="rounded-2xl border border-green-200/30 bg-linear-to-br from-green-50/30 to-emerald-100/20 p-4 dark:border-green-800/20 dark:from-green-950/20 dark:to-emerald-900/10">
                <section
                  aria-label="Tech Startup Card"
                  className={`relative w-full ${isMobile ? "h-62.5" : "h-75 md:h-100"} overflow-hidden rounded-2xl shadow-xl`}
                >
                  <div aria-hidden="true" className="absolute inset-0">
                    <Image
                      alt="Technology background"
                      className="object-cover"
                      fill
                      src={GIRL}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-green-900/40 to-teal-900/20" />
                  </div>
                  <div
                    className={`absolute ${isMobile ? "inset-2" : "inset-4"}`}
                  >
                    <VuiCard
                      category="Technology / Innovation / AI"
                      description={
                        <>
                          Building tomorrow&apos;s solutions with{" "}
                          <span className="text-green-400">
                            cutting-edge tech
                          </span>{" "}
                          and{" "}
                          <span className="text-green-400">
                            innovative thinking
                          </span>
                          .
                        </>
                      }
                      imageAlt="Tech innovation background"
                      imageSrc={GIRL}
                      title="Future Forward"
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Lifestyle Brand Card */}
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-lg text-purple-700 md:text-xl dark:text-purple-300">
                  Lifestyle Brand
                </h3>
                <p className="text-muted-foreground text-sm">
                  Elegant and sophisticated
                </p>
              </div>

              <div className="rounded-2xl border border-purple-200/30 bg-linear-to-br from-purple-50/30 to-violet-100/20 p-4 dark:border-purple-800/20 dark:from-purple-950/20 dark:to-violet-900/10">
                <section
                  aria-label="Lifestyle Brand Card"
                  className={`relative w-full ${isMobile ? "h-62.5" : "h-75 md:h-100"} overflow-hidden rounded-2xl shadow-xl`}
                >
                  <div aria-hidden="true" className="absolute inset-0">
                    <Image
                      alt="Lifestyle brand background"
                      className="object-cover"
                      fill
                      src={GIRL}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-purple-900/40 to-pink-900/20" />
                  </div>
                  <div
                    className={`absolute ${isMobile ? "inset-2" : "inset-4"}`}
                  >
                    <VuiCard
                      category="Lifestyle / Fashion / Luxury"
                      description={
                        <>
                          Curating experiences that embody{" "}
                          <span className="text-purple-400">
                            sophistication
                          </span>{" "}
                          and{" "}
                          <span className="text-purple-400">
                            timeless style
                          </span>
                          .
                        </>
                      }
                      imageAlt="Lifestyle elegance background"
                      imageSrc={GIRL}
                      title="Refined Elegance"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Different Layouts */}
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-2xl md:text-3xl">Layout Examples</h2>
            <p className="text-muted-foreground">
              Various card arrangements and compositions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
            {/* Compact Layout */}
            <div className="space-y-4">
              <h3 className="text-center font-semibold text-lg text-orange-700 md:text-xl dark:text-orange-300">
                Compact Layout
              </h3>

              <div className="rounded-2xl border border-orange-200/30 bg-linear-to-br from-orange-50/30 to-amber-100/20 p-4 md:p-6 dark:border-orange-800/20 dark:from-orange-950/20 dark:to-amber-900/10">
                <section
                  aria-label="Compact Card Layout"
                  className={`relative w-full ${isMobile ? "h-50" : "h-62.5 md:h-75"} overflow-hidden rounded-xl shadow-lg`}
                >
                  <div aria-hidden="true" className="absolute inset-0">
                    <Image
                      alt="Compact layout background"
                      className="object-cover"
                      fill
                      src={GIRL}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div
                    className={`absolute ${isMobile ? "inset-2" : "inset-3"}`}
                  >
                    <VuiCard
                      category="Photography / Art"
                      description={
                        <>
                          Capturing moments that{" "}
                          <span className="text-orange-400">inspire</span> and{" "}
                          <span className="text-orange-400">connect</span>.
                        </>
                      }
                      imageAlt="Compact card visual"
                      imageSrc={GIRL}
                      title="Visual Stories"
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Wide Layout */}
            <div className="space-y-4">
              <h3 className="text-center font-semibold text-lg text-rose-700 md:text-xl dark:text-rose-300">
                Wide Format
              </h3>

              <div className="rounded-2xl border border-rose-200/30 bg-linear-to-br from-rose-50/30 to-pink-100/20 p-4 md:p-6 dark:border-rose-800/20 dark:from-rose-950/20 dark:to-pink-900/10">
                <section
                  aria-label="Wide Format Card"
                  className={`relative w-full ${isMobile ? "h-50" : "h-62.5 md:h-75"} overflow-hidden rounded-xl shadow-lg`}
                >
                  <div aria-hidden="true" className="absolute inset-0">
                    <Image
                      alt="Wide format background"
                      className="object-cover"
                      fill
                      src={GIRL}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-rose-900/40 to-transparent" />
                  </div>
                  <div
                    className={`absolute ${isMobile ? "inset-2" : "inset-4"}`}
                  >
                    <VuiCard
                      category="Events / Experiences"
                      description={
                        <>
                          Creating unforgettable experiences through{" "}
                          <span className="text-rose-400">
                            thoughtful design
                          </span>{" "}
                          and{" "}
                          <span className="text-rose-400">
                            attention to detail
                          </span>
                          .
                        </>
                      }
                      imageAlt="Wide format card visual"
                      imageSrc={GIRL}
                      title="Memorable Moments"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardTheme() {
  const isMobile = useIsMobile();

  return (
    <section
      aria-label="Tech Startup Card"
      className="h-full w-full rounded-2xl"
    >
      <div aria-hidden="true" className="absolute inset-0 h-full w-full">
        <Image
          alt="Technology background"
          className="object-cover"
          fill
          src={GIRL}
        />
        <div className="absolute inset-0 bg-linear-to-t from-green-900/40 to-teal-900/20" />
      </div>
      <div className={`absolute ${isMobile ? "inset-2" : "inset-4"}`}>
        <VuiCard
          category="Technology / Innovation / AI"
          description={
            <>
              Building tomorrow&apos;s solutions with{" "}
              <span className="text-green-400">cutting-edge tech</span> and{" "}
              <span className="text-green-400">innovative thinking</span>.
            </>
          }
          imageAlt="Tech innovation background"
          imageSrc={GIRL}
          title="Future Forward"
        />
      </div>
    </section>
  );
}
