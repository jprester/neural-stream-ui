const fs = require("fs");
const marked = require("marked");
const TurndownService = require("turndown");

// Initialize turndown service
const turndownService = new TurndownService();

const markdownContent = `# Your Markdown Here
- List item 1
- List item 23213`;

console.log(markdownContent);
console.log("turndownService: ", turndownService);
console.log("marked: ", marked);

// Convert Markdown to HTML
const htmlContent = marked.marked(markdownContent);

console.log(htmlContent);

// Optionally, convert HTML back to Markdown or to JSON as needed
const markdownAgain = turndownService.turndown(htmlContent);

// For JSON, you might structure it based on your needs, for example:
const jsonContent = {
  content: markdownAgain,
};

// Save to a JSON file
fs.writeFileSync("content.json", JSON.stringify(jsonContent, null, 2));
