"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/buttonShadcn";

export default function FormShowcase() {
  const _isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-12 md:space-y-20">
        {/* Hero Section */}
        <div className="space-y-4 text-center md:space-y-6">
          <h1 className="bg-linear-to-r from-primary to-primary/60 bg-clip-text font-bold text-2xl text-transparent md:text-4xl lg:text-5xl">
            Form Component
          </h1>
          <p className="mx-auto max-w-2xl px-4 text-base text-muted-foreground md:text-xl">
            Beautiful, accessible, and responsive input fields with subtle
            motion and focus effects — built with Vyoma UI.
          </p>
        </div>

        {/* Demo Form */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border/50 bg-linear-to-br from-white/10 to-white/5 p-6 shadow-xl backdrop-blur-xl md:p-10 dark:from-gray-900/40 dark:to-gray-800/20"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-center font-bold text-2xl text-primary md:text-3xl">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                A minimal, elegant form built with Vyoma UI’s design system
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    className="border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-primary/50"
                    id="name"
                    placeholder="Komal Sathvik"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    className="border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-primary/50"
                    id="email"
                    placeholder="komal@example.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  className="border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-primary/50"
                  id="subject"
                  placeholder="Let’s collaborate!"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  className="min-h-30 border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-primary/50"
                  id="message"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  className="rounded-xl bg-dark px-6 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-dark/90"
                  variant="default"
                >
                  Send Message 🚀
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Input Variations */}
        <div className="space-y-10">
          <h2 className="text-center font-bold text-2xl md:text-3xl">
            Form Variations
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <FormVariant
              desc="Elegant labels that float above inputs when typing."
              title="Floating Labels"
              variant="floating"
            />
            <FormVariant
              desc="Modern outlined input style with soft focus effect."
              title="Outlined Inputs"
              variant="outlined"
            />
            <FormVariant
              desc="Frosted glass background inputs for dark/light modes."
              title="Glass Inputs"
              variant="glass"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormVariantProps {
  desc: string;
  title: string;
  variant: "floating" | "outlined" | "glass";
}

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
    <Card className="border border-border/30 bg-linear-to-br from-white/5 to-white/10 shadow-lg backdrop-blur-md">
      <CardHeader>
        <CardTitle className="font-semibold text-lg text-primary">
          {title}
        </CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <input
            className={`${baseStyle} ${styleMap[variant]}`}
            placeholder="Your Name"
            type="text"
          />
          <input
            className={`${baseStyle} ${styleMap[variant]}`}
            placeholder="Your Email"
            type="email"
          />
        </div>
      </CardContent>
    </Card>
  );
}
