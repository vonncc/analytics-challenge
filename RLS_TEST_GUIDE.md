# RLS Isolation Test Guide

This guide will help you verify that Row Level Security (RLS) is working correctly and that users cannot access each other's data.

## 🎯 What We're Testing

1. **RLS is enabled** on both `posts` and `daily_metrics` tables
2. **User 1 can only see their own data** (30 posts)
3. **User 2 can only see their own data** (25 posts)
4. **Users cannot query each other's data** even if they know the other user's ID
5. **All RLS policies are active** (SELECT, INSERT, UPDATE, DELETE)

## 📋 Prerequisites

- Supabase project set up with schema and seed data
- Two test users created:
  - User 1: `aa5c2a79-696f-4647-aa77-1174a90da6df`
  - User 2: `78ecef11-f4ff-4018-b29b-359d1f8e26aa`

## 🧪 Test Method 1: SQL Editor (Quick Test)

### Step 1: Run Automated Test Script

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `test-rls.sql`
4. Click **Run**

### Expected Results:

```
Test 1: User 1 Posts
- Count: 30
- Result: ✅ PASS

Test 2: User 2 Posts
- Count: 25
- Result: ✅ PASS

Test 3: RLS Enabled on posts
- Enabled: true
- Result: ✅ PASS

Test 4: RLS Enabled on daily_metrics
- Enabled: true
- Result: ✅ PASS

Test 5: RLS Policies
- Policy Count: 8
- Result: ✅ PASS

Test 6: List all policies
- Shows all 8 policies (4 for posts, 4 for daily_metrics)
```

## 🔐 Test Method 2: Browser Testing (Real-World Test)

This tests RLS in the actual application environment.

### Step 1: Test User 1

1. **Login** as User 1:
   - Email: `test1@example.com`
   - Password: `Test123!@#`

2. **Verify Data**:
   - Should see exactly **30 posts**
   - All posts should belong to User 1
   - Check a few post IDs to confirm

3. **Open Browser Console** (F12)

4. **Try to access User 2's data**:
   ```javascript
   // This should return empty or error due to RLS
   const { data, error } = await supabase
     .from('posts')
     .select('*')
     .eq('user_id', '78ecef11-f4ff-4018-b29b-359d1f8e26aa');
   
   console.log('User 2 posts:', data); // Should be empty []
   ```

5. **Expected**: Empty array or RLS error

### Step 2: Test User 2

1. **Sign out** (click avatar → Sign out)

2. **Login** as User 2:
   - Email: `test2@example.com`
   - Password: `Test123!@#`

3. **Verify Data**:
   - Should see exactly **25 posts**
   - All posts should belong to User 2
   - Posts from User 1 should NOT appear

4. **Open Browser Console** (F12)

5. **Try to access User 1's data**:
   ```javascript
   // This should return empty or error due to RLS
   const { data, error } = await supabase
     .from('posts')
     .select('*')
     .eq('user_id', 'aa5c2a79-696f-4647-aa77-1174a90da6df');
   
   console.log('User 1 posts:', data); // Should be empty []
   ```

6. **Expected**: Empty array or RLS error

## 🔍 Test Method 3: Manual SQL Verification

Run these queries in Supabase SQL Editor to verify isolation:

### Test 1: Total Posts (Admin View)
```sql
-- As admin, you can see all posts
SELECT user_id, COUNT(*) as post_count
FROM posts
GROUP BY user_id
ORDER BY user_id;
```

**Expected Output:**
```
user_id                                  | post_count
-----------------------------------------+-----------
aa5c2a79-696f-4647-aa77-1174a90da6df    | 30
78ecef11-f4ff-4018-b29b-359d1f8e26aa    | 25
```

### Test 2: Verify RLS Policies
```sql
-- Check all policies are active
SELECT 
  tablename,
  policyname,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('posts', 'daily_metrics')
ORDER BY tablename, cmd;
```

**Expected Output:**
```
posts - SELECT - auth.uid() = user_id
posts - INSERT - auth.uid() = user_id
posts - UPDATE - auth.uid() = user_id
posts - DELETE - auth.uid() = user_id
daily_metrics - SELECT - auth.uid() = user_id
daily_metrics - INSERT - auth.uid() = user_id
daily_metrics - UPDATE - auth.uid() = user_id
daily_metrics - DELETE - auth.uid() = user_id
```

### Test 3: Try Cross-User Query (Should Fail)
```sql
-- This will work as admin, but should fail for authenticated users
-- When run through the app, RLS will block this
SELECT * FROM posts 
WHERE user_id != auth.uid();
```

**Expected**: 
- As admin: Returns all posts
- As authenticated user (via app): Returns empty (RLS blocks it)

## ✅ Success Criteria

Your RLS is working correctly if:

- ✅ User 1 sees exactly 30 posts (their own)
- ✅ User 2 sees exactly 25 posts (their own)
- ✅ Neither user can query the other's data via console
- ✅ RLS is enabled on both tables
- ✅ All 8 policies are active (4 per table)
- ✅ Policies use `auth.uid() = user_id` condition

## ❌ Troubleshooting

### Issue: Users can see each other's data

**Solution:**
1. Check RLS is enabled:
   ```sql
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
   ```

2. Verify policies exist:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename IN ('posts', 'daily_metrics');
   ```

3. Re-run schema.sql if policies are missing

### Issue: Users can't see their own data

**Solution:**
1. Check user is authenticated:
   ```javascript
   const { data: { user } } = await supabase.auth.getUser();
   console.log('Current user:', user);
   ```

2. Verify user_id matches in posts:
   ```sql
   SELECT user_id, COUNT(*) 
   FROM posts 
   GROUP BY user_id;
   ```

3. Check policies allow SELECT:
   ```sql
   SELECT policyname, cmd, qual 
   FROM pg_policies 
   WHERE tablename = 'posts' AND cmd = 'SELECT';
   ```

## 📊 Test Results Template

Use this template to document your test results:

```
RLS ISOLATION TEST RESULTS
Date: [DATE]
Tester: [YOUR NAME]

✅ Test 1: RLS Enabled
- posts: [PASS/FAIL]
- daily_metrics: [PASS/FAIL]

✅ Test 2: User 1 Data Isolation
- Posts visible: [30/OTHER]
- Can access User 2 data: [NO/YES]
- Result: [PASS/FAIL]

✅ Test 3: User 2 Data Isolation
- Posts visible: [25/OTHER]
- Can access User 1 data: [NO/YES]
- Result: [PASS/FAIL]

✅ Test 4: Policy Count
- Total policies: [8/OTHER]
- Result: [PASS/FAIL]

OVERALL: [PASS/FAIL]
```

## 🎓 Understanding RLS

**What is Row Level Security?**
- PostgreSQL feature that restricts which rows users can access
- Policies define rules based on user context (`auth.uid()`)
- Enforced at the database level (can't be bypassed)

**Why is it important?**
- Prevents data leaks between users
- No need for application-level filtering
- Works even if someone bypasses your API

**How does it work in Supabase?**
```sql
-- Policy example
CREATE POLICY "Users can view own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);
```

This means:
- When User A queries posts, they only see rows where `user_id = User A's ID`
- User B cannot see User A's posts, even if they try
- Enforced automatically by PostgreSQL

## 📚 Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Guide](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Security Best Practices](https://supabase.com/docs/guides/auth/managing-user-data)

---

**Next Steps:**
1. Run all three test methods
2. Document results using the template
3. Fix any issues found
4. Re-test until all tests pass
5. Include test results in your project submission
