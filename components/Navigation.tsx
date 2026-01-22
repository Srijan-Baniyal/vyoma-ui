"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarLogo,
  NavItems,
} from "@/components/ui/ResizeAbleNavbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

async function getGitHubStars(): Promise<number> {
  try {
    // Make the API call
    const response = await fetch(
      "https://api.github.com/repos/Srijan-Baniyal/vyoma-ui",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate: 3600, // Update every hour (3600 seconds)
        },
      }
    );

    // If something goes wrong, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch GitHub stars");
    }

    // Parse the JSON response
    const data = await response.json();

    // Return just the star count
    return data.stargazers_count;
  } catch (error) {
    // If anything fails, log it and return 0
    console.error("Error fetching GitHub stars:", error);
    return 0;
  }
}

export default function Navigation() {
  const navItems = [
    {
      name: "Components",
      link: "/components/accordion",
    },
    {
      name: "Showcase",
      link: "/showcase",
    },
    {
      name: "Theme(Beta)",
      link: "/themes",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const formatStarCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`; // 1500 → "1.5k"
    }
    return count.toString(); // 500 → "500"
  };

  useEffect(() => {
    getGitHubStars().then(setStars).catch(console.error);
  }, []);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 font-medium text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            href="https://github.com/Srijan-Baniyal/vyoma-ui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Star className="mr-2 h-4 w-4 fill-current" />
            {stars !== null ? (
              <>
                <span className="font-semibold">{formatStarCount(stars)}</span>
                <span className="ml-1">stars</span>
              </>
            ) : (
              "Star on GitHub"
            )}
          </Link>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item) => (
            <Link
              className="relative text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300"
              href={item.link}
              key={item.name}
              onClick={() => setIsMobileMenuOpen(false)}
              rel={
                item.link.startsWith("http") ? "noopener noreferrer" : undefined
              }
              target={item.link.startsWith("http") ? "_blank" : undefined}
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="mt-6 flex w-full flex-col gap-4">
            <Link
              className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 font-medium text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="https://github.com/Srijan-Baniyal/vyoma-ui"
              onClick={() => setIsMobileMenuOpen(false)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Star className="mr-2 h-4 w-4 fill-current" />
              {stars !== null ? (
                <>
                  <span className="font-semibold">
                    {formatStarCount(stars)}
                  </span>
                  <span className="ml-1">stars</span>
                </>
              ) : (
                "Star on GitHub"
              )}
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
