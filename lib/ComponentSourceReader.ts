import { readFile, readdir } from "fs/promises";
import { join } from "path";

// Import the pre-generated source map for production
let componentSourceMap: Record<string, string> = {};
let componentPropsMap: Record<string, Record<string, unknown>> = {};

// Try to import the pre-generated source map (only available in production builds)
async function loadSourceMap() {
  try {
    const sourceMapModule = await import('./componentSourceCode');
    componentSourceMap = sourceMapModule.componentSourceMap || {};
    componentPropsMap = sourceMapModule.componentPropsMap || {};
  } catch {
    // Source map not available (development mode), will use filesystem reading
    console.log('Development mode: Using filesystem reading for component sources');
  }
}

// Initialize the source map
loadSourceMap();

// Check if we're in production or if source map is available
const isProduction = process.env.NODE_ENV === 'production' || Object.keys(componentSourceMap).length > 0;

// Dynamic component discovery by reading the ComponentMapping file
async function getComponentMappingImports(): Promise<Record<string, string>> {
  try {
    const mappingFilePath = join(process.cwd(), "data/ComponentMapping.ts");
    const mappingContent = await readFile(mappingFilePath, "utf-8");

    // Extract import statements and map them
    const imports: Record<string, string> = {};

    // Handle both default imports and destructured imports
    const defaultImportRegex = /import\s+(\w+)\s+from\s+["'](@\/[^"']+)["']/g;
    const destructuredImportRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+["'](@\/[^"']+)["']/g;

    // Process default imports
    let match;
    while ((match = defaultImportRegex.exec(mappingContent)) !== null) {
      const [, componentName, importPath] = match;
      // Convert @/ path to actual file path
      const actualPath = importPath.replace("@/", "") + ".tsx";
      imports[componentName] = actualPath;
    }

    // Process destructured imports
    while ((match = destructuredImportRegex.exec(mappingContent)) !== null) {
      const [, componentNames, importPath] = match;
      // Convert @/ path to actual file path
      const actualPath = importPath.replace("@/", "") + ".tsx";
      
      // Handle multiple destructured imports
      const names = componentNames.split(",").map(name => name.trim());
      names.forEach(name => {
        imports[name] = actualPath;
      });
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

  const searchDirs = ["components", "components/vui", "components/ui", "components/vui/text", "components/vui/buttons"];
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
            continue;
          }
        }
      }
    } catch {
      continue;
    }
  }
  return null;
}

// Get the component class name from the component mapping
async function getComponentClassName(displayName: string): Promise<string> {
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

export async function getComponentSourceCode(
  componentName: string
): Promise<string> {
  try {
    // In production, use pre-generated source map
    if (isProduction && componentSourceMap[componentName]) {
      return componentSourceMap[componentName];
    }

    // Development mode: read from filesystem
    const componentClassName = await getComponentClassName(componentName);
    const imports = await getComponentMappingImports();

    let filePath: string | null = imports[componentClassName] || null;

    // If not found in imports, try to find the file dynamically
    if (!filePath) {
      filePath = await findComponentFile(componentClassName);
    }

    // If still not found, try with display name
    if (!filePath) {
      const cleanName = componentName.replace(/\s+/g, "");
      filePath = await findComponentFile(cleanName);
    }

    if (!filePath) {
      return `// Source code not available for ${componentName}
// Component file could not be located automatically

import React from 'react';

export default function ${componentName.replace(/\s+/g, "")}() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">${componentName}</h2>
      <p className="text-muted-foreground">
        This component is coming soon. Stay tuned for updates!
      </p>
    </div>
  );
}`;
    }

    // Read the source file
    const fullPath = join(process.cwd(), filePath);
    const sourceCode = await readFile(fullPath, "utf-8");

    return sourceCode;
  } catch (error) {
    console.error(`Error reading source for ${componentName}:`, error);
    return `// Error reading source code for ${componentName}
// ${error instanceof Error ? error.message : "Unknown error"}

import React from 'react';

export default function ${componentName.replace(/\s+/g, "")}() {
  return (
    <div className="p-8 text-center border-2 border-dashed border-red-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-red-600">${componentName}</h2>
      <p className="text-red-500">
        Failed to load source code. Please check the file path and permissions.
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
            } else if (typeof value === "boolean") {
              return value ? key : `${key}={false}`;
            } else if (typeof value === "number") {
              return `${key}={${value}}`;
            } else {
              return `${key}={${JSON.stringify(value)}}`;
            }
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

export async function getDefaultProps(
  componentName: string
): Promise<Record<string, unknown>> {
  try {
    // In production, use pre-generated props map
    if (isProduction && componentPropsMap[componentName]) {
      return componentPropsMap[componentName];
    }

    // Development mode: try to extract props dynamically
    const sourceCode = await getComponentSourceCode(componentName);
    
    // Simple extraction of default props from source code
    const defaultProps: Record<string, unknown> = {};
    
    // Look for default parameter values in function definitions
    const functionMatch = sourceCode.match(/function\s+\w+\s*\([^)]*\{([^}]+)\}[^)]*\)/);
    if (functionMatch) {
      const params = functionMatch[1];
      const propMatches = params.matchAll(/(\w+)\s*=\s*([^,}]+)/g);
      
      for (const match of propMatches) {
        const [, propName, defaultValue] = match;
        try {
          // Try to parse the default value
          if (defaultValue.includes('"') || defaultValue.includes("'")) {
            defaultProps[propName] = defaultValue.replace(/['"]/g, '');
          } else if (defaultValue === 'true' || defaultValue === 'false') {
            defaultProps[propName] = defaultValue === 'true';
          } else if (!isNaN(Number(defaultValue))) {
            defaultProps[propName] = Number(defaultValue);
          } else {
            defaultProps[propName] = defaultValue.trim();
          }
                 } catch {
           defaultProps[propName] = defaultValue.trim();
         }
      }
    }
    
    return defaultProps;
  } catch (error) {
    console.error(`Error extracting default props for ${componentName}:`, error);
    return {};
  }
}
