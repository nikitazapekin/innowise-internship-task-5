import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";

interface UseDebouncedSearchOptions {
  delay?: number;
  initialValue?: string;
}

export function useDebouncedSearch(options: UseDebouncedSearchOptions = {}) {
  const { delay = 300, initialValue = "" } = options;

  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchQuery, delay]);

  return {
    searchQuery,
    debouncedQuery,
    handleSearchChange,
    clearSearch,
    setSearchQuery,
  };
}
