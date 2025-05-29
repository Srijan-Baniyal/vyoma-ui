"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/Site";
import { Icons } from "@/components/ui/Icons";
import { MainNav } from "@/components/MainNav";
import { MobileNav } from "@/components/MobileNav";
import ThemeToggle from "@/components/ui/ThemeToggleButton";

export function DocNavbar() {
  return (
    <header className="border-grid sticky top-0 z-[50]  w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper ">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <MobileNav />
          <MainNav />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden md:flex items-center gap-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.gitHub className="h-5 w-4 mr-2" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.twitter className="h-3 w-4 mr-2" />
              </Link>
            </div>
            <nav className="flex items-center gap-0.5">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
