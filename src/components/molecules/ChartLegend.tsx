import React from 'react';
import { MetricType } from '@/types';
import { CHART_COLORS } from '@/utils';

interface ChartLegendProps {
  selectedMetrics: MetricType[];
  onToggleMetric: (metric: MetricType) => void;
}

const metricLabels: Record<MetricType, string> = {
  engagement: 'Engagement',
  reach: 'Reach',
};

export const ChartLegend: React.FC<ChartLegendProps> = ({
  selectedMetrics,
  onToggleMetric,
}) => {
  const metrics: MetricType[] = ['engagement', 'reach'];

  return (
    <div className="flex flex-wrap gap-4">
      {metrics.map((metric) => {
        const isSelected = selectedMetrics.includes(metric);
        return (
          <button
            key={metric}
            onClick={() => onToggleMetric(metric)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
              isSelected
                ? 'bg-gray-100 border border-gray-300'
                : 'bg-white border border-gray-200 opacity-50 hover:opacity-75'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_COLORS[metric] }}
            />
            <span className="text-sm font-medium text-gray-700">
              {metricLabels[metric]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
