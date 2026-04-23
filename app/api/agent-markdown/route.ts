import { componentMap } from "@/data/ComponentMapping";
import { getCanonicalPaths, getSiteOrigin } from "@/lib/agent/discovery";

interface ComponentRecord {
  category: string;
  description: string;
  name: string;
  path: string | undefined;
  route: string;
}

const whitespacePattern = /\s+/;

const stripHtml = (value: string): string =>
  value.replace(/<[^>]*>/g, "").trim();

const getComponentRecords = (): ComponentRecord[] =>
  Object.entries(componentMap).flatMap(([category, entries]) =>
    entries.map((entry) => ({
      category,
      name: entry.name,
      route: entry.route,
      description: stripHtml(entry.description),
      path: entry.path,
    }))
  );

const countTokens = (value: string): number =>
  value
    .split(whitespacePattern)
    .map((token) => token.trim())
    .filter((token) => token.length > 0).length;

const createHomepageMarkdown = (origin: string): string => {
  const records = getComponentRecords();
  const sections = [
    "# Vyoma UI",
    "",
    "Truly Beyond UI. Designed with Spatial Wisdom Inside.",
    "",
    "## Primary Pages",
    `- [Home](${origin}/)`,
    `- [Showcase](${origin}/showcase)`,
    `- [Themes](${origin}/Themes)`,
    `- [API Docs](${origin}/docs/api)`,
    "",
    "## Component Library",
    `Total components: ${records.length}`,
  ];

  const grouped = new Map<string, ComponentRecord[]>();
  for (const record of records) {
    const group = grouped.get(record.category) ?? [];
    group.push(record);
    grouped.set(record.category, group);
  }

  for (const [category, entries] of grouped) {
    sections.push("", `### ${category}`);

    for (const entry of entries.slice(0, 12)) {
      sections.push(`- [${entry.name}](${origin}${entry.route})`);
    }
  }

  return sections.join("\n");
};

const createComponentMarkdown = (
  origin: string,
  record: ComponentRecord
): string => {
  const lines = [
    `# ${record.name}`,
    "",
    `Category: ${record.category}`,
    "",
    record.description,
    "",
    `Canonical URL: ${origin}${record.route}`,
  ];

  if (record.path) {
    lines.push(`Source Path: ${record.path}`);
  }

  return lines.join("\n");
};

const createGenericMarkdown = (origin: string, path: string): string => {
  const canonicalPaths = getCanonicalPaths();

  return [
    "# Vyoma UI",
    "",
    `Markdown representation for: ${origin}${path}`,
    "",
    "## Canonical URLs",
    ...canonicalPaths.map((canonicalPath) => `- ${origin}${canonicalPath}`),
  ].join("\n");
};

export function GET(request: Request): Response {
  const requestUrl = new URL(request.url);
  const requestOrigin = requestUrl.origin;
  const siteOrigin = getSiteOrigin(requestOrigin);
  const rawPath = requestUrl.searchParams.get("path") ?? "/";
  const resolvedPath = new URL(rawPath, siteOrigin).pathname;
  const componentRecords = getComponentRecords();

  let markdown = "";
  if (resolvedPath === "/") {
    markdown = createHomepageMarkdown(siteOrigin);
  } else {
    const componentRecord = componentRecords.find(
      (record) => record.route === resolvedPath
    );
    markdown = componentRecord
      ? createComponentMarkdown(siteOrigin, componentRecord)
      : createGenericMarkdown(siteOrigin, resolvedPath);
  }

  return new Response(`${markdown}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "x-markdown-tokens": String(countTokens(markdown)),
      "Cache-Control": "public, max-age=0, s-maxage=300",
    },
  });
}
