'use client';

import { useQuery } from '@tanstack/react-query';
import { listingService } from '@/lib/api/services';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Phone, Globe, Facebook, Instagram, Clock, ChevronLeft, ExternalLink } from 'lucide-react';
import { WishlistButton } from '@/components/common/WishlistButton';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function ListingDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: listing, isLoading, error } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <Link href="/listings" className="text-primary hover:underline">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const images = listing.images || [listing.image];
  const lightboxSlides = images.map((img) => ({ src: img }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/listings" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
            Back to Listings
          </Link>
        </div>
      </div>

      <div className="relative h-96 bg-gray-200 dark:bg-gray-700">
        <Image src={images[0]} alt={listing.title} fill className="object-cover cursor-pointer" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} priority />
        {images.length > 1 && (
          <button onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors">
            View all {images.length} photos
          </button>
        )}
        {listing.show_open_status && (
          <div className="absolute top-4 left-4">
            {listing.is_open ? <Badge variant="success" className="text-sm">Open Now</Badge> : <Badge variant="destructive" className="text-sm">Closed</Badge>}
          </div>
        )}
        {listing.featured && <div className="absolute top-4 right-4"><Badge className="text-sm">Featured</Badge></div>}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {listing.category && <Badge variant="secondary" className="mb-2">{listing.category.name}</Badge>}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{listing.title}</h1>
                </div>
                <WishlistButton itemType="listing" itemId={listing.id} itemData={listing} showLabel className="ml-4" />
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>{listing.address}</span>
              </div>
            </div>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{listing.description}</p>
            </Card>

            {listing.amenities && listing.amenities.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">{listing.amenities_title || 'Amenities'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.amenities.map((amenity, idx) => {
                    const text = typeof amenity === 'string' ? amenity : amenity.text;
                    const icon = typeof amenity === 'object' ? amenity.icon : null;
                    return (
                      <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        {icon && <span className="text-xl">{icon}</span>}
                        <span>{text}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {listing.working_hours && Object.keys(listing.working_hours).length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  Working Hours
                </h2>
                <div className="space-y-2">
                  {Object.entries(listing.working_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span className="font-medium capitalize text-gray-900 dark:text-white">{day}</span>
                      <span className="text-gray-600 dark:text-gray-400">{hours}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {listing.phone_number && (
                  <a href={`tel:${listing.phone_number}`} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Phone className="h-5 w-5" />
                    <span>{listing.phone_number}</span>
                  </a>
                )}
                {listing.website_url && (
                  <a href={listing.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Globe className="h-5 w-5" />
                    <span className="flex items-center gap-1">Website <ExternalLink className="h-3 w-3" /></span>
                  </a>
                )}
                {listing.facebook_url && (
                  <a href={listing.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Facebook className="h-5 w-5" />
                    <span className="flex items-center gap-1">Facebook <ExternalLink className="h-3 w-3" /></span>
                  </a>
                )}
                {listing.instagram_url && (
                  <a href={listing.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Instagram className="h-5 w-5" />
                    <span className="flex items-center gap-1">Instagram <ExternalLink className="h-3 w-3" /></span>
                  </a>
                )}
              </div>
              {listing.google_maps_url && (
                <a href={listing.google_maps_url} target="_blank" rel="noopener noreferrer" className="block mt-6 px-4 py-3 bg-primary text-white rounded-lg text-center hover:bg-primary/90 transition-colors font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-5 w-5" />
                    View on Google Maps
                  </div>
                </a>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={lightboxSlides} index={lightboxIndex} />
    </div>
  );
}
