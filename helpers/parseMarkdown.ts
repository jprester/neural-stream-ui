// utils/parseMarkdown.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { NewsItem } from "@/types";

export function getNewsItems() {
  const directory = path.join(process.cwd(), "public/data/articles");

  const filenames = fs.readdirSync(directory);
  const newsItems = filenames.map((filename) => {
    const filePath = path.join(directory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content: marked(content),
    };
  });

  return newsItems as NewsItem[];
}
