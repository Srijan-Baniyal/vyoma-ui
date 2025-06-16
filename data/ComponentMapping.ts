import Installation from "@/components/Installation";
import Introduction from "@/components/Introduction";
import StoryBehind from "@/components/StoryBehind";
import Changelog from "@/components/ChangeLog";
import TextDecryptionShowcase from "@/components/vui/TextDecryption";
import CountUpShowcase from "@/components/vui/CountUp";
import { TypingTextShowcase } from "@/components/vui/TypingText";
import { AccordionShowcase } from "@/components/vui/Accordion";
import { WheelPickerDemo } from "@/components/vui/WheelPicker";
import { SkeletonShowcase } from "@/components/vui/Skeleton";
import { CheckboxUpgradedShowcase } from "@/components/vui/CheckboxUpgraded";

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
      component: TypingTextShowcase,
      route: "/text-animation/typing-text",
      path: "components/vui/TypingText.tsx",
    },
    {
      name: "Counting Number",
      component: CountUpShowcase,
      route: "/text-animation/counting-number",
      path: "components/vui/CountUp.tsx",
    },
    {
      name: "Animated Number",
      component: CountUpShowcase,
      route: "/text-animation/animated-number",
      path: "components/vui/AnimatedNumber.tsx",
    },
  ],
  Components: [
    {
      name: "Accordion",
      component: AccordionShowcase,
      route: "/components/accordion",
      path: "components/vui/Accordion.tsx",
    },
    {
      name: "Bento Grid",
      component: Introduction,
      route: "/components/bento-grid",
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
      component: CheckboxUpgradedShowcase,
      route: "/components/checkbox",
      path: "components/vui/CheckboxUpgraded.tsx",
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
      component: SkeletonShowcase,
      route: "/components/skeleton",
      path: "components/vui/Skeleton.tsx",
    },
    {
      name: "Tooltip",
      component: Introduction,
      route: "/components/tooltip",
      path: "components/Introduction.tsx",
    },
    {
      name: "Wheel Picker",
      component: WheelPickerDemo,
      route: "/components/wheel-picker",
      path: "components/vui/WheelPicker.tsx",
    },
  ],
};
