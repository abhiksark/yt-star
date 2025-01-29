import { getCreators } from "@/lib/data";
import { CreatorGrid } from "@/components/creator-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export async function TrendingCreators() {
  const creators = await getCreators();
  
  // Sort creators by recent growth and engagement
  // This would typically use actual trending metrics from your database
  const trendingCreators = creators
    .sort((a, b) => {
      const aSubscribers = parseInt(a.subscriberCount.replace(/,/g, ''));
      const bSubscribers = parseInt(b.subscriberCount.replace(/,/g, ''));
      return bSubscribers - aSubscribers;
    })
    .slice(0, 3);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-2xl font-bold">Trending Tech Educators</h3>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/creators" className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
      <CreatorGrid creators={trendingCreators} />
    </section>
  );
}