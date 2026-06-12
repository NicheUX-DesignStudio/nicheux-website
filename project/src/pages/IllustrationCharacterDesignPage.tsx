// Illustration & Character Design Page
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GOLD, LAVENDER, BLUE, BLACK, PARCHMENT, INK, INK_MUTED } from "@/constants/theme";
import {
  Eyebrow, PrimaryButton, SecondaryButton,
  ServiceSection, ContentContainer, BackgroundNumeral,
} from "@/components/service/ServicePagePrimitives";
import { useCountryPricing } from "../hooks/useCountryPricing";
import WorkStrip from "@/components/service/WorkStrip";
import BeforeAfterSection, { ComparisonPair } from "@/components/service/BeforeAfterSection";
import ServiceStatStrip, { ServiceStat } from "@/components/service/ServiceStatStrip";
import ServiceTabs, { ServiceTabGroup } from "@/components/service/ServiceTabs";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const ACCENT = LAVENDER;

const COMPARISONS: ComparisonPair[] = [
  { label: "Visual Consistency", beforeSrc: "/images/diagnostics/illus-consistency-before.png", afterSrc: "/images/diagnostics/illus-consistency-after.png", beforeCaption: "Mixed styles from multiple sources. No coherent visual identity across materials.", afterCaption: "A unified illustration system that tells one consistent visual story everywhere." },
  { label: "Art Quality", beforeSrc: "/images/diagnostics/illus-quality-before.png", afterSrc: "/images/diagnostics/illus-quality-after.png", beforeCaption: "Low-resolution generic art that cheapens the brand and loses audience trust.", afterCaption: "Professional illustration that elevates perceived value and commands attention." },
  { label: "Original Design", beforeSrc: "/images/diagnostics/illus-original-before.png", afterSrc: "/images/diagnostics/illus-original-after.png", beforeCaption: "Clip art and stock illustrations that every competitor already uses.", afterCaption: "Fully original characters and artwork that belong exclusively to your brand." },
];
const SERVICE_STATS: [ServiceStat, ServiceStat, ServiceStat, ServiceStat] = [
  { display: "3", numericTarget: 3, label: "Concepts presented\nbefore execution" },
  { display: "2", numericTarget: 2, label: "Full revision rounds\nincluded" },
  { display: "100%", label: "Original hand-crafted\nartwork only" },
  { display: "∞", label: "Art styles available,\ncomic to fine art" },
];
const go = (path: string) => { window.location.href = path; };

const PAIN_POINTS = [
  { title: "Lost Engagement", desc: "Poor illustrations fail to capture attention. Professional artwork engages audiences and keeps them connected to your story." },
  { title: "Brand Inconsistency", desc: "Amateur artwork undermines credibility. Consistent, polished illustrations signal professionalism and build brand trust." },
  { title: "Weak Storytelling", desc: "Unclear visuals fail to communicate. Strategic illustration guides viewers through narratives with emotional impact." },
];
const PROBLEM_BULLETS = ["Characters look different across pages or materials", "Varying proportions and features throughout", "Different colour palettes used inconsistently", "Mismatched art styles across deliverables", "Lack of cohesive visual identity"];
const QUOTE = "Great illustration isn't just decoration. It's visual communication that engages, explains, and entertains. We make every image meaningful.";

const PROCESS = [
  { num: "01", accent: LAVENDER, title: "Concept & Strategy Development", desc: "We begin by understanding your story, audience, and goals to develop a visual strategy that communicates effectively.", artifacts: ["Character Analysis", "Style Exploration", "Story Breakdown", "Visual Strategy"] },
  { num: "02", accent: GOLD, title: "Art Creation & Refinement", desc: "Our artists create initial sketches, refine compositions, and develop final artwork with attention to detail and consistency.", artifacts: ["Initial Sketches", "Colour Studies", "Detail Refinement", "Style Consistency"] },
  { num: "03", accent: BLUE, title: "Final Preparation & Delivery", desc: "Every file is meticulously prepared with proper formatting, organisation, and specifications for your intended use.", artifacts: ["Format Optimisation", "File Organisation", "Usage Guidelines", "Multiple Formats"] },
];

