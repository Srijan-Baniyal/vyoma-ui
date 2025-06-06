"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import V from "@/public/VyomaUI.svg";
import Image from "next/image";

export default function SidebarComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  function BreadcrumbNavigation() {
    const pathname = usePathname();
    // Helper function to get component info from route
    const getComponentInfo = (route: string) => {
      for (const [category, components] of Object.entries(componentMap)) {
        const component = components.find((comp) => comp.route === route);
        if (component) {
          return { category, component: component.name };
        }
      }
      return null;
    };
    // Generate breadcrumb items based on current path
    const generateBreadcrumbs = () => {
      const segments = pathname.split("/").filter(Boolean);
      const breadcrumbs = [
        { label: "Home", href: "/", isActive: pathname === "/" },
      ];

      if (segments.length > 0) {
        // If we're on a component page
        if (segments[0] === "components" && segments[1]) {
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
            // Fallback for unknown routes
            breadcrumbs.push({
              label:
                segments[segments.length - 1].charAt(0).toUpperCase() +
                segments[segments.length - 1].slice(1),
              href: pathname,
              isActive: true,
            });
          }
        } else {
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
                  <BreadcrumbPage className="flex items-center gap-1">
                    {index === 0 && <Home className="size-4" />}
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="flex items-center gap-1">
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
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Image src={V} alt="Vyoma UI" width={32} height={32} />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Vyoma UI</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-0">
          <div className="p-2">
            {Object.entries(componentMap).map(
              ([category, components], index) => (
                <Collapsible
                  key={category}
                  defaultOpen={index === 0}
                  className="group/collapsible"
                >
                  <SidebarGroup className="p-0">
                    <CollapsibleTrigger asChild>
                      <SidebarGroupLabel className="group/label text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors cursor-pointer flex items-center justify-between w-full px-2 py-2">
                        <span>{category}</span>
                        <ChevronRight className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarGroupLabel>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="space-y-1">
                      <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                          {components.map((comp) => (
                            <SidebarMenuItem key={comp.route}>
                              <SidebarMenuButton
                                asChild
                                className="h-8 px-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                              >
                                <Link
                                  href={comp.route}
                                  className="flex items-center gap-2"
                                >
                                  <div className="size-1.5 rounded-full bg-muted-foreground/40" />
                                  <span className="truncate">{comp.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>

                  {index < Object.entries(componentMap).length - 1 && (
                    <Separator className="my-2" />
                  )}
                </Collapsible>
              )
            )}
          </div>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <BreadcrumbNavigation />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
