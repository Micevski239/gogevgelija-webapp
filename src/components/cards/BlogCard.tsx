'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types';
import { Heart, Clock, User, Calendar } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { format } from 'date-fns';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist('blog', blog.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      await removeFromWishlist({ item_type: 'blog', item_id: blog.id });
    } else {
      await addToWishlist({ item_type: 'blog', item_id: blog.id });
    }
  };

  const imageUrl = blog.thumbnail_image || blog.image_medium || blog.image || blog.cover_image || '/placeholder.jpg';

  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card className="group overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-light-surface dark:bg-dark-surface">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-md z-10"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`h-4 w-4 ${
                inWishlist
                  ? 'fill-primary text-primary'
                  : 'text-light-text-secondary dark:text-dark-text-secondary'
              }`}
            />
          </button>

          {/* Featured Badge */}
          {blog.featured && (
            <div className="absolute top-2 left-2 px-2 py-1 rounded-sm bg-primary text-white text-xs font-semibold shadow-md">
              FEATURED
            </div>
          )}

          {/* Category Badge */}
          {blog.category && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="text-xs">
                {blog.category}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-1 line-clamp-2">
            {blog.title}
          </h3>

          {/* Subtitle */}
          {blog.subtitle && (
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2 mb-2">
              {blog.subtitle}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-light-text-secondary dark:text-dark-text-secondary">
            {/* Author */}
            {blog.author && (
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>{blog.author}</span>
              </div>
            )}

            {/* Read Time */}
            {blog.read_time_minutes && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{blog.read_time_minutes} min read</span>
              </div>
            )}

            {/* Date */}
            {blog.created_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(blog.created_at), 'MMM dd, yyyy')}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
