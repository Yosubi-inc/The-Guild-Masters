# Guild Masters modular marketplace boundaries

Status: target contract, not implemented runtime. The [Yosubi Master](https://app.notion.com/p/3dd1dd2179118072a96ce7fa72ab4a0e) governs cross-product direction; `CLAUDE.md` governs established Guild behavior.

## Ownership

The shared customer marketplace core should own tenant identity and membership, published brand/configuration versions, module installations and entitlements, neutral listing/request/offer/transaction references, and tenant-scoped integration authority. It must not encode Guild ranks, XP, Tavern access, property management, industrial expertise, or real-estate assumptions as universal fields.

Guild Masters should own the optional quest presentation and progression rules, party mechanics, chapter/Tavern engagement, steward governance, and flavor generation. Existing Supabase tables and frontend branches are legacy product-owned implementation until migrated through an explicit adapter; they are not automatically shared customer-core records. A chapter is a Guild grouping inside one customer context, not a tenant.

## Candidate modules and dependencies

| Module | Guild-owned behavior | Dependency before activation |
|---|---|---|
| `guild.quests` | Quest vocabulary and board presentation over neutral marketplace work | Marketplace listing/work contract |
| `guild.progression` | Rank, XP, stats, achievements and eligibility | `guild.quests` plus participant identity |
| `guild.parties` | Assisted quests and party rewards | `guild.quests` and `guild.progression` |
| `guild.stewardship` | Rank-governed review, disputes and moderation | Tenant-scoped work and actor authority |
| `guild.venue` | Tavern/chapter check-in and venue gates | Tenant-scoped location authority; optional to `guild.quests` |
| `guild.flavor` | Optional local-first quest copy generation | `guild.quests`; scoped, revocable worker identity |
| `commerce.connect` | Payments/payout integration when explicitly enabled | Tenant-scoped provider connection and payment policy |

These names are proposed boundaries, not installed packages. Disabling a module must prevent new UI, API and worker actions, while preserving records for governed export/retention. Uninstalling a module does not authorize deleting its data. Dependency validation must prevent activating an orphaned dependent module. A brand or module publication must be versioned and reversible without a customer fork.

## Integration rule

Cross-product communication should use versioned, authenticated, tenant-qualified commands/events with idempotency keys and explicit actor authority. Guild Masters must not write directly to another Yosubi product's tables or reuse its service-role key. The first proof should be a synthetic interaction only; no live identity or payment account is implicitly shared.

## Proof sequence

1. Define a neutral tenant-scoped work contract and create two synthetic tenant contexts. Negative tests must prove reads and mutations cannot cross the boundary, including background-worker calls.
2. Adapt one Guild quest flow to that contract behind an opt-in module flag, preserving the existing local demo and current gameplay tests.
3. Prove module disablement blocks UI, API and worker actions while retained records remain accessible only to authorized export/admin paths.
4. Prove one versioned authenticated synthetic command/event with another Yosubi component. Only then plan migration of existing Supabase records and provider connections.

Payments, identity verification, live data migration, and deployment require separate reviewed specifications and approvals. Existing migrations stay immutable; any schema work is additive and independently tested.
