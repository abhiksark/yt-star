import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-muted-foreground text-lg text-center max-w-md">
        Sorry, we couldn't find what you were looking for. The page might have been removed or doesn't exist.
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <HomeIcon className="h-4 w-4" />
          Return Home
        </Link>
      </Button>
    </div>
  );
}