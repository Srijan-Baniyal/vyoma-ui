"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/buttonShadcn";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

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
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Icons.logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <h2 className="text-2xl font-bold">Vyoma UI</h2>
                <p className="text-sm text-muted-foreground">Truly Beyond UI</p>
              </div>
            </Link>

            <p className="text-muted-foreground max-w-md leading-relaxed">
              A modern UI design system crafted with spatial wisdom and
              thoughtful design. Build beautiful interfaces that feel natural
              and intuitive.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by</span>
              <Link
                href="https://www.srijanbaniyal.com"
                target="_blank"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                @srijanbaniyal
              </Link>
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://github.com/Srijan-Baniyal/VyomaUI"
                  target="_blank"
                  className="gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://www.linkedin.com/in/srijan-baniyal/"
                  target="_blank"
                  className="gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://x.com/compose/"
                  target="_blank"
                  className="gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Share
                </Link>
              </Button>
            </div>
          </div>

          {/* Documentation links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-foreground">Documentation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/get-started/introduction"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/components/accordion"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Showcase
                </Link>
              </li>
              <li>
                <Link
                  href="/themes "
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Themes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/tos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/license"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vyoma UI. All rights reserved.
            </p>

            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Powered by</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Next.js</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
                <span>•</span>
                <span>Shadcn UI</span>
                <span>•</span>
                <span>GSAP</span>
                <span>•</span>
                <span>Motion</span>
                <span>•</span>
                <span>Three.js</span>
                <span>•</span>
                <span>Vanta.js</span>
                <span>•</span>
                <span>Animate.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large brand text */}
        <div className="w-full flex mt-16 items-center justify-center">
          <h1 className="text-center text-4xl md:text-6xl lg:text-8xl xl:text-[8rem] font-black bg-gradient-to-b from-foreground/10 to-foreground/5 bg-clip-text text-transparent select-none leading-none">
            VYOMA UI
          </h1>
        </div>
      </div>
    </footer>
  );
}
