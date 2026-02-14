-- =====================================================
-- Seed Users for Analytics Dashboard
-- Creates test users with authentication credentials
-- =====================================================
-- NOTE: This uses Supabase Auth API, not direct SQL inserts
-- You should create users via Supabase Dashboard or Auth API
-- =====================================================

-- However, if you want to manually insert users for testing (NOT RECOMMENDED),
-- you can use this approach. Better to use Supabase Dashboard.

-- =====================================================
-- IMPORTANT: Use Supabase Dashboard Instead
-- =====================================================
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/auth/users
-- Click "Add user" -> "Create new user"
-- 
-- User 1:
--   Email: test1@example.com
--   Password: Test123!@#
--   Auto Confirm: YES
--
-- User 2:
--   Email: test2@example.com
--   Password: Test123!@#
--   Auto Confirm: YES
-- =====================================================

-- =====================================================
-- Alternative: Seed Profiles (if using profiles table)
-- =====================================================
-- Run this AFTER creating users in Supabase Auth Dashboard

-- Insert profiles for existing auth users
-- Replace UUIDs with actual user IDs from auth.users
INSERT INTO profiles (id, email, full_name, avatar_url) VALUES
(
  'aa5c2a79-696f-4647-aa77-1174a90da6df',
  'test1@example.com',
  'Test User One',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=test1'
),
(
  '78ecef11-f4ff-4018-b29b-359d1f8e26aa',
  'test2@example.com',
  'Test User Two',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=test2'
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  avatar_url = EXCLUDED.avatar_url,
  updated_at = NOW();

-- =====================================================
-- Verification Query
-- =====================================================
-- Check if profiles were created
-- SELECT * FROM profiles;

-- Check auth users (requires service_role key)
-- SELECT id, email, created_at FROM auth.users;
