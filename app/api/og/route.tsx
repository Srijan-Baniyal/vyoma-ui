import { ImageResponse } from "next/og";
import { componentMap } from "@/data/ComponentMapping";
import { version as vuiVersion } from "@/lib/version";

export const runtime = "nodejs";

function normalize(str: string) {
  return str.replace(/[-_\s]/g, "").toLowerCase();
}

function findComponentByCategoryAndName(category: string, name: string) {
  const normalizedCategory = normalize(category);
  const actualCategory = Object.keys(componentMap).find(
    (key) => normalize(key) === normalizedCategory
  );
  if (!actualCategory) return null;
  const components = componentMap[actualCategory];
  if (!components) return null;
  const normalizedName = normalize(name);
  return components.find((c) => normalize(c.name) === normalizedName) || null;
}

function isValidComponent(path: string): boolean {
  // Skip validation for homepage and general pages
  if (path === "/" || !path.includes("/")) return true;

  // Parse the path to extract category and component name
  const pathParts = path.split("/").filter(Boolean);
  if (pathParts.length !== 2) return true; // Allow non-component paths

  const [category, componentName] = pathParts;
  const component = findComponentByCategoryAndName(category, componentName);
  return component !== null;
}

function cleanDescription(htmlString: string): string {
  return htmlString
    .replace(/<[^>]*>/g, " ") // Remove all HTML tags
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove ** markdown
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

export async function GET(request: Request) {
  const { default: LogoCode } = await import("@/lib/LogoCode");
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Vyoma UI";
  const rawDescription =
    searchParams.get("description") ||
    "Beautiful, accessible, and customizable UI components for React";
  const description = cleanDescription(rawDescription);
  const path = searchParams.get("path") || "/";

  // Check if this is a component page that doesn't exist
  const isValidComp = isValidComponent(path);

  // Generate error OG for non-existent components
  if (!isValidComp) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {/* Background decorative elements */}
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
              top: "50px",
              right: "100px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "50%",
              bottom: "80px",
              left: "80px",
            }}
          />

          {/* Error Icon */}
          <div
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
              fontSize: "60px",
            }}
          >
            ⚠️
          </div>

          {/* Error Title */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: "800",
              color: "white",
              textAlign: "center",
              marginBottom: "20px",
              letterSpacing: "-0.025em",
            }}
          >
            Component Not Found
          </div>

          {/* Error Description */}
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "center",
              marginBottom: "40px",
              maxWidth: "600px",
              lineHeight: "1.4",
            }}
          >
            This component doesn&apos;t exist in Vyoma UI
          </div>

          {/* Invalid Path Badge */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "16px 24px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {path}
          </div>

          {/* Brand */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "60px",
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "500",
            }}
          >
            vyomaui.design
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Generate normal OG for valid components/pages
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          position: "relative",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            background: "rgba(99, 102, 241, 0.1)",
            borderRadius: "50%",
            top: "-50px",
            right: "-50px",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "250px",
            height: "250px",
            background: "rgba(139, 92, 246, 0.1)",
            borderRadius: "50%",
            bottom: "-50px",
            left: "-50px",
            filter: "blur(60px)",
          }}
        />

        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "60px",
            zIndex: 1,
          }}
        >
          {/* Logo Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            {/* VyomaUI SVG Logo */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "24px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                padding: "12px",
              }}
            >
             <LogoCode />
            </div>

            {/* Brand Name */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "800",
                  color: "white",
                  letterSpacing: "-0.025em",
                  lineHeight: "1",
                }}
              >
                Vyoma UI
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#94a3b8",
                  fontWeight: "500",
                  marginTop: "4px",
                }}
              >
                React Component Library
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "900",
              color: "white",
              textAlign: "center",
              marginBottom: "24px",
              maxWidth: "900px",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
              background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#cbd5e1",
              textAlign: "center",
              marginBottom: "40px",
              maxWidth: "700px",
              lineHeight: "1.5",
              fontWeight: "400",
            }}
          >
            {description}
          </div>

          {/* Feature Tags */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["Modern", "Accessible", "Customizable", "TypeScript"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    background: "rgba(99, 102, 241, 0.2)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "16px",
                    color: "#e2e8f0",
                    fontWeight: "500",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Brand */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "60px",
            fontSize: "18px",
            color: "#64748b",
            fontWeight: "500",
          }}
        >
          vyomaui.design
        </div>

        {/* Version Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            background: "rgba(99, 102, 241, 0.2)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "14px",
            color: "#e2e8f0",
            fontWeight: "500",
          }}
        >
          {`v${vuiVersion}`}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
