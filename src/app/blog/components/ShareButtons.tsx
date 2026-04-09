"use client";

import { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
} from "lucide-react";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  return (
    <div className="mt-10 pt-6 border-t border-white/5">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">
        Share this post
      </h3>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-blue-500 cursor-pointer rounded-lg text-sm transition"
        >
          {copied ? <Check size={16} /> : <LinkIcon size={16} />}
          {copied ? "Copied" : "Copy link"}
        </button>

        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          className="p-2 bg-white/5 hover:bg-blue-500 rounded-lg transition"
        >
          <Twitter size={16} />
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          className="p-2 bg-white/5 hover:bg-blue-500 rounded-lg transition"
        >
          <Linkedin size={16} />
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          className="p-2 bg-white/5 hover:bg-blue-500 rounded-lg transition"
        >
          <Facebook size={16} />
        </a>
      </div>
    </div>
  );
}