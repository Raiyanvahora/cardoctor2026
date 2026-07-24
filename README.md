# Car Doctor India — Website

Marketing site for **Car Doctor India**, luxury car repair specialists in Anand, Gujarat.
*We Repair Your Injured Dreams.*

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide icons and Framer Motion.
There is **no backend and no database** — every booking and enquiry is delivered through WhatsApp.

---

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

---

## Deploying to Netlify

The repo is already configured — `netlify.toml` sets the build command and loads
the official `@netlify/plugin-nextjs` runtime, which keeps `next/image`
optimization working in production.

1. Push this repository to GitHub, GitLab or Bitbucket.
2. In Netlify: **Add new site → Import an existing project**, and pick the repo.
3. Leave the build settings as detected — they come from `netlify.toml`
   (`npm run build`, publish `.next`, Node 20).
4. Deploy.

### After the first deploy

Netlify assigns a URL like `https://<site-name>.netlify.app`. Open
`lib/business.ts` and set `siteUrl` to the real address:

```ts
siteUrl: "https://your-real-domain.com",
```

That one value feeds every canonical URL, the sitemap, `robots.txt`, the Open
Graph tags and the JSON-LD structured data. Redeploy after changing it.

---

## Where to edit things

Everything the site says about the business lives in `lib/` — you should rarely
need to touch a component to change content.

| File | What it controls |
|---|---|
| `lib/business.ts` | Name, tagline, phones, WhatsApp number, email, address, hours, Instagram, Google Maps link, coordinates, `siteUrl` |
| `lib/services.ts` | The 10 services — titles, descriptions, "what's included", "good to know", images. Also feeds the booking form dropdown, footer, sitemap and structured data |
| `lib/gallery.ts` | Every gallery photo, its alt text and caption |
| `lib/rentals.ts` | Rental marques, indicative vehicles, and the four rental steps |
| `lib/reviews.ts` | Customer reviews (**currently empty — see below**) |
| `lib/navigation.ts` | Navbar / footer links |
| `lib/whatsapp.ts` | WhatsApp number and message formatting |

### Adding real customer reviews

`lib/reviews.ts` ships with an empty array on purpose — no reviews were
supplied, and inventing them would be dishonest. While it is empty, the reviews
section shows a truthful placeholder that links to the real Google listing.

To publish real reviews, paste genuine entries into that file:

```ts
export const reviews: Review[] = [
  {
    name: "Name as it appears on Google",
    rating: 5,
    quote: "The review text, quoted exactly as written.",
    source: "Google",
    vehicle: "BMW 3 Series", // optional
  },
];
```

The section switches from the placeholder to real review cards automatically.
No component changes are needed.

### Replacing photographs

Images live in `public/images/` and are listed in `lib/gallery.ts`.

Note that 18 of the current photos (`tile-01.jpg` … `tile-18.jpg`) came from the
business's Google listing and are only **204px wide**. They are deliberately
rendered as small tiles, which is the largest size they hold up at. If
higher-resolution originals turn up, drop them in over the same filenames,
update the `width`/`height` in `lib/gallery.ts`, and they can be promoted from
`tier: "tile"` to `tier: "feature"`.

---

## How booking works

`components/booking/BookingForm.tsx` collects the appointment details, validates
them in the browser (`components/booking/fields.ts`), then opens

```
https://wa.me/917228860075?text=<formatted message>
```

in a new tab with the request pre-filled. The customer presses send inside
WhatsApp. **Nothing is stored on the website** and no server is involved.

To change the WhatsApp number, edit `whatsappNumber` in `lib/business.ts`.

---

## Notes on the content

The site deliberately contains no invented information. There are no fabricated
reviews, no made-up statistics, no claimed certifications or awards, no staff
profiles and no prices — none of that was supplied by the business.

Two related points:

- **The 5.0★ Google rating** is displayed as on-page text and linked to the
  Google listing, but it is *not* emitted as `aggregateRating` in the JSON-LD.
  Schema.org requires a rating to carry a `reviewCount` or `ratingCount`, and no
  count was available. Publishing one without it would be invalid structured
  data and an unverifiable claim.
- **Rental vehicles** on `/luxury-car-rentals` are cars photographed at the
  workshop, labelled *Indicative* throughout. They are not a live availability
  list, and the page says so explicitly.
