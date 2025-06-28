import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CourseCard } from '@/components/CourseCard';
import { BookOpen, AlertCircle } from 'lucide-react';
import { fetchSigmaEarthCourses } from '@/lib/api';
import { COURSE_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('All Courses');

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['/api/sigma-earth/courses'],
    queryFn: fetchSigmaEarthCourses,
  });

  const handleEnroll = (courseId: number) => {
    // TODO: Implement course enrollment
    console.log('Enrolling in course:', courseId);
  };

  const filteredCourses = courses?.filter((course: any) => {
    if (activeCategory === 'All Courses') return true;
    if (activeCategory === 'Popular') return course.isPopular;
    if (activeCategory === 'Free') return course.isFree;
    if (activeCategory === 'Certified') return course.isCertified;
    return true;
  }) || [];

  return (
    <div className="animate-fade-in">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Environmental Courses</h2>
          <p className="text-gray-600">Gain unlimited access to 60+ professional environmental courses</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {COURSE_CATEGORIES.map((category) => (
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

        {/* Course Grid */}
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
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Courses</h3>
              <p className="text-red-600 text-sm">
                We couldn't retrieve the course listings. Please check your internet connection and try again.
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
        ) : filteredCourses.length === 0 ? (
          <Card className="border border-gray-200">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Courses Available</h3>
              <p className="text-gray-600 text-sm">
                {activeCategory === 'All Courses' 
                  ? 'No courses are currently available. Please check back later.'
                  : `No courses found in the "${activeCategory}" category.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {filteredCourses.map((course: any) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-6">
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200"
              >
                Load More Courses
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
