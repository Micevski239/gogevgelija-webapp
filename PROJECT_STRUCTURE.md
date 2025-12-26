# GoGevgelija Web App - Complete Project Structure

**Tech Stack:**
- Next.js 15 + React 19 + TypeScript 5.7
- Tailwind CSS 3.4 + shadcn/ui patterns
- TanStack React Query 5.90
- Axios 1.12 + JWT Auth
- Zod 3.25 validation
- next-intl 3.25 (i18n)

---

## 📂 Complete Directory Structure

```
Web/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── robots.txt
│
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # Root layout with providers
│   │   ├── page.tsx                      # Homepage
│   │   ├── loading.tsx                   # Global loading state
│   │   ├── error.tsx                     # Global error boundary
│   │   ├── not-found.tsx                 # 404 page
│   │   │
│   │   ├── (auth)/                       # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── listings/
│   │   │   ├── page.tsx                  # Browse all listings
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Listing detail
│   │   │
│   │   ├── events/
│   │   │   ├── page.tsx                  # Browse all events
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Event detail
│   │   │
│   │   ├── promotions/
│   │   │   ├── page.tsx                  # Browse all promotions
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Promotion detail
│   │   │
│   │   ├── blogs/
│   │   │   ├── page.tsx                  # Browse all blogs
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Blog detail
│   │   │
│   │   ├── search/
│   │   │   └── page.tsx                  # Global search results
│   │   │
│   │   ├── wishlist/
│   │   │   └── page.tsx                  # User wishlist
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx                  # User profile
│   │   │
│   │   ├── help/
│   │   │   └── page.tsx                  # Help & Support
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx                  # About page
│   │   │
│   │   ├── privacy/
│   │   │   └── page.tsx                  # Privacy Policy
│   │   │
│   │   ├── terms/
│   │   │   └── page.tsx                  # Terms of Service
│   │   │
│   │   ├── docs/
│   │   │   └── page.tsx                  # API docs & architecture
│   │   │
│   │   └── api/                          # API routes (optional)
│   │       └── sitemap/
│   │           └── route.ts              # Dynamic sitemap
│   │
│   ├── components/
│   │   ├── ui/                           # shadcn/ui primitives
│   │   │   ├── Badge.tsx                 ✅ Created
│   │   │   ├── Button.tsx                ✅ Exists
│   │   │   ├── Card.tsx                  ✅ Exists
│   │   │   ├── Dialog.tsx                ✅ Created
│   │   │   ├── Input.tsx                 ✅ Exists
│   │   │   ├── Select.tsx                ✅ Created
│   │   │   ├── Skeleton.tsx              ✅ Created
│   │   │   ├── Spinner.tsx               ✅ Created
│   │   │   └── Tabs.tsx                  ✅ Created
│   │   │
│   │   ├── layout/                       # Layout components
│   │   │   ├── Header.tsx                ⚠️  Partial (needs completion)
│   │   │   ├── Footer.tsx                ❌ To create
│   │   │   ├── Navigation.tsx            ❌ To create
│   │   │   ├── MobileMenu.tsx            ❌ To create
│   │   │   └── Breadcrumbs.tsx           ❌ To create
│   │   │
│   │   ├── cards/                        # Content card components
│   │   │   ├── ListingCard.tsx           ⚠️  Partial
│   │   │   ├── EventCard.tsx             ⚠️  Partial
│   │   │   ├── PromotionCard.tsx         ❌ To create
│   │   │   ├── BlogCard.tsx              ❌ To create
│   │   │   └── CategoryCard.tsx          ❌ To create
│   │   │
│   │   ├── common/                       # Reusable components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── SortDropdown.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── WishlistButton.tsx
│   │   │   ├── ShareButton.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   │
│   │   ├── carousel/                     # Carousel components
│   │   │   ├── FeaturedCarousel.tsx
│   │   │   └── ImageCarousel.tsx
│   │   │
│   │   ├── sections/                     # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedSection.tsx
│   │   │   ├── CategoryButtons.tsx
│   │   │   └── DynamicSection.tsx
│   │   │
│   │   └── Providers.tsx                 # Context providers wrapper
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts                 ✅ Complete (Axios + JWT)
│   │   │   └── services.ts               ✅ Complete (All endpoints)
│   │   │
│   │   ├── auth/
│   │   │   └── tokens.ts                 ✅ Complete (localStorage)
│   │   │
│   │   ├── validation/
│   │   │   └── schemas.ts                ✅ Complete (Zod schemas)
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.ts                     # Tailwind class merger
│   │   │   ├── format.ts                 # Date/time formatting
│   │   │   ├── image.ts                  # Image URL helpers
│   │   │   └── seo.ts                    # SEO helper functions
│   │   │
│   │   └── hooks/                        # Custom React hooks
│   │       ├── useDebounce.ts
│   │       ├── useInfiniteScroll.ts
│   │       ├── useLocalStorage.ts
│   │       └── useMediaQuery.ts
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx               ✅ Complete
│   │   ├── WishlistContext.tsx           ❌ To create
│   │   ├── LanguageContext.tsx           ❌ To create
│   │   └── ToastContext.tsx              ❌ To create
│   │
│   ├── types/
│   │   └── index.ts                      ✅ Complete (from mobile)
│   │
│   ├── styles/
│   │   └── globals.css                   # Tailwind + custom styles
│   │
│   └── messages/                         # i18n translation files
│       ├── en.json
│       └── mk.json
│
├── .env.local                            # Environment variables
├── .gitignore
├── next.config.ts                        # Next.js config
├── tailwind.config.ts                    # Tailwind config
├── tsconfig.json                         # TypeScript config
├── package.json                          # Dependencies
├── README.md
├── IMPLEMENTATION_STATUS.md              ✅ Created
├── PROJECT_STRUCTURE.md                  ✅ This file
├── DEPLOYMENT.md                         ❌ To create
└── Dockerfile                            ❌ To create (optional)
```

