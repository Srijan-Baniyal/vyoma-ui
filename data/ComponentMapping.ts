import Installation from "@/components/Installation";
import Introduction from "@/components/Introduction";
import StoryBehind from "@/components/StoryBehind";
import Changelog from "@/components/ChangeLog";
import FormShowcase from "@/components/vui/FormShowcase";
import TextDecryptionShowcase, {
  TextDecryptionTheme,
} from "@/components/vui/text/TextDecryption";
import CountUpShowcase, { CountUpTheme } from "@/components/vui/text/CountUp";
import {
  TypingTextShowcase,
  TypingTextTheme,
} from "@/components/vui/text/TypingText";
import { AccordionShowcase, AccordionTheme } from "@/components/vui/Accordion";
import {
  WheelPickerDemo,
  WheelPickerTheme,
} from "@/components/vui/WheelPicker";
import { SkeletonShowcase, SkeletonTheme } from "@/components/vui/Skeleton";
import {
  CheckboxRefinedShowcase,
  CheckboxRefinedTheme,
} from "@/components/vui/CheckboxUpgraded";
import SheetShowcase from "@/components/vui/Sheet";
import {
  AnimatedNumberCountdownShowcase,
  AnimatedNumberCountdownTheme,
} from "@/components/vui/text/AnimatedNumber";
import { BentoGridShowcase, BentoGridTheme } from "@/components/vui/BentoGrid";
import CardShowcase, { CardTheme } from "@/components/vui/Card";
import TunnelShowcase from "@/components/vui/backgrounds/Tunnel";
import SpaceShowcase from "@/components/vui/backgrounds/Space";
import {
  WavyTilesShowcase,
  WavyTilesTheme,
} from "@/components/vui/backgrounds/WavyTiles";
import HexagonalShowcase from "@/components/vui/backgrounds/Hexagonal";
import { ButtonShowcase, ButtonTheme } from "@/components/vui/Button";
import ShinyParticleGalaxyShowcase from "@/components/vui/backgrounds/ShinyParticleGalaxy";
import ToolTipShowcase, { ToolTipTheme } from "@/components/vui/ToolTip";
import NavigationShowcase from "@/components/vui/Navigation";
import { PillShowcase, PillTheme } from "@/components/vui/pillcomponent";
import MagicalChatInput from "@/components/vui/ai/MagicalChatInput";
import {
  WavingTextShowcase,
  WavingTextTheme,
} from "@/components/vui/text/WavingText";
import BeautifulFooterShowcase from "@/components/vui/BeautyFooter";
import MagicalCaret from "@/components/vui/MagicalCaret";
import FlipTextShowcase, {
  FlipTextTheme,
} from "@/components/vui/text/FlipText";
import { BlurTextShowcase, BlurTextTheme } from "@/components/vui/text/BlurText";
import DrawingLinesShowcase from "@/components/vui/backgrounds/DrawingLines";
import MagneticDock from "@/components/vui/MagneticDock";
import BeforeAfterSliderShowcase from "@/components/vui/BeforeAfterSlider";
import CircuitFlow from "@/components/vui/backgrounds/CircuitFlow";
import AIChatShowcase from "@/components/vui/ai/AIChatShowcase";

// ✅ Import your new “Shining Star” component here
import ShiningStarShowcase from "@/components/vui/backgrounds/ShinyParticleGalaxy";

