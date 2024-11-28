"use client";

import { Search, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { channelsData } from "@/lib/data";
import type { Creator } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function SearchCreators() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setCreators([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = channelsData.filter(creator => 
        creator.name.toLowerCase().includes(query.toLowerCase()) ||
        creator.description.toLowerCase().includes(query.toLowerCase()) ||
        creator.category.some(cat => 
          cat.toLowerCase().includes(query.toLowerCase())
        )
      );
      setCreators(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative w-full max-w-3xl mx-auto group">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search creators or browse categories..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(true);
            }}
            className="pl-10 pr-[140px] h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary/40 hover:border-primary/40 transition-colors w-full"
            onFocus={() => setIsSearching(true)}
            onBlur={(e) => {
              if (!e.target.value) {
                setIsSearching(false);
              }
            }}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {isLoading ? (
              <Search className="h-4 w-4 animate-pulse text-muted-foreground" />
            ) : (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-sm font-medium"
              >
                <Link href="/categories" className="flex items-center gap-2">
                  Browse
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      {creators.length > 0 && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg p-4 space-y-4 z-50">
          <div className="grid gap-4">
            {creators.map((creator) => (
              <Link key={creator.slug} href={`/creators/${creator.slug}`}>
                <Card className="p-4 hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <img src={creator.logoUrl} alt={creator.name} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">{creator.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {creator.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {creator.category.slice(0, 2).map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}