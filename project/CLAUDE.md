# NicheUX — Project Handoff for Claude

## Who You Are Working With
Thevaki is the Creative Director and lead developer at NicheUX, a UK-based design studio. They have full creative authority — make decisive taste calls, ship complete work, do not ask permission on craft decisions. Only ask if an action is destructive, requires a paid service, or cannot be inferred from the codebase.

---

## The Project
NicheUX is a design studio website — it is both a portfolio and a conversion tool. Every page must earn trust and push visitors toward booking a project.

**Live site:** https://www.nicheux.com  
**Local dev:** runs on Vite + React, started with `npm run dev` from `/project`  
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion + React Router DOM + React Helmet Async + Notion backend (contact form and testimonials) + Express server. NOT Next.js — pure client-side SPA.

---

## Brand Identity — Never Change These

**Palette:**
- `GOLD = "#EBC773"` — primary accent, warmth, trust
- `LAVENDER = "#B097BE"` — creativity, softness
- `BLUE = "#89B0CC"` — technology, clarity
- `BLACK = "#131313"` — primary dark background
- `PARCHMENT = "#F1E9D2"` — light sections (printed playbill feel)
- `INK = "#1A1A1A"` — dark text on parchment
- `INK_MUTED = "#7A736A"` — secondary text on parchment

**Fonts:**
- `'Cormorant Garamond', serif` — all display headlines, large editorial type, italic accent text
- `'Source Sans Pro', sans-serif` — all body text, UI labels, captions

**Design language:** Theatre and storytelling. "Every story deserves a stage." Dark editorial base with parchment intermissions. Roman numerals (I, II, III, IV). Fleuron ❖ as decorative element. Playbill headers with flanking lines.

**Light/dark rhythm:** Dark hero → parchment stat break → dark content → parchment principles → dark before/after → dark pricing. This is the homepage pattern and ALL service pages now follow it.

---

## Content Rules — Strictly Enforced
- **No em dashes (—), en dashes (–), hyphens used as dashes, or Oxford dashes** anywhere in copy. Rephrase sentences instead. This applies to all files.
- Body copy is conversational and emotionally resonant, not formal.
- Headlines lead with the emotional hook, not the deliverable.
- SEO-rich with natural keyword placement.
- Never invent research methods or stats. Only write what actually happened.

---

## Route Map

```
/                          — HomePage
/about                     — AboutPage (curtain reveal entry — DO NOT REMOVE)
/featured-work             — FeaturedWork (case study gallery)
/featured-work/bloom-brew  — Bloom & Brew (merchify, Canada)
/featured-work/nandhinidc  — NandhiniDC (Web Design, India)
/featured-work/kishore-portfolio — Kishore Aravind (UK/Malaysia)
/featured-work/sooraj-linkedin   — Sooraj LinkedIn Banner
/featured-work/sooraj-wanted     — Sooraj Wanted Carousel
/featured-work/sooraj-candy-merch — Kingdom of Sweets
/featured-work/ssjc-tournament   — SSJC Print/merch (Malaysia)
/featured-work/visual-communication — Posters
/featured-work/conceptual-art    — Conceptual Anatomy
/featured-work/sequential-art    — Comics
/featured-work/ai-canvas         — AI Canvas
/featured-work/nicheux-narrative — Building in Public
/strategy-design
/web-development-ecommerce
/print-brand-design
/motion-design-ai-visuals
/social-media-marketing
/illustration-character-design
/contact
/blog
/blog/:slug                — ArticlePage
/gallery
/merch
/privacy  /terms  /cookies
```

---

## Service Pages — Current Architecture

All 6 service pages (`src/pages/`) follow this exact section order:

1. **Hero** — dark, editorial, 2-col layout, parallax hero image
2. **WorkStrip** — `<WorkStrip />` from `@/components/service/WorkStrip` — same images on all pages, auto-scrolling marquee of all NicheUX portfolio work
3. **ServiceStatStrip** — `<ServiceStatStrip />` — PARCHMENT section, 4 animated stats with Roman numerals, playbill header, fleuron. Each page has its own `SERVICE_STATS` array.
4. **Why X Matters** — dark, 3 pain point cards + problem showcase + quote
5. **Our Process** — dark (`<ServiceSection light>` = PARCHMENT), 3 numbered steps
6. **Why Work With Us** — PARCHMENT (`<ServiceSection borderTop light>`), 6 principles grid with INK text
7. **BeforeAfterSection** — `<BeforeAfterSection />` — dark, before/after comparison with tab nav, uses `/images/diagnostics/` images
8. **Transparent Pricing** — dark, individual services + packages with tier cards
9. **FAQs** — dark, accordion
10. **CTA** — dark, centred, 3-step process

