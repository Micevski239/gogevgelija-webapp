'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { userService } from '@/lib/api/services';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/contexts/ToastContext';
import { User, LogOut, Globe, Mail, LogIn } from 'lucide-react';
import Link from 'next/link';

const AVATAR_OPTIONS = [
  '👤', '😀', '😎', '🤠', '🧑‍💻', '👨‍🎨', '👩‍🏫', '🧑‍🚀',
  '🦁', '🐶', '🐱', '🐼', '🦊', '🐸', '🦉', '🐙'
];

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { currentLanguage, setLanguage } = useLanguage();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👤');

  useEffect(() => {
    if (user) {
      setUsername(user.username || user.email || '');
      setSelectedAvatar(user.profile?.avatar || '👤');
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      showToast('Username cannot be empty', 'error');
      return;
    }

    try {
      setLoading(true);
      await userService.updateProfile({
        username: username.trim(),
        avatar: selectedAvatar,
      });
      showToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      showToast(
        error?.response?.data?.error || 'Failed to update profile. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang: 'en' | 'mk') => {
    setLanguage(lang);
    showToast(`Language changed to ${lang === 'en' ? 'English' : 'Macedonian'}`, 'success');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      showToast('Signed out successfully', 'success');
    } catch (error) {
      showToast('Failed to sign out', 'error');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <LogIn className="h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Sign in to view your profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Access your account to manage your profile and preferences
            </p>
            <Link
              href="/login"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </h2>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Username
                  </label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your display name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Avatar
                  </label>
                  <div className="grid grid-cols-8 gap-2">
                    {AVATAR_OPTIONS.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`
                          h-12 w-12 rounded-lg text-2xl flex items-center justify-center
                          transition-all border-2
                          ${selectedAvatar === avatar
                            ? 'border-primary bg-primary/10 scale-110'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }
                        `}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" loading={loading} className="w-full">
                  Save Changes
                </Button>
              </form>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language Preference
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`
                    px-6 py-4 rounded-lg border-2 font-semibold transition-all
                    ${currentLanguage === 'en'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }
                  `}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => handleLanguageChange('mk')}
                  className={`
                    px-6 py-4 rounded-lg border-2 font-semibold transition-all
                    ${currentLanguage === 'mk'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }
                  `}
                >
                  🇲🇰 Македонски
                </button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Account</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Role</span>
                  <span className="font-semibold">
                    {user.is_admin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/wishlist"
                  className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  My Wishlist
                </Link>
                <Link
                  href="/listings"
                  className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Browse Listings
                </Link>
                <Link
                  href="/events"
                  className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Upcoming Events
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
