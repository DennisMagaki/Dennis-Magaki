
import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";

export default function Page() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} />;
}