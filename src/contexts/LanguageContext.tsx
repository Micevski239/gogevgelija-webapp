'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { languageService } from '@/lib/api/services';
import { getGuestIdAsync } from '@/lib/auth/tokens';

type Language = 'en' | 'mk';

interface LanguageContextType {
  language: Language;
  isLoading: boolean;
  setLanguage: (lang: Language) => Promise<void>;
  toggleLanguage: () => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'common.home': 'Home',
    'common.search': 'Search',
    'common.events': 'Events',
    'common.promotions': 'Promotions',
    'common.profile': 'Profile',
    'common.listings': 'Listings',
    'common.blog': 'Blog',
    'common.wishlist': 'Wishlist',
    'common.login': 'Login',
    'common.logout': 'Logout',
    'common.register': 'Register',
    'common.guest': 'Continue as Guest',
    'common.welcome': 'Welcome',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.retry': 'Retry',
    'common.viewAll': 'View All',
    'common.featured': 'Featured',
    'common.seeAll': 'See All',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.all': 'All',
    'common.categories': 'Categories',
    'common.filters': 'Filters',
    'common.sortBy': 'Sort By',
    'common.noResults': 'No results found',
    'common.page': 'Page',

    // Home
    'home.greeting.morning': 'Good Morning',
    'home.greeting.afternoon': 'Good Afternoon',
    'home.greeting.evening': 'Good Evening',
    'home.upcomingEvents': 'Upcoming Events',
    'home.promotions': 'Special Promotions',
    'home.latestArticles': 'Latest Articles',
    'home.exploreCategories': 'Explore Categories',
    'home.trendingListings': 'Trending Listings',

    // Auth
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.signOut': 'Sign Out',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.verificationCode': 'Verification Code',
    'auth.sendCode': 'Send Verification Code',
    'auth.verifyAndSignIn': 'Verify & Sign In',
    'auth.verifyAndCreate': 'Verify & Create Account',
    'auth.backToEmail': 'Back to email',
    'auth.backToInfo': 'Back to account info',
    'auth.alreadyHaveAccount': "Already have an account?",
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.createAccount': 'Create Account',
    'auth.welcomeBack': 'Welcome Back',
    'auth.joinUs': 'Join GoGevgelija',

    // Profile
    'profile.myProfile': 'My Profile',
    'profile.profileInfo': 'Profile Information',
    'profile.username': 'Username',
    'profile.avatar': 'Avatar',
    'profile.language': 'Language Preference',
    'profile.account': 'Account',
    'profile.status': 'Status',
    'profile.role': 'Role',
    'profile.active': 'Active',
    'profile.admin': 'Admin',
    'profile.user': 'User',
    'profile.quickLinks': 'Quick Links',
    'profile.saveChanges': 'Save Changes',
    'profile.emailCannotChange': 'Email cannot be changed',

    // Wishlist
    'wishlist.myWishlist': 'My Wishlist',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDesc': 'Start exploring and save your favorite places, events, and articles',
    'wishlist.signInToView': 'Sign in to view your wishlist',
    'wishlist.signInDesc': 'Save your favorite places, events, and articles by signing in',
    'wishlist.allFavorites': 'All your saved favorites in one place',

    // Search
    'search.searchGoGevgelija': 'Search GoGevgelija',
    'search.results': 'Search Results',
    'search.resultsFor': 'Results for',
    'search.noResults': 'No results found',
    'search.tryDifferent': 'Try searching with different keywords',
    'search.minChars': 'Enter at least 2 characters to start searching',

    // Listings
    'listings.explore': 'Explore Listings',
    'listings.allCategories': 'All Categories',
    'listings.noListings': 'No listings found',
    'listings.viewDetails': 'View Details',
    'listings.contactInfo': 'Contact Information',
    'listings.workingHours': 'Working Hours',
    'listings.amenities': 'Amenities',
    'listings.about': 'About This Place',
    'listings.viewLocation': 'View Location',
    'listings.open': 'Open',
    'listings.closed': 'Closed',

    // Events
    'events.upcoming': 'Upcoming Events',
    'events.allEvents': 'All Events',
    'events.noEvents': 'No events found',
    'events.joinEvent': 'Join Event',
    'events.unjoinEvent': 'Unjoin Event',
    'events.joined': 'Joined',
    'events.addToCalendar': 'Add to Calendar',
    'events.whatToExpect': 'What to Expect',
    'events.eventDetails': 'Event Details',
    'events.dateTime': 'Date & Time',
    'events.location': 'Location',
    'events.entryPrice': 'Entry Price',
    'events.ageLimit': 'Age Limit',
    'events.organizer': 'Organizer',

