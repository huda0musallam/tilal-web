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
- Tailwind CSS 4 for all styling. `src/app/globals.css` is the only CSS file; there are no CSS
  Modules
- shadcn/ui (Radix) only for `RadioGroup` and `Field`
- react-hook-form and Zod for forms with more than a couple of fields
- Motion for animation: `import { motion } from "motion/react"`
- Lucide for icons: `lucide-react`
- Prettier: `printWidth` 100, double quotes, semicolons, trailing commas

## Writing code

- English everywhere in code, file names, commits and docs. Only the text users see is Arabic.
- No code comments. Make the code clear with names and small functions instead.
- Do not use `any`, `as` type assertions or `!` non-null assertions. ESLint blocks them. Use type
  guards (`src/lib/api/guards.ts`) and narrowing. `as const` is allowed.

## Structure

- `src/app/` contains routes only. Pages stay thin and compose features.
- `src/features/<name>/` owns everything for one feature: components, types, API fetcher,
  logic, options and store. Current features: `home`, `products`, `blend`, `brewing`,
  `cart`, `checkout`, `favorites`, `fly`, `reviews`, `suggestions`, `theme`.
  The WhatsApp link builder is `features/cart/whatsapp.ts`.
- `src/components/` is only for UI that two or more features use:
  - `layout/`, `logo/`
  - `ui/`: the UI kit (see below), plus `DataSection`, `ErrorBoundary`, `Reveal`
  - `ui/shadcn/`: `RadioGroup` and `Field`. Anything added with `npx shadcn add <name>` must be
    switched to our tokens, and must not repeat a control the kit already has.
- `src/lib/` is only for non-UI code that two or more features use:
  - `api/client.ts`: base URL, `apiKeys`, `fetchJson`, `ApiError`, test modes
  - `api/guards.ts`: small type guards (`isRecord`, `isString`, `isOneOf`, `isListOf`)
  - `cn.ts`, `format-price.ts`, `option.ts`
- A type lives in the feature that owns it (`Product` in `products/product.types.ts`, `CartLine`
  in `cart/cart.types.ts`). There is no global `types` folder.
- File names: `Name.tsx` for a component, `x.types.ts`, `x.api.ts`, `x.logic.ts`, `x.store.ts`,
  `x.options.ts`, `x.guards.ts`, `x.schema.ts`, `x.classes.ts` for class strings shared inside
  one feature, `use-x.ts` for a hook.

Before you create a file or folder, look at the tree and find where it belongs. Never make a
second copy of a folder in another place (for example `src/shared/` next to `src/lib/`,
or a feature folder under `app/`). If something moves, move it with `git mv` and delete the old
place in the same commit.

## Components

- One component per file, with `interface NameProps` for its props.
- Style components with Tailwind classes only. Never add a `.module.css` file.
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

## UI kit

Every control must use these components, never a copied class string.

