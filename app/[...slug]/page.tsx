import { notFound } from "next/navigation";
import { componentMap } from "@/data/ComponentMapping";
import ComponentShowCaseTable from "@/components/ComponentShowCaseTable";
import {
  getComponentSourceCode,
  getComponentUsageExample,
  getDefaultProps,
} from "@/lib/ComponentSourceReader";

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
  return components.find((c) => normalize(c.name) === normalizedName) || null;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const awaitedParams = await params;
  // Expecting /category/componentName
  if (!awaitedParams.slug || awaitedParams.slug.length !== 2) {
    notFound();
  }
  const [category, componentName] = awaitedParams.slug;
  const componentEntry = findComponentByCategoryAndName(
    category,
    componentName
  );
  if (!componentEntry) {
    notFound();
  }

  // Conditional rendering based on category
  if (
    category.toLowerCase() === "get started" ||
    normalize(category) === normalize("Get Started")
  ) {
    return (
      <div className="space-y-6">
        {componentEntry.component && <componentEntry.component />}
      </div>
    );
  }

  // Get the actual source code for the component (all async now)
  const [sourceCode, defaultProps] = await Promise.all([
    getComponentSourceCode(componentEntry.name),
    getDefaultProps(componentEntry.name),
  ]);

  // Get the usage example with the actual default props
  const usageExample = await getComponentUsageExample(
    componentEntry.name,
    defaultProps
  );

  // Create component showcase data from the found component
  const showcaseComponent = {
    componentName: componentEntry.name,
    description:
      componentEntry.description ||
      `Interactive ${componentEntry.name} component from the ${category} category. This component demonstrates modern React patterns and includes customizable props for various use cases.`,
    component: componentEntry.component as React.ComponentType<
      Record<string, unknown>
    >,
    defaultProps: defaultProps,
    codeString: sourceCode,
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold mb-2">{componentEntry.name}</h1>
        <p className="text-xl text-muted-foreground mb-4">
          {showcaseComponent.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            📁 Category:{" "}
            <code className="bg-muted px-2 py-1 rounded">{category}</code>
          </span>
          <span className="flex items-center gap-2">
            🛣️ Route:{" "}
            <code className="bg-muted px-2 py-1 rounded">
              {componentEntry.route}
            </code>
          </span>
        </div>
      </div>
      <ComponentShowCaseTable components={[showcaseComponent]} />
      {/* Additional usage example section */}
      <div className="mt-8 p-6 border rounded-lg bg-muted/5">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          📖 Usage Example
        </h3>
        <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
          <code>{usageExample}</code>
        </pre>
      </div>
    </div>
  );
}

export const dynamicParams = true;