const PRINCIPLES = [
  { title: "Artistic Excellence", desc: "Hand-crafted illustrations with attention to detail and artistic integrity." },
  { title: "Character Specialists", desc: "Deep expertise in creating memorable, expressive characters that audiences connect with." },
  { title: "Storytelling Focus", desc: "Every illustration serves the narrative and communicates effectively." },
  { title: "Consistency Guarantee", desc: "Characters and styles remain consistent across all materials and applications." },
  { title: "Technical Precision", desc: "Perfect file preparation for any use: print, digital, or publication." },
  { title: "Strategic Approach", desc: "Illustrations designed with purpose and audience engagement in mind." },
];

const ILLUS_TABS: ServiceTabGroup[] = [
  { label: "Character Design", items: [
    { name: "Single Character Design", serviceId: "Single Character Design", desc: "Complete character design with personality and backstory" },
    { name: "Character Turnaround Sheet", serviceId: "Character Turnaround Sheet", desc: "Front, side, back, and 3/4 views with proportions" },
    { name: "Character Expression Sheet", serviceId: "Character Expression Sheet", desc: "8 or more emotions and poses showing personality" },
    { name: "Character Series (3 characters)", serviceId: "Character Series (3 characters)", desc: "Family or team with relationship dynamics" },
    { name: "Character Style Guide", serviceId: "Character Style Guide", desc: "Complete usage documentation and specifications" },
    { name: "Character Portrait", serviceId: "Character Portrait", desc: "High-quality rendered character artwork" },
  ]},
  { label: "Illustration Services", items: [
    { name: "Children's Book Page", serviceId: "Children's Book Page", desc: "Single illustrated page with character consistency" },
    { name: "Book Cover Illustration", serviceId: "Book Cover Illustration", desc: "Complete cover artwork with typography" },
    { name: "Editorial Illustration", serviceId: "Editorial Illustration", desc: "Article or blog concept visualisation" },
    { name: "Digital Painting", serviceId: "Digital Painting", desc: "Environmental or scene illustration" },
    { name: "Coloring Book Page", serviceId: "Coloring Book Page", desc: "Line art illustration for colouring" },
    { name: "Package Illustration", serviceId: "Package Illustration", desc: "Product packaging custom artwork" },
  ]},
  { label: "Storyboarding", items: [
    { name: "Visual Sequence Panel", serviceId: "Visual Sequence Panel", desc: "Single storyboard panel with composition notes" },
    { name: "Storyboard Page (6 panels)", serviceId: "Storyboard Page (6 panels)", desc: "Complete page with camera angles and timing" },
    { name: "Commercial Sequence", serviceId: "Commercial Sequence", desc: "Advertisement visual planning panels" },
    { name: "Comic Strip Page", serviceId: "Comic Strip Page", desc: "Complete comic page with panels and text" },
    { name: "Keyframe Art", serviceId: "Keyframe Art", desc: "Detailed key moment illustration" },
    { name: "Pre-visualization Set", serviceId: "Pre-visualization Set", desc: "Set of concept panels for planning" },
  ]},
  { label: "Concept Art", items: [
    { name: "Character Concept Sheet", serviceId: "Character Concept Sheet", desc: "Multiple design explorations for one character" },
    { name: "Environment Concept", serviceId: "Environment Concept", desc: "Location or setting visualisation" },
    { name: "Prop Design", serviceId: "Prop Design", desc: "Object or item design with multiple views" },
    { name: "Mood Board Creation", serviceId: "Mood Board Creation", desc: "Style exploration and direction board" },
    { name: "Game Asset Concept", serviceId: "Game Asset Concept", desc: "Character or item design for games" },
  ]},
];

