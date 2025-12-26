'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  count?: number;
  gradient: string;
  iconColor?: string;
}

export function CategoryCard({
  title,
  description,
  icon: Icon,
  href,
  count,
  gradient,
  iconColor = 'text-white',
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-full"
      >
        {/* Card Container */}
        <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Gradient Background */}
          <div className={`h-32 ${gradient} relative overflow-hidden`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 -left-4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 -right-4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl"
              >
                <Icon className={`w-8 h-8 ${iconColor}`} />
              </motion.div>
            </div>

            {/* Count Badge */}
            {count !== undefined && (
              <div className="absolute top-3 right-3">
                <div className="px-3 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {count}+ places
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {description}
            </p>

            {/* CTA */}
            <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Explore</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </div>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all pointer-events-none" />
        </div>
      </motion.div>
    </Link>
  );
}
