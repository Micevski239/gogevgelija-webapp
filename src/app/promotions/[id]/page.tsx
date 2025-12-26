'use client';

import { useQuery } from '@tanstack/react-query';
import { promotionService } from '@/lib/api/services';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, Copy, Check, Calendar, Tag, MapPin, Phone, Globe } from 'lucide-react';
import { WishlistButton } from '@/components/common/WishlistButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import { format } from 'date-fns';
import { useState } from 'react';

export default function PromotionDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const { data: promotion, isLoading } = useQuery({
    queryKey: ['promotion', id],
    queryFn: () => promotionService.getById(id),
  });

  const copyDiscountCode = () => {
    if (promotion?.discount_code) {
      navigator.clipboard.writeText(promotion.discount_code);
      setCopied(true);
      showToast('Discount code copied!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>;
  if (!promotion) return <div className="container mx-auto px-4 py-12 text-center"><h1 className="text-2xl font-bold mb-4">Promotion not found</h1><Link href="/promotions" className="text-primary hover:underline">Back to Promotions</Link></div>;

  const isExpired = promotion.valid_until ? new Date(promotion.valid_until) < new Date() : false;
  const images = promotion.images || [promotion.image];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/promotions" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ChevronLeft className="h-5 w-5" />Back to Promotions
          </Link>
        </div>
      </div>

      <div className="relative h-96 bg-gray-200 dark:bg-gray-700">
        <Image src={images[0]} alt={promotion.title} fill className="object-cover" priority />
        {promotion.featured && <div className="absolute top-4 left-4"><Badge>Featured</Badge></div>}
        {isExpired && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Badge variant="destructive" className="text-lg">Expired</Badge></div>}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{promotion.title}</h1>
                </div>
                <WishlistButton itemType="promotion" itemId={promotion.id} itemData={promotion} showLabel className="ml-4" />
              </div>
              {promotion.valid_until && !isExpired && (
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Calendar className="h-5 w-5" />
                  <span>Valid until {format(new Date(promotion.valid_until), 'MMMM dd, yyyy')}</span>
                </div>
              )}
            </div>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About This Promotion</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{promotion.description}</p>
            </Card>

            {promotion.has_discount_code && promotion.discount_code && (
              <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                      <Tag className="h-5 w-5 text-green-600" />
                      Discount Code
                    </h3>
                    <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">{promotion.discount_code}</p>
                  </div>
                  <Button onClick={copyDiscountCode} variant="outline" className="gap-2">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {promotion.phone_number && (
                  <a href={`tel:${promotion.phone_number}`} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Phone className="h-5 w-5" /><span>{promotion.phone_number}</span>
                  </a>
                )}
                {promotion.website && (
                  <a href={promotion.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Globe className="h-5 w-5" /><span>Website</span>
                  </a>
                )}
                {promotion.address && (
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-2">
                    <MapPin className="h-5 w-5" /><span>{promotion.address}</span>
                  </div>
                )}
              </div>
              {promotion.google_maps_url && (
                <a href={promotion.google_maps_url} target="_blank" rel="noopener noreferrer" className="block mt-6 px-4 py-3 bg-primary text-white rounded-lg text-center hover:bg-primary/90 font-semibold">
                  <div className="flex items-center justify-center gap-2"><MapPin className="h-5 w-5" />View Location</div>
                </a>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
