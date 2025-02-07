import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { categories, getCreators } from "@/lib/data";
import { CategoryHeader } from "@/components/category-header";
import { CreatorList } from "@/components/creator-list";
import { Shell } from "@/components/shell";
import { getCanonicalUrl } from "@/lib/utils";
import { SEO_CONSTANTS } from "@/lib/types/seo";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

function generateCategorySchema(categoryName: string, categorySlug: string, creatorCount: number) {
  const url = getCanonicalUrl(`categories/${categorySlug}`, true);
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} Tutorial Creators`,
    "description": `Discover the top ${creatorCount} ${categoryName.toLowerCase()} tutorial creators and educators. Find expert-led content for learning ${categoryName.toLowerCase()} programming and development.`,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": creatorCount,
      "itemListElement": {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Thing",
          "name": categoryName,
          "description": `Best ${categoryName.toLowerCase()} tutorial creators and educational content`,
        }
      }
    }
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) return {};

  const creators = await getCreators();
  const categoryCreators = creators.filter((creator) =>
    creator.categories.includes(category.slug)
  );

  const title = `${category.name} Tutorial Creators - Top ${categoryCreators.length} ${category.name} Educators`;
  const description = `Find the best ${category.name} tutorial creators. Learn from ${categoryCreators.length} expert educators in ${category.name.toLowerCase()} programming and development. Curated list of top ${category.name.toLowerCase()} channels.`;
  const url = getCanonicalUrl(`categories/${category.slug}`, true);

  return {
    title,
    description,
    keywords: [
      `${category.name.toLowerCase()} tutorials`,
      `${category.name.toLowerCase()} courses`,
      `learn ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} education`,
      `${category.name.toLowerCase()} programming`,
      `${category.name.toLowerCase()} development`,
      `best ${category.name.toLowerCase()} creators`,
      `top ${category.name.toLowerCase()} educators`,
      `${category.name.toLowerCase()} learning resources`,
      `${category.name.toLowerCase()} video tutorials`
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
          url: getCanonicalUrl(`og/categories/${category.slug}.png`),
          width: 1200,
          height: 630,
          alt: `${category.name} Tutorial Creators`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getCanonicalUrl(`og/categories/${category.slug}.png`)],
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
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const creators = await getCreators();
  const categoryCreators = creators.filter((creator) =>
    creator.categories.includes(category.slug)
  );

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCategorySchema(category.name, category.slug, categoryCreators.length))
        }}
      />
      <div className="space-y-8">
        <CategoryHeader category={category} />
        <CreatorList creators={categoryCreators} />
      </div>
    </Shell>
  );
}