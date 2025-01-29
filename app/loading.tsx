import { Shell } from "@/components/shell";
import { CategoryGridSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <Shell>
      <div className="space-y-8">
        {/* Hero section skeleton */}
        <section className="relative py-12 sm:py-20 text-center space-y-6 overflow-hidden px-4">
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="h-12 sm:h-16 md:h-20 w-3/4 mx-auto bg-muted animate-pulse rounded-lg" />
            <div className="h-6 sm:h-8 w-2/3 mx-auto bg-muted animate-pulse rounded-lg" />
            <div className="h-12 w-48 mx-auto bg-muted animate-pulse rounded-lg mt-6" />
          </div>
        </section>

        {/* Main content skeleton */}
        <CategoryGridSkeleton />
      </div>
    </Shell>
  );
}