"use client";

import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttonShadcn";
import { Icons } from "@/components/ui/Icons";

export default function Footer() {
  // This prevents the footer from rendering during initial hydration
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the footer until client-side hydration is complete
  if (!mounted) {
    return null;
  }

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* Main footer content */}
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mb-16 md:gap-12 lg:grid-cols-4">
          {/* Brand section */}
          <div className="space-y-4 sm:col-span-2 md:space-y-6">
            <Link className="group flex items-center gap-2 md:gap-3" href="/">
              <Icons.logo className="h-8 w-8 transition-transform duration-200 group-hover:scale-110 md:h-10 md:w-10" />
              <div>
                <h2 className="font-bold text-xl md:text-2xl">Vyoma UI</h2>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Truly Beyond UI
                </p>
              </div>
            </Link>

            <p className="max-w-md text-muted-foreground text-sm leading-relaxed md:text-base">
              A modern UI design system crafted with spatial wisdom and
              thoughtful design. Build beautiful interfaces that feel natural
              and intuitive.
            </p>

            <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
              <span>Built with</span>
              <Heart className="h-3 w-3 fill-current text-red-500 md:h-4 md:w-4" />
              <span>by</span>
              <Link
                className="font-medium text-foreground transition-colors hover:text-primary"
                href="https://www.srijanbaniyal.com"
                target="_blank"
              >
                @srijanbaniyal
              </Link>
            </div>

            {/* Social buttons */}
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Button
                asChild
                className="w-full sm:w-auto"
                size="sm"
                variant="outline"
              >
                <Link
                  className="justify-center gap-2 sm:justify-start"
                  href="https://github.com/Srijan-Baniyal/vyoma-ui"
                  target="_blank"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto"
                size="sm"
                variant="outline"
              >
                <Link
                  className="justify-center gap-2 sm:justify-start"
                  href="https://www.linkedin.com/in/srijan-baniyal/"
                  target="_blank"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto"
                size="sm"
                variant="outline"
              >
                <Link
                  className="justify-center gap-2 sm:justify-start"
                  href="https://x.com/compose/"
                  target="_blank"
                >
                  <Twitter className="h-4 w-4" />
                  Share
                </Link>
              </Button>
            </div>
          </div>

          {/* Documentation links */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-semibold text-foreground text-sm md:text-base">
              Documentation
            </h3>
            <ul className="space-y-2 text-sm md:space-y-3">
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/get-started/introduction"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/components/accordion"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/showcase"
                >
                  Showcase
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/themes "
                >
                  Themes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-semibold text-foreground text-sm md:text-base">
              Legal
            </h3>
            <ul className="space-y-2 text-sm md:space-y-3">
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/tos"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/license"
                >
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t pt-6 md:pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
            <p className="text-center text-muted-foreground text-xs md:text-left md:text-sm">
              © {new Date().getFullYear()} Vyoma UI. All rights reserved.
            </p>

            <div className="text-center">
              <p className="mb-2 text-muted-foreground text-xs">Powered by</p>
              {/* Mobile-friendly tech stack */}
              <div className="flex max-w-sm flex-wrap items-center justify-center gap-2 text-muted-foreground text-xs md:max-w-none">
                <span>Next.js</span>
                <span className="hidden sm:inline">•</span>
                <span>TypeScript</span>
                <span className="hidden sm:inline">•</span>
                <span>Tailwind CSS</span>
                <span className="hidden sm:inline">•</span>
                <span>Shadcn UI</span>
                <span className="hidden sm:inline">•</span>
                <span>GSAP</span>
                <span className="hidden sm:inline">•</span>
                <span>Motion</span>
                <span className="hidden lg:inline">•</span>
                <span className="hidden lg:inline">Three.js</span>
                <span className="hidden lg:inline">•</span>
                <span className="hidden lg:inline">Vanta.js</span>
                <span className="hidden lg:inline">•</span>
                <span className="hidden lg:inline">Animate.js</span>
              </div>
              {/* Secondary row for larger screens */}
              <div className="mt-1 hidden items-center justify-center gap-2 text-muted-foreground text-xs lg:flex">
                <span className="lg:hidden">Three.js</span>
                <span className="lg:hidden">•</span>
                <span className="lg:hidden">Vanta.js</span>
                <span className="lg:hidden">•</span>
                <span className="lg:hidden">Animate.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large brand text */}
        <div className="mt-12 flex w-full items-center justify-center md:mt-16">
          <h1 className="select-none bg-gradient-to-b from-foreground/10 to-foreground/5 bg-clip-text text-center font-black text-3xl text-transparent leading-none sm:text-4xl md:text-6xl lg:text-8xl xl:text-[8rem]">
            VYOMA UI
          </h1>
        </div>
      </div>
    </footer>
  );
}
