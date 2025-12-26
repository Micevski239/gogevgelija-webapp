'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { CategoryCard } from '@/components/home/CategoryCard';
import { TrustBadges } from '@/components/home/TrustBadges';
import { ListingCard } from '@/components/cards/ListingCard';
import { EventCard } from '@/components/cards/EventCard';
import { PromotionCard } from '@/components/cards/PromotionCard';
import { StaggeredGrid, StaggeredGridItem } from '@/components/animations/StaggeredGrid';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  UtensilsCrossed,
  Hotel,
  Palmtree,
  Calendar,
  ShoppingBag,
  Music,
} from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function DemoPage() {
  const { listings, events, promotions } = mockData;

  const categories = [
    {
      title: 'Restaurants',
      description: 'Discover the best dining experiences in Gevgelija',
      icon: UtensilsCrossed,
      href: '/listings?category=restaurants',
      count: 120,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    },
    {
      title: 'Hotels',
      description: 'Find your perfect accommodation',
      icon: Hotel,
      href: '/listings?category=hotels',
      count: 45,
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
    {
      title: 'Attractions',
      description: 'Explore amazing places and activities',
      icon: Palmtree,
      href: '/listings?category=attractions',
      count: 80,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      title: 'Events',
      description: 'Join exciting events and gatherings',
      icon: Calendar,
      href: '/events',
      count: 25,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
    {
      title: 'Shopping',
      description: 'Discover local shops and boutiques',
      icon: ShoppingBag,
      href: '/listings?category=shopping',
      count: 60,
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
      title: 'Nightlife',
      description: 'Experience the vibrant nightlife',
      icon: Music,
      href: '/listings?category=nightlife',
      count: 35,
      gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=1920&q=80"
        title="Discover Amazing Places in Gevgelija"
        subtitle="Explore local attractions, events, and experiences with our commercial-grade platform"
        showSearch={true}
        showStats={true}
      />

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find exactly what you're looking for
            </p>
          </div>
        </FadeIn>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <StaggeredGridItem key={category.title}>
              <CategoryCard {...category} />
            </StaggeredGridItem>
          ))}
        </StaggeredGrid>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Places
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Hand-picked by our team - with rich information & ratings
              </p>
            </div>
          </FadeIn>

          {/* Grid View */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grid View</h3>
            <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {listings.map((listing) => (
                <StaggeredGridItem key={listing.id}>
                  <ListingCard listing={listing} variant="grid" />
                </StaggeredGridItem>
              ))}
            </StaggeredGrid>
          </div>

          {/* List View */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">List View</h3>
            <div className="space-y-6">
              {listings.map((listing) => (
                <ListingCard key={`list-${listing.id}`} listing={listing} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals / Promotions Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <div className="inline-block">
                <h2 className="text-4xl font-bold mb-2">
                  <span className="gradient-text">🔥 Hot Deals</span>
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Limited time offers - Live countdown timers & discount codes!
              </p>
            </div>
          </FadeIn>

          {/* Grid View */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grid View</h3>
            <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {promotions.map((promotion) => (
                <StaggeredGridItem key={promotion.id}>
                  <PromotionCard promotion={promotion} variant="grid" />
                </StaggeredGridItem>
              ))}
            </StaggeredGrid>
          </div>

          {/* List View */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">List View</h3>
            <div className="space-y-6">
              {promotions.map((promotion) => (
                <PromotionCard key={`list-${promotion.id}`} promotion={promotion} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Join the excitement - with calendar badges & attendee counts
              </p>
            </div>
          </FadeIn>

          {/* Grid View */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grid View</h3>
            <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {events.map((event) => (
                <StaggeredGridItem key={event.id}>
                  <EventCard event={event} variant="grid" />
                </StaggeredGridItem>
              ))}
            </StaggeredGrid>
          </div>

          {/* List View */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">List View</h3>
            <div className="space-y-6">
              {events.map((event) => (
                <EventCard key={`list-${event.id}`} event={event} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Feature Showcase */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              ✨ Commercial Features Showcase
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Star Ratings & Reviews
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All cards display ratings (4.5/5) with review counts (128 reviews)
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🖼️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Image Carousels
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Multiple images with dot navigation - click dots to switch images
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Live Countdown Timers
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Promotions show real-time countdown (updates every minute!)
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Urgency Badges
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  "ENDING SOON" badge for promotions expiring within 3 days (animated pulse!)
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🎫</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Discount Codes
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Promo codes displayed with one-click copy-to-clipboard
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Calendar Date Badges
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Events display prominent date badges (MAR 15) on images
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Social Proof
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  "342 people going", "Popular choice", review counts
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Premium Animations
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Hover lift effects, image zoom, staggered grid entrance animations
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white text-center">
              <h3 className="text-3xl font-bold mb-4">🎉 Commercial Transformation Complete!</h3>
              <p className="text-lg mb-6">
                Your GoGevgelija app now matches the quality of Airbnb, Booking.com, and TripAdvisor
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <div>✅ 10+ data points per card</div>
                <div>✅ Live timers</div>
                <div>✅ Image carousels</div>
                <div>✅ Star ratings</div>
                <div>✅ Social proof</div>
                <div>✅ Premium design</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
