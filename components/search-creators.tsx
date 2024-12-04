"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchCreators() {
  return (
    <div className="relative w-full max-w-lg mx-auto group">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search creators..."
          className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary/40 hover:border-primary/40 transition-colors w-full"
        />
      </div>
    </div>
  );
}