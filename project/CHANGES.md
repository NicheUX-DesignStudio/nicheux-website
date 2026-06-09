# NicheUX Website — Session Changes & Decisions
**Date:** 14 May 2026  
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion

---

## 1. Homepage Redesign

### Hero (`src/components/home/Hero.tsx`)
- **CTA changed:** "Begin Your Production" → **"Start a Project"** — was too clever for first-time visitors, opaque intent
- **Trust micro-line added** below the CTA buttons: "Trusted by businesses in 🇬🇧 UK · 🇮🇪 Ireland · 🇮🇳 India · 🇨🇦 Canada · 🇲🇾 Malaysia" — first above-fold social proof
- **TypeScript bug fixed:** `rotate` number was being spread directly into `style` prop — destructured it out before spread so only used in `transform`

### Portfolio (`src/components/home/Portfolio.tsx`) — Full Rewrite
- **Old layout:** 6 alternating editorial spreads (huge vertical scroll, exhausting)
- **New layout:**
  - **Featured card** (Bloom & Brew) — full-width cinematic card at 640px height, background image with dark gradient overlay, gold "Featured Production" badge, outcome line, massive Playfair title
  - **3-column grid** (NandhiniDC, Sooraj Nikam, Visual Communication) — image cards with outcome lines in gold
  - **"View All 11 Productions →"** CTA at bottom
- **Outcome lines added** to every card — result-focused, not process-focused (e.g. "Launched into 3 international markets on day one")

### New: WhyUs (`src/components/home/WhyUs.tsx`)
- **New section** placed between Services and About
- **Purpose:** Objection-handling / conversion architecture — was the biggest missing piece
- **4 promise cards** with spotlight hover effect:
  1. No Templates — every pixel built from scratch
  2. Senior Talent Only — no juniors learning on your budget
  3. One Team, One Vision — strategy to launch, no handoffs
  4. Transparent Pricing — custom quote within 48h, fixed scopes
- Numerals light up in accent colour (Gold / Lavender / Blue) on hover
- CTA: "Start a Project" → `/contact`

### Testimonials (`src/components/home/Testimonials.tsx`)
- **Hero pull quote added** above the paginated grid
- Used **Priya R.'s quote** — "The packaging alone got us picked up by two boutique stockists in the first month" — chosen because it has a concrete, verifiable outcome (not just praise)
- Giant ghost `"` backdrop, full-width editorial style

### HomePage (`src/pages/HomePage.tsx`)
- Added `WhyUs` import and component between `<Services />` and `<AboutStrip />`
- **Page narrative arc is now:** Hero → Stats → Marquee → Portfolio → Services → WhyUs → About → Testimonials → Contact

---

## 2. FeaturedWork Gallery (`src/pages/FeaturedWork.tsx`) — Full Rewrite

**Old:** 100% full-black page, complex circular orbit carousel, hard to navigate, no outcomes shown  
**New:** Editorial magazine-style page with proper dark/light rhythm

| Section | Background | Content |
|---|---|---|
| Hero | Dark `#131313` | "Eleven stories, *told.*" + 3 stats: 11 productions · 5 countries · 6 disciplines |
| Client Productions | Parchment `#F1E9D2` | Featured Bloom & Brew (full-bleed) + 2×2 grid (NandhiniDC, Kishore, Sooraj, SSJC) |
| Creative & Studio | Dark `#131313` | 3-column grid: Visual Communication, Conceptual Art, Sequential Art, AI Canvas, NicheUX Narrative |
| CTA | Parchment `#F1E9D2` | "Ready to commission your production?" + Start a Project / Meet the Ensemble buttons |

- Cards without dedicated hero images use accent-colour gradient backgrounds (intentional, not broken)
- Each card shows outcome line + category + "Read" CTA

---

## 3. StagePresence Fix (`src/components/ui/StagePresence.tsx`)
- **Problem:** The right-edge ACT indicator used white text (`#ffffff`) with no backing — became completely invisible when scrolling over parchment sections
- **Fix:** Added `background: rgba(10,10,10,0.72)` + `backdrop-filter: blur(14px)` frosted glass pill — now always readable on any section colour
- Removed unused `BLACK` import

---

## 4. Pricing — Market Analysis & Corrections

### The Core Problem
The pricing formula `adjustedGBP = basePrice × purchasingPowerIndex × localMultiplier` was using multipliers so low they produced nonsensical results:
- India: £3,200 website → effective result ≈ **£48** (2.4% of UK price) → minimum viable floor kicked in but still too low
- Malaysia: £3,200 website → **RM2,000** (should be RM8,000+)

### UK Base Prices Updated (`src/utils/pricingService.ts`)
Raised 20–35% to match 2025 boutique UK studio market rates:

