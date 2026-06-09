# NicheUX Website — Complete Handoff Document
**Last updated:** 16 May 2026  
**For:** Any new conversation picking up this project  
**Read this entire file before touching anything**

---

## 1. WHO THIS IS FOR

This is the NicheUX design studio website. The client is **Thevaki** (hellonicheux@gmail.com). NicheUX is a UK-based creative studio with 6 team members across web, print, illustration, AI, motion, and social media. The brand concept is theatrical: "Every story deserves a stage." "Where design meets storytelling."

The website is for converting first-time visitors into clients, making existing clients feel at home, and showcasing the studio's work as a series of productions.

---

## 2. TECH STACK

```
Framework:    React 18 + Vite + TypeScript
Styling:      Tailwind CSS + inline styles (inline styles are preferred for case study pages)
Animation:    Framer Motion
Routing:      React Router DOM
SEO:          React Helmet Async
Fonts:        Cormorant Garamond (serif, display) + Source Sans Pro (sans, UI)
Backend:      Express.js (server.js) + Notion API for contact form + testimonials
Dev server:   http://192.168.1.103:3003 (local network)
```

**DO NOT change:**
- Colour palette (Gold `#E9C672`, Lavender `#B097BE`, Blue `#89B1CC`, Black `#0A0A0A`, Parchment `#F1E9D2`)
- The theme constants in `src/constants/theme.ts`
- The Tailwind font classes (`font-serif-light`, `font-sans-medium`, etc.)

---

## 3. BRAND RULES (NON-NEGOTIABLE)

1. **Font is Cormorant Garamond** for all headings and display text. NOT Playfair Display (that was the old font — it looked AI-generated).
2. **No em dashes (—)** anywhere in copy. They make the site look AI-written.
3. **Every page must alternate dark (`#0A0A0A`) and parchment (`#F1E9D2`) sections.** No page should be entirely one colour.
4. **Cover/hero images are ONLY used in the hero section** of their respective page. They must NOT be reused as tab items or carousel images in the work sections.
5. **The website must NOT look AI-generated.** Typography, copy, and design decisions must feel human and intentional.
6. **Light sections use dark ink text.** When a section has `background: #F1E9D2`, all text must use dark colours like `#1a1a1a` and `rgba(26,26,26,0.65)`. Never use `text-white` on a parchment background.

---

## 4. ALL PATHS GIVEN BY THE CLIENT

### Local Desktop Paths

```
BASE = C:\Users\Thevaki\Desktop\Design Management & Projects\Client Projects\
```

