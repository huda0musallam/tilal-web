# Design | Tilal

**Idea:** from the hills to your cup. Coffee roasted by hand at home, warm, natural and modern.

**Feeling:** not dark and not too light. Warm beige with coffee brown and olive green, easy on
the eyes, with clear contrast. The dark theme stays warm: dark brown, never black.

## Colors

Every color is a token in `src/app/globals.css`. Light values are in `:root`, dark values in
`.dark`, and components use only the role tokens below as Tailwind classes (`bg-surface`,
`text-ink`, `border-line`…). Never write a hex value or a palette name such as `olive` in a
component. All text reaches 4.5:1 in dark mode.

### Role tokens

| Role               | Light             | Dark              | Use                                                 |
| ------------------ | ----------------- | ----------------- | --------------------------------------------------- |
| `surface`          | `#F7F2EA`         | `#2A1C14`         | Page background, cards on a section                 |
| `muted-surface`    | `#EFE3D1`         | `#372519`         | Alternate sections, cards, boxes                    |
| `strong-surface`   | `#DCC7A8`         | `#5A4332`         | Strong badge, loading placeholders                  |
| `inverse-surface`  | `#5A3726`         | `#DCC7AD`         | Selected chips, inverse badge, step numbers         |
| `field`            | `#FFFFFF`         | `#33231A`         | Input backgrounds                                   |
| `ink`              | `#2A1A12`         | `#F4EADC`         | Headings and main text                              |
| `muted-ink`        | `#5A3726`         | `#DCC7AD`         | Secondary text, nav links, ghost buttons            |
| `on-inverse`       | `#F7F2EA`         | `#2A1C14`         | Text on `inverse-surface`                           |
| `primary`          | `#4F5A2E`         | `#AAB877`         | Primary buttons, footer, labels, badges             |
| `primary-hover`    | `#3E4724`         | `#BCC98B`         | Primary button hover                                |
| `primary-shade`    | `#424424` (mixed) | `#C4CA9A` (mixed) | A pill on an olive fill (blend teaser legend)       |
| `primary-tint`     | olive at 5%       | olive at 10%      | A selected field card in a form                     |
| `on-primary`       | `#F7F2EA`         | `#2A1C14`         | Text on an olive fill                               |
| `on-primary-muted` | `#DCC7A8`         | `#3A4220`         | Quieter text and links on an olive fill             |
| `on-primary-soft`  | `#E8E1CF`         | `#2F2A18`         | Body text on an olive fill                          |
| `on-photo`         | `#F7F2EA`         | `#F7F2EA`         | Titles on a photo                                   |
| `on-photo-muted`   | `#DCC7A8`         | `#DCC7A8`         | Quieter text and links on a photo                   |
| `text-on-dark`     | `#E8E1CF`         | `#E8E1CF`         | Body text on a photo                                |
| `line`             | `#DCC7A8`         | `#5A4332`         | Borders and dividers                                |
| `line-strong`      | `#5A3726`         | `#DCC7AD`         | Secondary button border                             |
| `accent`           | `#B8865A`         | `#C9976A`         | Details, icons, stars, error box border             |
| `focus`            | `#4F5A2E`         | `#AAB877`         | Focus ring                                          |
| `danger`           | `#A63D2A`         | `#E58B76`         | Errors and remove buttons                           |
| `on-danger`        | `#F7F2EA`         | `#2A1C14`         | Text on a `danger` fill (danger button)             |
| `placeholder`      | `#9C8572`         | `#A08A78`         | Input placeholders                                  |
| `scrim`            | `#2A1A12`         | `#2A1C14`         | Photo overlays, modal backdrop, shadows             |
| `logo`             | `#3B2618`         | `#EFE1CD`         | Logo ink                                            |
| `logo-accent`      | `#7A4A2A`         | `#D9B48F`         | "TILAL COFFEE" and the beans in the header wordmark |
| `logo-detail`      | `#E8D8C0`         | `#2A1C14`         | The highlight line on the stamp's bean              |
| `bean`             | `#6B4430`         | `#6B4430`         | The falling beans in the blend teaser               |
| `bean-line`        | `#3B2618`         | `#3B2618`         | The line on each falling bean                       |

Text on olive and text on photos use different roles on purpose. In dark mode the olive turns
light, so text on it turns dark. The photo scrims stay dark in both themes, so text on a photo
stays light.

Two colors are used only inside SVG and inline styles: `--hill` (`#6B7A45` light, `#C2CD93`
dark), the back hill of the footer wave, and `--bean-fourth` (`#D9B98F`), the fourth bean color
in the blend ring.

Rules:

- Sections alternate between `surface` and `muted-surface`, so each section has a clear start.
- One primary (olive) button in each group of buttons. The others are `secondary`.

## Fonts

| Token          | Font                    | Use                                  |
| -------------- | ----------------------- | ------------------------------------ |
| `font-heading` | Aref Ruqaa (700)        | Large headings (`h1`, `h2`, `h3`)    |
| `font-sans`    | Tajawal (400, 500, 700) | All other text, and the default font |

`font-heading` reads `--font-display` and `font-sans` reads `--font-body`, the variables that
`next/font` sets on `<html>`.

- Use Ruqaa only for large headings. It is hard to read at small sizes.
- Headings need a line height of 1.4 or more, because Ruqaa letters rise above the line.
- Body text is 17px with a line height of `1.8`. Text size utilities keep that line height,
  because the `--text-*--line-height` tokens are `inherit`.

