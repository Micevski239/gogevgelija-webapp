'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { listingService, categoryService } from '@/lib/api/services';
import { ListingCard } from '@/components/cards/ListingCard';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ListingsPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getForListings(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['listings', page, category],
    queryFn: () => listingService.getPage(page, 20, category ? { category } : undefined),
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Explore Listings</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            options={[
              { value: '', label: 'All Categories' },
              ...(categories || []).map(cat => ({ value: cat.slug || cat.id.toString(), label: cat.name }))
            ]}
            className="w-full sm:w-64"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : data && data.results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.results.map(listing => <ListingCard key={listing.id} listing={listing} />)}
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
            <p>No listings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