| Path | What's Inside | Copied to Public? |
|------|--------------|-------------------|
| `BASE\Kishore's Portfolio Website\` | Full Next.js app. Key files: `src/components/NavigationWheel.tsx` (live draggable wheel), `src/components/GaugeMeter.tsx` (K29 logo + SQUASH/SPACE), `public/logo.png` (K29 logo), `public/icon-gradient.png` | ✅ `public/images/kishore-logo.png` and `kishore-icon.png` |
| `BASE\NDC\nandhinidc.com\` | Full React app. Key: `src/pages/Index.tsx` (full homepage code), `src/index.css` (colour tokens, fonts), `src/components/ndc/Nav.tsx`, architecture images in `src/assets/` | ✅ Images in `public/images/nandhinidc/` |
| `BASE\Sooraj Linkedin\` | 3 PNGs: `Green and White Minimalist Business Profile...png` (FINAL banner), `Try only if 5 doesnt work.png` (alt direction), `A man may die...png` (DO NOT USE — removed from page) | ✅ `public/images/sooraj/linkedin/` |
| `BASE\Sooraj's Candy merch\` | `Candymerch.jpg`, `With slight texture.png`, `Without texture.png`, 3 WhatsApp ref JPEGs | ✅ `public/images/sooraj/candy/` |
| `BASE\Sooraj'sWantedCarousel\` | `slide-1.png` through `slide-8.png` (8 Wanted poster LinkedIn carousel slides) | ✅ `public/images/sooraj/carousel/` |
| `BASE\SSJC Tournament\` | 4 lanyard PNGs (front+back, Retro Purple + Cyber Blue), 4 WhatsApp JPEGs (t-shirt designs x2, GAME ON posters x2). Also: `medal print-20260515.../` subfolder with 384 medal files at ~18MB each | ✅ `public/images/ssjc/` (t-shirts, posters, lanyards front+back, medals compressed) |
| `BASE\Thevaki's Portfolio Website\` | Full portfolio site. CRITICAL sub-paths: `public/Bloom-Brew/` (IA, user journey, 4 user flows, wireframe screens), `public/Kishore'sPortfolioWebsite/` (IA, user flow, wireframe, journey map), `public/TheExtras/` (Aadharsham PDF, candy merch, LinkedIn banners) | ✅ Process assets in `public/images/bloom-process/` and `public/images/kishore-process/` |
| `BASE\AadharshamPhotography-Booklet Collage.pdf` | 16MB photography booklet PDF. NOTE: cannot be read without `pdftoppm` tool which is not installed | ❌ Cannot extract pages — placeholder page built |

### Google Drive URLs (for reference only — these were shared early in the project)

```
https://drive.google.com/drive/folders/1-Z6iOZ1shWkOFvd9_OtF03iu57PzSlpG?usp=sharing
https://drive.google.com/drive/folders/1f-GkwiW73aPqg7Bh1p0TzXddgBMv4B5H?usp=sharing
```

The Drive folder `1f-GkwiW73...` contains:
- `Midas (Eng)_2.mp4` (33MB) — needs to be downloaded to `public/videos/` for the motion design page (**NOT DONE**)
- Old SSJC + Sooraj image files (these were mislabelled — the correct images are now from the Desktop folder above)

---

## 5. WHAT THE PROJECTS ARE (AND FACTUAL CORRECTIONS)

| Project | What It Is | Country | Discipline | Key Facts |
|---------|-----------|---------|-----------|-----------|
| Bloom & Brew | Coffee Company merchify store | Canada | Web Dev | Custom Liquid, 3 markets day 1, bloomandbrewcoffeecompany.ca |
| NandhiniDC | Interior Architecture Studio website | India | Web Design | Built in honour of founder's late sister Nandhini. Forest green + gold. Vastu philosophy. Tamil watermark நந்தினி. Actual site: nandhinidc.com |
| Kishore Aravind | K29 Performance Architecture portfolio | **Malaysia** (NOT UK) | Web Design & UX | Squash coach + designer dual identity. Draggable NavWheel. Kinetic red + cyan. NOT Arconia Archive (that is Thevaki's personal portfolio) |
| Sooraj — LinkedIn Banner | Career brand design | Ireland | Career Brand | Sooraj is a **Data & AI Graduate** (Python, AWS, Power BI, 4× international publications, MSc University of Galway). **NOT an entrepreneur**. Banner to help him get hired. |
| The Generation Conversation | LinkedIn content for event attendance | Ireland | Social Media | Sooraj **attended** the Generation Conversation event at PorterShed Galway (AIB + Local Enterprise Office). He did NOT organise it. 8 Wanted poster slides built overnight for his LinkedIn. |
| Kingdom of Sweets | Event arch banner for candy merch | Ireland | Brand Identity + Print | Arch banner design for Sooraj Nikam's candy merch. Two versions: with texture + without texture. |
| SSJC Tournament | Full event identity for junior squash circuit | **Malaysia** | Print + merch | 10th redONE Mobile Selangor Super Junior Circuit. Two legs: Leg 1 = Retro Purple & Pink Neon, Leg 2 = Cyber Blue & Green. GAME ON gaming concept. Deliverables: T-shirts (2), Event posters (2), Lanyards (front+back, 2), Medals (384 files, 6 age categories), Event banner (coming soon) |
| Aadharsham Photography | Photography booklet editorial design | India | Editorial + Print | 16MB PDF booklet exists. No pages extractable without pdftoppm tool. Case study is a placeholder. |
| Visual Communication | Print + advertising studio work | — | Print + Advertising | BenzPoster, LoveArtPoster, Posters collection, Brand Guidelines, Issac the print designer |
| Conceptual Art | High-detail illustration studio work | — | Illustration | Dragon.jpg, MotherNature, GrandTheatreOfCreation, SkullFace, MysticalPanda, Woman, Indhupriya |
| Sequential Art | Comics + storytelling studio work | — | Comics | DogComic, IcecreamComic, MeditationComic — shown as 3 separate SCROLLABLE sections (NOT carousel) |
| AI Canvas | Generative art + motion studio work | — | AI + Motion | AIImageStory, Akash AI visual, Delwin motion design. Philosophy: the prompt is a brief; the designer is always in the room |

---

## 6. COMPLETE ROUTE MAP

```
/                                    → HomePage.tsx
/about                               → AboutPage.tsx → Introtext + Team + TheWhy + ComparisonSection + Steps + FAQ
/featured-work                       → FeaturedWork.tsx (Hero → Orrery → Studio grid → CTA)
/featured-work/bloom-brew            → BloomAndBrewPage.tsx
/featured-work/nandhinidc            → NandhiniDCPage.tsx
/featured-work/kishore-portfolio     → KishorePortfolioPage.tsx
/featured-work/sooraj-linkedin       → SoorajLinkedInPage.tsx
/featured-work/sooraj-wanted         → SoorajWantedCarouselPage.tsx
/featured-work/sooraj-candy-merch     → merchSoorajCandyshopPage.tsx
/featured-work/ssjc-tournament       → SSJCTournamentPage.tsx
/featured-work/aadharsham            → AadharshamPage.tsx
/featured-work/visual-communication  → Posters.tsx
/featured-work/conceptual-art        → ConceptualAnatomy.tsx
/featured-work/sequential-art        → Comic.tsx
/featured-work/ai-canvas             → AICanvas.tsx
/featured-work/nicheux-narrative     → NicheUXNarrativePage.tsx (kept but removed from grid)
/services                            → ServicesPage.tsx
/strategy-design                     → StrategyAndDesignPage.tsx
/web-development-ecommerce           → WebDevelopmentAndECommercePage.tsx
/print-brand-design                  → PrintAndBrandDesignPage.tsx
/social-media-marketing              → SocialMediaMarketingPage.tsx
/motion-design-ai-visuals            → MotionDesignAIVisualsPage.tsx
/illustration-character-design       → IllustrationCharacterDesignPage.tsx
/contact                             → ContactPage.tsx
/terms /privacy /cookies             → Legal pages
```

---

## 7. PUBLIC IMAGES FOLDER STRUCTURE

```
public/images/
├── bloombrewhero.webp               ← Bloom & Brew hero
├── kishore-k29.jpg                  ← K29 screenshot (compressed from 4.4MB)
├── kishore-logo.png                 ← K29 logo (from Kishore's Portfolio Website)
├── Dragon.jpg                       ← NicheUX origin art (compressed from 4.6MB)
├── ComicHeroWork.jpg                ← Comic hero (compressed)
├── ConceptualArtHeroWork.jpg        ← Conceptual art hero (compressed)
├── MotherNature.jpg                 ← Conceptual art (compressed)
├── AIHeroWork.jpg                   ← AI canvas hero (compressed)
├── PrintBrandHeroWork.webp          ← Visual communication hero
├── GrandTheatreOfCreation.webp      ← NicheUX team artwork
├── bloom-process/                   ← FROM Thevaki's Portfolio Website
│   ├── ia.png                       ← Bloom & Brew Information Architecture
│   ├── journey.png                  ← User Journey Map
│   ├── flow-primary.png             ← Primary user flow
│   ├── flow-quote.png               ← Event planner flow
│   ├── flow-edge.png                ← Dietary restriction edge case
│   ├── flow-error.png               ← Out of stock error flow
│   ├── screen-home.png              ← Homepage wireframe
│   ├── screen-product.png           ← Product page wireframe
│   ├── screen-cart.png              ← Cart wireframe
│   └── screen-merch.png              ← merch wireframe
├── kishore-process/                 ← FROM Thevaki's Portfolio Website
│   ├── ia.png                       ← K29 Information Architecture
│   ├── flow.png                     ← K29 User Flow
│   ├── journey.png                  ← K29 User Journey Map
│   └── wireframe.png                ← K29 Wireframe (low-fidelity)
├── nandhinidc/                      ← Architecture photos from NDC Drive
│   ├── stone-facade-1.webp ... stone-facade-10.webp
│   ├── stone-int-01.webp ... stone-int-08.webp
│   ├── chidambaram-1.webp ... -3.webp
│   ├── nannilam-1.webp ... -3.webp
│   └── thirunageshwaram-1.webp -2.webp
├── ssjc/
│   ├── tshirt-leg1.jpeg             ← Retro Purple T-shirt (Leg 1)
│   ├── tshirt-leg2.jpeg             ← Cyber Blue T-shirt (Leg 2)
│   ├── poster-leg1.jpeg             ← GAME ON poster Leg 1
│   ├── poster-leg2.jpeg             ← GAME ON poster Leg 2
│   ├── lanyard-purple.png           ← Retro Purple lanyard FRONT
│   ├── lanyard-purple-back.png      ← Retro Purple lanyard BACK
│   ├── lanyard-blue.png             ← Cyber Blue lanyard FRONT
│   ├── lanyard-blue-back.png        ← Cyber Blue lanyard BACK
│   ├── medal-leg1.jpg               ← Boys U11 Retro Purple medal (compressed 18MB → 1MB)
│   └── medal-leg2.jpg               ← Boys U11 Cyber Blue medal (compressed 19MB → 1.1MB)
└── sooraj/
    ├── linkedin/
    │   ├── banner-green.png         ← FINAL direction (green + white)
    │   └── banner-alt.png           ← Alternative direction
    ├── carousel/
    │   ├── slide-1.png ... slide-8.png  ← Wanted poster LinkedIn slides
    └── candy/
        ├── main.jpg                 ← Candymerch.jpg main arch banner
        ├── texture.png              ← With texture version
        ├── no-texture.png           ← Without texture version
        └── ref-1.jpeg ... ref-3.jpeg
```

---

## 8. WHAT'S BEEN BUILT AND ITS STATE

### FeaturedWork.tsx
- **Structure:** Dark hero (Stage Productions, "Every story, staged.") → Parchment orrery → Dark studio grid → Dark CTA
- **Orrery:** SVG-based, 1000×1000 viewBox. 7 client projects as planets. Active indicator at 3 o'clock (right). Left/right arrow buttons. Keyboard accessible (ArrowLeft/Right). Auto-advances every 4s. Pauses on hover.
- **Studio grid:** 4-column grid for Visual Communication, Conceptual Art, Sequential Art, AI Canvas

### Bloom & Brew (`BloomAndBrewPage.tsx`)
- Has: Dark hero → Parchment IA → Parchment User Journey → Parchment 4 User Flows → Dark device mockup (laptop+mobile toggle, real screenshots) → Parchment decisions → Dark outcome + Priya R. quote
- Missing: Personas, research methodology, competitive analysis, usability testing details, full metrics breakdown

### NandhiniDC (`NandhiniDCPage.tsx`)
- Has: Dark hero → Parchment website mockup (rebuilt from actual source code) → Dark daylight toggle → Dark project galleries → Parchment decisions
- The website mockup renders: real stone-facade photo, exact gradient overlays from Index.tsx, blueprint grid, Tamil watermark நந்தினி in vertical writing mode, correct stats, marquee, project reel with real photos
- Missing: Personas, research, design process documentation

### Kishore (`KishorePortfolioPage.tsx`)
- Has: Dark hero → Parchment brief → Navigation Concept (6-section grid) → Parchment Process (IA, Flow, Journey+Wireframe side by side) → Dark 3D laptop mockup + Live K29NavWheel → Parchment decisions (white cards) → Dark outcome
- The NavWheel is a live draggable component adapted from `NavigationWheel.tsx`
- The laptop mockup shows: real K29 logo, SQUASH (kinetic red) + SPACE (systematic cyan) in Orbitron font, dark navy background, grid overlay
- Missing: Personas, research, usability testing, quantified metrics

### Sooraj LinkedIn (`SoorajLinkedInPage.tsx`)
- Has: Dark hero → Dark title block → Dark brief (Data & AI Graduate framing) → Parchment banner 1 (Final Direction) → Dark banner 2 (Alternative) → Parchment decisions (white cards) → Dark outcome → Dark next
- NO TABS — both banners shown as scrollable sections to avoid tab layout bug
- Missing: Persona for Sooraj as job seeker, competitive analysis of LinkedIn profiles, outcome metrics

### Sooraj Wanted (`SoorajWantedCarouselPage.tsx`)
- Has: Dark hero (4AM badge) → Dark title → Parchment brief (correct: he attended, didn't organise) → Dark 8-slide carousel (arrows work — backslash bug fixed) → Parchment decisions (white cards) → Dark stat callout → Dark outcome → Dark next
- Missing: Platform strategy notes, engagement metrics if known

### Kingdom of Sweets (`merchSoorajCandyshopPage.tsx`)
- Has: Dark hero → Dark title → Parchment brief (dark text) → Dark texture toggle (without/with, buttons below heading, NOT floating) → Dark main design → Dark decisions → Dark outcome
- Floating label bug FIXED — buttons now in column below heading, NOT in flex justify-between row
- Missing: Heritage aesthetic process notes, colour/typography documentation

### SSJC (`SSJCTournamentPage.tsx`)
- Has: Dark hero → Dark title → Dark concept (Leg 1/Leg 2 system) → Parchment posters (2 sections) → Dark t-shirts → Parchment lanyards (front+back) → Dark medals (real images) + event banner placeholder → Parchment decisions → Dark outcome
- All 6 deliverables in separate sections — NO carousel
- Missing: Brief analysis, print specification breakdown, client brief context

### Aadharsham (`AadharshamPage.tsx`)
- Is a placeholder: Dark hero → Parchment brief (dark text) → Dark "case study in production" placeholder
- No assets can be extracted from the PDF without pdftoppm tool

### Visual Communication (`Posters.tsx`)
- Has: Dark hero → Dark title → Dark discipline → Dark tab viewer (BenzPoster, LoveArtPoster, Posters, Brand Guidelines, Issac photo) → Dark decisions → Dark CTA
- Missing: Light section. Client context. Brief. Outcomes.
- **KNOWN ISSUE:** ComicHeroWork-style hero images may be in work viewer tabs — CHECK

### Conceptual Art (`ConceptualAnatomy.tsx`)
- Has: Dark hero → Dark title → Dark discipline → Dark tab viewer (many illustration images) → Dark decisions → Dark CTA
- Missing: Light section. Client context.

### Sequential Art (`Comic.tsx`)
- Has: Dark hero → Dark title → Dark discipline → Parchment 3 scrollable comic sections (DogComic, IcecreamComic, MeditationComic each alternating) → Dark principles → Parchment CTA
- Cover image (ComicHeroWork.jpg) is ONLY in hero — NOT repeated in work sections ✅

### AI Canvas (`AICanvas.tsx`)
- Has: Dark hero → Dark title → Dark discipline → Dark work tabs → Dark stat bar → Dark decisions → Dark CTA
- Missing: Light section.

### NicheUX Narrative (`NicheUXNarrativePage.tsx`)
- Has: Dark hero (Dragon.jpg) → Dark title → Parchment origin story + Dragon image → Dark posts (5 social media cards) → Parchment team reveal
- Removed from FeaturedWork grid but route still exists

### About Page
- Sections: Introtext (animated dark) → Team (dark, has full-bleed GrandTheatreOfCreation image) → TheWhy (dark) → ComparisonSection (parchment, dark text fixed) → Steps (dark) → FAQ (parchment, white accordion cards)

---

## 9. KNOWN BUGS AND ISSUES

| Bug | Location | Status |
|-----|---------|--------|
| Floating "With texture" / "Without texture" label | `merchSoorajCandyshopPage.tsx` — was caused by `flex justify-between` container pushing buttons to viewport edge | ✅ FIXED — buttons now in column below heading |
| Tab buttons rendering as vertical list | Was caused by `flex flex-wrap` in tab containers | ✅ FIXED for LinkedIn (removed tabs entirely). Check other pages. |
| Carousel arrows not working | `SoorajWantedCarouselPage.tsx` — backslash corruption `top-1\2` instead of `top-1/2` | ✅ FIXED |
| Orrery centre text invisible | Font sizes too small in SVG | ✅ FIXED — production number 32px, title 54-60px, discipline 18px, CTA rect 260×46px |
| White text on parchment backgrounds | Multiple pages after parchment was added to previously dark sections | ⚠️ PARTIALLY FIXED — check any section where background was changed to parchment |
| Em dash sentence breaks | " — " replaced with ". " created broken sentences like "from medal. part of one system." | ⚠️ PARTIALLY FIXED — most major ones fixed, some may remain |
| SSJC images were Sooraj's carousel | `ssjc/1-5.png` were the Generation Conversation Wanted poster images | ✅ FIXED — replaced with actual SSJC assets |
| Medal files 18MB each | Cannot load on normal internet | ✅ FIXED — compressed to 1MB JPEG |
| Playfair Display font | Made site look AI-generated | ✅ FIXED — changed to Cormorant Garamond globally |

---

## 10. WHAT STILL NEEDS TO BE DONE (PRIORITISED)

### Priority 1 — Missing Pages (Never Built)

1. **merch / Custom Products page** — Products NicheUX sells (branded merch, custom design items)
2. **Blog page** — editorial content, process articles, case study write-ups  
3. **Gallery page** — client-submitted photos and videos of NicheUX work in use
4. **Announcement bar content** — `AnnouncementStrip.tsx` exists but has no real content. Add: discount codes, upcoming expos, events, studio news

### Priority 2 — Case Study Detail (Biggest Gap)

Every case study needs to reach the level of Thevaki's Bloom & Brew portfolio case study, which included:

```
✅ Business context (client background, goals, KPIs, constraints)
✅ User personas (3 personas — pain points, behaviours, needs)
✅ User journey (emotional arc, obstacles, breakthroughs per stage)  
✅ Research methodology (interviews, observation, competitive analysis)
✅ Information Architecture diagram
✅ User Flow diagrams (primary + edge cases + error states)
✅ Interaction design notes (micro-animations, hover states)
✅ Wireframes (mobile-first, all key pages)
✅ Design system (colour palette, type scale, components, accessibility)
✅ Usability testing (users, tasks, rounds of revision, what changed)
✅ Quantified outcomes (conversion +133%, AOV +50%, email signups +642%)
✅ Learnings (retrospective insights)
```

**Current state by project:**

| Project | What Exists | What's Missing |
|---------|------------|----------------|
| Bloom & Brew | IA, journey, 4 flows, device mockup | Personas, research, wireframes, testing, metrics |
| Kishore | IA, flow, wireframe, journey, live NavWheel | Personas, research, design system, testing, metrics |
| NandhiniDC | Website mockup, daylight study, project galleries | Personas, IA, wireframes, research, testing, outcomes |
| Sooraj LinkedIn | 2 banner sections, decisions | Persona (graduate job seeker), platform research, metrics |
| Sooraj Wanted | 8-slide carousel, brief, decisions | Platform strategy, overnight process notes |
| Kingdom of Sweets | Texture toggle, brief, decisions | Design exploration process, colour/type system |
| SSJC | 6 deliverable sections, decisions, outcomes | Brief analysis, print specifications, client context |
| Aadharsham | Placeholder only | Everything — needs PDF extraction |
| Visual Communication | Image viewer, discipline write-up | Client context, brief, outcomes, light section |
| Conceptual Art | Image viewer, discipline write-up | Client context, brief, outcomes, light section |
| Sequential Art | 3 scrollable strips + principles | Platform strategy, engagement data |
| AI Canvas | Image viewer, philosophy | Specific project context, outcomes, light section |

### Priority 3 — Outstanding Fixes

1. **Alt text on all images** — comprehensive pass needed. Run: `Get-ChildItem src -Recurse -Filter "*.tsx" | Select-String '<img(?![^>]*\balt=)'`
2. **Remaining em dash sentence breaks** — search for `. [a-z]` patterns that are clearly broken sentences
3. **Carousel arrows** — verify LinkedIn banner viewer arrows work. Bloom & Brew device mockup arrows work.
4. **Keyboard accessibility** — all tabs, carousels, interactive elements (not just orrery)
5. **Cover images check** — ensure Visual Communication, Conceptual Art, AI Canvas pages do NOT use `PrintBrandHeroWork.webp` / `ConceptualArtHeroWork.jpg` / `AIHeroWork.jpg` as first tab in their work viewer
6. **Midas.mp4** — needs to be downloaded from Drive and placed in `public/videos/Midas (Eng)_2.mp4` for the motion design service page

### Priority 4 — Backend / Infrastructure

1. **Contact form end-to-end test** — has not been tested in production. Needs to verify Notion form submission works
2. **Notion testimonials** — `GET /api/get-testimonials` endpoint added to server.js. Testimonials.tsx now fetches from it. Needs real `TESTIMONIALS_DATABASE_ID` and `TESTIMONIALS_TOKEN` in `.env` to work
3. **Domain email** — hellonicheux@gmail.com → hello@nicheux.com (Google Workspace setup — not a code task)
4. **SEO / JS rendering** — site is a client-side SPA. Google cannot crawl content. Long-term fix: migrate to Next.js with SSG/SSR.

---

## 11. SERVER AND ENV SETUP

The backend is `server.js` (Express). It runs on port 3003.

Required `.env` variables:
```
NOTION_TOKEN=           ← Main Notion integration token
NOTION_DATABASE_ID=     ← Contact form database ID  
TESTIMONIALS_TOKEN=     ← Testimonials Notion token (or same as NOTION_TOKEN)
TESTIMONIALS_DATABASE_ID= ← Testimonials database ID
PORT=3003
```

API endpoints:
```
POST /api/submit-to-notion       ← Main contact form
POST /api/submit-testimonial     ← Client testimonial submission
POST /api/submit-simple-contact  ← Simple message form
GET  /api/get-testimonials       ← Fetch approved testimonials (NEWLY ADDED)
```

---

## 12. KEY COMPONENT LOCATIONS

| Component | File | Notes |
|-----------|------|-------|
| Orrery (revolving planets) | `src/pages/FeaturedWork.tsx` — `OrreryShowcase` function | SVG, 1000×1000 viewBox, parchment bg |
| K29 NavWheel (live) | `KishorePortfolioPage.tsx` — `K29NavWheelDisplay` function | Adapted from Kishore's actual NavigationWheel.tsx |
| K29 GaugeMeter (live) | Inside `K29HeroPreview` in KishorePortfolioPage | Uses `/images/kishore-logo.png` |
| NDC website mockup | `NandhiniDCPage.tsx` — "THE WEBSITE" section | Built from actual Index.tsx source code |
| Spotlight cursor | `FeaturedWork.tsx` — `SpotlightCursor` function | Fixed position, gold glow follows mouse |
| Orbital ring (hero bg) | `FeaturedWork.tsx` — `OrbitalRing` function | Slow-rotating SVG textPath ring |
| Announcement bar | `src/components/ui/AnnouncementStrip.tsx` | EXISTS but has no real content |
| Theme constants | `src/constants/theme.ts` | Gold, Lavender, Blue, Black, Parchment, INK etc |
| Notion service | `src/services/notionService.ts` | Form submission helpers |
| Pricing service | `src/utils/pricingService.ts` | 75-country pricing with purchasing power index |

---

## 13. STUDIO GOALS AND SUCCESS METRICS

The website exists to:

1. **Convert first-time visitors** — someone landing on nicheux.com should understand within 10 seconds: what we do, that we're credible, and how to start a project
2. **Warm up recurring clients** — the site should feel familiar and personal to existing clients, not corporate
3. **Win trust** — case studies with real outcomes, real work, real client names build trust that a brochure page cannot
4. **Win awards** — the design should be award-winning quality (think Awwwards, CSSDA level)
5. **Tell stories** — "Where design meets storytelling" must be evident in every page structure, not just the tagline

**The brand promise:** Every brief we take becomes a story. Every story deserves a stage.

---

## 14. WHAT NOT TO DO

- **Do not** add "—" (em dashes) anywhere. Replace with comma, full stop, or restructure the sentence.
- **Do not** use `bg-gray-50`, `bg-white` as section backgrounds unless it's a card inside a section. Sections should be `#0A0A0A` (dark) or `#F1E9D2` (parchment) only.
- **Do not** use `text-white` or `text-white/60` on a parchment background section. This will make text invisible.
- **Do not** use `flex justify-between flex-wrap` when one item contains text and the other is a button/toggle — this causes the button to escape to the viewport edge on wide screens. Use a column layout instead.
- **Do not** reuse hero/cover images inside the work sections of their own pages.
- **Do not** change the font from Cormorant Garamond back to Playfair Display.
- **Do not** change the colour constants in `src/constants/theme.ts`.
- **Do not** use inline `fontFamily: "'Playfair Display'"` — it has been replaced globally. Always use `'Cormorant Garamond'`.

---

*This document should be treated as the single source of truth for the NicheUX project. Update it whenever significant work is done or a new decision is made.*
