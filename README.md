# The Guild Masters

The Guild Masters is a quest-themed marketplace and companion app to The Tavern. This repository is the Yosubi-owned fork of [`madcowg/The-Guild-Masters`](https://github.com/madcowg/The-Guild-Masters). Its current code supports a local-only demo and optional Supabase-backed flows; neither the presence of backend source nor historical live-test notes prove the fork's current deployment state.

## Local development

From `app/`, run `npm ci`, then `npm run dev`. For checks, run `npm test` and `npm run build`. CI runs those checks without Supabase or Stripe credentials. The generated `app/dist/` output is ignored. The committed root `index.html` is a separate release artifact; do not overwrite it as part of an ordinary build or review.

Without `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, the frontend uses its local prototype path. Backend source and manual setup instructions are in `server/README.md`; applying migrations, configuring providers, deploying functions, and enabling payments are separate human-controlled operations. Never put Supabase secret/service-role or Stripe secret keys in frontend environment files.

## Source of truth

- `CONTEXT.md`: repository identity, checks, and execution boundaries.
- `STATUS.md`: current evidence, gaps, next action, and decisions.
- `CLAUDE.md`: established Guild game rules, visual language, and dated development history. Read its current-state note before relying on old deployment claims.
- `docs/MODULAR_MARKETPLACE_BOUNDARIES.md`: this product's current-to-target modular boundaries.
- [Yosubi Master](https://app.notion.com/p/3dd1dd2179118072a96ce7fa72ab4a0e): cross-product direction. This repo remains authoritative for its own existing behavior.

The target is a tenant-isolated, white-label marketplace composition, not a customer-specific fork. Guild-specific quests, progression, Tavern, and flavor capabilities should become optional modules over a neutral marketplace core. This is a target architecture, not a claim that tenant isolation or module installation is implemented here today.
