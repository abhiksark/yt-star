"use client";

import { useState, useEffect } from "react";
import { CreatorGrid } from "./creator-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Creator } from "@/lib/types";

interface Category {
  name: string;
  slug: string;
}

interface CategoryGridProps {
  categories: Category[];
  creators: Creator[];
}

export function CategoryGrid({ categories, creators }: CategoryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(creators);

  useEffect(() => {
    const filtered = selectedCategory
      ? creators.filter(
          creator => creator.categories.some(category => 
            category.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        )
      : creators;
    setFilteredCreators(filtered);
  }, [selectedCategory, creators]);

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue=""
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent justify-start">
          <TabsTrigger
            value=""
            className={cn(
              "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
              "px-4 py-2"
            )}
          >
            All
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.slug}
              value={category.slug}
              className={cn(
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "px-4 py-2"
              )}
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="">
          <div className="grid gap-6">
            <CreatorGrid creators={filteredCreators} />
            {filteredCreators.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No creators found.
              </p>
            )}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.slug} value={category.slug}>
            <div className="grid gap-6">
              <CreatorGrid creators={filteredCreators} />
              {filteredCreators.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No creators found in this category yet.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}