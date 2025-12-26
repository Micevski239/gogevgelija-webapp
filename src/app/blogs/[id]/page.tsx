'use client';

import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/lib/api/services';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, User, Clock, Calendar } from 'lucide-react';
import { WishlistButton } from '@/components/common/WishlistButton';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" /></div>;
  if (!blog) return <div className="container mx-auto px-4 py-12 text-center"><h1 className="text-2xl font-bold mb-4">Blog post not found</h1><Link href="/blogs" className="text-primary hover:underline">Back to Blog</Link></div>;

  const coverImage = blog.cover_image || blog.image || (blog.images && blog.images[0]);
  const tags = Array.isArray(blog.tags)
    ? blog.tags
    : typeof blog.tags === 'string'
      ? [blog.tags]
      : blog.tags?.tags ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blogs" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ChevronLeft className="h-5 w-5" />Back to Blog
          </Link>
        </div>
      </div>

      {coverImage && (
        <div className="relative h-96 bg-gray-200 dark:bg-gray-700">
          <Image src={coverImage} alt={blog.title} fill className="object-cover" priority />
          {blog.featured && <div className="absolute top-4 left-4"><Badge>Featured</Badge></div>}
        </div>
      )}

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {blog.category && <Badge variant="secondary" className="mb-3">{blog.category}</Badge>}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
              {blog.subtitle && <p className="text-xl text-gray-600 dark:text-gray-400">{blog.subtitle}</p>}
            </div>
            <WishlistButton itemType="blog" itemId={blog.id} itemData={blog} showLabel className="ml-4" />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
            )}
            {blog.read_time_minutes && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.read_time_minutes} min read</span>
              </div>
            )}
            {blog.created_at && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(blog.created_at), 'MMMM dd, yyyy')}</span>
              </div>
            )}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
          </div>

          {tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
