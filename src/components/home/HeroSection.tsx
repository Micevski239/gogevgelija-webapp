'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Star, TrendingUp, Award, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showStats?: boolean;
}

export function HeroSection({
  backgroundImage = '/hero-bg.jpg',
  title = 'Your Gateway to Gevgelija',
  subtitle = 'From the bustling border markets to hidden vineyard terraces—everything that makes this city extraordinary',
  showSearch = true,
  showStats = true,
}: HeroSectionProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    router.push(`/listings?${params.toString()}`);
  };

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'restaurants', label: 'Restaurants' },
    { value: 'hotels', label: 'Hotels' },
    { value: 'attractions', label: 'Attractions' },
    { value: 'events', label: 'Events' },
  ];

  const stats = [
    { icon: Building2, value: '500+', label: 'Listings' },
    { icon: Star, value: '4.8', label: 'Average Rating' },
    { icon: Users, value: '10K+', label: 'Happy Visitors' },
    { icon: Award, value: '100%', label: 'Verified' },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        {/* Light Shadow Overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Search Box */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <label htmlFor="search" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Find your next adventure
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      id="search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Try 'river views' or 'traditional grill'..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Category Selector */}
                <div className="md:w-64">
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:self-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>

              {/* Quick Search Tags */}
              <div className="mt-5 flex flex-wrap gap-2.5 items-center">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Trending now:</span>
                {['Border Markets', 'Local Grill Houses', 'Spa Resorts', 'Vardar River Views', 'Wine Tastings'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-1.5 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        )}

        {/* Stats Section */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-200">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm md:text-base font-medium">Every venue personally verified</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full" />
            <div className="flex items-center gap-2.5">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-sm md:text-base font-medium">4.8 stars from real locals & visitors</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full" />
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base font-medium">Updated daily by our team</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
    </div>
  );
}
