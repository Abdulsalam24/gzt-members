// Autodiscover and export all files in this directorty
const fs = require("fs");
const path = require("path");

// Resolve the directory of this file
const dir = path.resolve(__dirname, "..", "bio-data");

// Get all Filenames in this directory
const filenames = fs.readdirSync(dir);

// Get file contents
const fileContents = filenames.map((filename) => {
  // Make sure it's a JSON
  if (!filename.endsWith(".json")) return null;

  // Get json contents
  const file = fs.readFileSync(path.resolve(dir, filename), "utf8");
  const content = JSON.parse(file);

  return content;
});

// Filter out nulls
const fileContentsFiltered = fileContents.filter((content) => content !== null);

// Write fileContents to file named index.js
fs.writeFileSync(
  path.resolve(dir, "..", "src", "all_members.js"),
  `module.exports = ${JSON.stringify(fileContentsFiltered, null, 2)};`
);

console.log("Members autodiscovered and exported 🚀🚀🚀");
