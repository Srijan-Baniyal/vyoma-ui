import { getSiteOrigin } from "@/lib/agent/discovery";

export function GET(request: Request): Response {
  const requestOrigin = new URL(request.url).origin;
  const siteOrigin = getSiteOrigin(requestOrigin);

  const schema = {
    openapi: "3.1.0",
    info: {
      title: "Vyoma UI Public API",
      version: "1.0.0",
      description: "Public utility endpoints exposed by Vyoma UI.",
    },
    servers: [{ url: siteOrigin }],
    paths: {
      "/api/health": {
        get: {
          summary: "Health check",
          responses: {
            "200": {
              description: "Service health",
            },
          },
        },
      },
      "/api/agent/components": {
        get: {
          summary: "Search component metadata",
          parameters: [
            {
              name: "q",
              in: "query",
              required: false,
              schema: { type: "string" },
              description: "Case-insensitive search query.",
            },
          ],
          responses: {
            "200": {
              description: "Component search results",
            },
          },
        },
      },
      "/api/agent-markdown": {
        get: {
          summary: "Markdown representation of site pages",
          parameters: [
            {
              name: "path",
              in: "query",
              required: false,
              schema: { type: "string" },
              description: "Target path to render as markdown.",
            },
          ],
          responses: {
            "200": {
              description: "Markdown response",
              content: {
                "text/markdown": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };

  return Response.json(schema, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=1800",
    },
  });
}
