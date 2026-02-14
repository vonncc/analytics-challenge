# Vercel Deployment Guide

Complete step-by-step guide to deploy your Analytics Dashboard to Vercel.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Supabase project set up with schema and seed data
- ✅ Application working locally (`npm run dev`)
- ✅ Git repository created (GitHub, GitLab, or Bitbucket)
- ✅ Vercel account (free tier is fine)

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

#### 1.1 Initialize Git (if not done)

```bash
# In your project root
git init
git add .
git commit -m "Initial commit: Analytics Dashboard"
```

#### 1.2 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"New repository"**
3. Name it: `analytics-dashboard` (or your preferred name)
4. **Don't** initialize with README (you already have one)
5. Click **"Create repository"**

#### 1.3 Push to GitHub

```bash
# Replace with your repository URL
git remote add origin https://github.com/YOUR_USERNAME/analytics-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### 2.1 Sign Up / Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or Login if you have an account)
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

#### 2.2 Import Your Project

1. On Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Find your `analytics-dashboard` repository
3. Click **"Import"**

#### 2.3 Configure Project Settings

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `./` (leave as default)

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `.next` (auto-filled)

**Install Command:** `npm install` (auto-filled)

### Step 3: Configure Environment Variables

⚠️ **CRITICAL:** Add these environment variables in Vercel:

1. In the import screen, expand **"Environment Variables"**
2. Add the following variables:

#### Required Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://krxfrrxqzmiziqkhpthf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Server-side only (IMPORTANT: Keep this secret!)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

#### Where to Find These Values:

1. Go to your **Supabase Dashboard**
2. Click **Settings** → **API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Security Note:** 
- `NEXT_PUBLIC_*` variables are safe to expose (client-side)
- `SUPABASE_SERVICE_ROLE_KEY` must remain secret (server-side only)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll see: ✅ **"Congratulations! Your project has been deployed"**

### Step 5: Configure Supabase for Production

⚠️ **IMPORTANT:** Update Supabase to allow your Vercel domain

#### 5.1 Get Your Vercel URL

After deployment, you'll get a URL like:
```
https://analytics-dashboard-abc123.vercel.app
```

#### 5.2 Update Supabase Authentication Settings

1. Go to **Supabase Dashboard**
2. Navigate to **Authentication** → **URL Configuration**
3. Update the following:

**Site URL:**
```
https://analytics-dashboard-abc123.vercel.app
```

**Redirect URLs:** (Add all of these)
```
https://analytics-dashboard-abc123.vercel.app/**
https://analytics-dashboard-abc123.vercel.app/login
http://localhost:3000/**
http://localhost:3000/login
```

4. Click **"Save"**

### Step 6: Test Your Deployment

#### 6.1 Visit Your Site

1. Click the **Vercel deployment URL**
2. You should see the login page

#### 6.2 Test Authentication

1. Try logging in with:
   - Email: `test1@example.com`
   - Password: `Test123!@#`

2. You should:
   - ✅ Successfully log in
   - ✅ See the dashboard with 30 posts
   - ✅ Be able to filter and sort
   - ✅ Open post details modal
   - ✅ See the engagement chart

#### 6.3 Test All Features

Run through the checklist:
- [ ] Login works
- [ ] Dashboard loads
- [ ] Posts table displays data
- [ ] Filters work (platform, media type, search)
- [ ] URL updates with filters
- [ ] Chart displays correctly
- [ ] Summary cards show metrics
- [ ] Post modal opens and displays details
- [ ] Logout works
- [ ] Protected routes redirect to login

### Step 7: Custom Domain (Optional)

#### 7.1 Add Custom Domain

1. In Vercel Dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter your domain: `analytics.yourdomain.com`
5. Follow DNS configuration instructions

#### 7.2 Update Supabase URLs

Add your custom domain to Supabase:
1. **Site URL:** `https://analytics.yourdomain.com`
2. **Redirect URLs:** `https://analytics.yourdomain.com/**`

## 🔧 Troubleshooting

### Issue: Build Fails

**Error:** `Module not found` or `Cannot find module`

