const { log } = require("console");
const fs = require("fs");
const path = require("path");

const interfacesFile = path.join(__dirname, "prisma/interfaces.ts");
const sdkFile = path.join(__dirname, "sdk.ts");
const typeFile = path.join(__dirname, "src/types/index.ts");

function extractEnums() {
  if (!fs.existsSync(interfacesFile)) {
    console.error(`Prisma interfaces file not found at: ${interfacesFile}`);
    return;
  }
  const content = fs.readFileSync(interfacesFile, "utf-8");
  const enumRegex = /export enum (\w+)\s*{[^}]*}/g;
  const enums = [];
  let match;
  while ((match = enumRegex.exec(content)) !== null) {
    enums.push(match[0]);
  }
  return enums;
}

function readTypeFile() {
  try {
    if (!fs.existsSync(typeFile)) {
      console.error(`The file ${typeFile} does not exist.`);
      return;
    }

    const fileContent = fs.readFileSync(typeFile, "utf-8");

    // remove import statements using a regex
    const contentWithoutImports = fileContent
      .split("\n")
      .filter((line) => !line.trim().startsWith("import"))
      .join("\n");

    return contentWithoutImports;
  } catch (error) {
    console.error(`🚫 Error reading the file:\n ${error}`);
    return;
  }
}

function writeToPublishFile(enums, typeContent) {
  try {
    // delete the existing publish.ts file
    if (fs.existsSync(sdkFile)) {
      fs.unlinkSync(sdkFile);
    }

    // Combine enums and types into a single string
    const contentToWrite = `${enums.join("\n\n")}\n\n${typeContent}`;

    fs.writeFileSync(sdkFile, contentToWrite, "utf-8");

    console.log(`✅ Successfully generated to ${sdkFile}`);
  } catch (error) {
    console.error(`🚫 Error writing to the file:\n ${error}`);
  }
}

function codeGen() {
  const enums = extractEnums();
  const typeContent = readTypeFile();
  writeToPublishFile(enums, typeContent);
}

codeGen();
