import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { SearchOverlay } from './SearchOverlay';
import { useSearch } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';
import { Search, Bell, Leaf } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isSearchOpen, openSearch, closeSearch, handleSearch, query, searchResults, isLoading } = useSearch();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Sigma Earth</h1>
                <p className="text-xs text-gray-500">Sustainability Hub</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                variant="ghost"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                onClick={openSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-orange rounded-full"></span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onSearch={handleSearch}
        query={query}
        searchResults={searchResults}
        isLoading={isLoading}
      />
    </div>
  );
}
