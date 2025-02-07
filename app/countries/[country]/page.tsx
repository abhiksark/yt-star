import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCreators } from "@/lib/data";
import { CreatorGrid } from "@/components/creator-grid";
import { CountryHeader } from "@/components/country-header";
import { Shell } from "@/components/shell";
import { Suspense } from "react";
import { CreatorGridSkeleton } from "@/components/skeletons";
import { getCountryFromSlug, getCountryName, getCountrySlug, isValidCountryCode } from "@/lib/countries";
import { getCanonicalUrl } from "@/lib/utils";
import { SEO_CONSTANTS } from "@/lib/types/seo";

interface CountryPageProps {
  params: {
    country: string;
  };
}

function generateCountrySchema(countryName: string, url: string, creatorCount: number, creators: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${countryName} Tech Content Creators`,
    "description": `Top ${creatorCount} tech content creators and programming educators from ${countryName}`,
    "url": url,
    "numberOfItems": creatorCount,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": creatorCount,
      "itemListOrder": "Descending",
      "itemListElement": creators.map((creator, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": creator.name,
          "description": creator.description,
          "url": getCanonicalUrl(`creators/${creator.slug}`, true),
          "image": creator.logoUrl,
          "jobTitle": "Tech Content Creator",
          "worksFor": {
            "@type": "Organization",
            "name": "YouTube",
            "url": "https://www.youtube.com"
          }
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": getCanonicalUrl()
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Countries",
          "item": getCanonicalUrl("countries", true)
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${countryName} Creators`,
          "item": url
        }
      ]
    }
  };
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const countryCode = getCountryFromSlug(params.country);
  if (!countryCode || !isValidCountryCode(countryCode)) {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    };
  }

  const countryName = getCountryName(countryCode);
  const creators = await getCreators();
  const countryCreators = creators.filter(creator => 
    creator.country && creator.country.toUpperCase() === countryCode.toUpperCase()
  );

  const creatorCount = countryCreators.length;
  const categories = Array.from(new Set(countryCreators.flatMap(c => c.categories))).slice(0, 5);
  const topCreators = countryCreators.sort((a, b) => (b.subscriberCount || 0) - (a.subscriberCount || 0)).slice(0, 3);
  const totalSubscribers = countryCreators.reduce((sum, c) => sum + (c.subscriberCount || 0), 0);
  const avgRating = countryCreators.reduce((sum, c) => sum + (c.rating || 0), 0) / creatorCount;

  const title = `Best ${countryName} Tech YouTubers and Programming Educators (${new Date().getFullYear()})`;
  const description = `Discover ${creatorCount} top tech content creators from ${countryName}. Learn ${categories.join(', ')} from expert instructors like ${topCreators.map(c => c.name).join(', ')}. Join ${totalSubscribers.toLocaleString()} learners worldwide.`;
  const url = getCanonicalUrl(`countries/${params.country}`, true);

  const schema = generateCountrySchema(countryName, url, creatorCount, countryCreators);

  return {
    title,
    description,
    keywords: [
      `${countryName} tech youtubers`,
      `${countryName} programming tutorials`,
      `${countryName} coding educators`,
      `${countryName} software development`,
      `learn programming ${countryName}`,
      `${countryName} tech education`,
      ...categories.map(cat => `${cat} tutorials ${countryName}`),
      'tech content creators',
      'programming education',
      'local tech experts',
    ],
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
      },
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
          url: getCanonicalUrl('og/countries.png'),
          width: 1200,
          height: 630,
          alt: `${countryName} Tech Content Creators`,
        }
      ],
      countryName: countryName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getCanonicalUrl('og/countries.png')],
      creator: SEO_CONSTANTS.SOCIAL.TWITTER_HANDLE,
      site: SEO_CONSTANTS.SOCIAL.TWITTER_HANDLE,
    },
    other: {
      'country-code': countryCode,
      'content-language': 'en',
      'geo.region': countryCode,
      'geo.placename': countryName,
      'rating:value': avgRating.toFixed(1),
      'rating:count': creatorCount.toString(),
      'og:country-name': countryName,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    authors: countryCreators.slice(0, 5).map(creator => ({ 
      name: creator.name,
      url: getCanonicalUrl(`creators/${creator.slug}`, true),
    })),
    category: 'Technology',
    applicationName: SEO_CONSTANTS.SITE_NAME,
  };
}

export async function generateStaticParams() {
  const creators = await getCreators();
  const countries = Array.from(
    new Set(
      creators
        .filter(creator => creator.country && isValidCountryCode(creator.country))
        .map(creator => creator.country.toUpperCase())
    )
  );
  
  return countries.map((countryCode) => ({
    country: getCountrySlug(countryCode),
  }));
}

export default async function CountryPage({ params }: CountryPageProps) {
  const countryCode = getCountryFromSlug(params.country);
  if (!countryCode || !isValidCountryCode(countryCode)) {
    notFound();
  }

  const countryName = getCountryName(countryCode);
  const creators = await getCreators();
  const countryCreators = creators.filter(creator => 
    creator.country && creator.country.toUpperCase() === countryCode.toUpperCase()
  );

  if (countryCreators.length === 0) {
    notFound();
  }

  const url = getCanonicalUrl(`countries/${params.country}`, true);
  const schema = generateCountrySchema(countryName, url, countryCreators.length, countryCreators);

  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      <div className="space-y-8">
        <CountryHeader 
          country={countryName} 
          count={countryCreators.length} 
          countryCode={countryCode}
        />
        <Suspense 
          fallback={
            <div className="space-y-8">
              <CreatorGridSkeleton />
              <p className="text-center text-muted-foreground">
                Loading {countryName} content creators...
              </p>
            </div>
          }
        >
          <CreatorGrid 
            creators={countryCreators} 
            emptyMessage={`No content creators found from ${countryName} yet.`}
          />
        </Suspense>
      </div>
    </Shell>
  );
}