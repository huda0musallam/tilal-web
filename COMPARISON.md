Comparison with shopboard-reference

Reference: yaman3bd/shopboard-reference

I ran the reference first, tried every page and the three API states (delay, fail, empty), then read it in the order its README gives: the docs, package.json, the structure, the cart feature from the button to the store, and git log.

Structure
What I did: src/app for routes, src/features/<name>/ for each feature (products, blend, cart, checkout, favorites, brewing, reviews, suggestions, home, theme), src/components/ui for the UI kit, src/lib for shared code. Files carry the feature name (cart.logic.ts, cart.types.ts) and components are PascalCase (SuggestionBox.tsx).
What the reference does: app/ for thin routes, modules/<name>/ for features, files named for their job (types.ts, api.ts, store.ts, schema.ts), kebab-case file names. CLAUDE.md says who may import from whom: components/ui never imports from modules, and products knows nothing about the cart.
What I will take, and why: the import direction rules. My folders already follow them, but they are not written down, so nothing stops a future change from breaking them. I will keep my file names: they are consistent across the project and renaming everything adds risk for no gain.
API client
What I did: one fetchJson in src/lib/api/client.ts, a type guard for every response, an ApiError with the status, and test modes (/delay/3000, /fail/500, /empty) read from NEXT_PUBLIC_API_URL. The API is a separate json-server on Render.
What the reference does: one api<T>() function, the only place that calls fetch. It reads the error message from { error } in the body and turns an empty body (204) into null. Its API lives inside the app (app/api/[...path]/route.ts).
What I will take, and why: reading the error message from the response body, so the user sees what the server said instead of a generic message.
Types and schemas
What I did: plain types for API data, checked at runtime with type guards (v is T), also for data read from localStorage. Zod for the checkout form.
What the reference does: plain types with no runtime check, because it trusts its own API. Zod only for forms. Prices are integers in cents.
What I will take, and why: nothing here. My guards are stricter (see "What I did better").
State
What I did: SWR for API data (with Suspense and a server fallback), Zustand for the cart, favorites and the blend builder. The cart saves only ids, options and quantities; prices come from the catalog. persist uses skipHydration and rehydrates in the cart drawer. Narrow selectors to avoid re-renders.
What the reference does: no SWR: data is fetched in server components and passed as props. Zustand only for the cart, with partialize (save data, not functions) and version (drop old saved carts when the shape changes). useHydrated() shows a skeleton until the saved cart is read. Filters, search and sort live in the URL. The README has a table of who owns each piece of state.
What I will take, and why: partialize and version on my persisted stores. My cart lines have more fields than the reference's (weight, cardamom, blends), so a shape change is likely, and an old saved cart should not break the site. I will also add the "who owns which state" table to my README, because it explains my SWR/Zustand split in one place.
Forms
What I did: the checkout form uses react-hook-form, Zod and shadcn Field. The suggestion box uses useState and checks the fields by hand.
What the reference does: every form uses react-hook-form with zodResolver and a schema in schema.ts. When sending fails, form.reset(values) gives the user back what they typed.
What I will take, and why: moving the suggestion box to react-hook-form and Zod, so every form in the site works the same way and its rules live in one schema.
Loading, error and not-found
What I did: loading.tsx and error.tsx on data routes, global-error.tsx, not-found.tsx and notFound() for unknown ids. Shared RouteError, DataSection, ErrorBoundary and MessageBox, so one failing section does not take the page down. Empty and no-match states.
What the reference does: the same files on every data route. One ErrorMessage built on the shadcn Empty component. Parallel routes (@reviews, @related) on the product page, each with its own loading and error.
What I will take, and why: nothing big. DataSection already isolates slow or broken sections the way the reference's parallel routes do.
UI kit and tokens
What I did: my own kit in src/components/ui built with cva variants (Button, Card, Chips, Modal, Section, Skeleton...), role tokens in @theme inline with light and dark values, dark mode, logical classes for RTL, and DESIGN.md.
What the reference does: shadcn components (base-nova style) kept close to how shadcn wrote them, Clay tokens in @theme inline, next-themes for dark mode, sonner for toasts. Clearing the cart asks for confirmation in an AlertDialog, because it can't be undone.
What I will take, and why: the confirmation before clearing the cart. My cart can hold custom blends that take time to build, so losing them by mistake is worse than in the reference. I built it with my existing Modal, not a new component.
Tooling
What I did: ESLint blocking any, as and !, Prettier, Husky with lint-staged, .gitattributes for line endings, scripts for lint, typecheck and format:check.
What the reference does: the same ESLint rules and hooks, plus next typegen before tsc in typecheck, prettier-plugin-tailwindcss to sort classes, and a .env.example.
What I will take, and why: .env.example, so anyone who clones the repo knows which variable to set and which test URLs exist. next typegen in typecheck, so route types are always fresh before TypeScript runs.
CLAUDE.md
What I did: rules for TypeScript, UI and tokens, RTL, state, testing (never edit a test to make it pass), plus a Spec Kit constitution built from these rules.
What the reference does: sections for Data, Routes, Server and client, State, Forms, UI and Naming, step-by-step "Adding a module", and "Rules from mistakes we fixed".
What I took, and why: a "Rules from mistakes we fixed" section. I fixed real bugs in this project (dashed borders on every side after the Tailwind migration, a Zustand never[] type, selectors that re-rendered the whole page, cart hydration), and writing them down stops the AI from making them again.
What I did better
Runtime checks on API data. The reference does const data: T = JSON.parse(text). JSON.parse returns any, so this is a hidden cast: the type is never checked, and it even assigns null to T. My client checks every response with a type guard.
A real external API. My API runs as a separate service on Render, closer to a real project than an API inside the same app.
SWR for client data, with caching and revalidation, on top of server-side fetching.
Arabic and RTL with logical classes. The reference lists this under "Ideas to build next".
No comments in code. Names and small functions explain the code. The reference explains itself with comments in almost every file.
Pure cart logic in its own file (cart.logic.ts), separate from the store. That made it easy to unit test. The reference keeps the logic inside the store.
A richer cart: weights, cardamom options and custom blends, each making its own line.
Smaller commits, one change each, instead of one commit per whole feature.
