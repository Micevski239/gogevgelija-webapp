'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/api/services';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState<'info' | 'code'>('info');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      setLoading(true);
      await authService.sendCode({ email, name });
      showToast('Verification code sent to your email', 'success');
      setStep('code');
    } catch (error: any) {
      showToast(
        error?.response?.data?.error || 'Failed to send code. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      showToast('Please enter the 6-digit code', 'error');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, code, name);
      showToast('Account created successfully!', 'success');
      router.push('/');
    } catch (error: any) {
      showToast(error.message || 'Invalid code. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-gray-50 dark:via-gray-900 to-accent/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 rounded-full bg-primary items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join GoGevgelija to save your favorites and personalize your experience
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
          {step === 'info' ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full" loading={loading}>
                Send Verification Code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  required
                  autoFocus
                  maxLength={6}
                />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Enter the 6-digit code sent to <strong>{email}</strong>
                </p>
              </div>

              <Button type="submit" className="w-full" loading={loading}>
                Verify & Create Account
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep('info');
                  setCode('');
                }}
                className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ← Back to account info
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
