import { Badge } from "@/components/ui/badge";

interface TagHeaderProps {
  tag: string;
  count: number;
}

export function TagHeader({ tag, count }: TagHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{tag}</h1>
        <Badge variant="secondary" className="text-sm">
          {count} {count === 1 ? 'Creator' : 'Creators'}
        </Badge>
      </div>
      <p className="text-muted-foreground text-lg">
        Discover {count} content {count === 1 ? 'creator' : 'creators'} teaching {tag}. 
        Learn from expert tutorials, courses, and educational content.
      </p>
    </div>
  );
}