"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 py-16">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="text-muted-foreground text-lg text-center max-w-md">
        An error occurred while loading this page. Please try again.
      </p>
      <Button onClick={reset} className="mt-4">
        <RefreshCcw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}