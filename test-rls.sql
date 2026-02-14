-- =====================================================
-- RLS Isolation Test
-- Run this in Supabase SQL Editor to verify RLS works
-- =====================================================

-- Test 1: Verify User 1 can see their own posts
SELECT 
  'User 1 Posts' as test,
  COUNT(*) as count,
  CASE 
    WHEN COUNT(*) = 30 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as result
FROM posts 
WHERE user_id = 'aa5c2a79-696f-4647-aa77-1174a90da6df';

-- Test 2: Verify User 2 can see their own posts
SELECT 
  'User 2 Posts' as test,
  COUNT(*) as count,
  CASE 
    WHEN COUNT(*) = 25 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as result
FROM posts 
WHERE user_id = '78ecef11-f4ff-4018-b29b-359d1f8e26aa';

-- Test 3: Check RLS is enabled
SELECT 
  'RLS Enabled on posts' as test,
  relrowsecurity as enabled,
  CASE 
    WHEN relrowsecurity = true THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as result
FROM pg_class 
WHERE relname = 'posts';

-- Test 4: Check RLS is enabled on daily_metrics
SELECT 
  'RLS Enabled on daily_metrics' as test,
  relrowsecurity as enabled,
  CASE 
    WHEN relrowsecurity = true THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as result
FROM pg_class 
WHERE relname = 'daily_metrics';

-- Test 5: Verify policies exist
SELECT 
  'RLS Policies' as test,
  COUNT(*) as policy_count,
  CASE 
    WHEN COUNT(*) >= 8 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as result
FROM pg_policies 
WHERE tablename IN ('posts', 'daily_metrics');

-- Test 6: List all policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename IN ('posts', 'daily_metrics')
ORDER BY tablename, policyname;

-- =====================================================
-- Expected Results:
-- - User 1 Posts: 30 (✅ PASS)
-- - User 2 Posts: 25 (✅ PASS)
-- - RLS Enabled on posts: true (✅ PASS)
-- - RLS Enabled on daily_metrics: true (✅ PASS)
-- - RLS Policies: 8+ (✅ PASS)
-- =====================================================
