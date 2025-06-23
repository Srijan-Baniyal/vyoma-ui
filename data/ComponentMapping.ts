import Installation from "@/components/Installation";
import Introduction from "@/components/Introduction";
import StoryBehind from "@/components/StoryBehind";
import Changelog from "@/components/ChangeLog";
import TextDecryptionShowcase from "@/components/vui/text/TextDecryption";
import CountUpShowcase from "@/components/vui/text/CountUp";
import { TypingTextShowcase } from "@/components/vui/text/TypingText";
import { AccordionShowcase } from "@/components/vui/Accordion";
import { WheelPickerDemo } from "@/components/vui/WheelPicker";
import { SkeletonShowcase } from "@/components/vui/Skeleton";
import { CheckboxRefinedShowcase } from "@/components/vui/CheckboxUpgraded";
import SheetShowcase from "@/components/vui/Sheet";
import { AnimatedNumberCountdownShowcase } from "@/components/vui/text/AnimatedNumber";
import { BentoGridShowcase } from "@/components/vui/BentoGrid";
import CardShowcase from "@/components/vui/Card";
import TunnelShowcase from "@/components/vui/Tunnel";
import { WavyTilesShowcase } from "@/components/vui/WavyTiles";
import ButtonShowcase from "@/components/vui/Button";
import ToolTipShowcase from "@/components/vui/ToolTip";

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
      path: "components/vui/text/TextDecryption.tsx",
    },
    {
      name: "Typing Text",
      component: TypingTextShowcase,
      route: "/text-animation/typing-text",
      path: "components/vui/text/TypingText.tsx",
    },
    {
      name: "Counting Number",
      component: CountUpShowcase,
      route: "/text-animation/counting-number",
      path: "components/vui/text/CountUp.tsx",
    },
    {
      name: "Animated Number",
      component: AnimatedNumberCountdownShowcase,
      route: "/text-animation/animated-number",
      path: "components/vui/text/AnimatedNumber.tsx",
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
      component: BentoGridShowcase,
      route: "/components/bento-grid",
      path: "components/vui/BentoGrid.tsx",
    },
    {
      name: "Buttons",
      component: ButtonShowcase,
      route: "/components/buttons",
      path: "components/vui/Button.tsx",
    },
    {
      name: "Card",
      component: CardShowcase,
      route: "/components/card",
      path: "components/vui/Card.tsx",
    },
    {
      name: "Checkbox",
      component: CheckboxRefinedShowcase,
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
      component: SheetShowcase,
      route: "/components/sheet",
      path: "components/vui/Sheet.tsx",
    },
    {
      name: "Skeleton",
      component: SkeletonShowcase,
      route: "/components/skeleton",
      path: "components/vui/Skeleton.tsx",
    },
    {
      name: "Tooltip",
      component: ToolTipShowcase,
      route: "/components/tooltip",
      path: "components/vui/ToolTip.tsx",
    },
    {
      name: "Wheel Picker",
      component: WheelPickerDemo,
      route: "/components/wheel-picker",
      path: "components/vui/WheelPicker.tsx",
    },
  ],
  Backgrounds: [
    {
      name: "Tunnel",
      component: TunnelShowcase,
      route: "/backgrounds/tunnel",
      path: "components/vui/Tunnel.tsx",
    },
    {
      name: "Wavy Tiles",
      component: WavyTilesShowcase,
      route: "/backgrounds/wavy-tiles",
      path: "components/vui/WavyTiles.tsx",
    },
  ],
};
