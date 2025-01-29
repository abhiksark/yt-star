'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreatorGrid } from '@/components/creator-grid';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Creator } from '@/lib/types';

interface PaginatedCreatorGridProps {
  creators: Creator[];
  itemsPerPage?: number;
}

export function PaginatedCreatorGrid({ 
  creators, 
  itemsPerPage = 12 
}: PaginatedCreatorGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(creators.length / itemsPerPage);

  // Calculate pagination range
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCreators = creators.slice(startIndex, endIndex);

  // Calculate visible page numbers
  const maxVisiblePages = 5;
  let pageNumbers: (number | string)[] = [];
  
  if (totalPages <= maxVisiblePages) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pageNumbers = [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  return (
    <div className="space-y-8">
      <CreatorGrid creators={currentCreators} />
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-2">
            {pageNumbers.map((pageNum, idx) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${idx}`} className="px-4 py-2">...</span>
              ) : (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(pageNum as number)}
                  className="min-w-[40px]"
                >
                  {pageNum}
                </Button>
              )
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}