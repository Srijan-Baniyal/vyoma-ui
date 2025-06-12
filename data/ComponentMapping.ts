import Installation from "@/components/Installation";
import Introduction from "@/components/Introduction";
import StoryBehind from "@/components/StoryBehind";
import Changelog from "@/components/ChangeLog";
import TextDecryptionShowcase from "@/components/vui/TextDecryption";

export type ComponentEntry = {
  name: string;
  component: React.ComponentType;
  route: string;
  path?: string;
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
      component: TextDecryptionShowcase,
      route: "/text-animation/decryption-text",
      path: "components/vui/TextDecryption.tsx",
    },
    {
      name: "Typing Text",
      component: Introduction,
      route: "/text-animation/typing-text",
      path: "components/Introduction.tsx",
    },
    {
      name: "Counting Number",
      component: Introduction,
      route: "/text-animation/counting-number",
      path: "components/Introduction.tsx",
    },
  ],
  Components: [
    {
      name: "Accordion",
      component: Introduction,
      route: "/components/accordion",
      path: "components/Introduction.tsx",
    },
    {
      name: "Buttons",
      component: Introduction,
      route: "/components/buttons",
      path: "components/Introduction.tsx",
    },
    {
      name: "Card",
      component: Introduction,
      route: "/components/card",
      path: "components/Introduction.tsx",
    },
    {
      name: "Checkbox",
      component: Introduction,
      route: "/components/checkbox",
      path: "components/Introduction.tsx",
    },
    {
      name: "Navigation",
      component: Introduction,
      route: "/components/navigation",
      path: "components/Introduction.tsx",
    },
    {
      name: "Sheet",
      component: Introduction,
      route: "/components/sheet",
      path: "components/Introduction.tsx",
    },
    {
      name: "Skeleton",
      component: Introduction,
      route: "/components/skeleton",
      path: "components/Introduction.tsx",
    },
    {
      name: "Tooltip",
      component: Introduction,
      route: "/components/tooltip",
      path: "components/Introduction.tsx",
    },
  ],
};
