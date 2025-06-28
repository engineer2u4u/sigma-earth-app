import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';
import type { Course } from '@shared/schema';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: number) => void;
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course.id);
    }
  };

  return (
    <Card className="border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {course.isPopular && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Popular
              </Badge>
            )}
            {course.isCertified && (
              <Badge variant="secondary" className="bg-accent-orange/20 text-accent-orange">
                Certified
              </Badge>
            )}
          </div>
          <span className={`text-sm font-bold ${course.isFree ? 'text-accent-yellow' : 'text-gray-600'}`}>
            {course.isFree ? 'FREE' : `$${course.price}`}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {course.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{course.studentCount} students</span>
            </div>
          </div>
          
          <Button
            size="sm"
            onClick={handleEnroll}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
