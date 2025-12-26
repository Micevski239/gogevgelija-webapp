# Remaining Implementation Guide

## ✅ COMPLETED (Priorities 1-4 - 60% of project)

### Infrastructure & Foundation
- Complete API integration (40+ endpoints)
- Authentication with JWT
- Zod validation schemas
- All React Contexts (Auth, Wishlist, Language, Toast)
- Complete shadcn/ui component library
- Layout components (Header, Footer)
- All card components (Listing, Event, Promotion, Blog, Category)
- Homepage with all sections

---

## 🚧 REMAINING WORK (Priorities 5-9 - 40% of project)

### Priority 5: Detail Pages (Critical - 2-3 days)

#### Listing Detail Page (`/Users/filipmicevski/Desktop/GoGevgelija/Web/src/app/listings/[id]/page.tsx`)

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { listingService } from '@/lib/api/services';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Phone, Globe, Facebook, Instagram, Clock, ChevronLeft } from 'lucide-react';
import { WishlistButton } from '@/components/common/WishlistButton';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';

export default function ListingDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getById(id),
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>;
  if (!listing) return <div className="container mx-auto px-4 py-12"><p>Listing not found</p></div>;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/listings" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-5 w-5" />
          Back to Listings
        </Link>
      </div>

      {/* Image Gallery (use yet-another-react-lightbox) */}
      <div className="relative h-96 bg-gray-200">
        {listing.images && listing.images.length > 0 ? (
          <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
        ) : (
          <Image src={listing.image} alt={listing.title} fill className="object-cover" />
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                {listing.category && <Badge>{listing.category.name}</Badge>}
                <h1 className="text-3xl font-bold mt-2">{listing.title}</h1>
              </div>
              <WishlistButton itemType="listing" itemId={listing.id} itemData={listing} showLabel />
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="h-5 w-5" />
              <span>{listing.address}</span>
            </div>

            <div className="prose max-w-none mb-8">
              <p>{listing.description}</p>
            </div>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{listing.amenities_title || 'Amenities'}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {typeof amenity === 'object' && amenity.icon && <span>{amenity.icon}</span>}
                      <span>{typeof amenity === 'string' ? amenity : amenity.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Working Hours */}
            {listing.working_hours && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Working Hours</h2>
                <div className="space-y-2">
                  {Object.entries(listing.working_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium capitalize">{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-3">
                {listing.phone_number && (
                  <a href={`tel:${listing.phone_number}`} className="flex items-center gap-3 hover:text-primary">
                    <Phone className="h-5 w-5" />
                    <span>{listing.phone_number}</span>
                  </a>
                )}
                {listing.website_url && (
                  <a href={listing.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary">
                    <Globe className="h-5 w-5" />
                    <span>Website</span>
                  </a>
                )}
                {listing.facebook_url && (
                  <a href={listing.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary">
                    <Facebook className="h-5 w-5" />
                    <span>Facebook</span>
                  </a>
                )}
                {listing.instagram_url && (
                  <a href={listing.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary">
                    <Instagram className="h-5 w-5" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>

              {/* Map (add Google Maps iframe or use a library) */}
              {listing.google_maps_url && (
                <a
                  href={listing.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 px-4 py-2 bg-primary text-white rounded-lg text-center hover:bg-primary/90"
                >
                  View on Map
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Repeat similar pattern for:**
- Event Detail (`/app/events/[id]/page.tsx`) - Add join button, calendar export (.ics)
- Promotion Detail (`/app/promotions/[id]/page.tsx`) - Add discount code copy button
- Blog Detail (`/app/blogs/[id]/page.tsx`) - Rich content rendering

---

### Priority 6: Browse & Search Pages (2-3 days)

#### Browse Pages Pattern

Create these pages with filters, sort, and pagination:
- `/app/listings/page.tsx`
- `/app/events/page.tsx`
- `/app/promotions/page.tsx`
- `/app/blogs/page.tsx`

**Template:**
```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { listingService } from '@/lib/api/services';
import { ListingCard } from '@/components/cards/ListingCard';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

export default function ListingsPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['listings', page, category, sortBy],
    queryFn: () => listingService.getPage(page, 20, { category }),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select
          options={[
            { value: '', label: 'All Categories' },
            { value: 'restaurants', label: 'Restaurants' },
            // ...
          ]}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Select
          options={[
            { value: 'featured', label: 'Featured' },
            { value: 'trending', label: 'Trending' },
            { value: 'newest', label: 'Newest' },
          ]}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={!data?.previous}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={!data?.next}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

#### Search Page (`/app/search/page.tsx`)

Use global search with tabs for different content types.

---

### Priority 7: User Features (2-3 days)

#### Auth Pages

**Login Page (`/app/login/page.tsx`):**
- Email input
- "Send Code" button → calls API
- Code input (6 digits)
- "Verify & Login" button
- "Continue as Guest" option

**Register Page (`/app/register/page.tsx`):**
- Name + Email inputs
- "Send Code" button
- Code verification
- Auto-login after registration

#### Wishlist Page (`/app/wishlist/page.tsx`)

Display all wishlist items in a grid with remove buttons.

#### Profile Page (`/app/profile/page.tsx`)

- View/edit username
- Avatar selector
- Language preference
- Logout button

---

### Priority 8: i18n Setup (1-2 days)

**Already 80% complete** - you have LanguageContext with basic translations.

**To complete:**
1. Expand translation files in `LanguageContext.tsx` or create separate JSON files
2. Add all missing keys for detail pages, error messages, etc.
3. Ensure API sends localized content via `Accept-Language` header (already implemented)

---

### Priority 9: SEO & Performance (2-3 days)

#### Add Metadata to All Pages

```tsx
// In each page.tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = await listingService.getById(parseInt(params.id));

  return {
    title: `${listing.title} | GoGevgelija`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.image],
    },
  };
}
```

#### Sitemap (`/app/sitemap.ts`)

```ts
export default async function sitemap() {
  const listings = await listingService.getAll();
  // ... generate sitemap
}
```

#### Performance
- Already using Next.js Image component ✅
- React Query caching ✅
- Add loading skeletons for better UX

---

## 📊 FINAL STATUS

**Completed:** 60%
**Remaining:** 40%

**Estimated Time to Complete:**
- Priority 5 (Detail Pages): 2-3 days
- Priority 6 (Browse/Search): 2-3 days
- Priority 7 (User Features): 2-3 days
- Priority 8 (i18n): 1-2 days
- Priority 9 (SEO): 2-3 days

**Total:** 9-14 days to production-ready

---

## 🚀 Quick Wins to Launch MVP

If you need to launch quickly, prioritize:
1. ✅ Homepage (done)
2. Detail pages for Listings & Events
3. Login page
4. Search page
5. Basic SEO

This gets you a functional app in 3-5 days.

---

## 📝 Notes

- All infrastructure is solid and production-ready
- API client handles all error cases
- Authentication is fully implemented
- Just need to build the remaining UI pages using the patterns shown above

**You can copy-paste the code templates above and adapt them for each page type.**
