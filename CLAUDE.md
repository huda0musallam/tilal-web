# CLAUDE.md

Guidance for AI coding assistants working on this repository. This is the only rules file. See
also `README.md` (how the project works) and `DESIGN.md` (visual identity).

## Project

Tilal (التلال) is a website for a home coffee roaster. Arabic only, right to left. Customers
browse products, save favorites, build custom blends, and send orders through WhatsApp. There
are no user accounts and no online payments.

This is a frontend course project. Data comes from a separate json-server API (`tilal-api`).

## Commands

```bash
npm run dev            # start the dev server on http://localhost:3000
npm run build          # production build
npm run lint           # ESLint, fails on any warning
npm run typecheck      # tsc --noEmit
npm run format         # Prettier, write
npm run format:check   # Prettier, check only
```

A Husky pre-commit hook runs lint-staged: ESLint with `--max-warnings=0` and Prettier on staged
files. Run `npm run typecheck`, `npm run lint` and `npm run format:check` before saying a change
is done, and `npm run build` after changing routes, data fetching or config.

## Stack

This is Next.js 16. Its APIs, conventions and file structure can differ from what you remember.
Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code.
`agentRules: false` in `next.config.ts` stops `next dev` from writing an `AGENTS.md`.

- Next.js 16, App Router, with `cacheComponents` enabled
- React 19, TypeScript (strict)
- SWR for server state (API data)
- Zustand for client state (cart, favorites, blend builder, fly animation)
- CSS Modules for the site's own components
- Tailwind CSS 4 and shadcn/ui only for shadcn components and the checkout feature
- react-hook-form and Zod for forms with more than a couple of fields
- Motion for animation: `import { motion } from "motion/react"`
- Lucide for icons: `lucide-react`
- Prettier: `printWidth` 100, double quotes, semicolons, trailing commas

## Writing code

- English everywhere in code, file names, commits and docs. Only the text users see is Arabic.
- No code comments. Make the code clear with names and small functions instead.
- Do not use `any`, `as` type assertions or `!` non-null assertions. ESLint blocks them. Use type
  guards (`src/shared/api/guards.ts`) and narrowing. `as const` is allowed.

## Structure

- `src/app/` contains routes only. Pages stay thin and compose features.
- `src/features/<name>/` owns everything for one feature: components, CSS modules, types, API
  fetcher, logic, options and store. Current features: `home`, `products`, `blend`, `brewing`,
  `cart`, `checkout`, `favorites`, `fly`, `reviews`, `suggestions`.
- `src/shared/` is only for code that two or more features use:
  - `api/client.ts`: base URL, `apiKeys`, `fetchJson`, `ApiError`, test modes
  - `api/guards.ts`: small type guards (`isRecord`, `isString`, `isOneOf`, `isListOf`)
  - `layout/`, `logo/`, `lib/` (`cn`, `formatPrice`, `Option`, WhatsApp link)
  - `ui/`: `Chips`, `DataSection`, `ErrorBoundary`, `SectionError`, `EmptyState`,
    `GridSkeleton`, `Reveal`, `RouteError`
  - `ui/shadcn/`: shadcn/ui components. Add more with `npx shadcn add <name>`.
- A type lives in the feature that owns it (`Product` in `products/product.types.ts`, `CartLine`
  in `cart/cart.types.ts`). There is no global `types` folder.
- File names: `Name.tsx` for a component, `x.types.ts`, `x.api.ts`, `x.logic.ts`, `x.store.ts`,
  `x.options.ts`, `x.guards.ts`, `x.schema.ts`, `use-x.ts` for a hook.

Before you create a file or folder, look at the tree and find where it belongs. Never make a
second copy of a folder in another place (for example `src/components/` next to `src/shared/`,
or a feature folder under `app/`). If something moves, move it with `git mv` and delete the old
place in the same commit.

## Components

- One component per file, with `interface NameProps` for its props.
- A component with styles has `Name.module.css` next to it.
- Add `"use client"` only when a component needs state, effects, event handlers, SWR, Zustand
  or Motion.
