'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { promotionService } from '@/lib/api/services';
import { PromotionCard } from '@/components/cards/PromotionCard';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PromotionsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['promotions', page],
    queryFn: () => promotionService.getPage(page, 20),
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Special Promotions</h1>

        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : data && data.results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.results.map(promotion => <PromotionCard key={promotion.id} promotion={promotion} />)}
            </div>
            <div className="flex justify-center items-center gap-4">
              <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={!data.previous || page === 1} variant="outline">
                <ChevronLeft className="h-4 w-4 mr-1" />Previous
              </Button>
              <span className="text-gray-600 dark:text-gray-400">Page {page}</span>
              <Button onClick={() => setPage(p => p + 1)} disabled={!data.next} variant="outline">
                Next<ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-600 dark:text-gray-400">
            <p>No promotions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
