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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{componentEntry.name}</h1>
        <p className="text-muted-foreground mt-2">Component: {componentEntry.component?.name}</p>
        <p className="text-muted-foreground">Route: {componentEntry.route}</p>
      </div>
      <div className="rounded-lg border bg-card p-6">
        {componentEntry.component && <componentEntry.component />}
      </div>
    </div>
  );
}

export const dynamicParams = true;
