'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { ListingCard } from '@/components/cards/ListingCard';
import { EventCard } from '@/components/cards/EventCard';
import { PromotionCard } from '@/components/cards/PromotionCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { Tabs } from '@/components/ui/Tabs';
import { Spinner } from '@/components/ui/Spinner';
import { Heart, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { Listing, Event, Promotion, Blog } from '@/types';

export default function WishlistPage() {
  const { user } = useAuth();
  const { wishlistItems, loading } = useWishlist();
  const [activeTab, setActiveTab] = useState<'all' | 'listings' | 'events' | 'promotions' | 'blogs'>('all');

  const listings = wishlistItems.filter(item => item.item_type === 'listing').map(item => item.item_data as Listing);
  const events = wishlistItems.filter(item => item.item_type === 'event').map(item => item.item_data as Event);
  const promotions = wishlistItems.filter(item => item.item_type === 'promotion').map(item => item.item_data as Promotion);
  const blogs = wishlistItems.filter(item => item.item_type === 'blog').map(item => item.item_data as Blog);

  const totalItems = wishlistItems.length;

  const tabs = [
    { value: 'all', label: `All (${totalItems})` },
    { value: 'listings', label: `Listings (${listings.length})` },
    { value: 'events', label: `Events (${events.length})` },
    { value: 'promotions', label: `Promotions (${promotions.length})` },
    { value: 'blogs', label: `Blogs (${blogs.length})` },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <LogIn className="h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Sign in to view your wishlist</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Save your favorite places, events, and articles by signing in
            </p>
            <Link
              href="/login"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600 dark:text-gray-400">
            All your saved favorites in one place
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : totalItems === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start exploring and save your favorite places, events, and articles
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/listings"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
              >
                Browse Listings
              </Link>
              <Link
                href="/events"
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold"
              >
                Browse Events
              </Link>
            </div>
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
                {listings.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Listings ({listings.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {listings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  </div>
                )}

                {events.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Events ({events.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {events.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                )}

                {promotions.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Promotions ({promotions.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {promotions.map(promotion => (
                        <PromotionCard key={promotion.id} promotion={promotion} />
                      ))}
                    </div>
                  </div>
                )}

                {blogs.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Blog Articles ({blogs.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.length > 0 ? (
                  listings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No listings in your wishlist
                  </div>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.length > 0 ? (
                  events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No events in your wishlist
                  </div>
                )}
              </div>
            )}

            {activeTab === 'promotions' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {promotions.length > 0 ? (
                  promotions.map(promotion => (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No promotions in your wishlist
                  </div>
                )}
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                  blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-600 dark:text-gray-400">
                    No blog articles in your wishlist
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
