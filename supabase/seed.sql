-- =====================================================
-- Seed Data for Analytics Dashboard
-- Instagram & TikTok Analytics
-- =====================================================
-- This file contains sample data for 2 users to test the dashboard
-- Replace the UUIDs below with actual user IDs from your Supabase Auth
-- =====================================================

-- User IDs (actual auth.users IDs from Supabase project)
-- User 1: aa5c2a79-696f-4647-aa77-1174a90da6df
-- User 2: 78ecef11-f4ff-4018-b29b-359d1f8e26aa

-- =====================================================
-- POSTS DATA
-- =====================================================

-- User 1 Posts (Instagram & TikTok - 30 posts over last 30 days)
INSERT INTO posts (user_id, platform, caption, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink) VALUES
-- Recent high-performing posts
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'New product launch! 🚀 Check out our latest innovation', 'carousel', NOW() - INTERVAL '1 day', 1250, 89, 145, 320, 15000, 22000, 11.87, 'https://instagram.com/p/abc123'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Behind the scenes of our photoshoot 📸', 'video', NOW() - INTERVAL '2 days', 2340, 156, 234, 450, 45000, 68000, 7.07, 'https://tiktok.com/@user/video/123'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Throwback to our amazing team retreat! 🌴', 'image', NOW() - INTERVAL '3 days', 892, 67, 89, 234, 12000, 18000, 10.68, 'https://instagram.com/p/def456'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Quick tutorial: How to use our app in 60 seconds', 'video', NOW() - INTERVAL '4 days', 3450, 234, 456, 678, 78000, 120000, 5.59, 'https://tiktok.com/@user/video/456'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Customer testimonial: Why they love our product ❤️', 'video', NOW() - INTERVAL '5 days', 1567, 123, 178, 389, 28000, 42000, 8.06, 'https://instagram.com/p/ghi789'),

-- Mid-range posts
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Monday motivation to start your week strong 💪', 'image', NOW() - INTERVAL '6 days', 678, 45, 67, 123, 9000, 14000, 10.14, 'https://instagram.com/p/jkl012'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Trending dance challenge! Join us 🕺', 'video', NOW() - INTERVAL '7 days', 4567, 289, 567, 890, 95000, 145000, 6.52, 'https://tiktok.com/@user/video/789'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Sneak peek of what''s coming next week 👀', 'carousel', NOW() - INTERVAL '8 days', 1234, 89, 134, 267, 18000, 27000, 9.58, 'https://instagram.com/p/mno345'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Day in the life of our team', 'video', NOW() - INTERVAL '9 days', 2890, 178, 234, 456, 52000, 78000, 7.05, 'https://tiktok.com/@user/video/012'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'New blog post is live! Link in bio 📝', 'image', NOW() - INTERVAL '10 days', 567, 34, 45, 89, 7500, 11000, 9.80, 'https://instagram.com/p/pqr678'),

