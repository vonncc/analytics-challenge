import { create } from 'zustand';
import { MetricType } from '@/types';

export type ChartType = 'line' | 'area';

interface ChartState {
  chartType: ChartType;
  selectedMetrics: MetricType[];
  setChartType: (type: ChartType) => void;
  toggleMetric: (metric: MetricType) => void;
  setSelectedMetrics: (metrics: MetricType[]) => void;
}

const defaultMetrics: MetricType[] = ['engagement', 'reach'];

export const useChartStore = create<ChartState>((set) => ({
  chartType: 'area',
  selectedMetrics: defaultMetrics,

  setChartType: (chartType) => set({ chartType }),

  toggleMetric: (metric) =>
    set((state) => {
      const isSelected = state.selectedMetrics.includes(metric);

      if (isSelected) {
        const filtered = state.selectedMetrics.filter((m) => m !== metric);
        return { selectedMetrics: filtered.length > 0 ? filtered : [metric] };
      }

      return { selectedMetrics: [...state.selectedMetrics, metric] };
    }),

  setSelectedMetrics: (selectedMetrics) =>
    set({
      selectedMetrics:
        selectedMetrics.length > 0 ? selectedMetrics : defaultMetrics,
    }),
}));
