# Shivshakti — where to replace info and images

## 1. All text, phone, prices → `src/content.ts`
| What | Find this | Change to |
|---|---|---|
| WhatsApp number (order form + button) | `brand.whatsapp` | digits only with country code, e.g. `919876543210` |
| Number shown on page | `brand.phoneDisplay` | `+91 98765 43210` |
| Email | `brand.email` | your email |
| Shop address | `brand.address` | your address |
| Instagram | `brand.instagram` | your link, or `''` to hide |
| Logo | `brand.logo` | `'/images/logo.png'` (see step 2) |
| Headline / intro text | `hero`, `intro` | your wording |
| Product names, text | `products[]` → `title`, `body`, `tag` | your wording |
| Prices | `pricing.tiers[]` → `from`, `unit`, `lines` | your prices |
| Orders delivered counter | `process.delivered` | your real number |
| Process steps | `process.steps[]` | your steps |
| Bulk-order countdown | `order.deadline` | ISO date, e.g. `'2027-03-01T00:00:00+05:30'`; `''` hides it |

## 2. Images → put files in `public/images/`
Then reference them with a path starting `/images/`.

- **Logo**: save as `public/images/logo.png` (transparent PNG/SVG), then set `brand.logo = '/images/logo.png'`. It replaces the sun mark in the header/footer AND the design printed on the hero T-shirt.
- **Product photos**: save e.g. `public/images/tshirt.jpg`, then in `products[]` set `image: '/images/tshirt.jpg'`. Empty `''` = the drawn illustration. Best size: 3:4 portrait (e.g. 900×1200).
- **Hero T-shirt design**: it is the logo (above). To change the built-in drawing, edit the `<g ref={designRef}>` block in `src/components/Hero.tsx`.
- **Favicon / social image**: add `public/favicon.png` and `public/og.jpg`, then add to `index.html`: `<link rel="icon" href="/favicon.png" />` and `<meta property="og:image" content="/og.jpg" />`.

## 3. Colours and fonts → `src/index.css` (`@theme` block)
`--color-saffron` (accent), `--color-maroon`, `--color-ink` (background), `--color-cream` (text).
Hero shirt colours: `SHIRTS` list at the top of `src/components/Hero.tsx`.
Illustration colours: `color` in each `products[]` entry.

## 4. Page title / description → `index.html`

## Run
```
npm install
npm run dev      # http://localhost:3006
npm run build    # production files in dist/
```
