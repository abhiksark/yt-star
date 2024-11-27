import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell } from "@/components/shell";
import { PostHeader } from "@/components/blog/post-header";
import { PostContent } from "@/components/blog/post-content";
import { PostSidebar } from "@/components/blog/post-sidebar";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - Tech Creators Spotlight`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Shell>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PostHeader post={post} />
          <PostContent content={post.content} />
        </div>
        <aside className="space-y-6">
          <PostSidebar post={post} />
        </aside>
      </article>
    </Shell>
  );
}