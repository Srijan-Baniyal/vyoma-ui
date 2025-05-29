import { Component, FileText } from "lucide-react";
import { LucideIcon } from "lucide-react";

type RoutesProps = {
  groupKey: string;
  groupValue: string;
  icon: LucideIcon;
  children: {
    label: string;
    value: string;
    url: string;
    tag?: {
      label: "new" | "most-popular" | "updated";
      color: "bg-lime-400" | "bg-amber-500" | "bg-blue-400";
    };
  }[];
};

export type { RoutesProps };

// Define base path only once
const BASE_PATH = "/docs";

// Routes for page navigation and left sidebar sorting
export const ROUTES: RoutesProps[] = [
  {
    groupKey: "gettingStart",
    groupValue: "Getting Started",
    icon: FileText,
    children: [
      {
        label: "Introduction",
        value: "introduction",
        url: `${BASE_PATH}`,
      },
      {
        label: "Installation",
        value: "installation",
        url: `${BASE_PATH}/installation`,
      },
    ],
  },
  {
    groupKey: "components",
    groupValue: "Components",
    icon: Component,
    children: [],
  },
];

// Flatten routes for simpler navigation
// NOTE: This is no longer used in the search component , remove this if its not used anywhere else.
export const page_routes = ROUTES.map(({ children }) => {
  return children.map((link) => ({
    title: link.label,
    href: link.url,
  }));
}).flat();
