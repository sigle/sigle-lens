/**
 * Nitro is generating invalid esm imports for lodash. We need to add the .js extension to the imports
 * to make it work.
 * We go recursively through all the files in the .output directory and add the .js extension to the lodash imports.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const __dirname = dirname(new URL(import.meta.url).pathname);
const directoryPath = join(__dirname, "..", "./.output");
const importToFind = `import 'lodash/isObject';`;
const importToReplace = `import 'lodash/isObject.js';`;

function getAllFiles(dirPath, arrayOfFiles) {
  const files = readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  for (const file of files) {
    if (statSync(join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(join(dirPath, file));
    }
  }
  return arrayOfFiles;
}

function replaceImportInFile(filePath) {
  const fileContent = readFileSync(filePath, "utf8");
  if (fileContent.includes(importToFind)) {
    const updatedContent = fileContent.replace(importToFind, importToReplace);
    writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Replaced in file: ${filePath}`);
  }
}

async function main() {
  const allFiles = getAllFiles(directoryPath);
  const jsFiles = allFiles.filter(
    (file) => file.endsWith(".js") || file.endsWith(".mjs"),
  );
  jsFiles.forEach(replaceImportInFile);

  console.info("Nitro build fix succeeded");
  process.exit(0);
}

main().catch((e) => {
  console.error("Nitro build fix failed");
  console.error(e);
  process.exit(1);
});
