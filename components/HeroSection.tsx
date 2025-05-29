"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  ArrowRightIcon,
  Copy,
  Play,
  Sparkles,
  Code2,
  Palette,
  Zap,
  MousePointer2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

// Code preview component
const CodePreview = () => {
  const [activeTab, setActiveTab] = useState("button");
  const [copied, setCopied] = useState(false);

  const codeExamples = {
    button: `<Button variant="default" size="lg">
  <Sparkles className="mr-2 h-4 w-4" />
  Get Started
</Button>`,
    card: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Amazing Component</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Beautiful and functional.</p>
  </CardContent>
</Card>`,
    badge: `<Badge variant="outline">
  <Zap className="mr-1 h-3 w-3" />
  New Feature
</Badge>`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(
      codeExamples[activeTab as keyof typeof codeExamples]
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 max-w-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          {Object.keys(codeExamples).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-colors",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyCode}
          className="h-6 w-6 p-0"
        >
          {copied ? (
            <span className="text-xs">✓</span>
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <pre className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg overflow-x-auto">
        <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
      </pre>
    </motion.div>
  );
};

// Component showcase
const ComponentShowcase = () => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const components = [
    {
      name: "Button",
      color: "bg-blue-500",
      icon: <MousePointer2 className="h-4 w-4" />,
    },
    {
      name: "Card",
      color: "bg-purple-500",
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      name: "Badge",
      color: "bg-green-500",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      name: "Input",
      color: "bg-orange-500",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      name: "Dialog",
      color: "bg-pink-500",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      name: "Tooltip",
      color: "bg-cyan-500",
      icon: <Play className="h-4 w-4" />,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-3 gap-3 max-w-xs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {components.map((component, index) => (
        <motion.div
          key={component.name}
          className={cn(
            "relative p-4 rounded-lg cursor-pointer transition-all duration-300",
            component.color,
            hoveredComponent === component.name
              ? "scale-110 shadow-lg"
              : "scale-100"
          )}
          onHoverStart={() => setHoveredComponent(component.name)}
          onHoverEnd={() => setHoveredComponent(null)}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
        >
          <div className="text-white text-center">
            <div className="flex justify-center mb-2">{component.icon}</div>
            <div className="text-xs font-medium">{component.name}</div>
          </div>
          {hoveredComponent === component.name && (
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Enhanced Glow component
const EnhancedGlow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "top" | "above" | "bottom" | "below" | "center";
  }
>(({ className, variant = "top", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute w-full pointer-events-none",
      variant === "top" && "top-0",
      variant === "above" && "-top-32",
      variant === "bottom" && "bottom-0",
      variant === "below" && "-bottom-32",
      variant === "center" && "top-1/2",
      className
    )}
    {...props}
  >
    <motion.div
      className={cn(
        "absolute left-1/2 h-64 w-3/5 -translate-x-1/2 scale-[2.5] rounded-full sm:h-96",
        variant === "center" && "-translate-y-1/2"
      )}
      style={{
        background:
          "radial-gradient(ellipse at center, hsla(var(--primary)/.3) 0%, hsla(var(--primary)/.1) 30%, transparent 70%)",
      }}
      animate={{
        scale: [2.5, 3, 2.5],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className={cn(
        "absolute left-1/2 h-32 w-2/5 -translate-x-1/2 scale-[2] rounded-full sm:h-64",
        variant === "center" && "-translate-y-1/2"
      )}
      style={{
        background:
          "radial-gradient(ellipse at center, hsla(var(--primary)/.5) 0%, hsla(var(--primary)/.2) 40%, transparent 70%)",
      }}
      animate={{
        scale: [2, 2.5, 2],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />
  </div>
));
EnhancedGlow.displayName = "EnhancedGlow";

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "dark" ? image.dark : image.light;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative bg-background text-foreground py-12 sm:py-24 md:py-32 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Background Effects */}

      {/* Mouse follower */}
      <motion.div
        className="fixed w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
        }}
      />

      <motion.div
        className="mx-auto flex max-w-7xl flex-col gap-12 pt-16 sm:gap-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge with enhanced animation */}
          {badge && (
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="gap-2 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                />
                <span className="text-muted-foreground relative z-10">
                  {badge.text}
                </span>
                <a
                  href={badge.action.href}
                  className="flex items-center gap-1 hover:text-foreground transition-colors relative z-10"
                >
                  {badge.action.text}
                  <ArrowRightIcon className="h-3 w-3" />
                </a>
              </Badge>
            </motion.div>
          )}

          {/* Enhanced Title with gradient animation */}
          <motion.h1
            className="relative z-10 inline-block text-4xl font-bold leading-tight sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight"
            variants={titleVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent bg-300% animate-gradient"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {title}
            </motion.span>
          </motion.h1>

          {/* Description with typewriter effect */}
          <motion.p
            className="text-lg relative z-10 max-w-2xl font-medium text-muted-foreground sm:text-xl"
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* Enhanced Actions */}
          <motion.div
            className="relative z-10 flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={action.variant}
                  size="lg"
                  asChild
                  className="relative overflow-hidden group"
                >
                  <a href={action.href} className="flex items-center gap-2">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {action.icon}
                      {action.text}
                    </span>
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Demo Section */}
          <div className="relative pt-12 w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main Image */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.8,
                }}
              >
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-4 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative z-10 rounded-lg overflow-hidden">
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt={image.alt}
                      width={1248}
                      height={765}
                      priority
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Side Components */}
              <div className="space-y-6">
                <CodePreview />
                <ComponentShowcase />
              </div>
            </div>

            {/* Enhanced Glow Effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
            >
              <EnhancedGlow variant="top" />
            </motion.div>
          </div>

          {/* Stats Counter */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-16"
            variants={itemVariants}
          >
            {[
              {
                number: "50+",
                label: "Components",
                icon: <Code2 className="h-5 w-5" />,
              },
              {
                number: "10K+",
                label: "Downloads",
                icon: <Sparkles className="h-5 w-5" />,
              },
              {
                number: "99%",
                label: "Satisfaction",
                icon: <Zap className="h-5 w-5" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.2 }}
              >
                <div className="flex justify-center mb-2 text-primary group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-primary mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1.8 + index * 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
