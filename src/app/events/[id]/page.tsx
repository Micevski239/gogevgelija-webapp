'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '@/lib/api/services';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Phone, Globe, Facebook, Instagram, Calendar, Clock, ChevronLeft, Users, DollarSign, ExternalLink, Download } from 'lucide-react';
import { WishlistButton } from '@/components/common/WishlistButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { format } from 'date-fns';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function EventDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const { showToast } = useToast();
  const { authed } = useAuth();
  const queryClient = useQueryClient();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getById(id),
  });

  const joinMutation = useMutation({
    mutationFn: () => eventService.join(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      showToast('Successfully joined the event!', 'success');
    },
    onError: () => {
      showToast('Failed to join event', 'error');
    },
  });

  const unjoinMutation = useMutation({
    mutationFn: () => eventService.unjoin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      showToast('You have left the event', 'info');
    },
    onError: () => {
      showToast('Failed to leave event', 'error');
    },
  });

  const handleJoinToggle = () => {
    if (!authed) {
      showToast('Please login to join events', 'warning');
      return;
    }

    if (event?.has_joined) {
      unjoinMutation.mutate();
    } else {
      joinMutation.mutate();
    }
  };

  const downloadCalendar = () => {
    if (!event) return;

    // Create iCal format
    const eventDate = new Date(event.date_time);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // +2 hours

    const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GoGevgelija//Event//EN
BEGIN:VEVENT
UID:event-${event.id}@gogevgelija.com
DTSTAMP:${formatDateForICal(new Date())}
DTSTART:${formatDateForICal(eventDate)}
DTEND:${formatDateForICal(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ical], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Calendar event downloaded', 'success');
  };

  const formatDateForICal = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/events" className="text-primary hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const images = event.images || [event.image || event.cover_image].filter(Boolean);
  const lightboxSlides = images.map((img) => ({ src: img }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/events"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-96 bg-gray-200 dark:bg-gray-700">
        {images[0] && (
          <Image
            src={images[0]}
            alt={event.title}
            fill
            className="object-cover cursor-pointer"
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
            priority
          />
        )}

        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="text-sm">Featured Event</Badge>
          </div>
        )}

        {images.length > 1 && (
          <button
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
            className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
          >
            View all {images.length} photos
          </button>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {event.category && (
                    <Badge variant="secondary" className="mb-2">
                      {event.category.name}
                    </Badge>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {event.title}
                  </h1>
                </div>
                <WishlistButton
                  itemType="event"
                  itemId={event.id}
                  itemData={event}
                  showLabel
                  className="ml-4"
                />
              </div>

              {/* Event Meta */}
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{format(new Date(event.date_time), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{format(new Date(event.date_time), 'hh:mm a')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
                {event.join_count > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{event.join_count} attending</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {event.description}
              </p>
            </Card>

            {/* Expectations */}
            {event.expectations && event.expectations.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.expectations.map((expectation, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <span className="text-2xl">{expectation.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{expectation.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Additional Info */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="space-y-3">
                {event.entry_price && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Entry Price</p>
                      <p className="text-gray-600 dark:text-gray-400">{event.entry_price}</p>
                    </div>
                  </div>
                )}
                {event.age_limit && (
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Age Limit</p>
                      <p className="text-gray-600 dark:text-gray-400">{event.age_limit}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="p-6 sticky top-4">
              <div className="space-y-3">
                {event.show_join_button && (
                  <Button
                    onClick={handleJoinToggle}
                    disabled={joinMutation.isPending || unjoinMutation.isPending}
                    className="w-full"
                    variant={event.has_joined ? 'outline' : 'default'}
                  >
                    {event.has_joined ? 'Leave Event' : 'Join Event'}
                  </Button>
                )}

                <Button
                  onClick={downloadCalendar}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>

              {/* Contact Info */}
              {(event.phone_number || event.website_url || event.facebook_url || event.instagram_url) && (
                <>
                  <div className="border-t my-4" />
                  <h3 className="font-bold mb-3">Contact Organizer</h3>
                  <div className="space-y-2">
                    {event.phone_number && (
                      <a
                        href={`tel:${event.phone_number}`}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                      >
                        <Phone className="h-4 w-4" />
                        {event.phone_number}
                      </a>
                    )}
                    {event.website_url && (
                      <a
                        href={event.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    )}
                    {event.facebook_url && (
                      <a
                        href={event.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </a>
                    )}
                    {event.instagram_url && (
                      <a
                        href={event.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                      >
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    )}
                  </div>
                </>
              )}

              {/* Location */}
              {event.google_maps_url && (
                <>
                  <div className="border-t my-4" />
                  <a
                    href={event.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 bg-primary text-white rounded-lg text-center hover:bg-primary/90 transition-colors font-semibold"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-5 w-5" />
                      View Location
                    </div>
                  </a>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </div>
  );
}
