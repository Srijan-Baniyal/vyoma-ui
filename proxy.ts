import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const HOMEPAGE_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/api>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(", ");

const fileExtensionPattern = /\.[a-zA-Z0-9]+$/;

const isAssetPath = (pathname: string): boolean => {
  if (pathname.startsWith("/_next")) {
    return true;
  }

  return fileExtensionPattern.test(pathname);
};

const shouldReturnMarkdown = (request: NextRequest): boolean => {
  if (request.method !== "GET") {
    return false;
  }

  const accept = request.headers.get("accept")?.toLowerCase() ?? "";
  if (!accept.includes("text/markdown")) {
    return false;
  }

  const { pathname } = request.nextUrl;

  if (isAssetPath(pathname)) {
    return false;
  }

  if (pathname.startsWith("/api") || pathname.startsWith("/.well-known")) {
    return false;
  }

  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return false;
  }

  return true;
};

export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;

  const response = shouldReturnMarkdown(request)
    ? NextResponse.rewrite(
        new URL(
          `/api/agent-markdown?path=${encodeURIComponent(`${pathname}${search}`)}`,
          request.url
        )
      )
    : NextResponse.next();

  if (pathname === "/") {
    response.headers.set("Link", HOMEPAGE_LINK_HEADER);
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
