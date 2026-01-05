"use client";

import {
  BookOpenIcon,
  ChevronDownIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  CodeIcon,
  ExternalLinkIcon,
  GithubIcon,
  HeartIcon,
  MenuIcon,
  MessageCircleIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/buttonShadcn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const components = [
  {
    title: "Button",
    href: "/components/button",
    description: "Displays a button or a component that looks like a button.",
    icon: (
      <div className="h-4 w-4 rounded bg-gradient-to-br from-blue-400 to-blue-600 shadow-sm" />
    ),
  },
  {
    title: "Card",
    href: "/components/card",
    description: "Displays a card with header, content, and footer.",
    icon: (
      <div className="h-4 w-4 rounded bg-gradient-to-br from-green-400 to-green-600 shadow-sm" />
    ),
  },
  {
    title: "Dialog",
    href: "/components/dialog",
    description:
      "A window overlaid on either the primary window or another dialog window.",
    icon: (
      <div className="h-4 w-4 rounded bg-gradient-to-br from-purple-400 to-purple-600 shadow-sm" />
    ),
  },
  {
    title: "Input",
    href: "/components/input",
    description:
      "Displays a form input field or a component that looks like an input field.",
    icon: (
      <div className="h-4 w-4 rounded bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm" />
    ),
  },
  {
    title: "Progress",
    href: "/components/progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
    icon: (
      <div className="h-4 w-4 rounded bg-gradient-to-br from-red-400 to-red-600 shadow-sm" />
    ),
  },
  {
    title: "Tooltip",
    href: "/components/tooltip",
    description:
      "A popup that displays information related to an element when hovered.",
    icon: (
      <div className="h-4 w-4 rounded bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-sm" />
    ),
  },
];

const resources = [
  {
    title: "Documentation",
    href: "/docs",
    description: "Complete guide to using our component library",
    icon: <BookOpenIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Components",
    href: "/components",
    description: "Browse all available components and examples",
    icon: <CodeIcon className="h-4 w-4 text-green-600 dark:text-green-400" />,
  },
  {
    title: "Themes",
    href: "/themes",
    description: "Customize the look and feel of your components",
    icon: (
      <PaletteIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
    ),
  },
  {
    title: "Getting Started",
    href: "/getting-started",
    description: "Quick start guide and installation instructions",
    icon: (
      <RocketIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
    ),
  },
];

const statusItems = [
  {
    title: "Planning",
    description: "Ideas and concepts in development",
    icon: (
      <CircleHelpIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
    ),
    count: "12",
  },
  {
    title: "In Progress",
    description: "Currently being developed",
    icon: <CircleIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
    count: "8",
  },
  {
    title: "Completed",
    description: "Ready to use components",
    icon: (
      <CircleCheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
    ),
    count: "24",
  },
];

const community = [
  {
    title: "GitHub",
    href: "https://github.com",
    description: "Star us on GitHub and contribute",
    icon: <GithubIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />,
    external: true,
  },
  {
    title: "Twitter",
    href: "https://twitter.com",
    description: "Follow us for updates and news",
    icon: <TwitterIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />,
    external: true,
  },
  {
    title: "Discord",
    href: "https://discord.com",
    description: "Join our community discussions",
    icon: (
      <MessageCircleIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
    ),
    external: true,
  },
];

function ListItem({
  title,
  children,
  href,
  icon,
  external = false,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li {...props}>
      <Link
        className="group block select-none space-y-1 rounded-lg border border-transparent p-4 leading-none no-underline outline-none transition-all duration-200 hover:border-border/50 hover:bg-accent hover:text-accent-foreground hover:shadow-md focus:bg-accent focus:text-accent-foreground focus:shadow-md"
        href={href}
        rel={external ? "noopener noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      >
        <div className="flex items-center gap-3">
          <div className="transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm leading-none tracking-tight">
              {title}
            </span>
            {external && <ExternalLinkIcon className="h-3 w-3 opacity-50" />}
          </div>
        </div>
        <p className="line-clamp-2 text-muted-foreground text-sm leading-snug transition-colors duration-200 group-hover:text-foreground/80">
          {children}
        </p>
      </Link>
    </li>
  );
}

function StatusItem({
  title,
  description,
  icon,
  count,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: string;
}) {
  return (
    <li {...props}>
      <Link
        className="group flex items-center gap-3 rounded-lg border border-transparent p-4 transition-all duration-200 hover:border-border/50 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
        href="#"
      >
        <div className="transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight">
              {title}
            </span>
            <Badge className="text-xs" variant="secondary">
              {count}
            </Badge>
          </div>
          <div className="text-muted-foreground text-sm transition-colors duration-200 group-hover:text-foreground/80">
            {description}
          </div>
        </div>
      </Link>
    </li>
  );
}

function MobileNavItem({
  title,
  items,
  icon,
}: {
  title: string;
  items: {
    title: string;
    href: string;
    description: string;
    icon: React.ReactNode;
    external?: boolean;
    count?: string;
  }[];
  icon?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible onOpenChange={setIsOpen} open={isOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 px-4 pb-2">
        {items.map((item, index) => (
          <Link
            className="flex items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            href={item.href}
            key={index}
            rel={item.external ? "noopener noreferrer" : undefined}
            target={item.external ? "_blank" : undefined}
          >
            {item.icon}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.title}</span>
                {item.external && (
                  <ExternalLinkIcon className="h-3 w-3 opacity-50" />
                )}
                {item.count && (
                  <Badge className="text-xs" variant="secondary">
                    {item.count}
                  </Badge>
                )}
              </div>
              <div className="text-muted-foreground text-xs">
                {item.description}
              </div>
            </div>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function NavigationShowcase() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link className="group flex items-center space-x-2" href="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground transition-transform duration-200 group-hover:scale-105">
                <SparklesIcon className="h-4 w-4" />
              </div>
              <span className="font-bold text-xl tracking-tight">VyomaUI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-1">
                  {/* Home */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium text-sm">
                      Home
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mt-4 mb-2 font-medium text-lg">
                              VyomaUI
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              Beautiful components for modern web applications.
                              Built with React, TypeScript, and Tailwind CSS.
                            </p>
                          </Link>
                        </li>
                        <ListItem
                          href="/docs"
                          icon={
                            <BookOpenIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          }
                          title="Introduction"
                        >
                          Get started with our component library
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          icon={
                            <RocketIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                          }
                          title="Installation"
                        >
                          Quick setup and installation guide
                        </ListItem>
                        <ListItem
                          href="/docs/examples"
                          icon={
                            <CodeIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          }
                          title="Examples"
                        >
                          Real-world examples and use cases
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Components */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium text-sm">
                      Components
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {components.map((component) => (
                          <ListItem
                            href={component.href}
                            icon={component.icon}
                            key={component.title}
                            title={component.title}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Resources */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium text-sm">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-3 p-6">
                        {resources.map((resource) => (
                          <ListItem
                            href={resource.href}
                            icon={resource.icon}
                            key={resource.title}
                            title={resource.title}
                          >
                            {resource.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Status */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium text-sm">
                      Status
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[280px] gap-2 p-6">
                        {statusItems.map((item) => (
                          <StatusItem
                            count={item.count}
                            description={item.description}
                            icon={item.icon}
                            key={item.title}
                            title={item.title}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Community */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-medium text-sm">
                      Community
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[260px] gap-3 p-6">
                        {community.map((item) => (
                          <ListItem
                            external={item.external}
                            href={item.href}
                            icon={item.icon}
                            key={item.title}
                            title={item.title}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Documentation Link */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        className={navigationMenuTriggerStyle()}
                        href="/docs"
                      >
                        Documentation
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-4 lg:flex">
              <Button asChild size="sm" variant="outline">
                <Link href="/docs">Get Started</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/support">
                  <HeartIcon className="mr-2 h-4 w-4" />
                  Support Us
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
              <SheetTrigger asChild>
                <Button className="lg:hidden" size="sm" variant="ghost">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px]" side="right">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                      <SparklesIcon className="h-3 w-3" />
                    </div>
                    VyomaUI
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <MobileNavItem
                    icon={<SparklesIcon className="h-4 w-4" />}
                    items={[
                      {
                        title: "Introduction",
                        href: "/docs",
                        description: "Get started with our component library",
                        icon: (
                          <BookOpenIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        ),
                      },
                      {
                        title: "Installation",
                        href: "/docs/installation",
                        description: "Quick setup guide",
                        icon: (
                          <RocketIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ),
                      },
                      {
                        title: "Examples",
                        href: "/docs/examples",
                        description: "Real-world examples",
                        icon: (
                          <CodeIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        ),
                      },
                    ]}
                    title="Home"
                  />
                  <MobileNavItem
                    icon={<CodeIcon className="h-4 w-4" />}
                    items={components}
                    title="Components"
                  />
                  <MobileNavItem
                    icon={<BookOpenIcon className="h-4 w-4" />}
                    items={resources}
                    title="Resources"
                  />
                  <MobileNavItem
                    icon={<CircleCheckIcon className="h-4 w-4" />}
                    items={statusItems.map((item) => ({
                      ...item,
                      href: "#",
                    }))}
                    title="Status"
                  />
                  <MobileNavItem
                    icon={<MessageCircleIcon className="h-4 w-4" />}
                    items={community}
                    title="Community"
                  />

                  <div className="border-t pt-4">
                    <Link
                      className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      href="/docs"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookOpenIcon className="h-4 w-4" />
                      Documentation
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href="/docs"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link
                        href="/support"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <HeartIcon className="mr-2 h-4 w-4" />
                        Support Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
