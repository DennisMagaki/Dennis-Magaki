import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";

const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/g).length;
  return Math.ceil(words / wordsPerMinute);
}

// ✅ Get ALL posts (for blog list)
export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);

  return files.map((file) => {
    const slugName = file.replace(".md", "");
    const fullPath = path.join(postsDirectory, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContent);

    return {
      slug: slugName,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      image: data.image,
      author: data.author,
      description: data.description,
    };
  });
}

// ✅ Get ONE post
export async function getPostBySlug(slugName: string) {
  const fullPath = path.join(postsDirectory, `${slugName}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContent);
  const readingTime = getReadingTime(content);

  // TOC extraction
  const toc = extractTOC(content);

  const processedContent = await remark()
    .use(remarkGfm) // tables, strikethrough, etc
    .use(remarkRehype) // convert to HTML AST
    .use(rehypeSlug) // adds IDs to headings
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    }) // clickable headings
    .use(rehypeStringify)
    .process(content);

  return {
    slug: slugName,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    image: data.image,
    readingTime,
    contentHtml: processedContent.toString(),
    toc,
    description: data.description,
    author: data.author,
  };
}

// ✅ TOC helper
function extractTOC(content: string) {
  const lines = content.split("\n");

  return lines
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, "");

      const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Keep letters, numbers, spaces, and existing dashes
        .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, multiple dashes with single dash
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes

      return { level, text, slug };
    });
}

// ✅ Get ALL unique tags
export function getAllTags(posts: any[]) {
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag: string) => tagSet.add(tag));
  });

  return Array.from(tagSet);
}
