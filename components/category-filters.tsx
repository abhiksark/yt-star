"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { CategoryGrid } from "@/components/category-grid";
import type { Category, Creator } from "@/lib/types";

interface CategoryFiltersProps {
  categories: Category[];
  creators: Creator[];
}

export function CategoryFilters({ categories, creators }: CategoryFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />
      <CategoryGrid 
        categories={categories} 
        creators={creators}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </>
  );
}