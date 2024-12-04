import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function BlogHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Learn from Top Tech Education Creators
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Discover expert tutorials, in-depth guides, and industry insights from leading 
          tech educators. Master programming, system design, and web development through 
          curated content from the best creators.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials and guides..."
            className="pl-9"
            aria-label="Search tutorials and guides"
          />
        </div>
        <Button>
          Subscribe to Weekly Insights
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        Popular topics:
        <Button variant="link" className="p-0 h-auto font-normal">Web Development</Button> •
        <Button variant="link" className="p-0 h-auto font-normal">System Design</Button> •
        <Button variant="link" className="p-0 h-auto font-normal">JavaScript</Button> •
        <Button variant="link" className="p-0 h-auto font-normal">Python</Button>
      </div>
    </div>
  );
}