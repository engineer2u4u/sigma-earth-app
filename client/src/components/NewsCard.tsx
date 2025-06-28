import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import type { WordPressPost } from '@/lib/api';

interface NewsCardProps {
  news: WordPressPost;
}

export function NewsCard({ news }: NewsCardProps) {
  const imageUrl = news._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = news._embedded?.['author']?.[0]?.name || 'Unknown Author';
  const publishedDate = formatDistanceToNow(new Date(news.date), { addSuffix: true });

  // Clean HTML content and get excerpt
  const cleanExcerpt = news.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/&[#\w]+;/g, '')
    .substring(0, 150) + '...';

  return (
    <Card className="border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={news.title.rendered}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
              {news.title.rendered}
            </h4>
            <p className="text-xs text-gray-500 mb-2">
              by {authorName} | {publishedDate}
            </p>
            <p className="text-xs text-gray-600 line-clamp-2">
              {cleanExcerpt}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
