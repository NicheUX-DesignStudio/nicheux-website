// Strategy & Design Page
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

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const ACCENT = LAVENDER;

const COMPARISONS: ComparisonPair[] = [
  { label: "User Journey", beforeSrc: "/images/diagnostics/strat-cta-before.png", afterSrc: "/images/diagnostics/strat-cta-after.png", beforeCaption: "Unclear calls to action with no direction. Users leave without converting.", afterCaption: "Intentional CTAs that guide users confidently from interest to action." },
  { label: "Mobile Experience", beforeSrc: "/images/diagnostics/strat-mobile-before.png", afterSrc: "/images/diagnostics/strat-mobile-after.png", beforeCaption: "Desktop-only layout that breaks on phones. Losing the majority of traffic.", afterCaption: "Fully responsive, mobile-first design that works flawlessly on every device." },
  { label: "Trust Signals", beforeSrc: "/images/diagnostics/strat-trust-before.png", afterSrc: "/images/diagnostics/strat-trust-after.png", beforeCaption: "No social proof or credibility signals. Visitors leave without connecting.", afterCaption: "Strategic trust architecture that turns sceptical visitors into believers." },
];
const SERVICE_STATS: [ServiceStat, ServiceStat, ServiceStat, ServiceStat] = [
  { display: "6", numericTarget: 6, label: "Weeks average\nproject timeline" },
  { display: "3", numericTarget: 3, label: "Research phases\nevery project" },
  { display: "40%", label: "Average conversion\nuplift delivered" },
  { display: "0", label: "Generic templates\never used" },
];
const go = (path: string) => { window.location.href = path; };

const PAIN_POINTS = [
  { title: "Wasted Development Resources", desc: "Building without research means rebuilding later. Teams waste months on features nobody uses because they skipped the discovery phase." },
  { title: "Users Leave Silently", desc: "Confusing interfaces don't get feedback. Users just close the tab. You never know what went wrong, only that your metrics are dropping." },
  { title: "Brand Perception Suffers", desc: "A clunky experience tells users you don't care about quality. First impressions stick, and bad UX damages credibility permanently." },
];
const PROBLEM_BULLETS = ["Users can't find key features", "No clear information architecture", "Buried calls-to-action", "Complex menu structures", "Missing search functionality"];
const QUOTE = "Great UX isn't about following trends. It's about understanding people and designing for their success.";

const PROCESS = [
  { num: "01", accent: BLUE, title: "Research & Discovery", desc: "We start by understanding your users, business goals, and market. Through interviews, analytics, and competitive analysis, we uncover insights that guide every design decision.", artifacts: ["User Interviews", "Analytics Review", "Competitor Analysis", "User Personas"] },
  { num: "02", accent: LAVENDER, title: "Structure & Architecture", desc: "We map out the user journey and information architecture. Every flow, every interaction is planned intentionally to guide users toward their goals effortlessly.", artifacts: ["User Flows", "Sitemaps", "Wireframes", "Interaction Patterns"] },
  { num: "03", accent: GOLD, title: "Visual Design & Testing", desc: "We bring concepts to life with high-fidelity designs, test with real users, and refine until every detail is perfect. You get production-ready files developers love.", artifacts: ["UI Mockups", "Interactive Prototypes", "Usability Tests", "Design Handoff"] },
];

const PRINCIPLES = [
  { title: "User-Centric Focus", desc: "Every design decision starts with your users. We validate assumptions with real data, not guesswork." },
  { title: "Strategic & Visual", desc: "Deep expertise in both user research and visual design execution." },
  { title: "Quality Guaranteed", desc: "Every project meets our exacting quality standards and accessibility requirements." },
  { title: "Innovation Focus", desc: "We stay at the forefront of design trends and user experience best practices." },
  { title: "Flexible Workflows", desc: "Seamlessly switch between research, wireframing, and high-fidelity design as needed." },
  { title: "Results-Driven", desc: "We optimise for your goals: usability, conversion, or user satisfaction." },
];

const TIERS = [
  { name: "UX Audit & Strategy", serviceId: "UX Audit & Strategy", tagline: "The Diagnostic Check-up", timeline: "1 to 2 weeks", bestFor: "Existing products that need optimisation and clear direction", features: ["Heuristic Evaluation", "User Flow Analysis", "Usability Report", "Prioritised Recommendations", "Quick Wins Document"], youGet: "Detailed roadmap showing exactly what to fix and why", accent: BLUE },
  { name: "Complete UI/UX Design", serviceId: "Complete UI/UX Design", tagline: "The Full Transformation", timeline: "4 to 8 weeks", bestFor: "New products or complete redesigns needing full execution", features: ["User Research & Personas", "Information Architecture", "Wireframes & User Flows", "High-Fidelity UI Design", "Interactive Prototypes", "Usability Testing", "Developer Handoff Package"], youGet: "Production-ready designs ready for immediate development", accent: LAVENDER, highlighted: true },
  { name: "Design System", serviceId: "Design System", tagline: "The Scalable Foundation", timeline: "2 to 4 weeks", bestFor: "Growing teams needing consistency across products", features: ["Component Library", "Design Tokens & Variables", "Usage Guidelines", "Accessibility Standards", "Figma/Sketch Files", "Documentation Site"], youGet: "Scalable system that grows with your team", accent: GOLD },
];

