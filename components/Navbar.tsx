"use client";

import {
  DesignedNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/DesignedNavbar";
import { useState } from "react";
import ThemeToggleButton from "./ui/ThemeToggleButton";
import Background from "./Background";
import { HeroSection } from "./HeroSection";
import { Github } from "lucide-react";
import { ScrollSections } from "@/components/ScrollSections";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Docs",
      link: "/docs",
    },
    {
      name: "Themes",
      link: "/themes",
    },
    {
      name: "Components",
      link: "/docs/components",
    },
    {
      name: "Colors",
      link: "/colors",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <DesignedNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">
              <ThemeToggleButton
                variant="gif"
                url="https://media.giphy.com/media/ArfrRmFCzYXsC6etQX/giphy.gif?cid=ecf05e47kn81xmnuc9vd5g6p5xyjt14zzd3dzwso6iwgpvy3&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              />
            </NavbarButton>
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full justify-center mb-4">
              <ThemeToggleButton
                variant="gif"
                url="https://media.giphy.com/media/ArfrRmFCzYXsC6etQX/giphy.gif?cid=ecf05e47kn81xmnuc9vd5g6p5xyjt14zzd3dzwso6iwgpvy3&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              />
            </div>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </DesignedNavbar>
      <HeroPlacementFunction />
      {/* Navbar */}
    </div>
  );
}

const HeroPlacementFunction = () => {
  return (
    <>
      <div className="pt-7">
        <Background />
        <main className="min-h-screen">
          <HeroSection
            badge={{
              text: "Introducing our new components",
              action: {
                text: "Learn more",
                href: "/docs",
              },
            }}
            title="Build faster with beautiful components"
            description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
            actions={[
              {
                text: "Get Started",
                href: "/docs/getting-started",
                variant: "default",
              },
              {
                text: "GitHub",
                href: "https://github.com/your-repo",
                variant: "outline",
                icon: <Github className="h-5 w-5" />,
              },
            ]}
            image={{
              light: "/placeholder.svg?height=765&width=1248",
              dark: "/placeholder.svg?height=765&width=1248",
              alt: "UI Components Preview",
            }}
          />

          <ScrollSections />
        </main>
      </div>
    </>
  );
};
