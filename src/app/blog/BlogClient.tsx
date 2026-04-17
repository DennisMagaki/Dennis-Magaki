"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Post = {
  slug: string;
  title: string;
  date?: string;
  tags: string[];
  image?: string;
  author: string;
  views: number;
};

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  const placeholderImage = "/placeholder-image.jpg";

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-25 text-white font-montserrat bg-black">
      {/* HEADER */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Blogs</h1>
      </div>

      {/* MOBILE TAG FILTER (TOP) */}
      <div className="lg:hidden mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition ${
              selectedTag === null
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition ${
                selectedTag === tag
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* POSTS GRID */}
        <main className="flex-1">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-400 text-base sm:text-lg">
                No posts found with this tag.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="h-full flex flex-col group bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 cursor-pointer border border-gray-800 hover:border-gray-700">
                    {/* IMAGE */}
                    <div className="relative w-full h-44 sm:h-48 md:h-52 overflow-hidden bg-gray-800">
                      <Image
                        src={post.image || placeholderImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-3 group-hover:text-blue-500 transition">
                        {post.title}
                      </h2>
                      <div className="mt-auto">
                        {/* META */}
                        {post.date && (
                          <p className="text-xs sm:text-sm text-gray-400 mb-2">
                            {post.author} • {post.date} • {post.views} views
                          </p>
                        )}

                        {/* TAGS */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-white/10 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-56 border-l border-white/30 p-4">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              Filter by tags
            </h2>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                  selectedTag === null
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                    selectedTag === tag
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