const PACKAGES = [
  { name: "Game Character Package", serviceId: "Game Character Package", desc: "Professional character development for games and animation", features: ["Single Character Design", "Turnaround Sheet", "Expression Sheet", "Character Portrait"], accent: LAVENDER },
  { name: "Children's Book Package", serviceId: "Children's Book Package", desc: "Complete picture book illustration for publishing", features: ["15 Illustrated Pages", "Cover Illustration", "Character Design", "Print Preparation"], accent: GOLD, highlighted: true },
  { name: "Creative Direction Suite", serviceId: "Character Design Suite", desc: "Complete visual language for creative projects and series", features: ["3 Character Concepts", "Environment Concepts", "Mood Boards", "Style Guide"], accent: BLUE },
];

const FAQS = [
  { q: "What file formats will I receive?", a: "You receive high-res PNG and JPG for digital use, layered PSD or AI source files, vector SVG where applicable, and PDF for print. CMYK and RGB versions included as standard." },
  { q: "How many revisions are included?", a: "Two full rounds of revisions are included in every project. Additional rounds are available at an hourly rate. We structure the process to ensure the direction is right before detailed work begins." },
  { q: "Can you work with my existing characters or brand?", a: "Yes. We can extend, refine, or adapt existing characters and brand assets. We'll begin with an analysis of your current assets and discuss how to develop them consistently." },
  { q: "What's the typical turnaround time?", a: "A single character design takes 5 to 10 business days. A complete character package runs 2 to 3 weeks. Children's book packages are scoped individually based on page count and complexity." },
];

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

