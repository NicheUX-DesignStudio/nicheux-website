// Print & Brand Design Page
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GOLD, LAVENDER, BLUE, BLACK, PARCHMENT, INK, INK_SOFT, INK_MUTED } from "@/constants/theme";
import {
  Eyebrow, PrimaryButton, SecondaryButton,
  ServiceSection, ContentContainer, BackgroundNumeral,
} from "@/components/service/ServicePagePrimitives";
import { useCountryPricing } from "../hooks/useCountryPricing";
import WorkStrip from "@/components/service/WorkStrip";
import ServiceStatStrip, { ServiceStat } from "@/components/service/ServiceStatStrip";
import BeforeAfterSection, { ComparisonPair } from "@/components/service/BeforeAfterSection";
import ServiceTabs, { ServiceTabGroup } from "@/components/service/ServiceTabs";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const ACCENT = GOLD;

const PRINT_TABS: ServiceTabGroup[] = [
  { label: "Brand Identity", items: [
    { name: "Logo Design", serviceId: "Logo Design", desc: "3 concepts, 2 revisions, final files in all formats", accent: GOLD },
    { name: "Basic Brand Kit", serviceId: "Basic Brand Kit", desc: "Logo, colours, typography, and basic brand guidelines", accent: LAVENDER },
    { name: "Complete Brand Identity", serviceId: "Complete Brand Identity", desc: "Full brand system with comprehensive guidelines", accent: BLUE },
    { name: "Brand Guidelines Document", serviceId: "Brand Guidelines Document", desc: "Detailed usage rules and specifications", accent: GOLD },
  ]},
  { label: "Brochures & Print", items: [
    { name: "4-page Brochure", serviceId: "4-page Brochure", desc: "Standard tri-fold or bi-fold brochure" },
    { name: "8-page Brochure", serviceId: "8-page Brochure", desc: "Perfect for product catalogs" },
    { name: "12-page Catalogue", serviceId: "12-page Catalogue", desc: "Comprehensive product showcase" },
    { name: "16-page Catalogue", serviceId: "16-page Catalogue", desc: "Extensive brand storytelling" },
    { name: "Custom folds", serviceId: "Custom folds", desc: "Z-fold, Gate fold, and premium options" },
    { name: "Single-sided Flyer", serviceId: "Single-sided Flyer", desc: "Standard A5 or A4 promotional flyer" },
    { name: "Double-sided Flyer", serviceId: "Double-sided Flyer", desc: "Front and back design" },
    { name: "Poster (up to A2)", serviceId: "Poster (up to A2)", desc: "Large format attention-grabber" },
  ]},
  { label: "Digital & Stationery", items: [
    { name: "Social Media Kit", serviceId: "Social Media Kit", desc: "Set of 10 platform-optimised graphics" },
    { name: "Email Template", serviceId: "Email Template", desc: "Responsive email newsletter design" },
    { name: "Web Banners", serviceId: "Web Banners", desc: "Set of 5 banner ads in multiple sizes" },
    { name: "Presentation Design", serviceId: "Presentation Design", desc: "10-slide branded template" },
    { name: "Business Cards", serviceId: "Business Cards", desc: "Front and back, standard or premium stock" },
    { name: "Letterhead + Envelope", serviceId: "Letterhead + Envelope", desc: "Professional correspondence suite" },
    { name: "Presentation Folder", serviceId: "Presentation Folder", desc: "With pockets and custom branding" },
    { name: "Complete Stationery Suite", serviceId: "Complete Stationery Suite", desc: "Cards, letterhead, and envelope combined" },
  ]},
  { label: "Signage & Displays", items: [
    { name: "Pull-up Banner", serviceId: "Pull-up Banner", desc: "Retractable exhibition banner" },
    { name: "Retail Store Banner", serviceId: "Retail Store Banner", desc: "Storefront or in-store display" },
    { name: "Window Graphics", serviceId: "Window Graphics", desc: "Frosted or full-colour prints" },
    { name: "Billboard Design", serviceId: "Billboard Design", desc: "Large-scale outdoor advertising" },
  ]},
  { label: "Menus", items: [
    { name: "Menu (4 pages)", serviceId: "Menu (4 pages)", desc: "Restaurant or cafe menu" },
    { name: "Main Menu (4 pages)", serviceId: "Main Menu (4 pages)", desc: "Complete food menu" },
    { name: "Drinks Menu", serviceId: "Drinks Menu", desc: "Beverage and wine list" },
    { name: "Specials Board", serviceId: "Specials Board", desc: "Daily or weekly specials design" },
    { name: "Takeaway Menu", serviceId: "Takeaway Menu", desc: "Optimised for takeout and delivery" },
  ]},
];

