import { Metadata, Viewport } from "next";
import { getCreators } from "@/lib/data";
import { CountryHeader } from "@/components/country-header";
import { CountryList } from "@/components/country-list";
import { Shell } from "@/components/shell";
import { getCountryName, getCountrySlug, isValidCountryCode } from "@/lib/countries";
import { getCanonicalUrl, generateSEOMetadata } from "@/lib/utils";
import { generateWebsiteSchema } from "@/lib/schema";
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const creators = await getCreators();
  const validCreators = creators.filter(
    creator => creator.country && isValidCountryCode(creator.country)
  );

  const uniqueCountries = Array.from(
    new Set(
      validCreators.map(creator => creator.country.toUpperCase())
    )
  );

  return generateSEOMetadata({
    title: "Browse Tech Content Creators by Country - Global Tech Educators 2025",
    description: `Discover ${validCreators.length} tech content creators from ${uniqueCountries.length} different countries. Find local experts in programming, system design, web development, and more. Browse our curated list of international tech educators for 2025.`,
    path: 'countries',
    type: 'website',
    keywords: [
      "tech content creators",
      "programming tutorials",
      "international educators",
      "global tech community",
      "local tech experts",
      "country-specific tutorials",
      "international tech YouTubers",
      "programming education by country",
      "global coding tutorials",
      "tech education worldwide",
      "international developer community",
      "regional tech experts"
    ],
    tags: [
      "tech education",
      "programming",
      "international",
      "tutorials",
      "learning"
    ],
    category: "Education/Technology",
  });
}

export default async function CountriesPage() {
  const creators = await getCreators();
  
  // Get unique valid country codes
  const uniqueCountries = Array.from(
    new Set(
      creators
        .filter(creator => creator.country && isValidCountryCode(creator.country))
        .map(creator => creator.country.toUpperCase())
    )
  ).sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)));

  // Map to country objects
  const countries = uniqueCountries.map(countryCode => ({
    code: countryCode,
    name: getCountryName(countryCode),
    slug: getCountrySlug(countryCode),
  }));

  // Filter creators to only those with valid countries
  const validCreators = creators.filter(
    creator => creator.country && isValidCountryCode(creator.country)
  );

  // Generate JSON-LD schema
  const websiteSchema = generateWebsiteSchema();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Browse Tech Content Creators by Country",
    description: `Discover ${validCreators.length} tech content creators from ${uniqueCountries.length} different countries.`,
    url: getCanonicalUrl('countries'),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: countries.length,
      itemListElement: countries.map((country, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Country",
          name: country.name,
          url: getCanonicalUrl(`countries/${country.slug}`),
          numberOfCreators: validCreators.filter(
            creator => creator.country?.toUpperCase() === country.code
          ).length
        }
      }))
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": getCanonicalUrl(),
            name: "Home"
          }
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": getCanonicalUrl('countries'),
            name: "Countries"
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="countries-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, jsonLd]) }}
      />
      <Shell>
        <div className="space-y-8">
          <CountryHeader />
          <CountryList countries={countries} creators={validCreators} />
        </div>
      </Shell>
    </>
  );
}