import { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";
import { FeaturedPosts } from "@/components/blog/featured-posts";
import { PostGrid } from "@/components/blog/post-grid";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Tech Education Content Creators - Expert Tutorials & Reviews",
  description: "Discover top tech education content creators, expert tutorials, and in-depth reviews. Learn programming, system design, and web development from industry experts.",
  keywords: ["tech education", "programming tutorials", "content creators", "coding education", "tech tutorials"],
  openGraph: {
    title: "Tech Education Content Creators Hub",
    description: "Find the best tech education content creators and tutorials",
    type: "website",
    url: "https://bestyoutubechannels.com/blog",
  },
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