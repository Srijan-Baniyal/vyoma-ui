import Installation from "@/components/Installation";
import Introduction from "@/components/Introduction";
import StoryBehind from "@/components/StoryBehind";
import Changelog from "@/components/ChangeLog";
import TextDecryptionShowcase, {
  TextDecryptionTheme,
} from "@/components/vui/text/TextDecryption";
import CountUpShowcase, { CountUpTheme } from "@/components/vui/text/CountUp";
import {
  TypingTextShowcase,
  TypingTextTheme,
} from "@/components/vui/text/TypingText";
import { AccordionShowcase, AccordionTheme } from "@/components/vui/Accordion";
import { WheelPickerDemo } from "@/components/vui/WheelPicker";
import { SkeletonShowcase, SkeletonTheme } from "@/components/vui/Skeleton";
import { CheckboxRefinedShowcase, CheckboxRefinedTheme } from "@/components/vui/CheckboxUpgraded";
import SheetShowcase from "@/components/vui/Sheet";
import {
  AnimatedNumberCountdownShowcase,
  AnimatedNumberCountdownTheme,
} from "@/components/vui/text/AnimatedNumber";
import { BentoGridShowcase, BentoGridTheme } from "@/components/vui/BentoGrid";
import CardShowcase, { CardTheme } from "@/components/vui/Card";
import TunnelShowcase from "@/components/vui/backgrounds/Tunnel";
import { WavyTilesShowcase } from "@/components/vui/backgrounds/WavyTiles";
import { ButtonShowcase, ButtonTheme } from "@/components/vui/Button";
import ToolTipShowcase, { ToolTipTheme } from "@/components/vui/ToolTip";
import NavigationShowcase from "@/components/vui/Navigation";

export type ComponentEntry = {
  name: string;
  component: React.ComponentType;
  theme?: React.ComponentType;
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
      theme: TextDecryptionTheme,
      route: "/text-animation/decryption-text",
      path: "components/vui/text/TextDecryption.tsx",
    },
    {
      name: "Typing Text",
      component: TypingTextShowcase,
      theme: TypingTextTheme,
      route: "/text-animation/typing-text",
      path: "components/vui/text/TypingText.tsx",
    },
    {
      name: "Counting Number",
      component: CountUpShowcase,
      theme: CountUpTheme,
      route: "/text-animation/counting-number",
      path: "components/vui/text/CountUp.tsx",
    },
    {
      name: "Animated Number",
      component: AnimatedNumberCountdownShowcase,
      theme: AnimatedNumberCountdownTheme,
      route: "/text-animation/animated-number",
      path: "components/vui/text/AnimatedNumber.tsx",
    },
  ],
  Components: [
    {
      name: "Accordion",
      component: AccordionShowcase,
      theme: AccordionTheme,
      route: "/components/accordion",
      path: "components/vui/Accordion.tsx",
    },
    {
      name: "Bento Grid",
      component: BentoGridShowcase,
      theme: BentoGridTheme,
      route: "/components/bento-grid",
      path: "components/vui/BentoGrid.tsx",
    },
    {
      name: "Buttons",
      component: ButtonShowcase,
      theme: ButtonTheme,
      route: "/components/buttons",
      path: "components/vui/Button.tsx",
    },
    {
      name: "Card",
      component: CardShowcase,
      theme: CardTheme,
      route: "/components/card",
      path: "components/vui/Card.tsx",
    },
    {
      name: "Checkbox",
      component: CheckboxRefinedShowcase,
      theme: CheckboxRefinedTheme,
      route: "/components/checkbox",
      path: "components/vui/CheckboxUpgraded.tsx",
    },
    {
      name: "Navigation",
      component: NavigationShowcase,
      route: "/components/navigation",
      path: "components/vui/Navigation.tsx",
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
      theme: SkeletonTheme,
      route: "/components/skeleton",
      path: "components/vui/Skeleton.tsx",
    },
    {
      name: "Tooltip",
      component: ToolTipShowcase,
      theme: ToolTipTheme,
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
      path: "components/vui/backgrounds/Tunnel.tsx",
    },
    {
      name: "Wavy Tiles",
      component: WavyTilesShowcase,
      route: "/backgrounds/wavy-tiles",
      path: "components/vui/backgrounds/WavyTiles.tsx",
    },
  ],
};
