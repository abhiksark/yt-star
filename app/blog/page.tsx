import { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";
import { FeaturedPosts } from "@/components/blog/featured-posts";
import { PostGrid } from "@/components/blog/post-grid";
import { Shell } from "@/components/shell";
import { getCanonicalUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tech Education Content Creators - Expert Tutorials & Reviews",
  description: "Discover top tech education content creators, expert tutorials, and in-depth reviews. Learn programming, system design, and web development from industry experts.",
  keywords: ["tech education", "programming tutorials", "content creators", "coding education", "tech tutorials"],
  alternates: {
    canonical: getCanonicalUrl('blog'),
  },
  openGraph: {
    title: "Tech Education Content Creators Hub",
    description: "Find the best tech education content creators and tutorials",
    type: "website",
    url: getCanonicalUrl('blog'),
    siteName: "BestYoutubeChannels",
    locale: "en_US",
    images: [
      {
        url: getCanonicalUrl("og/blog.png"),
        width: 1200,
        height: 630,
        alt: "Tech Education Content Creators Hub",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Education Content Creators Hub",
    description: "Find the best tech education content creators and tutorials",
    images: [getCanonicalUrl("og/blog.png")],
    creator: "@bestyoutubechannels",
    site: "@bestyoutubechannels",
  }
};

export default function BlogPage() {
  return (
    <Shell>
      <div className="space-y-10">
        <BlogHeader />
        <FeaturedPosts />
        <PostGrid />
      </div>
    </Shell>
  );
}