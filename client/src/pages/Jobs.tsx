import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JobCard } from '@/components/JobCard';
import { Briefcase, AlertCircle, Bell } from 'lucide-react';
import { fetchSigmaEarthJobs } from '@/lib/api';
import { JOB_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Jobs() {
  const [activeCategory, setActiveCategory] = useState('All Jobs');

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['/api/sigma-earth/jobs'],
    queryFn: fetchSigmaEarthJobs,
  });

  const handleApply = (jobId: number) => {
    // TODO: Implement job application
    console.log('Applying to job:', jobId);
  };

  const filteredJobs = jobs?.filter((job: any) => {
    if (activeCategory === 'All Jobs') return true;
    if (activeCategory === 'Remote') return job.location.toLowerCase().includes('remote');
    if (activeCategory === 'Full-time') return job.type.toLowerCase().includes('full-time');
    if (activeCategory === 'Entry Level') return job.title.toLowerCase().includes('entry') || job.title.toLowerCase().includes('junior');
    return true;
  }) || [];

  return (
    <div className="animate-fade-in">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Green Jobs</h2>
          <p className="text-gray-600">Discover opportunities in environmental sustainability</p>
        </div>

        {/* Job Categories */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {JOB_CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === category
                  ? "bg-sage-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border border-gray-100">
                <CardContent className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Jobs</h3>
              <p className="text-red-600 text-sm">
                We couldn't retrieve the job listings. Please check your internet connection and try again.
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
        ) : filteredJobs.length === 0 ? (
          <Card className="border border-gray-200">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Jobs Available</h3>
              <p className="text-gray-600 text-sm">
                {activeCategory === 'All Jobs' 
                  ? 'No job listings are currently available. Please check back later.'
                  : `No jobs found in the "${activeCategory}" category.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {filteredJobs.map((job: any) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                />
              ))}
            </div>

            {/* Job Alerts Banner */}
            <Card className="mt-6 section-gradient text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Get Job Alerts</h3>
                    <p className="text-sm text-white/90">Never miss a green job opportunity</p>
                  </div>
                  <Button
                    className="bg-white text-sage-600 px-4 py-2 rounded-lg font-medium hover:bg-white/90"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
