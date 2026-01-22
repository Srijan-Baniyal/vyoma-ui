import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  type ComponentPropsInfo,
  extractComponentPropsFromSource,
  extractDefaultValuesFromSource,
} from "./TsASTAbstractionForDoc";

// Import the pre-generated source map - ALWAYS prioritized
let componentSourceMap: Record<string, string> = {};
let sourceMapLoaded = false;

// Load the pre-generated source map - this is now the PRIMARY source
async function loadSourceMap() {
  try {
    const sourceMapModule = await import("./componentSourceCode");
    componentSourceMap = sourceMapModule.componentSourceMap || {};
    sourceMapLoaded = true;
    console.log(
      "✅ Loaded pre-generated source map with",
      Object.keys(componentSourceMap).length,
      "components from componentSourceCode.ts"
    );
  } catch (error) {
    console.error("❌ Failed to load componentSourceCode.ts:", error);
    sourceMapLoaded = true;
  }
}

// Initialize the source map immediately
loadSourceMap();

// Check if we're in production based on environment
const isProduction = process.env.NODE_ENV === "production";

// Function to get component path from ComponentMapping
async function getComponentPathFromMapping(
  componentName: string
): Promise<string | null> {
  // In production, don't try to read files
  if (isProduction) {
    return null;
  }

  try {
    const mappingPath = join(process.cwd(), "data/ComponentMapping.ts");
    const mappingContent = await readFile(mappingPath, "utf-8");

    // Look for the component entry with a path property
    const componentRegex = new RegExp(
      `name:\\s*["']${componentName}["'][^}]*path:\\s*["']([^"']+)["']`,
      "g"
    );
    const match = componentRegex.exec(mappingContent);

    if (match) {
      return match[1]; // Return the path
    }

    return null;
  } catch (error) {
    console.error("Error reading ComponentMapping for path:", error);
    return null;
  }
}

// Dynamic component discovery by reading the ComponentMapping file
async function getComponentMappingImports(): Promise<Record<string, string>> {
  // In production, don't try to read files
  if (isProduction) {
    return {};
  }

  try {
    const mappingFilePath = join(process.cwd(), "data/ComponentMapping.ts");
    const mappingContent = await readFile(mappingFilePath, "utf-8");

    // Extract import statements and map them
    const imports: Record<string, string> = {};

    // Handle both default imports and destructured imports
    const defaultImportRegex = /import\s+(\w+)\s+from\s+["'](@\/[^"']+)["']/g;
    const destructuredImportRegex =
      /import\s+\{\s*([^}]+)\s*\}\s+from\s+["'](@\/[^"']+)["']/g;

    // Process default imports
    let match: RegExpExecArray | null;
    match = defaultImportRegex.exec(mappingContent);
    while (match !== null) {
      const [, componentName, importPath] = match;
      // Convert @/ path to actual file path
      const actualPath = `${importPath.replace("@/", "")}.tsx`;
      imports[componentName] = actualPath;
      match = defaultImportRegex.exec(mappingContent);
    }

    // Process destructured imports
    match = destructuredImportRegex.exec(mappingContent);
    while (match !== null) {
      const [, componentNames, importPath] = match;
      // Convert @/ path to actual file path
      const actualPath = `${importPath.replace("@/", "")}.tsx`;

      // Handle multiple destructured imports
      const names = componentNames.split(",").map((name) => name.trim());
      for (const name of names) {
        imports[name] = actualPath;
      }
      match = destructuredImportRegex.exec(mappingContent);
    }

    return imports;
  } catch (error) {
    console.error("Error reading ComponentMapping:", error);
    return {};
  }
}

// Find component file by searching through directories
async function findComponentFile(
  componentName: string
): Promise<string | null> {
  // In production, don't search filesystem
  if (isProduction) {
    return null;
  }

  const searchDirs = [
    "components",
    "components/vui",
    "components/ui",
    "components/vui/text",
    "components/vui/buttons",
    "components/vui/backgrounds",
    "components/vui/ai",
  ];
  const possibleNames = [
    `${componentName}.tsx`,
    `${componentName}.ts`,
    `${componentName}/index.tsx`,
    `${componentName}/index.ts`,
  ];

  for (const dir of searchDirs) {
    const fullDir = join(process.cwd(), dir);
    try {
      const files = await readdir(fullDir);
      for (const possibleName of possibleNames) {
        if (files.includes(possibleName.split("/")[0])) {
          const filePath = join(dir, possibleName);
          try {
            await readFile(join(process.cwd(), filePath), "utf-8");
            return filePath;
          } catch {
            // File doesn't exist, continue searching
          }
        }
      }
    } catch {
      // Directory doesn't exist or can't be read, continue searching
    }
  }
  return null;
}

