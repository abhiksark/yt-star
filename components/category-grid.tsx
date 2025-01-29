"use client";

import { useEffect, useState } from "react";
import { CreatorGrid } from "./creator-grid";
import type { Creator, Category } from "@/lib/types";

interface CategoryGridProps {
  categories: Category[];
  creators: Creator[];
  selectedCategory: string | null;
  searchQuery: string;
}

export function CategoryGrid({ 
  categories, 
  creators, 
  selectedCategory,
  searchQuery 
}: CategoryGridProps) {
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(creators);

  useEffect(() => {
    let filtered = creators;

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(creator =>
        creator.categories.some(category =>
          category.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(query) ||
        creator.description?.toLowerCase().includes(query) ||
        creator.categories.some(category =>
          category.toLowerCase().includes(query)
        )
      );
    }

    setFilteredCreators(filtered);
  }, [selectedCategory, searchQuery, creators]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <CreatorGrid creators={filteredCreators} />
        {filteredCreators.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No creators found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}