export interface DailyMetric {
  id: string;
  user_id: string;
  date: string;
  engagement: number;
  reach: number;
  created_at: string;
}

export interface AnalyticsSummary {
  totalPosts: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  totalSaves: number;
  totalReach: number;
  totalImpressions: number;
  totalEngagement: number;
  averageLikes: number;
  averageShares: number;
  averageComments: number;
  averageSaves: number;
  averageReach: number;
  averageImpressions: number;
  averageEngagement: number;
  averageEngagementRate: number;
  topPost: {
    id: string;
    caption: string;
    engagement: number;
  } | null;
  trends: {
    likes: TrendIndicator;
    shares: TrendIndicator;
    comments: TrendIndicator;
    saves: TrendIndicator;
    reach: TrendIndicator;
    engagement: TrendIndicator;
  };
}

export interface TrendIndicator {
  value: number;
  percentage: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  date: string;
  engagement: number;
  reach: number;
}

export type MetricType = 'engagement' | 'reach';

export interface DateRange {
  start: string;
  end: string;
}
