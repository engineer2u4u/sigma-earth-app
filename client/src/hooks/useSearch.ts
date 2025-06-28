import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchContent } from '@/lib/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['/api/search', query, category],
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setQuery('');
    setCategory(undefined);
  }, []);

  const handleSearch = useCallback((newQuery: string, newCategory?: string) => {
    setQuery(newQuery);
    setCategory(newCategory);
  }, []);

  return {
    query,
    category,
    isSearchOpen,
    searchResults,
    isLoading,
    error,
    openSearch,
    closeSearch,
    handleSearch,
  };
}
