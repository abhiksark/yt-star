"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CategoryFilterProps {
  categories: {
    name: string;
    slug: string;
  }[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10 max-w-sm"
      />
    </div>
  );
}