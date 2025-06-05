export type ComponentEntry = {
  name: string;
  component: string;
  route: string;
};

export type ComponentCategoryMap = {
  [category: string]: ComponentEntry[];
};

export const componentMap: ComponentCategoryMap = {
  "Get Started": [
    {
      name: "Introduction",
      component: "IntroductionComponent",
      route: "/get-started/introduction",
    },
    {
      name: "Installation",
      component: "InstallationComponent",
      route: "/get-started/installation",
    },
    {
      name: "Story Behind",
      component: "StoryBehindComponent",
      route: "/get-started/story-behind",
    },
  ],
  "Text Animation":[
    {
      name: "Decryption Text",
      component: "DecryptionTextComponent",
      route: "/text-animation/decryption-text",
    },
    {
      name: "Typing Text",
      component: "TypingTextComponent",
      route: "/text-animation/typing-text",
    },
    {
      name: "Counting Number",
      component: "CountingNumberComponent",
      route: "/text-animation/counting-number",
    },
  ],
  "Components": [
    {
      name: "Accordion",
      component: "AccordionComponent",
      route: "/components/accordion",
    },
    {
      name: "Buttons",
      component: "ButtonsComponent",
      route: "/components/buttons",
    },
    {
      name: "Cards",
      component: "CardsComponent",
      route: "/components/cards",
    },
    {
      name: "Checkbox",
      component: "CheckboxComponent",
      route: "/components/checkbox",
    },
    {
      name: "Card",
      component: "CardComponent",
      route: "/components/card",
    },
    {
      name: "Navigation",
      component: "NavigationComponent",
      route: "/components/navigation",
    },
    {
      name: "Sheet",
      component: "SheetComponent",
      route: "/components/sheet",
    },
    {
      name: "Skeleton",
      component: "SkeletonComponent",
      route: "/components/skeleton",
    },
    {
      name: "Tooltip",
      component: "TooltipComponent",
      route: "/components/tooltip",
    },
  ],
};
