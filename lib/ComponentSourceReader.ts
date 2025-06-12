import { readFile, readdir } from "fs/promises";
import { join } from "path";

// Dynamic component discovery by reading the ComponentMapping file
async function getComponentMappingImports(): Promise<Record<string, string>> {
  try {
    const mappingFilePath = join(process.cwd(), "data/ComponentMapping.ts");
    const mappingContent = await readFile(mappingFilePath, "utf-8");
    
    // Extract import statements and map them
    const importRegex = /import\s+(\w+)\s+from\s+["'](@\/[^"']+)["']/g;
    const imports: Record<string, string> = {};
    
    let match;
    while ((match = importRegex.exec(mappingContent)) !== null) {
      const [, componentName, importPath] = match;
      // Convert @/ path to actual file path
      const actualPath = importPath.replace("@/", "") + ".tsx";
      imports[componentName] = actualPath;
    }
    
    return imports;
  } catch (error) {
    console.error("Error reading ComponentMapping:", error);
    return {};
  }
}

// Find component file by searching through directories
async function findComponentFile(componentName: string): Promise<string | null> {
  const searchDirs = ["components", "components/vui", "components/ui"];
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
    const componentRegex = new RegExp(`name:\\s*["']${displayName}["'][^}]*component:\\s*(\\w+)`, 'i');
    const match = mappingContent.match(componentRegex);
    
    if (match) {
      return match[1];
    }
    
    // Fallback: convert display name to class name
    return displayName.replace(/\s+/g, '');
  } catch (error) {
    console.error("Error getting component class name:", error);
    return displayName.replace(/\s+/g, '');
  }
}

export async function getComponentSourceCode(componentName: string): Promise<string> {
  try {
    // First, try to get the component class name and find it in imports
    const componentClassName = await getComponentClassName(componentName);
    const imports = await getComponentMappingImports();
    
    let filePath: string | null = imports[componentClassName] || null;
    
    // If not found in imports, try to find the file dynamically
    if (!filePath) {
      filePath = await findComponentFile(componentClassName);
    }
    
    // If still not found, try with display name
    if (!filePath) {
      const cleanName = componentName.replace(/\s+/g, '');
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
  const importPath = imports[componentClassName] || `components/${componentClassName}`;
  
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

  return `import ${componentClassName} from '@/${importPath.replace('.tsx', '')}';

export default function Example() {
  return (
    <div>
      <${componentClassName}${propsString ? ` ${propsString}` : ""} />
    </div>
  );
}`;
}

// Dynamic props detection based on component analysis
export async function getDefaultProps(componentName: string): Promise<Record<string, unknown>> {
  try {
    const sourceCode = await getComponentSourceCode(componentName);
    
    // Basic props extraction from TypeScript interfaces and default values
    const propsDefaults: Record<string, unknown> = {};
    
    // Look for common prop patterns in the source code
    if (componentName.toLowerCase().includes('decryption')) {
      propsDefaults.text = "Hover to decrypt this text!";
      propsDefaults.speed = 50;
      propsDefaults.sequential = true;
      propsDefaults.animateOn = "hover";
    }
    
    if (componentName.toLowerCase().includes('typing')) {
      propsDefaults.placeholder = "Start typing...";
      propsDefaults.delay = 100;
    }
    
    if (componentName.toLowerCase().includes('counting')) {
      propsDefaults.start = 0;
      propsDefaults.end = 100;
      propsDefaults.duration = 2000;
    }
    
    // Extract default values from the source code
    const defaultValueRegex = /(\w+):\s*([^,\n}]+)\s*=/g;
    let match;
    while ((match = defaultValueRegex.exec(sourceCode)) !== null) {
      const [, propName, defaultValue] = match;
      try {
        // Try to parse the default value
        if (defaultValue.includes('"') || defaultValue.includes("'")) {
          propsDefaults[propName] = defaultValue.replace(/['"]/g, '');
        } else if (defaultValue === 'true' || defaultValue === 'false') {
          propsDefaults[propName] = defaultValue === 'true';
        } else if (!isNaN(Number(defaultValue))) {
          propsDefaults[propName] = Number(defaultValue);
        }
      } catch {
        // Skip if can't parse
      }
    }
    
    return propsDefaults;
  } catch (error) {
    console.error(`Error extracting props for ${componentName}:`, error);
    return {};
  }
}
