import { getCreators } from "@/lib/data";
import { CreatorGrid } from "@/components/creator-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Users } from "lucide-react";
import Link from "next/link";

export async function FeaturedCreators() {
  const creators = await getCreators();
  const featuredCreators = creators
    .sort((a, b) => {
      const aRating = a.rating || 0;
      const bRating = b.rating || 0;
      return bRating - aRating;
    })
    .slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Featured Content Creators</h3>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Hand-picked educators known for their exceptional teaching quality, comprehensive content, and proven track record in helping developers succeed.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/creators" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary shrink-0" />
            <span>Highest-rated educational content</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary shrink-0" />
            <span>Active community engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary shrink-0" />
            <span>Industry-recognized expertise</span>
          </div>
        </div>
      </div>

      <CreatorGrid creators={featuredCreators} />

      <div className="bg-muted/50 rounded-lg p-6 mt-6">
        <h4 className="font-semibold mb-2">Why These Creators?</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Consistently high-quality educational content</li>
          <li>• Clear and structured teaching methodology</li>
          <li>• Regular content updates with latest tech trends</li>
          <li>• Strong focus on practical, real-world applications</li>
          <li>• Positive community feedback and success stories</li>
        </ul>
      </div>
    </section>
  );
}