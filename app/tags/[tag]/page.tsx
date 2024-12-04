import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreatorGrid } from "@/components/creator-grid";
import { channelsData } from "@/lib/data";
import { TagHeader } from "@/components/tag-header";
import { Suspense } from "react";
import { CreatorGridSkeleton } from "@/components/skeletons";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const creatorsCount = channelsData.filter(creator => 
    creator.categories.some(t => t.toLowerCase() === tag.toLowerCase())
  ).length;

  return {
    title: `${tag} Content Creators - Learn ${tag}`,
    description: `Discover ${creatorsCount} content creators teaching ${tag}. Find the best ${tag} tutorials, courses, and educational content.`,
    openGraph: {
      title: `${tag} Content Creators and Tutorials`,
      description: `Learn ${tag} from ${creatorsCount} expert content creators. Find comprehensive tutorials and educational content.`,
    },
  };
}

export function generateStaticParams() {
  const tags = new Set(channelsData.flatMap(creator => creator.categories));
  return Array.from(tags).map(tag => ({
    tag: tag.toLowerCase(),
  }));
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const creators = channelsData.filter(creator => 
    creator.categories.some(t => t.toLowerCase() === tag.toLowerCase())
  );

  if (creators.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <TagHeader tag={tag} count={creators.length} />
      <Suspense fallback={<CreatorGridSkeleton />}>
        <CreatorGrid creators={creators} />
      </Suspense>
    </div>
  );
}