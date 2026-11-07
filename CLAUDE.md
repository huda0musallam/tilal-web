# CLAUDE.md

Guidance for AI coding assistants working on this repository. See also `README.md` (how the
project works), `DESIGN.md` (visual identity) and `AGENTS.md` (Next.js notes).

## Project

Tilal (التلال) is a website for a home coffee roaster. Arabic only, right to left. Customers
browse products, save favorites, build custom blends, and send orders through WhatsApp. There
are no user accounts and no online payments.

This is a frontend course project. Data comes from a separate json-server API.

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
files. Run `npm run typecheck` and `npm run lint` before saying a change is done.

## Stack

- Next.js 16, App Router, with `cacheComponents` enabled
- React 19, TypeScript (strict)
- SWR for server state (API data)
- Zustand for client state (cart, favorites, blend builder, fly animation)
- CSS Modules only. No Tailwind, no CSS-in-JS, no UI component library.
- Motion for animation: `import { motion } from "motion/react"`
- Lucide for icons: `lucide-react`
- Prettier: `printWidth` 100, double quotes, semicolons, trailing commas

## Structure

- `src/app/` contains routes only. Pages stay thin and compose features.
- `src/features/<name>/` holds everything for one feature: components, their CSS modules, stores
  and logic. Current features: `home`, `products`, `blend`, `brewing`, `cart`, `favorites`,
  `fly`, `reviews`, `suggestions`.
- `src/components/` holds shared pieces: `layout/` (Header, Footer), `logo/`, `ui/` (Reveal,
  RouteError, GridSkeleton).
- `src/lib/api.ts` is the only file that defines API URLs, SWR keys and fetchers.
- `src/lib/whatsapp.ts` holds the WhatsApp number and builds the order message.
- `src/types/index.ts` holds shared types.

When adding something new, put it in the feature it belongs to. Only move it to `components/` if
two or more features use it.

## State: which tool for what

| Kind                           | Tool                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------- |
| API data                       | SWR (`useSWR`, `useSWRMutation`)                                             |
| Shared client state            | Zustand store in the feature folder                                          |
| State used by one component    | `useState`, kept as close to where it is used as possible                    |
| Filters that belong in the URL | `useSearchParams`. The URL is the only source, never copy it into `useState` |

Do not keep the same information in two places.

## Data fetching rules

- SWR keys live in `apiKeys` in `src/lib/api.ts`. The server fallback and the client `useSWR`
  must use the exact same key.
- Route pages that need data (`/products`, `/blend`):
  - The page is a Server Component. It starts the request without `await` and passes the
    promise to `<SWRConfig value={{ fallback: { [key]: promise } }}>`.
  - The client component reads it with `useSWR(key, fetcher<T>, { suspense: true })`.
  - The route has a `loading.tsx` (placeholder) and an `error.tsx` (client component, uses
    `RouteError` and `unstable_retry`).
- Home page sections fetch on the client with `useSWR` (no suspense) and handle their own
  loading and error state, so one failing section does not take down the whole page. Use `!data`
  for the loading check so the server and the browser render the same thing.
- Mutations use `useSWRMutation` with a fetcher shaped `(url, { arg })`.
- Anything reading `params` or `searchParams` must sit under a Suspense boundary (a
  `loading.tsx` counts), because `cacheComponents` is on.
- Fetched data that fails shows a friendly Arabic message, never a raw error.

## Zustand rules

- Define actions outside the store (`export const cart = { add() {...} }`) using
  `useStore.setState` and `useStore.getState`. Components that only call actions do not
  subscribe and do not re-render.
- Read state with narrow selectors: `useBlendStore((s) => s.grind)`. Prefer selectors that
  return a primitive (`useIsFavorite(id)`, `useFavoritesCount()`).
- Never return a new object or array from a selector. Use a module-level constant for empty
  defaults (see `EMPTY` in `blend-store.ts`).
- Annotate the state creator return type, for example `(): CartState => ({ ... })`. Without it,
  TypeScript infers `never[]` for empty arrays.
- The cart and favorites stores use `persist` with `skipHydration: true`. `CartDrawer` calls
  `persist.rehydrate()` for both once on mount, to avoid a hydration mismatch.
- `cart.add()` does not open the drawer. The fly animation shows that the item was added.

## Fly animation

- Call `flyTo(target, image, element)` from `features/fly/fly-store.ts` after adding to the cart
  (`"cart"`) or to favorites (`"favorites"`).
- The header icons are found by `data-fly-target="cart"` and `data-fly-target="favorites"`.
  Keep these attributes if the header changes.
- `FlyLayer` is rendered once in `layout.tsx`. When a flight lands, `flyStore.bump` increases
  and the header icon bounces.
- With `prefers-reduced-motion`, `flyTo` skips the flight and only bumps the icon.

## Components

- Add `"use client"` only when a component needs state, effects, event handlers, SWR, Zustand
  or Motion.
- Every component has a sibling `Name.module.css`.
- Split large interactive components so each piece subscribes only to the state it renders (see
  `BlendBuilder`).
- Do not add `memo`, `useMemo` or `useCallback` without a measured reason. Check re-renders with
  React DevTools first.
- Do not call React `setState` synchronously inside `useEffect`. Do not reassign outer variables
  inside callbacks such as `.map`; use a `for` loop.
- Do not use `<img>`. Use `next/image`, or a `div` with a background image for decorative copies
  (ESLint blocks `<img>` and the commit hook fails on warnings).

## Styling

- Use the color tokens from `globals.css` (`--bg`, `--olive`, `--coffee`, and the rest). See
  `DESIGN.md`.
- The site is RTL. Use logical properties: `inset-inline-start`, `margin-inline`,
  `padding-inline`. Use `left` and `right` only for physical positions (an image focal point,
  coordinates from `getBoundingClientRect`).
- Arrows that mean "forward" point left (`ArrowLeft`); "back" points right (`ArrowRight`).
- Breakpoints: `1024px`, `900px`, `768px` (header), `640px`.

## Content

- All UI text is Arabic, in a light Levantine dialect. See the writing section in `DESIGN.md`.
- Every image needs a descriptive Arabic `alt`.
- Image file names are lowercase with dashes.

## Accessibility

- Icon-only buttons and links need `aria-label`.
- Toggle buttons use `aria-pressed`.
- Forms validate on submit and show inline errors with `aria-invalid`.
- Animations must respect `prefers-reduced-motion` (handled globally in `globals.css`, and in
  `flyTo`).

## API (tilal-api)

- Repo: https://github.com/huda0musallam/tilal-api
- Live: https://tilal-api.onrender.com (free tier, sleeps after inactivity, data written at
  runtime is lost on redeploy)
- Endpoints: `GET /products`, `GET /beans`, `GET /reviews`, `GET` and `POST /suggestions`
- json-server adds a `"$schema"` line to `db.json` when it writes. Remove it before committing.
- The API repo needs a `public/` folder or json-server crashes on start.
- `NEXT_PUBLIC_API_URL` overrides the API URL (for a local json-server on port 3001). If
  `.env.local` exists, it wins over the default in the code.

## Do not

- Commit `.env.local` or `node_modules`.
- Add Tailwind or a UI component library.
- Call `fetch` directly in components; go through `src/lib/api.ts`.
- Copy URL filters into `useState`.
- Store anything sensitive in `localStorage`, or use it for access control.
- Publish example reviews as real customer reviews.
