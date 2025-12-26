'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/types';
import { Heart, MapPin, Star, Clock, DollarSign, Users, Wifi, Coffee, Award, TrendingUp } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ListingCardProps {
  listing: Listing;
  variant?: 'grid' | 'list';
  showDetails?: boolean;
}

export function ListingCard({ listing, variant = 'grid', showDetails = true }: ListingCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [imageIndex, setImageIndex] = useState(0);
  const inWishlist = isInWishlist('listing', listing.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      await removeFromWishlist({ item_type: 'listing', item_id: listing.id });
    } else {
      await addToWishlist({ item_type: 'listing', item_id: listing.id });
    }
  };

  // Get multiple images for carousel
  const images = listing.images && listing.images.length > 0
    ? listing.images
    : [listing.thumbnail_image || listing.image_medium || listing.image || '/placeholder.jpg'];

  // Mock rating (you can get this from API)
  const rating = listing.rating || 4.5;
  const reviewCount = 128; // Mock data
  const priceRange = '$$'; // Mock data

  // Parse amenities
  const amenities = Array.isArray(listing.amenities)
    ? listing.amenities.slice(0, 3)
    : [];

  const amenityIcons: Record<string, any> = {
    'wifi': Wifi,
    'parking': Coffee,
    'restaurant': Coffee,
    'bar': Coffee,
  };

  if (variant === 'list') {
    return (
      <Link href={`/listings/${listing.id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={images[imageIndex]}
                  alt={listing.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="320px"
                />

                {/* Image Carousel Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          setImageIndex(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === imageIndex
                            ? 'bg-white w-6'
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {listing.featured && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      FEATURED
                    </div>
                  )}
                  {listing.trending && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      TRENDING
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={handleWishlistToggle}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      inWishlist
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              {/* Category & Status */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {listing.category?.name || 'Listing'}
                </span>
                {listing.show_open_status && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    listing.is_open
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {listing.is_open ? 'Open Now' : 'Closed'}
                  </span>
                )}
              </div>

              {/* Title & Rating */}
              <div className="mb-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {listing.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{priceRange}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{listing.address}</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                {listing.description}
              </p>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  {amenities.map((amenity, idx) => {
                    const amenityText = typeof amenity === 'string' ? amenity : amenity.text;
                    const Icon = Wifi;
                    return (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <Icon className="w-4 h-4" />
                        <span>{amenityText}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {listing.working_hours && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Hours available</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Popular choice</span>
                  </div>
                </div>

                <button className="text-primary font-semibold text-sm hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link href={`/listings/${listing.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={images[imageIndex]}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Image Carousel Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setImageIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === imageIndex
                      ? 'bg-white w-6'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {listing.featured && (
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                ⭐ FEATURED
              </div>
            )}
            {listing.trending && (
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-lg">
                🔥 TRENDING
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
          >
            <Heart
              className={`w-4 h-4 ${
                inWishlist
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            />
          </button>

          {/* Open Status Badge */}
          {listing.show_open_status && (
            <div className="absolute bottom-3 right-3">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm ${
                listing.is_open
                  ? 'bg-green-500/90 text-white'
                  : 'bg-gray-800/90 text-white'
              }`}>
                {listing.is_open ? '• Open Now' : 'Closed'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {listing.category?.name || 'Listing'}
            </span>
            <span className="text-xs font-medium text-gray-500">{priceRange}</span>
          </div>

          {/* Title & Rating */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-sm text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{listing.address}</p>
          </div>

          {/* Description */}
          {showDetails && listing.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {listing.description}
            </p>
          )}

          {/* Amenities Preview */}
          {amenities.length > 0 && (
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
              {amenities.slice(0, 3).map((amenity, idx) => {
                const amenityText = typeof amenity === 'string' ? amenity : amenity.text;
                return (
                  <div key={idx} className="flex items-center gap-1 text-xs text-gray-500">
                    <Wifi className="w-3 h-3" />
                  </div>
                );
              })}
              {amenities.length > 3 && (
                <span className="text-xs text-gray-400">+{amenities.length - 3} more</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Popular
            </span>
            <span className="text-sm font-semibold text-primary group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
