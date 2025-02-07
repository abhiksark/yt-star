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

function generateCountrySchema(countryName: string, url: string, creatorCount: number) {
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
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "WebPage",
            "name": `${countryName} Tech YouTubers`,
            "description": `Find the best tech content creators from ${countryName}`,
            "url": url
          }
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

  const title = `Best ${countryName} Tech YouTubers and Content Creators`;
  const description = `Find the top ${countryCreators.length} tech content creators and programming educators from ${countryName}. Learn software development, system design, and web development from expert ${countryName} instructors.`;
  const url = getCanonicalUrl(`countries/${params.country}`, true);

  const schema = generateCountrySchema(countryName, url, countryCreators.length);

  return {
    title,
    description,
    keywords: [
      `${countryName} tech youtubers`,
      `${countryName} programming teachers`,
      `${countryName} coding tutorials`,
      `${countryName} software development`,
      `${countryName} tech educators`,
      'local tech experts',
      'programming education',
      'tech tutorials',
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
          url: getCanonicalUrl('og/countries.png'),
          width: 1200,
          height: 630,
          alt: `${countryName} Tech Content Creators`,
        }
      ],
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
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    authors: [{ name: `${countryName} Tech Content Creators` }],
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
  const schema = generateCountrySchema(countryName, url, countryCreators.length);

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