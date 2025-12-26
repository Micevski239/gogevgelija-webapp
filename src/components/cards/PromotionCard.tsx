'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Promotion } from '@/types';
import { Heart, Tag, Calendar, Clock, Star, Award, TrendingUp, Percent, Copy, AlertCircle } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface PromotionCardProps {
  promotion: Promotion;
  variant?: 'grid' | 'list';
  showDetails?: boolean;
}

export function PromotionCard({ promotion, variant = 'grid', showDetails = true }: PromotionCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [imageIndex, setImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const inWishlist = isInWishlist('promotion', promotion.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      await removeFromWishlist({ item_type: 'promotion', item_id: promotion.id });
    } else {
      await addToWishlist({ item_type: 'promotion', item_id: promotion.id });
    }
  };

  // Get multiple images for carousel
  const images = promotion.images && promotion.images.length > 0
    ? promotion.images
    : [promotion.thumbnail_image || promotion.image_medium || promotion.image || '/placeholder.jpg'];

  const isExpired = promotion.valid_until ? new Date(promotion.valid_until) < new Date() : false;

  // Calculate time remaining
  useEffect(() => {
    if (!promotion.valid_until || isExpired) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(promotion.valid_until!);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m left`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [promotion.valid_until, isExpired]);

  // Mock discount percentage (can be parsed from description or API)
  const discountPercent = promotion.discount_percent || 25;
  const rating = 4.6;
  const reviewCount = 156;

  // Check if ending soon (less than 3 days)
  const endingSoon = promotion.valid_until && !isExpired &&
    (new Date(promotion.valid_until).getTime() - new Date().getTime()) < (3 * 24 * 60 * 60 * 1000);

  if (variant === 'list') {
    return (
      <Link href={`/promotions/${promotion.id}`}>
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
                  alt={promotion.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="320px"
                />

                {/* Expired Overlay */}
                {isExpired && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                    <div className="text-center">
                      <div className="px-6 py-3 rounded-full bg-gray-800 text-white text-lg font-bold">
                        EXPIRED
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Discount Badge */}
                {!isExpired && (
                  <div className="absolute top-4 left-4 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl shadow-2xl p-3 min-w-[70px] text-center">
                    <div className="text-3xl font-bold leading-none">{discountPercent}%</div>
                    <div className="text-xs font-semibold uppercase mt-1">OFF</div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {promotion.featured && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      FEATURED
                    </div>
                  )}
                  {endingSoon && !isExpired && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
                      <Clock className="w-3 h-3" />
                      ENDING SOON
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
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {promotion.category?.name || 'Promotion'}
                  </span>
                </div>
                {promotion.has_discount_code && (
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    PROMO CODE
                  </div>
                )}
              </div>

              {/* Title & Rating */}
              <div className="mb-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {promotion.title}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {promotion.description && (
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                  {promotion.description}
                </p>
              )}

              {/* Discount Code Display */}
              {promotion.has_discount_code && promotion.discount_code && (
                <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-2 border-dashed border-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Promo Code:</div>
                      <div className="text-lg font-bold text-primary font-mono">{promotion.discount_code}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(promotion.discount_code || '');
                      }}
                      className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                {promotion.valid_until && !isExpired && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="text-xs text-gray-500">Expires in</div>
                      <div className="text-sm font-bold text-orange-600 dark:text-orange-400">{timeLeft}</div>
                    </div>
                  </div>
                )}

                <button className="text-primary font-semibold text-sm hover:underline ml-auto">
                  Get Deal →
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
    <Link href={`/promotions/${promotion.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={images[imageIndex]}
            alt={promotion.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Expired Overlay */}
          {isExpired && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
              <div className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm font-bold">
                EXPIRED
              </div>
            </div>
          )}

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

          {/* Discount Badge */}
          {!isExpired && (
            <div className="absolute top-3 left-3 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-lg shadow-2xl p-2 min-w-[60px] text-center z-10">
              <div className="text-2xl font-bold leading-none">{discountPercent}%</div>
              <div className="text-xs font-semibold uppercase">OFF</div>
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {promotion.featured && (
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                ⭐ FEATURED
              </div>
            )}
            {endingSoon && !isExpired && (
              <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold shadow-lg animate-pulse">
                🔥 ENDING SOON
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
          {/* Category & Code Badge */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {promotion.category?.name || 'Promotion'}
            </span>
            {promotion.has_discount_code && (
              <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                CODE
              </span>
            )}
          </div>

          {/* Title & Rating */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {promotion.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-sm text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>

          {/* Description */}
          {showDetails && promotion.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {promotion.description}
            </p>
          )}

          {/* Discount Code */}
          {promotion.has_discount_code && promotion.discount_code && (
            <div className="mb-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-dashed border-primary">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Code:</div>
              <div className="text-sm font-bold text-primary font-mono">{promotion.discount_code}</div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            {promotion.valid_until && !isExpired && (
              <div className="flex items-center gap-1 text-xs">
                <Clock className="w-3 h-3 text-orange-500" />
                <span className="font-semibold text-orange-600 dark:text-orange-400">{timeLeft}</span>
              </div>
            )}
            <span className="text-sm font-semibold text-primary group-hover:underline ml-auto">
              Get Deal →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
