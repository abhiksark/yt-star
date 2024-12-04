"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; 
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { searchCreators } from "@/lib/search";
import { Creator } from "@/lib/types";

export function SearchCreators() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Creator[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  const handleSearch = React.useCallback(async (value: string) => {
    const searchResults = await searchCreators(value);
    setResults(searchResults);
  }, []);

  React.useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative w-full group">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) handleSearch(query);
          }}
          className="relative flex gap-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search creators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary/40 hover:border-primary/40 transition-colors w-full"
          />
          <Button type="submit" size="lg" className="shrink-0">
          Search Creators
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-background rounded-lg border shadow-lg">
          <ul className="py-2">
            {results.map((creator) => (
              <li key={creator.id}>
                <button
                  onClick={() => {
                    router.push(`/creators/${creator.slug}`);
                    setQuery("");
                    setResults([]);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent/50 transition-colors flex items-center gap-3"
                >
                  <img
                    src={creator.logoUrl}
                    alt={creator.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {creator.subscriberCount} subscribers
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}