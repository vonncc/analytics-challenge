'use client';

import React from 'react';
import { ModalHeader } from '@/components/molecules';
import { Card, CardContent } from '@/components/atoms';
import { useModal } from '@/hooks';
import {
  formatDateTime,
  formatNumber,
  PLATFORM_LABELS,
  MEDIA_TYPE_LABELS,
} from '@/utils';
import {
  ThumbsUp,
  Share2,
  MessageCircle,
  TrendingUp,
  Bookmark,
  Eye,
  BarChart3,
} from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { isOpen, selectedPost, closeModal } = useModal();

  if (!isOpen) return null;

  const post = selectedPost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <Card>
          <ModalHeader
            title={post?.caption || 'Post Details'}
            onClose={closeModal}
          />
          <CardContent className="p-6">
            {post ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Platform
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                      {PLATFORM_LABELS[post.platform]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Media Type
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {MEDIA_TYPE_LABELS[post.media_type]}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Posted
                  </h3>
                  <p className="text-gray-900">
                    {formatDateTime(post.posted_at)}
                  </p>
                </div>

                {post.caption && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Caption
                    </h3>
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {post.caption}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">
                    Engagement Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <ThumbsUp className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Likes</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(post.likes)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">Comments</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(post.comments)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <Share2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Shares</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(post.shares)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <Bookmark className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Saves</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(post.saves)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
                      <Eye className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-600">Reach</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(post.reach)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-pink-600" />
                      <div>
                        <p className="text-sm text-gray-600">Impressions</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(post.impressions)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Total Engagement
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(post.total_engagement)}
                        </p>
                      </div>
                    </div>

                    {post.engagement_rate !== null && (
                      <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="text-sm text-gray-600">
                            Engagement Rate
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {post.engagement_rate.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Post not found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
