# Analytics Dashboard

> A full-stack social media analytics dashboard built with Next.js, TypeScript, Supabase, and modern React patterns. Track Instagram and TikTok post performance with real-time metrics, trends, and insights.

## 📺 Live Demo

🔗 **[View Live Application](https://your-vercel-url.vercel.app)** _(Add your Vercel URL after deployment)_

**Test Credentials:**

- Email: `test1@example.com`
- Password: `Test123!@#`

## ✨ Key Highlights

- ✅ **Full-stack TypeScript** application with type safety throughout
- ✅ **Production-ready** with authentication, RLS, and comprehensive error handling
- ✅ **Modern architecture** using Atomic Design and clean separation of concerns
- ✅ **Performance optimized** with server-side aggregation and client-side caching
- ✅ **Fully documented** with detailed explanations of design decisions

## � Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Design Decisions](#️-architecture--design-decisions)
- [Project Structure](#️-project-structure)
- [Setup Instructions](#️-setup-instructions)
- [Security](#-security)
- [Testing](#-testing)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment-vercel)
- [Code Quality](#-code-quality)
- [Technologies Used](#️-technologies-used)

## �🚀 Features

- **Authentication**: Secure login with Supabase Auth
- **Posts Table**: Sortable, filterable table with engagement metrics
- **Engagement Chart**: 30-day trend visualization with Recharts
- **Summary Cards**: Key metrics with trend indicators
- **Post Details Modal**: Deep-dive analytics for individual posts
- **Real-time Filtering**: Platform, media type, date range, and search
- **URL State Management**: Shareable filter states via query params
- **Row Level Security**: Users only see their own data
- **Responsive Design**: Mobile-first, works on all devices

## 📋 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (UI state), TanStack Query (server state)
- **Database**: Supabase (PostgreSQL with RLS)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Architecture**: Atomic Design Pattern

## 🏗️ Architecture & Design Decisions

### 1. Data Aggregation Strategy

**Hybrid Approach** - Aggregation happens at multiple levels for optimal performance:

#### Database Level (Primary)

- **Daily Metrics Table**: Pre-aggregated daily engagement and reach
- **Indexes**: Optimized queries on `user_id`, `date`, `posted_at`
- **Why**: Reduces computation for time-series data, enables fast chart rendering

#### API Level (Secondary)

- **`/api/analytics/summary`**: Server-side aggregation of posts data
  - Calculates totals (likes, comments, shares, saves, reach)
  - Computes averages and engagement rates
  - Identifies top-performing posts
  - Calculates trend indicators (current vs previous period)
- **`/api/metrics/daily`**: Fetches pre-aggregated daily metrics
- **Why**: Keeps client lightweight, enables caching, reduces data transfer

#### Client Level (Minimal)

- **Formatting only**: Numbers, dates, percentages
- **UI calculations**: Chart data transformation, sorting, filtering
- **Why**: Keeps server authoritative, client handles presentation only

**Trade-offs**:

- ✅ Fast queries and rendering
- ✅ Reduced client-side computation
- ✅ Cacheable API responses
- ⚠️ Requires daily metrics maintenance (could use cron job)

### 2. State Management Strategy

**Three-Layer Approach** - Different state types use different solutions:

#### UI State → Zustand

**Stores**:

- `filtersStore`: Platform, media type, date range, sort, search
- `modalStore`: Modal open/close state, selected post ID
- `chartStore`: Chart type (line/area), selected metrics

**Why Zustand**:

- Lightweight (1KB)
- No boilerplate
- Perfect for client-only UI state
- Easy to test and debug

#### Server State → TanStack Query

**Queries**:

- `useQuery(['posts', filters])`: Fetches and caches posts
- `useQuery(['analytics-summary'])`: Fetches summary metrics
- `useQuery(['daily-metrics', dateRange])`: Fetches chart data

**Why TanStack Query**:

- Automatic caching and invalidation
- Loading/error states built-in
- Optimistic updates support
- Prevents duplicate requests

#### URL State → Query Params

**Synced Filters**:

- `?platform=instagram&mediaType=video&search=hack`
- Enables shareable links
- Browser back/forward support
- Bookmark-friendly

**Implementation**: `useUrlFilters` hook syncs Zustand ↔ URL

**Why This Split**:

- Clear separation of concerns
- Each tool optimized for its use case
- No state management conflicts
- Easy to reason about data flow

### 3. Empty State Handling

**Three-State Pattern** - Every data component handles:

#### Loading State

```tsx
<LoadingState message="Loading posts..." />
```

- Spinner + message
- Prevents layout shift
- User knows something is happening

#### Error State

```tsx
<ErrorState
  title="Failed to Load"
  message={error.message}
  onRetry={() => refetch()}
/>
```

- Clear error message
- Retry button for transient failures
- User can recover without refresh

#### Empty State

```tsx
<EmptyState
  title="No Posts Found"
  description="Try adjusting your filters"
  icon={<FileText />}
/>
```

- Helpful guidance
- Suggests next action
- Better UX than blank screen

**Where Applied**:

- Posts Table
- Engagement Chart
- Summary Cards
- Post Detail Modal

### 4. Trend Calculation Method

**Period-over-Period Comparison**:

```typescript
// Current period: Last 30 days
const current = sum(metrics.filter((m) => m.date >= last30Days));

// Previous period: 30 days before that
const previous = sum(
  metrics.filter((m) => m.date >= last60Days && m.date < last30Days)
);

// Calculate trend
const percentage = ((current - previous) / previous) * 100;
const direction = percentage > 0 ? 'up' : 'down';
```

**Why This Method**:

- Industry standard (used by Google Analytics, Facebook Insights)
- Accounts for seasonality
- Easy to understand
- Comparable across metrics

**Alternative Considered**: Week-over-week

- ❌ Too volatile for social media
- ❌ Doesn't account for weekly patterns

## 🗂️ Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Dashboard (protected)
│   ├── login/                  # Login page
│   ├── api/
│   │   ├── analytics/summary/  # Aggregated metrics
│   │   └── metrics/daily/      # Time-series data
│
├── components/
│   ├── atoms/                  # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Typography.tsx
│   │   └── EmptyState.tsx
│   ├── molecules/              # Combinations of atoms
│   │   ├── TableRow.tsx
│   │   ├── ChartLegend.tsx
│   │   └── ModalHeader.tsx
│   ├── organisms/              # Complex sections
│   │   ├── PostsTable.tsx
│   │   ├── EngagementChart.tsx
│   │   ├── SummaryCards.tsx
│   │   └── PostDetailModal.tsx
│   └── templates/              # Page layouts
│       └── DashboardLayout.tsx
│
├── services/
│   ├── supabaseClient.ts       # Supabase initialization
│   ├── analyticsService.ts     # Posts data fetching
│   └── metricsService.ts       # Metrics data fetching
│
├── store/                      # Zustand stores
│   ├── filtersStore.ts
│   ├── modalStore.ts
│   └── chartStore.ts
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts              # Authentication state
│   ├── useFilters.ts           # Filter management
│   ├── useModal.ts             # Modal state
│   └── useUrlFilters.ts        # URL sync
│
├── types/                      # TypeScript definitions
│   ├── post.ts
│   ├── metrics.ts
│   └── user.ts
│
├── utils/                      # Helper functions
│   ├── formatters.ts           # Number/date formatting
│   ├── validators.ts           # Input validation
│   └── constants.ts            # App constants
│
└── lib/
    └── supabase/
        ├── client.ts           # Browser client
        └── server.ts           # Server client (cookies)
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- Supabase account

### 2. Clone and Install

```bash
git clone <repository-url>
cd analytics-challenge
npm install
```

### 3. Supabase Setup

#### Create Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy your project URL and keys

#### Run Schema

1. Go to SQL Editor in Supabase Dashboard
2. Copy contents of `supabase/schema.sql`
3. Run the SQL
4. Verify tables created: `posts`, `daily_metrics`

#### Create Users

1. Go to Authentication → Users
2. Click "Add user" → "Create new user"
3. Create 2 test users:
   - Email: `test1@example.com`, Password: `Test123!@#`
   - Email: `test2@example.com`, Password: `Test123!@#`
4. ✅ Check "Auto Confirm User"
5. Copy their UUIDs

#### Seed Data

1. Open `supabase/seed.sql`
2. Replace UUIDs with your actual user IDs (lines 10-11)
3. Go to SQL Editor
4. Run the seed SQL
5. Verify data: Check Table Editor for 55 posts

### 4. Environment Variables

Create `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Server-side only (never expose to client)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Login

- Email: `test1@example.com`
- Password: `Test123!@#`

You should see 30 posts with analytics!

## 🔒 Security

### Row Level Security (RLS)

All tables have RLS enabled with policies:

```sql
-- Users can only see their own posts
CREATE POLICY "Users can view own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only see their own metrics
CREATE POLICY "Users can view own metrics"
  ON daily_metrics FOR SELECT
  USING (auth.uid() = user_id);
```

### Environment Variables

- ✅ Secrets in `.env.local` (gitignored)
- ✅ Service role key server-side only
- ✅ Public keys safe for client
- ✅ Documented in `.env.example`

### Input Validation

- Date range validation
- UUID validation
- Platform/media type enum validation
- SQL injection prevention (parameterized queries)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login with test credentials
- [ ] View posts table (should show 30 posts)
- [ ] Sort by different columns
- [ ] Filter by platform (Instagram/TikTok)
- [ ] Filter by media type (image/video/carousel)
- [ ] Search posts by caption
- [ ] Change date range
- [ ] View engagement chart (should show 30 days)
- [ ] Toggle chart metrics (engagement/reach)
- [ ] Click post to open modal
- [ ] View detailed metrics in modal
- [ ] Close modal
- [ ] Check URL updates with filters
- [ ] Share URL (filters persist)
- [ ] Logout
- [ ] Try accessing dashboard (should redirect to login)

### RLS Isolation Testing

**Important:** Verify that users cannot access each other's data.

#### Quick Test (SQL Editor)

Run `test-rls.sql` in Supabase SQL Editor:

```bash
# Copy and run test-rls.sql in Supabase Dashboard → SQL Editor
```

**Expected Results:**

- ✅ User 1 Posts: 30 (PASS)
- ✅ User 2 Posts: 25 (PASS)
- ✅ RLS Enabled: true (PASS)
- ✅ Policies Active: 8 (PASS)

#### Browser Test (Real-World)

1. **Login as User 1** (`test1@example.com`)
   - Should see 30 posts
   - Open console (F12) and try:

   ```javascript
   const { data } = await supabase
     .from('posts')
     .select('*')
     .eq('user_id', '78ecef11-f4ff-4018-b29b-359d1f8e26aa'); // User 2's ID
   console.log(data); // Should be empty []
   ```

2. **Login as User 2** (`test2@example.com`)
   - Should see 25 posts
   - Cannot see User 1's data

**For detailed testing instructions, see `RLS_TEST_GUIDE.md`**

## 📊 Database Schema

### posts

```sql
id              UUID PRIMARY KEY
user_id         UUID REFERENCES auth.users(id)
platform        TEXT ('instagram' | 'tiktok')
caption         TEXT
media_type      TEXT ('image' | 'video' | 'carousel')
posted_at       TIMESTAMPTZ
likes           INTEGER
comments        INTEGER
shares          INTEGER
saves           INTEGER
reach           INTEGER
impressions     INTEGER
engagement_rate DECIMAL(5,2)
```

### daily_metrics

```sql
id         UUID PRIMARY KEY
user_id    UUID REFERENCES auth.users(id)
date       DATE
engagement INTEGER
reach      INTEGER
UNIQUE(user_id, date)
```

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

### 3. Configure Supabase

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel URL to:
   - Site URL
   - Redirect URLs

## 📝 Code Quality

### SOLID Principles

- **Single Responsibility**: Each component has one job
- **Open/Closed**: Extensible via props, closed for modification
- **Liskov Substitution**: All Card variants interchangeable
- **Interface Segregation**: Minimal, focused interfaces
- **Dependency Inversion**: Depend on abstractions (hooks, services)

### DRY (Don't Repeat Yourself)

- Shared utilities: `formatters.ts`, `validators.ts`
- Reusable atoms: Button, Input, Card
- Custom hooks: `useAuth`, `useFilters`, `useModal`

### TypeScript

- Strong typing throughout
- No `any` types (except necessary edge cases)
- Interfaces for all data structures
- Type-safe API responses

## 🎨 Design System

### Atomic Design

- **Atoms**: Button, Input, Card, Typography
- **Molecules**: TableRow, ChartLegend, ModalHeader
- **Organisms**: PostsTable, EngagementChart, SummaryCards
- **Templates**: DashboardLayout
- **Pages**: Dashboard, Login

### Tailwind CSS

- Utility-first approach
- Consistent spacing scale
- Responsive breakpoints
- Custom color palette

## 📚 Additional Documentation

- `RLS_TEST_GUIDE.md`: **Comprehensive RLS isolation testing guide**
- `test-rls.sql`: Automated RLS test script
- `SCHEMA_MIGRATION_COMPLETE.md`: Migration details
- `CHALLENGE_CHECKLIST.md`: Requirements tracking
- `PROJECT_STRUCTURE.md`: Detailed architecture
- `.env.example`: Environment variable template

## 📄 License

MIT License - feel free to use this project for learning or as a template.

## �️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Supabase** - PostgreSQL database with authentication and RLS
- **TanStack Query** - Server state management and caching
- **Zustand** - Lightweight client state management
- **Recharts** - Interactive data visualization
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Vercel** - Deployment and hosting platform
