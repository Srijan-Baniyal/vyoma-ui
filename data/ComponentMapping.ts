import Installation from "@/components/Installation";
import Introduction from "@/components/Introduction";
import StoryBehind from "@/components/StoryBehind";
import Changelog from "@/components/ChangeLog";

export type ComponentEntry = {
  name: string;
  component: React.ComponentType;
  route: string;
  isNew?: boolean;
  description?: string;
};

export type ComponentCategoryMap = {
  [category: string]: ComponentEntry[];
};

export const componentMap: ComponentCategoryMap = {
  "Get Started": [
    {
      name: "Introduction",
      component: Introduction,
      route: "/get-started/introduction",
    },
    {
      name: "Installation",
      component: Installation,
      route: "/get-started/installation",
    },
    {
      name: "Story Behind",
      component: StoryBehind,
      route: "/get-started/story-behind",
    },
    {
      name: "Changelog",
      component: Changelog,
      route: "/get-started/changelog",
    },
  ],
  "Text Animation": [
    {
      name: "Decryption Text",
      component: Introduction,
      route: "/text-animation/decryption-text",
    },
    {
      name: "Typing Text",
      component: Introduction,
      route: "/text-animation/typing-text",
    },
    {
      name: "Counting Number",
      component: Introduction,
      route: "/text-animation/counting-number",
    },
  ],
  Components: [
    {
      name: "Accordion",
      component: Introduction,
      route: "/components/accordion",
    },
    {
      name: "Buttons",
      component: Introduction,
      route: "/components/buttons",
    },
    {
      name: "Card",
      component: Introduction,
      route: "/components/card",
    },
    {
      name: "Checkbox",
      component: Introduction,
      route: "/components/checkbox",
    },
    {
      name: "Navigation",
      component: Introduction,
      route: "/components/navigation",
    },
    {
      name: "Sheet",
      component: Introduction,
      route: "/components/sheet",
    },
    {
      name: "Skeleton",
      component: Introduction,
      route: "/components/skeleton",
    },
    {
      name: "Tooltip",
      component: Introduction,
      route: "/components/tooltip",
    },
  ],
};
