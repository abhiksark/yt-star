"use client";

import { getFeaturedCreators } from "@/lib/supabase/featured-creators";
import { CreatorGrid } from "@/components/creator-grid";
import { CreatorGridSkeleton } from "@/components/skeletons";
import { Suspense, useEffect, useState } from "react";
import type { Creator } from "@/lib/types";

function FeaturedCreatorsContent() {
  const [creators, setCreators] = useState<Creator[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCreators() {
      const { data, error } = await getFeaturedCreators();
      if (error) {
        setError(error);
      } else {
        setCreators(data);
      }
    }
    loadCreators();
  }, []);

  if (error) {
    console.error('Error fetching featured creators:', error);
    return null;
  }

  if (!creators || creators.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
      <CreatorGrid creators={creators} />
    </section>
  );
}

export function FeaturedCreators() {
  return (
    <Suspense fallback={<CreatorGridSkeleton />}>
      <FeaturedCreatorsContent />
    </Suspense>
  );
}