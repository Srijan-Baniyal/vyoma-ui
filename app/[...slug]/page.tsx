import { notFound } from "next/navigation";
import { componentMap } from "@/data/ComponentMapping";

function findComponentByCategoryAndName(category: string, name: string) {
  const components = componentMap[category];
  if (!components) return null;
  return components.find((c) => c.name === name) || null;
}

export default function Page({ params }: { params: { slug: string[] } }) {
  // Expecting /category/componentName
  if (!params.slug || params.slug.length !== 2) {
    notFound();
  }
  const [category, componentName] = params.slug;
  const componentEntry = findComponentByCategoryAndName(category, componentName);
  if (!componentEntry) {
    notFound();
  }
  return (
    <div>
      <h1>{componentEntry.name}</h1>
      <p>Component: {componentEntry.component}</p>
      <p>Route: {componentEntry.route}</p>
      <p>This is a valid component route. Replace this with your actual component rendering logic.</p>
    </div>
  );
}

export const dynamicParams = true; 