- Every list uses a real key from the data (`product.id`, `step` text, a fixed `id` field).
  Never the index.
- Split big interactive components so each piece subscribes only to the state it renders. A
  component that reads the whole store redraws on every change (this happened with the old
  `BlendBuilder`: one change redrew all nine parts).
- Reuse shared pieces instead of copying them: `Chips` for every choice group, `FavoriteButton`
  and `ProductPurchase` for the product card and the product page.
- Do not add `memo`, `useMemo` or `useCallback` without a measured reason.
- Do not use `useEffect` for something that can be worked out during render or done in an event
  handler. Default values come from the data directly (see `useShares(beans)`).
- Do not call React `setState` synchronously inside `useEffect`. Do not reassign outer variables
  inside callbacks such as `.map`; use a `for` loop.
- Do not use `<img>`. Use `next/image`, or a `div` with a background image for decorative copies.
- Hooks that read the URL (`usePathname`, `useSearchParams`) must sit under a `Suspense`
  boundary, because `cacheComponents` is on. See `ActiveNavLinks` in the header.

## State: which tool for what

| Kind                           | Tool                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------- |
| API data                       | SWR (`useSWR`, `useSWRMutation`)                                             |
| Shared client state            | Zustand store in the feature folder                                          |
| State used by one component    | `useState`, kept as close to where it is used as possible                    |
| Filters that belong in the URL | `useSearchParams`. The URL is the only source, never copy it into `useState` |
| Form fields                    | react-hook-form                                                              |

Keep each piece of information in one place. Copying the URL filter into `useState` made the
two disagree when the header heart link changed the URL. Anything that can be worked out from
other state (totals, counts, prices, filtered lists) is computed on render, not stored.

## Option lists

Roast, weight and cardamom options (values, labels, roast images and levels) live only in
`features/products/product.options.ts`. Grind options live in `features/blend/blend.options.ts`.
Product cards, filters, the blend builder, the home roast section, brewing guides and the type
guards all read from there. Lists that come from the data (bean origins) are built from the
data, not written again in code.

## Data fetching

- `apiKeys` in `src/shared/api/client.ts` holds every SWR key. The server fallback and the
  client `useSWR` must use the exact same key.
- Each feature has its own fetcher in `x.api.ts`, built on `fetchJson(url, guard)`. Components
  never call `fetch`.
- A page that needs data is a Server Component. It starts the request without `await` and passes
  the promise to `<SWRConfig value={{ fallback: { [key]: promise } }}>`. The client component
  reads it with `useSWR(key, fetcher, { suspense: true })`.
- Wrap every data section in `DataSection` (error boundary + Suspense) with its own placeholder,
  error message and `retry`. A slow or broken section must not block or break the rest of the
  page. `retry` must fill the cache first: `mutate(key, fetcher(key))`. The boundary only resets
  after that, because the fallback promise from the server is still rejected.
- Route-level `loading.tsx` and `error.tsx` are for pages where the whole page is the data (the
  product page, the blend page).
- Every list that can be empty shows `EmptyState` with a friendly Arabic message. A filter with
  no match is a different message from an empty shop.
- Fetched data that fails shows a friendly Arabic message, never a raw error.
- Test the states with `NEXT_PUBLIC_API_URL` ending in `/delay/3000`, `/fail/500` or `/empty`
  (see the README).

## Zustand

- Define actions outside the store (`export const cart = { add() {...} }`) using
  `useStore.setState` and `useStore.getState`. Components that only call actions do not
  subscribe and do not redraw.
- Read state with narrow selectors that return a primitive: `useCartCount()`,
  `useIsFavorite(id)`. The header must use `useCartCount()`, not the whole cart.
- Never return a new object or array from a selector. Use a module-level constant for empty
  defaults.
- Always annotate the state creator return type, for example `(): CartState => ({ ... })`.
  Without it, TypeScript infers `never[]` for an empty array and every push fails to type-check.
- Keep the logic pure and outside the store. `cart.logic.ts` has functions that take a cart and
  return a new one; `cart.store.ts` only holds state and calls them.
