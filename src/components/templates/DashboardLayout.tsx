'use client';

import React from 'react';
import { useFilters, useUrlFilters } from '@/hooks';
import { Button, Input } from '@/components/atoms';
import { UserMenu } from '@/components/molecules';
import {
  PLATFORMS,
  DATE_RANGES,
  PLATFORM_LABELS,
  MEDIA_TYPES,
  MEDIA_TYPE_LABELS,
} from '@/utils';
import { Filter, Search } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  // Sync filters with URL query params
  useUrlFilters();

  const {
    filters,
    setPlatform,
    setMediaType,
    setDateRange,
    setSearchQuery,
    resetFilters,
  } = useFilters();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={filters.platform || 'all'}
                onChange={(e) => {
                  const value = e.target.value;
                  setPlatform(
                    value === 'all'
                      ? 'all'
                      : (value as (typeof PLATFORMS)[number])
                  );
                }}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Platforms</option>
                {PLATFORMS.map((platform) => (
                  <option key={platform} value={platform}>
                    {PLATFORM_LABELS[platform]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Type
              </label>
              <select
                value={filters.mediaType || 'all'}
                onChange={(e) => {
                  const value = e.target.value;
                  setMediaType(
                    value === 'all'
                      ? 'all'
                      : (value as (typeof MEDIA_TYPES)[number])
                  );
                }}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {MEDIA_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {MEDIA_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                defaultValue={DATE_RANGES.LAST_30_DAYS}
                onChange={(e) => setDateRange(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={DATE_RANGES.LAST_7_DAYS}>Last 7 Days</option>
                <option value={DATE_RANGES.LAST_14_DAYS}>Last 14 Days</option>
                <option value={DATE_RANGES.LAST_30_DAYS}>Last 30 Days</option>
                <option value={DATE_RANGES.LAST_90_DAYS}>Last 90 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search captions..."
                  value={filters.searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
