import { notFound } from "next/navigation";
import { componentMap } from "@/data/ComponentMapping";
import ComponentShowCaseTable from "@/components/ComponentShowCaseTable";
import {
  getComponentSourceCode,
  getDefaultProps,
  getComponentPropsInfo,
} from "@/lib/ComponentSourceReader";
import type { Metadata } from "next";
import parser from "html-react-parser";
function normalize(str: string) {
  return str.replace(/[-_\s]/g, "").toLowerCase();
}

function truncateDescription(
  description: string | React.JSX.Element | React.JSX.Element[],
  wordLimit: number = 25
): string | React.JSX.Element | React.JSX.Element[] {
  if (typeof description === "string") {
    const words = description.split(" ");
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  const extractText = (element: React.JSX.Element | React.JSX.Element[]): string => {
    if (Array.isArray(element)) {
      return element.map(extractText).join(" ");
    }
    if (typeof element === "object" && element.props?.children) {
      if (typeof element.props.children === "string") {
        return element.props.children;
      }
      if (Array.isArray(element.props.children)) {
        return element.props.children
          .map((child: unknown) => typeof child === "string" ? child : "")
          .join(" ");
      }
    }
    return "";
  };
  const textContent = extractText(description);
  const words = textContent.split(" ").filter(Boolean);
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(" ") + "...";
}

function findComponentByCategoryAndName(category: string, name: string) {
  const normalizedCategory = normalize(category);
  const actualCategory = Object.keys(componentMap).find(
    (key) => normalize(key) === normalizedCategory
  );
  if (!actualCategory) return null;
  const components = componentMap[actualCategory];
  if (!components) return null;
  const normalizedName = normalize(name);
  return components.find((c) => normalize(c.name) === normalizedName) || null;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const awaitedParams = await params;
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

  const [sourceCode, defaultProps, propsInfo] = await Promise.all([
    getComponentSourceCode(componentEntry.name),
    getDefaultProps(componentEntry.name),
    getComponentPropsInfo(componentEntry.name),
  ]);

  const parsedDescription = parser(componentEntry.description);
  const showcaseComponent = {
    componentName: componentEntry.name,
    description: truncateDescription(parsedDescription, 25),
    component: componentEntry.component,
    defaultProps: defaultProps,
    codeString: sourceCode,
    propsInfo: propsInfo,
  };

  return (
    <div className="space-y-8">
      <ComponentShowCaseTable components={[showcaseComponent]} />
    </div>
  );
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  if (!awaitedParams.slug || awaitedParams.slug.length !== 2) {
    return { title: "Not Found" };
  }
  const [category, componentName] = awaitedParams.slug;
  function normalize(str: string) {
    return str.replace(/[-_\s]/g, "").toLowerCase();
  }
  function humanize(str: string) {
    return str
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\s+/g, " ")
      .trim();
  }
  function findComponentByCategoryAndName(category: string, name: string) {
    const normalizedCategory = normalize(category);
    const actualCategory = Object.keys(componentMap).find(
      (key) => normalize(key) === normalizedCategory
    );
    if (!actualCategory) return null;
    const components = componentMap[actualCategory];
    if (!components) return null;
    const normalizedName = normalize(name);
    return components.find((c) => normalize(c.name) === normalizedName) || null;
  }
  const componentEntry = findComponentByCategoryAndName(
    category,
    componentName
  );
  if (!componentEntry) {
    return { title: "Not Found" };
  }
  const humanCategory = humanize(category);
  const humanComponent = humanize(componentEntry.name);
  const title = `${humanComponent} | ${humanCategory} | VUI React UI Library`;
  const description =
    componentEntry.description ||
    `Discover the ${humanComponent} component in the ${humanCategory} section of VUI. Modern, customizable, and interactive React UI for your next project.`;
  const canonicalUrl = `https://yourdomain.com${componentEntry.route}`;
  const keywords = [
    humanComponent,
    humanCategory,
    "React UI",
    "VUI",
    "Component",
    "Open Source",
    "Modern UI",
    "Customizable",
    "Interactive",
  ];
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "VUI React UI Library",
      // images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // images: [ogImage],
    },
    category: humanCategory,
  };
}
