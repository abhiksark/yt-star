import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCreators } from "@/lib/data";
import { CreatorGrid } from "@/components/creator-grid";
import { CategoryHeader } from "@/components/category-header";
import { Shell } from "@/components/shell";
import { Suspense } from "react";
import { CreatorGridSkeleton } from "@/components/skeletons";
import type { Category, Creator } from "@/lib/types";
import { getCanonicalUrl } from "@/lib/utils";

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

  const title = `${category.name} YouTube Channels - Learn ${category.name}`;
  const description = `Discover ${filteredCreators.length} expert ${category.name} content creators. Learn from the best ${category.name.toLowerCase()} tutorials and educational content.`;
  const url = getCanonicalUrl(`categories/${params.category}`);

  return {
    title,
    description,
    keywords: [
      `${category.name.toLowerCase()} tutorials`,
      `learn ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} youtube channels`,
      `${category.name.toLowerCase()} education`,
      'tech tutorials',
      'programming education'
    ],
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'BestYoutubeChannels',
      locale: 'en_US',
      images: [
        {
          url: getCanonicalUrl('og/categories.png'),
          width: 1200,
          height: 630,
          alt: `${category.name} Tech Content Creators`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getCanonicalUrl('og/categories.png')],
      creator: '@bestyoutubechannels',
      site: '@bestyoutubechannels',
    },
    alternates: {
      canonical: url,
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
    <Shell>
      <div className="space-y-8">
        <CategoryHeader category={category as Category} count={filteredCreators.length} />
        <Suspense fallback={<CreatorGridSkeleton />}>
          <CreatorGrid creators={filteredCreators} />
        </Suspense>
      </div>
    </Shell>
  );
}