import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import type { EcoListing } from '@shared/schema';

interface EcoListingCardProps {
  listing: EcoListing;
  onLearnMore?: (listingId: number) => void;
}

export function EcoListingCard({ listing, onLearnMore }: EcoListingCardProps) {
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore(listing.id);
    }
  };

  const categoryColors = {
    product: 'bg-primary/10 text-primary',
    service: 'bg-accent-yellow/20 text-yellow-700',
  };

  return (
    <Card className="border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {listing.imageUrl && (
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-40 object-cover"
        />
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge 
            variant="secondary" 
            className={categoryColors[listing.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700'}
          >
            {listing.category}
          </Badge>
          {listing.rating > 0 && (
            <div className="flex items-center text-yellow-400">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-xs text-gray-600 ml-1">
                {(listing.rating / 10).toFixed(1)} ({listing.reviewCount})
              </span>
            </div>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {listing.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {listing.description}
        </p>
        
        <div className="flex items-center justify-between">
          {listing.location && (
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{listing.location}</span>
            </div>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={handleLearnMore}
            className="text-primary hover:text-primary/80 font-medium text-sm p-0"
          >
            Learn More <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
