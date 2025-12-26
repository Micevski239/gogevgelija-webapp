# Demo Page Guide - Commercial Features Showcase

## How to View the Demo

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the demo page in your browser:**
   ```
   http://localhost:3000/demo
   ```

3. **What you'll see:**
   - Premium hero section with search
   - Category cards with gradients
   - Featured listings (Grid & List views)
   - Hot deals/promotions with countdown timers
   - Upcoming events with calendar badges
   - Trust badges section

---

## Mock Data Location

**File:** `/src/lib/mockData.ts`

Contains:
- ✅ **2 Listings** - Restaurant & Hotel with full commercial features
- ✅ **2 Events** - Wine Festival & Jazz Concert with ratings
- ✅ **2 Promotions** - One ending in 2 days (shows ENDING SOON badge), one ending in 15 days

---

## What to Test

### 1. **Image Carousels**
- Click the dots at the bottom of card images to switch between photos
- All cards have 3-4 images to showcase

### 2. **Live Countdown Timer** (Promotions)
- First promotion expires in ~2 days
- Watch the countdown update (refreshes every minute)
- Notice the animated "🔥 ENDING SOON" badge with pulse effect

### 3. **Discount Code Copy**
- Promotions show discount codes (e.g., "SPA50FLASH")
- Click the copy button to copy code to clipboard

### 4. **View Variants**
- See both Grid and List views for all card types
- List view shows more detailed information
- Grid view is more compact

### 5. **Hover Effects**
- Hover over cards to see lift animations (-8px)
- Images zoom to 110% on hover
- Category cards have rotating icons

### 6. **Ratings & Reviews**
- All cards display star ratings (4.5-4.9/5)
- Review counts shown (128-342 reviews)
- Social proof indicators ("Popular choice", "342 people going")

### 7. **Premium Badges**
- ⭐ FEATURED badges with gradient
- 🔥 TRENDING badges
- 🔥 ENDING SOON (animated pulse)
- Calendar date badges on events (MAR 15, JUN 20)
- Discount percentage badges (25% OFF, 50% OFF)

### 8. **Hero Section**
- Try the search functionality
- Click quick search tags
- View animated stats section
- Trust indicators at bottom

### 9. **Animations**
- Scroll down to see staggered grid entrance animations
- Cards appear one-by-one with smooth fade-in
- Hero section has entrance animation

---

## Mock Data Details

### Listing 1: Villa Dihovo Restaurant
- ⭐ Rating: 4.8/5
- 🏆 Featured & Trending
- 🟢 Open Now
- 📍 Full address with amenities
- 🖼️ 4 restaurant images
- 💰 Price range indicator

### Listing 2: Hotel Apollonia Spa & Resort
- ⭐ Rating: 4.9/5
- 🏆 Featured
- 🟢 Open 24/7
- 🏨 Luxury hotel with spa
- 🖼️ 4 hotel images
- 📋 6 amenities listed

### Event 1: Gevgelija Wine Festival
- ⭐ Rating: 4.7/5
- 👥 342 people going
- 🏆 Featured & Trending
- 📅 Date badge: MAY 15
- 🎫 Entry: 500 MKD
- 🖼️ 4 festival images

### Event 2: Summer Jazz Nights
- ⭐ Rating: 4.9/5
- 👥 156 people going
- 🏆 Featured
- 📅 Date badge: JUN 20
- 🎫 Entry: 800 MKD
- 🖼️ 3 concert images

### Promotion 1: Spa Flash Sale (⏰ ENDING SOON!)
- 💥 50% OFF
- ⏰ Expires in ~2 days (ENDING SOON badge!)
- 🎫 Code: SPA50FLASH
- 🏆 Featured & Trending
- 🖼️ 3 spa images
- ⏱️ Live countdown timer

### Promotion 2: Spring Dining Special
- 💥 25% OFF
- ⏰ Expires in ~15 days
- 🎫 Code: SPRING25
- 🏆 Featured
- 🖼️ 3 food images
- ⏱️ Live countdown timer

---

## Customizing Mock Data

Edit `/src/lib/mockData.ts` to:

1. **Change images** - Replace Unsplash URLs with your own
2. **Adjust ratings** - Change `rating` values (0-5)
3. **Modify countdown** - Change `valid_until` dates
4. **Add more items** - Duplicate objects and change IDs
5. **Update text** - Customize titles, descriptions, addresses

### Example: Make promotion expire in 1 hour
```typescript
valid_until: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
```

### Example: Add a third listing
```typescript
{
  id: 3,
  title: 'Your New Listing',
  // ... copy from existing listing and modify
}
```

---

## Features Demonstrated

### Information Density
- **Before:** 3-4 data points per card
- **After:** 10+ data points per card

### Commercial Elements
✅ Star ratings with review counts
✅ Price range indicators
✅ Image carousels with dots
✅ Premium gradient badges
✅ Live countdown timers
✅ Urgency indicators (ENDING SOON)
✅ Discount codes with copy button
✅ Calendar date badges
✅ Social proof (people going, popular)
✅ Amenities preview
✅ Open/Closed status
✅ Category tags

### Design Quality
✅ Smooth hover animations
✅ Image zoom effects
✅ Staggered grid entrances
✅ Gradient backgrounds
✅ Glassmorphism effects
✅ Dark mode support
✅ Responsive layouts
✅ Professional typography

---

## Next Steps

1. **View the demo** at http://localhost:3000/demo
2. **Test all features** - carousels, timers, hover effects
3. **Customize mock data** to match your needs
4. **Integrate into homepage** - Copy sections from demo page
5. **Connect to real API** - Replace mock data with API calls

---

## Files Reference

**Demo Page:**
- `/src/app/demo/page.tsx` - Full demo implementation

**Mock Data:**
- `/src/lib/mockData.ts` - 2 listings, 2 events, 2 promotions

**Components Used:**
- `/src/components/home/HeroSection.tsx`
- `/src/components/home/CategoryCard.tsx`
- `/src/components/home/TrustBadges.tsx`
- `/src/components/cards/ListingCard.tsx`
- `/src/components/cards/EventCard.tsx`
- `/src/components/cards/PromotionCard.tsx`
- `/src/components/animations/FadeIn.tsx`
- `/src/components/animations/StaggeredGrid.tsx`

**Documentation:**
- `COMMERCIAL_TRANSFORMATION_COMPLETE.md` - Full feature documentation
- `DEMO_GUIDE.md` - This file

---

## Tips

💡 **Watch the countdown timer** - It updates every minute, so wait a bit to see it change!

💡 **Try dark mode** - Toggle your system dark mode to see dark theme support

💡 **Resize browser** - Check responsive behavior on different screen sizes

💡 **Click image dots** - Test the image carousel on every card

💡 **Hover over cards** - See the premium lift and zoom animations

💡 **Check "ENDING SOON"** - The first promotion has the animated badge

---

## 🎉 You're All Set!

Visit **http://localhost:3000/demo** to see your commercial-grade platform in action!
