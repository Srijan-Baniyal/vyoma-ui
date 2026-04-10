import {
  IconCircleCheck as CheckCircle,
  IconCode as Code,
  IconRocket as Rocket,
  IconSettings as Settings,
  IconTerminal2 as Terminal,
} from "@tabler/icons-react";
import { PackageManagerTabs } from "@/components/PackageManagerTabs";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { getDynamicStats } from "@/lib/ComponentCounter";

export default function Installation() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute -right-40 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-secondary/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-6 py-16">
        {/* Header */}
        <div className="space-y-6 text-center">
          <Pill icon={<Terminal className="h-5 w-5" />} status="active">
            Installation Guide
          </Pill>

          <h1 className="font-black text-5xl tracking-tight md:text-7xl">
            <span className="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Get Started with
            </span>
            <br />
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Vyoma UI
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-muted-foreground text-xl leading-relaxed">
            Transform your development workflow with our modern component
            library. Follow these steps to integrate Vyoma UI into your Next.js
            project.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="group">
            <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-primary/50 to-secondary/50" />

              <div className="relative p-8 md:p-12">
                <div className="mb-8 flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 to-primary/10 shadow-lg">
                    <span className="font-black text-2xl text-primary">1</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 flex items-center gap-3 font-bold text-3xl">
                      Create Project
                      <Code className="h-6 w-6 text-primary" />
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Set up a new Next.js project with all the essentials
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Begin your journey by creating a fresh Next.js project with
                    TypeScript, Tailwind CSS, and ESLint. Choose your preferred
                    package manager below for the best development experience.
                  </p>

                  <div className="space-y-4">
                    <PackageManagerTabs command="create-next-app@latest my-vyoma-app --typescript --tailwind --eslint" />

                    <Card className="border-green-200/50 bg-linear-to-r from-green-50/50 to-emerald-50/50 p-6 dark:border-green-800/50 dark:from-green-950/20 dark:to-emerald-950/20">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
                        <div>
                          <h3 className="mb-3 font-semibold text-green-900 dark:text-green-100">
                            Recommended Configuration
                          </h3>
                          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-green-800 dark:text-green-200">
                                TypeScript for type safety
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-green-800 dark:text-green-200">
                                Tailwind CSS for styling
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-green-800 dark:text-green-200">
                                ESLint for code quality
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-green-800 dark:text-green-200">
                                App Router for modern routing
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Step 2 */}
          <div className="group">
            <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-transparent to-purple-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-blue-500/50 to-purple-500/50" />

              <div className="relative p-8 md:p-12">
                <div className="mb-8 flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-500/20 to-purple-500/10 shadow-lg">
                    <span className="font-black text-2xl text-blue-600">2</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 flex items-center gap-3 font-bold text-3xl">
                      Install Shadcn UI
                      <Settings className="h-6 w-6 text-blue-600" />
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Add the foundation component library
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Vyoma UI builds upon the excellent Shadcn UI foundation.
                    Install it to unlock a comprehensive collection of
                    beautifully designed, accessible components.
                  </p>

                  <div className="space-y-4">
                    <PackageManagerTabs command="shadcn@latest init" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Step 3 */}
          <div className="group">
            <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 via-transparent to-red-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-orange-500/50 to-red-500/50" />

              <div className="relative p-8 md:p-12">
                <div className="mb-8 flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-500/20 to-red-500/10 shadow-lg">
                    <span className="font-black text-2xl text-orange-600">
                      3
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 flex items-center gap-3 font-bold text-3xl">
                      Configure Components
                      <Settings className="h-6 w-6 text-orange-600" />
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Customize your component setup
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    The initialization wizard will guide you through configuring
                    your{" "}
                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                      components.json
                    </code>{" "}
                    file with the perfect settings for your project.
                  </p>

                  <Card className="border-2 border-dashed bg-linear-to-br from-muted/50 to-muted/20 p-6">
                    <div className="space-y-4 font-mono text-sm">
                      <div className="flex items-center gap-4 rounded bg-background/50 p-3">
                        <span className="font-semibold text-orange-500">?</span>
                        <span className="text-muted-foreground">
                          Which style would you like to use?
                        </span>
                        <span className="ml-auto font-semibold text-primary">
                          New York
                        </span>
                      </div>
                      <div className="flex items-center gap-4 rounded bg-background/50 p-3">
                        <span className="font-semibold text-orange-500">?</span>
                        <span className="text-muted-foreground">
                          Which color would you like to use as base color?
                        </span>
                        <span className="ml-auto font-semibold text-primary">
                          Zinc
                        </span>
                      </div>
                      <div className="flex items-center gap-4 rounded bg-background/50 p-3">
                        <span className="font-semibold text-orange-500">?</span>
                        <span className="text-muted-foreground">
                          Do you want to use CSS variables for colors?
                        </span>
                        <span className="ml-auto font-semibold text-primary">
                          yes
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>

          {/* Step 4 */}
          <div className="group">
            <Card className="relative overflow-hidden border-0 bg-linear-to-br from-green-50/50 to-emerald-50/50 shadow-2xl backdrop-blur-xl dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-emerald-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-green-500 to-emerald-500" />

              <div className="relative p-8 md:p-12">
                <div className="mb-8 flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/30 bg-linear-to-br from-green-500/30 to-emerald-500/20 shadow-lg">
                    <Rocket className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 font-bold text-3xl text-green-800 dark:text-green-100">
                      🚀 You&apos;re Ready to Build!
                    </h2>
                    <p className="text-green-700 text-lg dark:text-green-200">
                      Start creating amazing interfaces
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <p className="text-green-800 text-lg leading-relaxed dark:text-green-200">
                    Congratulations! Your development environment is now
                    configured with Vyoma UI. You&apos;re ready to build
                    beautiful, responsive interfaces with our comprehensive
                    component library.
                  </p>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card className="bg-background/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                          <Terminal className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          Browse Components
                        </h3>
                      </div>
                      <p className="mb-4 text-muted-foreground">
                        Explore our extensive library of pre-built components
                        and patterns.
                      </p>
                      <div className="font-medium text-blue-600 text-sm">
                        {getDynamicStats().totalComponents} Components Available
                        →
                      </div>
                    </Card>

                    <Card className="bg-background/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                          <Code className="h-5 w-5 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-lg">View Examples</h3>
                      </div>
                      <p className="mb-4 text-muted-foreground">
                        See real-world implementations and get inspired by our
                        examples.
                      </p>
                      <div className="font-medium text-purple-600 text-sm">
                        Live Examples →
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
