import { supabase } from './supabaseClient';
import { DailyMetric, ChartDataPoint } from '@/types';

export class MetricsService {
  static async getDailyMetrics(
    startDate: string,
    endDate: string
  ): Promise<DailyMetric[]> {
    const { data, error } = await supabase
      .from('daily_metrics')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch daily metrics: ${error.message}`);
    }

    return data || [];
  }

  static async getChartData(
    startDate: string,
    endDate: string
  ): Promise<ChartDataPoint[]> {
    const metrics = await this.getDailyMetrics(startDate, endDate);

    return metrics.map((metric) => ({
      date: metric.date,
      engagement: metric.engagement,
      reach: metric.reach,
    }));
  }

  static async createOrUpdateDailyMetric(
    date: string,
    userId: string
  ): Promise<DailyMetric> {
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('likes, shares, comments, saves, reach')
      .eq('user_id', userId)
      .gte('posted_at', `${date}T00:00:00`)
      .lte('posted_at', `${date}T23:59:59`);

    if (postsError) {
      throw new Error(
        `Failed to fetch posts for metrics: ${postsError.message}`
      );
    }

    const totalLikes = posts?.reduce((sum, p) => sum + p.likes, 0) || 0;
    const totalShares = posts?.reduce((sum, p) => sum + p.shares, 0) || 0;
    const totalComments = posts?.reduce((sum, p) => sum + p.comments, 0) || 0;
    const totalSaves = posts?.reduce((sum, p) => sum + p.saves, 0) || 0;
    const totalEngagement =
      totalLikes + totalShares + totalComments + totalSaves;
    const totalReach = posts?.reduce((sum, p) => sum + p.reach, 0) || 0;

    const { data, error } = await supabase
      .from('daily_metrics')
      .upsert({
        user_id: userId,
        date,
        engagement: totalEngagement,
        reach: totalReach,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to upsert daily metric: ${error.message}`);
    }

    return data;
  }
}
