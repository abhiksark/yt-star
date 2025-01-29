import { useEffect, useRef, useState } from "react";
import { CreatorGrid } from "./creator-grid";
import type { Creator } from "@/lib/types";

interface InfiniteScrollGridProps {
  initialCreators: Creator[];
  pageSize?: number;
}

export function InfiniteScrollGrid({ 
  initialCreators, 
  pageSize = 12 
}: InfiniteScrollGridProps) {
  const [creators, setCreators] = useState(initialCreators.slice(0, pageSize));
  const [hasMore, setHasMore] = useState(initialCreators.length > pageSize);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          const nextCreators = initialCreators.slice(
            creators.length,
            creators.length + pageSize
          );
          setCreators((prev) => [...prev, ...nextCreators]);
          setHasMore(creators.length + nextCreators.length < initialCreators.length);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [creators, hasMore, initialCreators, pageSize]);

  return (
    <div className="space-y-8">
      <CreatorGrid creators={creators} />
      {hasMore && (
        <div
          ref={loaderRef}
          className="flex justify-center p-4"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-48 bg-muted rounded" />
          </div>
        </div>
      )}
    </div>
  );
}