**Print & Brand Design** also has (between Hero and WorkStrip):
- PRINT_CATEGORIES parchment section (5 categories × 3 items)
- FoldViewer interactive component (9 fold types)
- Quick Fold Selection Guide

**Motion Design** also has a Dual Approach section and ServiceTabs component.  
**Web Dev** also has a Website Care Plans section.

---

## Key Shared Components

| Component | Location | Purpose |
|---|---|---|
| `WorkStrip` | `src/components/service/WorkStrip.tsx` | Unified portfolio scroll — same across all 6 service pages |
| `ServiceStatStrip` | `src/components/service/ServiceStatStrip.tsx` | PARCHMENT animated stat section |
| `BeforeAfterSection` | `src/components/service/BeforeAfterSection.tsx` | Before/after comparison with tabs |
| `ServiceTabs` | `src/components/service/ServiceTabs.tsx` | Tabbed service listing (Motion page) |
| `ServicePagePrimitives` | `src/components/service/ServicePagePrimitives.tsx` | `ServiceSection`, `ContentContainer`, `Eyebrow`, `BackgroundNumeral`, `PrimaryButton`, `SecondaryButton` |
| `CountryPricingSelector` | `src/components/ui/CountryPricingSelector` | Country switcher shown at top of service pages |
| `Footer` | `src/components/ui/Footer.tsx` | Redesigned editorial footer — large statement, service/nav columns, parchment trust marks |

### ServiceSection Props
```tsx
<ServiceSection
  light        // PARCHMENT background instead of BLACK
  borderTop    // adds top border
  withSpotlight spotlightColor={ACCENT}
  bgColor="custom"
  id="anchor"
/>
```

---

## Pricing System

**File:** `src/utils/pricingService.ts`  
**Hook:** `src/hooks/useCountryPricing.ts`

```tsx
const { getServicePrice, isLoading, countryInfo } = useCountryPricing();
const price = (id: string) => isLoading ? "Loading..." : getServicePrice(id);
```

- UK GBP base prices are in `createUKPricing()`
- 150+ countries supported with PPP multipliers (`localMultiplier`, `purchasingPowerIndex`)
- `getPriceRange()` returns formatted string like `"£450 – £1,200"` (en dash, not hyphen)
- Fixed monthly prices (care plans, social media plans) show as single value e.g. `"£200/mo"`
- Country is auto-detected by IP via the hook

**Key service IDs** (exact strings required):
- Strategy: `'UX Audit & Strategy'`, `'Complete UI/UX Design'`, `'Design System'`
- Web: `'Custom Coded Website'`, `'Custom merchify Store'`, `'Enterprise Solutions'`, `'Essential Care'`, `'Professional Care'`, `'Enterprise Care'`
- Social: `'Social Media Starter Plan'`, `'Social Media Professional Plan'`, `'Social Media Enterprise Plan'`
- Motion: `'30s Explainer Video'`, `'Logo Animation'`, `'Social Media Video Pack'`, `'Character Animation'`, `'Motion Excellence'`, `'AI Innovation Suite'`, `'Creative Power Duo'`
- Print: `'4-page Brochure'`, `'Poster (up to A2)'`, `'Main Menu (4 pages)'`, `'Single-sided Flyer'`, `'Starter Brand Kit'`, `'Complete Brand Launch'`, `'Marketing Pro Package'`
- Illustration: `'Single Character Design'`, `'Game Character Package'`, `"Children's Book Package"`, `'Character Design Suite'`

---

## Images — Where Everything Lives

All served from `/public/images/`.

**Hero images (all `.webp`):**
- `StrategyandDesignHero.webp`
- `WebDevelopmentECommerceHero.webp`
- `MotionGraphicsAIVisualsHero.webp`
- `PrintBrandHero.webp`
- `SocialMediaGraphicsHero.webp`
- `IllustrationsCharacterDesign.webp`

**Fold type images** — filenames have spaces, must use `%20`:
- `/images/Half%20Fold.webp`, `/images/Tri%20Fold.webp`, `/images/Z%20Fold.webp`, etc.

**Client work:**
- `/images/sooraj/carousel/slide-1.png` through `slide-8.png`
- `/images/sooraj/linkedin/banner-green.png` — the real LinkedIn banner designed for Sooraj (dark teal left + photo right, diagonal split). Use this in work strips.
- `/images/sooraj/linkedin/quote-large.png` — has white bottom space, do not use in work strips
- `/images/ssjc/poster-leg1.jpeg`, `tshirt-leg1.jpeg`, `lanyard-blue.png`, etc.
- `/images/nandhinidc/ndc-home-desktop.png`
- `/images/kishore-process/kishore-home-desktop.png`

