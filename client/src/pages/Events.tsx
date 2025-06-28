import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EventCard } from '@/components/EventCard';
import { Calendar, AlertCircle, CalendarPlus } from 'lucide-react';
import { fetchSigmaEarthEvents } from '@/lib/api';
import { EVENT_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Events() {
  const [activeType, setActiveType] = useState('All Events');

  const { data: events, isLoading, error } = useQuery({
    queryKey: ['/api/sigma-earth/events'],
    queryFn: fetchSigmaEarthEvents,
  });

  const handleRegister = (eventId: number) => {
    // TODO: Implement event registration
    console.log('Registering for event:', eventId);
  };

  const filteredEvents = events?.filter((event: any) => {
    if (activeType === 'All Events') return true;
    return event.type.toLowerCase() === activeType.toLowerCase();
  }) || [];

  return (
    <div className="animate-fade-in">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sustainability Events</h2>
          <p className="text-gray-600">Join workshops, conferences, and networking events</p>
        </div>

        {/* Event Type Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {EVENT_TYPES.map((type) => (
            <Button
              key={type}
              onClick={() => setActiveType(type)}
              variant={activeType === type ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeType === type
                  ? "bg-accent-orange text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Upcoming Events */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border border-gray-100">
                <div className="w-full h-40 bg-gray-200 animate-pulse" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Events</h3>
              <p className="text-red-600 text-sm">
                We couldn't retrieve the event listings. Please check your internet connection and try again.
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
        ) : filteredEvents.length === 0 ? (
          <Card className="border border-gray-200">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Events Available</h3>
              <p className="text-gray-600 text-sm">
                {activeType === 'All Events' 
                  ? 'No events are currently scheduled. Please check back later.'
                  : `No "${activeType.toLowerCase()}" events are currently available.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {filteredEvents.map((event: any) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                />
              ))}
            </div>

            {/* Event Calendar CTA */}
            <Card className="mt-6 bg-gradient-to-r from-accent-orange to-accent-yellow text-white border-0">
              <CardContent className="p-6 text-center">
                <CalendarPlus className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Host Your Sustainability Event</h3>
                <p className="text-orange-100 mb-4">Reach thousands of sustainability professionals and enthusiasts</p>
                <Button
                  className="bg-white text-accent-orange px-6 py-3 rounded-xl font-semibold hover:bg-orange-50"
                >
                  Submit Event
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