---

## 🗂️ Key Files Reference

### Configuration Files

**`.env.local`**
```env
NEXT_PUBLIC_API_URL=https://admin.gogevgelija.com
NEXT_PUBLIC_APP_NAME=GoGevgelija
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_SITE_URL=https://gogevgelija.com
```

**`next.config.ts`**
- Image domains configuration
- i18n setup
- Security headers
- Redirects/rewrites if needed

**`tailwind.config.ts`**
- Custom theme colors
- Typography settings
- Animation utilities
- Component variants

---

## 🎨 Design System

### Colors (Tailwind)
```css
primary: Blue/Brand color
secondary: Gray/Neutral
accent: Gold/Highlight
success: Green
warning: Yellow
error: Red
muted: Light gray
```

### Typography
- Headings: font-bold
- Body: font-normal
- Small: text-sm
- Large: text-lg

### Spacing
- Container max-width: 1280px
- Section padding: py-12 md:py-24
- Card padding: p-6
- Gap between items: gap-6 / gap-8

---

## 🔌 API Endpoints Summary

### Base URL
`https://admin.gogevgelija.com`

### Categories
- `GET /api/categories/` - All categories
- `GET /api/categories/tree/` - Hierarchical tree
- `GET /api/categories/{id}/` - Single category

### Listings
- `GET /api/listings/` - All (paginated)
- `GET /api/listings/featured/` - Featured
- `GET /api/listings/{id}/` - Detail
- `GET /api/listings/?category={slug}` - By category

### Events
- `GET /api/events/` - All (paginated)
- `GET /api/events/featured/` - Featured
- `GET /api/events/{id}/` - Detail
- `POST /api/events/{id}/join/` - Join event

### Promotions
- `GET /api/promotions/` - All (paginated)
- `GET /api/promotions/featured/` - Featured
- `GET /api/promotions/{id}/` - Detail

### Blogs
- `GET /api/blogs/` - All (paginated)
- `GET /api/blogs/featured/` - Featured
- `GET /api/blogs/{id}/` - Detail

### Wishlist
- `GET /api/wishlist/` - Get all
- `POST /api/wishlist/` - Add (body: {item_type, item_id})
- `POST /api/wishlist/remove/` - Remove

### Search
- `GET /api/search/?q={query}&type={all|listings|events|promotions|blogs}&limit=20`

### Auth
- `POST /api/token/` - Get tokens (body: {email, code})
- `POST /api/token/refresh/` - Refresh token
- `POST /api/auth/register/` - Register (body: {name, email})
- `GET /api/auth/profile/` - Get profile
- `PUT /api/auth/profile/` - Update profile

---

## 🔐 Authentication Flow

1. **Guest Mode**
   - Generate client-side `guest_id` (UUID)
   - Store in localStorage
   - No API auth required

