import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gogevgelija.com'),
  title: {
    default: 'GoGevgelija - Discover Gevgelija',
    template: '%s | GoGevgelija',
  },
  description: 'Explore attractions, events, promotions, and local stories in Gevgelija, North Macedonia. Your complete guide to tourism, dining, entertainment, and culture.',
  keywords: ['Gevgelija', 'tourism', 'events', 'attractions', 'Macedonia', 'travel', 'restaurants', 'hotels', 'North Macedonia'],
  authors: [{ name: 'GoGevgelija Team' }],
  creator: 'GoGevgelija',
  publisher: 'GoGevgelija',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['mk_MK'],
    url: '/',
    title: 'GoGevgelija - Discover Gevgelija',
    description: 'Explore attractions, events, promotions, and local stories in Gevgelija, North Macedonia',
    siteName: 'GoGevgelija',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoGevgelija - Discover Gevgelija',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoGevgelija - Discover Gevgelija',
    description: 'Explore attractions, events, promotions, and local stories in Gevgelija, North Macedonia',
    images: ['/og-image.jpg'],
    creator: '@gogevgelija',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GoGevgelija',
  },
  applicationName: 'GoGevgelija',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen`}>
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
