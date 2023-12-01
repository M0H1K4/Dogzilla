const fs = require("fs");

function readFilesInDirectory(directory) {
  const files = fs.readdirSync(directory);
  const fileContents = {};

  files.forEach((file) => {
    const filePath = `${directory}/${file}`;
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const subFiles = readFilesInDirectory(filePath);
      Object.assign(fileContents, subFiles);
    } else if (stats.isFile() && file.endsWith(".txt")) {
      fileContents[filePath] = fs.readFileSync(filePath, "utf8");
    }
  });

  return fileContents;
}

function extractDependencies(fileContent) {
  const requireRegex = /require ['"](.*?)['"]/g;
  const matches = [...fileContent.matchAll(requireRegex)];
  return matches.map((match) => match[1]);
}

function resolveDependencies(allFiles) {
  const dependencies = {};

  Object.keys(allFiles).forEach((filePath) => {
    const fileContent = allFiles[filePath];
    dependencies[filePath] = extractDependencies(fileContent);
  });

  const sortedFiles = [];
  const visited = {};

  function visit(file) {
    if (!visited[file]) {
      visited[file] = true;
      dependencies[file].forEach((dependency) => visit(dependency));
      sortedFiles.push(file);
    }
  }

  Object.keys(dependencies).forEach(visit);
  return sortedFiles.reverse();
}

function concatenateFiles(allFiles, sortedFiles) {
  let concatenatedContent = "";

  sortedFiles.forEach((filePath) => {
    concatenatedContent += allFiles[filePath] + "\n\n";
  });

  return concatenatedContent;
}

// Example usage:
const rootDirectory = `${__dirname}`; 
const allFiles = readFilesInDirectory(rootDirectory);
const sortedFiles = resolveDependencies(allFiles);
const concatenatedContent = concatenateFiles(allFiles, sortedFiles);

console.log(concatenatedContent);