| Service | Old | New |
|---|---|---|
| Custom Coded Website | £2,000–£6,000 | £3,200–£10,000 |
| Custom merchify Store | £2,500–£9,000 | £3,800–£14,000 |
| Enterprise Solutions | £10,000–£30,000 | £15,000–£50,000 |
| Complete UI/UX Design | £2,250–£6,500 | £4,500–£12,000 |
| Logo Design | £350–£1,500 | £550–£3,000 |
| Complete Brand Identity | £2,250–£7,000 | £4,000–£14,000 |
| Social Media Starter/mo | £350–£900 | £650–£1,800 |
| Social Media Pro/mo | £650–£1,800 | £1,200–£3,200 |
| 30s Explainer Video | £750–£2,500 | £1,400–£4,500 |
| Single Character Design | £275–£900 | £450–£1,600 |

### Country Multipliers — Researched & Fixed

| Country | What was wrong | Fix applied |
|---|---|---|
| 🇮🇳 **India** | `localMultiplier: 0.15, ppi: 0.16` → website = ₹6,000 | → `localMultiplier: 0.65, ppi: 0.70` → website = **₹1,60,000–₹5,01,000** |
| 🇲🇾 **Malaysia** | `localMultiplier: 0.38, ppi: 0.44` → website = RM2,000 | → `localMultiplier: 0.70, ppi: 0.62` → website = **RM8,300–RM26,000** |
| 🇨🇦 **Canada** | `localMultiplier: 0.9` → slightly under market | → `localMultiplier: 1.0` → website = **C$5,600–C$17,500** |
| 🇮🇪 **Ireland** | `localMultiplier: 1.0` → parity with UK | → `localMultiplier: 1.05, ppi: 1.08` → **€4,280–€13,370** (Dublin premium) |
| 🇺🇸 **USA** | `localMultiplier: 1.0` → website = $4,506 (below US market floor) | → `localMultiplier: 1.2` → website = **$5,500–$17,000** |
| 🇨🇭 **Switzerland** | `localMultiplier: 1.0` → CHF 4,480 (below CHF 5,000 market floor) | → `localMultiplier: 1.1` → website = **CHF 5,400–CHF 16,900** |
| INR rate | 105 (stale) | → **110** (current 2026 rate) |

### Hardcoded Tier Prices Updated

**Strategy & Design (`src/pages/StrategyAndDesignPage.tsx`):**
| Tier | Old | New |
|---|---|---|
| Design Diagnostic | £1,500 | £2,200 – £4,500 |
| Foundation Design | £3,500 | £4,800 – £9,500 |
| Full Production Design | £7,500+ | £9,500 – £22,000 |
| Hero sidebar label | "From £1,500" | "£2,200 – £22,000" |

**Web Development (`src/pages/WebDevelopmentAndECommercePage.tsx`):**
| Tier | Old | New |
|---|---|---|
| Custom Coded Website | £2,000 | £3,200 – £10,000 |
| Custom merchify Store | £2,500 | £3,800 – £14,000 |
| Web Application | £5,000+ | £8,500 – £30,000 |
| Hero sidebar label | "From £2,000" | "£3,200 – £30,000" |

### Single Prices → Ranges Everywhere
- `getPriceRange()` in `pricingService.ts` was returning `"Starts at £X"` → changed to `"£X – £Y"` format
- Fixed-price services (care plans, consultations) still show single price since min === max
- This automatically propagated to all 4 hook-based service pages AND the Contact page service selector

### Contact Page Fix (`src/pages/ContactPage.tsx`)
- "Social Media Enterprise Plan" was **missing** from the service selector categories — added it
- Contact page already computed `totalMin–totalMax` estimate ranges correctly — this continued working with updated prices

---

## 5. Service Pages — Background Consistency

### Problem
4 pages (Social Media, Motion Design, Print & Brand, Illustration) had:
- Page wrapper: `min-h-screen bg-white` → entire page defaulted to white
- Light sections: `bg-gradient-to-br from-gray-50 to-white` → plain gray/white instead of brand parchment

### Fix Applied to All 4 Pages
- Page wrappers: `bg-white` → `bg-[#131313]` (brand dark)
- All `bg-gradient-to-br from-gray-50 to-white` → `bg-[#F1E9D2]` (brand parchment)
- Section `bg-white` (section-level only, not card-level) → `bg-[#F1E9D2]`
- Card backgrounds within sections left as white (white cards on parchment = correct contrast)

---

## 6. Country Pricing Selector — Rebuilt

### Problem
The `CountrySelector` was defined **locally in each of 4 service pages** with only 18–20 countries, missing:
- India, Malaysia, Singapore, most of Asia
- UAE, Saudi Arabia, Qatar, GCC countries
- Australia, New Zealand, Japan, South Korea
- South Africa, Nigeria, Kenya, most of Africa
- Most of Latin America

### Solution: Shared `CountryPricingSelector` (`src/components/ui/CountryPricingSelector.tsx`)

A single shared component now used by all 4 service pages. Features:
- **75 countries** across 7 regions: UK & Ireland, Europe, Asia Pacific, North America, Latin America, Middle East, Africa
- **Live search** — type any country name, code, or currency symbol
- **Flag emojis** + currency symbols for quick scanning
- **Grouped by region** with gold region headers
- **Frosted glass dropdown** — `rgba(10,10,10,0.97)` + `backdrop-filter: blur(20px)` — readable on any background
- **Fixed position** top-right, sits above all content at `z-index: 500`
- **Checkmark** on currently selected country
- Auto-detects country on first load via `ipapi.co` (existing behaviour preserved)
- Old local `CountrySelector` functions removed from all 4 pages (dead code cleaned up)

