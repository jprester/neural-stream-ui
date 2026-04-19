# Neural Stream UI

AI news aggregator built with Next.js 14 (App Router). Pulls live RSS feeds from multiple AI news sources and renders local markdown articles alongside them.

## Tech Stack

- **Framework:** Next.js 14.0.3 (App Router, server components)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS + Flowbite React component library
- **RSS Parsing:** `fast-xml-parser`
- **Markdown:** `gray-matter` (frontmatter) + `marked` (rendering)
- **Analytics:** Google Analytics via `NEXT_PUBLIC_GOOGLE_ANALYTICS` env var

## Project Structure

```
app/
  page.tsx              # Home page — fetches RSS feeds + markdown articles
  layout.tsx            # Root layout with Google Analytics
  posts/[id]/page.tsx   # Single post view (WIP — currently uses dummy API)
  posts/page.tsx        # Post listing (stub — returns hardcoded "3333")
components/
  PostsList.tsx         # Main news feed list (used)
  NewsTimeline.tsx      # Timeline view (unused — has missing react-icons dep)
  UngroupedPostList.tsx # Flat list variant (unused)
helpers/
  apiConfig.ts          # RSS feed source definitions (FEED_SOURCES)
  utils.ts              # parseFeedData, createKeyId, formatDate, etc.
  parseMarkdown.ts      # Reads markdown files from /public/data/articles/
lib/
  GoogleAnalytics.tsx   # GA script injection
types/
  index.ts              # Post, NewsItem, and related types
public/data/articles/   # Local markdown news articles with frontmatter
```

## Common Commands

```bash
npm run dev     # Start dev server (with Node inspector)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Data Flow

1. `FEED_SOURCES` in `helpers/apiConfig.ts` defines all RSS feed sources with `ENABLED` flag, `FEED` URL, `ARTICLE_NUM` limit, `TYPE`, `NAME`, and `WEB_LINK`
2. Home page fetches all enabled feeds in parallel via `Promise.all`, parses XML, and normalizes with `parseFeedData()`
3. Local markdown articles are loaded synchronously via `getNewsItems()` from `parseMarkdown.ts`
4. Both are merged and passed to `<PostsList>` as `Post[]`

## Adding a New RSS Feed Source

Edit `helpers/apiConfig.ts` — add an entry to `FEED_SOURCES`:

```typescript
NEW_SOURCE: {
  NAME: "Source Name",
  FEED: "https://example.com/rss",
  WEB_LINK: "https://example.com",
  ENABLED: true,
  TYPE: "rss",       // "rss" | "atom" | "articles"
  ARTICLE_NUM: 5,    // max articles to show
}
```

## Adding a Local Article

Create a markdown file in `public/data/articles/` with this frontmatter:

```markdown
---
title: "Article Title"
date: "2026-04-19"
source: "Source Name"
link: "https://original-article-url.com"
---

Article content here...
```

## Known Issues & TODOs

### Critical
- `parseFeedData()` returns `{}` (empty object) on bad feeds instead of `[]` — causes `.length` check to pass and `.filter()` to throw (`helpers/utils.ts:19`)
- Sorting in `app/page.tsx:60` compares `a.data[0].published` but the type uses `pubDate` — sorts on `undefined`
- `components/NewsTimeline.tsx` imports `react-icons` which is **not in package.json** — will break if imported

### Medium
- `lib/GoogleAnalytics.tsx` has a malformed GA script URL (newline in template literal creates space in URL)
- No `response.ok` check before `.json()` in `posts/[id]/page.tsx:19`
- Article link URLs from RSS feeds are not validated — unsafe `javascript:` or `data:` URLs could pass through
- No timeout on `Promise.all` for feed fetching — a slow feed stalls the entire page

### Low / Tech Debt
- `axios` is in `package.json` but never used — remove it
- Sorting logic is duplicated in 3 places — extract to a shared util
- `any` types used widely — replace with proper types from `types/index.ts`
- `/app/posts/page.tsx` returns hardcoded `"3333"` — needs implementation
- `/app/posts/[id]/page.tsx` fetches from `jsonplaceholder.typicode.com` — replace with real data
- `cache: "no-store"` on all RSS fetches disables caching — consider ISR with `revalidate`
- `NewsTimeline.tsx` and `UngroupedPostList.tsx` are dead code — remove or implement

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | No | Google Analytics measurement ID (e.g., `G-XXXXXXXXXX`) |
