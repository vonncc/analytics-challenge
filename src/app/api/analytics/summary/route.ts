import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { AnalyticsSummary, TrendIndicator } from '@/types';
import { validateDateRange } from '@/utils';

export const runtime = 'nodejs';

const calculateTrend = (current: number, previous: number): TrendIndicator => {
  if (previous === 0) {
    return { value: current, percentage: 0, direction: 'neutral' };
  }

  const percentage = ((current - previous) / previous) * 100;
  const direction = percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral';

  return { value: current, percentage, direction };
};

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    const end = endDate || new Date().toISOString().split('T')[0];
    const start =
      startDate ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

    const validation = validateDateRange(start, end);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .gte('posted_at', start)
      .lte('posted_at', end);

    if (postsError) {
      throw new Error(`Failed to fetch posts: ${postsError.message}`);
    }

    const totalPosts = posts?.length || 0;
    const totalLikes = posts?.reduce((sum, p) => sum + p.likes, 0) || 0;
    const totalShares = posts?.reduce((sum, p) => sum + p.shares, 0) || 0;
    const totalComments = posts?.reduce((sum, p) => sum + p.comments, 0) || 0;
    const totalSaves = posts?.reduce((sum, p) => sum + p.saves, 0) || 0;
    const totalReach = posts?.reduce((sum, p) => sum + p.reach, 0) || 0;
    const totalImpressions =
      posts?.reduce((sum, p) => sum + p.impressions, 0) || 0;
    const totalEngagement =
      totalLikes + totalShares + totalComments + totalSaves;

    const averageLikes = totalPosts > 0 ? totalLikes / totalPosts : 0;
    const averageShares = totalPosts > 0 ? totalShares / totalPosts : 0;
    const averageComments = totalPosts > 0 ? totalComments / totalPosts : 0;
    const averageSaves = totalPosts > 0 ? totalSaves / totalPosts : 0;
    const averageReach = totalPosts > 0 ? totalReach / totalPosts : 0;
    const averageImpressions =
      totalPosts > 0 ? totalImpressions / totalPosts : 0;
    const averageEngagement = totalPosts > 0 ? totalEngagement / totalPosts : 0;
    const averageEngagementRate =
      totalPosts > 0
        ? (posts?.reduce((sum, p) => sum + (p.engagement_rate || 0), 0) || 0) /
          totalPosts
        : 0;

    const topPost =
      posts && posts.length > 0
        ? posts.reduce((max, post) => {
            const engagement =
              post.likes + post.shares + post.comments + post.saves;
            const maxEngagement =
              max.likes + max.shares + max.comments + max.saves;
            return engagement > maxEngagement ? post : max;
          })
        : null;

    const previousStart = new Date(
      new Date(start).getTime() - 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split('T')[0];
    const previousEnd = new Date(new Date(start).getTime() - 1)
      .toISOString()
      .split('T')[0];

    const { data: previousPosts } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .gte('posted_at', previousStart)
      .lte('posted_at', previousEnd);

    const prevTotalLikes =
      previousPosts?.reduce((sum, p) => sum + p.likes, 0) || 0;
    const prevTotalShares =
      previousPosts?.reduce((sum, p) => sum + p.shares, 0) || 0;
    const prevTotalComments =
      previousPosts?.reduce((sum, p) => sum + p.comments, 0) || 0;
    const prevTotalSaves =
      previousPosts?.reduce((sum, p) => sum + p.saves, 0) || 0;
    const prevTotalReach =
      previousPosts?.reduce((sum, p) => sum + p.reach, 0) || 0;
    const prevTotalEngagement =
      prevTotalLikes + prevTotalShares + prevTotalComments + prevTotalSaves;

    const summary: AnalyticsSummary = {
      totalPosts,
      totalLikes,
      totalShares,
      totalComments,
      totalSaves,
      totalReach,
      totalImpressions,
      totalEngagement,
      averageLikes,
      averageShares,
      averageComments,
      averageSaves,
      averageReach,
      averageImpressions,
      averageEngagement,
      averageEngagementRate,
      topPost: topPost
        ? {
            id: topPost.id,
            caption: topPost.caption || 'No caption',
            engagement:
              topPost.likes + topPost.shares + topPost.comments + topPost.saves,
          }
        : null,
      trends: {
        likes: calculateTrend(totalLikes, prevTotalLikes),
        shares: calculateTrend(totalShares, prevTotalShares),
        comments: calculateTrend(totalComments, prevTotalComments),
        saves: calculateTrend(totalSaves, prevTotalSaves),
        reach: calculateTrend(totalReach, prevTotalReach),
        engagement: calculateTrend(totalEngagement, prevTotalEngagement),
      },
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Analytics summary error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
