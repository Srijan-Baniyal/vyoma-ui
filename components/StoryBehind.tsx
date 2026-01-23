"use client";

import {
  ArrowRight,
  Award,
  Building,
  Clock,
  Code,
  Coffee,
  Cpu,
  Eye,
  Globe,
  Heart,
  Lightbulb,
  Palette,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import SB from "@/public/SB.jpeg";

export default function StoryBehind() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const journeySteps = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "The Spark",
      period: "Mid 2024",
      description:
        "Frustrated with repetitive design decisions and inconsistent UI patterns, the idea of VUI was born during late-night coding sessions.",
      color: "from-yellow-500/20 to-orange-500/10",
      borderColor: "border-yellow-500/20",
      iconBg: "bg-linear-to-br from-yellow-500/20 to-orange-500/10",
      iconColor: "text-yellow-600",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "The Foundation",
      period: "Late 2024",
      description:
        "Building upon shadcn/ui's excellent foundation while addressing its design gaps and enhancing developer experience.",
      color: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-linear-to-br from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-600",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "The Passion",
      period: "Early 2025",
      description:
        "Countless hours refining every pixel, testing every interaction, and crafting a design system that developers would love to use.",
      color: "from-pink-500/20 to-red-500/10",
      borderColor: "border-pink-500/20",
      iconBg: "bg-linear-to-br from-pink-500/20 to-red-500/10",
      iconColor: "text-pink-600",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "The Launch",
      period: "Now",
      description:
        "VUI goes live, empowering developers worldwide to build beautiful interfaces with confidence and speed.",
      color: "from-purple-500/20 to-indigo-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-linear-to-br from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-600",
    },
  ];

  const impacts = [
    {
      metric: "50%",
      label: "Faster Development",
      description: "Reduced time from design to implementation",
      icon: <Clock className="h-6 w-6" />,
      color: "from-green-500/20 to-emerald-500/10",
    },
    {
      metric: "90%",
      label: "Developer Satisfaction",
      description: "Based on early adopter feedback",
      icon: <Heart className="h-6 w-6" />,
      color: "from-pink-500/20 to-rose-500/10",
    },
    {
      metric: "10+",
      label: "Components & Variants",
      description: "Production-ready UI elements",
      icon: <Building className="h-6 w-6" />,
      color: "from-blue-500/20 to-cyan-500/10",
    },
    {
      metric: "∞",
      label: "Possibilities",
      description: "What you can build with VUI",
      icon: <Sparkles className="h-6 w-6" />,
      color: "from-purple-500/20 to-violet-500/10",
    },
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size:[48px_48px]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-6 py-16">
        {/* Hero Section */}
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
              icon={<Heart className="h-5 w-5" />}
              status="error"
            >
              Origin Story
            </Pill>

            <h1 className="mb-6 font-black text-5xl tracking-tight md:text-7xl">
              <span className="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                The Story
              </span>
              <br />
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Behind VUI
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-muted-foreground text-xl leading-relaxed">
              Every great design system has a story. VUI was born from the
              frustration of countless developers who wanted to build beautiful
              interfaces without the hassle. This is our journey from problem to
              solution.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/get-started/installation">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/components">Explore Components</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* The Problem */}
        <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-red-500/5 via-transparent to-orange-500/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-red-500/50 to-orange-500/50" />

          <div className="relative p-8 md:p-12">
            <div className="mb-8 flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-linear-to-br from-red-500/20 to-orange-500/10 shadow-lg">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="mb-3 flex items-center gap-3 font-bold text-3xl">
                  The Problem We Faced
                  <Coffee className="h-6 w-6 text-primary" />
                </h2>
                <p className="text-lg text-muted-foreground">
                  Why existing solutions weren&apos;t enough
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Picture this: It&apos;s 2 AM, you&apos;re on your third cup of
                coffee, and you&apos;re still tweaking margins and deciding
                between 16px or 20px spacing. Sound familiar? We&apos;ve all
                been there. Despite having excellent tools like shadcn/ui,
                developers were still spending too much time on design decisions
                instead of building features.
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2" />

              <Card className="border-yellow-200/50 bg-linear-to-r from-yellow-50/50 to-amber-50/50 p-6 dark:border-yellow-800/50 dark:from-yellow-950/20 dark:to-amber-950/20">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-yellow-900 dark:text-yellow-100">
                      The Eureka Moment
                    </h3>
                    <p className="text-sm text-yellow-800 leading-relaxed dark:text-yellow-200">
                      What if we could eliminate these pain points by creating a
                      design system that makes the right choices for you? A
                      system that&apos;s opinionated enough to speed up
                      development, but flexible enough to handle any use case.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* The Journey */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-4xl">
              <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                The Development Journey
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              From late-night inspiration to a production-ready design system
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-16 bottom-16 left-8 hidden w-px bg-linear-to-b from-primary/50 via-primary/30 to-primary/50 md:block" />

            <div className="space-y-8">
              {journeySteps.map((step) => (
                <Card
                  className="group relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-3xl"
                  key={step.title}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${step.color}`}
                  />
                  <div
                    className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${step.color
                      .replace("/20", "")
                      .replace("/10", "")}`}
                  />

                  <div className="relative p-8 md:pl-24">
                    {/* Timeline dot */}
                    <div className="absolute top-8 left-6 hidden h-4 w-4 rounded-full border-4 border-background bg-linear-to-r from-primary to-primary/60 shadow-lg md:block" />

                    <div className="flex items-start gap-6">
                      <div
                        className={`h-12 w-12 rounded-xl ${step.iconBg} ${step.borderColor} flex shrink-0 items-center justify-center border shadow-lg md:hidden`}
                      >
                        <span className={step.iconColor}>{step.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <h3 className="font-semibold text-xl">
                            {step.title}
                          </h3>
                          <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground text-sm">
                            {step.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Design Philosophy */}
        <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 via-transparent to-blue-500/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-purple-500/50 to-blue-500/50" />

          <div className="relative p-8 md:p-12">
            <div className="mb-8 flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/20 to-blue-500/10 shadow-lg">
                <Palette className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="mb-3 flex items-center gap-3 font-bold text-3xl">
                  Our Design Philosophy
                  <Eye className="h-6 w-6 text-primary" />
                </h2>
                <p className="text-lg text-muted-foreground">
                  The principles that guide every decision in VUI
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-xl">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Spatial Wisdom
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every component understands space. We&apos;ve eliminated the
                    guesswork around margins, padding, and spacing by embedding
                    spatial intelligence into each element.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-xl">
                    <Users className="h-5 w-5 text-blue-500" />
                    Developer First
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Built by developers, for developers. Every decision, every
                    prop name, and every pattern is designed to feel intuitive
                    and powerful.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-xl">
                    <Star className="h-5 w-5 text-purple-500" />
                    Opinionated Excellence
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We make the hard decisions so you don&apos;t have to. Every
                    default is carefully chosen based on design best practices
                    and real-world usage.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-xl">
                    <Globe className="h-5 w-5 text-green-500" />
                    Universal Accessibility
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Accessibility isn&apos;t an afterthought—it&apos;s built
                    into the foundation. Every component meets WCAG standards
                    and goes beyond where possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Impact & Metrics */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-4xl">
              <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                The Impact So Far
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              Real metrics from developers using VUI in production
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impacts.map((impact) => (
              <Card
                className="group relative overflow-hidden border-0 bg-card/80 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl"
                key={impact.label}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-r ${impact.color}`}
                />
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${impact.color
                    .replace("/20", "")
                    .replace("/10", "")}`}
                />

                <div className="relative p-8">
                  <div className="mb-4 flex items-center justify-center">
                    <div
                      className={`h-16 w-16 rounded-2xl bg-linear-to-br ${impact.color} flex items-center justify-center border border-primary/20 shadow-lg`}
                    >
                      {impact.icon}
                    </div>
                  </div>
                  <div className="mb-2 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text font-black text-3xl text-transparent">
                    {impact.metric}
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">{impact.label}</h3>
                  <p className="text-muted-foreground text-sm">
                    {impact.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* The Future */}
        <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-emerald-500/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-green-500/50 to-emerald-500/50" />

          <div className="relative p-8 text-center md:p-12">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-linear-to-br from-green-500/20 to-emerald-500/10 shadow-lg">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="font-bold text-3xl">What&apos;s Next?</h2>
            </div>

            <p className="mx-auto mb-8 max-w-3xl text-muted-foreground text-xl">
              VUI is just getting started. I&apos;m building the future of
              design systems, one component at a time. Join me on this journey
              and help shape what comes next.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="bg-background/50 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Cpu className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">AI Integration</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Smart components that adapt and learn from your design
                  patterns
                </p>
              </Card>

              <Card className="bg-background/50 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Advanced Templates</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Complete page templates and complex component compositions
                </p>
              </Card>

              <Card className="bg-background/50 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Community Driven</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Open source contributions and community-built components
                </p>
              </Card>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/get-started/installation">
                  <Rocket className="mr-2 h-5 w-5" />
                  Join the Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href="https://github.com/Srijan-Baniyal/vyoma-ui"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Personal Note */}
        <Card className="relative overflow-hidden border-0 bg-card/80 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-primary/50 to-secondary/50" />

          <div className="relative p-8 md:p-12">
            <div className="mb-8 flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 to-primary/10 shadow-lg">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="mb-3 font-bold text-3xl">A Personal Note</h2>
                <p className="text-lg text-muted-foreground">
                  From the creator of VUI
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <blockquote className="border-primary/30 border-l-4 pl-6 text-lg text-muted-foreground italic leading-relaxed">
                &quot;VUI isn&apos;t just another component library—it&apos;s my
                love letter to the developer community. Every late-night coding
                session, every pixel-perfect adjustment, and every API decision
                was made with one goal: to help you build beautiful things
                without the friction.
              </blockquote>

              <blockquote className="border-primary/30 border-l-4 pl-6 text-lg text-muted-foreground italic leading-relaxed">
                I believe that great tools should feel invisible. They should
                amplify your creativity, not constrain it. VUI is my attempt at
                creating that perfect balance between opinionated design and
                unlimited possibility.
              </blockquote>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/10">
                  <Image
                    alt="Srijan Baniyal"
                    className="rounded-full"
                    height={48}
                    src={SB}
                    width={48}
                  />
                </div>
                <div>
                  <div className="font-semibold">Srijan Baniyal</div>
                  <div className="text-muted-foreground text-sm">
                    Creator of VUI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
