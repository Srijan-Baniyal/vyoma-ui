import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { componentMap } from "@/data/ComponentMapping";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarProvider>
        <Sidebar>
          <SidebarMenu>
            {Object.entries(componentMap).map(([category, components]) => {
              console.log("DEBUG SIDEBAR CATEGORY:", category);
              return (
                <SidebarGroup key={category}>
                  <SidebarGroupLabel>{category}</SidebarGroupLabel>
                  {components.map((comp) => {
                    console.log("DEBUG SIDEBAR COMPONENT:", comp.name, comp.route);
                    return (
                      <SidebarMenuItem key={comp.route}>
                        <SidebarMenuButton asChild>
                          <Link href={comp.route}>{comp.name}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarGroup>
              );
            })}
          </SidebarMenu>
        </Sidebar>
      </SidebarProvider>
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
