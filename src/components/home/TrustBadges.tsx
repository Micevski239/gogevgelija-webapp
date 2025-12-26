'use client';

import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, Users, Star, TrendingUp, Heart, Verified } from 'lucide-react';

interface Badge {
  icon: any;
  title: string;
  description: string;
  color: string;
}

export function TrustBadges() {
  const badges: Badge[] = [
    {
      icon: Shield,
      title: '100% Verified',
      description: 'All listings are verified and authenticated',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: 'Average rating of 4.8/5 from 10,000+ reviews',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Join thousands of satisfied visitors',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in tourism',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Trust <span className="gradient-text">GoGevgelija</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your safety and satisfaction are our top priorities. Here's what makes us different.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Icon with Gradient Background */}
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${badge.color} shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Verified Listings</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4.8/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Visitors</div>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Certified & Recognized By</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 dark:opacity-40">
            {/* Placeholder for certification logos */}
            <div className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <Verified className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <Award className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <Shield className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <TrendingUp className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
