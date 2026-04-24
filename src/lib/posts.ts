import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import { visit } from "unist-util-visit";
import { getPageViewsByUrl } from "./umami";

const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/g).length;
  return Math.ceil(words / wordsPerMinute);
}

function rehypeCodeTitles() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "pre") {
        const code = node.children?.[0];

        if (
          code?.tagName === "code" &&
          Array.isArray(code.properties?.className)
        ) {
          const classes = code.properties.className;

          const langClass = classes.find((cls: string) =>
            cls.startsWith("language-")
          );

          if (langClass) {
            const lang = langClass.replace("language-", "");

            node.properties = {
              ...node.properties,
              "data-language": lang,
            };
          }
        }
      }
    });
  };
}

export async function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);

  let viewsMap: Record<string, number> = {};

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/umami/views`, {
      next: { revalidate: 300 }, // cache on Next side too
    });

    viewsMap = await res.json();
  } catch (err) {
    console.error("Failed to fetch views:", err);
  }

  return files.map((file) => {
    const slugName = file.replace(".md", "");
    const fullPath = path.join(postsDirectory, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContent);

    const pathUrl = `/blog/${slugName}`;

    return {
      slug: slugName,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      image: data.image,
      author: data.author,
      description: data.description,
      views: viewsMap[pathUrl] || 0,
    };
  });
}

// ✅ Get ONE post
export async function getPostBySlug(slugName: string) {
  const fullPath = path.join(postsDirectory, `${slugName}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContent);
  const readingTime = getReadingTime(content);

  const toc = extractTOC(content);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeCodeTitles)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(content);

  // 👇 fetch views
  const websiteId = process.env.UMAMI_PORTFOLIO_WEBSITE_ID!;
  const viewsMap = await getPageViewsByUrl(
    websiteId,
    0,
    Date.now()
  );

  const views = viewsMap[`/blog/${slugName}`] || 0;

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
    views, // 👈 ADD THIS
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
