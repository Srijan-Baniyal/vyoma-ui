interface Documentation {
  groupKey: string;
  groupValue: string;
  children: DocumentationChild[];
}

interface DocumentationChild {
  label: string;
  value: string;
  url: string;
  new?: boolean;
}

export const DOCS: Documentation[] = [
  {
    groupKey: "gettingStart",
    groupValue: "Getting Started",
    children: [
      {
        label: "Introduction",
        value: "introduction",
        url: "/docs",
      },
      {
        label: "Installation",
        value: "installation",
        url: "/docs/installation",
      },
      {
        label: "Usage",
        value: "usage",
        url: "/docs/usage",
      },
      {
        label: "Story Behind Vyoma UI",
        value: "story",
        url: "/docs/story",
      },
    ],
  },
  {
    groupKey: "components",
    groupValue: "Components",
    children: [],
  },
];
