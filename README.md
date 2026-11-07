# Tilal Coffee (التلال)

`tilal-web` is the website for Tilal, a home coffee roaster. Customers browse the coffee, build
their own blend, read brewing guides and send their order through WhatsApp. The interface is in
Arabic and reads right to left.

The data comes from a separate API. Its code is in
[`tilal-api`](https://github.com/huda0musallam/tilal-api), and it runs on Render at
`https://tilal-api.onrender.com`. Render deploys the API again every time `tilal-api` is pushed
to GitHub. This repository is the frontend only.

## Technologies

- Next.js 16 (App Router) with Cache Components
- React 19 and TypeScript (strict)
- SWR for data from the API
- Zustand for client state (cart, favorites, blend builder and the fly animation)
- CSS Modules for styling, with no UI library
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
ESLint finds a warning or an error.

The site uses the live API at `https://tilal-api.onrender.com` by default. The free server sleeps
when nobody uses it, so the first request can take up to a minute.

To use a local API instead, run `tilal-api` on port 3001 and create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Features

- **Products:** six products, Brazilian and Colombian beans in three roast levels (light, medium,
  dark). They load from the API.
- **Filters:** filter by roast level, by bean origin and by favorites. The filter is kept in the
  URL, so `/products?roast=dark` opens with dark roast selected. The roast cards on the home page
  link to these filters.
- **Product options:** each card has a weight (250 g, 500 g, 1 kg) and a cardamom option (none,
  normal, extra). The price changes with both.
- **Build your blend:** pick the total weight, one or more beans and their share in steps of 10%,
  the roast, the grind and the cardamom. A ring chart and the price update as you choose. The
  shares must add up to 100% before the blend can go in the cart.
- **Brewing guides:** V60, Moka pot, Cold brew and Arabic coffee with cardamom. Each guide has
  tools, ingredients, numbered steps and a tip.
- **Cart:** a side drawer, opened from the bag icon in the header. Add products or blends,
  change quantities, remove a line or clear the cart. The same product with the same options
  adds to the quantity instead of a new line.
- **Favorites:** the heart button on each product card. The heart in the header shows the count
  and opens the products page on the favorites filter.
- **Fly animation:** adding to the cart or to favorites sends a small copy of the bag image to
  the icon in the header, and the icon bounces. It is skipped when "reduce motion" is on.
- **Order:** "Send the order through WhatsApp" opens WhatsApp with a message that lists every
  line, the total, and the optional name and notes.
- **Reviews:** an auto-scrolling strip that starts full and pauses on hover.
- **Suggestion box:** name (optional), message and a star rating. It checks the fields, then
  sends them to the API.
- **Persistence:** the cart and the favorites are saved in `localStorage` (`tilal-cart` and
  `tilal-favorites`), so they survive a page refresh. Blend choices stay while the site is open.

## Pages

| Route             | Page                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `/`               | Hero, story, roast levels, featured products, blend teaser, brewing guides, reviews, suggestion box |
| `/products`       | All products with roast, origin and favorites filters                                               |
| `/products?fav=1` | Only the saved favorites (opened by the heart in the header)                                        |
| `/blend`          | Build your own blend                                                                                |
| `/brewing`        | All brewing methods                                                                                 |
| `/brewing/[slug]` | One brewing method: `v60`, `moka`, `cold-brew`, `arabic`                                            |
| any other         | "We lost the way between the hills" with links back to the site                                     |

The header, footer, cart drawer and fly layer are on every page.

## Data from the API

| Endpoint       | Method | Used by                          |
| -------------- | ------ | -------------------------------- |
| `/products`    | GET    | Featured products, products page |
| `/beans`       | GET    | Blend builder                    |
| `/reviews`     | GET    | Reviews strip                    |
| `/suggestions` | POST   | Suggestion box                   |

All URLs, SWR keys and fetchers are in `src/lib/api.ts`. No component calls `fetch` directly.
The brewing guides are not in the API. They live in `src/features/brewing/brewing.ts` because
they rarely change.
Every response is checked with a type guard from `src/lib/guards.ts` before it is used. There is
no `any`, no `as` and no `!` in the code. A response with the wrong shape shows the error message
instead of breaking the page.

### Products page and blend page

1. The page is a Server Component. It starts the request without `await` and passes the promise
   to `<SWRConfig fallback>`.
2. The Client Component reads the same key with `useSWR(key, fetcher, { suspense: true })`.
3. While the data loads, the route's `loading.tsx` shows placeholder cards.
4. If the request fails, the route's `error.tsx` shows the error and **Try again**
   (`unstable_retry`).
5. After the page loads, SWR keeps the data in its cache and checks for newer data in the
   background.

### Home page

Each section that needs data fetches it with `useSWR` in the browser and shows its own state, so
the hero and the story still show if the API is down.

The products area shows exactly one of these views:

- **Loading:** placeholder cards.
- **Error:** "We couldn't load the products right now" with **Try again** (`mutate()`).
- **Products:** the featured products and a link to all products.

The reviews strip shows nothing while it loads, if the request fails, or if there are no reviews.

The home page and the products page use the same SWR key for products, so going from one to the
other opens from the cache.

### Products list

The products page shows exactly one of these views:

- **Loading:** `loading.tsx`.
- **Error:** `error.tsx` with **Try again**.
- **No favorites:** "There are no favorites yet" when the favorites filter is on and nothing is
  saved, with **Clear filters**.
- **No results:** "No products match this choice" with **Clear filters**.
- **Products:** the matching products and their count.

## Component tree

Pages under `src/app/` are Server Components. Everything marked `client` runs in the browser.
`store:` is what the component reads from a Zustand store, `SWR:` is the data it reads from SWR,
`URL:` is what it reads from the search params.

```
RootLayout                  (server) fonts, lang="ar", dir="rtl"
├── Header                  client   state: scrolled, menuOpen
│   │                                store: cart count, favorites count, fly bumps
│   └── HeaderLogo          className?
├── {children}              the page for the current route:
│   ├── HomePage            (server, no props)
│   │   ├── Hero            client   (no props)
│   │   ├── Story           client   (no props)
│   │   │   └── StampLogo   className?, ink?
│   │   ├── RoastLevels     client   (no props)
│   │   ├── FeaturedProducts client  (no props)   SWR: products
│   │   │   ├── GridSkeleton    count?
│   │   │   └── ProductCard     product, index?   state: weight, cardamom, added
│   │   │                                         store: is favorite
│   │   ├── BlendTeaser     client   (no props)
│   │   ├── BrewingPreview  client   (no props)
│   │   ├── Reviews         client   (no props)   SWR: reviews
│   │   └── SuggestionBox   client   (no props)   state: name, message, rating, hovered, errors, sent
│   │                                             SWR mutation: suggestions
│   ├── ProductsPage        (server) SWRConfig fallback: products
│   │   └── ProductsExplorer client  (no props)   SWR: products   URL: roast, origin, fav
│   │       │                                     store: favorite ids
│   │       └── ProductCard     product, index?   state: weight, cardamom, added
│   │                                             store: is favorite
│   ├── BlendPage           (server) SWRConfig fallback: beans
│   │   └── BlendBuilder    client   (no props)   SWR: beans
│   │       ├── TotalStep       store: total
│   │       ├── BeansStep       beans             store: shares, total
│   │       ├── RoastStep       store: roast
│   │       ├── GrindStep       store: grind
│   │       ├── CardamomStep    store: cardamom
│   │       └── Summary         beans             store: total, shares, roast, grind, cardamom
│   │                                             state: added
│   │       (each step uses Step: n, title, hint?, children
│   │        and Chips: options, value, onChange, label)
│   ├── BrewingPage         (server, no props)
│   │   └── Reveal          children, delay?, as?, className?
│   ├── MethodPage          (server) params
│   │   └── Reveal          children, delay?, as?, className?
│   └── NotFound            (server, no props)
│       └── StampLogo       className?
├── Footer                  (server, no props)
│   └── StampLogo           className?, ink?
├── CartDrawer              client   state: name, notes   store: items, isOpen
└── FlyLayer                client   (no props)   store: flights

Route files:
├── loading.tsx             products, blend, brewing/[slug]   uses GridSkeleton or a placeholder
└── error.tsx               root, products, blend             client, uses RouteError: error, retry
```

### Who owns each piece of state

| State                                                    | Owner                               | Used by                                                                           |
| -------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| Cart `items`                                             | `cartStore` (Zustand, saved)        | `CartDrawer`, and as the count in `Header`                                        |
| Cart `isOpen`                                            | `cartStore` (Zustand, not saved)    | `CartDrawer`, opened by the bag icon in `Header`                                  |
| Favorite `ids`                                           | `favoritesStore` (Zustand, saved)   | `ProductCard` (is this one a favorite), `ProductsExplorer`, the count in `Header` |
| Blend `total`, `shares`, `roast`, `grind`, `cardamom`    | `blendStore` (Zustand)              | Each blend step reads its own value, `Summary` reads all                          |
| Fly `flights`                                            | `flyStore` (Zustand)                | `FlyLayer` draws each flying image                                                |
| Fly `bump`                                               | `flyStore` (Zustand)                | `Header` makes the cart or heart icon bounce                                      |
| Products                                                 | SWR key `/products`                 | `FeaturedProducts`, `ProductsExplorer`                                            |
| Beans                                                    | SWR key `/beans`                    | `BlendBuilder` → `BeansStep`, `Summary`                                           |
| Reviews                                                  | SWR key `/reviews`                  | `Reviews`                                                                         |
| Suggestion sending and error                             | `useSWRMutation` in `SuggestionBox` | The send button and the error message                                             |
| `roast`, `origin`, `fav` filter                          | The URL search params               | `ProductsExplorer` reads them with `useSearchParams`                              |
| `weight`, `cardamom`, `added`                            | `ProductCard`                       | That card only                                                                    |
| `name`, `message`, `rating`, `hovered`, `errors`, `sent` | `SuggestionBox`                     | The form and the thank-you message                                                |
| `name`, `notes`                                          | `CartDrawer`                        | The WhatsApp order message                                                        |
| `scrolled`, `menuOpen`                                   | `Header`                            | The smaller header on scroll, and the mobile menu                                 |
| `added`                                                  | `Summary`                           | The "Your blend was added" label                                                  |

The cart count and total, the favorites count, the product price, the blend price, the share sum
and the filtered product list are not state. They are worked out on every render.

The filter is not copied into `useState`. The URL is the only place it lives, so the heart link
in the header can change it even when the products page is already open.

### How changes happen

There are no callback chains. Components call store actions directly, and only the components
that read the changed value redraw.

| User action                                    | What runs                                                     | What changes                                        |
| ---------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------- |
| Picks a weight or cardamom option              | `setWeight` / `setCardamom` in `ProductCard`                  | That card's state and price                         |
| Adds a product to the cart                     | `cart.add()`, then `flyTo("cart", ...)`                       | `cartStore.items`, a flight, then the cart bump     |
| Clicks the heart on a card                     | `favorites.toggle()`, then `flyTo("favorites", ...)` if added | `favoritesStore.ids`, a flight, then the heart bump |
| Clicks the heart in the header                 | A link to `/products?fav=1`                                   | The URL                                             |
| Picks a roast, origin or favorites filter      | `updateUrl()` in `ProductsExplorer`                           | The URL                                             |
| Clicks Clear filters                           | `resetFilters()`                                              | The URL                                             |
| Picks a blend weight, roast, grind or cardamom | `blend.setTotal`, `setRoast`, `setGrind`, `setCardamom`       | `blendStore`                                        |
| Picks or removes a bean                        | `blend.toggleBean()`                                          | `blendStore.shares`, split evenly                   |
| Moves a share slider                           | `blend.setShare()`                                            | `blendStore.shares`                                 |
| Clicks Split evenly                            | `blend.distribute()`                                          | `blendStore.shares`                                 |
| Adds the blend to the cart                     | `cart.add()`, then `flyTo("cart", ...)` from `Summary`        | `cartStore.items`, a flight, then the cart bump     |
| A flying image reaches the header              | `landed()` in `FlyLayer`                                      | Removes the flight, `flyStore.bump`                 |
| Changes a quantity or removes                  | `cart.setQty()` / `cart.remove()`                             | `cartStore.items`                                   |
| Clears the cart                                | `cart.clear()`                                                | `cartStore.items`                                   |
| Opens or closes the cart                       | `cart.open()` / `cart.close()`, Esc, backdrop                 | `cartStore.isOpen`                                  |
| Sends the order                                | A `wa.me` link built by `buildOrderMessage()`                 | Nothing in the site                                 |
| Sends a suggestion                             | `trigger()` from `useSWRMutation`                             | POST `/suggestions`, then `sent`                    |
| Clicks Try again on a page                     | `unstable_retry()` in `error.tsx`                             | The page fetches again                              |
| Clicks Try again on the home page              | `mutate()` from `useSWR`                                      | The section fetches again                           |

## Structure

```
.husky/         pre-commit hook that runs lint-staged
.prettierrc.json
.prettierignore
CLAUDE.md       rules for AI coding assistants
DESIGN.md       visual identity
README.md
src/
  app/          routes: pages, loading.tsx, error.tsx, not-found.tsx, layout and global styles
  features/     one folder per feature, with its components, styles, store and logic
    home/         Hero, Story, RoastLevels, BlendTeaser
    products/     ProductCard, ProductsExplorer, FeaturedProducts, pricing
    blend/        BlendBuilder and the blend store
    brewing/      BrewingPreview and the brewing guide data
    cart/         CartDrawer and the cart store
    favorites/    the favorites store
    fly/          FlyLayer and the fly store
    reviews/      Reviews strip
    suggestions/  Suggestion box
  components/   shared pieces: Header, Footer, logos, Reveal, RouteError, GridSkeleton
  lib/          API client and SWR keys, WhatsApp link and order message
  types/        shared types
public/
  images/       hero, story, bags and brewing photos
```

Every component has a matching `.module.css` file next to it.

## Deployment

The site is not deployed yet. It can run on Vercel with no extra settings. Set
`NEXT_PUBLIC_API_URL` only to use a different API.

The API runs on Render as a web service with the start command
`npx json-server db.json --host 0.0.0.0 --port $PORT`. On the free plan, data written at runtime
(new suggestions) is lost when the service restarts or redeploys.