const COMPARISONS: ComparisonPair[] = [
  { label: "Brand Identity", beforeSrc: "/images/diagnostics/print-brand-before.png", afterSrc: "/images/diagnostics/print-brand-after.png", beforeCaption: "Weak branding that blends in and fails to communicate what makes you different.", afterCaption: "A bold brand identity that people remember, reference, and want to show others." },
  { label: "File Preparation", beforeSrc: "/images/diagnostics/print-file-before.png", afterSrc: "/images/diagnostics/print-file-after.png", beforeCaption: "RGB files, wrong bleed, low resolution. Reprints that cost thousands.", afterCaption: "Print-ready files built to exact spec. First-time production with zero reprints." },
  { label: "Collateral Suite", beforeSrc: "/images/diagnostics/print-scatter-before.png", afterSrc: "/images/diagnostics/print-scatter-after.png", beforeCaption: "Scattered materials from different designers. Nothing feels like it belongs together.", afterCaption: "A cohesive print suite where every piece reinforces the same brand story." },
];
const SERVICE_STATS: [ServiceStat, ServiceStat, ServiceStat, ServiceStat] = [
  { display: "300", numericTarget: 300, label: "DPI minimum\nfor all print files" },
  { display: "9+", label: "Fold types\nwe design for" },
  { display: "CMYK", label: "Colour managed\nfor every printer" },
  { display: "0", label: "Stock imagery\never used" },
];
const go = (path: string) => { window.location.href = path; };

// ── PRINT TYPES DATA ──────────────────────────────────────────────────────────

const PRINT_CATEGORIES = [
  { category: "Brand Identity", items: [
    { src: "/images/LogoTaglineWhite.webp", bg: BLACK, label: "Logo Design", sub: "The mark people recognise before they read a single word" },
    { src: "/images/Brand%20Guidelines.webp", label: "Brand Guidelines", sub: "Complete visual identity system and usage rules" },
    { src: "/images/Visual%20Identity.webp", label: "Visual Identity", sub: "Colours, typography, and design elements" },
  ]},
  { category: "Business Essentials", items: [
    { src: "/images/BusinessCards.webp", label: "Business Cards", sub: "Front and back designs with premium finishes" },
    { src: "/images/Letterhead.webp", label: "Letterhead", sub: "Professional correspondence package" },
    { src: "/images/PresentationFolders.webp", label: "Presentation Folders", sub: "With pockets and custom branding" },
  ]},
  { category: "Marketing Materials", items: [
    { src: "/images/Brochures.webp", label: "Brochures", sub: "Various fold types for different stories" },
    { src: "/images/Flyers.webp", label: "Flyers", sub: "Single and double-sided promotional materials" },
    { src: "/images/Posters.webp", label: "Posters", sub: "From A4 to large format billboards" },
  ]},
  { category: "Digital Graphics", items: [
    { src: "/images/SocialMediaGraphics.webp", label: "Social Media Graphics", sub: "Platform-optimised digital marketing assets" },
    { src: "/images/EmailNewsletter.webp", label: "Email Templates", sub: "Professional email newsletter designs" },
    { src: "/images/WebBanner.webp", label: "Web Banners", sub: "Attention-grabbing online advertising" },
  ]},
  { category: "Restaurant & Retail", items: [
    { src: "/images/Menu.webp", label: "Menus", sub: "Food and drink menus that sell" },
    { src: "/images/Packaging.webp", label: "Packaging", sub: "Product packaging that stands out" },
    { src: "/images/Signage.webp", label: "Signage", sub: "Store and window signage solutions" },
  ]},
];