**Solution:**
```bash
# Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

Then redeploy in Vercel.

### Issue: Environment Variables Not Working

**Symptoms:**
- 401 Unauthorized errors
- "Failed to fetch" errors
- Blank dashboard

**Solution:**
1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify all 3 variables are set correctly
3. Click **"Redeploy"** (environment changes require redeployment)

### Issue: Authentication Fails

**Error:** `Invalid login credentials` or redirect issues

**Solution:**
1. Check Supabase **Authentication** → **URL Configuration**
2. Ensure your Vercel URL is in **Redirect URLs**
3. Format: `https://your-app.vercel.app/**` (with `/**` at the end)
4. Wait 1-2 minutes for changes to propagate

### Issue: RLS Blocking Data

**Symptoms:**
- Empty posts table
- "No posts found" even though data exists

**Solution:**
1. Verify you're logged in with correct user
2. Check browser console for errors
3. Verify RLS policies in Supabase:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'posts';
   ```
4. Ensure policies use `auth.uid() = user_id`

### Issue: 404 on Page Refresh

**Symptoms:**
- Dashboard works initially
- Refreshing page shows 404

**Solution:**
This shouldn't happen with Next.js App Router, but if it does:
1. Check `next.config.js` exists
2. Ensure you're using App Router (not Pages Router)
3. Redeploy

## 📊 Monitoring & Analytics

### Vercel Analytics (Optional)

1. Go to your project in Vercel
2. Click **"Analytics"** tab
3. Enable **Web Analytics** (free)
4. See visitor stats, page views, etc.

### Supabase Logs

Monitor your database:
1. Supabase Dashboard → **Logs**
2. View API requests, errors, slow queries
3. Check **Auth Logs** for login attempts

## 🔄 Continuous Deployment

Every time you push to GitHub, Vercel will automatically:
1. ✅ Pull latest code
2. ✅ Run build
3. ✅ Deploy to production
4. ✅ Notify you via email

### Making Updates:

```bash
# Make your changes
git add .
git commit -m "Add new feature"
git push

# Vercel automatically deploys!
```

### Preview Deployments:

Create a branch for testing:
```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
```

Vercel creates a **preview URL** for this branch!

## 🎯 Post-Deployment Checklist

- [ ] Site is live and accessible
- [ ] Login works with test users
- [ ] All 30 posts display for User 1
- [ ] Filters update URL correctly
- [ ] Chart displays 30 days of data
- [ ] Modal opens with post details
- [ ] Logout redirects to login
- [ ] Environment variables are set
- [ ] Supabase URLs are configured
- [ ] Custom domain added (if applicable)
- [ ] RLS is working (users isolated)

## 🚨 Security Checklist

Before going live:

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is in environment variables (not in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets committed to Git
- [ ] RLS is enabled on all tables
- [ ] Supabase redirect URLs are configured
- [ ] HTTPS is enabled (Vercel does this automatically)

## 📱 Share Your Project

Once deployed, share your analytics dashboard:

```
🎉 Analytics Dashboard
Live: https://your-app.vercel.app

Test Credentials:
Email: test1@example.com
Password: Test123!@#

Features:
✅ Real-time analytics
✅ Interactive charts
✅ Advanced filtering
✅ Secure authentication
✅ Row-level security
```

## 🎓 Next Steps

After successful deployment:

1. **Add More Users:** Create additional test accounts in Supabase
2. **Customize Branding:** Update colors, logo, title
3. **Add Features:** Implement additional analytics views
4. **Monitor Performance:** Use Vercel Analytics
5. **Optimize:** Check Lighthouse scores, improve performance
6. **Document:** Update README with live URL

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

## 💡 Pro Tips

1. **Use Preview Deployments:** Test changes before merging to main
2. **Enable Vercel Analytics:** Free insights into your traffic
3. **Set up Alerts:** Get notified of deployment failures
4. **Use Branch Protection:** Require reviews before merging
5. **Monitor Supabase Usage:** Stay within free tier limits

---

## 🎉 Congratulations!

Your Analytics Dashboard is now live on Vercel! 🚀

**What You've Accomplished:**
- ✅ Full-stack Next.js application deployed
- ✅ Supabase backend integrated
- ✅ Secure authentication working
- ✅ RLS protecting user data
- ✅ Continuous deployment enabled
- ✅ Production-ready application

**Share your success:**
- Add the live URL to your README
- Share on LinkedIn/Twitter
- Add to your portfolio
- Show to potential employers

---

**Need Help?**
- Check Vercel deployment logs
- Review Supabase logs
- Test locally first (`npm run dev`)
- Verify environment variables
- Check this guide's troubleshooting section
