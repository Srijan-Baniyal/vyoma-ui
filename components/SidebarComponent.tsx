"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Home,
  Menu,
  X,
  ExternalLink,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { componentMap } from "@/data/ComponentMapping";
import type { ComponentEntry } from "@/data/ComponentMapping";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import V from "@/public/VyomaUI.svg";
import Footer from "@/components/Footer";

export default function SidebarComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComponents, setFilteredComponents] =
    useState<Record<string, ComponentEntry[]>>(componentMap);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Filter components based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredComponents(componentMap);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered: Record<string, ComponentEntry[]> = {};

    Object.entries(componentMap).forEach(([category, components]) => {
      const matchedComponents = components.filter((comp) =>
        comp.name.toLowerCase().includes(query)
      );

      if (matchedComponents.length > 0) {
        filtered[category] = matchedComponents;
      }
    });

    setFilteredComponents(filtered);
  }, [searchQuery]);

  function BreadcrumbNavigation() {
    // Generate breadcrumb items based on current path
    const generateBreadcrumbs = () => {
      const breadcrumbs = [
        { label: "Home", href: "/", isActive: pathname === "/" },
      ];

      // Try to find the route in componentMap
      const getComponentInfo = (route: string) => {
        for (const [category, components] of Object.entries(componentMap)) {
          const component = components.find((comp) => comp.route === route);
          if (component) {
            return { category, component: component.name };
          }
        }
        return null;
      };

      const componentInfo = getComponentInfo(pathname);
      if (componentInfo) {
        breadcrumbs.push({
          label: componentInfo.category,
          href: "#",
          isActive: false,
        });
        breadcrumbs.push({
          label: componentInfo.component,
          href: pathname,
          isActive: true,
        });
      } else {
        // fallback for unknown routes
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0) {
          breadcrumbs.push({
            label:
              segments[segments.length - 1].charAt(0).toUpperCase() +
              segments[segments.length - 1].slice(1),
            href: pathname,
            isActive: true,
          });
        }
      }
      return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                {breadcrumb.isActive ? (
                  <BreadcrumbPage className="flex items-center gap-1 text-primary">
                    {index === 0 && <Home className="size-4" />}
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Link href={breadcrumb.href}>
                      {index === 0 && <Home className="size-4" />}
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
    );
  }

  return (
    <>
      <SidebarProvider>
        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <Sidebar className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
          <SidebarHeader className="border-b p-0">
            <div className="flex items-center justify-between p-4">
              <Link
                href="/"
                className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Image
                    src={V || "/placeholder.svg"}
                    alt="Vyoma UI"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Vyoma UI</span>
                  <span className="text-xs text-muted-foreground">
                    Beautiful components
                  </span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search components..."
                  className="w-full pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="flex flex-col flex-1 p-0">
            <ScrollArea className="flex-1">
              <div className="p-2">
                {Object.entries(filteredComponents).length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No components found
                    </p>
                  </div>
                ) : (
                  Object.entries(filteredComponents).map(
                    ([category, components], index) => (
                      <Collapsible
                        key={category}
                        defaultOpen={true}
                        className="group/collapsible mb-2"
                      >
                        <SidebarGroup className="p-0">
                          <CollapsibleTrigger asChild>
                            <SidebarGroupLabel
                              className="group/label text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors cursor-pointer flex items-center justify-between w-full px-3 py-2"
                              aria-label={`${category} category`}
                            >
                              <span>{category}</span>
                              <Badge
                                variant="outline"
                                className="text-xs font-normal bg-muted"
                              >
                                {components.length}
                              </Badge>
                              <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 ml-1 text-muted-foreground" />
                            </SidebarGroupLabel>
                          </CollapsibleTrigger>

                          <CollapsibleContent className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                            <SidebarGroupContent>
                              <SidebarMenu className="gap-1">
                                {components.map((comp) => {
                                  const isActive = pathname === comp.route;
                                  return (
                                    <SidebarMenuItem key={comp.route}>
                                      <TooltipProvider delayDuration={300}>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <SidebarMenuButton
                                              asChild
                                              className={cn(
                                                "h-8 px-3 text-sm rounded-md transition-colors flex items-center gap-2",
                                                isActive
                                                  ? "bg-accent text-accent-foreground font-medium"
                                                  : "hover:bg-accent/50 hover:text-accent-foreground"
                                              )}
                                              aria-current={
                                                isActive ? "page" : undefined
                                              }
                                            >
                                              <Link
                                                href={comp.route}
                                                className="flex items-center gap-2 w-full"
                                              >
                                                <div
                                                  className={cn(
                                                    "size-1.5 rounded-full",
                                                    isActive
                                                      ? "bg-primary"
                                                      : "bg-muted-foreground/40"
                                                  )}
                                                />
                                                <span className="truncate">
                                                  {comp.name}
                                                </span>
                                                {comp.isNew && (
                                                  <Badge className="ml-auto text-[0.6rem] px-1 py-0 h-4">
                                                    NEW
                                                  </Badge>
                                                )}
                                              </Link>
                                            </SidebarMenuButton>
                                          </TooltipTrigger>
                                          <TooltipContent
                                            side="right"
                                            className="max-w-[200px]"
                                          >
                                            <p>{comp.name}</p>
                                            {comp.description && (
                                              <p className="text-xs text-muted-foreground">
                                                {comp.description}
                                              </p>
                                            )}
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </SidebarMenuItem>
                                  );
                                })}
                              </SidebarMenu>
                            </SidebarGroupContent>
                          </CollapsibleContent>
                        </SidebarGroup>

                        {index <
                          Object.entries(filteredComponents).length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </Collapsible>
                    )
                  )
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-4 bg-background">
              <Link
                href="https://github.com/Srijan-Baniyal/VyomaUI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md p-2 hover:bg-accent"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="size-4" />
              </Link>
            </div>
          </SidebarContent>

          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="size-4" />
            </Button>
            <SidebarTrigger className="-ml-1 hidden md:flex" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 hidden md:block"
            />
            <BreadcrumbNavigation />
          </header>

          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6 w-full">
              <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