const FOLD_TYPES = [
  { src: "/images/Half%20Fold.webp", label: "Half Fold", description: "Simple and elegant, folds to two equal panels", perfectFor: "Invitations, menus, certificates", sub: "2 panels · half fold" },
  { src: "/images/Tri%20Fold.webp", label: "Tri-fold", description: "Standard brochure, familiar to everyone", perfectFor: "General information, product catalogs", sub: "3 panels · vertical fold" },
  { src: "/images/Z%20Fold.webp", label: "Z-fold", description: "Perfect for step-by-step processes", perfectFor: "Instruction guides, sequential storytelling", sub: "3 panels · zigzag fold" },
  { src: "/images/Accordion%20Fold.webp", label: "Accordion Fold", description: "Extended storytelling with maximum impact", perfectFor: "Timelines, maps, extended content", sub: "Multiple panels · expandable" },
  { src: "/images/3%20Panel%20Gate%20Fold.webp", label: "Gate Fold", description: "Dramatic reveal for premium products", perfectFor: "Luxury products, special announcements", sub: "4 panels · gate fold" },
  { src: "/images/Roll%20Fold.webp", label: "Roll Fold", description: "Sequential unfolding that creates anticipation", perfectFor: "Step-by-step guides, reveal stories", sub: "4 panels · sequential unfolding" },
  { src: "/images/Double%20Gate%20Fold.webp", label: "Double Gate Fold", description: "The ultimate premium reveal format", perfectFor: "Annual reports, premium catalogues", sub: "4 panels · premium reveal" },
  { src: "/images/Double%20Parallel%20Fold.webp", label: "Double Parallel Fold", description: "Compact and efficient multi-panel delivery", perfectFor: "Pocket guides, compact information sets", sub: "4 panels · compact delivery" },
  { src: "/images/Vertical%20Half%20Fold.webp", label: "Vertical Half Fold", description: "Tall and elegant, folds down the longer edge", perfectFor: "Restaurant menus, tall format materials", sub: "2 panels · vertical half fold" },
];

const FOLD_GUIDE = [
  { icon: "◉", label: "Basic Business Folds", desc: "Ideal for general business materials, product catalogs, and standard marketing collateral", folds: ["Tri-fold", "Half Fold", "Vertical Half Fold"], accent: BLUE },
  { icon: "↻", label: "Sequential Storytelling", desc: "Perfect for guiding readers through processes, timelines, or step-by-step information", folds: ["Z-fold", "Roll Fold", "Double Parallel Fold"], accent: LAVENDER },
  { icon: "★", label: "Premium Presentation", desc: "Designed for high-impact reveals, luxury products, and memorable first impressions", folds: ["Gate Fold", "Double Gate Fold", "Accordion Fold"], accent: GOLD },
];

// ── PAGE DATA ─────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  { title: "Wasted Printing Budget", desc: "Poor file preparation means costly reprints. Teams waste thousands on materials that can't be used because of technical errors." },
  { title: "Brand Inconsistency", desc: "Different fonts and colors across materials confuse customers and weaken your brand identity. Consistency builds trust." },
  { title: "Lost Opportunities", desc: "Unprofessional materials get discarded immediately. Great design makes people want to keep and share your collateral." },
];
const PROBLEM_BULLETS = ["No bleeds or crop marks", "RGB instead of CMYK", "72 DPI instead of 300 DPI", "Missing fonts or embedded links", "Incorrect bleed dimensions"];
const QUOTE = "Great print design isn't about following trends. It's about creating materials people want to keep and share.";

const PROCESS = [
  { num: "01", accent: GOLD, title: "Content Strategy & Format Selection", desc: "We start by understanding your message, audience, and goals to recommend the perfect print formats that tell your story effectively.", artifacts: ["Content Audit", "Format Recommendation", "Fold Type Selection", "Paper Stock Guidance"] },
  { num: "02", accent: LAVENDER, title: "Layout & Visual Design", desc: "We create professional layouts with proper hierarchy, typography, and branding that work seamlessly across all print materials.", artifacts: ["Wireframe Layout", "Typography System", "Image Optimisation", "Brand Consistency"] },
  { num: "03", accent: BLUE, title: "File Preparation & Quality Assurance", desc: "Every file is meticulously prepared for print with proper bleeds, colour management, and specifications to ensure perfect results.", artifacts: ["Print-Ready PDFs", "Colour Management", "Multiple Formats", "Print Specifications"] },
];

const PRINCIPLES = [
  { title: "Print Production Expertise", desc: "We understand bleeds, CMYK, spot colours, and printing techniques that make your materials stand out." },
  { title: "Brand Consistency", desc: "Every piece strengthens your visual identity across all touchpoints and materials." },
  { title: "Efficient File Preparation", desc: "Clean, organised files that printers love and that eliminate production errors." },
  { title: "Quality Guarantee", desc: "We test and verify every file for perfect results before they go to print." },
  { title: "Multi-Format Delivery", desc: "Print-ready PDFs, editable source files, and web-optimised versions included." },
  { title: "Realistic Timelines", desc: "Clear deadlines we actually meet, with regular updates throughout the process." },
];