2. **Email Verification Login**
   - User enters email
   - Backend sends verification code
   - User enters code
   - POST `/api/token/` with {email, code}
   - Receive {access, refresh, user}
   - Store tokens in localStorage

3. **Registration**
   - User enters name + email
   - POST `/api/auth/register/`
   - Backend sends verification code
   - User enters code
   - Same flow as login

4. **Token Refresh**
   - Automatic via Axios interceptor
   - POST `/api/token/refresh/` with {refresh}
   - Update access token
   - On failure: clear tokens, redirect to login

---

## 🎯 Core Features Checklist

### Homepage
- [ ] Hero section with background image
- [ ] Featured carousel (listings/events/promotions)
- [ ] Tourism category buttons
- [ ] Dynamic sections from API
- [ ] Events grid
- [ ] Promotions grid
- [ ] Blog articles grid

### Browse/Explore Pages
- [ ] Grid layout with filters
- [ ] Category sidebar/dropdown
- [ ] Sort options (trending, featured, date, alpha)
- [ ] Pagination or infinite scroll
- [ ] Loading skeletons
- [ ] Empty states

### Detail Pages
- [ ] Image gallery/lightbox
- [ ] Breadcrumbs
- [ ] Share button
- [ ] Wishlist button
- [ ] Contact info (phone, social, website)
- [ ] Google Maps embed
- [ ] Related items
- [ ] **Listing:** Amenities, working hours, open status
- [ ] **Event:** Join button, expectations, calendar export (.ics)
- [ ] **Promotion:** Discount code copy, validity date
- [ ] **Blog:** Rich content, author, read time, related posts

### Search
- [ ] Global search bar in header
- [ ] Debounced input (500ms)
- [ ] Search results page with tabs (All, Listings, Events, Promotions, Blogs)
- [ ] Highlight matched terms
- [ ] "No results" state

### Wishlist
- [ ] Grid of saved items
- [ ] Remove button
- [ ] Empty state ("Start adding items...")
- [ ] localStorage fallback for guests
- [ ] API sync for logged-in users

### User Profile
- [ ] View/edit profile info
- [ ] Avatar selector
- [ ] Language preference toggle
- [ ] Logout button

### i18n (Macedonian + English)
- [ ] next-intl configuration
- [ ] Translation files (en.json, mk.json)
- [ ] Language switcher in header
- [ ] Persist preference in API (logged in) or localStorage (guest)
- [ ] Dynamic content from API respects Accept-Language header

### SEO
- [ ] Dynamic `<title>` per page
- [ ] Meta description
- [ ] OpenGraph tags (og:title, og:image, og:description)
- [ ] Twitter cards
- [ ] Canonical URLs
- [ ] Sitemap.xml (dynamic from API)
- [ ] robots.txt
- [ ] JSON-LD structured data

### Performance
- [ ] Next.js Image component for all images
- [ ] React Query caching (5-15 min stale time)
- [ ] Prefetch on hover for detail pages
- [ ] Route-level loading states
- [ ] Code splitting verification
- [ ] Lazy load images below fold

### Accessibility
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] ARIA labels on interactive elements
- [ ] Focus management (dialogs, modals)
- [ ] Color contrast (WCAG AA)
- [ ] Alt text on all images
- [ ] Screen reader testing

---

## 📦 npm Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

---

## 🚀 Deployment (Vercel)

### Steps
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Environment Variables (Vercel Dashboard)
```
NEXT_PUBLIC_API_URL=https://admin.gogevgelija.com
NEXT_PUBLIC_APP_NAME=GoGevgelija
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_SITE_URL=https://gogevgelija.com
```

### Build Settings
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node Version:** 18.x or 20.x

---

## 🐳 Docker (Optional Self-Hosting)

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://admin.gogevgelija.com
      - NEXT_PUBLIC_APP_NAME=GoGevgelija
      - NEXT_PUBLIC_DEFAULT_LANGUAGE=en
    restart: unless-stopped
```

---

## 📊 Current Status

**Completed:** ~40% (Infrastructure + Foundation)
**Remaining:** ~60% (UI Pages + Features + Polish)

See `IMPLEMENTATION_STATUS.md` for detailed breakdown.

---

## 🔗 Related Documentation

- `README.md` - Getting started guide
- `IMPLEMENTATION_STATUS.md` - Detailed completion status
- `DEPLOYMENT.md` - Deployment guide (to be created)
- `/docs` page - API reference & architecture (in-app)
