import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import * as glob from "glob";

/**
 * Caches processed interfaces to avoid duplicate processing
 */
const processedInterfaces: Record<string, any> = {};

// Add this after the importedInterfaces declaration
// Track interfaces defined in the current file
const localInterfaces: Set<string> = new Set();

// Add this function before findInterface function
function collectLocalInterfaces(node: ts.Node) {
  if (ts.isInterfaceDeclaration(node)) {
    localInterfaces.add(node.name.text);
  }
  ts.forEachChild(node, collectLocalInterfaces);
}

/**
 * Extracts interface names from a TypeScript file
 * @param filePath Path to the TypeScript file
 * @returns Array of interface names
 */
function extractInterfaceNames(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(
    path.basename(filePath),
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const interfaceNames: string[] = [];

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      interfaceNames.push(node.name.text);
    }
    ts.forEachChild(node, visit);
  }

  ts.forEachChild(sourceFile, visit);
  return interfaceNames;
}

/**
 * Dynamically generate an empty object with all properties based on a TypeScript interface
 * @param interfacePath The path to the file containing the interface
 * @param interfaceName The name of the interface to generate an object for
 * @returns An object with all properties from the interface set to empty/default values
 */
function generateEmptyObjectFromInterface(
  interfacePath: string,
  interfaceName: string
): any {
  // Check if we've already processed this interface
  const cacheKey = `${interfacePath}:${interfaceName}`;
  if (processedInterfaces[cacheKey]) {
    return JSON.parse(JSON.stringify(processedInterfaces[cacheKey]));
  }

  // Read the file content
  const fileContent = fs.readFileSync(interfacePath, "utf-8");

  // Create a source file
  const sourceFile = ts.createSourceFile(
    path.basename(interfacePath),
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  // Object to store the properties
  const result: Record<string, any> = {};

  // Track imported interfaces
  const importedInterfaces: Record<string, { source: string }> = {};

  // Process all import declarations to gather interface sources
  function processImports(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      const importPath = (node.moduleSpecifier as ts.StringLiteral).text;

      // Get the resolved path
      let resolvedPath = importPath;
      if (importPath.startsWith(".")) {
        resolvedPath = path.resolve(path.dirname(interfacePath), importPath);
        // Add .ts extension if not present
        if (!resolvedPath.endsWith(".ts")) {
          resolvedPath += ".ts";
        }
      }

      // Process named imports
      if (
        node.importClause?.namedBindings &&
        ts.isNamedImports(node.importClause.namedBindings)
      ) {
        node.importClause.namedBindings.elements.forEach((importSpec) => {
          const importName = importSpec.name.text;
          importedInterfaces[importName] = { source: resolvedPath };
        });
      }
    }

    ts.forEachChild(node, processImports);
    // Call this after processing imports
    // First pass: collect all local interfaces
    ts.forEachChild(sourceFile, collectLocalInterfaces);
  }

  // First pass: collect all imports
  ts.forEachChild(sourceFile, processImports);

  // Find and process the interface declaration
  function findInterface(node: ts.Node): boolean {
    if (ts.isInterfaceDeclaration(node) && node.name.text === interfaceName) {
      // Process extended interfaces first
      if (node.heritageClauses) {
        node.heritageClauses.forEach((heritageClause) => {
          if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
            heritageClause.types.forEach((typeNode) => {
              const extendedInterface = typeNode.expression.getText(sourceFile);

              if (importedInterfaces[extendedInterface]) {
                // Process the extended interface from imported file
                try {
                  const parentInterfaceProps = generateEmptyObjectFromInterface(
                    importedInterfaces[extendedInterface].source,
                    extendedInterface
                  );

                  // Merge parent properties into result
                  Object.assign(result, parentInterfaceProps);
                } catch (err) {
                  console.log(
                    `Warning: Could not process extended interface ${extendedInterface}: ${err.message}`
                  );
                }
              } else {
                console.log(
                  `Note: Extended interface ${extendedInterface} not found in imports`
                );
              }
            });
          }
        });
      }

      // Process all properties of the current interface
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          let propertyName = "";

          // Get the property name
          if (ts.isIdentifier(member.name)) {
            propertyName = member.name.text;
          } else if (ts.isStringLiteral(member.name)) {
            propertyName = member.name.text;
          }

          if (propertyName) {
            // Get default value based on type
            let defaultValue: any = undefined;

            if (member.type) {
              // Get the type text
              const typeText = member.type.getText(sourceFile);

              if (typeText.includes("string")) {
                defaultValue = "";
              } else if (typeText.includes("number")) {
                defaultValue = 0;
              } else if (typeText.includes("boolean")) {
                defaultValue = false;
                //   } else if (typeText.includes("Date")) {
                //     defaultValue = new Date().toISOString();
              } else if (typeText.includes("[]")) {
                defaultValue = [];
              } else if (typeText.includes("{")) {
                defaultValue = {};
              } else if (/I[A-Z]/.test(typeText)) {
                // Try to resolve the interface
                const referencedType = typeText.split("|")[0].trim();
                if (importedInterfaces[referencedType]) {
                  // Handle imported interface (existing code)
                  try {
                    defaultValue = generateEmptyObjectFromInterface(
                      importedInterfaces[referencedType].source,
                      referencedType
                    );
                  } catch (err) {
                    console.log(
                      `Warning: Could not process nested interface ${referencedType}: ${err.message}`
                    );
                    defaultValue = {};
                  }
                } else if (localInterfaces.has(referencedType)) {
                  // Handle interface from the same file
                  const localCacheKey = `${interfacePath}:${referencedType}`;

                  // If we've already processed this interface, use the cached version
                  if (processedInterfaces[localCacheKey]) {
                    defaultValue = JSON.parse(
                      JSON.stringify(processedInterfaces[localCacheKey])
                    );
                  } else {
                    // If not yet processed, generate it now
                    try {
                      defaultValue = generateEmptyObjectFromInterface(
                        interfacePath,
                        referencedType
                      );
                    } catch (err) {
                      console.log(
                        `Warning: Could not process local interface ${referencedType}: ${err.message}`
                      );
                      defaultValue = {};
                    }
                  }
                } else {
                  console.log(
                    `Interface ${referencedType} not found in imports or local declarations`
                  );
                  defaultValue = {};
                }
              } else {
                // For any other types, use an empty string as a fallback
                defaultValue = "";
              }
            }

            // Assign the default value to the property
            result[propertyName] = defaultValue;
          }
        }
      });

      // Cache the result to avoid circular dependencies
      processedInterfaces[cacheKey] = JSON.parse(JSON.stringify(result));
      return true;
    }

    // Continue processing children
    let found = false;
    ts.forEachChild(node, (childNode) => {
      if (!found) {
        found = findInterface(childNode);
      }
    });

    return found;
  }

  // Start processing the source file
  const found = ts.forEachChild(sourceFile, findInterface);

  if (!found) {
    console.log(`Interface ${interfaceName} not found in ${interfacePath}`);
  }

  return result;
}

