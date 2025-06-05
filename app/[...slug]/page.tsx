import { notFound } from "next/navigation";
import { componentMap } from "@/data/ComponentMapping";

function normalize(str: string) {
  return str.replace(/[-_\s]/g, "").toLowerCase();
}

function findComponentByCategoryAndName(category: string, name: string) {
  // Normalize category for matching
  const normalizedCategory = normalize(category);
  const actualCategory = Object.keys(componentMap).find(
    (key) => normalize(key) === normalizedCategory
  );
  if (!actualCategory) return null;
  const components = componentMap[actualCategory];
  if (!components) return null;
  // Normalize component name for matching
  const normalizedName = normalize(name);
  return (
    components.find((c) => normalize(c.name) === normalizedName) || null
  );
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const awaitedParams = await params;
  console.log("DEBUG SLUG PARAMS:", awaitedParams.slug);
  // Expecting /category/componentName
  if (!awaitedParams.slug || awaitedParams.slug.length !== 2) {
    notFound();
  }
  const [category, componentName] = awaitedParams.slug;
  const componentEntry = findComponentByCategoryAndName(
    category,
    componentName
  );
  console.log("DEBUG LOOKUP RESULT:", componentEntry);
  if (!componentEntry) {
    notFound();
  }
  return (
    <div>
      <h1>{componentEntry.name}</h1>
      <p>Component: {componentEntry.component}</p>
      <p>Route: {componentEntry.route}</p>
      <p>
        This is a valid component route. Replace this with your actual component
        rendering logic.
      </p>
    </div>
  );
}

export const dynamicParams = true;
