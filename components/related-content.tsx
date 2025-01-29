import Link from "next/link";
import { Card } from "./ui/card";

interface RelatedContentProps {
  currentCategory?: string;
  currentCountry?: string;
}

export function RelatedContent({ currentCategory, currentCountry }: RelatedContentProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Related Content</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {currentCategory && (
          <Card className="p-4">
            <h4 className="font-medium mb-2">Popular in {currentCategory}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/blog/tags/${currentCategory.toLowerCase()}`}>
                  Latest {currentCategory} Tutorials
                </Link>
              </li>
              <li>
                <Link href={`/categories/${currentCategory.toLowerCase()}`}>
                  Top {currentCategory} Creators
                </Link>
              </li>
            </ul>
          </Card>
        )}
        {currentCountry && (
          <Card className="p-4">
            <h4 className="font-medium mb-2">More from {currentCountry}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/countries/${currentCountry.toLowerCase()}`}>
                  All {currentCountry} Creators
                </Link>
              </li>
              <li>
                <Link href={`/blog/regions/${currentCountry.toLowerCase()}`}>
                  {currentCountry} Tech Scene
                </Link>
              </li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}