# Guild Masters status

## Current status

- Yosubi-owned fork checked out locally at `C:\Users\gabri\projects\The-Guild-Masters`; control-plane project `the-guild-masters` is registered and production-sensitive.
- The React/Vite app has a local prototype path and source for optional Supabase-backed flows. Current fork deployment, applied migrations, and live provider configuration have not been verified.
- `npm test` verifies one existing party-reward rule; `npm run build` succeeds locally. CI is defined in `.github/workflows/frontend-checks.yml`, but a GitHub run has not yet been observed for this fork.
- Root `index.html` is a committed generated artifact and is not refreshed by normal source changes.
- Onboarding and modular-boundary documentation are proposed in [Guild Masters PR #1](https://github.com/Yosubi-inc/The-Guild-Masters/pull/1); frontend CI passed on the pushed branch. The PR is open and unmerged.

## Known gaps / blockers

- Root onboarding and module-boundary documentation require GitHub review before a merge. No cross-product runtime integration, true white-label configuration publication, or tenant-isolation proof exists in this repo yet.
- `CLAUDE.md` contains dated live-test claims that are not current deployment attestation. `server/README.md` describes manual setup; source migrations extend through `0010`, but applied state is unknown.
- The marketplace-neutral core and Guild-specific modules are not separated in executable code. Chapter membership must not be treated as the future customer tenant boundary.
- No automated negative tenant-isolation or module-disable tests exist. Provider secrets and production settings are outside this checkout's autonomous scope.

## Exact next action

Review PR #1 and verify deployment/migration state before any merge or production action; then define and test one tenant-scoped marketplace contract with synthetic tenants in an isolated implementation slice. Do not connect existing Supabase data or production providers before that boundary passes negative tests.

## Decision log

- 2026-10-03: Keep Guild Masters as a distinct Yosubi-owned fork and a product composition of the shared marketplace, not the universal business-data schema.
- 2026-10-03: Preserve the existing game rules and local prototype while adding seams incrementally. Existing migrations remain immutable; production and provider actions require human approval.
- 2026-10-03: Treat live deployment and applied migration state as unknown until independently attested.
