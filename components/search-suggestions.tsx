import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const popularSearches = [
  "React tutorials",
  "System design",
  "JavaScript basics",
  "Python for beginners",
  "Web development",
  "Data structures",
];

const trendingTopics = [
  "AI development",
  "Cloud computing",
  "TypeScript",
  "Next.js 14",
  "Microservices",
];

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function SearchSuggestions({ onSuggestionClick }: SearchSuggestionsProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <Button
              key={search}
              variant="secondary"
              size="sm"
              onClick={() => onSuggestionClick(search)}
              className="text-sm"
            >
              {search}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Button
              key={topic}
              variant="outline"
              size="sm"
              onClick={() => onSuggestionClick(topic)}
              className="text-sm"
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}