Modified principles:

- I. Arabic, RTL and Accessible by Default → II. Arabic RTL Interface
- III. Strict Types at Every Boundary → I. Strict TypeScript
- V. UI Kit and Tokens Only → III. Tailwind, Tokens and the UI Kit
- VI. Right Tool for Each Kind of State → IV. Server First, Clear State Tools
- IV. Resilient Data Sections → V. Loading, Error and Empty States
- VII. Tests Guard Behavior (NON-NEGOTIABLE) → VI. Tested Acceptance Criteria (NON-NEGOTIABLE)
  Added principles:
- VII. Clean Code
- VIII. Small English Commits
  Removed principles:
- II. Feature-Owned Structure, One Source of Truth (moved, shortened, into Scope and Constraints)
  Added sections: none
  Removed sections: none (Scope and Technology Constraints renamed to Scope and Constraints)
  Templates: not modified (dependent templates read the constitution at runtime)
  Deferred TODOs: none
  -->

# Tilal Web Constitution

## Core Principles

### I. Strict TypeScript

- TypeScript runs in strict mode.
- Code MUST NOT use `any`, `as` type assertions (`as const` is allowed) or `!` non-null
  assertions. ESLint blocks all three.
- Data from the API and from `localStorage` MUST pass a type guard (`src/lib/api/guards.ts` or a
  feature `x.guards.ts`) before use.

### II. Arabic RTL Interface

- All text users see MUST be Arabic, in a light Levantine dialect, and the layout reads right
  to left.
- When the two sides differ, classes MUST be logical: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`,
  `end-*`. Equal sides use `px-*`, `py-*`, `mx-*`, `my-*`; `left` and `right` are only for
  physical positions.
- Every image MUST have a descriptive Arabic `alt`.

### III. Tailwind, Tokens and the UI Kit

- Styling MUST be Tailwind classes only. `src/app/globals.css` is the only CSS file; no
  `.module.css` files.
- Colors, radii and fonts MUST come from the tokens in `globals.css` (`@theme inline`, with light
  values in `:root` and dark values in `.dark`). Components MUST NOT contain hex colors, pixel
  values, arbitrary `[..]` values or `dark:` color classes. A missing color becomes a new token.
- Every control MUST come from `src/components/ui`, built with `cva` variants, `cn()` and typed
  props. A missing look becomes a new variant, never a copied class string or a second
  component.

### IV. Server First, Clear State Tools

- Components are Server Components by default. `"use client"` MUST be added only when a
  component needs state, effects, event handlers, SWR, Zustand or Motion.
- API data MUST use SWR, through a feature `x.api.ts` fetcher and a key from `apiKeys`.
  Components MUST NOT call `fetch`.
- Shared client state MUST use a Zustand store in the feature folder, read with narrow selectors.
  URL filters MUST stay in `useSearchParams`, never copied into `useState`.

### V. Loading, Error and Empty States

- Every data section MUST be wrapped in `DataSection` with its own placeholder, a friendly
  Arabic error message and a working `retry`.
- Every list that can be empty MUST show `EmptyState`; a filter with no match MUST use a
  different message from an empty shop.
- Users MUST never see a raw error. All three states MUST be checkable with the `/delay/3000`,
  `/fail/500` and `/empty` API test modes.

### VI. Tested Acceptance Criteria (NON-NEGOTIABLE)

- Every acceptance criterion MUST have a test: Vitest and Testing Library for logic and
  components (next to the file they test), Playwright for user flows (in `e2e/`).
- Tests MUST find elements by role or label, never by class name. Each test name states what
  must be true.
- A test MUST NOT be edited or deleted to make it pass; the code is fixed instead. A test
  changes only when the requirement changed, and the commit message says so.

### VII. Clean Code

- Code MUST NOT contain comments; names and small functions make it clear.
- Code MUST NOT contain unused code (variables, imports, files or exports).
- Code, file names and docs MUST be in English.

### VIII. Small English Commits

- Each commit MUST hold one small, focused change with an English message.
- Commits MUST pass the Husky pre-commit hook (ESLint with `--max-warnings=0`, Prettier) without
  skipping it, and MUST NOT include `.env.local` or `node_modules`.

## Scope and Constraints

- Tilal is a frontend course project: no user accounts, no online payments, orders sent through
  WhatsApp. Data comes only from the `tilal-api` json-server API.
- Stack: Next.js 16 (App Router, `cacheComponents`), React 19, SWR, Zustand, Tailwind CSS 4,
  shadcn/ui only for `RadioGroup` and `Field`, react-hook-form and Zod, Motion, Lucide.
- `src/app/` holds routes only. Each feature owns its code in `src/features/<name>/`; shared UI
  goes in `src/components/` and shared non-UI code in `src/lib/` only when two or more features
  use it. Each type, option list and color is defined in one place.

## Development Workflow and Quality Gates

- A change is done only when `npm run typecheck`, `npm run lint` and `npm run format:check`
  pass, plus `npm run build` after changes to routes, data fetching or config, and the related
  tests pass.
- Spec Kit plans MUST pass a Constitution Check; any deviation is recorded and justified in the
  plan.

## Governance

- This constitution supersedes other practices where they conflict. `CLAUDE.md` holds the
  detailed rules and `DESIGN.md` the visual identity; both MUST stay consistent with it.
- Amendments go through `/speckit-constitution` with a reviewed Sync Impact Report, and update
  `CLAUDE.md` or `DESIGN.md` in the same change when they are affected.
- Versioning: MAJOR for removing or redefining a principle, MINOR for a new principle or section,
  PATCH for wording.
- Every review MUST check a change against these principles.

**Version**: 2.0.0 | **Ratified**: 2026-11-11 | **Last Amended**: 2026-11-11
