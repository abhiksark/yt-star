import { BookOpen, Users2 } from "lucide-react";
import { categories } from "@/lib/data";

interface CategoryHeaderProps {
  category?: {
    name: string;
    description?: string;
  };
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="relative space-y-6 pb-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 -z-10 bg-[size:200%_200%] bg-[linear-gradient(45deg,var(--primary)/10,var(--accent)/10,var(--secondary)/10,var(--primary)/10)]" />

      <div>
        <div className="inline-block glass-effect px-4 py-2 rounded-full text-sm font-medium text-muted-foreground">
          <span className="inline-block mr-2">📚</span>
          {categories.length} learning paths available
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {category ? `${category.name} Creators` : 'Browse by Category'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {category?.description || 
            'Explore specialized tech content across different domains. Find expert tutorials and educational content tailored to your interests.'}
        </p>
      </div>

      {!category && (
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span>{categories.length} Categories</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users2 className="h-5 w-5" />
            <span>Expert Educators</span>
          </div>
        </div>
      )}
    </div>
  );
}