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
import { ChartLegend } from '@/components/molecules';
import { useChartStore, useFiltersStore } from '@/store';
import {
  API_ENDPOINTS,
  QUERY_KEYS,
  formatChartDate,
  CHART_COLORS,
} from '@/utils';
import { ChartDataPoint } from '@/types';
import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const EngagementChart: React.FC = () => {
  const { chartType, selectedMetrics, toggleMetric } = useChartStore();
  const { filters } = useFiltersStore();

  const {
    data: chartData,
    isLoading,
    error,
    refetch,
  } = useQuery<ChartDataPoint[]>({
    queryKey: [QUERY_KEYS.DAILY_METRICS, filters.dateRange],
    queryFn: async () => {
      const params = new URLSearchParams({
        start: filters.dateRange?.start || '',
        end: filters.dateRange?.end || '',
      });
      const response = await fetch(`${API_ENDPOINTS.METRICS_DAILY}?${params}`);
      if (!response.ok) throw new Error('Failed to fetch chart data');
      return response.json();
    },
  });

  const formattedData =
    chartData?.map((point) => ({
      ...point,
      date: formatChartDate(point.date),
    })) || [];

  const ChartComponent = chartType === 'area' ? AreaChart : LineChart;
  const DataComponent = (chartType === 'area' ? Area : Line) as typeof Line;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Engagement Trends</CardTitle>
          <ChartLegend
            selectedMetrics={selectedMetrics}
            onToggleMetric={toggleMetric}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState message="Loading chart data..." />
        ) : error ? (
          <ErrorState
            title="Failed to Load Chart"
            message={
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred'
            }
            onRetry={() => refetch()}
          />
        ) : !chartData || chartData.length === 0 ? (
          <EmptyState
            title="No Data Available"
            description="No metrics data found for the selected date range."
            icon={<TrendingUp className="w-12 h-12" />}
          />
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <ChartComponent data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              {selectedMetrics.includes('engagement') && (
                <DataComponent
                  type="monotone"
                  dataKey="engagement"
                  stroke={CHART_COLORS.engagement}
                  fill={CHART_COLORS.engagement}
                  fillOpacity={chartType === 'area' ? 0.6 : 1}
                  strokeWidth={2}
                />
              )}
              {selectedMetrics.includes('reach') && (
                <DataComponent
                  type="monotone"
                  dataKey="reach"
                  stroke={CHART_COLORS.reach}
                  fill={CHART_COLORS.reach}
                  fillOpacity={chartType === 'area' ? 0.6 : 1}
                  strokeWidth={2}
                />
              )}
            </ChartComponent>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
