# Design | Tilal

**Idea:** from the hills to your cup. Coffee roasted by hand at home, warm, natural and modern.

**Feeling:** not dark and not too light. Warm beige with coffee brown and olive green, easy on
the eyes, with clear contrast.

## Colors

All colors are CSS variables in `src/app/globals.css`. Do not write a color directly unless it
has no variable.

| Variable         | Color     | Use                                           |
| ---------------- | --------- | --------------------------------------------- |
| `--bg`           | `#F7F2EA` | Main background                               |
| `--section`      | `#EFE3D1` | Section and card backgrounds                  |
| `--sand`         | `#DCC7A8` | Borders and dividers                          |
| `--nescafe`      | `#B8865A` | Details, icons, stars                         |
| `--olive`        | `#4F5A2E` | Primary buttons, small labels, footer, badges |
| `--olive-dark`   | `#3E4724` | Primary button hover                          |
| `--coffee`       | `#5A3726` | Secondary text, selected chips                |
| `--espresso`     | `#2A1A12` | Headings and main text                        |
| `--logo`         | `#3B2618` | Logo                                          |
| `--danger`       | `#A63D2A` | Errors and remove buttons                     |
| `--text-on-dark` | `#E8E1CF` | Text on dark backgrounds (footer, photos)     |
| `--white`        | `#FFFFFF` | Input backgrounds and text on buttons         |
| `--placeholder`  | `#9C8572` | Input placeholders                            |

Colors without a variable, used in one place only:

- `#6B7A45`: the back hill in the footer wave (SVG)
- `#D9B98F`: the fourth bean color in the blend ring
- The logo and the falling beans keep their colors inside their SVG

shadcn/ui reads the same colors through `src/app/tailwind.css`: `primary` is `--olive`,
`secondary` and `muted` are `--section`, `border` and `input` are `--sand`, `ring` is
`--nescafe`, `destructive` is `--danger`.

Rules:

- Sections alternate between `--bg` and `--section`, so each section has a clear start.
- Text on olive or on dark photos uses `--bg`.
- One primary (olive) button in each group of buttons. The others use `btn-outline`.

## Fonts

| Role     | Font                    | Variable         |
| -------- | ----------------------- | ---------------- |
| Headings | Aref Ruqaa (700)        | `--font-display` |
| Text     | Tajawal (400, 500, 700) | `--font-body`    |

- Use Ruqaa only for large headings (`h1`, `h2`, `h3`). It is hard to read at small sizes.
- Headings need `line-height` of 1.4 or more, because Ruqaa letters rise above the line.
- Body text is 17px with `line-height: 1.8`.

## Spacing and corners

| Element             | Value                                |
| ------------------- | ------------------------------------ |
| Content width       | `1200px` (`.container`)              |
| Side gutter         | `20px`                               |
| Section padding     | `112px` on desktop, `80px` on mobile |
| Button corners      | `8px`                                |
| Card corners        | `20px`                               |
| Large image corners | `24px`                               |
| Chips               | `999px`                              |

Breakpoints, mobile first (`min-width`): `640px` (two columns), `768px` (full header menu),
`900px` (side-by-side layouts), `1024px` (three columns). The phone layout is the default.

## Components

- **Buttons:** `.btn` with `.btn-primary` (olive) or `.btn-outline` (brown border).
- **Chips:** `Chips` in `src/shared/ui`, for every choice group: weight, cardamom, filters and
  the blend steps. Size `md` for filters and the blend, `sm` inside product cards. The selected
  chip has a `--coffee` background and `--bg` text.
- **Cards:** `--section` or `--bg` background with a `--sand` border. They lift a little with a
  soft shadow on hover.
- **Section label:** a small bold olive line above each section, such as "قصتنا", with an `h2`
  under it.
- **Roast dots:** three dots. The filled ones use `--coffee` and show how dark the roast is.
- **Header icons:** heart (favorites) and bag (cart), 44px round buttons, with an olive count
  badge when the count is above zero.
- **Error box:** `SectionError` inside a section, `RouteError` for a whole page. A dashed
  `--nescafe` border on `--section`, a short message and a "جرّب مرة تانية" button.
- **Empty box:** `EmptyState`, a dashed `--sand` border with a short friendly message and,
  when it helps, one button.
- **Placeholders:** `GridSkeleton`, `CatalogSkeleton` and `ReviewsSkeleton`, blocks with the
  same size as the real content that pulse while data loads.
- **Product page:** the photo and the details side by side from `900px`, stacked on phones. The
  facts (origin, roast) sit in a `--section` box.
- **Forms (checkout):** shadcn/ui fields with the Tilal colors. A label above every field, the
  hint under it, and the error in `--danger` under the hint. One full-width olive submit button.

## Images

- Warm, with brown, beige and green, and side light like morning light.
- No cold or blue tones.
- Images are WebP at about quality 80. File names are lowercase with dashes: `bag-light.webp`.
- Only keep images the site uses.
- Every image has an `alt` that says what is in it, in Arabic.

| Image   | File                                                                         |
| ------- | ---------------------------------------------------------------------------- |
| Hero    | `hero-hills.webp`                                                            |
| Story   | `story-roaster.webp`                                                         |
| Bags    | `bag-light.webp` (green), `bag-medium.webp` (kraft), `bag-dark.webp` (brown) |
| Brewing | `brew-v60.webp`, `brew-moka.webp`, `brew-cold-brew.webp`, `hero-dallah.webp` |

## Logo

- **Full stamp** (`StampLogo`): footer, story section and the 404 page. It turns slowly.
- **Wordmark** (`HeaderLogo`): header.
- **Hills mark** (`icon.svg`): browser tab icon.
- On dark backgrounds: `<StampLogo ink="#F7F2EA" />`
- The logo is a React component, not an image, so it uses the Ruqaa font from the site.

## Motion

- **Reveal:** elements rise and fade in over 0.5 to 0.6 seconds. Items in a row follow each
  other with 0.1 seconds between them.
- **Once:** reveal animations run only the first time (`once: true`).
- **Calm:** continuous motion (the stamp, the hero zoom, the falling beans) is very slow, so the
  page feels alive without pulling attention.
- **Feedback:** the heart springs when pressed. Buttons shrink slightly when pressed.
- **Fly to the header:** adding to the cart or favorites sends a small copy of the bag image in
  an arc to the header icon over 0.8 seconds, then the icon bounces once.
- **Reduce motion:** all motion stops when the user has `prefers-reduced-motion` on. The fly
  animation is skipped and only the count updates.

## Writing

- A light, warm Levantine dialect, like talking to a neighbor.
- Short, clear sentences.
- Buttons start with a verb: "أضف للسلة"، "ابدأ خلطتك"، "اطلب عبر واتساب".
- Error messages say what happened and what to do: "ما قدرنا نجيب المنتجات هلق، جرّب كمان شوي."
