'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@/types';
import { Heart, Calendar, MapPin, Users, Clock, Star, Award, TrendingUp, Ticket } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
  variant?: 'grid' | 'list';
  showDetails?: boolean;
}

export function EventCard({ event, variant = 'grid', showDetails = true }: EventCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [imageIndex, setImageIndex] = useState(0);
  const inWishlist = isInWishlist('event', event.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      await removeFromWishlist({ item_type: 'event', item_id: event.id });
    } else {
      await addToWishlist({ item_type: 'event', item_id: event.id });
    }
  };

  // Get multiple images for carousel
  const images = event.images && event.images.length > 0
    ? event.images
    : [event.thumbnail_image || event.image_medium || event.image || event.cover_image || '/placeholder.jpg'];

  // Mock rating for events
  const ratingValue = typeof event.rating === 'number' ? event.rating : Number(event.rating);
  const rating = Number.isFinite(ratingValue) ? ratingValue : 4.7;
  const reviewCount = event.join_count || 89;

  // Parse date to get month and day
  const eventDate = event.date_time ? new Date(event.date_time) : null;
  const monthShort = eventDate ? eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : '';
  const day = eventDate ? eventDate.getDate() : '';

  if (variant === 'list') {
    return (
      <Link href={`/events/${event.id}`}>
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
                  alt={event.title}
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

                {/* Date Badge */}
                {eventDate && (
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-center min-w-[60px]">
                    <div className="text-xs font-bold text-primary uppercase">{monthShort}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{day}</div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {event.featured && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      FEATURED
                    </div>
                  )}
                  {event.trending && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      TRENDING
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={handleWishlistToggle}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
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
              {/* Category */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {event.category?.name || 'Event'}
                </span>
                {event.entry_price && (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                    <Ticket className="w-3 h-3" />
                    {event.entry_price}
                  </span>
                )}
              </div>

              {/* Title & Rating */}
              <div className="mb-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              {event.date_time && (
                <div className="flex items-start gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.date_time}</p>
                </div>
              )}

              {/* Location */}
              {event.location && (
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.location}</p>
                </div>
              )}

              {/* Description */}
              {event.description && (
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                  {event.description}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">{event.join_count || 0}</span>
                  <span>people going</span>
                </div>

                <button className="text-primary font-semibold text-sm hover:underline">
                  View Event →
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
    <Link href={`/events/${event.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={images[imageIndex]}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradient */}
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

          {/* Date Badge */}
          {eventDate && (
            <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-center min-w-[50px] z-10">
              <div className="text-xs font-bold text-primary uppercase">{monthShort}</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{day}</div>
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {event.featured && (
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                ⭐ FEATURED
              </div>
            )}
            {event.trending && (
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-lg">
                🔥 TRENDING
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
          >
            <Heart
              className={`w-4 h-4 ${
                inWishlist
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Price */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {event.category?.name || 'Event'}
            </span>
            {event.entry_price && (
              <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                <Ticket className="w-3 h-3" />
                {event.entry_price}
              </span>
            )}
          </div>

          {/* Title & Rating */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-sm text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>

          {/* Date & Time */}
          {event.date_time && (
            <div className="flex items-start gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{event.date_time}</p>
            </div>
          )}

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{event.location}</p>
            </div>
          )}

          {/* Description */}
          {showDetails && event.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {event.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <Users className="w-3.5 h-3.5" />
              <span className="font-semibold">{event.join_count || 0}</span>
              <span>going</span>
            </div>
            <span className="text-sm font-semibold text-primary group-hover:underline">
              View Event →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