### Countries Covered
| Region | Countries included |
|---|---|
| UK & Ireland | GB, IE |
| Europe | DE, FR, NL, CH, SE, NO, DK, FI, BE, AT, IT, ES, PT, PL, CZ, HU, RO, GR, LU, EE, LV, LT, SK, HR, SI |
| Asia Pacific | IN, MY, SG, AU, NZ, JP, KR, HK, TW, PH, ID, TH, VN, BD, LK, PK, CN, BN |
| North America | US, CA, MX |
| Latin America | BR, AR, CO, CL, PE, UY, EC, BO, PY, VE |
| Middle East | AE, SA, QA, KW, BH, OM, TR, IL, JO, EG |
| Africa | ZA, NG, KE, GH, MA, TZ, ET, UG, RW |

---

## 7. What the Market Research Found

### India Pricing — Why ₹27,500 Minimum Is Correct
You found this data: Beginner freelancer ₹500–₹10,000 · Intermediate ₹10,000–₹50,000 · Top freelancer ₹50,000–₹1,30,000+ · Professional agencies ₹10,000–₹1,00,000+

NicheUX's minimum (₹27,500 for logo design) is **not competing with local freelancers**. Clients finding a UK studio website are not expecting Indian agency rates. The ₹27,500 minimum positions NicheUX above intermediate Indian freelancers, and the ₹1,50,000 maximum is a 50% international premium above the top Indian agency rate — this is correct for a UK studio.

### How Pricing Works for 150+ Other Countries
The 5 key NicheUX markets (UK, Ireland, India, Malaysia, Canada) were individually researched. USA, Australia, Singapore, UAE, Germany, South Africa, Nigeria were also verified against market data. The remaining ~140 countries use a formula:

```
adjustedPrice = ukBasePrice × purchasingPowerIndex × localMultiplier × currencyRate
```

With a **minimum viable price floor** (25–30% of UK base for professional services) that prevents any price from going absurdly low. This is the industry-standard approach for international pricing systems.

---

## 8. What Still Needs Doing

| Item | Priority | Notes |
|---|---|---|
| About page | High | Still all-dark `#0A0A0A` — needs parchment sections added to Team, TheWhy, ComparisonSection, Steps components |
| SSJC case study new assets | High | New medal print files (leg 1) shared to Drive from graphicdesigner@truefriend.co.in — need downloading and adding to SSJCTournamentPage |
| Domain email | High | `hellonicheux@gmail.com` → `hello@nicheux.com` (Google Workspace) |
| Midas.mp4 | Medium | Needs downloading from Drive → `public/videos/` for motion design page |
| Notion testimonials | Medium | Not rendering — confirm integration and add to homepage + About |
| Contact form end-to-end test | High | Must be tested before launch |
| JS rendering / SEO | Low (long-term) | Client-side SPA → Google can't crawl. Long-term fix: Next.js SSG migration |
| Aadharsham case study | Pending | No assets exist yet — build when client uploads to Drive |
| Thevaki personal portfolio | Note | Drive folder "Thevaki's Portfolio Website" is separate — "toran" and "opes" are personal projects NOT in NicheUX site |

---

## 9. Files Changed This Session

| File | Type of change |
|---|---|
| `src/components/home/Hero.tsx` | CTA text, trust line, TS bug fix |
| `src/components/home/Portfolio.tsx` | Full rewrite — featured card + grid |
| `src/components/home/WhyUs.tsx` | **NEW** — 4-promise section |
| `src/components/home/Testimonials.tsx` | Hero pull quote added |
| `src/components/home/StagePresence.tsx` | Frosted glass backdrop fix |
| `src/pages/HomePage.tsx` | Added WhyUs |
| `src/pages/FeaturedWork.tsx` | Full rewrite — editorial grid |
| `src/utils/pricingService.ts` | UK base prices, IN/MY/CA/IE/US/CH multipliers, INR rate, range format |
| `src/hooks/useCountryPricing.ts` | *(unchanged — format change was in service)* |
| `src/pages/StrategyAndDesignPage.tsx` | PRICING_TIERS ranges, sidebar label |
| `src/pages/WebDevelopmentAndECommercePage.tsx` | PRICING_TIERS ranges, sidebar label, JSON-LD price range |
| `src/pages/ContactPage.tsx` | Added Social Media Enterprise Plan to categories |
| `src/pages/SocialMediaMarketingPage.tsx` | bg-white → parchment/dark, CountrySelector removed |
| `src/pages/MotionDesignAIVisualsPage.tsx` | bg-white → parchment/dark, CountrySelector removed |
| `src/pages/PrintAndBrandDesignPage.tsx` | bg-white → parchment/dark, CountrySelector removed |
| `src/pages/IllustrationCharacterDesignPage.tsx` | bg-white → parchment/dark, CountrySelector removed |
| `src/components/ui/CountryPricingSelector.tsx` | **NEW** — shared 75-country selector |

---

*All TypeScript checks pass. Zero errors.*