    // Promotions
    'promotions.special': 'Special Promotions',
    'promotions.noPromotions': 'No promotions found',
    'promotions.validUntil': 'Valid until',
    'promotions.expired': 'Expired',
    'promotions.discountCode': 'Discount Code',
    'promotions.copyCode': 'Copy Code',
    'promotions.codeCopied': 'Code copied!',
    'promotions.aboutPromotion': 'About This Promotion',

    // Blog
    'blog.articles': 'Blog & Articles',
    'blog.latestArticles': 'Latest Articles',
    'blog.noArticles': 'No blog posts found',
    'blog.readMore': 'Read More',
    'blog.readTime': 'min read',
    'blog.author': 'Author',
    'blog.publishedOn': 'Published on',
    'blog.tags': 'Tags',
    'blog.relatedArticles': 'Related Articles',

    // Footer
    'footer.brand': 'GoGevgelija',
    'footer.brandDesc': 'Discover the best of Gevgelija',
    'footer.explore': 'Explore',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.about': 'About Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.help': 'Help & Support',
    'footer.allRightsReserved': 'All rights reserved',
  },
  mk: {
    // Common
    'common.home': 'Почетна',
    'common.search': 'Пребарај',
    'common.events': 'Настани',
    'common.promotions': 'Промоции',
    'common.profile': 'Профил',
    'common.listings': 'Листинзи',
    'common.blog': 'Блог',
    'common.wishlist': 'Омилени',
    'common.login': 'Најава',
    'common.logout': 'Одјава',
    'common.register': 'Регистрација',
    'common.guest': 'Продолжи како гостин',
    'common.welcome': 'Добредојдовте',
    'common.loading': 'Се вчитува...',
    'common.error': 'Грешка',
    'common.success': 'Успешно',
    'common.retry': 'Обиди се повторно',
    'common.viewAll': 'Видете ги сите',
    'common.featured': 'Издвоени',
    'common.seeAll': 'Видете ги сите',
    'common.save': 'Зачувај',
    'common.cancel': 'Откажи',
    'common.delete': 'Избриши',
    'common.edit': 'Измени',
    'common.back': 'Назад',
    'common.next': 'Следно',
    'common.previous': 'Претходно',
    'common.all': 'Сите',
    'common.categories': 'Категории',
    'common.filters': 'Филтри',
    'common.sortBy': 'Подреди по',
    'common.noResults': 'Нема резултати',
    'common.page': 'Страна',

    // Home
    'home.greeting.morning': 'Добро утро',
    'home.greeting.afternoon': 'Добар ден',
    'home.greeting.evening': 'Добра вечер',
    'home.upcomingEvents': 'Претстојни настани',
    'home.promotions': 'Специјални промоции',
    'home.latestArticles': 'Најнови статии',
    'home.exploreCategories': 'Истражи категории',
    'home.trendingListings': 'Популарни листинзи',

    // Auth
    'auth.signIn': 'Најава',
    'auth.signUp': 'Регистрација',
    'auth.signOut': 'Одјава',
    'auth.email': 'Емаил адреса',
    'auth.password': 'Лозинка',
    'auth.name': 'Име и презиме',
    'auth.verificationCode': 'Верификациски код',
    'auth.sendCode': 'Испрати верификациски код',
    'auth.verifyAndSignIn': 'Верифицирај и најави се',
    'auth.verifyAndCreate': 'Верифицирај и креирај акаунт',
    'auth.backToEmail': 'Назад на емаил',
    'auth.backToInfo': 'Назад на информации',
    'auth.alreadyHaveAccount': 'Веќе имате акаунт?',
    'auth.dontHaveAccount': 'Немате акаунт?',
    'auth.createAccount': 'Креирај акаунт',
    'auth.welcomeBack': 'Добредојдовте назад',
    'auth.joinUs': 'Придружете се на GoGevgelija',

    // Profile
    'profile.myProfile': 'Мој профил',
    'profile.profileInfo': 'Информации за профил',
    'profile.username': 'Корисничко име',
    'profile.avatar': 'Аватар',
    'profile.language': 'Јазик',
    'profile.account': 'Акаунт',
    'profile.status': 'Статус',
    'profile.role': 'Улога',
    'profile.active': 'Активен',
    'profile.admin': 'Администратор',
    'profile.user': 'Корисник',
    'profile.quickLinks': 'Брзи линкови',
    'profile.saveChanges': 'Зачувај промени',
    'profile.emailCannotChange': 'Емаилот не може да се промени',

    // Wishlist
    'wishlist.myWishlist': 'Мои омилени',
    'wishlist.empty': 'Вашата листа на омилени е празна',
    'wishlist.emptyDesc': 'Започнете со истражување и зачувајте ги вашите омилени места, настани и статии',
    'wishlist.signInToView': 'Најавете се за да ја видите вашата листа',
    'wishlist.signInDesc': 'Зачувајте ги вашите омилени места, настани и статии со најавување',
    'wishlist.allFavorites': 'Сите ваши омилени на едно место',

    // Search
    'search.searchGoGevgelija': 'Пребарај во GoGevgelija',
    'search.results': 'Резултати од пребарување',
    'search.resultsFor': 'Резултати за',
    'search.noResults': 'Нема пронајдени резултати',
    'search.tryDifferent': 'Обидете се со други клучни зборови',
    'search.minChars': 'Внесете најмалку 2 карактери за да започнете со пребарување',

    // Listings
    'listings.explore': 'Истражи листинзи',
    'listings.allCategories': 'Сите категории',
    'listings.noListings': 'Нема пронајдени листинзи',
    'listings.viewDetails': 'Погледни детали',
    'listings.contactInfo': 'Контакт информации',
    'listings.workingHours': 'Работно време',
    'listings.amenities': 'Погодности',
    'listings.about': 'За ова место',
    'listings.viewLocation': 'Погледни локација',
    'listings.open': 'Отворено',
    'listings.closed': 'Затворено',

    // Events
    'events.upcoming': 'Претстојни настани',
    'events.allEvents': 'Сите настани',
    'events.noEvents': 'Нема пронајдени настани',
    'events.joinEvent': 'Придружи се',
    'events.unjoinEvent': 'Откажи учество',
    'events.joined': 'Зачленет',
    'events.addToCalendar': 'Додај во календар',
    'events.whatToExpect': 'Што да очекувате',
    'events.eventDetails': 'Детали за настанот',
    'events.dateTime': 'Датум и време',
    'events.location': 'Локација',
    'events.entryPrice': 'Цена за влез',
    'events.ageLimit': 'Возрасна граница',
    'events.organizer': 'Организатор',

    // Promotions
    'promotions.special': 'Специјални промоции',
    'promotions.noPromotions': 'Нема пронајдени промоции',
    'promotions.validUntil': 'Важи до',
    'promotions.expired': 'Истечено',
    'promotions.discountCode': 'Код за попуст',
    'promotions.copyCode': 'Копирај код',
    'promotions.codeCopied': 'Кодот е копиран!',
    'promotions.aboutPromotion': 'За оваа промоција',

    // Blog
    'blog.articles': 'Блог и статии',
    'blog.latestArticles': 'Најнови статии',
    'blog.noArticles': 'Нема пронајдени статии',
    'blog.readMore': 'Прочитај повеќе',
    'blog.readTime': 'мин читање',
    'blog.author': 'Автор',
    'blog.publishedOn': 'Објавено на',
    'blog.tags': 'Тагови',
    'blog.relatedArticles': 'Поврзани статии',

    // Footer
    'footer.brand': 'GoGevgelija',
    'footer.brandDesc': 'Открийте го најдоброто од Гевгелија',
    'footer.explore': 'Истражи',
    'footer.company': 'Компанија',
    'footer.contact': 'Контакт',
    'footer.about': 'За нас',
    'footer.privacy': 'Политика за приватност',
    'footer.terms': 'Услови за користење',
    'footer.help': 'Помош и поддршка',
    'footer.allRightsReserved': 'Сите права задржани',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('gogevgelija_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'mk')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      setIsLoading(true);
      localStorage.setItem('gogevgelija_language', lang);
      setLanguageState(lang);

      // Update API preference
      const guestId = await getGuestIdAsync();
      await languageService.updateLanguagePreference({
        language: lang,
        guest_id: guestId,
      });
    } catch (error) {
      console.error('Error setting language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'mk' : 'en';
    await setLanguage(newLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    isLoading,
    setLanguage,
    toggleLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
