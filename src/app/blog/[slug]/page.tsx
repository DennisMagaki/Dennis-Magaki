import { getPostBySlug } from "@/lib/posts";
import Image from "next/image";
import { Calendar, User, Clock } from "lucide-react";
import ShareButtons from "../components/ShareButtons";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const url = `${baseUrl}/blog/${slug}`;
  const image = post.image || `${baseUrl}/placeholder-image.jpg`;

  return {
    title: post.title,
    description:
      post.description || "Read this blog post on our website.",

    openGraph: {
      title: post.title,
      description:
        post.description || "Read this blog post on our website.",
      url,
      siteName: "Your Site Name",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.description || "Read this blog post on our website.",
      images: [image],
    },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const placeholderImage = "/placeholder-image.jpg";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postUrl = `${baseUrl}/blog/${slug}`;

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20 text-white font-montserrat">
      {/* MOBILE TOC (TOP) */}
      {post.toc.length > 0 && (
        <div className="lg:hidden mb-6">
          <details className="bg-white/5 rounded-xl border border-gray-800 p-4">
            <summary className="cursor-pointer font-semibold text-sm">
              Table of Contents
            </summary>
            <ul className="mt-3 space-y-2 text-sm">
              {post.toc.map((item, i) => (
                <li key={i} style={{ paddingLeft: (item.level - 1) * 12 }}>
                  <a
                    href={`#${item.slug}`}
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* MAIN CONTENT */}
        <article className="flex-1 max-w-3xl lg:max-w-5xl mx-auto w-full">
          {/* HERO */}
          <div className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] mb-8 md:mb-10 overflow-hidden rounded-2xl shadow-2xl group">
            <Image
              src={post.image || placeholderImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Hero Content */}
            <div className="absolute bottom-0 p-5 sm:p-6 md:p-10">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3 md:mb-4 max-w-3xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs sm:text-sm text-gray-300">
                {post.author && (
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                )}

                {formattedDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <time dateTime={post.date}>{formattedDate}</time>
                  </div>
                )}

                {post.readingTime && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ARTICLE */}
          <ShareButtons url={postUrl} title={post.title} /><br />
          <div
            className="markdown-content prose prose-invert max-w-none
                       prose-img:rounded-xl prose-pre:overflow-x-auto
                       prose-headings:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        {/* DESKTOP TOC */}
        {post.toc.length > 0 && (
          <aside className="hidden lg:block w-72 xl:w-80">
            <div className="sticky top-24">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-gray-800 p-5 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                  Table of Contents
                </h3>

                <ul className="space-y-2 text-sm">
                  {post.toc.map((item, i) => (
                    <li
                      key={i}
                      style={{ paddingLeft: (item.level - 1) * 16 }}
                      className="border-l border-gray-700 hover:border-blue-500 transition-colors"
                    >
                      <a
                        href={`#${item.slug}`}
                        className="block py-1 pl-3 text-gray-400 hover:text-blue-400 transition hover:translate-x-1"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
