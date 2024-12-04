import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";

interface CategoryHeaderProps {
  category?: Category;
  count?: number;
}

export function CategoryHeader({ category, count }: CategoryHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">
        {category ? category.name : 'Browse Categories'}
      </h1>
      {category && count !== undefined && (
        <p className="text-muted-foreground text-lg max-w-3xl">
          Discover {count} expert {category.name.toLowerCase()} content {count === 1 ? 'creator' : 'creators'}. 
          Find comprehensive tutorials and educational content to accelerate your learning journey.
        </p>
      )}
      {!category && (
        <p className="text-muted-foreground text-lg max-w-3xl">
          Explore our curated categories of tech content creators. Find experts in your area of interest.
        </p>
      )}
    </div>
  );
}