import Link from "next/link";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Code2, 
  Layers, 
  Sparkles,
  GraduationCap,
  Lightbulb,
  Blocks
} from "lucide-react";
import type { Category, Creator } from "@/lib/types";

interface CategoryListProps {
  categories: Category[];
  creators: Creator[];
}

// Map of category icons
const categoryIcons = {
  'frontend': Code2,
  'backend': Layers,
  'devops': Blocks,
  'mobile': Sparkles,
  'ai': Lightbulb,
  'system-design': BookOpen,
  'cloud': GraduationCap,
  // Add more mappings as needed
};

export function CategoryList({ categories, creators }: CategoryListProps) {
  // Get creator counts per category
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category.slug] = creators.filter(creator => 
      creator.categories.includes(category.slug)
    ).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || BookOpen;
        return (
          <Link 
            key={category.slug} 
            href={`/categories/${category.slug}`}
            className="block group"
          >
            <Card 
              className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-up opacity-0"
              style={{ animationDelay: `${900 + index * 100}ms` }}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {categoryCounts[category.slug]} {categoryCounts[category.slug] === 1 ? 'creator' : 'creators'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description || `Discover the best ${category.name} tutorials and educational content.`}
                </p>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}