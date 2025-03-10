import { Card } from "@/components/ui/card";
import Link from "next/link";
import { categories } from "@/lib/data";
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

export function Categories() {
  return (
    <section className="py-8">
      <h3 className="text-2xl font-bold mb-6 px-4 sm:px-0">Browse All Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.slug as keyof typeof categoryIcons];
          return (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <Card className="p-4 sm:p-6 hover:bg-accent cursor-pointer transition-colors flex flex-col items-center gap-2 h-full">
                {Icon && <Icon className="h-6 w-6 sm:h-8 sm:w-8" />}
                <h4 className="font-medium text-center text-sm sm:text-base">{category.name}</h4>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}