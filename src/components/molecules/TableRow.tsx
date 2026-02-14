import React from 'react';
import { PostWithEngagement } from '@/types';
import {
  formatDate,
  formatNumber,
  PLATFORM_LABELS,
  MEDIA_TYPE_LABELS,
} from '@/utils';

interface TableRowProps {
  post: PostWithEngagement;
  onClick: (post: PostWithEngagement) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ post, onClick }) => {
  const platformColor =
    post.platform === 'instagram'
      ? 'bg-pink-100 text-pink-800'
      : 'bg-gray-900 text-white';

  return (
    <tr
      onClick={() => onClick(post)}
      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {post.caption || 'No caption'}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(post.posted_at)}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${platformColor}`}
          >
            {PLATFORM_LABELS[post.platform]}
          </span>
          <span className="text-xs text-gray-500">
            {MEDIA_TYPE_LABELS[post.media_type]}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-right text-gray-900">
        {formatNumber(post.likes)}
      </td>
      <td className="px-6 py-4 text-right text-gray-900">
        {formatNumber(post.comments)}
      </td>
      <td className="px-6 py-4 text-right text-gray-900">
        {formatNumber(post.saves)}
      </td>
      <td className="px-6 py-4 text-right text-gray-900">
        {formatNumber(post.reach)}
      </td>
      <td className="px-6 py-4 text-right">
        <span className="font-semibold text-purple-600">
          {formatNumber(post.total_engagement)}
        </span>
      </td>
    </tr>
  );
};
