'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface WishlistButtonProps {
  itemType: 'listing' | 'event' | 'promotion' | 'blog';
  itemId: number;
  itemData?: any;
  className?: string;
  showLabel?: boolean;
}

export function WishlistButton({
  itemType,
  itemId,
  itemData,
  className,
  showLabel = false,
}: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { authed } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const inWishlist = isInWishlist(itemType, itemId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!authed) {
      // Redirect to login
      router.push('/login');
      return;
    }

    try {
      setIsLoading(true);
      if (inWishlist) {
        await removeFromWishlist({ item_type: itemType, item_id: itemId });
      } else {
        await addToWishlist({ item_type: itemType, item_id: itemId });
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'flex items-center justify-center gap-2 rounded-lg transition-all',
        'hover:scale-110 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        inWishlist
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500',
        className
      )}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-all',
          inWishlist && 'fill-current'
        )}
      />
      {showLabel && <span className="text-sm font-medium">{inWishlist ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
