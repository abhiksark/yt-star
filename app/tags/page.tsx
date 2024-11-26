import { channelsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function TagsPage() {
  // Get all unique tags and their counts
  const tagCounts = channelsData.reduce((acc, creator) => {
    creator.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort tags by count
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Browse by Tags</h1>
        <p className="text-muted-foreground text-lg">
          Discover content creators by their areas of expertise and topics they cover.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
            <Badge
              variant="secondary"
              className="px-3 py-1 text-base hover:bg-secondary/80 cursor-pointer"
            >
              {tag} ({count})
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}