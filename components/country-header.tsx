interface CountryHeaderProps {
  country?: string;
  count?: number;
}

export function CountryHeader({ country, count }: CountryHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">
        {country ? `${country} Content Creators` : 'Browse by Country'}
      </h1>
      {country && count !== undefined && (
        <p className="text-muted-foreground text-lg max-w-3xl">
          Discover {count} tech content {count === 1 ? 'creator' : 'creators'} from {country}. 
          Learn from local experts and get insights from your region.
        </p>
      )}
      {!country && (
        <p className="text-muted-foreground text-lg max-w-3xl">
          Explore tech content creators from around the world. Find experts in your region or discover international perspectives.
        </p>
      )}
    </div>
  );
}