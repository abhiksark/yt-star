import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCreators } from "@/lib/data";
import { Shell } from "@/components/shell";
import { CreatorGrid } from "@/components/creator-grid";
import { getCountryBySlug, getCountrySlug } from "@/lib/countries";
import { getCanonicalUrl } from "@/lib/utils";

interface CountryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const country = getCountryBySlug(params.slug);
  if (!country) return {};

  const title = `${country.name} Tech Content Creators`;
  const description = `Discover tech content creators from ${country.name}. Find programming tutorials and tech education from local experts.`;
  const url = getCanonicalUrl(`/countries/${params.slug}/`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const country = getCountryBySlug(params.slug);
  if (!country) notFound();

  const creators = await getCreators();
  const countryCreators = creators.filter(
    creator => creator.country?.toUpperCase() === country.code
  );

  return (
    <Shell>
      <div className="space-y-8">
        <div className="relative space-y-6 pb-8">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 -z-10 animate-gradient bg-[size:200%_200%] bg-[linear-gradient(45deg,var(--primary)/10,var(--accent)/10,var(--secondary)/10,var(--primary)/10)]" />

          <div className="flex items-center gap-6">
            <div className="w-20 h-14 rounded-lg overflow-hidden shadow-sm ring-2 ring-border/50 animate-fade-up opacity-0" style={{ animationDelay: '200ms' }}>
              <img
                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                alt={`${country.name} flag`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight animate-title opacity-0" style={{ animationDelay: '400ms' }}>
                {country.name} Tech Content Creators
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up opacity-0" style={{ animationDelay: '600ms' }}>
                {countryCreators.length} {countryCreators.length === 1 ? 'creator' : 'creators'} from {country.name}
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl animate-fade-up opacity-0" style={{ animationDelay: '800ms' }}>
            Discover tech content creators from {country.name}. Learn programming and software development 
            from local experts who create high-quality educational content.
          </p>
        </div>

        <div className="animate-fade-up opacity-0" style={{ animationDelay: '1000ms' }}>
          <CreatorGrid 
            creators={countryCreators} 
            emptyMessage={`No creators found from ${country.name} yet.`}
          />
        </div>
      </div>
    </Shell>
  );
}

export async function generateStaticParams() {
  const creators = await getCreators();
  const countries = new Set(
    creators
      .filter(creator => creator.country)
      .map(creator => creator.country.toUpperCase())
  );

  return Array.from(countries).map(code => ({
    slug: getCountrySlug(code),
  }));
} 