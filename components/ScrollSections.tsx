"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Shield,
  Rocket,
  Star,
  Code2,
  Palette,
  Layers,
  Sparkles,
  Heart,
  Users,
  Trophy,
  Target,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";


const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Animated counter component
const AnimatedCounter = ({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, hasAnimated]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasAnimated(true)}
      className="text-3xl md:text-4xl font-bold text-primary"
    >
      {count.toLocaleString()}+
    </motion.div>
  );
};

// Interactive component demo
const InteractiveDemo = () => {
  const [activeComponent, setActiveComponent] = useState("button");
  const [buttonVariant, setButtonVariant] = useState("default");
  const [cardStyle, setCardStyle] = useState("default");

  const components = {
    button: (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {["default", "outline", "secondary", "ghost"].map((variant) => (
            <button
              key={variant}
              onClick={() => setButtonVariant(variant)}
              className={`px-3 py-1 text-xs rounded ${
                buttonVariant === variant
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              type="button"
            >
              {variant}
            </button>
          ))}
        </div>
        <Button
          variant={
            buttonVariant as "default" | "outline" | "secondary" | "ghost"
          }
          size="lg"
          className="w-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Interactive Button
        </Button>
      </div>
    ),
    card: (
      <div className="space-y-4">
        <div className="flex gap-2">
          {["default", "elevated", "outlined"].map((style) => (
            <button
              key={style}
              onClick={() => setCardStyle(style)}
              className={`px-3 py-1 text-xs rounded ${
                cardStyle === style
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        <Card
          className={`w-full ${
            cardStyle === "elevated"
              ? "shadow-lg"
              : cardStyle === "outlined"
              ? "border-2"
              : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Amazing Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This card adapts to your style preferences!
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  };

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 max-w-md"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex gap-2 mb-4">
        {Object.keys(components).map((component) => (
          <button
            key={component}
            onClick={() => setActiveComponent(component)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              activeComponent === component
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {component}
          </button>
        ))}
      </div>
      <motion.div
        key={activeComponent}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {components[activeComponent as keyof typeof components]}
      </motion.div>
    </motion.div>
  );
};

// Parallax section
const ParallaxSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-4xl px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          The Future of UI
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Experience the next generation of component libraries with
          cutting-edge design and unmatched performance.
        </p>
        <Button size="lg" className="text-lg px-8">
          Explore the Future
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export function ScrollSections() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description:
        "Optimized for performance with tree-shaking and minimal bundle size",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Accessible by Design",
      description:
        "WCAG 2.1 compliant with full keyboard navigation and screen reader support",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Fully Customizable",
      description:
        "CSS variables, design tokens, and theme system for complete control",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Developer Experience",
      description:
        "TypeScript-first with excellent IntelliSense and documentation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Composable",
      description: "Build complex UIs with simple, reusable building blocks",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Production Ready",
      description:
        "Battle-tested in production by thousands of developers worldwide",
      color: "from-red-500 to-pink-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      company: "TechCorp",
      content:
        "This UI library transformed our development workflow. We ship features 3x faster now!",
      avatar: "https://picsum.photos/64/64?random=1",
    },
    {
      name: "Marcus Rodriguez",
      role: "Design System Lead",
      company: "StartupXYZ",
      content:
        "The attention to detail and accessibility features are outstanding. Our users love it.",
      avatar: "https://picsum.photos/64/64?random=2",
    },
    {
      name: "Emily Johnson",
      role: "Product Manager",
      company: "InnovateLabs",
      content:
        "Finally, a component library that designers and developers both love working with.",
      avatar: "https://picsum.photos/64/64?random=3",
    },
  ];

  return (
    <div className="space-y-32 py-16">
      {/* Enhanced Features Section */}
      <section className="px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Badge variant="outline" className="mb-4">
              <Sparkles className="mr-2 h-3 w-3" />
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Built for modern development
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every component is crafted with performance, accessibility, and
              developer experience in mind.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Badge variant="outline" className="mb-4">
                <Code2 className="mr-2 h-3 w-3" />
                Interactive Demo
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Try it yourself
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the flexibility and power of our components.
                Customize styles, variants, and see changes in real-time.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Real-time customization
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Multiple variants
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Instant feedback
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <InteractiveDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection />

      {/* Enhanced Stats Section */}
      <section className="px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Trusted by developers worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              Join the growing community building amazing products
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                number: 50000,
                label: "Developers",
                icon: <Users className="h-6 w-6" />,
              },
              {
                number: 100000,
                label: "Downloads",
                icon: <Trophy className="h-6 w-6" />,
              },
              {
                number: 99,
                label: "Satisfaction",
                icon: <Target className="h-6 w-6" />,
              },
              {
                number: 24,
                label: "Support",
                icon: <Heart className="h-6 w-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={scaleIn}
              >
                <motion.div
                  className="flex justify-center mb-4 text-primary group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 10 }}
                >
                  {stat.icon}
                </motion.div>
                <AnimatedCounter end={stat.number} />
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Badge variant="outline" className="mb-4">
              <Star className="mr-2 h-3 w-3" />
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What developers are saying
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      &apos;{testimonial.content}&apos;
                    </p>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Epic Final CTA */}
      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative z-10 p-8 md:p-16 text-center text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    className="flex items-center gap-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 fill-yellow-300 text-yellow-300"
                      />
                    ))}
                  </motion.div>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Ready to build something
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                    extraordinary?
                  </span>
                </h2>

                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join over 50,000 developers who are creating the future with
                  our component library. Start your journey today and experience
                  the difference.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="secondary"
                      className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90"
                    >
                      <Rocket className="mr-2 h-5 w-5" />
                      Start Building Now
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
                    >
                      <Code2 className="mr-2 h-5 w-5" />
                      View Documentation
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8 text-sm text-white/70"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  Free forever • No credit card required • MIT License
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
