import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EcoListingCard } from '@/components/EcoListingCard';
import { Leaf, AlertCircle, Plus } from 'lucide-react';
import { fetchSigmaEarthEcoListings } from '@/lib/api';
import { ECO_LISTING_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function EcoListing() {
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['/api/sigma-earth/eco-listings'],
    queryFn: fetchSigmaEarthEcoListings,
  });

  const handleLearnMore = (listingId: number) => {
    // TODO: Implement listing details view
    console.log('Learn more about listing:', listingId);
  };

  const filteredListings = listings?.filter((listing: any) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Products') return listing.category === 'product';
    if (activeCategory === 'Services') return listing.category === 'service';
    if (activeCategory === 'Local') return listing.location && listing.location.includes('USA');
    return true;
  }) || [];

  return (
    <div className="animate-fade-in">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Eco-Friendly Listings</h2>
          <p className="text-gray-600">Discover sustainable products and services</p>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {ECO_LISTING_CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Eco Listings Grid */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border border-gray-100">
                <div className="w-full h-40 bg-gray-200 animate-pulse" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Listings</h3>
              <p className="text-red-600 text-sm">
                We couldn't retrieve the eco-friendly listings. Please check your internet connection and try again.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredListings.length === 0 ? (
          <Card className="border border-gray-200">
            <CardContent className="p-6 text-center">
              <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Listings Available</h3>
              <p className="text-gray-600 text-sm">
                {activeCategory === 'All' 
                  ? 'No eco-friendly listings are currently available. Please check back later.'
                  : `No listings found in the "${activeCategory}" category.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {filteredListings.map((listing: any) => (
                <EcoListingCard
                  key={listing.id}
                  listing={listing}
                  onLearnMore={handleLearnMore}
                />
              ))}
            </div>

            {/* Add Your Listing CTA */}
            <Card className="mt-6 section-gradient text-white border-0">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">List Your Eco-Friendly Business</h3>
                <p className="text-white/90 mb-4">Join our community of sustainable businesses and reach eco-conscious customers</p>
                <Button
                  className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-white/90"
                >
                  Add Your Listing
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
