import { channelsData } from "@/lib/data";
import { CreatorGrid } from "@/components/creator-grid";

export function FeaturedCreators() {
  const featuredCreators = channelsData.slice(0, 3);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
      <CreatorGrid creators={featuredCreators} />
    </section>
  );
}