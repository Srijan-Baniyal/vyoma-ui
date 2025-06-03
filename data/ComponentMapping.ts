export type ComponentEntry = {
  name: string;
  component: string;
  route: string;
};

export type ComponentCategoryMap = {
  [category: string]: ComponentEntry[];
};

export const componentMap: ComponentCategoryMap = {
  buttons: [
    {
      name: "PrimaryButton",
      component: "PrimaryButtonComponent",
      route: "/buttons/PrimaryButton",
    },
    {
      name: "SecondaryButton",
      component: "SecondaryButtonComponent",
      route: "/buttons/SecondaryButton",
    },
  ],
  cards: [
    {
      name: "ProfileCard",
      component: "ProfileCardComponent",
      route: "/cards/ProfileCard",
    },
  ],
};
