import Link from "next/link";
import { Card } from "@/components/ui/card";
import { 
  Code, 
  Server, 
  Cloud, 
  Cpu, 
  BrainCircuit,
  Database,
  Terminal,
  ShieldCheck,
  Smartphone,
  Boxes,
  LineChart,
  Workflow,
  BookText,
  Compass,
  BrainCog
} from "lucide-react";
import type { Category, Creator } from "@/lib/types";

interface CategoryListProps {
  categories: Category[];
  creators: Creator[];
}

// Enhanced category icons with more specific, visually appealing options
const categoryIcons = {
  'system-design': Workflow,
  'frontend': Code,
  'backend': Server,
  'javascript': Terminal,
  'machine-learning': BrainCircuit,
  'devops': Boxes,
  'data-science': LineChart,
  'cloud': Cloud,
  'security': ShieldCheck,
  'mobile': Smartphone,
  'python': Compass,
  'java': Cpu,
  'os': Database,
  'dsa': BookText,
  'computer-architecture': BrainCog,
};

// Helper function to get gradients for each category to make them visually distinct
const getCategoryGradient = (slug: string): string => {
  const gradients: Record<string, string> = {
    'system-design': 'from-blue-500/20 to-indigo-500/20',
    'frontend': 'from-pink-500/20 to-rose-500/20',
    'backend': 'from-emerald-500/20 to-green-500/20',
    'javascript': 'from-amber-500/20 to-yellow-500/20',
    'machine-learning': 'from-purple-500/20 to-violet-500/20',
    'devops': 'from-sky-500/20 to-cyan-500/20',
    'data-science': 'from-blue-500/20 to-cyan-500/20',
    'cloud': 'from-sky-500/20 to-blue-500/20',
    'security': 'from-red-500/20 to-rose-500/20',
    'mobile': 'from-orange-500/20 to-amber-500/20',
    'python': 'from-green-500/20 to-emerald-500/20',
    'java': 'from-orange-500/20 to-red-500/20',
    'os': 'from-gray-500/20 to-slate-500/20',
    'dsa': 'from-indigo-500/20 to-purple-500/20',
    'computer-architecture': 'from-zinc-500/20 to-gray-500/20',
  };
  
  return gradients[slug] || 'from-gray-500/20 to-slate-500/20';
};

// Helper function to get icon color for each category
const getCategoryIconColor = (slug: string): string => {
  const colors: Record<string, string> = {
    'system-design': 'text-blue-600 dark:text-blue-400',
    'frontend': 'text-pink-600 dark:text-pink-400',
    'backend': 'text-emerald-600 dark:text-emerald-400',
    'javascript': 'text-amber-600 dark:text-amber-400',
    'machine-learning': 'text-purple-600 dark:text-purple-400',
    'devops': 'text-sky-600 dark:text-sky-400',
    'data-science': 'text-blue-600 dark:text-blue-400',
    'cloud': 'text-sky-600 dark:text-sky-400',
    'security': 'text-red-600 dark:text-red-400',
    'mobile': 'text-orange-600 dark:text-orange-400',
    'python': 'text-green-600 dark:text-green-400',
    'java': 'text-orange-600 dark:text-orange-400',
    'os': 'text-gray-600 dark:text-gray-400',
    'dsa': 'text-indigo-600 dark:text-indigo-400',
    'computer-architecture': 'text-zinc-600 dark:text-zinc-400',
  };
  
  return colors[slug] || 'text-gray-600 dark:text-gray-400';
};

export function CategoryList({ categories, creators }: CategoryListProps) {
  // Fix category counts calculation - the bug was that we were trying to match on category.slug 
  // but creator.categories might contain a different format than the slug
  const getCategoryCount = (categorySlug: string) => {
    return creators.filter(creator => 
      // Fix: Check for presence in creator categories by normalizing both to lowercase
      creator.categories?.some(cat => 
        cat.toLowerCase() === categorySlug.toLowerCase() ||
        cat.toLowerCase().replace(/\s+/g, '-') === categorySlug.toLowerCase() ||
        cat.toLowerCase() === categorySlug.toLowerCase().replace(/-/g, ' ')
      )
    ).length;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Compass;
        const iconColor = getCategoryIconColor(category.slug);
        const gradientBg = getCategoryGradient(category.slug);
        const categoryCount = getCategoryCount(category.slug);
        
        return (
          <Link 
            key={category.slug} 
            href={`/categories/${category.slug}`}
            className="block group"
          >
            <Card 
              className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientBg} flex items-center justify-center ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all duration-300 shadow-sm`}>
                    <IconComponent className={`h-7 w-7 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {categoryCount} {categoryCount === 1 ? 'creator' : 'creators'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description || `Discover the best ${category.name} tutorials and educational content from expert creators.`}
                </p>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-primary/30 group-hover:to-transparent transition-all duration-500"></div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}