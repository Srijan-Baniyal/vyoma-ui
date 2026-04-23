import { getSiteOrigin } from "@/lib/agent/discovery";

export function GET(request: Request): Response {
  const requestOrigin = new URL(request.url).origin;
  const siteOrigin = getSiteOrigin(requestOrigin);

  const serverCard = {
    serverInfo: {
      name: "Vyoma UI Agent Tools",
      version: "1.0.0",
    },
    transport: {
      type: "streamable-http",
      endpoint: `${siteOrigin}/mcp`,
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
    },
  };

  return Response.json(serverCard, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=1800",
    },
  });
}
