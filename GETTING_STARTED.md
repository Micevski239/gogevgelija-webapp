# Getting Started with GoGevgelija Web App

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

```bash
cd /Users/filipmicevski/Desktop/GoGevgelija/Web
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

✅ **Open your browser to http://localhost:3000**

That's it! The app is now running.

---

## 📋 Available Commands

```bash
# Development
npm run dev          # Start development server (port 3000)

# Production
npm run build        # Build for production
npm start            # Run production build

# Utilities
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

## 🌐 Environment Configuration

The `.env.local` file is already configured with:

```env
NEXT_PUBLIC_API_URL=https://admin.gogevgelija.com
NEXT_PUBLIC_APP_NAME=GoGevgelija
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_SITE_URL=https://gogevgelija.com
```

**No additional setup needed!**

---

## 📱 What You Can Do

### Browse Content
- **Listings**: http://localhost:3000/listings
- **Events**: http://localhost:3000/events
- **Promotions**: http://localhost:3000/promotions
- **Blogs**: http://localhost:3000/blogs

### Search
- **Global Search**: http://localhost:3000/search?q=restaurant

### User Features
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Profile**: http://localhost:3000/profile (requires login)
- **Wishlist**: http://localhost:3000/wishlist (requires login)

### Test Accounts
Use the email verification flow to create accounts - no passwords needed!

---

## 🎨 Features Available

### ✅ Fully Implemented
- Browse all content (listings, events, promotions, blogs)
- Detail pages with image galleries
- Global search
- User authentication (email + verification code)
- Wishlist functionality
- User profiles with avatars
- Language switching (English ↔ Macedonian)
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- SEO optimization

---

## 🐛 Common Issues

### Port 3000 Already in Use?

```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Dependencies Not Installing?

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Errors?

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 📖 More Documentation

- **Full README**: `README.md`
- **Implementation Status**: `IMPLEMENTATION_STATUS.md`
- **Session Summary**: `SESSION_COMPLETION_SUMMARY.md`

---

## 🎉 You're Ready!

Start exploring the application:

```bash
npm run dev
```

Then visit: **http://localhost:3000** 🚀