/**
 * Generate a sample file for a specific interface file
 */
function generateSampleFile(interfaceFilePath: string): void {
  const interfaceNames = extractInterfaceNames(interfaceFilePath);
  if (interfaceNames.length === 0) {
    console.log(`No interfaces found in ${interfaceFilePath}`);
    return;
  }

  // Create the output file path
  const dirname = path.dirname(interfaceFilePath);
  const filename = path.basename(interfaceFilePath, ".ts");
  const baseFilename = filename.replace(".interface", "");
  const outputFilePath = path.join(dirname, `${baseFilename}.gen.ts`);

  // Generate imports
  let outputContent = `// Auto-generated sample data - Do not modify manually\n`;
  outputContent += `import { ${interfaceNames.join(
    ", "
  )} } from "./${filename}";\n\n`;

  // Generate sample objects for each interface
  for (const interfaceName of interfaceNames) {
    // Skip interface names that start with "IBase" as they are usually abstract
    if (interfaceName.startsWith("IBase")) {
      continue;
    }

    try {
      // Generate object
      const sampleObject = generateEmptyObjectFromInterface(
        interfaceFilePath,
        interfaceName
      );

      // Convert the first character of the interface name (after the 'I') to lowercase
      let variableName =
        interfaceName.charAt(0) === "I"
          ? interfaceName.charAt(1).toLowerCase() + interfaceName.slice(2)
          : interfaceName.charAt(0).toLowerCase() + interfaceName.slice(1);

      // Remove "Response", "Params", etc. from the variable name if present
      let nameSuffix = "";
      if (interfaceName.includes("Response")) {
        nameSuffix = "Response";
      } else if (interfaceName.includes("Params")) {
        nameSuffix = "Params";
      }

      variableName = variableName
        .replace(/Response$/, "")
        .replace(/Params$/, "")
        .replace(/Interface$/, "");

      // Add a prefix based on the interface type
      if (interfaceName.startsWith("ICreate")) {
        variableName =
          "create" +
          variableName.charAt(0).toUpperCase() +
          variableName.slice(1);
      } else if (interfaceName.startsWith("IUpdate")) {
        variableName =
          "update" +
          variableName.charAt(0).toUpperCase() +
          variableName.slice(1);
      } else {
        variableName += "Sample";
      }

      // Add the suffix back if it was present
      if (nameSuffix) {
        variableName += nameSuffix;
      }

      // Add to output content
      outputContent += `export const ${variableName}: ${interfaceName} = ${JSON.stringify(
        sampleObject,
        null,
        2
      )};\n\n`;
    } catch (error) {
      console.error(`Error generating sample for ${interfaceName}:`, error);
    }
  }

  // Write the file
  fs.writeFileSync(outputFilePath, outputContent);
  console.log(`Generated sample file: ${outputFilePath}`);
}

/**
 * Main function to generate samples for all interface files
 */
function generateAllSamples(): void {
  const interfacesDir = path.resolve(
    __dirname,
    "../src/nodes/TripIt/interfaces"
  );

  // Get all interface files
  const interfaceFiles = glob.sync("*.interface.ts", {
    cwd: interfacesDir,
    absolute: true,
  });

  // Process each file
  for (const filePath of interfaceFiles) {
    try {
      console.log(`Processing ${path.basename(filePath)}...`);
      generateSampleFile(filePath);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }
}

// Run the generator when the script is executed directly
if (require.main === module) {
  generateAllSamples();
}