-- Older posts with varying engagement
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Weekend vibes ✨', 'image', NOW() - INTERVAL '11 days', 890, 56, 78, 145, 11000, 16500, 10.63, 'https://instagram.com/p/stu901'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Funny office moments compilation 😂', 'video', NOW() - INTERVAL '12 days', 5678, 345, 678, 1234, 112000, 168000, 7.08, 'https://tiktok.com/@user/video/234'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Product feature spotlight: What makes us different', 'carousel', NOW() - INTERVAL '13 days', 1123, 78, 112, 234, 16000, 24000, 9.67, 'https://instagram.com/p/vwx234'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Unboxing our latest package 📦', 'video', NOW() - INTERVAL '14 days', 3234, 189, 345, 567, 68000, 102000, 6.38, 'https://tiktok.com/@user/video/567'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Thank you for 10k followers! 🎉', 'image', NOW() - INTERVAL '15 days', 2345, 234, 289, 456, 35000, 52000, 9.64, 'https://instagram.com/p/yza567'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Life hack you need to know', 'video', NOW() - INTERVAL '16 days', 6789, 456, 789, 1345, 145000, 218000, 6.47, 'https://tiktok.com/@user/video/890'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Collaboration announcement 🤝', 'image', NOW() - INTERVAL '17 days', 1456, 123, 167, 289, 22000, 33000, 9.25, 'https://instagram.com/p/bcd890'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Before and after transformation', 'video', NOW() - INTERVAL '18 days', 4123, 267, 456, 789, 89000, 134000, 6.19, 'https://tiktok.com/@user/video/123'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Flash sale alert! 50% off today only 🔥', 'carousel', NOW() - INTERVAL '19 days', 1890, 145, 234, 456, 28000, 42000, 9.73, 'https://instagram.com/p/efg123'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Answering your most asked questions', 'video', NOW() - INTERVAL '20 days', 3567, 234, 389, 678, 72000, 108000, 5.98, 'https://tiktok.com/@user/video/456'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Sunset photoshoot results 🌅', 'image', NOW() - INTERVAL '21 days', 1234, 89, 123, 245, 18000, 27000, 9.50, 'https://instagram.com/p/hij456'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Trending sound challenge', 'video', NOW() - INTERVAL '22 days', 5234, 345, 567, 1023, 98000, 147000, 7.31, 'https://tiktok.com/@user/video/789'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Meet our newest team member!', 'image', NOW() - INTERVAL '23 days', 789, 56, 67, 134, 10000, 15000, 10.46, 'https://instagram.com/p/klm789'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Recipe tutorial: Our favorite dish', 'video', NOW() - INTERVAL '24 days', 4567, 289, 456, 890, 87000, 131000, 6.99, 'https://tiktok.com/@user/video/012'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Giveaway time! Tag 3 friends to enter 🎁', 'carousel', NOW() - INTERVAL '25 days', 3456, 456, 567, 789, 52000, 78000, 9.78, 'https://instagram.com/p/nop012'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Workout routine for beginners', 'video', NOW() - INTERVAL '26 days', 3890, 234, 389, 678, 76000, 114000, 6.83, 'https://tiktok.com/@user/video/345'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Office tour: Where the magic happens ✨', 'video', NOW() - INTERVAL '27 days', 1567, 123, 178, 312, 24000, 36000, 9.00, 'https://instagram.com/p/qrs345'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Storytime: How we started', 'video', NOW() - INTERVAL '28 days', 2890, 189, 289, 456, 58000, 87000, 6.97, 'https://tiktok.com/@user/video/678'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'instagram', 'Inspirational quote of the day 💭', 'image', NOW() - INTERVAL '29 days', 678, 45, 56, 112, 8500, 12750, 10.48, 'https://instagram.com/p/tuv678'),
('aa5c2a79-696f-4647-aa77-1174a90da6df', 'tiktok', 'Prank on our coworker 😄', 'video', NOW() - INTERVAL '30 days', 6234, 456, 678, 1234, 125000, 188000, 6.88, 'https://tiktok.com/@user/video/901');

-- User 2 Posts (Instagram & TikTok - 25 posts over last 30 days)
INSERT INTO posts (user_id, platform, caption, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink) VALUES
-- Recent posts
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Exciting announcement coming tomorrow! 🎊', 'image', NOW() - INTERVAL '1 day', 1890, 134, 189, 345, 28000, 42000, 9.14, 'https://instagram.com/p/user2_1'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Makeup tutorial: Natural everyday look', 'video', NOW() - INTERVAL '2 days', 5678, 389, 678, 1234, 112000, 168000, 7.12, 'https://tiktok.com/@user2/video/1'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Travel vlog: Exploring the city 🌆', 'carousel', NOW() - INTERVAL '3 days', 2345, 178, 234, 456, 38000, 57000, 8.46, 'https://instagram.com/p/user2_2'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Cooking show: Easy 5-minute meals', 'video', NOW() - INTERVAL '4 days', 4567, 289, 456, 890, 89000, 134000, 7.42, 'https://tiktok.com/@user2/video/2'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Fashion haul: Spring collection 👗', 'video', NOW() - INTERVAL '5 days', 3456, 234, 345, 678, 58000, 87000, 8.05, 'https://instagram.com/p/user2_3'),

-- Mid-range posts
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Fitness journey update: Month 3', 'image', NOW() - INTERVAL '7 days', 1234, 89, 123, 234, 19000, 28500, 8.89, 'https://instagram.com/p/user2_4'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Pet compilation: Cutest moments 🐕', 'video', NOW() - INTERVAL '9 days', 7890, 567, 890, 1456, 156000, 234000, 6.67, 'https://tiktok.com/@user2/video/3'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Book recommendations for this month 📚', 'carousel', NOW() - INTERVAL '11 days', 1567, 112, 156, 289, 24000, 36000, 8.85, 'https://instagram.com/p/user2_5'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Room makeover time lapse', 'video', NOW() - INTERVAL '13 days', 3890, 234, 389, 678, 72000, 108000, 7.21, 'https://tiktok.com/@user2/video/4'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Morning routine for productivity ☀️', 'video', NOW() - INTERVAL '15 days', 2123, 156, 189, 378, 34000, 51000, 8.31, 'https://instagram.com/p/user2_6'),

