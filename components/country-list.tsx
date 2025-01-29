import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import type { Creator } from "@/lib/types";

interface Country {
  code: string;
  name: string;
  slug: string;
}

interface CountryListProps {
  countries: Country[];
  creators: Creator[];
}

export function CountryList({ countries, creators }: CountryListProps) {
  if (!countries.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No countries available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {countries.map((country) => {
        const countryCreators = creators.filter(
          creator => creator.country && creator.country.toUpperCase() === country.code.toUpperCase()
        );

        return (
          <Link key={country.code} href={`/countries/${country.slug}`}>
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
              <div className="flex flex-col items-center text-center gap-4">
                <Globe className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="space-y-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {country.name}
                  </h3>
                  <Badge variant="secondary">
                    {countryCreators.length} {countryCreators.length === 1 ? 'Creator' : 'Creators'}
                  </Badge>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}