const PACKAGES = [
  { name: "Starter Brand Kit", serviceId: "Starter Brand Kit", desc: "Essential branding for new businesses", features: ["Logo Design", "Business Cards", "Basic Brand Guidelines", "Social Media Kit"], accent: GOLD },
  { name: "Complete Brand Launch", serviceId: "Complete Brand Launch", desc: "Complete brand identity and marketing materials", features: ["Full Brand Identity", "Stationery Suite", "Marketing Brochure", "Digital Graphics Package"], accent: LAVENDER, highlighted: true },
  { name: "Marketing Pro Package", serviceId: "Marketing Pro Package", desc: "Professional marketing collateral package", features: ["Brochure + Flyers", "Social Media Kit", "Email Templates", "Presentation Design"], accent: BLUE },
];

const FAQS = [
  { q: "How do I know which fold to choose?", a: "It depends on your content and goals. Tri-folds and half-folds work for most standard brochures. Gate folds and accordion folds are better for premium reveals and detailed content. Use our fold guide above or share your content and we'll recommend the right format." },
  { q: "What file formats will I receive?", a: "Print-ready PDFs with correct bleeds and crop marks, editable AI or PSD source files, web-optimised JPEG/PNG versions, and brand colour values in HEX, RGB, CMYK, and Pantone where applicable." },
  { q: "Can you work with our existing brand?", a: "Yes. We can extend, refresh, or adapt your existing brand assets while preserving what's already established. We'll start with a brand audit and discuss what should stay and what should evolve." },
  { q: "Do you handle the printing?", a: "We prepare all print-ready files and can recommend trusted UK and international print suppliers. Managing the print relationship directly is available as a paid add-on." },
  { q: "What's your revision process?", a: "Every project includes 2 full rounds of revisions. We structure the process so the direction is confirmed before detailed execution begins, which keeps revisions focused and efficient." },
];

// ── FOLD VIEWER COMPONENT ─────────────────────────────────────────────────────

