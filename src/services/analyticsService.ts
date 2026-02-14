import { ApiClient } from './apiClient';
import { Post, PostFilters, PostWithEngagement } from '@/types';
import { formatEngagement } from '@/utils';

export class AnalyticsService extends ApiClient {
  static async getPosts(filters?: PostFilters): Promise<PostWithEngagement[]> {
    let query = this.client
      .from('posts')
      .select('*')
      .order(filters?.sortBy || 'posted_at', {
        ascending: filters?.sortOrder === 'asc',
      });

    if (filters?.platform && filters.platform !== 'all') {
      query = query.eq('platform', filters.platform);
    }

    if (filters?.mediaType && filters.mediaType !== 'all') {
      query = query.eq('media_type', filters.mediaType);
    }

    if (filters?.dateRange) {
      query = query
        .gte('posted_at', filters.dateRange.start)
        .lte('posted_at', filters.dateRange.end);
    }

    if (filters?.searchQuery) {
      query = query.ilike('caption', `%${filters.searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      this.handleError(error, 'Failed to fetch posts');
    }

    return (data || []).map((post) => ({
      ...post,
      total_engagement: formatEngagement(
        post.likes,
        post.shares,
        post.comments,
        post.saves
      ),
    }));
  }

  static async getPostById(id: string): Promise<PostWithEngagement | null> {
    const { data, error } = await this.client
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      this.handleError(error, 'Failed to fetch post');
    }

    return {
      ...data,
      total_engagement: formatEngagement(
        data.likes,
        data.shares,
        data.comments,
        data.saves
      ),
    };
  }

  static async createPost(
    post: Omit<Post, 'id' | 'created_at'>
  ): Promise<Post> {
    const { data, error } = await this.client
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (error) {
      this.handleError(error, 'Failed to create post');
    }

    return data;
  }

  static async updatePost(id: string, updates: Partial<Post>): Promise<Post> {
    const { data, error } = await this.client
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      this.handleError(error, 'Failed to update post');
    }

    return data;
  }

  static async deletePost(id: string): Promise<void> {
    const { error } = await this.client.from('posts').delete().eq('id', id);

    if (error) {
      this.handleError(error, 'Failed to delete post');
    }
  }
}
