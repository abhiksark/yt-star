import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { cn } from "@/lib/utils";
import type { Creator } from "@/lib/types";

interface CreatorGridProps {
  creators: Creator[];
  emptyMessage?: string;
}

export function CreatorGrid({ creators, emptyMessage = "No creators found." }: CreatorGridProps) {
  if (!creators.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {creators.map((creator, index) => (
        <Link key={creator.slug} href={`/creators/${creator.slug}`}>
          <Card 
            className={cn(
              "h-full hover:shadow-lg transition-all duration-300 overflow-hidden group",
              "hover:scale-[1.02] hover:-translate-y-1"
            )}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 rounded-xl ring-2 ring-border group-hover:ring-primary transition-colors">
                    <img src={creator.logoUrl || ''} alt={creator.name} className="object-cover" />
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg leading-none group-hover:text-primary transition-colors">
                      {creator.name}
                    </h3>
                    {creator.country && (
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/${creator.country.toLowerCase()}.svg`}
                          alt={`${creator.country} flag`}
                          className="w-4 h-4 rounded-sm"
                          loading="lazy"
                        />
                        <span className="text-sm text-muted-foreground">
                          {creator.country}
                        </span>
                      </div>
                    )}
                    <StarRating rating={creator.rating || 0} className="scale-90" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80 transition-colors">
                {creator.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {creator.categories.slice(0, 3).map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary" 
                    className="text-xs group-hover:bg-primary/10 transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
                {creator.categories.length > 3 && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs group-hover:bg-primary/10 transition-colors"
                  >
                    +{creator.categories.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}