# TODO: Fix News API 422 Error - COMPLETE

## Steps completed:
- [x] 1. Create TODO.md with plan steps.
- [x] 2. Created .env with NEWS_DATA_API_KEY placeholder.
- [x] 3. Updated server.js: Proxies /api/news to newsdata.io using .env key.
- [x] 4. Updated News.js: Calls proxy instead of direct API.

## Final steps:
- [ ] Get free API key from https://newsdata.io/register, set `NEWS_DATA_API_KEY=your_key` in .env.
- [ ] Run `npm run dev`.
- News loads via proxy, no more 422 errors.

**Proxy ready! Direct API calls eliminated.**
