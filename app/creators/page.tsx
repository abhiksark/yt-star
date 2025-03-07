import { Metadata } from "next";
import { Shell } from "@/components/shell";
import { getCreators } from "@/lib/data";
import { PaginatedCreatorGrid } from "@/components/paginated-creator-grid";
import { getCanonicalUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
      <div className="relative">
        {/* Decorative blobs */}
        <div className="absolute -z-10 top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        
        <div className="space-y-12">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Tech Content Creators
            </h1>
            <h2 className="text-xl text-muted-foreground">
              Browse {creators.length} expert educators in programming, system design, and web development.
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-8" />
          </div>

          <div>
            <PaginatedCreatorGrid creators={creators} />
          </div>
        </div>
      </div>
    </Shell>
  );
}