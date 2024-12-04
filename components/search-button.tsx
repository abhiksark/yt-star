'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SearchButton() {
  const handleClick = React.useCallback(() => {
    const searchInput = document.querySelector<HTMLInputElement>('input[placeholder="Search creators..."]');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  return (
    <Button size="lg" className="w-full sm:w-auto group" onClick={handleClick}>
      Search Creators
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
}