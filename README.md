# Tilal Coffee (التلال)

`tilal-web` is the website for Tilal, a home coffee roaster. Customers browse the coffee, open a
product page, build their own blend, read brewing guides and send their order through WhatsApp.
The interface is in Arabic and reads right to left.

## Links

- Frontend (this repository): https://github.com/huda0musallam/tilal-web
- API code: https://github.com/huda0musallam/tilal-api
- Live API: https://tilal-api.onrender.com (for example
  [`/products`](https://tilal-api.onrender.com/products))

This repository is the frontend only. Render deploys the API again every time `tilal-api` is
pushed to GitHub.

## Technologies

- Next.js 16 (App Router) with Cache Components
- React 19 and TypeScript (strict, no `any`, no `as`, no `!`)
- SWR for data from the API
- Zustand for client state (cart, favorites, blend builder and the fly animation)
- CSS Modules for the site's own styles
- Tailwind CSS 4 and shadcn/ui for the checkout form only (Tailwind runs without its base
  reset, so it does not change the rest of the site)
- react-hook-form and Zod for the checkout form
- Motion for animation, Lucide for icons
- ESLint and Prettier, with Husky and lint-staged to check staged files before each commit
- json-server on Render for the API

## Getting started

You need Node.js 20.9 or newer.

```bash
npm install            # install dependencies (also sets up the Husky hook)
npm run dev            # start the dev server on http://localhost:3000
npm run build          # build for production
npm start              # run the production build
npm run lint           # ESLint, fails on any warning
npm run typecheck      # type-check the whole project
npm run format         # format every file with Prettier
npm run format:check   # check formatting without changing files
```

Before each commit, lint-staged runs ESLint and Prettier on the staged files. The commit stops if
ESLint finds a warning or an error, so a line like `const unused: any = 1;` cannot be committed.

The site uses the live API at `https://tilal-api.onrender.com` by default. The free server sleeps
when nobody uses it, so the first request can take up to a minute.

To use a local API instead, run `tilal-api` on port 3001 and create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

`.env.local` wins over the default URL in the code. Delete it when you want the live API again.

## Testing loading, error and empty states

The API client in `src/shared/api/client.ts` reads test modes from the end of
`NEXT_PUBLIC_API_URL`. The server does not change: the client waits, throws or returns an empty
list before it calls the API. Put the mode in `.env.local` and restart `npm run dev`:

| `NEXT_PUBLIC_API_URL`                             | What happens                                  |
| ------------------------------------------------- | --------------------------------------------- |
| `https://tilal-api.onrender.com/delay/3000`       | Every request waits 3 seconds (loading state) |
| `https://tilal-api.onrender.com/fail/500`         | Every request fails with status 500 (errors)  |
| `https://tilal-api.onrender.com/empty`            | Every list comes back empty (empty states)    |
| `https://tilal-api.onrender.com/delay/2000/empty` | Modes can be combined                         |

Failed requests throw an `ApiError` that has the HTTP `status`. In `empty` mode a single product
returns 404, so the product page shows "not found". Delete `.env.local` (or the mode part of the
URL) to go back to normal.

What to expect:

- **delay:** each data section shows its own placeholder, and the rest of the page is already
  there.
- **fail:** each data section shows "we couldn't load…" with **Try again**. The header, hero,
  story and suggestion box keep working.
- **empty:** "there are no products in the shop right now", "no reviews yet" and "no beans for
  the blend right now".

## Features

- **Products:** six products, Brazilian and Colombian beans in three roast levels (light, medium,
  dark). They load from the API.
- **Product page:** `/products/[id]` loads one product by its id, with its options, price,
  favorite button and add to cart. An unknown id shows the 404 page.
- **Filters:** filter by roast level, by bean origin and by favorites. The origin filter is built
  from the products the API returns. The filter is kept in the URL, so `/products?roast=dark`
  opens with dark roast selected. The roast cards on the home page link to these filters.
- **Product options:** a weight (250 g, 500 g, 1 kg) and a cardamom option (none, normal,
  extra). The price changes with both. All option lists live in `product.options.ts`.
- **Build your blend:** pick the total weight, one or more beans and their share in steps of 10%,
  the roast, the grind and the cardamom. A ring chart and the price update as you choose. The
  shares must add up to 100% before the blend can go in the cart.
- **Brewing guides:** V60, Moka pot, Cold brew and Arabic coffee with cardamom. Each guide has
  tools, ingredients, numbered steps and a tip.
- **Cart:** a side drawer, opened from the bag icon in the header. Change quantities, remove a
  line or clear the cart. The same product with the same options adds to the quantity instead of
  a new line. **Continue the order** opens the checkout page.
- **Checkout:** `/checkout` asks for name, phone, pickup or delivery, the address (only for
  delivery) and notes. The form is checked with one Zod schema, shows the errors in Arabic under
  each field, then opens WhatsApp with the full order.
- **Favorites:** the heart button on each product. The heart in the header shows the count and
  opens the products page on the favorites filter.
- **Fly animation:** adding to the cart or to favorites sends a small copy of the bag image to
  the icon in the header, and the icon bounces. It is skipped when "reduce motion" is on.
- **Reviews:** an auto-scrolling strip that pauses on hover.
- **Suggestion box:** name (optional), message and a star rating. It checks the fields, then
  sends them to the API.
- **Persistence:** the cart and the favorites are saved in `localStorage` (`tilal-cart` and
  `tilal-favorites`). The cart saves only ids, options and quantities. Names, prices and images
  come from the API when the cart is shown. Blend choices stay while the site is open.

## Pages

| Route             | Page                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `/`               | Hero, story, roast levels, featured products, blend teaser, brewing guides, reviews, suggestion box |
| `/products`       | All products with roast, origin and favorites filters                                               |
| `/products?fav=1` | Only the saved favorites (opened by the heart in the header)                                        |
| `/products/[id]`  | One product, for example `/products/brazil-dark`                                                    |
| `/blend`          | Build your own blend                                                                                |
| `/checkout`       | The order form                                                                                      |
| `/brewing`        | All brewing methods                                                                                 |
| `/brewing/[slug]` | One brewing method: `v60`, `moka`, `cold-brew`, `arabic`                                            |
| any other         | "We lost the way between the hills" with links back to the site                                     |

The header, footer, cart drawer and fly layer are on every page.

## Data from the API

| Endpoint        | Method | Used by                                          |
| --------------- | ------ | ------------------------------------------------ |
| `/products`     | GET    | Featured products, products page, cart, checkout |
| `/products/:id` | GET    | Product page                                     |
| `/beans`        | GET    | Blend builder, cart, checkout                    |
| `/reviews`      | GET    | Reviews strip                                    |
| `/suggestions`  | POST   | Suggestion box                                   |

- The base URL, the SWR keys (`apiKeys`), `fetchJson` and `ApiError` are in
  `src/shared/api/client.ts`.
- Each feature has its own fetcher next to its types, for example
  `features/products/products.api.ts`. No component calls `fetch` directly.
- Every response is checked with a type guard before it is used. The small guards (`isRecord`,
  `isString`, `isListOf`…) are in `src/shared/api/guards.ts`. A response with the wrong shape
  shows the error message instead of breaking the page.
- The brewing guides are not in the API. They live in `src/features/brewing/brewing.ts` because
  they rarely change.

### Loading, errors and empty results

The page shell never waits for the API. Every part that needs data is wrapped on its own:

1. The page (a Server Component) starts the request without `await` and passes the promise to
   `<SWRConfig fallback>`. The browser gets the data with the page, so there is no second
   request.
2. A Client Component reads the same key with `useSWR(key, fetcher, { suspense: true })`.
3. `DataSection` (`src/shared/ui/DataSection.tsx`) wraps it in an `ErrorBoundary` and a
   `Suspense`. Suspense shows the placeholder while the data loads. The error boundary shows
   `SectionError` with **Try again** if the request fails.
4. **Try again** fetches the data again into the SWR cache, then resets the boundary.
5. When the list is empty, the component shows `EmptyState` instead of an empty grid.

| Where                      | Wrapped in                 | Loading             | Empty                                |
| -------------------------- | -------------------------- | ------------------- | ------------------------------------ |
| Home: featured products    | `DataSection`              | `GridSkeleton`      | "No products in the shop right now"  |
| Home: reviews              | `DataSection`              | `ReviewsSkeleton`   | "No reviews yet"                     |
| Products page: the list    | `DataSection`              | `CatalogSkeleton`   | "No products in the shop right now"  |
| Products page: the filters | (inside the list)          |                     | "No products match" / "No favorites" |
| Product page               | `loading.tsx`, `error.tsx` | placeholder         | 404 page                             |
| Blend page                 | `loading.tsx`, `error.tsx` | placeholder         | "No beans for the blend right now"   |
| Cart drawer and checkout   | `useCartItems`             | "Loading your cart" | "Your cart is empty"                 |

The home page and the products page use the same SWR key for products, so going from one to the
other opens from the cache.

## Structure

```
.claude/skills/   React skills for AI coding assistants (from Vercel)
.husky/           pre-commit hook that runs lint-staged
CLAUDE.md         rules for AI coding assistants
DESIGN.md         visual identity
components.json   shadcn/ui settings (components go to src/shared/ui/shadcn)
postcss.config.mjs  Tailwind
public/images/    WebP photos used by the site
src/
  app/            routes only: pages, loading.tsx, error.tsx, not-found.tsx, layout,
                  globals.css (site styles) and tailwind.css (Tailwind and the shadcn theme)
  features/       one folder per feature. Each owns its components, styles, types, API fetcher,
                  logic and store
    home/           Hero, Story, RoastLevels, BlendTeaser, Bean
    products/       product cards, list, filters, product page, options, pricing, types, API
    blend/          the blend builder steps, summary, store, logic, options, types, API
    brewing/        BrewingPreview and the brewing guide data
    cart/           CartDrawer, cart types, logic, guards, store and useCartItems
    checkout/       the checkout page, form, summary, Zod schema and WhatsApp message
    favorites/      the favorites store
    fly/            FlyLayer and the fly store
    reviews/        the reviews strip, its skeleton, Stars, types and API
    suggestions/    the suggestion box, types and API
  shared/         code used by two or more features
    api/            client.ts (URLs, SWR keys, fetchJson, ApiError, test modes) and guards.ts
    layout/         Header, NavLinks, ActiveNavLinks, Footer
    logo/           StampLogo, HeaderLogo
    lib/            cn, formatPrice, Option type, WhatsApp link
    ui/             Chips, DataSection, ErrorBoundary, SectionError, EmptyState, GridSkeleton,
                    Reveal, RouteError
      shadcn/         shadcn/ui components (button, input, label, textarea, radio-group, field)
```

File names:

- `Name.tsx` is one component, with `Name.module.css` next to it when it has styles. Each
  component has an `interface NameProps`.
- `x.types.ts` types, `x.api.ts` fetchers, `x.logic.ts` pure functions, `x.store.ts` Zustand,
  `x.options.ts` option lists, `x.guards.ts` type guards, `x.schema.ts` Zod, `use-x.ts` hooks.

## Component tree

Pages under `src/app/` are Server Components. Everything marked `client` is a file with
`"use client"`, and a component with no marker runs wherever its parent runs. Each component's
props are listed by name, with `?` for optional ones. A component that takes none lists none.
`store:` is what the component reads from a Zustand store, `SWR:` is the data it reads from SWR,
`URL:` is what it reads from the search params.

```
RootLayout                                (server) children   fonts, lang="ar", dir="rtl"
├── Header                                client   state: scrolled, menuOpen
│   │                                              store: cart count, favorites count, fly bumps
│   ├── HeaderLogo                        className?
│   └── Suspense
│       ├── ActiveNavLinks                client   onNavigate   URL: pathname
│       │   └── NavLinks                  activePath, onNavigate
│       └── NavLinks                      activePath, onNavigate   (the Suspense fallback)
├── {children}                            the page for the current route:
│   ├── Home                              (server) SWRConfig fallback: products, reviews
│   │   ├── Hero                          client
│   │   ├── Story                         client
│   │   │   └── StampLogo                 className?, ink?
│   │   ├── RoastLevels                   client
│   │   ├── FeaturedProducts              client
│   │   │   └── DataSection               client   loading, errorMessage, retry, children
│   │   │       ├── GridSkeleton          count?   (the loading prop)
│   │   │       └── FeaturedList          client   SWR: products
│   │   │           ├── EmptyState        title, children?
│   │   │           └── ProductCard       client   product, index?, eager?
│   │   ├── BlendTeaser                   client
│   │   │   └── Bean                      size
│   │   ├── BrewingPreview                client
│   │   ├── Reviews                       client
│   │   │   └── DataSection               client   loading, errorMessage, retry, children
│   │   │       ├── ReviewsSkeleton       (the loading prop)
│   │   │       └── ReviewsMarquee        client   SWR: reviews
│   │   │           ├── EmptyState        title, children?
│   │   │           └── Stars             rating
│   │   └── SuggestionBox                 client   state: name, message, rating, hovered, errors, sent
│   │                                              SWR mutation: suggestions
│   ├── ProductsPage                      (server) SWRConfig fallback: products
│   │   └── ProductsCatalog               client
│   │       └── DataSection               client   loading, errorMessage, retry, children
│   │           ├── CatalogSkeleton       (the loading prop)
│   │           │   └── GridSkeleton      count?
│   │           └── ProductsExplorer      client   SWR: products   URL: roast, origin, fav
│   │               │                              store: favorite ids (only when the favorites filter is on)
│   │               ├── Chips             options, value, onChange, label, size?
│   │               ├── FavoritesFilterChip  client   active, onToggle   store: favorites count
│   │               ├── EmptyState        title, children?
│   │               └── ProductCard       client   product, index?, eager?
│   │                   ├── FavoriteButton   client   product, sourceRef   store: is favorite
│   │                   └── ProductPurchase  client   product, sourceRef   state: weight, cardamom, added
│   │                       └── Chips     options, value, onChange, label, size?
│   ├── ProductPage                       (server) params   SWRConfig fallback: product
│   │   └── ProductDetails                client   id   SWR: product
│   │       ├── FavoriteButton            client   product, sourceRef   store: is favorite
│   │       └── ProductPurchase           client   product, sourceRef   state: weight, cardamom, added
│   │           └── Chips                 options, value, onChange, label, size?
│   ├── BlendPage                         (server) SWRConfig fallback: beans
│   │   └── BlendBuilder                  client   SWR: beans
│   │       ├── EmptyState                title, children?
│   │       ├── TotalStep                 client   store: total
│   │       ├── BeansStep                 client   beans   store: shares, total
│   │       ├── RoastStep                 client   store: roast
│   │       ├── GrindStep                 client   store: grind
│   │       ├── CardamomStep              client   store: cardamom
│   │       ├── Step                      n, title, hint?, children   (rendered by each step above)
│   │       ├── Chips                     options, value, onChange, label, size?   (every step but BeansStep)
│   │       └── BlendSummary              client   beans   store: total, shares, roast, grind, cardamom
│   │                                              state: added
│   ├── CheckoutPage                      (server)
│   │   └── Checkout                      client   useCartItems()
│   │       ├── EmptyState                title, children?
│   │       ├── Button                    className?, variant?, size?, asChild?
│   │       ├── CheckoutForm              client   items, total   react-hook-form + Zod, state: sentLink
│   │       │                                      renders the shadcn/ui fields listed below
│   │       └── OrderSummary              items, total
│   ├── BrewingPage                       (server)
│   │   └── Reveal                        client   children, delay?, as?, className?
│   ├── MethodPage                        (server) params
│   │   └── Reveal                        client   children, delay?, as?, className?
│   └── NotFound                          (server)
│       └── StampLogo                     className?, ink?
├── Footer                                (server)
│   └── StampLogo                         className?, ink?
├── CartDrawer                            client   store: isOpen, count   useCartItems()
└── FlyLayer                              client   store: flights

Inside every DataSection:
DataSection                               client   loading, errorMessage, retry, children
└── ErrorBoundary                         client   fallback, children   state: hasError
    ├── SectionError                      client   message, onRetry   state: busy, failedAgain
    └── Suspense                          shows the loading prop, then children

Route files that Next.js renders in place of a page:
├── Loading                               (server) in blend, brewing/[slug], products/[id]
├── Error                                 client   error, unstable_retry   app/error.tsx
│   └── RouteError                        client   error, retry
├── ProductsError                         client   error, unstable_retry   products/error.tsx
│   └── RouteError                        client   error, retry
├── ProductError                          client   error, unstable_retry   products/[id]/error.tsx
│   └── RouteError                        client   error, retry
└── BlendError                            client   error, unstable_retry   blend/error.tsx
    └── RouteError                        client   error, retry

shadcn/ui in src/shared/ui/shadcn (each also takes the native props of its element):
├── Button                                className?, variant?, size?, asChild?
├── Input                                 className?, type?
├── Textarea                              className?
├── Label                                 client   className?
├── RadioGroup                            client   className?
├── RadioGroupItem                        client   className?
├── Field                                 client   className?, orientation?
├── FieldSet                              client   className?
├── FieldLegend                           client   className?, variant?
├── FieldGroup                            client   className?
├── FieldLabel                            client   className?   renders Label
├── FieldDescription                      client   className?
└── FieldError                            client   className?, children?, errors?
```

### Who owns each piece of state

| State                                                    | Owner                                 | Used by                                                                                                                                                                                                 |
| -------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cart `lines` (ids, options, qty)                         | `cart.store.ts` (Zustand, saved)      | `useCartItems` (drawer, checkout), the count in `Header`                                                                                                                                                |
| Cart `isOpen`                                            | `cart.store.ts` (Zustand, not saved)  | `CartDrawer`, opened by the bag icon in `Header`                                                                                                                                                        |
| Favorite `ids`                                           | `favorites.store.ts` (Zustand, saved) | `FavoriteButton` in `ProductCard` reads whether its own product is a favorite, `ProductsExplorer` reads the ids only when the favorites filter is on, `FavoritesFilterChip` and `Header` read the count |
| Blend `total`, `shares`, `roast`, `grind`, `cardamom`    | `blend.store.ts` (Zustand)            | Each blend step reads its own value, `BlendSummary` reads all                                                                                                                                           |
| Fly `flights` and `bump`                                 | `fly.store.ts` (Zustand)              | `FlyLayer` draws the flights, `Header` bounces the icons                                                                                                                                                |
| Products, one product, beans, reviews                    | SWR keys from `apiKeys`               | The components in the tree above                                                                                                                                                                        |
| Suggestion sending and error                             | `useSWRMutation` in `SuggestionBox`   | The send button and the error message                                                                                                                                                                   |
| `roast`, `origin`, `fav` filter                          | The URL search params                 | `ProductsExplorer` reads them with `useSearchParams`                                                                                                                                                    |
| `weight`, `cardamom`, `added`                            | `ProductPurchase`                     | That card or product page only                                                                                                                                                                          |
| Checkout fields and errors                               | react-hook-form in `CheckoutForm`     | The form                                                                                                                                                                                                |
| `name`, `message`, `rating`, `hovered`, `errors`, `sent` | `SuggestionBox`                       | The form and the thank-you message                                                                                                                                                                      |
| `scrolled`, `menuOpen`                                   | `Header`                              | The smaller header on scroll, and the mobile menu                                                                                                                                                       |

These are not state. They are worked out on every render from the state above: the cart items
with names and prices (`resolveLines`), the cart count and total, the favorites count, the
product price, the blend price, the share sum, the origin filter list and the filtered products.

The filter is not copied into `useState`. The URL is the only place it lives, so the heart link
in the header can change it even when the products page is already open.

### How changes happen

There are no callback chains. Components call store actions directly, and only the components
that read the changed value redraw. Cart actions call pure functions from `cart.logic.ts`
(`addLine`, `setQty`, `removeLine`), which take a cart and return a new one.

| User action                                    | What runs                                                      | What changes                                                       |
| ---------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| Picks a weight or cardamom option              | `setWeight` / `setCardamom` in `ProductPurchase`               | That product's state and price                                     |
| Adds a product to the cart                     | `cart.add({ productId, weight, cardamom, qty })`, `flyTo()`    | `lines`, a flight, then the cart bump                              |
| Clicks the heart on a product                  | `favorites.toggle()`, then `flyTo("favorites", ...)` if added  | `favorites ids`, a flight, then the heart bump                     |
| Picks a roast, origin or favorites filter      | `updateUrl()` in `ProductsExplorer`                            | The URL                                                            |
| Picks a blend weight, roast, grind or cardamom | `blend.setTotal`, `setRoast`, `setGrind`, `setCardamom`        | `blendStore`                                                       |
| Picks or removes a bean, moves a slider        | `blend.toggleBean()`, `blend.setShare()`, `blend.distribute()` | `blendStore.shares`                                                |
| Adds the blend to the cart                     | `cart.add({ blend, qty })`, `flyTo()` from `BlendSummary`      | `lines`, a flight, then the cart bump                              |
| Changes a quantity, removes or clears          | `cart.setQty()` / `cart.remove()` / `cart.clear()`             | `lines`                                                            |
| Opens or closes the cart                       | `cart.open()` / `cart.close()`, Esc, backdrop                  | `isOpen`                                                           |
| The products or beans arrive                   | SWR `onSuccess` in `useCartItems`                              | Cart lines and favorites whose product or bean is gone are removed |
| Sends the order                                | `handleSubmit` checks the Zod schema, then opens `wa.me`       | Nothing in the site                                                |
| Sends a suggestion                             | `trigger()` from `useSWRMutation`                              | POST `/suggestions`, then `sent`                                   |
| Clicks Try again in a section                  | `mutate(key, fetcher(key))`, then the boundary resets          | That section only                                                  |
| Clicks Try again on a route                    | `unstable_retry()` in `error.tsx`                              | The page fetches again                                             |

### Saved cart data

The cart is saved in `localStorage` as `tilal-cart`:

```json
{ "lines": [{ "productId": "brazil-dark", "weight": "500", "cardamom": "extra", "qty": 2 }] }
```

When the site loads it, `parseLines` in `cart.guards.ts` checks every line. A line with an
unknown weight or option, or a quantity that is not a whole number of 1 or more, is dropped. Data
that is not valid JSON gives an empty cart. Favorites (`tilal-favorites`) go through the same
kind of check: only unique string ids are kept.

## Deployment

The site is not deployed yet. It can run on Vercel with no extra settings. Set
`NEXT_PUBLIC_API_URL` only to use a different API.

The API runs on Render as a web service with the start command
`npx json-server db.json --host 0.0.0.0 --port $PORT`. On the free plan, data written at runtime
(new suggestions) is lost when the service restarts or redeploys.
