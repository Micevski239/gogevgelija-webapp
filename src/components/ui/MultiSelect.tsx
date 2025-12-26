'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={cn('relative', className)}>
      <label className="block text-sm font-semibold mb-2">{label}</label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors"
      >
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value.length === 0
            ? placeholder
            : `${value.length} selected`}
        </span>
        {value.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearAll();
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <span className="text-sm">{option.label}</span>
                  {isSelected && <Check className="h-4 w-4" />}
                </div>
              );
            })}
          </div>
        </>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((v) => {
            const option = options.find((o) => o.value === v);
            if (!option) return null;
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {option.label}
                <button
                  onClick={() => toggleOption(v)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
