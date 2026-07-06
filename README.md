[README.md](https://github.com/user-attachments/files/29698465/README.md)
# Backbond Stage 1 MVP

Backbond v2 turned into a real Stage 1 MVP foundation.

## Included files
- `index.html` — GitHub-ready single-file app
- `supabase-schema.sql` — database schema + RLS policies
- `README.md` — setup guide

## Stage 1 features
- Sign up / sign in / sign out
- Profile create/update
- Real feed from Supabase
- Create posts
- Like/unlike posts
- Comment on posts
- Create circles
- Join circles
- Create plans
- Join plans
- Save memories
- View notifications
- Safety foundation tables: reports + blocks
- Backbond product structure: Feed, Circles, Bond Engine, Plans, Memories, Profiles

## Setup

1. Create a Supabase project.
2. In Supabase, open **SQL Editor**.
3. Paste and run `supabase-schema.sql`.
4. Open `index.html`.
5. Replace:

```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

with your real Supabase values from **Project Settings → API**.

6. Upload `index.html` to GitHub Pages as your main `index.html`.

## Important

This is a Stage 1 MVP. It is a real backend-connected foundation, but not the finished social network.

Stage 2 should add:
- real automatic Bond Engine scoring
- DM unlock logic
- private circles / chats
- image upload using Supabase Storage
- moderation dashboard
- better feed ranking
- realtime updates
- plan reminders
- memory tagging
