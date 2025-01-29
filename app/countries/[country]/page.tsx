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

interface CountryPageProps {
  params: {
    country: string;
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
  const url = getCanonicalUrl(`countries/${params.country}`);

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
      siteName: 'BestYoutubeChannels',
      locale: 'en_US',
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
      creator: '@bestyoutubechannels',
      site: '@bestyoutubechannels',
    },
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

  return (
    <Shell>
      <div className="space-y-8">
        <CountryHeader country={countryName} count={countryCreators.length} />
        <Suspense fallback={<CreatorGridSkeleton />}>
          <CreatorGrid creators={countryCreators} />
        </Suspense>
      </div>
    </Shell>
  );
}