## Radius

| Token             | Value   | Use                               |
| ----------------- | ------- | --------------------------------- |
| `rounded-control` | `8px`   | Buttons, inputs, small boxes      |
| `rounded-thumb`   | `12px`  | Cart thumbnails, the flying image |
| `rounded-badge`   | `12px`  | Badges                            |
| `rounded-panel`   | `16px`  | Panels and the product photo      |
| `rounded-toolbar` | `18px`  | The products toolbar              |
| `rounded-card`    | `20px`  | Cards                             |
| `rounded-media`   | `24px`  | Large images and boxes            |
| `rounded-feature` | `28px`  | The blend teaser panel            |
| `rounded-pill`    | `999px` | Chips and pills                   |
| `rounded-ellipse` | `50%`   | The roast dots                    |
| `rounded-full`    | full    | Only real circles                 |

## Spacing and layout

| Element         | Value                                                          |
| --------------- | -------------------------------------------------------------- |
| Content width   | `1200px` (`--container`, the `container` utility)              |
| Side gutter     | `20px` (`--gutter`)                                            |
| Section padding | `80px` on phones, `112px` from `lg` (the `Section` component)  |
| Page padding    | `32px` / `80px` on phones, `56px` / `112px` from `sm` (`Page`) |

Breakpoints, mobile first: no prefix for phones, then `sm` (640px), `md` (768px, the full header
menu) and `lg` (1024px, side-by-side layouts and three columns). No other breakpoints.

## UI kit

Every control and repeated piece of UI comes from `src/components/ui`. The full list of
components and variants is in `README.md` and `CLAUDE.md`. What they look like:

- **Button:** `primary` olive, `secondary` with a brown border, `ghost` with no border, `inverse`
  light on an olive fill, `link` underlined. `chip` and `option` are the choice buttons. Buttons
  shrink slightly when pressed.
- **Chips:** pills for every choice group: weight, cardamom, filters and the blend steps. The
  selected chip is `inverse-surface` with `on-inverse` text.
- **Card:** `surface` or `muted-surface` with a `line` border. Some lift a little with a soft
  shadow on hover.
- **Badge:** `soft`, `strong` and `inverse` for the three roast levels, `count` for the header
  counts, `plain`, `eyebrow` and `shade` for small labels.
- **Section label:** a small bold olive line above each section, such as "قصتنا", with an `h2`
  under it.
- **Roast dots:** three ovals. The filled ones show how dark the roast is.
- **Header icons:** heart, bag, theme toggle and menu, 44px round ghost buttons, with an olive
  count badge when the count is above zero.
- **MessageBox:** a dashed box. `error` has an `accent` border on `muted-surface` and a "جرّب مرة
  تانية" button, `empty` has a `line` border, `callout` is the box on the brewing pages.
- **Placeholders:** `Skeleton`, `GridSkeleton`, `CatalogSkeleton` and `ReviewsSkeleton`, blocks
  the size of the real content that pulse while data loads.
- **Modal:** a native dialog over a `scrim` backdrop. The cart is a `Modal` that slides in from
  the inline end.
- **Forms:** a label above every field, the hint under it, and the error in `danger` under the
  hint. Every control shows the same olive focus ring.

## UI rules

1. **The UI is dumb.** Nothing in `components/ui` knows about the cart, products or roasts.
   Features map their data to visual variants.
2. **One source.** One file for each control. A look that is missing becomes a new variant, not
   a second component or a copied class string.
3. **Small files.** One component per file, built with `cva`, `cn()` and typed props.
4. **Tokens only.** Role color tokens and radius tokens, no hex, no pixel values, no `[..]`
   values. Structural `[..]` selectors are allowed.

## Images

- Warm, with brown, beige and green, and side light like morning light.
- No cold or blue tones.
- Images are WebP at about quality 80. File names are lowercase with dashes: `bag-light.webp`.
- Only keep images the site uses.
- Every image has an `alt` that says what is in it, in Arabic.
- Text on a photo sits on a `scrim` gradient, which stays dark in both themes.

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
- The logos draw with `currentColor` and the `logo`, `logo-accent` and `logo-detail` tokens, so
  they follow the theme. On an olive fill, give the stamp `text-on-primary`.
- The logo is a React component, not an image, so it uses the Ruqaa font from the site.

## Motion

- **Reveal:** elements rise and fade in over 0.5 to 0.6 seconds. Items in a row follow each
  other with 0.1 seconds between them.
- **Once:** reveal animations run only the first time (`once: true`).
- **Calm:** continuous motion (the stamp, the hero zoom, the falling beans) is very slow, so the
  page feels alive without pulling attention.
- **Feedback:** the heart springs when pressed. Buttons shrink slightly when pressed.
- **Modal:** the cart slides in and out from the inline end while the backdrop fades.
- **Fly to the header:** adding to the cart or favorites sends a small copy of the bag image in
  an arc to the header icon over 0.8 seconds, then the icon bounces once.
- **Reduce motion:** all motion stops when the user has `prefers-reduced-motion` on. The fly
  animation is skipped and only the count updates.

## Writing

- A light, warm Levantine dialect, like talking to a neighbor.
- Short, clear sentences.
- Buttons start with a verb: "أضف للسلة"، "ابدأ خلطتك"، "اطلب عبر واتساب".
- Error messages say what happened and what to do: "ما قدرنا نجيب المنتجات هلق، جرّب كمان شوي."
