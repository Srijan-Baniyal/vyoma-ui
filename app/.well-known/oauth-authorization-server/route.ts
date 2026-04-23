import { getSiteOrigin } from "@/lib/agent/discovery";

export function GET(request: Request): Response {
  const requestOrigin = new URL(request.url).origin;
  const siteOrigin = getSiteOrigin(requestOrigin);

  return Response.json(
    {
      issuer: siteOrigin,
      authorization_endpoint: `${siteOrigin}/oauth/authorize`,
      token_endpoint: `${siteOrigin}/oauth/token`,
      jwks_uri: `${siteOrigin}/.well-known/jwks.json`,
      grant_types_supported: [
        "authorization_code",
        "client_credentials",
        "refresh_token",
      ],
      response_types_supported: ["code"],
      token_endpoint_auth_methods_supported: [
        "client_secret_post",
        "client_secret_basic",
      ],
      scopes_supported: ["read:catalog", "read:components", "read:status"],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=1800",
      },
    }
  );
}
