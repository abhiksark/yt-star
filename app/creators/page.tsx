import { Metadata } from "next";
import { Shell } from "@/components/shell";
import { getCreators } from "@/lib/data";
import { PaginatedCreatorGrid } from "@/components/paginated-creator-grid";
import { getCanonicalUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Tech Content Creators - Programming & Development Educators",
  description: "Browse our complete list of tech content creators. Find expert educators in programming, system design, web development, and more.",
  keywords: [
    "tech content creators",
    "programming educators",
    "tech YouTubers",
    "coding tutorials",
    "software development teachers",
    "tech education",
  ],
  alternates: {
    canonical: getCanonicalUrl('creators'),
  },
};

export default async function CreatorsPage() {
  const creators = await getCreators();

  return (
    <Shell>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Tech Content Creators
          </h1>
          <h2 className="text-xl text-muted-foreground">
            Browse {creators.length} expert educators in programming, system design, and web development.
          </h2>
        </div>
        <PaginatedCreatorGrid creators={creators} />
      </div>
    </Shell>
  );
}