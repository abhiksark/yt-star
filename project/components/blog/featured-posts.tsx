import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function FeaturedPosts() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <Link href="/blog/weekly-spotlight-theo" className="group">
          <div className="aspect-[2/1] relative overflow-hidden rounded-t-lg">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
              alt="Tech creator working on content"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-4 left-4">Featured Creator</Badge>
          </div>
          <CardHeader>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {formatDate(new Date().toISOString())}
              </p>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                Weekly Spotlight: Theo - Building the Future of Web Development
              </h2>
              <p className="text-muted-foreground">
                An in-depth look at how Theo is revolutionizing web development education
                through practical, real-world tutorials and insights.
              </p>
            </div>
          </CardHeader>
        </Link>
      </Card>
    </section>
  );
}