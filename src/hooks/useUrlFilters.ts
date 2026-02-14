import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useFiltersStore } from '@/store';
import { Platform, MediaType, PostFilters } from '@/types';

export const useUrlFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { filters, setFilters } = useFiltersStore();

  // Sync URL params to store on mount
  useEffect(() => {
    const platform = searchParams.get('platform') as Platform | 'all' | null;
    const mediaType = searchParams.get('mediaType') as MediaType | 'all' | null;
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | null;

    const updates: Partial<PostFilters> = {};

    if (platform) updates.platform = platform;
    if (mediaType) updates.mediaType = mediaType;
    if (search) updates.searchQuery = search;
    if (sortBy) updates.sortBy = sortBy as PostFilters['sortBy'];
    if (sortOrder) updates.sortOrder = sortOrder;

    if (Object.keys(updates).length > 0) {
      setFilters(updates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync store to URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.platform && filters.platform !== 'all')
      params.set('platform', filters.platform);
    if (filters.mediaType && filters.mediaType !== 'all')
      params.set('mediaType', filters.mediaType);
    if (filters.searchQuery) params.set('search', filters.searchQuery);
    if (filters.sortBy && filters.sortBy !== 'posted_at')
      params.set('sortBy', filters.sortBy);
    if (filters.sortOrder && filters.sortOrder !== 'desc')
      params.set('sortOrder', filters.sortOrder);

    const queryString = params.toString();
    const currentSearch = searchParams.toString();

    // Only update if URL actually changed
    if (currentSearch !== queryString) {
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [
    filters.platform,
    filters.mediaType,
    filters.searchQuery,
    filters.sortBy,
    filters.sortOrder,
    router,
    pathname,
    searchParams,
  ]);

  return { filters };
};
