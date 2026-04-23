import fs from "node:fs/promises";
import path from "node:path";

const ROUTE_MATCH_REGEX = /route:\s*["']([^"']+)["']/g;
const STATIC_PATHS = [
  "/",
  "/showcase",
  "/Themes",
  "/docs/api",
  "/get-started/introduction",
  "/get-started/installation",
  "/get-started/story-behind",
  "/get-started/changelog",
];
const DEFAULT_SITE_ORIGIN = "https://vyomaui.design";

const getSiteOrigin = () => {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
};

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const buildUrlNode = (origin, route, lastModified) => {
  const loc = new URL(route, origin).toString();
  const priority = route === "/" ? "1.0" : "0.7";

  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastModified}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
};

const collectRoutesFromMapping = (mappingContent) => {
  const routes = new Set(STATIC_PATHS);
  let routeMatch = ROUTE_MATCH_REGEX.exec(mappingContent);

  while (routeMatch !== null) {
    const route = routeMatch[1];
    if (route.startsWith("/")) {
      routes.add(route);
    }

    routeMatch = ROUTE_MATCH_REGEX.exec(mappingContent);
  }

  return [...routes].sort((a, b) => a.localeCompare(b));
};

async function generateSitemap() {
  try {
    const projectRoot = process.cwd();
    const mappingPath = path.join(projectRoot, "data/ComponentMapping.ts");
    const publicDirectory = path.join(projectRoot, "public");
    const sitemapPath = path.join(publicDirectory, "sitemap.xml");
    const mappingContent = await fs.readFile(mappingPath, "utf-8");
    const siteOrigin = getSiteOrigin();
    const lastModified = new Date().toISOString();
    const routes = collectRoutesFromMapping(mappingContent);
    const urlNodes = routes
      .map((route) => buildUrlNode(siteOrigin, route, lastModified))
      .join("\n");

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      urlNodes,
      "</urlset>",
      "",
    ].join("\n");

    await fs.mkdir(publicDirectory, { recursive: true });
    await fs.writeFile(sitemapPath, xml, "utf-8");

    console.log(`✅ Generated sitemap with ${routes.length} routes`);
    console.log(`🗺️ Wrote ${sitemapPath}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