-- Older posts
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'DIY project: Home decor ideas', 'carousel', NOW() - INTERVAL '17 days', 1789, 123, 167, 312, 27000, 40500, 8.93, 'https://instagram.com/p/user2_7'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Comedy skit: Relatable moments', 'video', NOW() - INTERVAL '19 days', 6234, 456, 678, 1123, 128000, 192000, 6.63, 'https://tiktok.com/@user2/video/5'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Skincare routine reveal 🧴', 'video', NOW() - INTERVAL '21 days', 2890, 189, 234, 456, 45000, 67500, 8.40, 'https://instagram.com/p/user2_8'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Dance choreography tutorial', 'video', NOW() - INTERVAL '23 days', 5123, 345, 567, 1012, 98000, 147000, 7.19, 'https://tiktok.com/@user2/video/6'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Q&A session: Ask me anything!', 'image', NOW() - INTERVAL '25 days', 1456, 234, 178, 289, 23000, 34500, 9.37, 'https://instagram.com/p/user2_9'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Study with me: 2 hour session', 'video', NOW() - INTERVAL '27 days', 3567, 234, 389, 678, 68000, 102000, 6.89, 'https://tiktok.com/@user2/video/7'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Sunset photography tips 📷', 'carousel', NOW() - INTERVAL '6 days', 1890, 134, 189, 345, 29000, 43500, 8.76, 'https://instagram.com/p/user2_10'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Trending audio reaction', 'video', NOW() - INTERVAL '8 days', 4890, 312, 489, 890, 92000, 138000, 7.07, 'https://tiktok.com/@user2/video/8'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Healthy meal prep for the week 🥗', 'video', NOW() - INTERVAL '10 days', 2234, 156, 223, 423, 36000, 54000, 8.33, 'https://instagram.com/p/user2_11'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Life update vlog', 'video', NOW() - INTERVAL '12 days', 3234, 223, 334, 612, 64000, 96000, 6.88, 'https://tiktok.com/@user2/video/9'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Product review: Is it worth it?', 'image', NOW() - INTERVAL '14 days', 1567, 112, 156, 289, 24000, 36000, 8.85, 'https://instagram.com/p/user2_12'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Hair styling hacks', 'video', NOW() - INTERVAL '16 days', 5678, 389, 678, 1123, 108000, 162000, 7.38, 'https://tiktok.com/@user2/video/10'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Weekend getaway photos 🏖️', 'carousel', NOW() - INTERVAL '18 days', 2456, 178, 245, 478, 39000, 58500, 8.61, 'https://instagram.com/p/user2_13'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'tiktok', 'Outfit ideas for every occasion', 'video', NOW() - INTERVAL '20 days', 4234, 289, 445, 823, 82000, 123000, 7.09, 'https://tiktok.com/@user2/video/11'),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', 'instagram', 'Gratitude post: Thank you all! 💕', 'image', NOW() - INTERVAL '22 days', 3123, 234, 312, 589, 48000, 72000, 8.87, 'https://instagram.com/p/user2_14');

-- =====================================================
-- DAILY METRICS DATA
-- =====================================================

-- User 1 Daily Metrics (Last 30 days)
INSERT INTO daily_metrics (user_id, date, engagement, reach) VALUES
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '1 day', 1804, 15000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '2 days', 3180, 45000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '3 days', 1282, 12000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '4 days', 4818, 78000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '5 days', 2257, 28000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '6 days', 913, 9000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '7 days', 6313, 95000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '8 days', 1724, 18000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '9 days', 3758, 52000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '10 days', 735, 7500),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '11 days', 1169, 11000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '12 days', 7935, 112000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '13 days', 1547, 16000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '14 days', 4335, 68000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '15 days', 3324, 35000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '16 days', 9379, 145000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '17 days', 2035, 22000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '18 days', 5635, 89000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '19 days', 2725, 28000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '20 days', 4868, 72000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '21 days', 1691, 18000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '22 days', 7191, 98000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '23 days', 1046, 10000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '24 days', 6202, 87000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '25 days', 5379, 52000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '26 days', 5191, 76000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '27 days', 2180, 24000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '28 days', 4046, 58000),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '29 days', 891, 8500),
('aa5c2a79-696f-4647-aa77-1174a90da6df', CURRENT_DATE - INTERVAL '30 days', 8602, 125000);

-- User 2 Daily Metrics (Last 30 days, with some days having no posts)
INSERT INTO daily_metrics (user_id, date, engagement, reach) VALUES
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '1 day', 2558, 28000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '2 days', 7979, 112000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '3 days', 3213, 38000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '4 days', 6202, 89000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '5 days', 4713, 58000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '6 days', 2558, 29000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '7 days', 1680, 19000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '8 days', 6581, 92000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '9 days', 10803, 156000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '10 days', 3036, 36000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '11 days', 2124, 24000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '12 days', 4403, 64000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '13 days', 5191, 72000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '14 days', 2124, 24000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '15 days', 2846, 34000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '16 days', 7868, 108000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '17 days', 2391, 27000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '18 days', 3357, 39000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '19 days', 8491, 128000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '20 days', 5791, 82000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '21 days', 3769, 45000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '22 days', 4258, 48000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '23 days', 7046, 98000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '25 days', 2157, 23000),
('78ecef11-f4ff-4018-b29b-359d1f8e26aa', CURRENT_DATE - INTERVAL '27 days', 4868, 68000);
