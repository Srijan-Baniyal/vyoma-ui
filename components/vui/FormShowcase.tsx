"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "../ui/buttonShadcn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function FormShowcase() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Form Component
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Beautiful, accessible, and responsive input fields with subtle
            motion and focus effects — built with Vyoma UI.
          </p>
        </div>

        {/* Demo Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-900/40 dark:to-gray-800/20 backdrop-blur-xl border border-border/50 shadow-xl rounded-3xl p-6 md:p-10"
        >
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl font-bold text-primary">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                A minimal, elegant form built with Vyoma UI’s design system
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Komal Sathvik"
                    className="focus:ring-2 focus:ring-primary/50 bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="komal@example.com"
                    className="focus:ring-2 focus:ring-primary/50 bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Let’s collaborate!"
                  className="focus:ring-2 focus:ring-primary/50 bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  className="focus:ring-2 focus:ring-primary/50 bg-white/10 border border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  variant="default"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105"
                >
                  Send Message 🚀
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Input Variations */}
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Form Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FormVariant
              title="Floating Labels"
              desc="Elegant labels that float above inputs when typing."
              variant="floating"
            />
            <FormVariant
              title="Outlined Inputs"
              desc="Modern outlined input style with soft focus effect."
              variant="outlined"
            />
            <FormVariant
              title="Glass Inputs"
              desc="Frosted glass background inputs for dark/light modes."
              variant="glass"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type FormVariantProps = {
  title: string;
  desc: string;
  variant: "floating" | "outlined" | "glass";
};

function FormVariant({ title, desc, variant }: FormVariantProps) {
  const baseStyle =
    "w-full px-4 py-2 rounded-xl outline-none transition-all duration-300";
  const styleMap: Record<string, string> = {
    floating:
      "bg-transparent border-b-2 border-white/40 text-white placeholder-transparent focus:border-primary/60 focus:placeholder-white/50",
    outlined:
      "border border-white/30 bg-white/5 text-white placeholder:text-white/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/40",
    glass:
      "bg-white/10 border border-white/20 text-white backdrop-blur-md placeholder:text-white/50 focus:ring-2 focus:ring-primary/40",
  };

  return (
    <Card className="bg-gradient-to-br from-white/5 to-white/10 border border-border/30 shadow-lg backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          {title}
        </CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className={`${baseStyle} ${styleMap[variant]}`}
          />
          <input
            type="email"
            placeholder="Your Email"
            className={`${baseStyle} ${styleMap[variant]}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
