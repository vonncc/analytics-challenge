import { Platform } from '@/types';

export const isValidPlatform = (platform: string): platform is Platform => {
  return ['twitter', 'facebook', 'instagram', 'linkedin'].includes(platform);
};

export const isValidDateString = (date: string): boolean => {
  const parsed = Date.parse(date);
  return !isNaN(parsed);
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const isPositiveInteger = (value: number): boolean => {
  return Number.isInteger(value) && value >= 0;
};

export const validatePostData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (data.platform && !isValidPlatform(data.platform)) {
    errors.push('Invalid platform. Must be one of: twitter, facebook, instagram, linkedin');
  }

  if (data.likes !== undefined && !isPositiveInteger(data.likes)) {
    errors.push('Likes must be a non-negative integer');
  }

  if (data.shares !== undefined && !isPositiveInteger(data.shares)) {
    errors.push('Shares must be a non-negative integer');
  }

  if (data.comments !== undefined && !isPositiveInteger(data.comments)) {
    errors.push('Comments must be a non-negative integer');
  }

  if (data.published_at && !isValidDateString(data.published_at)) {
    errors.push('Invalid published_at date format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateDateRange = (start: string, end: string): { valid: boolean; error?: string } => {
  if (!isValidDateString(start)) {
    return { valid: false, error: 'Invalid start date format' };
  }

  if (!isValidDateString(end)) {
    return { valid: false, error: 'Invalid end date format' };
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate > endDate) {
    return { valid: false, error: 'Start date must be before end date' };
  }

  return { valid: true };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
