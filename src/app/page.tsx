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

  // Category cards data - Gevgelija-specific experiences
  const categories = [
    {
      title: 'Traditional Grill Houses',
      description: 'Family-run restaurants serving authentic Macedonian barbecue—from pleskavica to tavče gravče',
      icon: UtensilsCrossed,
      href: '/search?category=restaurants',
      count: 127,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    },
    {
      title: 'Boutique Hotels & Spas',
      description: 'Where the Vardar meets luxury—riverside retreats with thermal springs and mountain views',
      icon: Hotel,
      href: '/search?category=hotels',
      count: 48,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    },
    {
      title: 'Hidden Gems & Nature',
      description: 'Riverside parks, ancient sites, and hiking trails just outside the city center',
      icon: Palmtree,
      href: '/search?category=attractions',
      count: 83,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    },
    {
      title: 'Cultural Events',
      description: 'Wine festivals, folk music nights, and seasonal celebrations throughout the year',
      icon: Calendar,
      href: '/events',
      count: 29,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    },
    {
      title: 'Border Markets & Shops',
      description: 'Everything from local crafts to international goods at Greece\'s doorstep',
      icon: ShoppingBag,
      href: '/search?category=shopping',
      count: 64,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    },
    {
      title: 'Evening Entertainment',
      description: 'Riverside bars, live music venues, and late-night spots where locals gather',
      icon: Music,
      href: '/search?category=nightlife',
      count: 38,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
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
        backgroundImage="/images/hero-bg.jpg"
        title={authed && user ? `Welcome back, ${user.username || user.email}!` : "Your Gateway to Gevgelija"}
        subtitle={authed && user ? "Let's find something incredible today" : "From the bustling border markets to hidden vineyard terraces—everything that makes this city extraordinary"}
        showSearch={true}
        showStats={true}
      />

      {/* Categories Section */}
      <section className="py-20 container mx-auto px-4">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">
              Start Your Gevgelija Journey
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Whether you're here for a day trip from Greece or planning an extended stay, we've mapped out the best of everything
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
      <section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                  Places Worth Your Time
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                  Curated by locals who know every street, every chef, and every hidden corner
                </p>
              </div>
              <Link
                href="/search"
                className="text-primary hover:text-primary-dark font-bold text-lg flex items-center gap-2 transition-all group"
              >
                Browse everything <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">New places are being added weekly. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                  What's Happening This Month
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                  Wine tastings, folk festivals, live music—see what locals and visitors are talking about
                </p>
              </div>
              <Link
                href="/events"
                className="text-primary hover:text-primary-dark font-bold text-lg flex items-center gap-2 transition-all group"
              >
                Full calendar <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">Event season kicks off in spring. We're updating the calendar daily.</p>
            </div>
          )}
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
                  <span className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Exclusive Deals Right Now
                  </span>
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                  Special offers from Gevgelija's top spots—savings you won't find anywhere else
                </p>
              </div>
              <Link
                href="/promotions"
                className="text-primary hover:text-primary-dark font-bold text-lg flex items-center gap-2 transition-all group"
              >
                See all deals <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">Fresh deals coming every week. Follow us to get notified first.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                  Stories from the City
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                  Deep dives into local culture, food traditions, and insider tips from those who call Gevgelija home
                </p>
              </div>
              <Link
                href="/blogs"
                className="text-primary hover:text-primary-dark font-bold text-lg flex items-center gap-2 transition-all group"
              >
                Read more <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">Our editorial team is preparing stories about Gevgelija's best-kept secrets.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />
    </div>
  );
}
