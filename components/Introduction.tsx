"use client";

import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Cpu,
  Eye,
  Layers,
  Lightbulb,
  Ruler,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

export default function Introduction() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const principles = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Spatial Wisdom",
      description:
        "Every component respects space, creating natural breathing room and visual hierarchy.",
      color: "from-yellow-500/20 to-orange-500/10",
      borderColor: "border-yellow-500/20",
      iconBg: "bg-linear-to-br from-yellow-500/20 to-orange-500/10",
      iconColor: "text-yellow-600",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Purpose-Driven",
      description:
        "Each component serves a specific purpose with clear, predictable behavior.",
      color: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-linear-to-br from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-600",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Visual Consistency",
      description:
        "Unified design language that scales across your entire application.",
      color: "from-purple-500/20 to-pink-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-linear-to-br from-purple-500/20 to-pink-500/10",
      iconColor: "text-purple-600",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Developer Experience",
      description:
        "Built with TypeScript, well-documented, and designed for productivity.",
      color: "from-green-500/20 to-emerald-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-linear-to-br from-green-500/20 to-emerald-500/10",
      iconColor: "text-green-600",
    },
  ];

  const whatYouGet = [
    "Enhanced shadcn/ui components with better design",
    "Pre-configured design system with consistent spacing",
    "Advanced component variants and compositions",
    "Dark/light theme support with refined color palettes",
    "Accessibility improvements beyond WCAG standards",
    "Reduced decision fatigue with opinionated design choices",
    "Comprehensive documentation with real-world examples",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute -right-40 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-secondary/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-3/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-purple-500/10 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size[48px_48px]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-6 py-16">
        {/* Introduction Header */}
        <div className="space-y-6 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Pill
              className="mb-8"
              icon={<BookOpen className="h-5 w-5" />}
              status="active"
            >
              Getting Started Guide
            </Pill>

            <h1 className="mb-6 font-black text-5xl tracking-tight md:text-7xl">
              <span className="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                VUI Design System
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-muted-foreground text-xl leading-relaxed">
              VUI (Vyoma UI) is a comprehensive React component library built
              with modern web standards. This introduction will help you
              understand the design philosophy and get you started building with
              VUI.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/get-started/installation">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Quick Start
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/components/accordion">Browse Components</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* What is VUI */}
        <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-primary/50 to-secondary/50" />

          <div className="relative p-8 md:p-12">
            <div className="mb-8 flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 to-primary/10 shadow-lg">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="mb-3 flex items-center gap-3 font-bold text-3xl">
                  What is VUI?
                  <Layers className="h-6 w-6 text-primary" />
                </h2>
                <p className="text-lg text-muted-foreground">
                  More than just a component library – it&apos;s a complete
                  design system
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                VUI (Vyoma UI) is built upon the excellent foundation of{" "}
                <strong className="text-foreground">shadcn/ui</strong>, taking
                it to the next level with enhanced design patterns, improved
                usability, and streamlined developer experience. While shadcn/ui
                provides the building blocks, VUI adds the spatial wisdom and
                design philosophy that makes creating beautiful interfaces
                effortless.
              </p>

              <Card className="border-blue-200/50 bg-linear-to-r from-blue-50/50 to-indigo-50/50 p-6 dark:border-blue-800/50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                      Built on shadcn/ui Foundation
                    </h3>
                    <p className="text-blue-800 text-sm leading-relaxed dark:text-blue-200">
                      VUI extends shadcn/ui with carefully crafted design
                      improvements, enhanced component variants, and a cohesive
                      design system that reduces decision fatigue and speeds up
                      development.
                    </p>
                  </div>
                </div>
              </Card>

              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re building a simple landing page or a complex
                web application, VUI provides the enhanced foundation you need
                to create polished user experiences with less hassle and more
                confidence.
              </p>
            </div>
          </div>
        </Card>

        {/* Design Principles */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-4xl">
              <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Design Principles
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              These core principles guide every decision in VUI, from component
              design to API structure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <Card
                className="group relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-3xl"
                key={principle.title}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-r ${principle.color}`}
                />
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${principle.color
                    .replace("/20", "")
                    .replace("/10", "")}`}
                />

                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl ${principle.iconBg} ${principle.borderColor} flex shrink-0 items-center justify-center border shadow-lg`}
                    >
                      <span className={principle.iconColor}>
                        {principle.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-3 font-semibold text-xl">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Why VUI over shadcn/ui */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-4xl">
              <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Why VUI over shadcn/ui?
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
              While shadcn/ui is excellent, VUI takes it further with enhanced
              design and reduced complexity
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-linear-to-r from-red-500/5 via-transparent to-orange-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-red-500/50 to-orange-500/50" />

              <div className="relative p-8">
                <div className="mb-6 flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-linear-to-br from-red-500/20 to-orange-500/10 shadow-lg">
                    <span className="font-bold text-red-600">📦</span>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-xl">shadcn/ui</h3>
                    <p className="text-muted-foreground text-sm">
                      Excellent foundation, but...
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">×</span>
                    <span>
                      Requires extensive customization for cohesive design
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">×</span>
                    <span>Decision fatigue on spacing and variants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">×</span>
                    <span>Limited advanced component compositions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">×</span>
                    <span>Basic examples and documentation</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-emerald-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-green-500/50 to-emerald-500/50" />

              <div className="relative p-8">
                <div className="mb-6 flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-500/20 bg-linear-to-br from-green-500/20 to-emerald-500/10 shadow-lg">
                    <span className="font-bold text-green-600">✨</span>
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-xl">VUI (Vyoma UI)</h3>
                    <p className="text-muted-foreground text-sm">
                      Enhanced and production-ready
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>
                      Pre-configured design system with spatial wisdom
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Opinionated choices reduce decision fatigue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Advanced layouts and component compositions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Comprehensive examples and best practices</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* What You Get */}
        <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-blue-500/50 to-purple-500/50" />

          <div className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-8 flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-linear-to-br from-green-500/20 to-emerald-500/10 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 font-bold text-3xl">What You Get</h2>
                    <p className="text-lg text-muted-foreground">
                      Everything you need to build modern React applications
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {whatYouGet.map((item) => (
                    <div
                      className="flex items-center gap-4 rounded-lg bg-background/50 p-3 backdrop-blur-sm"
                      key={item}
                    >
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-2 border-dashed bg-linear-to-br from-muted/50 to-muted/20 p-8">
                <h3 className="mb-6 flex items-center gap-3 font-semibold text-lg">
                  <Layers className="h-6 w-6 text-primary" />
                  Component Categories
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-border/50 border-b py-3">
                    <span className="font-medium text-muted-foreground">
                      Layout
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary text-sm">
                      Container, Grid, Flexbox
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-border/50 border-b py-3">
                    <span className="font-medium text-muted-foreground">
                      Navigation
                    </span>
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-600 text-sm">
                      Navbar, Sidebar, Breadcrumb
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-border/50 border-b py-3">
                    <span className="font-medium text-muted-foreground">
                      Forms
                    </span>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-green-600 text-sm">
                      Input, Select, Checkbox
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-border/50 border-b py-3">
                    <span className="font-medium text-muted-foreground">
                      Feedback
                    </span>
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-orange-600 text-sm">
                      Alert, Toast, Modal
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="font-medium text-muted-foreground">
                      Data Display
                    </span>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-purple-600 text-sm">
                      Table, Card, Badge
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Getting Started Steps */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-4xl">
              <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
              The fastest way to start using VUI is through the installation
              guide. Follow the step-by-step process to set up the design system
              in your React application.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-0 bg-card/80 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-transparent to-blue-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-blue-500/50 to-blue-500/50" />

              <div className="relative p-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-500/20 to-blue-500/10 shadow-lg">
                  <span className="font-bold text-2xl text-blue-600">1</span>
                </div>
                <h3 className="mb-3 font-semibold text-xl">Install</h3>
                <p className="text-muted-foreground">
                  Add VUI to your project with npm or yarn
                </p>
              </div>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-card/80 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl">
              <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-green-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-green-500/50 to-green-500/50" />

              <div className="relative p-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-linear-to-br from-green-500/20 to-green-500/10 shadow-lg">
                  <span className="font-bold text-2xl text-green-600">2</span>
                </div>
                <h3 className="mb-3 font-semibold text-xl">Configure</h3>
                <p className="text-muted-foreground">
                  Set up themes and customize your design tokens
                </p>
              </div>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-card/80 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 via-transparent to-purple-500/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-purple-500/50 to-purple-500/50" />

              <div className="relative p-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/20 to-purple-500/10 shadow-lg">
                  <span className="font-bold text-2xl text-purple-600">3</span>
                </div>
                <h3 className="mb-3 font-semibold text-xl">Build</h3>
                <p className="text-muted-foreground">
                  Start creating beautiful interfaces with VUI components
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/get-started/installation">
                <Ruler className="mr-2 h-5 w-5" />
                Start Building with VUI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-primary/50 to-secondary/50" />

          <div className="relative p-8 text-center md:p-12">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-linear-to-br from-primary/20 to-primary/10 shadow-lg">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-bold text-3xl">What&apos;s Next?</h2>
            </div>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
              Explore these sections to learn more about VUI and how to use it
              effectively.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="outline">
                <Link href="/get-started/installation">Installation Guide</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/components">Component Library</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/themes">Theming System</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/examples">Examples</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
