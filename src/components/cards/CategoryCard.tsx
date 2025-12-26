'use client';

import Link from 'next/link';
import { Category } from '@/types';
import { ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '@/lib/utils/cn';

interface CategoryCardProps {
  category: Category;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CategoryCard({ category, href, size = 'md' }: CategoryCardProps) {
  const linkHref = href || `/listings?category=${category.slug || category.id}`;

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const iconSizes = {
    sm: 'h-8 w-8 text-2xl',
    md: 'h-12 w-12 text-3xl',
    lg: 'h-16 w-16 text-4xl',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Link href={linkHref}>
      <Card
        className={cn(
          'group overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer h-full',
          'hover:border-primary',
          sizeClasses[size]
        )}
        style={{ borderColor: category.color ? `${category.color}20` : undefined }}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className={cn(
              'flex items-center justify-center rounded-lg flex-shrink-0',
              iconSizes[size]
            )}
            style={{
              backgroundColor: category.color ? `${category.color}15` : 'rgba(59, 130, 246, 0.1)',
              color: category.color || '#3b82f6',
            }}
          >
            {category.icon ? (
              <span className="font-bold">{category.icon}</span>
            ) : (
              <span className="font-bold text-xl">{category.name[0]}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'font-bold text-light-text dark:text-dark-text line-clamp-1 group-hover:text-primary transition-colors',
                textSizes[size]
              )}
            >
              {category.name}
            </h3>

            {category.description && size !== 'sm' && (
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-clamp-1 mt-0.5">
                {category.description}
              </p>
            )}

            {category.item_count !== undefined && category.item_count > 0 && (
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                {category.item_count} items
              </p>
            )}
          </div>

          {/* Arrow */}
          <ChevronRight className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </Card>
    </Link>
  );
}
