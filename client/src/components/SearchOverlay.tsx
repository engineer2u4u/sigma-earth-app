import { useState } from 'react';
import { ArrowLeft, Search, Leaf, Briefcase, Calendar, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, category?: string) => void;
  query: string;
  searchResults?: any;
  isLoading: boolean;
}

const searchSuggestions = [
  { icon: Leaf, text: 'Carbon Footprint Course', category: 'courses' },
  { icon: Briefcase, text: 'Sustainability Jobs', category: 'jobs' },
  { icon: Calendar, text: 'Climate Events', category: 'events' },
  { icon: Recycle, text: 'Eco-friendly Products', category: 'eco-listing' },
];

export function SearchOverlay({ isOpen, onClose, onSearch, query, searchResults, isLoading }: SearchOverlayProps) {
  const [searchInput, setSearchInput] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleSuggestionClick = (suggestion: typeof searchSuggestions[0]) => {
    onSearch(suggestion.text, suggestion.category);
    setSearchInput(suggestion.text);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-white z-50 transform transition-transform duration-300",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </Button>
          
          <form onSubmit={handleSubmit} className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search courses, jobs, eco listings..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-4 w-4 text-gray-400" />
            </Button>
          </form>
        </div>
        
        {/* Search Results */}
        {query && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 px-2 mb-2">
              {isLoading ? 'Searching...' : `Results for "${query}"`}
            </h3>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg bg-gray-100 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className="space-y-1">
                {searchResults.map((result: any, index: number) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Leaf className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{result.title}</p>
                        <p className="text-xs text-gray-500">{result.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No results found</p>
            )}
          </div>
        )}

        {/* Search Suggestions */}
        {!query && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 px-2">Popular Searches</p>
            <div className="space-y-1">
              {searchSuggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <span className="text-gray-700">{suggestion.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
