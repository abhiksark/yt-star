import { Metadata, Viewport } from "next";
import Link from "next/link";
import { getCreators } from "@/lib/data";
import { CountryHeader } from "@/components/country-header";
import { Shell } from "@/components/shell";
import { Card } from "@/components/ui/card";
import { countryNames, isValidCountryCode, getCountrySlug } from "@/lib/countries";
import { getCanonicalUrl } from "@/lib/utils";
import { Globe2, Users2 } from "lucide-react";

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
  
  // Get unique countries with creator counts
  const countryStats = creators.reduce((acc, creator) => {
    if (creator.country && isValidCountryCode(creator.country)) {
      const code = creator.country.toUpperCase();
      if (!acc[code]) {
        acc[code] = {
          code,
          name: countryNames[code],
          count: 1,
          categories: new Set(creator.categories),
        };
      } else {
        acc[code].count++;
        creator.categories.forEach(cat => acc[code].categories.add(cat));
      }
    }
    return acc;
  }, {} as Record<string, { code: string; name: string; count: number; categories: Set<string> }>);

  const countries = Object.values(countryStats).sort((a, b) => b.count - a.count);

  return (
    <Shell>
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="relative space-y-6 pb-8">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 -z-10 bg-[size:200%_200%] bg-[linear-gradient(45deg,var(--primary)/10,var(--accent)/10,var(--secondary)/10,var(--primary)/10)]" />

          <div>
            <div className="inline-block glass-effect px-4 py-2 rounded-full text-sm font-medium text-muted-foreground">
              <span className="inline-block mr-2">🌍</span>
              Discover creators from {countries.length} countries
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Browse by Country
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Discover tech content creators from different regions around the world. 
              Learn programming and software development from local experts in your area.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe2 className="h-5 w-5" />
              <span>{countries.length} Countries</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users2 className="h-5 w-5" />
              <span>{creators.length} Creators</span>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map(({ code, name, count, categories }, index) => (
            <Link 
              key={code} 
              href={`/countries/${getCountrySlug(code)}`}
              className="block group"
            >
              <Card 
                className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm ring-2 ring-border/50 group-hover:ring-border transition-all duration-300">
                      <img
                        src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
                        alt={`${name} flag`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {count} {count === 1 ? 'creator' : 'creators'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Topics: {Array.from(categories).slice(0, 3).join(', ')}
                    {categories.size > 3 && ` and ${categories.size - 3} more`}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}