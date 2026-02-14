import { create } from 'zustand';
import { PostFilters, Platform, MediaType } from '@/types';
import { DEFAULT_DATE_RANGE } from '@/utils';

interface FiltersState {
  filters: PostFilters;
  setFilters: (filters: Partial<PostFilters>) => void;
  resetFilters: () => void;
  setPlatform: (platform: Platform | 'all') => void;
  setMediaType: (mediaType: MediaType | 'all') => void;
  setDateRange: (days: number) => void;
  setSortBy: (sortBy: PostFilters['sortBy']) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setSearchQuery: (query: string) => void;
}

const getDefaultDateRange = (days: number) => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};

const initialFilters: PostFilters = {
  platform: 'all',
  mediaType: 'all',
  dateRange: getDefaultDateRange(DEFAULT_DATE_RANGE),
  sortBy: 'posted_at',
  sortOrder: 'desc',
  searchQuery: '',
};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: initialFilters,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  setPlatform: (platform) =>
    set((state) => ({
      filters: { ...state.filters, platform },
    })),

  setMediaType: (mediaType) =>
    set((state) => ({
      filters: { ...state.filters, mediaType },
    })),

  setDateRange: (days) =>
    set((state) => ({
      filters: { ...state.filters, dateRange: getDefaultDateRange(days) },
    })),

  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),

  setSortOrder: (sortOrder) =>
    set((state) => ({
      filters: { ...state.filters, sortOrder },
    })),

  setSearchQuery: (searchQuery) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery },
    })),
}));
