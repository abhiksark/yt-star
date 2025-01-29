import { Metadata, Viewport } from "next";
import { getCreators } from "@/lib/data";
import { CountryHeader } from "@/components/country-header";
import { CountryList } from "@/components/country-list";
import { Shell } from "@/components/shell";
import { getCountryName, getCountrySlug, isValidCountryCode } from "@/lib/countries";
import { getCanonicalUrl } from "@/lib/utils";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const title = "Browse by Country - Tech Content Creators";
const description = "Discover tech content creators from different countries. Find local experts in programming, system design, and more.";
const url = getCanonicalUrl('countries');

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  keywords: [
    "tech content creators",
    "programming tutorials",
    "international educators",
    "global tech community",
    "local tech experts",
    "country-specific tutorials",
  ],
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
  // alternates: {
  //   canonical: url,
  // },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: 'BestYoutubeChannels',
    locale: 'en_US',
    images: [
      {
        url: getCanonicalUrl('og/countries.png'),
        width: 1200,
        height: 630,
        alt: 'Browse Tech Content Creators by Country',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [getCanonicalUrl('og/countries.png')],
    creator: '@bestyoutubechannels',
    site: '@bestyoutubechannels',
  },
};

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

  return (
    <Shell>
      <div className="space-y-8">
        <CountryHeader />
        <CountryList countries={countries} creators={validCreators} />
      </div>
    </Shell>
  );
}