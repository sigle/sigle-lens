/**
 * Nitro is generating invalid esm imports for lodash. We need to add the .js extension to the imports
 * to make it work.
 * We go recursively through all the files in the .output directory and add the .js extension to the lodash imports.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const __dirname = dirname(new URL(import.meta.url).pathname);
const directoryPath = join(__dirname, "..", "./.output");

// Array of find/replace operations
const operations = [
  {
    find: `import 'lodash/isObject';`,
    replace: `import 'lodash/isObject.js';`,
  },
  {
    find: `from 'lodash/isObject';`,
    replace: `from 'lodash/isObject.js';`,
  },
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);
  for (const file of files) {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  }
  return arrayOfFiles;
}

function replaceImportsInFile(filePath, operations) {
  let fileContent = readFileSync(filePath, "utf8");
  let fileUpdated = false;

  for (const { find, replace } of operations) {
    if (fileContent.includes(find)) {
      fileContent = fileContent.replace(new RegExp(find, "g"), replace);
      fileUpdated = true;
    }
  }

  if (fileUpdated) {
    writeFileSync(filePath, fileContent, "utf8");
    console.log(`Replaced in file: ${filePath}`);
  }
}

async function main() {
  const allFiles = getAllFiles(directoryPath);
  const jsFiles = allFiles.filter(
    (file) => file.endsWith(".js") || file.endsWith(".mjs"),
  );

  for (const file of jsFiles) {
    replaceImportsInFile(file, operations);
  }

  console.info("Nitro build fix succeeded");
  process.exit(0);
}

main().catch((e) => {
  console.error("Nitro build fix failed");
  console.error(e);
  process.exit(1);
});