function FoldViewer() {
  const [selected, setSelected] = useState(0);
  const current = FOLD_TYPES[selected];
  const total = FOLD_TYPES.length;
  return (
    <div className="fold-viewer" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "clamp(16px,2vw,28px)", alignItems: "start" }}>
      <style>{`@media(max-width:900px){.fold-viewer{grid-template-columns:1fr!important}.fold-list{max-height:none!important;display:grid!important;grid-template-columns:repeat(2,1fr)!important;gap:4px!important}}`}</style>
      <div style={{ border: `1px solid ${INK}12`, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#F1E9D2" }}>
          <img key={current.src} src={current.src} alt={current.label} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "clamp(12px,3%,32px)" }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15"; }} />
          <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button onClick={() => setSelected(s => Math.max(0, s - 1))} style={{ background: "rgba(255,255,255,0.85)", border: "none", width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: selected === 0 ? 0.3 : 1 }}>
              <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 5L5 1L9 5" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </button>
            <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.9)", background: "rgba(0,0,0,0.45)", padding: "4px 8px", textAlign: "center", writingMode: "vertical-rl" }}>{selected + 1} / {total}</div>
            <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.45)", padding: "4px 8px", writingMode: "vertical-rl" }}>SCROLL</div>
            <button onClick={() => setSelected(s => Math.min(total - 1, s + 1))} style={{ background: "rgba(255,255,255,0.85)", border: "none", width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: selected === total - 1 ? 0.3 : 1 }}>
              <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1L5 5L9 1" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </button>
          </div>
        </div>
        <div style={{ padding: "clamp(20px,2.5vw,32px)", background: PARCHMENT }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(22px,2.5vw,32px)", color: INK, margin: "0 0 8px 0", lineHeight: 1.1 }}>{current.label}</h3>
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 400, color: INK_SOFT, margin: "0 0 10px 0", lineHeight: 1.6 }}>{current.description}</p>
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 700, color: GOLD, margin: "0 0 14px 0" }}>Perfect for: {current.perfectFor}</p>
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `${INK}50`, margin: 0 }}>{current.sub}</p>
        </div>
      </div>
      <div className="fold-list" style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 560, overflowY: "auto" }}>
        {FOLD_TYPES.map((fold, i) => (
          <button key={fold.label} onClick={() => setSelected(i)} style={{ display: "grid", gridTemplateColumns: "56px 1fr 24px", gap: 12, alignItems: "center", padding: "clamp(10px,1.2vw,14px)", background: selected === i ? `${GOLD}08` : PARCHMENT, border: `1px solid ${selected === i ? GOLD + "40" : INK + "10"}`, cursor: "pointer", textAlign: "left", transition: "background 0.15s ease, border-color 0.15s ease" }} onMouseEnter={e => { if (i !== selected) (e.currentTarget as HTMLElement).style.background = `${INK}06`; }} onMouseLeave={e => { if (i !== selected) (e.currentTarget as HTMLElement).style.background = PARCHMENT; }}>
            <div style={{ width: 56, height: 56, overflow: "hidden", border: `1px solid ${INK}10`, flexShrink: 0, background: "#F1E9D2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={fold.src} alt={fold.label} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15"; }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(13px,1.2vw,16px)", color: INK, marginBottom: 2, lineHeight: 1.2 }}>{fold.label}</div>
              <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, color: selected === i ? GOLD : INK_SOFT, marginBottom: 2, lineHeight: 1.3 }}>Perfect for: {fold.perfectFor.split(",")[0]}</div>
              <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: `${INK}45` }}>{fold.sub}</div>
            </div>
            {selected === i ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke={GOLD} strokeWidth="1.5" fill={`${GOLD}15`} /><path d="M6 10l3 3 5-5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1.5px solid ${INK}25`, flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── FAQ ITEM ──────────────────────────────────────────────────────────────────

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }} viewport={{ once: true }} className="faq-border" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "clamp(18px,2.5vw,28px) 0" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <h4 className="faq-q" style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.4, color: "#fff", margin: 0, textAlign: "left" }}>{faq.q}</h4>
        <div className="faq-icon" style={{ width: 24, height: 24, borderRadius: 2, border: `1px solid ${GOLD}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: open ? GOLD : "rgba(255,255,255,0.4)" }}>
          <Plus size={14} style={{ transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28, ease: EASE }} className="faq-a" style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: "16px 0 0", overflow: "hidden" }}>
            {faq.a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function PrintAndBrandDesignPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { getServicePrice, isLoading } = useCountryPricing();
  const price = (id: string) => isLoading ? "Loading..." : getServicePrice(id);

  return (
    <div style={{ backgroundColor: BLACK, color: "#fff" }}>
      <Helmet>
        <title>Print and Brand Design | NicheUX. Professional Print & Brand Design</title>
        <meta name="description" content="Professional print designs that make your brand tangible. From brochures to banners, we create digital files that print perfectly everywhere." />
        <link rel="canonical" href="https://nicheux.com/print-brand-design" />
      </Helmet>      <main id="main-content">

        {/* ── HERO ── */}
        <ServiceSection withSpotlight spotlightColor={ACCENT} borderTop={false} id="hero">
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <img src="/images/PrintBrandHero.webp" alt="" loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "saturate(0.45)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, rgba(19,19,19,0.98) 0%, rgba(19,19,19,0.88) 45%, rgba(19,19,19,0.5) 100%)" }} />
          </div>
          <motion.div ref={heroRef} style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1 }}>
            <ContentContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "clamp(24px,3vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "clamp(48px,7vw,96px)", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />Print, Brand & Graphic Design
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.35)" }}>Identity · Collateral · Production</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(48px,9vw,160px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
                Design That Jumps Off<br /><em style={{ color: ACCENT }}>The Page & Into Their Hands</em>
              </motion.h1>
              <div className="hero-print" style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "clamp(32px,5vw,80px)", marginTop: "clamp(48px,6vw,80px)", alignItems: "start" }}>
                <style>{`@media(max-width:768px){.hero-print{grid-template-columns:1fr!important}}`}</style>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(17px,1.6vw,22px)", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 clamp(32px,4vw,48px) 0", maxWidth: 640 }}>
                    Professional print designs that make your brand tangible. From brochures to banners, we create digital files that print perfectly everywhere.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <PrimaryButton onClick={() => go("/contact?selection=Print+%26+Brand+Design")}>Start Your Project</PrimaryButton>
                    <SecondaryButton onClick={() => navigate("/featured-work/ssjc-tournament")}>View Our Work</SecondaryButton>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }} style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: "clamp(0px,2vw,32px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  {[{ label: "File Formats", value: "AI · PDF · PNG · SVG" }, { label: "Colour Modes", value: "RGB · CMYK · Pantone" }, { label: "Turnaround", value: "7 to 14 business days" }, { label: "Starts From", value: price("Logo Design") }].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(14px,1.3vw,17px)", color: "#fff" }}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ContentContainer>
          </motion.div>
          <BackgroundNumeral value="IV" position="right" opacity={0.025} />
        </ServiceSection>

        <WorkStrip />

        <ServiceStatStrip stats={SERVICE_STATS} sectionLabel="Print & Brand Design · By the Numbers" />

        {/* ── WHY PROFESSIONAL PRINT DESIGN MATTERS ── */}
        <ServiceSection borderTop>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Why Professional Print Design Matters</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Poor print design costs more <em style={{ color: ACCENT }}>than just reprints.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 720 }}>It damages your brand credibility, wastes marketing budgets, and creates confused customers.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(48px,6vw,80px)" }} className="why-print">
              <style>{`@media(max-width:768px){.why-print{grid-template-columns:1fr!important}}`}</style>
              {PAIN_POINTS.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }} viewport={{ once: true }} style={{ padding: "clamp(28px,3.5vw,44px)", background: "#131313", display: "flex", flexDirection: "column", gap: 14 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(28px,3vw,40px)", color: ACCENT, lineHeight: 1 }}>0{i + 1}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(18px,1.8vw,22px)", lineHeight: 1.3, color: "#fff", margin: 0 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px,1.1vw,15px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: 0 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }} style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: "clamp(24px,3vw,40px)", marginBottom: "clamp(48px,6vw,72px)" }}>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: ACCENT, margin: "0 0 12px 0" }}>The Problem</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, color: "#fff", margin: "0 0 20px 0" }}>Poor File Preparation</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {PROBLEM_BULLETS.map(b => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(14px,1.3vw,16px)", color: "rgba(255,255,255,0.65)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />{b}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "clamp(40px,5vw,64px)", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(20px,2.5vw,32px)", lineHeight: 1.5, color: "rgba(255,255,255,0.8)", margin: "0 auto", maxWidth: 840 }}>{QUOTE}</p>
            </motion.div>
          </ContentContainer>
        </ServiceSection>

        {/* ── EVERY PIECE TELLS YOUR STORY (Print-exclusive) ── */}
        <section style={{ backgroundColor: PARCHMENT, borderTop: `1px solid ${INK}10`, paddingTop: "clamp(64px,8vw,100px)", paddingBottom: "clamp(64px,8vw,100px)" }}>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow color={INK}>Every Piece Tells Your Story</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 16px 0" }}>If it prints, <em style={{ color: GOLD }}>we do it.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: INK_SOFT, margin: 0, maxWidth: 680 }}>From business cards that make first impressions to brochures that tell your complete story.</p>
            </motion.div>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,64px)" }}>
              {PRINT_CATEGORIES.map((cat, ci) => (
                <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: ci * 0.08, ease: EASE }} viewport={{ once: true }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(20px,2.5vw,32px)" }}>
                    <div style={{ width: 20, height: 1, background: GOLD }} />
                    <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD }}>{cat.category}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }} className={`cat-grid-${ci}`}>
                    <style>{`@media(max-width:700px){.cat-grid-${ci}{grid-template-columns:repeat(2,1fr)!important}}`}</style>
                    {cat.items.map(({ src, label, sub, bg }: { src: string; label: string; sub: string; bg?: string }) => (
                      <div key={label} className={`pt-item-${ci}-${label}`} style={{ overflow: "hidden", border: `1px solid ${INK}12` }}>
                        <style>{`.pt-item-${ci}-${label}:hover img{transform:scale(1.04)}`}</style>
                        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: bg || "transparent" }}>
                          <img src={src} alt={label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: bg ? "contain" : "cover", padding: bg ? "16%" : 0, transition: "transform 0.7s ease", filter: "saturate(0.85) contrast(1.05)" }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2"; }} />
                        </div>
                        <div style={{ padding: "clamp(12px,1.5vw,18px)", background: PARCHMENT }}>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(14px,1.3vw,17px)", color: INK, marginBottom: 4 }}>{label}</div>
                          <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `${INK}55` }}>{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </ContentContainer>
        </section>

        {/* ── CHOOSE THE PERFECT FOLD (Print-exclusive) ── */}
        <section style={{ backgroundColor: PARCHMENT, borderTop: `1px solid ${INK}10`, paddingTop: "clamp(64px,8vw,100px)", paddingBottom: "clamp(64px,8vw,100px)" }}>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
              <Eyebrow color={INK}>Choose the Perfect Fold For Your Story</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4.5vw,60px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 16px 0" }}>Every fold. <em style={{ color: GOLD }}>Production-ready every time.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: INK_SOFT, margin: 0, maxWidth: 680 }}>Brochures, leaflets, and folded collateral built to the correct panel dimensions, with bleed and crop marks for every fold type.</p>
            </motion.div>
            <FoldViewer />

            {/* Quick Fold Selection Guide */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }} style={{ marginTop: "clamp(56px,7vw,96px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(32px,4vw,48px)" }}>
                <div style={{ width: 20, height: 1, background: GOLD }} />
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD }}>Quick Fold Selection Guide</span>
              </div>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px,1.3vw,16px)", color: INK_SOFT, margin: "0 0 clamp(28px,3.5vw,40px) 0" }}>Match the fold type to your content and goals.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(16px,2vw,24px)" }} className="fold-guide">
                <style>{`@media(max-width:768px){.fold-guide{grid-template-columns:1fr!important}}`}</style>
                {FOLD_GUIDE.map((g, i) => (
                  <motion.div key={g.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }} viewport={{ once: true }} style={{ padding: "clamp(24px,3vw,36px)", border: `1px solid ${INK}12`, background: `${g.accent}05` }}>
                    <div style={{ fontSize: 20, marginBottom: 12, color: g.accent }}>{g.icon}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(18px,1.8vw,22px)", color: INK, margin: "0 0 8px 0" }}>{g.label}</h3>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: INK_SOFT, margin: "0 0 16px 0", lineHeight: 1.6 }}>{g.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {g.folds.map(f => <span key={f} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: g.accent, padding: "4px 10px", border: `1px solid ${g.accent}40`, background: `${g.accent}08` }}>{f}</span>)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ContentContainer>
        </section>

        {/* ── OUR DESIGN PROCESS ── */}
        <ServiceSection light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(56px,7vw,96px)" }}>
              <Eyebrow>Our Design Process</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0", maxWidth: 900 }}>A structured approach <em style={{ color: ACCENT }}>to print that performs.</em></h2>
            </motion.div>
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} style={{ padding: "clamp(40px,5vw,80px) 0", borderBottom: i < PROCESS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "grid", gridTemplateColumns: "80px 1fr", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(28px,3.5vw,40px)", color: step.accent, lineHeight: 1 }}>{step.num}</div>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: step.accent, marginTop: 8 }}>Step</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, color: "#fff", margin: "0 0 16px 0" }}>{step.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: 680 }}>{step.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "clamp(20px,2.5vw,32px)" }}>
                    {step.artifacts.map(a => <span key={a} className="artifact-tag" style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.55)", padding: "6px 12px", border: `1px solid ${step.accent}30`, background: `${step.accent}08`, borderRadius: 2 }}>{a}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </ContentContainer>
        </ServiceSection>

        {/* ── WHY WORK WITH US ── */}
        <ServiceSection borderTop light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow color={INK_MUTED}>Why Work With Us</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 0" }}>We're not just designers. <span style={{ color: ACCENT }}>We're print production experts.</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)" }} className="pr-print">
              <style>{`@media(max-width:768px){.pr-print{grid-template-columns:1fr!important}}`}</style>
              {PRINCIPLES.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }} viewport={{ once: true }} style={{ padding: "clamp(28px,3.5vw,44px)", background: PARCHMENT, display: "flex", flexDirection: "column", gap: 12 }}>
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: ACCENT }}>0{i + 1}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(18px,1.8vw,22px)", lineHeight: 1.3, color: INK, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px,1.1vw,15px)", lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </ContentContainer>
        </ServiceSection>

        <BeforeAfterSection pairs={COMPARISONS} accent={ACCENT} />

        {/* ── TRANSPARENT PRICING ── */}
        <ServiceSection borderTop id="pricing">
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)", maxWidth: 900 }}>
              <Eyebrow>Transparent Pricing</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 20px 0" }}>No hidden fees, <em style={{ color: ACCENT }}>no surprises.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0 }}>Professional print and brand design with clear pricing.</p>
            </motion.div>

            {/* Tabbed Service Selector */}
            <ServiceTabs
              tabs={PRINT_TABS}
              accent={ACCENT}
              getPrice={(id) => price(id)}
              onSelect={(name) => go(`/contact?selection=${encodeURIComponent(name)}`)}
            />

            {/* Popular Packages */}
            <Eyebrow>Popular Packages</Eyebrow>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", color: "rgba(255,255,255,0.55)", margin: "16px 0 clamp(32px,4vw,48px) 0" }}>Curated solutions for different creative needs.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }} className="pkgs-print">
              <style>{`@media(max-width:900px){.pkgs-print{grid-template-columns:1fr!important}}`}</style>
              {PACKAGES.map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} style={{ background: "#131313", border: `1px solid ${pkg.accent}${pkg.highlighted ? "50" : "25"}`, borderTop: `4px solid ${pkg.accent}`, padding: "clamp(28px,3.5vw,48px)", display: "flex", flexDirection: "column", position: "relative" }}>
                  {pkg.highlighted && <div style={{ position: "absolute", top: -1, right: 24, background: pkg.accent, color: BLACK, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px" }}>Most Popular</div>}
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(20px,2vw,26px)", color: pkg.accent, margin: "0 0 8px 0" }}>{price(pkg.serviceId)}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(20px,2vw,26px)", color: "#fff", margin: "0 0 8px 0" }}>{pkg.name}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "0 0 20px 0", lineHeight: 1.6 }}>{pkg.desc}</p>
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px 0" }} />
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {pkg.features.map(f => <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,14px)", color: "rgba(255,255,255,0.65)" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: pkg.accent, flexShrink: 0 }} />{f}</li>)}
                  </ul>
                  <button onClick={() => go(`/contact?selection=${encodeURIComponent(pkg.name)}`)} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: pkg.highlighted ? BLACK : pkg.accent, background: pkg.highlighted ? pkg.accent : "transparent", border: `1px solid ${pkg.accent}`, padding: "14px 24px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={e => { if (!pkg.highlighted) (e.currentTarget as HTMLElement).style.background = `${pkg.accent}15`; }} onMouseLeave={e => { if (!pkg.highlighted) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Get This Package</button>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }} viewport={{ once: true }} style={{ textAlign: "center", marginTop: "clamp(40px,5vw,64px)" }}>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 16px 0" }}>Need help choosing the right package?</p>
              <button onClick={() => go("/contact")} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: ACCENT, background: "transparent", border: `1px solid ${ACCENT}40`, padding: "12px 28px", cursor: "pointer" }}>Schedule a Free Consultation</button>
            </motion.div>
          </ContentContainer>
        </ServiceSection>

        {/* ── FAQs ── */}
        <ServiceSection light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }} style={{ maxWidth: 900, marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Frequently Asked Questions</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 0 0" }}>Everything you need to know.</h2>
            </motion.div>
            <div style={{ maxWidth: 900 }}>{FAQS.map((faq, i) => <FAQItem key={faq.q} faq={faq} index={i} />)}</div>
          </ContentContainer>
        </ServiceSection>

        {/* ── CTA ── */}
        <ServiceSection borderTop>
          <ContentContainer maxWidth={900} style={{ textAlign: "center" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 22px 0" }}>Ready to make your <em style={{ color: ACCENT }}>brand tangible?</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0" }}>Great print design doesn't happen by accident. It's the result of careful planning, technical expertise, and creative vision.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "clamp(56px,7vw,96px)" }}>
                <PrimaryButton onClick={() => go("/contact?selection=Print+%26+Brand+Design")}>Schedule a Free Consultation</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/featured-work/ssjc-tournament")}>View Our Work</SecondaryButton>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(40px,5vw,64px)" }} className="cta-steps-print">
                <style>{`@media(max-width:768px){.cta-steps-print{grid-template-columns:1fr!important}}`}</style>
                {[{ num: "01", title: "Discovery Call", desc: "We learn about your brand, audience, and print needs", c: GOLD }, { num: "02", title: "Proposal & Timeline", desc: "Clear scope, deliverables, and transparent pricing", c: LAVENDER }, { num: "03", title: "Create & Launch", desc: "We produce, refine, and deliver your stunning print materials", c: BLUE }].map(step => (
                  <div key={step.num} style={{ padding: "clamp(24px,3vw,40px)", background: `${step.c}14`, textAlign: "left", borderTop: `3px solid ${step.c}` }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", color: step.c, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px,1.6vw,20px)", color: "#fff", margin: "0 0 8px 0" }}>{step.title}</h4>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,3vw,52px)", flexWrap: "nowrap" }}>
                {[{ title: "Print-Ready Guarantee", sub: "Files that work perfectly with any printer" }, { title: "On-Time Delivery", sub: "We meet deadlines without compromising quality" }, { title: "Complete Files", sub: "Everything your printer needs to succeed" }].map(g => (
                  <div key={g.title}>
                    <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>{g.title}</div>
                    <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{g.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </ContentContainer>
        </ServiceSection>

      </main>
    </div>
  );
}
