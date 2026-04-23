import { getSiteOrigin } from "@/lib/agent/discovery";

export function GET(request: Request): Response {
  const requestOrigin = new URL(request.url).origin;

  return Response.json(
    {
      status: "ok",
      service: "vyoma-ui",
      timestamp: new Date().toISOString(),
      origin: getSiteOrigin(requestOrigin),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=60",
      },
    }
  );
}
