"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  Layers,
  Ruler,
  Eye,
  Cpu,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";

export default function Introduction() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const principles = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Spatial Wisdom",
      description:
        "Every component respects space, creating natural breathing room and visual hierarchy.",
      color: "from-yellow-500/20 to-orange-500/10",
      borderColor: "border-yellow-500/20",
      iconBg: "bg-gradient-to-br from-yellow-500/20 to-orange-500/10",
      iconColor: "text-yellow-600",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Purpose-Driven",
      description:
        "Each component serves a specific purpose with clear, predictable behavior.",
      color: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-600",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Visual Consistency",
      description:
        "Unified design language that scales across your entire application.",
      color: "from-purple-500/20 to-pink-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/10",
      iconColor: "text-purple-600",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Developer Experience",
      description:
        "Built with TypeScript, well-documented, and designed for productivity.",
      color: "from-green-500/20 to-emerald-500/10",
      borderColor: "border-green-500/20",
      iconBg: "bg-gradient-to-br from-green-500/20 to-emerald-500/10",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Introduction Header */}
        <div className="text-center space-y-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Pill
              icon={<BookOpen className="w-5 h-5" />}
              status="active"
              className="mb-8"
            >
              Getting Started Guide
            </Pill>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                VUI Design System
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              VUI (Vyoma UI) is a collection of beautifully crafted React components, 
              born from creativity and built with love. Every component tells a story 
              of thoughtful design, where aesthetics meet functionality in perfect harmony.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/get-started/installation">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Quick Start
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/components/accordion">Browse Components</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* What is VUI */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-secondary/50"></div>

          <div className="relative p-8 md:p-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 shadow-lg">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
                  What is VUI?
                  <Layers className="w-6 h-6 text-primary" />
                </h2>
                <p className="text-lg text-muted-foreground">
                  More than just a component library – it&apos;s a complete
                  design system
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                VUI (Vyoma UI) is a labor of love - a collection of beautifully crafted components 
                that dance on top of the solid{" "}
                <strong className="text-foreground">shadcn/ui</strong> foundation. 
                Each component is thoughtfully designed with artistic vision, attention to detail, 
                and a deep appreciation for the craft of interface design. We didn&apos;t just build 
                components; we sculpted digital experiences with passion and creativity.
              </p>

              <Card className="p-6 bg-gradient-to-r from-pink-50/50 to-rose-50/50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200/50 dark:border-pink-800/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 text-lg">💖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
                      Crafted with Love & Creativity
                    </h3>
                    <p className="text-sm text-pink-800 dark:text-pink-200 leading-relaxed">
                      VUI components are artistic expressions built on shadcn&apos;s reliable foundation. 
                      Each element is carefully crafted with creative flair, bringing beauty and 
                      soul to your applications while maintaining the technical excellence you expect.
                    </p>
                  </div>
                </div>
              </Card>

              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re building a simple landing page or a complex web application, 
                VUI brings the artistry and emotional connection that transforms functional 
                interfaces into memorable experiences that users genuinely love to interact with.
              </p>
            </div>
          </div>
        </Card>

        {/* Design Principles */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Design Principles
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision in VUI, from component
              design to API structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl group hover:shadow-3xl transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${principle.color}`}
                ></div>
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${principle.color
                    .replace("/20", "")
                    .replace("/10", "")}`}
                ></div>

                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${principle.iconBg} ${principle.borderColor} border flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <span className={principle.iconColor}>
                        {principle.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
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
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Why Choose VUI?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The difference between functional and beautiful - VUI brings artistry 
              and soul to component design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-transparent to-slate-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500/50 to-slate-500/50"></div>

              <div className="relative p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-500/20 to-slate-500/10 border border-gray-500/20 shadow-lg">
                    <span className="text-gray-600 font-bold">🔧</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Standard Components</h3>
                    <p className="text-sm text-muted-foreground">
                      Functional but lacking soul
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">○</span>
                    <span>
                      Built for function over form
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">○</span>
                    <span>Minimal aesthetic consideration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">○</span>
                    <span>Generic, one-size-fits-all approach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">○</span>
                    <span>Lacks emotional connection with users</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-purple-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500/50 to-purple-500/50"></div>

              <div className="relative p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-pink-500/20 shadow-lg">
                    <span className="text-pink-600 font-bold">✨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">VUI Components</h3>
                    <p className="text-sm text-muted-foreground">
                      Crafted with creativity & love
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-600 mt-1">💖</span>
                    <span>
                      Designed with artistic vision and passion
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">🎨</span>
                    <span>Every detail crafted for beauty and delight</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-600 mt-1">✨</span>
                    <span>Thoughtful animations and micro-interactions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1">🌟</span>
                    <span>Creates emotional connections with users</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* What You Get */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>

          <div className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-3">What You Get</h2>
                    <p className="text-lg text-muted-foreground">
                      Everything you need to build modern React applications
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {whatYouGet.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-br from-muted/50 to-muted/20 border-dashed border-2 p-8">
                <h3 className="font-semibold mb-6 flex items-center gap-3 text-lg">
                  <span className="text-2xl">🎨</span>
                  Artistic Component Collections
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Beautiful Layouts
                    </span>
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Container, Grid, Flexbox
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Elegant Navigation
                    </span>
                    <span className="text-sm bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full">
                      Navbar, Sidebar, Breadcrumb
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Delightful Forms
                    </span>
                    <span className="text-sm bg-green-500/10 text-green-600 px-3 py-1 rounded-full">
                      Input, Select, Checkbox
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground font-medium">
                      Engaging Feedback
                    </span>
                    <span className="text-sm bg-orange-500/10 text-orange-600 px-3 py-1 rounded-full">
                      Alert, Toast, Modal
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground font-medium">
                      Stunning Data Display
                    </span>
                    <span className="text-sm bg-purple-500/10 text-purple-600 px-3 py-1 rounded-full">
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
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The fastest way to start using VUI is through the installation
              guide. Follow the step-by-step process to set up the design system
              in your React application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl text-center group hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-blue-500/50"></div>

              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 shadow-lg">
                  <span className="text-blue-600 font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Install</h3>
                <p className="text-muted-foreground">
                  Add VUI to your project with npm or yarn
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl text-center group hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/50 to-green-500/50"></div>

              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-lg">
                  <span className="text-green-600 font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Configure</h3>
                <p className="text-muted-foreground">
                  Set up themes and customize your design tokens
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl text-center group hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-purple-500/50"></div>

              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20 shadow-lg">
                  <span className="text-purple-600 font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Build</h3>
                <p className="text-muted-foreground">
                  Start creating beautiful interfaces with VUI components
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/get-started/installation">
                <Ruler className="w-5 h-5 mr-2" />
                Start Building with VUI
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-secondary/50"></div>

          <div className="relative p-8 md:p-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shadow-lg">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">What&apos;s Next?</h2>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore these sections to learn more about VUI and how to use it
              effectively.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/get-started/installation">Installation Guide</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/components">Component Library</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/themes">Theming System</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/examples">Examples</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
