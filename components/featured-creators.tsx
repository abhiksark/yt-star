import { getCreators } from "@/lib/data";
import { CreatorGrid } from "@/components/creator-grid";

export async function FeaturedCreators() {
  const creators = await getCreators();
  const featuredCreators = creators.slice(0, 3);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
      <CreatorGrid creators={featuredCreators} />
    </section>
  );
}