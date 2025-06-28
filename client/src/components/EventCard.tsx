import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Event } from '@shared/schema';

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: number) => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const handleRegister = () => {
    if (onRegister) {
      onRegister(event.id);
    }
  };

  const typeColors = {
    conference: 'bg-accent-orange/20 text-accent-orange',
    workshop: 'bg-sage-500/20 text-sage-600',
    webinar: 'bg-primary/10 text-primary',
    networking: 'bg-accent-orange/20 text-accent-orange',
  };

  return (
    <Card className="border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-40 object-cover"
        />
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={typeColors[event.type as keyof typeof typeColors] || 'bg-gray-100 text-gray-700'}
            >
              {event.type}
            </Badge>
            {event.isFeatured && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Featured
              </Badge>
            )}
          </div>
          <span className={`font-bold text-sm ${event.price === 0 ? 'text-primary' : 'text-accent-orange'}`}>
            {event.price === 0 ? 'FREE' : `$${event.price}`}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {format(new Date(event.startDate), 'MMM d, yyyy')}
              {event.endDate && event.endDate !== event.startDate && 
                ` - ${format(new Date(event.endDate), 'MMM d, yyyy')}`
              }
            </span>
          </div>
          {event.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          )}
          {event.maxAttendees && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{event.currentAttendees || 0}/{event.maxAttendees} attendees</span>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleRegister}
          className={`w-full font-medium transition-colors ${
            event.type === 'conference' || event.type === 'networking'
              ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
              : event.type === 'workshop'
              ? 'bg-sage-500 text-white hover:bg-sage-600'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          Register Now
        </Button>
      </CardContent>
    </Card>
  );
}
