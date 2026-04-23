import { getSiteOrigin } from "@/lib/agent/discovery";

export function GET(request: Request): Response {
  const requestOrigin = new URL(request.url).origin;
  const siteOrigin = getSiteOrigin(requestOrigin);

  return Response.json(
    {
      resource: siteOrigin,
      authorization_servers: [siteOrigin],
      scopes_supported: ["read:catalog", "read:components", "read:status"],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=1800",
      },
    }
  );
}
