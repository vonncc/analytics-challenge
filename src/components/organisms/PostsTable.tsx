'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LoadingState,
  ErrorState,
  EmptyState,
} from '@/components/atoms';
import { TableRow } from '@/components/molecules';
import { AnalyticsService } from '@/services';
import { useFilters, useModal } from '@/hooks';
import { QUERY_KEYS } from '@/utils';
import { ArrowUpDown, FileText } from 'lucide-react';
import { PostFilters } from '@/types';

interface SortableHeaderProps {
  column: PostFilters['sortBy'];
  label: string;
  onClick: (column: PostFilters['sortBy']) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  column,
  label,
  onClick,
}) => (
  <th
    onClick={() => onClick(column)}
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-2">
      {label}
      <ArrowUpDown className="w-4 h-4" />
    </div>
  </th>
);

export const PostsTable: React.FC = () => {
  const { filters, setSortBy, setSortOrder } = useFilters();
  const { openModal } = useModal();

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, filters],
    queryFn: () => AnalyticsService.getPosts(filters),
  });

  const handleSort = (column: typeof filters.sortBy) => {
    if (filters.sortBy === column) {
      setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <LoadingState message="Loading posts..." />
        ) : error ? (
          <ErrorState
            title="Failed to Load Posts"
            message={
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred'
            }
            onRetry={() => refetch()}
          />
        ) : posts && posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableHeader
                    column="posted_at"
                    label="Post"
                    onClick={handleSort}
                  />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform / Type
                  </th>
                  <SortableHeader
                    column="likes"
                    label="Likes"
                    onClick={handleSort}
                  />
                  <SortableHeader
                    column="comments"
                    label="Comments"
                    onClick={handleSort}
                  />
                  <SortableHeader
                    column="saves"
                    label="Saves"
                    onClick={handleSort}
                  />
                  <SortableHeader
                    column="reach"
                    label="Reach"
                    onClick={handleSort}
                  />
                  <SortableHeader
                    column="total_engagement"
                    label="Engagement"
                    onClick={handleSort}
                  />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <TableRow key={post.id} post={post} onClick={openModal} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No Posts Found"
            description="Try adjusting your filters or date range to see more posts."
            icon={<FileText className="w-12 h-12" />}
          />
        )}
      </CardContent>
    </Card>
  );
};