**Diagnostics (before/after):**
- `/images/diagnostics/[service]-[type]-before.png` and `-after.png`
- Services: `social`, `strat`, `web`, `print`, `motion`, `illus`
- Types: `strategy`, `consistency`, `conversion`, `cta`, `mobile`, `trust`, `code`, `perf`, `security`, `brand`, `file`, `scatter`, `ai`, `scroll`, `original`, `quality`

**Do not use:**
- `GrandTheatreOfCreation.webp` in any public-facing gallery or work strip (it was the About page hero, now removed from strips)
- `banner-alt.png` — do not use (wrong variant)
- `quote-large.png` — do not use in work strips (has white bottom space)

---

## About Page

**Entry (DO NOT CHANGE):** `<Introtext>` — void → curtain → typewriter → logo → content. This is the signature theatrical entrance.

**Post-curtain sections** (shown after `onComplete` callback):
- `Team.tsx` — 6 team members in dark grid with GrandTheatreOfCreation full-bleed image above
- `TheWhy.tsx` — studio story in dark, then PARCHMENT proof numbers (6 · 4 · 3) with fleuron
- `ComparisonSection.tsx` — 6 disciplines with Roman numerals
- `Steps.tsx` — 3-step process + service marquee
- `Faq.tsx`

**Team members (About page and Homepage ONLY — never on case study pages):**
- Thevaki (Creative Director, UI/UX, Web Dev) — GOLD
- Indhupriya (Character & Illustration) — LAVENDER
- Isaac (Print & Brand) — BLUE
- Akash (AI Visuals) — GOLD
- Delwin (Motion Design) — LAVENDER
- Kishore Aravind (Sales & Marketing) — BLUE

---

## Contact Page

**File:** `src/pages/ContactPage.tsx`  
**Theme:** Fully dark (`#0d0d0d` background, dark cards `#151515`, white text)  
**Hero:** "Build something worth talking about." in Cormorant 88px  
**Function:** Service selection checkboxes with live price estimator, form submission to Notion  
**WhatsApp float:** Fixed bottom-right, links to `+447342736804`

The contact page layout still needs a full visual redesign — the service selection UI and form layout need to match the editorial quality of the rest of the site. This is a known pending task.

---

## Footer

**File:** `src/components/ui/Footer.tsx`  
Redesigned — large editorial statement "Every story deserves a stage." in 80px Cormorant, gold CTA button, service links with accent hover colours, navigation column, brand trust marks, legal links. Matches the dark editorial aesthetic.

---

## merch / merch Page

**File:** `src/pages/merchPage.tsx`  
**Menu label:** Currently "merch" — consider renaming to "merch" or "Studio Goods" for a more professional feel.  
12 products across 4 categories (frames, mugs, apparel, books). Products currently show SVG illustrated placeholders. Realistic product mockup images need to be AI-generated (Midjourney, DALL-E, or Adobe Firefly) and dropped into the paths below.

**Product image paths to fill:**
```
/public/images/merch/quote-frame.jpg
/public/images/merch/art-print.jpg
/public/images/merch/photo-frame.jpg
/public/images/merch/story-mug.jpg
/public/images/merch/name-mug.jpg
/public/images/merch/scene-mug.jpg
/public/images/merch/story-tee.jpg
/public/images/merch/quote-tee.jpg
/public/images/merch/storytelling-hoodie.jpg
/public/images/merch/personalised-kids-book.jpg
/public/images/merch/illustrated-story.jpg
/public/images/merch/custom-mini-book.jpg
```

Once images exist, update each product's `image` field in `merchPage.tsx` from `null` to the path above.

---

## Blog / Articles

**Files:** `src/data/articles.ts` (article data), `src/pages/BlogPage.tsx`, `src/pages/ArticlePage.tsx`

**Current articles (5 total):**
1. Bloom & Brew — merchify case study
2. SSJC GAME ON — tournament identity + bunting colour decisions (merged into one article)
3. NandhiniDC — architecture website
4. Eight Slides by 4am — Sooraj LinkedIn overnight content
5. Where design meets storytelling — studio manifesto

**Rules:**
- No em dashes, hyphens as dashes, or Oxford dashes anywhere in article copy. Rephrase instead.
- Conversational tone, emotionally resonant
- SEO-rich headlines

---

## Gallery Page

**File:** `src/pages/GalleryPage.tsx`  
7 items currently. GrandTheatreOfCreation removed. Categories: Images, Videos, Behind the Scenes.  
To add gallery items, edit the `ITEMS` array at the top of the file.

---

## About Page

**File:** `src/pages/AboutPage.tsx`  
Theatrical curtain entry (DO NOT REMOVE). Post-curtain sections loaded via components in `src/components/about/`.  
All 6 team members documented above.  
Still needs: Team.tsx, Steps.tsx, Faq.tsx editorial polish pass.

---

## Featured Work / Case Studies

