import { Metadata } from "next";
import { categories, channelsData } from "@/lib/data";
import { CategoryHeader } from "@/components/category-header";
import { CategoryGrid } from "@/components/category-grid";
import { CategoryFilter } from "@/components/category-filter";
import { Suspense } from "react";
import { CategoryGridSkeleton } from "@/components/skeletons";

export const metadata: Metadata = {
  title: "Browse Categories - Tech Content Creators",
  description: "Explore tech content creators by category. Find experts in system design, frontend, backend, and more.",
};

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <CategoryHeader />
      <CategoryFilter categories={categories} />
      <Suspense fallback={<CategoryGridSkeleton />}>
        <CategoryGrid categories={categories} creators={channelsData} />
      </Suspense>
    </div>
  );
}