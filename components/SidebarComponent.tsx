"use client";

import {
  IconChevronRight as ChevronRight,
  IconExternalLink as ExternalLink,
  IconHome as Home,
  IconMoon as Moon,
  IconSearch as Search,
  IconSun as Sun,
  IconX as X,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import parser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/buttonShadcn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ComponentEntry } from "@/data/ComponentMapping";
import { componentMap } from "@/data/ComponentMapping";
import { cn } from "@/lib/utils";
import V from "@/public/VyomaUI.svg";

interface SidebarComponentProps {
  children: React.ReactNode;
}

const ANIMATION_DURATION = 0.15;
const SEARCH_DEBOUNCE_MS = 150;

// Enhanced animation variants with reduced motion support
const createAnimationVariants = (shouldReduceMotion: boolean) => ({
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: shouldReduceMotion ? 0 : ANIMATION_DURATION },
  },
  pageTransition: {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
    transition: { duration: shouldReduceMotion ? 0 : ANIMATION_DURATION },
  },
  collapsibleContent: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
    },
  },
});

export default function SidebarComponent({ children }: SidebarComponentProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    () => {
      // Try to load from localStorage first, then default to all open
      if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("sidebar-categories");
          if (saved) {
            return JSON.parse(saved);
          }
        } catch (error) {
          console.warn("Failed to load sidebar state:", error);
        }
      }

      // Default: all categories open
      const initial: Record<string, boolean> = {};
      for (const category of Object.keys(componentMap)) {
        initial[category] = true;
      }
      return initial;
    }
  );

  const animations = useMemo(
    () => createAnimationVariants(shouldReduceMotion ?? false),
    [shouldReduceMotion]
  );

  // Debounced search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Optimized filtered components with useMemo
  const filteredComponents = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return componentMap;
    }

    const query = debouncedSearchQuery.toLowerCase();
    const filtered: Record<string, ComponentEntry[]> = {};

    for (const [category, components] of Object.entries(componentMap)) {
      const matchedComponents = components.filter(
        (comp) =>
          comp.name.toLowerCase().includes(query) ||
          comp.description?.toLowerCase().includes(query)
      );

      if (matchedComponents.length > 0) {
        filtered[category] = matchedComponents;
      }
    }

    return filtered;
  }, [debouncedSearchQuery]);

  // Initialize dark mode state
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // Optimized handlers with useCallback
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleThemeToggle = useCallback(() => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  }, [isDarkMode]);

  const toggleCategory = useCallback((category: string) => {
    setOpenCategories((prev) => {
      const newState = {
        ...prev,
        [category]: !prev[category],
      };

      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("sidebar-categories", JSON.stringify(newState));
        } catch (error) {
          console.warn("Failed to save sidebar state:", error);
        }
      }

      return newState;
    });
  }, []);

  // Enhanced breadcrumb generation with memoization
  const breadcrumbs = useMemo((): {
    label: string;
    href: string;
    isActive: boolean;
  }[] => {
    const items: { label: string; href: string; isActive: boolean }[] = [
      { label: "Home", href: "/", isActive: pathname === "/" },
    ];

    // Find component info more efficiently
    for (const [category, components] of Object.entries(componentMap)) {
      const component = components.find((comp) => comp.route === pathname);
      if (component) {
        items.push(
          { label: category, href: "#", isActive: false },
          { label: component.name, href: pathname, isActive: true }
        );
        return items;
      }
    }

    // Fallback for unknown routes
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const lastSegment = segments.at(-1);
      if (lastSegment) {
        items.push({
          label: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1),
          href: pathname,
          isActive: true,
        });
      }
    }

    return items;
  }, [pathname]);

  const BreadcrumbNavigation = React.memo(() => (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={`${breadcrumb.href}-${breadcrumb.label}`}>
            <BreadcrumbItem>
              {breadcrumb.isActive ? (
                <BreadcrumbPage className="flex items-center gap-1.5 font-medium text-primary">
                  {index === 0 && <Home className="size-3.5" />}
                  {breadcrumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  className="flex items-center gap-1.5 transition-colors duration-200 hover:text-primary"
                >
                  <Link href={breadcrumb.href}>
                    {index === 0 && <Home className="size-3.5" />}
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  ));

  BreadcrumbNavigation.displayName = "BreadcrumbNavigation";

  const SidebarMenuItemComponent = React.memo(
    ({ comp }: { comp: ComponentEntry }) => {
      const isActive = pathname === comp.route;

      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                aria-current={isActive ? "page" : undefined}
                asChild
                className={cn(
                  "group relative flex h-9 items-center gap-2.5 overflow-hidden rounded-lg px-3 text-sm transition-all duration-200",
                  isActive
                    ? "border border-primary/20 bg-primary/10 font-medium text-primary shadow-sm"
                    : "hover:bg-accent/70 hover:text-accent-foreground hover:shadow-sm"
                )}
              >
                <Link
                  className="flex w-full min-w-0 items-center gap-2.5"
                  href={comp.route}
                >
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      isActive
                        ? "bg-primary shadow-sm"
                        : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                    )}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="truncate font-medium">{comp.name}</span>
                  {isActive && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/5 to-transparent"
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent
              className="max-w-55 border bg-background p-3 shadow-lg"
              side="right"
              sideOffset={8}
            >
              <div className="space-y-1">
                <p className="font-medium text-black text-sm dark:text-white">
                  {comp.name}
                </p>
                {comp.description && (
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {parser(comp.description)}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  );

  SidebarMenuItemComponent.displayName = "SidebarMenuItemComponent";

  return (
    <div className="block w-full text-left [all:unset]">
      <SidebarProvider>
        <Sidebar className="z-40 border-r bg-background/98 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/95">
          <SidebarHeader className="border-border/50 border-b p-0">
            <div className="flex items-center justify-between p-4">
              <Link
                className="group -m-1 flex items-center gap-3 rounded-lg p-1 transition-all duration-200 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                href="/"
              >
                <div className="flex aspect-square size-12 items-center justify-center rounded-xl border border-primary/20 bg-linear-to-br from-primary/10 to-primary/5 transition-all duration-200 group-hover:border-primary/30">
                  <Image
                    alt="Vyoma UI Logo"
                    className="transition-transform duration-200 group-hover:scale-110"
                    height={32}
                    src={V}
                    width={32}
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-base transition-colors duration-200 group-hover:text-primary">
                    Vyoma UI
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Beautiful components
                  </span>
                </div>
              </Link>
            </div>
            <div className="px-4 pb-4">
              <div className="group relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary" />
                <Input
                  aria-label="Search components"
                  className="h-10 w-full border-border/50 bg-background/50 pl-10 transition-all duration-200 focus:border-primary/50 focus:bg-background"
                  onChange={handleSearchChange}
                  placeholder="Search components..."
                  type="search"
                  value={searchQuery}
                />
                {searchQuery && (
                  <Button
                    aria-label="Clear search"
                    className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 hover:bg-accent/70"
                    onClick={() => setSearchQuery("")}
                    size="icon"
                    variant="ghost"
                  >
                    <X className="size-3" />
                  </Button>
                )}
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="flex flex-1 flex-col p-0">
            <ScrollArea className="flex-1">
              <div className="p-3">
                {Object.entries(filteredComponents).length === 0 ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-12 text-center"
                    initial={{ opacity: 0, y: 10 }}
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="mb-1 font-medium text-foreground text-sm">
                      No components found
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Try adjusting your search terms
                    </p>
                  </motion.div>
                ) : (
                  Object.entries(filteredComponents).map(
                    ([category, components], index) => (
                      <Collapsible
                        className="group/collapsible mb-3"
                        key={category}
                        onOpenChange={() => toggleCategory(category)}
                        open={openCategories[category] === true}
                      >
                        <SidebarGroup className="p-0">
                          <CollapsibleTrigger asChild>
                            <SidebarGroupLabel
                              aria-label={`${category} category`}
                              className="group/label flex w-full cursor-pointer items-center justify-between rounded-lg border border-transparent px-3 py-2.5 font-semibold text-sm transition-all duration-200 hover:border-border/50 hover:bg-accent/60 hover:text-accent-foreground"
                            >
                              <span className="text-foreground">
                                {category}
                              </span>
                              <div className="flex items-center gap-2">
                                <Badge
                                  className="border-0 bg-muted/70 px-2 py-0.5 font-medium text-muted-foreground text-xs"
                                  variant="secondary"
                                >
                                  {components.length}
                                </Badge>
                                <ChevronRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover/label:text-foreground group-data-[state=open]/collapsible:rotate-90" />
                              </div>
                            </SidebarGroupLabel>
                          </CollapsibleTrigger>

                          <CollapsibleContent className="overflow-hidden">
                            <motion.div
                              {...animations.collapsibleContent}
                              className="space-y-1 pt-1"
                            >
                              <SidebarGroupContent>
                                <SidebarMenu className="gap-1">
                                  {components.map((comp) => (
                                    <SidebarMenuItem key={comp.route}>
                                      <SidebarMenuItemComponent comp={comp} />
                                    </SidebarMenuItem>
                                  ))}
                                </SidebarMenu>
                              </SidebarGroupContent>
                            </motion.div>
                          </CollapsibleContent>
                        </SidebarGroup>

                        {index <
                          Object.entries(filteredComponents).length - 1 && (
                          <Separator className="my-3 bg-border/50" />
                        )}
                      </Collapsible>
                    )
                  )
                )}
              </div>
            </ScrollArea>

            <div className="border-border/50 border-t bg-background/50 p-4">
              <Link
                className="group flex w-full items-center justify-between rounded-lg border border-transparent p-3 text-muted-foreground text-sm transition-all duration-200 hover:border-border/50 hover:bg-accent/60 hover:text-foreground"
                href="https://github.com/Srijan-Baniyal/vyoma-ui"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="font-medium">GitHub Repository</span>
                <ExternalLink className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </SidebarContent>

          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-border/50 border-b bg-background/98 px-4 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/95">
            <SidebarTrigger className="mr-2 h-9 w-9 md:hidden" />
            <SidebarTrigger className="-ml-1 hidden transition-colors duration-200 hover:bg-accent/70 md:flex" />
            <Separator
              className="mr-2 hidden h-4 bg-border/50 md:block"
              orientation="vertical"
            />
            <BreadcrumbNavigation />
            <div className="ml-auto flex items-center gap-2">
              {/* More things will come here */}
              <Button
                aria-label="Toggle theme"
                className="relative h-9 w-9 overflow-hidden transition-all duration-200 hover:bg-accent/70"
                onClick={handleThemeToggle}
                size="icon"
                variant="ghost"
              >
                <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </header>

          <div className="flex flex-1 flex-col">
            <main className="w-full flex-1 p-6">
              <div className="mx-auto max-w-7xl">
                <AnimatePresence mode="wait">
                  <motion.div key={pathname} {...animations.pageTransition}>
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
