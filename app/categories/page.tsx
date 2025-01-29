import { Metadata, Viewport } from "next";
import { categories, getCreators } from "@/lib/data";
import { CategoryHeader } from "@/components/category-header";
import { CategoryList } from "@/components/category-list";
import { Shell } from "@/components/shell";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Browse Categories - Tech Content Creators",
  description: "Explore tech content creators by category. Find experts in system design, frontend, backend, and more.",
  keywords: "tech content creators, programming tutorials, coding education, tech influencers",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/categories",
  },
};

export default async function CategoriesPage() {
  const creators = await getCreators();

  return (
    <Shell>
      <div className="space-y-8">
        <CategoryHeader />
        <CategoryList categories={categories} creators={creators} />
      </div>
    </Shell>
  );
}