- The cart saves only `{ productId, weight, cardamom, qty }` or `{ blend, qty }`. Names, prices
  and images come from the API when shown, and lines for products that no longer exist are
  dropped.
- Never trust `localStorage`. Every persisted store uses `merge` with a guard: `parseLines` in
  the cart drops any line with a bad option or a quantity that is not a whole number of 1 or
  more, and the favorites store keeps only unique string ids.
- The cart and favorites stores use `persist` with `skipHydration: true`. `CartDrawer` calls
  `persist.rehydrate()` for both once on mount, to avoid a hydration mismatch.

## Fly animation

- Call `flyTo(target, image, element)` from `features/fly/fly.store.ts` after adding to the cart
  (`"cart"`) or to favorites (`"favorites"`).
- The header icons are found by `data-fly-target="cart"` and `data-fly-target="favorites"`.
  Keep these attributes if the header changes.
- With `prefers-reduced-motion`, `flyTo` skips the flight and only bumps the icon.

## Styling

- Mobile first. Write the phone styles with no media query, then add
  `@media (min-width: 640px)`, `768px` (header menu only), `900px` and `1024px`. Never use
  `max-width` media queries.
- Use the color tokens from `globals.css` (`--bg`, `--olive`, `--danger`, `--white`…). Do not
  write a hex color in a CSS module. See `DESIGN.md`.
- The site is RTL. Use logical properties: `inset-inline-start`, `margin-inline`,
  `padding-inline`. Use `left` and `right` only for physical positions.
- Arrows that mean "forward" point left (`ArrowLeft`); "back" points right (`ArrowRight`).
- `experimental.inlineCss` is on, so production pages inline their CSS. Without it the browser
  warns about preloaded CSS from prefetched routes that is not used.
- Tailwind is loaded without preflight, and only scans `src/shared/ui/shadcn` and
  `src/features/checkout` (`src/app/tailwind.css`). The site reset in `globals.css` is in
  `@layer base` so Tailwind utilities can win over it. Do not use Tailwind classes in CSS Module
  components, and do not add new Tailwind source folders without a reason.
- After adding a new folder to Tailwind's sources, restart `npm run dev`. The dev server does not
  pick up new source folders on its own.

## Content

- All UI text is Arabic, in a light Levantine dialect. See the writing section in `DESIGN.md`.
- Every image needs a descriptive Arabic `alt`.
- Images are WebP at about quality 80, lowercase with dashes, and only the ones the site uses.

## Accessibility

- Every form field has a visible `<label>` (`FieldLabel` in shadcn forms).
- Icon-only buttons and links need `aria-label`.
- Toggle buttons use `aria-pressed`.
- Forms validate on submit and show inline errors with `aria-invalid`.
- Animations must respect `prefers-reduced-motion`.

## API (tilal-api)

- Repo: https://github.com/huda0musallam/tilal-api
- Live: https://tilal-api.onrender.com (free tier, sleeps after inactivity, data written at
  runtime is lost on redeploy)
- Endpoints: `GET /products`, `GET /products/:id`, `GET /beans`, `GET /reviews`, `GET` and
  `POST /suggestions`
- json-server adds a `"$schema"` line to `db.json` when it writes. Remove it before committing.
- The API repo needs a `public/` folder or json-server crashes on start.
- `NEXT_PUBLIC_API_URL` overrides the API URL. If `.env.local` exists, it wins over the default
  in the code. A forgotten `.env.local` pointing at `localhost:3001` once made the site load
  nothing while the Render API was fine. When data does not load, check `.env.local` first.
- Image paths in `db.json` must match the files in `public/images` (`.webp`).

## Do not

- Commit `.env.local` or `node_modules`.
- Add a UI component library other than shadcn/ui, or use Tailwind outside the places above.
- Call `fetch` directly in components; go through a feature `x.api.ts`.
- Copy URL filters into `useState`.
- Store anything sensitive in `localStorage`, or use it for access control.
- Publish example reviews as real customer reviews.
- Write the same option list, color or type in two places.
