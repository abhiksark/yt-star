"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import type { Creator } from "@/lib/types";

interface SimilarCreatorsProps {
  currentCreator: Creator;
  allCreators: Creator[];
}

export function SimilarCreators({ currentCreator, allCreators }: SimilarCreatorsProps) {
  // Find creators with similar tags or category
  const similarCreators = allCreators
    .filter((creator) => {
      if (creator.id === currentCreator.id) return false;
      
      // Check for shared tags
      const sharedTags = creator.tags.filter(tag => 
        currentCreator.tags.includes(tag)
      );
      
      // Calculate similarity score based on shared tags and same category
      const tagScore = sharedTags.length;
      const categoryScore = creator.category === currentCreator.category ? 2 : 0;
      
      return (tagScore + categoryScore) > 1; // Require at least 2 similarities
    })
    .slice(0, 3); // Show top 3 similar creators

  if (similarCreators.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Similar Creators</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarCreators.map((creator) => (
          <Link key={creator.slug} href={`/creators/${creator.slug}`}>
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 group">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  <img src={creator.logoUrl} alt={creator.name} />
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {creator.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{creator.subscriberCount}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {creator.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs group-hover:bg-accent/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}