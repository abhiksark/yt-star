import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  Layout,
  Terminal,
  Brain,
  Server,
  BarChart2,
  Cloud,
  Shield,
  Smartphone,
  Coffee,
  CircuitBoard,
  TreePine,
  Settings,
} from "lucide-react";
import type { Category, Creator } from "@/lib/types";

const categoryIcons = {
  'system-design': Database,
  'frontend': Layout,
  'backend': Server,
  'javascript': Code,
  'machine-learning': Brain,
  'devops': Terminal,
  'data-science': BarChart2,
  'cloud': Cloud,
  'security': Shield,
  'mobile': Smartphone,
  'python': TreePine,
  'java': Coffee,
  'os': Settings,
  'dsa': TreePine,
  'computer-architecture': CircuitBoard,
};

interface CategoryListProps {
  categories: Category[];
  creators: Creator[];
}

export function CategoryList({ categories, creators }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = categoryIcons[category.slug as keyof typeof categoryIcons];
        const categoryCreators = creators.filter(creator =>
          creator.categories.some(c => c.toLowerCase().includes(category.name.toLowerCase()))
        );

        return (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
              <div className="flex flex-col items-center text-center gap-4">
                {Icon && <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />}
                <div className="space-y-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <Badge variant="secondary">
                    {categoryCreators.length} {categoryCreators.length === 1 ? 'Creator' : 'Creators'}
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