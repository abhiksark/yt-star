"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (search: string) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory,
  onCategoryChange,
  onSearchChange 
}: CategoryFilterProps) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 max-w-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className={cn(
            "cursor-pointer hover:bg-primary/90 transition-colors",
            selectedCategory === null && "bg-primary"
          )}
          onClick={() => onCategoryChange(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.slug}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            className={cn(
              "cursor-pointer hover:bg-primary/90 transition-colors",
              selectedCategory === category.slug && "bg-primary"
            )}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}