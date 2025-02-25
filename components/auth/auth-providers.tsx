"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface AuthProvidersProps {
  isLoading: boolean;
}

export function AuthProviders({ isLoading }: AuthProvidersProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" disabled={isLoading} className="rounded-xl">
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button variant="outline" disabled={isLoading} className="rounded-xl">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </>
  );
}