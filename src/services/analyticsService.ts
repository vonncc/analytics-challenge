import { supabase } from './supabaseClient';
import { Post, PostFilters, PostWithEngagement } from '@/types';
import { formatEngagement } from '@/utils';

export class AnalyticsService {
  static async getPosts(filters?: PostFilters): Promise<PostWithEngagement[]> {
    let query = supabase
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
      throw new Error(`Failed to fetch posts: ${error.message}`);
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
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch post: ${error.message}`);
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
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }

    return data;
  }

  static async updatePost(id: string, updates: Partial<Post>): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }

    return data;
  }

  static async deletePost(id: string): Promise<void> {
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }
}
