# The Guild Masters — project context

- Project: The Guild Masters; Yosubi-owned fork of `madcowg/The-Guild-Masters` at `Yosubi-inc/The-Guild-Masters`.
- Control-plane project: `the-guild-masters` (`f5092558-8b2a-4441-a3cd-b6d70c2130b7`), registered under `legacy-control-plane` with the fork repository binding.
- Local checkout: `C:\Users\gabri\projects\The-Guild-Masters`.
- Success: retain the Guild Masters quest-marketplace behavior while making it a modular, multi-tenant, white-label participant in the shared marketplace platform. The product's existing north-star is quests completed per active member per month (`CLAUDE.md`).
- Risk: production-sensitive by default. Changes to payments, identity, access control, tenant isolation, database schema, or deployments require human approval. Existing migrations are immutable; additions need separate review.
- Canonical sources: `CLAUDE.md` for game rules and visual language; `server/README.md` for backend setup, subject to the actual migration tree; `app/package.json` for frontend scripts. Shared platform architecture lives in the agent-platform repository and must not be copied wholesale here.
- Checks: from `app/`, `npm test` and `npm run build` exist. There is no declared lint or typecheck script. The worker's `local-agents/quest-flavor-worker/package.json` declares `npm start`, not a check.
- Deployment: repository contains a generated root `index.html` intended for GitHub Pages and Supabase functions; the fork's actual deployment target and live state are unverified. No deployment is authorized by this document.
- Credentials: frontend may use Supabase publishable/anon credentials; Supabase secret/service-role and Stripe secret keys must never enter frontend code, git, or agent output. Account creation, secrets, and production setup remain human-controlled.
- Approval owner: human operator; exact named approver unknown. Payment, identity, database, and production actions are not autonomous.
- Work tracking: control-plane tasks after registration; no repository issue-tracker policy is documented.
- Unknowns: current live backend/migration state; active deployment and domain; production approval owner; which shared-platform integration contract is approved.