const FAQS = [
  { q: "How long does a typical UI/UX design project take?", a: "Timelines vary by engagement. A UX Audit runs 1 to 2 weeks, a Design System 2 to 4 weeks, and a Complete UI/UX Design 4 to 8 weeks. We provide a precise timeline after a free discovery call." },
  { q: "Do you work with existing design systems or create new ones?", a: "Both. We can audit and extend your existing system, or build a new one from scratch. We'll recommend the path that best fits your timeline and budget." },
  { q: "What design tools do you use?", a: "Figma is our primary canvas, with FigJam for research synthesis and Hotjar for behavioural data. You receive all source files alongside annotated specs for your engineers." },
  { q: "Do you provide developer handoff?", a: "Yes. Comprehensive developer handoff is included in our Complete UI/UX Design engagement: specs, tokens, exported assets, and live prototypes your engineers can build from on day one." },
  { q: "Can you help with user research and testing?", a: "Research is the foundation of every engagement, not an upsell. Interviews, usability testing, and analytics review are built into our process from the start." },
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

export default function StrategyAndDesignPage() {
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
        <title>UI/UX Strategy & Design | NicheUX</title>
        <meta name="description" content="UI/UX strategy and design from NicheUX. Research-led, pixel-perfect interfaces engineered to convert. UX audits, complete design systems, and interfaces that turn visitors into customers." />
        <link rel="canonical" href="https://www.nicheux.com/strategy-design" />
      </Helmet>

      <main id="main-content">

        {/* ── HERO ── */}
        <ServiceSection withSpotlight spotlightColor={ACCENT} borderTop={false} id="hero">
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <img src="/images/StrategyandDesignHero.webp" alt="" loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "saturate(0.45)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, rgba(19,19,19,0.98) 0%, rgba(19,19,19,0.88) 45%, rgba(19,19,19,0.5) 100%)" }} />
          </div>
          <motion.div ref={heroRef} style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1 }}>
            <ContentContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "clamp(24px,3vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "clamp(48px,7vw,96px)", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />UI/UX Strategy & Design
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.35)" }}>Research · Strategy · Craft</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(48px,9vw,160px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
                Where User Needs<br /><em style={{ color: ACCENT }}>Meet Business Goals</em>
              </motion.h1>
              <div className="hero-strat" style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "clamp(32px,5vw,80px)", marginTop: "clamp(48px,6vw,80px)", alignItems: "start" }}>
                <style>{`@media(max-width:768px){.hero-strat{grid-template-columns:1fr!important}}`}</style>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(17px,1.6vw,22px)", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 clamp(32px,4vw,48px) 0", maxWidth: 640 }}>
                    We design digital experiences that feel effortless, look stunning, and solve real user problems. From UX research to high-fidelity prototypes, every decision is intentional.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <PrimaryButton onClick={() => go("/contact?selection=Strategy+%26+Design")}>Start Your Project</PrimaryButton>
                    <SecondaryButton onClick={() => navigate("/featured-work")}>View Our Work</SecondaryButton>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }} style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: "clamp(0px,2vw,32px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  {[{ label: "Discipline", value: "UX · UI · Research" }, { label: "Delivery", value: "1 to 8 weeks" }, { label: "Starts From", value: price("UX Audit & Strategy") }, { label: "Availability", value: "Selective" }].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(14px,1.3vw,17px)", color: "#fff" }}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ContentContainer>
          </motion.div>
          <BackgroundNumeral value="I" position="right" opacity={0.025} />
        </ServiceSection>

        <WorkStrip />

        <ServiceStatStrip stats={SERVICE_STATS} sectionLabel="Strategy & Design · By the Numbers" />

        {/* ── WHY GOOD UX MATTERS ── */}
        <ServiceSection borderTop>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Why Good UX Matters</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Poor user experience costs more <em style={{ color: ACCENT }}>than just conversions.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 720 }}>It damages trust, wastes development time, and creates frustrated users who never return.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(48px,6vw,80px)" }} className="why-strat">
              <style>{`@media(max-width:768px){.why-strat{grid-template-columns:1fr!important}}`}</style>
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
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, color: "#fff", margin: "0 0 20px 0" }}>Confusing Navigation</h3>
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

        {/* ── OUR DESIGN PROCESS ── */}
        <ServiceSection light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(56px,7vw,96px)" }}>
              <Eyebrow>Our Design Process</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0", maxWidth: 900 }}>A structured approach <em style={{ color: ACCENT }}>to design that works.</em></h2>
            </motion.div>
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} className="process-border" style={{ padding: "clamp(40px,5vw,80px) 0", borderBottom: i < PROCESS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "grid", gridTemplateColumns: "80px 1fr", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 0" }}>We're not just designers. <span style={{ color: ACCENT }}>We're strategic partners.</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)" }} className="pr-strat">
              <style>{`@media(max-width:768px){.pr-strat{grid-template-columns:1fr!important}}`}</style>
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,80px)", maxWidth: 900 }}>
              <Eyebrow>Transparent Pricing</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 20px 0" }}>No hidden fees, <em style={{ color: ACCENT }}>no surprises.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0 }}>Choose the service that fits your needs and budget.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }} className="tiers-strat">
              <style>{`@media(max-width:900px){.tiers-strat{grid-template-columns:1fr!important}}`}</style>
              {TIERS.map((tier, i) => (
                <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} style={{ background: "#131313", border: `1px solid ${tier.accent}${tier.highlighted ? "50" : "25"}`, borderTop: `4px solid ${tier.accent}`, padding: "clamp(28px,3.5vw,48px)", display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
                  {tier.highlighted && <div style={{ position: "absolute", top: -1, right: 24, background: tier.accent, color: BLACK, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px" }}>Most Popular</div>}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(22px,2.2vw,28px)", color: "#fff", margin: "0 0 4px 0" }}>{tier.name}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: tier.accent, margin: "0 0 20px 0" }}>{tier.tagline}</p>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(20px,2vw,26px)", color: tier.accent, margin: "0 0 4px 0" }}>{price(tier.serviceId)}</div>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "0 0 8px 0" }}>{tier.timeline}</p>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 20px 0", lineHeight: 1.6 }}><strong style={{ color: "rgba(255,255,255,0.7)" }}>Best for:</strong> {tier.bestFor}</p>
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px 0" }} />
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: tier.accent, flexShrink: 0, marginTop: 6 }} />{f}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 600, color: tier.accent, margin: "0 0 20px 0", lineHeight: 1.5 }}><em>You'll Get:</em> {tier.youGet}</p>
                  <button onClick={() => go(`/contact?selection=${encodeURIComponent(tier.name)}`)} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: tier.highlighted ? BLACK : tier.accent, background: tier.highlighted ? tier.accent : "transparent", border: `1px solid ${tier.accent}`, padding: "14px 24px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={e => { if (!tier.highlighted) { (e.currentTarget as HTMLElement).style.background = `${tier.accent}15`; } }} onMouseLeave={e => { if (!tier.highlighted) { (e.currentTarget as HTMLElement).style.background = "transparent"; } }}>Get Started</button>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 22px 0" }}>Ready to make your <em style={{ color: ACCENT }}>design tangible?</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0" }}>Great design doesn't happen by accident. It's the result of careful research, intentional decisions, and relentless refinement. Ready to get started?</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "clamp(56px,7vw,96px)" }}>
                <PrimaryButton onClick={() => go("/contact?selection=Strategy+%26+Design")}>Schedule a Free Consultation</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/featured-work")}>View Our Work</SecondaryButton>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(40px,5vw,64px)" }} className="cta-steps-strat">
                <style>{`@media(max-width:768px){.cta-steps-strat{grid-template-columns:1fr!important}}`}</style>
                {[{ num: "01", title: "Strategy Session", desc: "We discuss your goals and recommend the best approach", color: BLUE }, { num: "02", title: "Custom Proposal", desc: "We create a tailored plan with clear pricing and timeline", color: LAVENDER }, { num: "03", title: "Design & Launch", desc: "We craft, test, and deliver your exceptional user experience", color: GOLD }].map((step, i) => (
                  <div key={step.num} style={{ padding: "clamp(24px,3vw,40px)", background: `${step.color}14`, textAlign: "left", borderTop: `3px solid ${step.color}` }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", color: step.color, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px,1.6vw,20px)", color: "#fff", margin: "0 0 8px 0" }}>{step.title}</h4>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,3vw,52px)", flexWrap: "nowrap" }}>
                {[{ title: "Quality Guaranteed", sub: "Exceptional results, every time" }, { title: "On-Time Delivery", sub: "We meet deadlines without compromising quality" }, { title: "User-First Design", sub: "Every decision serves your users" }].map(g => (
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