// Get the component class name from the component mapping
async function getComponentClassName(displayName: string): Promise<string> {
  // In production, don't try to read files - just use fallback
  if (isProduction) {
    return displayName.replace(/\s+/g, "");
  }

  try {
    const mappingFilePath = join(process.cwd(), "data/ComponentMapping.ts");
    const mappingContent = await readFile(mappingFilePath, "utf-8");

    // Find the component entry in the mapping
    const componentRegex = new RegExp(
      `name:\\s*["']${displayName}["'][^}]*component:\\s*(\\w+)`,
      "i"
    );
    const match = mappingContent.match(componentRegex);

    if (match) {
      return match[1];
    }

    // Fallback: convert display name to class name
    return displayName.replace(/\s+/g, "");
  } catch (error) {
    console.error("Error getting component class name:", error);
    return displayName.replace(/\s+/g, "");
  }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex source code extraction with multiple fallback strategies
export async function getComponentSourceCode(
  componentName: string
): Promise<string> {
  try {
    // Always wait for source map to load first (PRIMARY SOURCE)
    if (!sourceMapLoaded) {
      await loadSourceMap();
    }

    // 🎯 PRIMARY SOURCE: Always check componentSourceCode.ts FIRST
    if (componentSourceMap[componentName]) {
      console.log(`✅ Found ${componentName} in componentSourceCode.ts`);
      return componentSourceMap[componentName];
    }

    // 🔄 FALLBACK: Only use filesystem in development if not in componentSourceCode.ts
    if (!isProduction) {
      console.log(
        `⚠️ ${componentName} not found in componentSourceCode.ts, trying filesystem fallback...`
      );

      // Try to get the exact path from ComponentMapping
      let filePath = await getComponentPathFromMapping(componentName);

      if (filePath) {
        console.log(`📁 Found direct path for ${componentName}: ${filePath}`);
        try {
          const fullPath = join(process.cwd(), filePath);
          const sourceCode = await readFile(fullPath, "utf-8");
          console.log(
            `📖 Successfully read ${sourceCode.split("\n").length} lines from ${filePath}`
          );
          return sourceCode;
        } catch (error) {
          console.error(
            `❌ Error reading from direct path ${filePath}:`,
            error
          );
        }
      }

      // Try component class name approach
      const componentClassName = await getComponentClassName(componentName);
      const imports = await getComponentMappingImports();
      filePath = imports[componentClassName] || null;

      // Try to find the file dynamically
      if (!filePath) {
        filePath = await findComponentFile(componentClassName);
      }

      // Try with clean display name
      if (!filePath) {
        const cleanName = componentName.replace(/\s+/g, "");
        filePath = await findComponentFile(cleanName);
      }

      if (filePath) {
        try {
          const fullPath = join(process.cwd(), filePath);
          const sourceCode = await readFile(fullPath, "utf-8");
          console.log(
            `🔍 Found via search: ${filePath} (${sourceCode.split("\n").length} lines)`
          );
          return sourceCode;
        } catch (error) {
          console.error(`❌ Error reading found file ${filePath}:`, error);
        }
      }
    }

    // 🚫 Component not found anywhere
    const environment = isProduction ? "production" : "development";
    console.error(
      `❌ Component "${componentName}" not found in componentSourceCode.ts${isProduction ? "" : " or filesystem"} (${environment} mode)`
    );

    return `// ❌ Component source not found for "${componentName}"
// Environment: ${environment}
// Expected: Component should be in componentSourceCode.ts
//
// To fix this:
// 1. Add the component to componentSourceCode.ts
// 2. Or regenerate the source map
// 3. Or check the component name spelling

import React from 'react';

export default function ${componentName.replace(/\s+/g, "")}() {
  return (
    <div className="p-8 text-center border-2 border-dashed border-orange-300 bg-orange-50 dark:bg-orange-950 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">${componentName}</h2>
      <p className="text-orange-500 mb-4">
        Component source not available in componentSourceCode.ts
      </p>
      <p className="text-sm text-orange-400">
        Environment: ${environment} | Please check the source map
      </p>
    </div>
  );
}`;
  } catch (error) {
    console.error(
      `💥 Critical error loading source for ${componentName}:`,
      error
    );
    return `// 💥 Critical error loading source code for "${componentName}"
// Error: ${error instanceof Error ? error.message : "Unknown error"}

import React from 'react';

export default function ${componentName.replace(/\s+/g, "")}() {
  return (
    <div className="p-8 text-center border-2 border-dashed border-red-300 bg-red-50 dark:bg-red-950 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-red-600">${componentName}</h2>
      <p className="text-red-500 mb-4">
        Critical error loading source code
      </p>
      <p className="text-xs text-red-400 font-mono">
        Error: ${error instanceof Error ? error.message : "Unknown error"}
      </p>
    </div>
  );
}`;
  }
}

export async function getComponentUsageExample(
  componentName: string,
  defaultProps?: Record<string, unknown>
): Promise<string> {
  // In production, provide a simple usage example without reading files
  if (isProduction) {
    const componentClassName = componentName.replace(/\s+/g, "");
    const propsString =
      defaultProps && Object.keys(defaultProps).length > 0
        ? Object.entries(defaultProps)
            .map(([key, value]) => {
              if (typeof value === "string") {
                return `${key}="${value}"`;
              }
              if (typeof value === "boolean") {
                return value ? key : `${key}={false}`;
              }
              if (typeof value === "number") {
                return `${key}={${value}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .join(" ")
        : "";

    return `import ${componentClassName} from '@/components/vui/${componentClassName}';

export default function Example() {
  return (
    <div className="p-8">
      <${componentClassName}${propsString ? ` ${propsString}` : ""} />
    </div>
  );
}`;
  }

  const componentClassName = await getComponentClassName(componentName);
  const imports = await getComponentMappingImports();
  const importPath =
    imports[componentClassName] || `components/${componentClassName}`;

  const propsString =
    defaultProps && Object.keys(defaultProps).length > 0
      ? Object.entries(defaultProps)
          .map(([key, value]) => {
            if (typeof value === "string") {
              return `${key}="${value}"`;
            }
            if (typeof value === "boolean") {
              return value ? key : `${key}={false}`;
            }
            if (typeof value === "number") {
              return `${key}={${value}}`;
            }
            return `${key}={${JSON.stringify(value)}}`;
          })
          .join(" ")
      : "";

  return `import ${componentClassName} from '@/${importPath.replace(
    ".tsx",
    ""
  )}';

export default function Example() {
  return (
    <div className="p-8">
      <${componentClassName}${propsString ? ` ${propsString}` : ""} />
    </div>
  );
}`;
}

/**
 * Extract comprehensive component props information using TypeScript AST
 * Sources: componentSourceCode.ts (primary) -> filesystem (development fallback)
 */
export async function getComponentPropsInfo(
  componentName: string
): Promise<ComponentPropsInfo | null> {
  try {
    console.log(`🔍 Extracting props info for component: ${componentName}`);

    // Get source code (which now prioritizes componentSourceCode.ts)
    const sourceCode = await getComponentSourceCode(componentName);
    if (
      !sourceCode ||
      sourceCode.includes("// ❌ Component source not found") ||
      sourceCode.includes("// 💥 Critical error")
    ) {
      console.warn(`❌ No valid source code available for ${componentName}`);
      return null;
    }

    // 🧠 Intelligent component name variations for AST parsing
    const componentNameVariations = [
      componentName,
      componentName.replace(/\s+/g, ""), // Remove spaces: "Animated Number" -> "AnimatedNumber"
      `${componentName.replace(/\s+/g, "")}Countdown`, // Add Countdown: "AnimatedNumber" -> "AnimatedNumberCountdown"
      `${componentName.replace(/\s+/g, "")}Component`, // Add Component suffix
      undefined, // Let AST parser auto-detect best component
    ];

    console.log(
      `🎯 Trying ${componentNameVariations.length} name variations for AST parsing...`
    );

    // Try each variation until we find props
    for (const nameVariation of componentNameVariations) {
      const propsInfo = extractComponentPropsFromSource(
        sourceCode,
        nameVariation,
        {
          includePrivateProps: false,
          extractExamples: true,
          resolveUnions: true,
          maxDepth: 3,
        }
      );

      if (propsInfo && propsInfo.props.length > 0) {
        console.log(
          `✅ Successfully extracted ${propsInfo.props.length} props for ${componentName} using variation: ${nameVariation || "auto-detect"}`
        );
        return propsInfo;
      }
    }

    console.warn(
      `⚠️ No props found for ${componentName} with any name variation (may have no props interface)`
    );
    return null;
  } catch (error) {
    console.error(
      `💥 Error extracting props info for ${componentName}:`,
      error
    );
    return null;
  }
}

export async function getDefaultProps(
  componentName: string
): Promise<Record<string, unknown>> {
  try {
    console.log(`🔍 Extracting default props for component: ${componentName}`);

    // Get source code (which now prioritizes componentSourceCode.ts)
    const sourceCode = await getComponentSourceCode(componentName);
    if (
      !sourceCode ||
      sourceCode.includes("// ❌ Component source not found") ||
      sourceCode.includes("// 💥 Critical error")
    ) {
      console.warn(
        `❌ No valid source code available for ${componentName} - cannot extract default props`
      );
      return {};
    }

    // 🧠 100% TypeScript AST-based extraction
    console.log(
      `🔬 Using TypeScript AST parser to extract default props for ${componentName}`
    );
    const astDefaultValues = extractDefaultValuesFromSource(sourceCode);

    if (Object.keys(astDefaultValues).length > 0) {
      console.log(
        `✅ AST parser found ${Object.keys(astDefaultValues).length} default values for ${componentName}:`,
        Object.keys(astDefaultValues)
      );
      return astDefaultValues;
    }

    console.log(
      `ℹ️ No default values found for ${componentName} (normal if component has no defaults)`
    );
    return {};
  } catch (error) {
    console.error(
      `💥 Error extracting default props for ${componentName}:`,
      error
    );
    return {};
  }
}
