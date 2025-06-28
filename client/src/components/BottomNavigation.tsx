import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { Home, GraduationCap, Briefcase, Leaf, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'courses', label: 'Courses', icon: GraduationCap, path: '/courses' },
  { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
  { id: 'eco-listing', label: 'Eco Listing', icon: Leaf, path: '/eco-listing' },
  { id: 'events', label: 'Events', icon: Calendar, path: '/events' },
];

export function BottomNavigation() {
  const [location] = useLocation();

  const getActiveColor = (path: string) => {
    switch (path) {
      case '/':
        return 'text-primary bg-primary/20';
      case '/courses':
        return 'text-primary bg-primary/20';
      case '/jobs':
        return 'text-sage-500 bg-sage-500/20';
      case '/eco-listing':
        return 'text-primary bg-primary/20';
      case '/events':
        return 'text-accent-orange bg-accent-orange/20';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.id} href={item.path}>
              <button
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-xl transition-colors",
                  isActive ? getActiveColor(item.path) : "text-gray-600 hover:text-gray-800"
                )}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
