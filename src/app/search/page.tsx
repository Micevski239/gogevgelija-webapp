'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { searchService } from '@/lib/api/services';
import { ListingCard } from '@/components/cards/ListingCard';
import { EventCard } from '@/components/cards/EventCard';
import { PromotionCard } from '@/components/cards/PromotionCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { Tabs } from '@/components/ui/Tabs';
import { Spinner } from '@/components/ui/Spinner';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'all' | 'listings' | 'events' | 'promotions' | 'blogs'>('all');

  const { data, isLoading } = useQuery({
    queryKey: ['search', query, activeTab],
    queryFn: () => searchService.globalSearch(query, activeTab),
    enabled: query.length >= 2,
  });

  const totalResults = data ? data.listings.length + data.events.length + data.promotions.length + data.blogs.length : 0;

  const tabs = [
    { value: 'all', label: `All (${totalResults})` },
    { value: 'listings', label: `Listings (${data?.listings.length || 0})` },
    { value: 'events', label: `Events (${data?.events.length || 0})` },
    { value: 'promotions', label: `Promotions (${data?.promotions.length || 0})` },
    { value: 'blogs', label: `Blogs (${data?.blogs.length || 0})` },
  ];

  if (query.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Search GoGevgelija</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter at least 2 characters to start searching
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Results for: <span className="font-semibold text-gray-900 dark:text-white">{query}</span>
        </p>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(value) => setActiveTab(value as typeof activeTab)}
              className="mb-8"
            />

            {activeTab === 'all' && (
              <div className="space-y-12">
                {data && data.listings.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Listings ({data.listings.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {data.listings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  </div>
                )}

                {data && data.events.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Events ({data.events.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {data.events.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                )}

                {data && data.promotions.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Promotions ({data.promotions.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {data.promotions.map(promotion => (
                        <PromotionCard key={promotion.id} promotion={promotion} />
                      ))}
                    </div>
                  </div>
                )}

                {data && data.blogs.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Blog Articles ({data.blogs.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data.blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'listings' && data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.listings.length > 0 ? (
                  data.listings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No listings found
                  </div>
                )}
              </div>
            )}

            {activeTab === 'events' && data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.events.length > 0 ? (
                  data.events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No events found
                  </div>
                )}
              </div>
            )}

            {activeTab === 'promotions' && data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.promotions.length > 0 ? (
                  data.promotions.map(promotion => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No promotions found
                  </div>
                )}
              </div>
            )}

            {activeTab === 'blogs' && data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.blogs.length > 0 ? (
                  data.blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No blog articles found
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
