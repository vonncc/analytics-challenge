import { ApiClient } from './apiClient';
import { DailyMetric, ChartDataPoint } from '@/types';

export class MetricsService extends ApiClient {
  static async getDailyMetrics(
    startDate: string,
    endDate: string
  ): Promise<DailyMetric[]> {
    const { data, error } = await this.client
      .from('daily_metrics')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) {
      this.handleError(error, 'Failed to fetch daily metrics');
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
    const { data: posts, error: postsError } = await this.client
      .from('posts')
      .select('likes, shares, comments, saves, reach')
      .eq('user_id', userId)
      .gte('posted_at', `${date}T00:00:00`)
      .lte('posted_at', `${date}T23:59:59`);

    if (postsError) {
      this.handleError(postsError, 'Failed to fetch posts for metrics');
    }

    const totalLikes = posts?.reduce((sum: number, p) => sum + p.likes, 0) || 0;
    const totalShares =
      posts?.reduce((sum: number, p) => sum + p.shares, 0) || 0;
    const totalComments =
      posts?.reduce((sum: number, p) => sum + p.comments, 0) || 0;
    const totalSaves = posts?.reduce((sum: number, p) => sum + p.saves, 0) || 0;
    const totalEngagement =
      totalLikes + totalShares + totalComments + totalSaves;
    const totalReach = posts?.reduce((sum: number, p) => sum + p.reach, 0) || 0;

    const { data, error } = await this.client
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
      this.handleError(error, 'Failed to upsert daily metric');
    }

    return data;
  }
}
