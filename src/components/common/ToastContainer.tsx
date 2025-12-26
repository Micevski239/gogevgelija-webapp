'use client';

import React from 'react';
import { useToast } from '@/contexts/ToastContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];

        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-top-5',
              colors[toast.type]
            )}
            role="alert"
          >
            <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColors[toast.type])} />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => hideToast(toast.id)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
