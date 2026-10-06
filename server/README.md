# Backend setup

> Source/setup guide, not evidence of a live deployment. This Yosubi fork's applied migration state, Stripe configuration and endpoint are unverified. The migration list below reflects files present in this repository; apply changes only through a separately approved environment-specific procedure.

Real backend for The Guild Masters: Supabase (Postgres + Auth + Storage) +
Stripe Connect for payouts. Everything in this folder is code — the steps
below are the manual, one-time setup that only a human can do (creating
accounts, generating API keys). Claude cannot create these accounts for you.

None of this is required for the existing prototype (`app/`) to keep
working — if `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are unset, the
frontend falls back to its original fully-local behavior untouched.

## 1. Create the Supabase project

1. Go to https://supabase.com, create an account, create a new project
   (any region/plan — the free tier covers this stage).
2. In the project's **Settings -> API** page, copy:
   - **Project URL** -> becomes `VITE_SUPABASE_URL` (frontend) and
     `SUPABASE_URL` (edge functions)
   - **publishable key** (Supabase's current name; older docs/projects call
     it the **anon key** — same thing, safe to expose client-side) ->
     `VITE_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY`
   - **secret key** (current name; older docs call it the **service_role
     key**) -> `SUPABASE_SERVICE_ROLE_KEY` (edge functions only — never put
     this in the frontend `.env`, it bypasses RLS)

## 2. Run the schema

Easiest path (no CLI needed): open the Supabase Dashboard's **SQL Editor**
and run, in order:
The repository contains numbered migrations `0001` through `0010` in
`supabase/migrations/`. Review their ordering, dependencies and target
environment before any application; this document does not attest which ones
have already run. `supabase/seed.sql` is separate seed data, not a migration.

(Or, with the Supabase CLI installed: `supabase link --project-ref <ref>`
then `supabase db push`.)

## 3. Enable Google sign-in

1. In [Google Cloud Console](https://console.cloud.google.com), create an
   OAuth 2.0 Client ID (Web application). Authorized redirect URI is shown
   in the next step.
2. In the Supabase Dashboard: **Authentication -> Providers -> Google**,
   enable it, paste the Client ID and Client Secret from step 1.

## 4. Set your first admin

`is_admin` can only be changed via the `admin_set_role` RPC, which requires
an existing admin — so the very first one has to be set by hand. After you
sign in once through the app (so your `profiles` row exists), run in the
SQL Editor:

```sql
update profiles set is_admin = true where id = '<your-user-id-from-auth.users>';
```

From then on, use the Admin Console (Settings -> "Open Admin Console") or
`admin_set_role` to promote/demote anyone else.

## 5. Stripe (payments)

1. Create a free Stripe account at https://stripe.com — test mode is free,
   no charges happen until you go live.
2. **Developers -> API keys**: copy the test **Secret key** ->
   `STRIPE_SECRET_KEY`.
3. Deploy the edge functions, then **Developers -> Webhooks -> Add
   endpoint**, pointing at your deployed `stripe-webhook` function URL.
   Copy the **Signing secret** -> `STRIPE_WEBHOOK_SECRET`.

## 6. Deploy the Edge Functions

```sh
supabase functions deploy stripe-connect-onboarding
supabase functions deploy stripe-webhook
# Configure STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and APP_URL only in the approved target environment.
```

`SUPABASE_URL`/`SUPABASE_ANON_KEY`/`SUPABASE_SERVICE_ROLE_KEY` are injected
automatically for Supabase-hosted Edge Functions — no need to set those
secrets yourself.

## 7. Frontend

```sh
cp app/.env.example app/.env.local
# fill in VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
```

## Historical prototype-only snapshot

This section predates later implementation described in `CLAUDE.md`. Verify the
current source and target environment before treating any item as outstanding.

- The existing quest/board/party gameplay (`app/src/App.jsx`'s `player`
  state) still runs entirely on `localStorage` — it has not been migrated
  to the `postings`/`disputes`/`steward_log` tables yet. Those tables
  exist and are RLS-protected, but nothing writes to them yet except the
  Admin Console (venues, roles, ID verification).
- ID verification is manual review only (file upload + admin approve/
  reject) — no third-party verification vendor integrated (deferred, see
  CLAUDE.md Tier 1).
- Payments: Stripe Connect account creation/onboarding is wired, but
  there's no checkout/escrow flow yet tying a quest's payout to an actual
  charge — that's the next piece once the quest data model itself moves
  to Supabase.
