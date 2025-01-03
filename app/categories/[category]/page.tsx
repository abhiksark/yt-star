import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCreators } from "@/lib/data";
import { CreatorGrid } from "@/components/creator-grid";
import { CategoryHeader } from "@/components/category-header";
import { Suspense } from "react";
import { CreatorGridSkeleton } from "@/components/skeletons";
import type { Category, Creator } from "@/lib/types";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find(c => c.slug === params.category);
  const creators = await getCreators();
  
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  const filteredCreators = creators.filter(creator => 
    creator.categories.some(c => c.toLowerCase().includes(category.name.toLowerCase()))
  );

  return {
    title: `${category.name} YouTube Channels - Learn ${category.name}`,
    description: `Discover ${filteredCreators.length} expert ${category.name} content creators. Learn from the best ${category.name.toLowerCase()} tutorials and educational content.`,
    keywords: [
      `${category.name.toLowerCase()} tutorials`,
      `learn ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} youtube channels`,
      `${category.name.toLowerCase()} education`,
      'tech tutorials',
      'programming education'
    ],
    openGraph: {
      title: `Best ${category.name} YouTube Channels`,
      description: `Learn ${category.name} from ${filteredCreators.length} expert content creators`,
    },
    alternates: {
      canonical: `/categories/${params.category}`,
    },
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.category);
  const creators = await getCreators();
  
  if (!category) {
    notFound();
  }

  const filteredCreators = creators.filter(creator => 
    creator.categories.some(c => c.toLowerCase().includes(category.name.toLowerCase()))
  ) as Creator[];

  return (
    <div className="space-y-8">
      <CategoryHeader category={category as Category} count={filteredCreators.length} />
      <Suspense fallback={<CreatorGridSkeleton />}>
        <CreatorGrid creators={filteredCreators} />
      </Suspense>
    </div>
  );
}