| Component                          | Props and variants                                                                                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/Button`                        | `variant`: `primary`, `secondary`, `ghost`, `inverse`, `link`, `chip`, `chipSelected`, `option`, `optionSelected`; `size`: `sm`, `md`, `lg`, `icon`, `bare`, `chip`, `chipSm`, `option` |
| `ui/ButtonLink`                    | `next/link` props, with the same `variant` and `size` as `Button`                                                                                                                       |
| `ui/Input`, `ui/Textarea`          | Native props. `aria-invalid` shows the error border                                                                                                                                     |
| `ui/Label`                         | Native props. `labelStyles` is exported for labels that are not a `<label>`                                                                                                             |
| `ui/Card`                          | `tone`: `page`, `section`; `radius`: `panel`, `card`, `media`; `padding`: `none`, `md`; `bordered`; `lift`                                                                              |
| `ui/Badge`                         | `variant`: `soft`, `strong`, `inverse`, `count`, `plain`, `eyebrow`, `shade`; `size`: `sm`, `md`, `lg`                                                                                  |
| `ui/Modal`                         | `open`, `onClose`, and `aria-labelledby` or `aria-label`; `size`: `sm`, `md`, `lg`; `side`: `center`, `end`; `bodyClassName`                                                            |
| `ui/Chips`                         | `options`, `value`, `onChange`, `label`; `size`: `sm`, `md`                                                                                                                             |
| `ui/Section`                       | `tone`: `page`, `muted`                                                                                                                                                                 |
| `ui/SectionLabel`                  | `spacing`: `section`, `page`                                                                                                                                                            |
| `ui/Page`                          | The `<main>` and container of a page                                                                                                                                                    |
| `ui/PageHeader`                    | `label`, `title`, description as children; `width`: `full`, `narrow`; `spacing`: `md`, `lg`                                                                                             |
| `ui/ZoomImage`                     | `next/image` props; `zoom`: `sm`, `md`, `lg`. Zooms on hover of a `group` parent                                                                                                        |
| `ui/MoreHint`                      | `tone`: `primary`, `onPhoto`; `arrowSize`. The arrow moves on hover of a `group` parent                                                                                                 |
| `ui/Skeleton`                      | `variant`: `muted`, `strong`                                                                                                                                                            |
| `ui/GridSkeleton`                  | `count`                                                                                                                                                                                 |
| `ui/MessageBox`                    | `title`; `tone`: `empty`, `error`, `callout`                                                                                                                                            |
| `ui/EmptyState`                    | `title`, children. Built on `MessageBox`                                                                                                                                                |
| `ui/RouteError`, `ui/SectionError` | Error screens built on `MessageBox`                                                                                                                                                     |
| `ui/CardGrid`                      | `layout`: `fluid3`, `fluid4`, `wide3`, `wide2`, `full3`, `split`                                                                                                                        |
| `ui/Circle`                        | `tone`: `primary`, `inverse`, `surface`, `outline`; `size`: `xs`, `sm`, `md`, `lg`                                                                                                      |
| `ui/Donut`                         | The label as children; `size`: `md`, `lg`; `hole`: `muted`, `primary`                                                                                                                   |
| `ui/PhotoScrim`                    | `fade`: `short`, `long`                                                                                                                                                                 |
| `ui/BackLink`                      | `next/link` props; `tone`: `page`, `onPhoto`                                                                                                                                            |
| `ui/DashedRow`                     | `sides`: `top`, `block` (top and bottom). `dashedRowStyles` is exported                                                                                                                 |
| `ui/SideColumn`                    | The sticky side column of a two-column page                                                                                                                                             |
| `ui/shadcn/radio-group`            | `RadioGroup`, `RadioGroupItem`                                                                                                                                                          |
| `ui/shadcn/field`                  | `Field`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldLabel`, `FieldDescription`, `FieldError`                                                                                        |

`buttonStyles`, `cardStyles`, `badgeStyles`, `cardGridStyles`, `centeredStackStyles`, `fieldSurfaceStyles` and `textFieldStyles` are exported for elements that cannot be the component itself, such
as `motion.button`, a `Link` card or a `<figure>`.

A roast shown on its own uses `features/products/RoastBadge`, which reads its variant from the
`badge` field in `ROAST_OPTIONS`. A roast inside a sentence stays plain text.

Rules:

- **The UI is dumb.** Nothing in `components/ui` knows about the cart, products or roasts.
  Features map their data to visual variants, like `RoastBadge` does.
- **One source.** One file for each control. A look that is missing becomes a new variant, not a
  second component or a class string at the call site.
- **Small files.** One component per file, built with `cva`, `cn()` and typed props.
- **Tokens only.** Use the role tokens from `globals.css`:
  - Color: `surface`, `muted-surface`, `strong-surface`, `inverse-surface`, `field`, `ink`,
    `muted-ink`, `on-inverse`, `primary`, `primary-hover`, `primary-shade`, `primary-tint`,
    `on-primary`, `on-primary-muted`, `on-primary-soft`, `on-photo`, `on-photo-muted`,
    `text-on-dark`, `line`, `line-strong`, `accent`, `focus`, `danger`, `placeholder`, `scrim`,
    `logo`, `logo-accent`, `logo-detail`, `bean`, `bean-line`. Palette names such as `olive` or
    `coffee` are not for components.
  - Radius: `rounded-control` for controls, `rounded-panel`, `rounded-card`, `rounded-media` and
    `rounded-feature` for surfaces from small to large, `rounded-badge`, `rounded-toolbar`,
    `rounded-thumb`, `rounded-pill` for pills, `rounded-ellipse` for ovals. `rounded-full` is only
    for real circles.
  - No hex, no pixel values, no `[..]` values. Structural `[..]` selectors are allowed, such as
    `data-[state=checked]:` or `has-[>[data-slot=field]]:`.
- **`Modal` closing.** `onClose` must be safe to call more than once, for example
  `() => setOpen(false)`. It must also set `open` to false, or the state stays open after Esc.
- **Visible focus.** Every control uses the `focus-ring` utility. The global
  `:focus-visible` outline in `globals.css` is not in a layer, so it beats `outline-*` utilities.

