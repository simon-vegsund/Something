# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev            # Vite dev server (add -- --open to open a browser)
npm run build          # production build (Vercel adapter)
npm run preview        # preview the production build

npm run check          # svelte-kit sync + svelte-check (type-check .svelte/.ts)
npm run lint           # prettier --check + eslint
npm run format         # prettier --write .

npm run test           # vitest run (single pass, CI mode)
npm run test:unit      # vitest watch mode
npm run test:unit -- --run path/to/file.spec.ts   # run a single test file

npm run db:push        # push schema to the DB without a migration (dev)
npm run db:generate    # generate a SQL migration from schema changes
npm run db:migrate     # apply migrations
npm run db:studio      # open Drizzle Studio
```

`DATABASE_URL` must be set (a Neon Postgres connection string) for the app, `db:*` commands, and `drizzle.config.ts` to work.

## Architecture

SvelteKit (Svelte 5) + TypeScript app deployed to **Vercel** (`@sveltejs/adapter-vercel`). The domain is **fitness & nutrition tracking**: users log workouts, exercises, sets, meals, foods, goals, and progress photos.

### Database layer

Postgres accessed via **Drizzle ORM**, hosted on **Neon**. The schema is the heart of the app and lives in `src/lib/server/db/schema/`, split one directory per entity (`user/`, `workout/`, `cardio/`, `exercise/`, `set/`, `food/`, `meal/`, `meal-food/`, `goal/`, `photo/`), each exporting its `pgTable` from an `index.ts`. Key conventions:

- **All enums are centralized** in `schema/enums.ts` (e.g. `dayEnum`, `mealEnum`, `microEnum`) and imported by the entity tables. Add new enums there, not inline.
- `schema/index.ts` re-exports every entity; `drizzle.config.ts` globs `schema/**/*.ts`, so a new entity must be re-exported there to be picked up by both the ORM and migrations.
- Tables use `uuid` PKs with `defaultRandom()`, `created_at`/`updated_at` timestamps (`updated_at` uses `$onUpdate(() => new Date())`), explicit indexes on foreign keys, and `onDelete: 'cascade'` references to parent rows (e.g. `workout.user_id → user.id`). `meal_food` is a composite-PK join table between `meal` and `food`.
- Cardio can be logged two ways: inline on a `workout` (the `cardio` boolean + `cardio_type`/`cardio_duration` columns, for e.g. a weights session that also included a run) or as a standalone `cardio` entry tied directly to a user.

All DB access goes through the single Drizzle client in `src/lib/server/db/index.ts` (`postgres-js` driver + full `schema`), which reads `DATABASE_URL` via `$env/dynamic/private`. Import `db` from there and run raw SQL via `db.execute(sql\`...\`)` when needed.

`src/lib/server/db/queries/` (`insert.ts`, `selects.ts`, `update.ts`, `delete.ts`) are intended homes for reusable query functions but are currently empty placeholders.

### Testing

Vitest is configured (`vite.config.ts`) with a single **`server`** project running in the `node` environment over `src/**/*.{test,spec}.{js,ts}`, explicitly **excluding** `*.svelte.{test,spec}` files. `expect.requireAssertions` is on, so every test must make at least one assertion.

## Conventions

- `src/lib/server/**` is server-only (never imported into client code). Import shared client code via the `$lib` alias.
- Anything under `$lib/server` and the `db` client must stay out of `.svelte` components and `+page.svelte`/load functions that run on the client.
