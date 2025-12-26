import { MetadataRoute } from 'next';
import { listingService, eventService, promotionService, blogService } from '@/lib/api/services';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gogevgelija.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all content in parallel
    const [listings, events, promotions, blogs] = await Promise.all([
      listingService.getAll().catch(() => []),
      eventService.getAll().catch(() => []),
      promotionService.getAll().catch(() => []),
      blogService.getAll().catch(() => []),
    ]);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/listings`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/events`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/promotions`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/blogs`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/search`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ];

    // Listing pages
    const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
      url: `${BASE_URL}/listings/${listing.id}`,
      lastModified: new Date(listing.updated_at || listing.created_at),
      changeFrequency: 'weekly' as const,
      priority: listing.featured ? 0.8 : 0.7,
    }));

    // Event pages
    const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
      url: `${BASE_URL}/events/${event.id}`,
      lastModified: new Date(event.updated_at || event.created_at),
      changeFrequency: 'weekly' as const,
      priority: event.featured ? 0.8 : 0.7,
    }));

    // Promotion pages
    const promotionPages: MetadataRoute.Sitemap = promotions.map((promotion) => ({
      url: `${BASE_URL}/promotions/${promotion.id}`,
      lastModified: new Date(promotion.updated_at || promotion.created_at),
      changeFrequency: 'weekly' as const,
      priority: promotion.featured ? 0.7 : 0.6,
    }));

    // Blog pages
    const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${BASE_URL}/blogs/${blog.id}`,
      lastModified: new Date(blog.updated_at || blog.created_at),
      changeFrequency: 'monthly' as const,
      priority: blog.featured ? 0.7 : 0.6,
    }));

    return [...staticPages, ...listingPages, ...eventPages, ...promotionPages, ...blogPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if API fails
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
