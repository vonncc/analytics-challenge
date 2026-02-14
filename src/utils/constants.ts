import { Platform, MediaType } from '@/types';

export const PLATFORMS: Platform[] = ['instagram', 'tiktok'];

export const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: '#E4405F',
  tiktok: '#000000',
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
};

export const MEDIA_TYPES: MediaType[] = ['image', 'video', 'carousel'];

export const MEDIA_TYPE_LABELS: Record<MediaType, string> = {
  image: 'Image',
  video: 'Video',
  carousel: 'Carousel',
};

export const CHART_COLORS = {
  engagement: '#8b5cf6',
  reach: '#3b82f6',
};

export const DATE_RANGES = {
  LAST_7_DAYS: 7,
  LAST_14_DAYS: 14,
  LAST_30_DAYS: 30,
  LAST_90_DAYS: 90,
} as const;

export const DEFAULT_DATE_RANGE = DATE_RANGES.LAST_30_DAYS;

export const SORT_OPTIONS = [
  { value: 'posted_at', label: 'Date Posted' },
  { value: 'likes', label: 'Likes' },
  { value: 'shares', label: 'Shares' },
  { value: 'comments', label: 'Comments' },
  { value: 'saves', label: 'Saves' },
  { value: 'reach', label: 'Reach' },
  { value: 'impressions', label: 'Impressions' },
  { value: 'engagement_rate', label: 'Engagement Rate' },
  { value: 'total_engagement', label: 'Total Engagement' },
] as const;

export const API_ENDPOINTS = {
  ANALYTICS_SUMMARY: '/api/analytics/summary',
  METRICS_DAILY: '/api/metrics/daily',
} as const;

export const QUERY_KEYS = {
  POSTS: 'posts',
  DAILY_METRICS: 'daily-metrics',
  ANALYTICS_SUMMARY: 'analytics-summary',
} as const;
