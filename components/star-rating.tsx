import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4 transition-colors",
            i < rating 
              ? "fill-primary text-primary" 
              : "fill-muted/10 text-muted"
          )}
        />
      ))}
    </div>
  );
}