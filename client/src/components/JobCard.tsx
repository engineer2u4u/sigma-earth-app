import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import type { Job } from '@shared/schema';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: number) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const handleApply = () => {
    if (onApply) {
      onApply(job.id);
    }
  };

  return (
    <Card className="border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">{job.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{job.company}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{job.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{job.type}</span>
              </span>
              {job.salary && (
                <span className="flex items-center space-x-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{job.salary}</span>
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleApply}
            className="bg-sage-500 text-white hover:bg-sage-600 ml-4"
          >
            Apply
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {job.description}
        </p>
        
        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
