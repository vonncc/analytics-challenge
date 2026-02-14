import { useFiltersStore } from '@/store';
import { PostFilters, Platform, MediaType } from '@/types';

export const useFilters = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    setPlatform,
    setMediaType,
    setDateRange,
    setSortBy,
    setSortOrder,
    setSearchQuery,
  } = useFiltersStore();

  const handlePlatformChange = (platform: Platform | 'all') => {
    setPlatform(platform);
  };

  const handleMediaTypeChange = (mediaType: MediaType | 'all') => {
    setMediaType(mediaType);
  };

  const handleDateRangeChange = (days: number) => {
    setDateRange(days);
  };

  const handleSortChange = (
    sortBy: PostFilters['sortBy'],
    sortOrder: 'asc' | 'desc'
  ) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleReset = () => {
    resetFilters();
  };

  return {
    filters,
    setFilters,
    resetFilters: handleReset,
    setPlatform: handlePlatformChange,
    setMediaType: handleMediaTypeChange,
    setDateRange: handleDateRangeChange,
    setSortBy,
    setSortOrder,
    setSearchQuery: handleSearchChange,
    handleSortChange,
  };
};
