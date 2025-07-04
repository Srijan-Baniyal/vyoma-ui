import fs from 'fs/promises';
import path from 'path';

// Function to read component source code
async function readComponentSource(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Function to extract default props from TypeScript AST (simplified)
function extractDefaultProps(sourceCode, componentName) {
  try {
    const props = {};
    
    // Look for default values in destructuring
    const destructureMatches = sourceCode.match(/\{\s*([^}]+)\s*\}\s*=\s*props/g);
    if (destructureMatches) {
      destructureMatches.forEach(match => {
        const propsContent = match.match(/\{([^}]+)\}/)?.[1];
        if (propsContent) {
          const propPairs = propsContent.split(',');
          propPairs.forEach(pair => {
            const defaultMatch = pair.match(/(\w+)\s*=\s*([^,]+)/);
            if (defaultMatch) {
              const [, propName, defaultValue] = defaultMatch;
              try {
                // Try to parse the default value
                if (defaultValue.includes('"') || defaultValue.includes("'")) {
                  props[propName.trim()] = defaultValue.replace(/['"]/g, '');
                } else if (defaultValue === 'true' || defaultValue === 'false') {
                  props[propName.trim()] = defaultValue === 'true';
                } else if (!isNaN(Number(defaultValue))) {
                  props[propName.trim()] = Number(defaultValue);
                } else {
                  props[propName.trim()] = defaultValue.trim();
                }
              } catch {
                props[propName.trim()] = defaultValue.trim();
              }
            }
          });
        }
      });
    }

    return props;
  } catch (error) {
    console.error(`Error extracting props for ${componentName}:`, error.message);
    return {};
  }
}

async function generateSourceMap() {
  try {
    // Read the ComponentMapping file to get all components
    const mappingPath = path.join(process.cwd(), 'data/ComponentMapping.ts');
    const mappingContent = await fs.readFile(mappingPath, 'utf-8');
    
    // Extract component entries with their paths
    const sourceMap = {};
    const propMap = {};
    
    // Parse the componentMap to find all components with paths
    const componentMapMatch = mappingContent.match(/export const componentMap[^=]*=\s*(\{[\s\S]*?\});/);
    if (componentMapMatch) {
      const mapContent = componentMapMatch[1];
      
      // Extract path properties
      const pathMatches = mapContent.matchAll(/path:\s*["']([^"']+)["']/g);
      const nameMatches = mapContent.matchAll(/name:\s*["']([^"']+)["']/g);
      
      const paths = Array.from(pathMatches).map(match => match[1]);
      const names = Array.from(nameMatches).map(match => match[1]);
      
      // Read source code for each component
      for (let i = 0; i < Math.min(paths.length, names.length); i++) {
        const componentPath = paths[i];
        const componentName = names[i];
        
        if (componentPath && componentPath.endsWith('.tsx')) {
          console.log(`Reading source for: ${componentName} at ${componentPath}`);
          const sourceCode = await readComponentSource(componentPath);
          
          if (sourceCode) {
            sourceMap[componentName] = sourceCode;
            
            // Extract default props
            const className = componentName.replace(/\s+/g, '');
            const defaultProps = extractDefaultProps(sourceCode, className);
            propMap[componentName] = defaultProps;
          }
        }
      }
    }
    
    // Also read source for components in the import statements
    const importMatches = mappingContent.matchAll(/import[^from]+from\s+["']@\/([^"']+)["']/g);
    for (const match of importMatches) {
      const importPath = match[1] + '.tsx';
      if (importPath.includes('components/')) {
        // Extract component name from import
        const importStatement = match[0];
        const componentNameMatch = importStatement.match(/import\s+\{\s*([^,}]+)/);
        if (componentNameMatch) {
          const componentName = componentNameMatch[1].trim().replace('Showcase', '').replace('Theme', '');
          if (!sourceMap[componentName]) {
            console.log(`Reading source for imported component: ${componentName} at ${importPath}`);
            const sourceCode = await readComponentSource(importPath);
            if (sourceCode) {
              sourceMap[componentName] = sourceCode;
              const defaultProps = extractDefaultProps(sourceCode, componentName);
              propMap[componentName] = defaultProps;
            }
          }
        }
      }
    }
    
    // Generate the output file
    const outputContent = `// Auto-generated source map for production builds
// Generated on: ${new Date().toISOString()}

export const componentSourceMap: Record<string, string> = ${JSON.stringify(sourceMap, null, 2)};

export const componentPropsMap: Record<string, Record<string, unknown>> = ${JSON.stringify(propMap, null, 2)};
`;
    
    await fs.writeFile(path.join(process.cwd(), 'lib/componentSourceCode.ts'), outputContent);
    console.log(`✅ Generated source map with ${Object.keys(sourceMap).length} components`);
    console.log(`📝 Component names: ${Object.keys(sourceMap).join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error generating source map:', error);
    process.exit(1);
  }
}

// Run the script
generateSourceMap(); 