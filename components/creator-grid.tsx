import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Creator } from "@/lib/types";

interface CreatorGridProps {
  creators: Creator[];
}

export function CreatorGrid({ creators }: CreatorGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {creators.map((creator) => (
        <Link key={creator.slug} href={`/creators/${creator.slug}`}>
          <Card className="group h-full p-4 sm:p-6 hover:shadow-lg transition-all hover:-translate-y-1 hover:bg-accent/5">
            <div className="flex items-start gap-3 sm:gap-4">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                <img 
                  src={creator.logoUrl} 
                  alt={`${creator.name} - ${creator.categories.join(', ')} Content Creator`}
                  loading="lazy"
                />
              </Avatar>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                  {creator.name}
                </h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {creator.description || `${creator.name} is a content creator focusing on ${creator.categories[0]}`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {creator.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs group-hover:bg-accent/20 transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium">
                {creator.subscriberCount} subscribers
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: creator.complexity }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/60 group-hover:bg-primary rounded-full transition-colors"
                  />
                ))}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}