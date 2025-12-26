'use client';

import { useQuery } from '@tanstack/react-query';
import { listingService, eventService, promotionService, blogService } from '@/lib/api/services';
import { ListingCard } from '@/components/cards/ListingCard';
import { EventCard } from '@/components/cards/EventCard';
import { PromotionCard } from '@/components/cards/PromotionCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryCard } from '@/components/home/CategoryCard';
import { TrustBadges } from '@/components/home/TrustBadges';
import { StaggeredGrid, StaggeredGridItem } from '@/components/animations/StaggeredGrid';
import { FadeIn } from '@/components/animations/FadeIn';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { ArrowRight, Loader2, UtensilsCrossed, Hotel, Palmtree, Calendar, ShoppingBag, Music } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const { user, authed, isGuest } = useAuth();

  // Category cards data
  const categories = [
    {
      title: 'Restaurants',
      description: 'Discover the best dining experiences in Gevgelija',
      icon: UtensilsCrossed,
      href: '/search?category=restaurants',
      count: 120,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    },
    {
      title: 'Hotels',
      description: 'Find your perfect accommodation',
      icon: Hotel,
      href: '/search?category=hotels',
      count: 45,
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
    {
      title: 'Attractions',
      description: 'Explore amazing places and activities',
      icon: Palmtree,
      href: '/search?category=attractions',
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
      href: '/search?category=shopping',
      count: 60,
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
      title: 'Nightlife',
      description: 'Experience the vibrant nightlife',
      icon: Music,
      href: '/search?category=nightlife',
      count: 35,
      gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    },
  ];

  // Fetch featured listings
  const { data: featuredListings, isLoading: listingsLoading } = useQuery({
    queryKey: ['listings', 'featured'],
    queryFn: () => listingService.getFeatured(),
  });

  // Fetch featured events
  const { data: featuredEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['events', 'featured'],
    queryFn: () => eventService.getFeatured(),
  });

  // Fetch featured promotions
  const { data: featuredPromotions, isLoading: promotionsLoading } = useQuery({
    queryKey: ['promotions', 'featured'],
    queryFn: () => promotionService.getFeatured(),
  });

  // Fetch featured blogs
  const { data: featuredBlogs, isLoading: blogsLoading } = useQuery({
    queryKey: ['blogs', 'featured'],
    queryFn: () => blogService.getFeatured(),
  });

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.greeting.morning');
    if (hour < 18) return t('home.greeting.afternoon');
    return t('home.greeting.evening');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Premium Hero Section */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=1920&q=80"
        title={authed && user ? `Welcome back, ${user.username || user.email}!` : "Discover Amazing Places in Gevgelija"}
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
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Featured Places
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Hand-picked by our team
                </p>
              </div>
              <Link
                href="/search"
                className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {listingsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredListings && featuredListings.length > 0 ? (
            <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredListings.slice(0, 8).map((listing) => (
                <StaggeredGridItem key={listing.id}>
                  <ListingCard listing={listing} variant="grid" />
                </StaggeredGridItem>
              ))}
            </StaggeredGrid>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <p>No featured listings available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Upcoming Events
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Join the excitement
                </p>
              </div>
              <Link
                href="/events"
                className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {eventsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredEvents && featuredEvents.length > 0 ? (
            <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.slice(0, 4).map((event) => (
                <StaggeredGridItem key={event.id}>
                  <EventCard event={event} variant="grid" />
                </StaggeredGridItem>
              ))}
            </StaggeredGrid>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <p>No upcoming events at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  <span className="gradient-text">🔥 Hot Deals</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Limited time offers - don't miss out!
                </p>
              </div>
              <Link
                href="/promotions"
                className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {promotionsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredPromotions && featuredPromotions.length > 0 ? (
            <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPromotions.slice(0, 4).map((promotion) => (
                <StaggeredGridItem key={promotion.id}>
                  <PromotionCard promotion={promotion} variant="grid" />
                </StaggeredGridItem>
              ))}
            </StaggeredGrid>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <p>No promotions available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Latest Articles
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Stories and guides from Gevgelija
                </p>
              </div>
              <Link
                href="/blogs"
                className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {blogsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredBlogs && featuredBlogs.length > 0 ? (
            <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.slice(0, 3).map((blog) => (
                <StaggeredGridItem key={blog.id}>
                  <BlogCard blog={blog} />
                </StaggeredGridItem>
              ))}
            </StaggeredGrid>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <p>No articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />
    </div>
  );
}
