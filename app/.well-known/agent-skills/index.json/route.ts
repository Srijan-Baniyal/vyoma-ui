import {
  AGENT_SKILL_ARTIFACTS,
  getSiteOrigin,
  getSkillDigest,
} from "@/lib/agent/discovery";

const skillDescriptions: Record<string, string> = {
  "robots-txt":
    "Publish robots.txt with explicit crawler directives and AI policy.",
  sitemap: "Publish sitemap.xml with canonical public URLs.",
  "link-headers": "Advertise machine-readable resources via HTTP Link headers.",
  "markdown-negotiation":
    "Return markdown for requests that accept text/markdown.",
  "api-catalog": "Publish API catalog using application/linkset+json.",
  "oauth-discovery":
    "Publish OAuth/OIDC discovery metadata for authentication.",
  "oauth-protected-resource": "Publish OAuth Protected Resource Metadata.",
  "mcp-server-card": "Publish MCP server card metadata for discovery.",
  "agent-skills": "Publish the Agent Skills index for skill discovery.",
  webmcp: "Expose browser tools through the WebMCP API.",
  "ai-rules": "Declare explicit AI crawler user-agent policy blocks.",
  "content-signals": "Declare AI content usage preferences in robots.txt.",
};

export function GET(request: Request): Response {
  const requestOrigin = new URL(request.url).origin;
  const siteOrigin = getSiteOrigin(requestOrigin);

  const skills = Object.entries(AGENT_SKILL_ARTIFACTS).map(
    ([name, artifact]) => ({
      name,
      type: "skill-md",
      description: skillDescriptions[name] ?? "Agent skill",
      url: `${siteOrigin}/.well-known/agent-skills/${name}`,
      digest: getSkillDigest(artifact),
    })
  );

  const payload = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills,
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=1800",
    },
  });
}