**File:** `src/pages/FeaturedWork.tsx` + individual case study pages  
Live case studies: Bloom & Brew, NandhiniDC, SSJC, Sooraj (multiple), visual communication, AI canvas.  
Pending: Tutor Connect (UX case study), Vision Squash (Figma Make app).

---

## CMS Strategy — For Uploading Blogs, Images, Videos, Products

The site is currently a static SPA (Vite + React). Content lives in TypeScript data files. To enable non-developer content management, here are the options ranked by fit:

### Recommended: Sanity.io (Studio + API)

**Why:** Structured content with real-time preview, image/video asset management, free tier is generous, React-friendly.

**What it covers:**
- Blog articles (replace `src/data/articles.ts` with Sanity queries)
- Gallery images and videos
- merch/merch products
- Team members

**Implementation steps:**
1. `npm create sanity@latest` in `/project`
2. Define schemas: `article`, `product`, `galleryItem`, `teamMember`
3. Replace static imports with `import sanityClient from '@sanity/client'` and `useSanityQuery` hook
4. Deploy Sanity Studio at `/studio` route or as separate deployment
5. Use `@sanity/image-url` for image transforms (auto WebP, sizing)

**Video uploads:** Sanity handles video via MUX integration (`@sanity/mux-input`) or direct file assets.

### Alternative: Notion (already partially integrated)

The contact form already uses Notion as backend. Could extend for:
- Blog drafts and published state
- Gallery metadata
- Not ideal for video/large image assets

### Alternative: Firebase Firestore + Storage

If you already have a Google account and need more control:
- Firestore for article/product data
- Firebase Storage for images and videos
- Firebase hosting compatible with SPA routing

### For merch/Products specifically

If products eventually need a checkout flow: **merchify Buy SDK** embedded in the current React site, or move the merch to a dedicated merchify storefront. NicheUX already builds merchify stores, so this is a natural fit.

---

## What Has Been Built (This Redesign)

- All 6 service pages completely rewritten with live site content in redesign visual style
- ServiceStatStrip component — PARCHMENT animated stats on all 6 service pages
- WorkStrip component — unified portfolio scroll (same images on every page)
- BeforeAfterSection component — before/after comparison with tabs
- ServiceTabs component — tabbed service display for Motion page
- Footer redesigned — large editorial statement, service/nav/CTA columns
- Contact page dark theme — full CSS overrides, WhatsApp float (+447342736804), editorial header
- ServiceSection light prop — automatically applies dark text/border CSS to all parchment sections via style injection in ServicePagePrimitives.tsx
- Fold images fixed — all use `%20` URL encoding for spaces in filenames
- Gallery — GrandTheatreOfCreation removed
- Blog articles — em-dashes removed, bunting content merged into SSJC article
- merch page — SVG illustrated placeholders for all 12 products

---

## What Still Needs Doing

| Task | Priority | Notes |
|---|---|---|
| merch product images | High | Need AI-generated realistic product mockups. Paths listed above. |
| Contact page layout | High | Dark theme done but service-selection UI and form grid need full editorial treatment |
| About page polish | Medium | Team.tsx, Steps.tsx, Faq.tsx need editorial pass |
| Before/After diagnostics images | Medium | `/images/diagnostics/` folder is empty. Add real before/after screenshots or the component shows elegant empty state |
| Process section images | Medium | Add work samples alongside each 3-step process section per service page |
| Notion testimonials | Medium | Testimonials component fetches from Notion but not displaying on any page |
| CMS integration | Medium | Recommended: Sanity.io. Steps documented above. |
| Tutor Connect case study | Low | UX case study with wireframes and mockups |
| Vision Squash case study | Low | Figma Make court booking app |
| merch page rename | Low | Consider "merch" or "Studio Goods" instead of "merch" |

---

## Navigation to Use

```tsx
// Within page components
const go = (path: string) => { window.location.href = path; };

// In components with useNavigate
const navigate = useNavigate();
navigate('/contact?selection=encodeURIComponent("Service Name")');
```

---

## Do Not Do

- Do not change the brand colours
- Do not change `hellonicheux@gmail.com` — email migration not done yet
- Do not build Tutor Connect or Vision Squash case studies unless explicitly asked
- Do not remove the curtain/Introtext entry from the About page
- Do not use `GrandTheatreOfCreation.webp` in work strips or galleries
- Do not use `banner-alt.png` or `quote-large.png` in work strips — use `banner-green.png` for the Sooraj LinkedIn banner showcase
- Do not use `font-sans-light` (too thin) — use `font-sans-normal` for all body text
- Do not add em dashes, en dashes as punctuation, or hyphens used as dashes in any copy
- Do not use rounded corners (border-radius above 4px) on editorial components — the design language is sharp/angular
