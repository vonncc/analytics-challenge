'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ErrorState,
} from '@/components/atoms';
import {
  formatNumber,
  formatPercentage,
  API_ENDPOINTS,
  QUERY_KEYS,
} from '@/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AnalyticsSummary } from '@/types';

export const SummaryCards: React.FC = () => {
  const {
    data: summary,
    isLoading,
    error,
    refetch,
  } = useQuery<AnalyticsSummary>({
    queryKey: [QUERY_KEYS.ANALYTICS_SUMMARY],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.ANALYTICS_SUMMARY);
      if (!response.ok) throw new Error('Failed to fetch analytics summary');
      return response.json();
    },
  });

  if (error) {
    return (
      <Card>
        <CardContent className="p-0">
          <ErrorState
            title="Failed to Load Summary"
            message={
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred'
            }
            onRetry={() => refetch()}
          />
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const TrendIcon = ({
    direction,
  }: {
    direction: 'up' | 'down' | 'neutral';
  }) => {
    if (direction === 'up')
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (direction === 'down')
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const cards = [
    {
      title: 'Total Engagement',
      value: formatNumber(summary.totalEngagement),
      trend: summary.trends.engagement,
      description: `Avg: ${formatNumber(summary.averageEngagement)} per post`,
    },
    {
      title: 'Total Reach',
      value: formatNumber(summary.totalReach),
      trend: summary.trends.reach,
      description: `Avg: ${formatNumber(summary.averageReach)} per post`,
    },
    {
      title: 'Total Posts',
      value: summary.totalPosts.toString(),
      trend: null,
      description: summary.topPost
        ? `Top: ${summary.topPost.caption.substring(0, 30)}...`
        : 'No posts yet',
    },
    {
      title: 'Avg Engagement Rate',
      value: `${summary.averageEngagementRate.toFixed(2)}%`,
      trend: null,
      description: `${formatNumber(summary.totalLikes)} likes, ${formatNumber(summary.totalSaves)} saves`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              {card.trend && (
                <div className="flex items-center gap-1">
                  <TrendIcon direction={card.trend.direction} />
                  <span
                    className={`text-sm font-medium ${
                      card.trend.direction === 'up'
                        ? 'text-green-600'
                        : card.trend.direction === 'down'
                          ? 'text-red-600'
                          : 'text-gray-400'
                    }`}
                  >
                    {formatPercentage(card.trend.percentage)}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
