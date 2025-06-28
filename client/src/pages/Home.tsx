import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NewsCard } from '@/components/NewsCard';
import { ExternalLink, Users, Award, Building, BookOpen, FileText, GraduationCap } from 'lucide-react';
import { fetchWordPressNews, fetchSigmaEarthCourses, fetchSigmaEarthEvents } from '@/lib/api';
import { COMPANY_STATS } from '@/lib/constants';

export default function Home() {
  const { data: news, isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['/api/news'],
    queryFn: fetchWordPressNews,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const { data: courses } = useQuery({
    queryKey: ['/api/sigma-earth/courses'],
    queryFn: fetchSigmaEarthCourses,
  });

  const { data: events } = useQuery({
    queryKey: ['/api/sigma-earth/events'],
    queryFn: fetchSigmaEarthEvents,
  });

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/GCjWKqLbJljG4jLuAixpEN', '_blank');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative section-gradient text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='2' fill='white'/></svg>")`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
        
        <div className="relative px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Create Long-term Sustainability Value</h2>
            <p className="text-white/90 mb-6">Through environmental courses, green jobs, and sustainability events</p>
            
            <Button
              onClick={handleWhatsAppJoin}
              className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              <Users className="mr-2 h-4 w-4" />
              Join Our Community
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-6 bg-white">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/10 border-0">
            <CardContent className="text-center p-4 animate-counter">
              <div className="text-2xl font-bold text-primary">{COMPANY_STATS.projects}</div>
              <div className="text-xs text-gray-600">Projects Across Value Chain</div>
            </CardContent>
          </Card>
          
          <Card className="bg-sage-500/10 border-0">
            <CardContent className="text-center p-4 animate-counter">
              <div className="text-2xl font-bold text-sage-600">{COMPANY_STATS.clients}</div>
              <div className="text-xs text-gray-600">Global Clients</div>
            </CardContent>
          </Card>
          
          <Card className="bg-accent-orange/10 border-0">
            <CardContent className="text-center p-4 animate-counter">
              <div className="text-2xl font-bold text-accent-orange">{COMPANY_STATS.freeCourses}</div>
              <div className="text-xs text-gray-600">Free Courses</div>
            </CardContent>
          </Card>
          
          <Card className="bg-accent-yellow/10 border-0">
            <CardContent className="text-center p-4 animate-counter">
              <div className="text-2xl font-bold text-accent-yellow">{COMPANY_STATS.articles}</div>
              <div className="text-xs text-gray-600">Articles</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Services Overview */}
      <div className="px-4 py-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How We Help</h3>
        
        {/* Environmental Courses Card */}
        <Card className="border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
            alt="Student studying environmental science"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-gray-800">Environmental Courses</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Comprehensive range of environmental courses designed for sustainability professionals and enthusiasts.
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium text-sm p-0">
              Explore Courses <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Green Jobs Card */}
        <Card className="border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
            alt="Professional working on sustainability projects"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Building className="h-5 w-5 text-sage-500" />
              <h4 className="font-semibold text-gray-800">Green Jobs</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Connect with latest opportunities in environmental sustainability, renewable energy, and green building.
            </p>
            <Button variant="ghost" className="text-sage-500 hover:text-sage-600 font-medium text-sm p-0">
              Explore Jobs <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Sustainability Events Card */}
        <Card className="border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
            alt="Sustainability conference with networking"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-accent-orange" />
              <h4 className="font-semibold text-gray-800">Sustainability Events</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Join workshops, conferences, webinars and networking gatherings focused on environmental sustainability.
            </p>
            <Button variant="ghost" className="text-accent-orange hover:text-accent-orange/80 font-medium text-sm p-0">
              Explore Events <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Featured Courses Section */}
      {courses && courses.length > 0 && (
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Featured Courses</h3>
            <Button variant="ghost" className="text-primary text-sm font-medium p-0">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {courses.slice(0, 3).map((course: any) => (
              <Card key={course.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <img
                      src={course.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e"}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{course.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                        <span className="text-xs text-gray-500">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Latest News Section */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">What's New</h3>
          <Button variant="ghost" className="text-primary text-sm font-medium p-0">
            View All
          </Button>
        </div>
        
        {newsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border border-gray-100">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : newsError ? (
          <Card className="border border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-red-600 text-sm">Failed to load latest news</p>
              <p className="text-red-500 text-xs mt-1">Please check your connection and try again</p>
            </CardContent>
          </Card>
        ) : news && news.length > 0 ? (
          <div className="space-y-3">
            {news.slice(0, 3).map((article) => (
              <NewsCard key={article.id} news={article} />
            ))}
          </div>
        ) : (
          <Card className="border border-gray-200">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">No news articles available</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Partners Section */}
      <div className="px-4 py-6 bg-white">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Trusted Partners</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-gray-700">Rude Labs</p>
              <p className="text-xs text-gray-500">Technical Partner</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200">
            <CardContent className="text-center p-4">
              <div className="w-12 h-12 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6 text-accent-yellow" />
              </div>
              <p className="text-sm font-medium text-gray-700">Energy Theory</p>
              <p className="text-xs text-gray-500">Knowledge Partner</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
