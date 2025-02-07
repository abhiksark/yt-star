import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCreators } from "@/lib/data";
import { Shell } from "@/components/shell";
import { CreatorGrid } from "@/components/creator-grid";
import { getCanonicalUrl } from "@/lib/utils";
import { SEO_CONSTANTS } from "@/lib/types/seo";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

function generateCategorySchema(categoryName: string, categorySlug: string, creatorCount: number) {
  const url = getCanonicalUrl(`categories/${categorySlug}`);
  
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
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  const creators = await getCreators();
  const categoryCreators = creators.filter((creator) =>
    creator.categories.includes(category.slug)
  );

  const title = `${category.name} Tutorial Creators - Top ${categoryCreators.length} ${category.name} Educators`;
  const description = `Find the best ${category.name} tutorial creators. Learn from ${categoryCreators.length} expert educators in ${category.name.toLowerCase()} programming and development. Curated list of top ${category.name.toLowerCase()} channels.`;
  const url = getCanonicalUrl(`categories/${category.slug}`);

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

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);
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
        <div className="relative space-y-6 pb-8">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 -z-10 animate-gradient bg-[size:200%_200%] bg-[linear-gradient(45deg,var(--primary)/10,var(--accent)/10,var(--secondary)/10,var(--primary)/10)]" />

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight animate-title opacity-0" style={{ animationDelay: '200ms' }}>
              {category.name} Creators
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl animate-fade-up opacity-0" style={{ animationDelay: '400ms' }}>
              {categoryCreators.length} expert {category.name.toLowerCase()} educators sharing their knowledge and experience.
            </p>
          </div>
        </div>

        <div className="animate-fade-up opacity-0" style={{ animationDelay: '600ms' }}>
          <CreatorGrid 
            creators={categoryCreators} 
            emptyMessage={`No ${category.name.toLowerCase()} content creators found yet.`}
          />
        </div>
      </div>
    </Shell>
  );
} 