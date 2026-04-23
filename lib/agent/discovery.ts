import { createHash } from "node:crypto";
import { componentMap } from "@/data/ComponentMapping";

export const DEFAULT_SITE_ORIGIN = "https://vyomaui.design";

export const getSiteOrigin = (origin?: string): string => {
  const candidate =
    origin ?? process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_ORIGIN;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
};

export const AGENT_SKILL_ARTIFACTS: Record<string, string> = {
  "robots-txt":
    "# Robots.txt Policy\n\nServes /.well-known/robots policy and publishes explicit crawler rules for general and AI user agents.",
  sitemap:
    "# Sitemap Policy\n\nPublishes /sitemap.xml with canonical URLs derived from static routes and component showcase routes.",
  "link-headers":
    "# Link Headers\n\nAdds RFC 8288 Link headers on the homepage for API and agent discovery resources.",
  "markdown-negotiation":
    "# Markdown Negotiation\n\nSupports Accept: text/markdown and returns markdown with Content-Type: text/markdown.",
  "api-catalog":
    "# API Catalog\n\nPublishes /.well-known/api-catalog using application/linkset+json for automated API discovery.",
  "oauth-discovery":
    "# OAuth Discovery\n\nPublishes OpenID Connect and OAuth authorization server metadata in .well-known endpoints.",
  "oauth-protected-resource":
    "# OAuth Protected Resource\n\nPublishes OAuth Protected Resource Metadata at /.well-known/oauth-protected-resource.",
  "mcp-server-card":
    "# MCP Server Card\n\nPublishes an MCP server card at /.well-known/mcp/server-card.json with server metadata and capabilities.",
  "agent-skills":
    "# Agent Skills Discovery\n\nPublishes /.well-known/agent-skills/index.json with skill artifacts and sha256 digests.",
  webmcp:
    "# WebMCP\n\nRegisters browser-exposed tools for agent use when navigator.modelContext is available.",
  "ai-rules":
    "# AI Rules\n\nDeclares explicit User-agent policy blocks for major AI crawlers in robots.txt.",
  "content-signals":
    "# Content Signals\n\nDeclares Content-Signal directives for ai-train, search, and ai-input preferences.",
};

const staticCanonicalPaths = [
  "/",
  "/showcase",
  "/Themes",
  "/docs/api",
  "/get-started/introduction",
  "/get-started/installation",
  "/get-started/story-behind",
  "/get-started/changelog",
] as const;

export const getCanonicalPaths = (): string[] => {
  const componentRoutes = Object.values(componentMap)
    .flatMap((entries) => entries.map((entry) => entry.route))
    .filter(
      (route): route is string => typeof route === "string" && route.length > 0
    );

  return [...new Set([...staticCanonicalPaths, ...componentRoutes])].sort(
    (a, b) => a.localeCompare(b)
  );
};

export const getSkillDigest = (artifact: string): string => {
  const digest = createHash("sha256").update(artifact).digest("hex");
  return `sha256:${digest}`;
};

export const getApiCatalog = (origin: string) => ({
  linkset: [
    {
      anchor: `${origin}/api`,
      "service-desc": [
        {
          href: `${origin}/openapi.json`,
          type: "application/openapi+json",
        },
      ],
      "service-doc": [
        {
          href: `${origin}/docs/api`,
          type: "text/html",
        },
      ],
      status: [
        {
          href: `${origin}/api/health`,
          type: "application/json",
        },
      ],
    },
  ],
});
