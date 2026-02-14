export interface Post {
  id: string;
  user_id: string;
  platform: Platform;
  caption: string | null;
  thumbnail_url: string | null;
  media_type: MediaType;
  posted_at: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  impressions: number;
  engagement_rate: number | null;
  permalink: string | null;
  created_at: string;
}

export type Platform = 'instagram' | 'tiktok';

export type MediaType = 'image' | 'video' | 'carousel';

export interface PostWithEngagement extends Post {
  total_engagement: number;
}

export interface PostFilters {
  platform?: Platform | 'all';
  mediaType?: MediaType | 'all';
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?:
    | 'posted_at'
    | 'likes'
    | 'shares'
    | 'comments'
    | 'saves'
    | 'reach'
    | 'impressions'
    | 'total_engagement'
    | 'engagement_rate';
  sortOrder?: 'asc' | 'desc';
  searchQuery?: string;
}
