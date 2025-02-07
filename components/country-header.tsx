import { Globe, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CountryHeaderProps {
  country?: string;
  count?: number;
  countryCode?: string;
}

export function CountryHeader({ country, count, countryCode }: CountryHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {country ? `${country} Content Creators` : 'Browse by Country'}
            </h1>
            {countryCode && (
              <Badge variant="outline" className="text-base">
                {countryCode}
              </Badge>
            )}
          </div>
          {country && count !== undefined && (
            <p className="text-muted-foreground text-lg">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {count} tech content {count === 1 ? 'creator' : 'creators'}
              </span>
            </p>
          )}
        </div>
        {countryCode && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-5 w-5" />
            <span>Region: {countryCode}</span>
          </div>
        )}
      </div>
      
      {country && count !== undefined && (
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Discover {count} tech content {count === 1 ? 'creator' : 'creators'} from {country}. 
          Learn programming, system design, and web development from local experts in your region.
          Get insights and tutorials tailored to your local tech community.
        </p>
      )}
      {!country && (
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Explore tech content creators from around the world. Find experts in your region 
          or discover international perspectives on software development, programming tutorials, 
          and tech education.
        </p>
      )}
    </div>
  );
}