export type ComponentEntry = {
  name: string;
  component: React.ComponentType;
  theme?: React.ComponentType;
  route: string;
  path: string | undefined;
  description: string;
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
      path: undefined,
      description:
        "🚀 <b>Welcome to VUI</b> - A modern React UI library designed for developers who value <b>beautiful design</b> and <b>seamless functionality</b>. Get started with our comprehensive guide.",
    },
    {
      name: "Installation",
      component: Installation,
      route: "/get-started/installation",
      path: undefined,
      description:
        "⚡ <b>Quick Setup Guide</b> - Install VUI in your project with <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>. Includes <b>TypeScript support</b> and <b>tree-shaking</b> for optimal bundle size.",
    },
    {
      name: "Story Behind",
      component: StoryBehind,
      route: "/get-started/story-behind",
      path: undefined,
      description:
        "💡 <b>The Journey</b> - Discover the inspiration and vision behind VUI. Learn about our commitment to <b>developer experience</b> and <b>design excellence</b>.",
    },
    {
      name: "Changelog",
      component: Changelog,
      route: "/get-started/changelog",
      path: undefined,
      description:
        "📝 <b>Release Notes</b> - Stay updated with the latest features, improvements, and bug fixes. Track our progress with <b>semantic versioning</b> and detailed change logs.",
    },
  ],
  "AI Components": [
    {
      name: "Magical Chat Input",
      component: MagicalChatInput,
      route: "/ai-components/magical-chat-input",
      path: "components/vui/ai/MagicalChatInput.tsx",
      description:
        "🔮 <b>Magical Chat Input</b> - A magical chat input component with smooth animations, cursor effects, and micro-interactions. Perfect for chat applications and AI assistants.",
    },
    {
      name: "AI Chat",
      component: AIChatShowcase,
      route: "/ai-components/ai-chat",
      path: "components/vui/ai/AIChat.tsx",
      description:
        "🤖 <b>Complete AI Chat Interface</b> - Ready-to-use chat component with OpenAI integration, real-time messaging, and beautiful animations. Just add your API key and start chatting!",
    },
  ],
  Backgrounds: [
    {
      name: "Circuit Flow",
      component: CircuitFlow,
      route: "/backgrounds/circuit-flow",
      path: "components/vui/backgrounds/CircuitFlow.tsx",
      description:
        "🔌 <b>Animated Circuit Background</b> - A neon circuit board effect with glowing paths, pulsing nodes, and themeable colors. Great for tech, AI, and developer-focused pages.",
    },
    {
      name: "Hexagonal",
      component: HexagonalShowcase,
      route: "/backgrounds/hexagonal",
      path: "components/vui/backgrounds/Hexagonal.tsx",
      description:
        "🌐 <b>Hexagonal Background</b> - A beautiful hexagonal background with smooth transitions and customizable colors. Perfect for portfolios and creative websites.",
    },
    {
      name: "Tunnel",
      component: TunnelShowcase,
      route: "/backgrounds/tunnel",
      path: "components/vui/backgrounds/Tunnel.tsx",
      description:
        "🌌 <b>3D Tunnel Animation</b> - Mesmerizing depth-based background effect with particle systems and smooth transitions. Creates an immersive visual experience for hero sections.",
    },
    {
      name: "Space",
      component: SpaceShowcase,
      route: "/backgrounds/space",
      path: "components/vui/backgrounds/Space.tsx",
      description:
        "🧑‍🚀 <b>Interactive 3D Space Scene</b> - Embark on a cosmic journey with a fully interactive environment featuring a drifting astronaut and dynamic lighting.",
    },
    {
      name: "Drawing Lines",
      component: DrawingLinesShowcase,
      route: "/backgrounds/drawing-lines",
      path: "components/vui/backgrounds/DrawingLines.tsx",
      description:
        "🎨 <b>Drawing Lines</b> - A beautiful animated background with smooth transitions and customizable colors. Perfect for creative websites.",
    },
    {
      name: "Wavy Tiles",
      component: WavyTilesShowcase,
      route: "/backgrounds/wavy-tiles",
      path: "components/vui/backgrounds/WavyTiles.tsx",
      description:
        "🌊 <b>Animated Wave Pattern</b> - Dynamic tiled background with fluid wave animations and customizable colors.",
    },
    {
      name: "Shiny Particle Galaxy",
      component: ShinyParticleGalaxyShowcase,
      route: "/backgrounds/shiny-particle-galaxy",
      path: "components/vui/backgrounds/ShinyParticleGalaxy.tsx",
      description:
        "✨ <b>Shiny Particle Galaxy</b> - Stunning galaxy animation with twinkling stars, motion depth, and smooth particle effects. Great for hero sections.",
    },
    // ✅ Your new background entry

  ],
  Components: [
    {
      name: "Accordion",
      component: AccordionShowcase,
      theme: AccordionTheme,
      route: "/components/accordion",
      path: "components/vui/Accordion.tsx",
      description:
        "📁 <b>Collapsible Content Panels</b> - Organize content with smooth expand/collapse animations and accessibility features.",
    },
    {
      name: "Bento Grid",
      component: BentoGridShowcase,
      theme: BentoGridTheme,
      route: "/components/bento-grid",
      path: "components/vui/BentoGrid.tsx",
      description:
        "🎨 <b>Modern Grid Layout</b> - Create beautiful masonry-style layouts inspired by Apple’s design language.",
    },
    {
      name: "Before & After Slider",
      component: BeforeAfterSliderShowcase,
      route: "/components/before-after-slider",
      path: "components/vui/BeforeAfterSlider.tsx",
      description:
        "🔄 <b>Image Comparison Slider</b> - Smooth drag interactions and responsive design for before/after images.",
    },
    {
      name: "Buttons",
      component: ButtonShowcase,
      theme: ButtonTheme,
      route: "/components/buttons",
      path: "components/vui/Button.tsx",
      description:
        "🎭 <b>Interactive Button Collection</b> - Includes shimmer, magnetic, and spotlight variants.",
    },
    {
      name: "Card",
      component: CardShowcase,
      theme: CardTheme,
      route: "/components/card",
      path: "components/vui/Card.tsx",
      description:
        "🃏 <b>Elegant Content Cards</b> - Display content with glassmorphism and hover animations.",
    },
    {
      name: "Checkbox",
      component: CheckboxRefinedShowcase,
      theme: CheckboxRefinedTheme,
      route: "/components/checkbox",
      path: "components/vui/CheckboxUpgraded.tsx",
      description:
        "✅ <b>Enhanced Checkbox Controls</b> - Animated, accessible, and beautifully styled checkboxes.",
    },
    {
      name: "Footer",
      component: BeautifulFooterShowcase,
      route: "/components/footer",
      path: "components/vui/BeautyFooter.tsx",
      description:
        "👣 <b>Beautiful Footer</b> - Stunning footer with gradients, glassmorphism, and hover effects.",
    },
    {
      name: "Magical Caret",
      component: MagicalCaret,
      route: "/components/magical-caret",
      path: "components/vui/MagicalCaret.tsx",
      description:
        "🔮 <b>Magical Caret</b> - Smooth cursor animation and text interaction effects.",
    },
    {
      name: "Navigation",
      component: NavigationShowcase,
      route: "/components/navigation",
      path: "components/vui/Navigation.tsx",
      description:
        "🧭 <b>Responsive Navigation</b> - Smooth transitions and mobile-first design.",
    },
    {
      name: "Pill",
      component: PillShowcase,
      theme: PillTheme,
      route: "/components/pill",
      path: "components/vui/pillcomponent.tsx",
      description:
        "💊 <b>Pill / Tag Component</b> - Versatile tags and status indicators with variants and icons.",
    },
    {
      name: "Sheet",
      component: SheetShowcase,
      route: "/components/sheet",
      path: "components/vui/Sheet.tsx",
      description:
        "📄 <b>Sliding Panel Component</b> - Create smooth slide-out panels from any direction.",
    },
    {
      name: "Skeleton",
      component: SkeletonShowcase,
      theme: SkeletonTheme,
      route: "/components/skeleton",
      path: "components/vui/Skeleton.tsx",
      description:
        "💀 <b>Loading State Placeholders</b> - Shimmer animations and customizable shapes.",
    },
    {
      name: "Tooltip",
      component: ToolTipShowcase,
      theme: ToolTipTheme,
      route: "/components/tooltip",
      path: "components/vui/ToolTip.tsx",
      description:
        "💬 <b>Smart Tooltip</b> - Auto-positioning, arrow indicators, and rich content support.",
    },
    {
      name: "Magnetic Dock",
      component: MagneticDock,
      route: "/components/magnetic-dock",
      path: "components/vui/MagneticDock.tsx",
      description:
        "🧲 <b>Magnetic Dock</b> - Interactive dock with smooth scaling and attraction effects.",
    },
    {
      name: "Wheel Picker",
      component: WheelPickerDemo,
      theme: WheelPickerTheme,
      route: "/components/wheel-picker",
      path: "components/vui/WheelPicker.tsx",
      description:
        "🎡 <b>iOS-Style Picker Wheel</b> - Momentum scrolling and infinite selection.",
    },
    {
      name: "Form",
      component: FormShowcase,
      route: "/components/form",
      path: "components/vui/FormShowcase.tsx",
      description:
        "📝 <b>Interactive Form Component</b> - Beautifully animated, validated, and accessible forms.",
    },
  ],
  "Text Animation": [
    {
      name: "Animated Number",
      component: AnimatedNumberCountdownShowcase,
      theme: AnimatedNumberCountdownTheme,
      route: "/text-animation/animated-number",
      path: "components/vui/text/AnimatedNumber.tsx",
      description:
        "🔢 <b>Dynamic Number Animations</b> - Smooth transitions and customizable duration.",
    },
    {
      name: "Blur Text",
      component: BlurTextShowcase,
      theme: BlurTextTheme,
      route: "/text-animation/blur-text",
      path: "components/vui/text/BlurText.tsx",
      description:
        "✨ <b>Blur-In Text Animation</b> - Smooth blur transitions and directional animations.",
    },
    {
      name: "Counting Number",
      component: CountUpShowcase,
      theme: CountUpTheme,
      route: "/text-animation/counting-number",
      path: "components/vui/text/CountUp.tsx",
      description:
        "📈 <b>Count-Up Animations</b> - Animate numbers with configurable speed and precision.",
    },
    {
      name: "Decryption Text",
      component: TextDecryptionShowcase,
      theme: TextDecryptionTheme,
      route: "/text-animation/decryption-text",
      path: "components/vui/text/TextDecryption.tsx",
      description:
        "🔐 <b>Matrix-Style Text Reveal</b> - Character scrambling and reveal transitions.",
    },
    {
      name: "Flipping Text",
      component: FlipTextShowcase,
      theme: FlipTextTheme,
      route: "/text-animation/flipping-text",
      path: "components/vui/text/FlipText.tsx",
      description:
        "🔄 <b>Flipping Text Effect</b> - Smooth flip animations with configurable speed.",
    },
    {
      name: "Typing Text",
      component: TypingTextShowcase,
      theme: TypingTextTheme,
      route: "/text-animation/typing-text",
      path: "components/vui/text/TypingText.tsx",
      description:
        "⌨️ <b>Typewriter Effect</b> - Realistic typing animation with cursor blinking and backspace effects.",
    },
    {
      name: "Waving Text",
      component: WavingTextShowcase,
      theme: WavingTextTheme,
      route: "/text-animation/waving-text",
      path: "components/vui/text/WavingText.tsx",
      description:
        "🌊 <b>Waving Text Effect</b> - Smooth wave effects with customizable speed and colors.",
    },
  ],
};