export default function IllustrationCharacterDesignPage() {
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
        <title>Illustration & Character Design | NicheUX</title>
        <meta name="description" content="Professional character design, illustration, and visual storytelling. From children's books to concept art, we create artwork that captivates and communicates." />
        <link rel="canonical" href="https://www.nicheux.com/illustration-character-design" />
      </Helmet>      <main id="main-content">

        {/* ── HERO ── */}
        <ServiceSection withSpotlight spotlightColor={ACCENT} borderTop={false} id="hero">
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <img src="/images/IllustrationsCharacterDesign.webp" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "saturate(0.45)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, rgba(19,19,19,0.98) 0%, rgba(19,19,19,0.88) 45%, rgba(19,19,19,0.5) 100%)" }} />
          </div>
          <motion.div ref={heroRef} style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1 }}>
            <ContentContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "clamp(24px,3vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "clamp(48px,7vw,96px)", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />Illustration & Character Design
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.35)" }}>Editorial · Character · Sequential</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(48px,9vw,160px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
                Where Artistry<br /><em style={{ color: ACCENT }}>Meets Storytelling</em>
              </motion.h1>
              <div className="hero-illus" style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "clamp(32px,5vw,80px)", marginTop: "clamp(48px,6vw,80px)", alignItems: "start" }}>
                <style>{`@media(max-width:768px){.hero-illus{grid-template-columns:1fr!important}}`}</style>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(17px,1.6vw,22px)", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 clamp(32px,4vw,48px) 0", maxWidth: 640 }}>
                    Professional character design, illustration, and visual storytelling. From children's books to concept art, we create artwork that captivates and communicates.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <PrimaryButton onClick={() => go("/contact?selection=Illustration+%26+Character+Design")}>Start a Commission</PrimaryButton>
                    <SecondaryButton onClick={() => navigate("/featured-work/conceptual-art")}>View Our Work</SecondaryButton>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }} style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: "clamp(0px,2vw,32px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  {[{ label: "Styles", value: "Editorial · Character · Book" }, { label: "Formats", value: "PNG · SVG · AI · PSD" }, { label: "Colour Modes", value: "RGB · CMYK" }, { label: "Starts From", value: price("Single Character Design") }].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(14px,1.3vw,17px)", color: "#fff" }}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ContentContainer>
          </motion.div>
          <BackgroundNumeral value="VI" position="right" opacity={0.025} />
        </ServiceSection>

        <WorkStrip />

        <ServiceStatStrip stats={SERVICE_STATS} sectionLabel="Illustration & Character Design · By the Numbers" />

        {/* ── WHY PROFESSIONAL ILLUSTRATION MATTERS ── */}
        <ServiceSection borderTop>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Why Professional Illustration Matters</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Great illustrations tell stories, <em style={{ color: ACCENT }}>build connections.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 720 }}>Poor execution undermines your message. Great artwork makes it unforgettable.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(48px,6vw,80px)" }} className="why-illus">
              <style>{`@media(max-width:768px){.why-illus{grid-template-columns:1fr!important}}`}</style>
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
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, color: "#fff", margin: "0 0 20px 0" }}>Inconsistent Characters</h3>
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

        {/* ── OUR ILLUSTRATION PROCESS ── */}
        <ServiceSection light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(56px,7vw,96px)" }}>
              <Eyebrow>Our Illustration Process</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0", maxWidth: 900 }}>A structured approach <em style={{ color: ACCENT }}>to art that tells stories.</em></h2>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 0" }}>Illustrators who understand <span style={{ color: ACCENT }}>both art and communication.</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)" }} className="pr-illus">
              <style>{`@media(max-width:768px){.pr-illus{grid-template-columns:1fr!important}}`}</style>
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
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0 }}>Professional illustration with clear pricing for every type of project.</p>
            </motion.div>

            {/* Tabbed Individual Services */}
            <ServiceTabs
              tabs={ILLUS_TABS}
              accent={ACCENT}
              getPrice={(id) => price(id)}
              onSelect={(name) => go(`/contact?selection=${encodeURIComponent(name)}`)}
            />

            {/* Packages */}
            <Eyebrow>Popular Packages</Eyebrow>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", color: "rgba(255,255,255,0.55)", margin: "16px 0 clamp(32px,4vw,48px) 0" }}>Curated solutions for different creative needs.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }} className="pkgs-illus">
              <style>{`@media(max-width:900px){.pkgs-illus{grid-template-columns:1fr!important}}`}</style>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 22px 0" }}>Ready to make your <em style={{ color: ACCENT }}>characters tangible?</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0" }}>Great illustration doesn't happen by accident. It's the result of careful planning, artistic expertise, and technical precision.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "clamp(56px,7vw,96px)" }}>
                <PrimaryButton onClick={() => go("/contact?selection=Illustration+%26+Character+Design")}>Schedule a Free Consultation</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/featured-work/conceptual-art")}>View Our Work</SecondaryButton>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(40px,5vw,64px)" }} className="cta-steps-illus">
                <style>{`@media(max-width:768px){.cta-steps-illus{grid-template-columns:1fr!important}}`}</style>
                {[{ num: "01", title: "Discovery Call", desc: "We learn about your characters, story, and illustration needs", c: LAVENDER }, { num: "02", title: "Proposal & Timeline", desc: "Clear scope, deliverables, and transparent pricing", c: GOLD }, { num: "03", title: "Create & Launch", desc: "We produce, refine, and deliver your stunning illustrations", c: BLUE }].map(step => (
                  <div key={step.num} style={{ padding: "clamp(24px,3vw,40px)", background: `${step.c}14`, textAlign: "left", borderTop: `3px solid ${step.c}` }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", color: step.c, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px,1.6vw,20px)", color: "#fff", margin: "0 0 8px 0" }}>{step.title}</h4>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,3vw,52px)", flexWrap: "nowrap" }}>
                {[{ title: "Print-Ready Guarantee", sub: "Files that work perfectly with any printer" }, { title: "On-Time Delivery", sub: "We meet deadlines without compromising quality" }, { title: "Complete Files", sub: "Everything you need, delivered immediately" }].map(g => (
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
