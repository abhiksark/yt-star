import { Metadata, Viewport } from "next";
import { categories, getCreators } from "@/lib/data";
import { CategoryHeader } from "@/components/category-header";
import { CategoryList } from "@/components/category-list";
import { Shell } from "@/components/shell";
import { getCanonicalUrl } from "@/lib/utils";
import { SEO_CONSTANTS } from "@/lib/types/seo";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const title = "Tech Tutorial Categories - Programming & Development Topics";
const description = "Browse expert tech tutorials by category. Find top educators in System Design, Frontend, Backend, DevOps, Machine Learning, and more. Curated list of the best programming tutorial channels.";
const url = getCanonicalUrl('categories', true);

function generateCategoriesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Tech Tutorial Categories",
    "description": description,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Thing",
          "name": category.name,
          "description": `Find the best ${category.name} tutorial creators and educational content`,
          "url": getCanonicalUrl(`categories/${category.slug}`, true)
        }
      }))
    }
  };
}

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "tech tutorials",
    "programming education",
    "coding tutorials",
    "software development learning",
    "tech education categories",
    ...categories.map(cat => `${cat.name.toLowerCase()} tutorials`),
    ...categories.map(cat => `learn ${cat.name.toLowerCase()}`),
    "developer education",
    "programming courses",
    "tech learning paths"
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: SEO_CONSTANTS.SITE_NAME,
    locale: SEO_CONSTANTS.SOCIAL.LOCALE,
    images: [
      {
        url: getCanonicalUrl('og/categories.png'),
        width: 1200,
        height: 630,
        alt: 'Tech Tutorial Categories',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [getCanonicalUrl('og/categories.png')],
    creator: SEO_CONSTANTS.SOCIAL.TWITTER_HANDLE,
    site: SEO_CONSTANTS.SOCIAL.TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function CategoriesPage() {
  const creators = await getCreators();

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCategoriesSchema())
        }}
      />
      <div className="space-y-8">
        <CategoryHeader />
        <CategoryList categories={categories} creators={creators} />
      </div>
    </Shell>
  );
}