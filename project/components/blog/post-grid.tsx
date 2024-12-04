import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function PostGrid() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Stories</h2>
        <Link href="/blog/archive" className="text-sm text-muted-foreground hover:text-primary">
          View All
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Post Card */}
        <Card>
          <Link href="/blog/tech-controversy-ai" className="group">
            <div className="aspect-[16/9] relative overflow-hidden rounded-t-lg">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600"
                alt="AI controversy illustration"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <Badge variant="secondary" className="absolute top-4 left-4">
                Controversy
              </Badge>
            </div>
            <CardHeader>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {formatDate(new Date().toISOString())}
                </p>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  The AI Ethics Debate: Where Do We Draw the Line?
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Exploring the ongoing controversy around AI ethics and its impact
                  on content creation.
                </p>
              </div>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </section>
  );
}