Links styled as buttons use `ButtonLink`. Logos and `Bean` use `currentColor` and token classes,
so they follow dark mode.

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

Roast, weight and cardamom options (values, labels, roast images, levels and badges) live only in
`features/products/product.options.ts`. Grind options live in `features/blend/blend.options.ts`.
Product cards, filters, the blend builder, the home roast section, brewing guides and the type
guards all read from there. Lists that come from the data (bean origins) are built from the
data, not written again in code.

## Data fetching

- `apiKeys` in `src/lib/api/client.ts` holds every SWR key. The server fallback and the
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
- A component that only needs a count or one value must not subscribe to a whole list. On the
  products page, reading all favorite ids in ProductsExplorer re-rendered every card on each
  heart click.
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

- Tailwind is the styling for the whole site. `globals.css` holds only tokens, the site reset
  and the `@utility` rules below.
- Mobile first. Write the phone styles with no prefix, then add `sm:` (640px), `md:` (768px) and
  `lg:` (1024px). Use only these standard breakpoints: no custom breakpoints, `min-[..]:` or
  `max-*:` variants.
- Use the role and radius tokens listed under UI kit. Never write a hex color in a component.
  See `DESIGN.md`.
- Text size utilities do not set a line height here: the `--text-*--line-height` tokens are
  `inherit`, so text keeps the `1.8` of the body unless a `leading-*` class says otherwise.
- The site is RTL. When the two sides differ, use logical classes: `ms-*`, `me-*`, `ps-*`,
  `pe-*`, `start-*`, `end-*`. When both sides are equal, use `px-*`, `py-*`, `mx-*`, `my-*`. Use
  `left` and `right` only for physical positions.
- Five `@utility` rules in `globals.css` cover what the Tailwind scale cannot express. Add another
  only when no scale value or token can do the job:
  - `container`: centered, with the site's `--container` max width and `--gutter` padding.
    Tailwind's own `container` is not centered and steps through the breakpoint widths.
  - `focus-ring`: the focus-visible ring for every control. It is a set of variant classes with no
    look of its own, so a utility is the one place it can be defined once.
  - `grid-cols-fit`: `auto-fit` columns with a minimum width, for the bean options. `grid-cols-*`
    only takes a fixed column count, which would leave empty columns.
  - `paused`: `animation-play-state: paused`, for the reviews marquee on hover. Tailwind has no
    utility for it.
  - `object-hero`: `object-position: 72% center`, the phone crop of the hero photo. `object-*`
    only has named edges, and none of them keeps the cup in frame.
- Arrows that mean "forward" point left (`ArrowLeft`); "back" points right (`ArrowRight`).
- `experimental.inlineCss` is on, so production pages inline their CSS. Without it the browser
  warns about preloaded CSS from prefetched routes that is not used.
- Tailwind is loaded without preflight. The site reset in `globals.css` is in `@layer base` so
  Tailwind utilities can win over it.
- Dark mode is the `.dark` class on `<html>`. An inline script in the root layout's `<head>`
  (`themeScript` in `features/theme/theme.ts`) sets it before the first paint from the saved
  choice in `localStorage`, or from `prefers-color-scheme` on the first visit. `ThemeToggle` in the
  header saves the choice; until there is one, the site follows system changes.
- Only token values change between themes: light values in `:root`, dark values in `.dark`. Do
  not use `dark:` color classes in components; add or change a token instead.
- Text on an olive fill uses `on-primary`, `on-primary-muted` or `on-primary-soft`. Text on a
  photo uses `on-photo`, `on-photo-muted` or `text-on-dark`, which stay light in both themes
  because the photo scrims stay dark. Text must reach 4.5:1 in both themes.

## Content

- All UI text is Arabic, in a light Levantine dialect. See the writing section in `DESIGN.md`.
- Every image needs a descriptive Arabic `alt`.
- Images are WebP at about quality 80, lowercase with dashes, and only the ones the site uses.

## Accessibility

- Every form field has a visible label: `Label`, or `FieldLabel` inside a `Field`.
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
- Add a UI component library other than shadcn/ui, or a new `.module.css` file.
- Copy a control's class string instead of using the UI kit.
- Call `fetch` directly in components; go through a feature `x.api.ts`.
- Copy URL filters into `useState`.
- Store anything sensitive in `localStorage`, or use it for access control.
- Publish example reviews as real customer reviews.
- Write the same option list, color or type in two places.
