# Guild Masters agent instructions

Read root `todo.md` if it exists, then `CONTEXT.md`, `STATUS.md`, and `docs/MODULAR_MARKETPLACE_BOUNDARIES.md` before changing this repository. Read `CLAUDE.md` for game rules and visual decisions; its historical deployment claims are not current attestation.

Keep Guild Masters' work in this repository and its own worktree. Preserve existing changes. Use the registered `the-guild-masters` control-plane project for nontrivial work; one writer per worktree. A task's approval is specific to its outcome, not blanket authorization for later tasks.

Preserve quest ranks, progression math, and established UI behavior unless a scoped change explicitly revises them. Use test-first slices for behavior changes. Run `npm test` and `npm run build` from `app/` after relevant edits. Do not commit regenerated root `index.html` unless a reviewed release explicitly requires it.

Treat customer tenant as a security boundary distinct from Guild chapters, venues, parties, and users. Keep optional Guild modules detachable in the target design; module disablement must block UI, API, and worker entry points without deleting retained data. Do not write into another product's tables or share privileged provider credentials across products.

Never edit an existing migration. Do not read, commit, display, or pass service-role or Stripe secret keys to a worker. No production migration, provider configuration, deployment, GitHub push, or merge without the specific human authorization for that action.
