// Web Development & E-Commerce Page
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
const ACCENT = BLUE;

const COMPARISONS: ComparisonPair[] = [
  { label: "Code Quality", beforeSrc: "/images/diagnostics/web-code-before.png", afterSrc: "/images/diagnostics/web-code-after.png", beforeCaption: "Template bloat and messy code. Slow, hard to maintain, impossible to scale.", afterCaption: "Clean, semantic code built for speed, security, and long-term scalability." },
  { label: "Mobile Performance", beforeSrc: "/images/diagnostics/web-mobile-before.png", afterSrc: "/images/diagnostics/web-mobile-after.png", beforeCaption: "Desktop design squeezed onto mobile. Broken layouts, tiny text, lost sales.", afterCaption: "Mobile-first experience built for the 70% of users browsing on their phone." },
  { label: "Core Web Vitals", beforeSrc: "/images/diagnostics/web-perf-before.png", afterSrc: "/images/diagnostics/web-perf-after.png", beforeCaption: "Slow load times and poor Core Web Vitals. Google penalises, users leave.", afterCaption: "Optimised performance scores that rank higher and convert faster." },
];
const SERVICE_STATS: [ServiceStat, ServiceStat, ServiceStat, ServiceStat] = [
  { display: "98", numericTarget: 98, label: "Average Lighthouse\nperformance score" },
  { display: "2×", label: "Faster than average\ntemplate sites" },
  { display: "100%", label: "Mobile-first\nby default" },
  { display: "0", label: "Hidden recurring fees\nonce built" },
];
const go = (path: string) => { window.location.href = path; };

const PAIN_POINTS = [
  { title: "Generic Brand Identity", desc: "When your site looks like thousands of others, customers can't tell you apart. Your unique value gets lost in a sea of sameness." },
  { title: "Conversion Limitations", desc: "Every extra click, slow page load, and mobile glitch affects revenue. Template restrictions prevent optimal checkout flows." },
  { title: "Growth Constraints", desc: "Your business evolves, but templates don't. Need custom functionality or planning to scale? You're limited by template capabilities." },
];
const PROBLEM_BULLETS = ["Your site looks like everyone else's", "Cloned design with no brand identity", "Forgettable presence that blends in", "No room to add custom features", "Can't optimise the checkout flow"];
const QUOTE = "Custom development isn't about complexity for its own sake. It's about building exactly what your business needs to grow.";

const PROCESS = [
  { num: "01", accent: BLUE, title: "Strategy & Planning", desc: "We start by understanding your business goals, technical requirements, and growth plans. The right foundation means choosing the perfect platform, mapping features, and planning architecture that scales.", artifacts: ["Technical Audit", "Platform Selection", "Feature Roadmap", "Architecture Plan"] },
  { num: "02", accent: LAVENDER, title: "Custom Development", desc: "This is where we bring your vision to life. Clean code, mobile optimisation, performance tuning. We build with excellence at every level. Your site won't just work, it'll excel.", artifacts: ["Custom Coding", "CMS Integration", "API Development", "Performance Optimisation"] },
  { num: "03", accent: GOLD, title: "Testing & Launch", desc: "Before we go live, we test everything. Cross-browser compatibility, mobile responsiveness, load speeds, and security. Nothing launches until it's flawless and ready for your users.", artifacts: ["Quality Assurance", "Load Testing", "Security Audits", "Launch Support"] },
];

const PRINCIPLES = [
  { title: "User-Centric Focus", desc: "Every development decision starts with your users. We build experiences that are intuitive, accessible, and enjoyable." },
  { title: "Performance Obsessed", desc: "We optimise every line of code for speed. Fast load times aren't optional. They're essential for conversions and SEO." },
  { title: "Quality Guaranteed", desc: "Every project meets our exacting quality standards. We don't stop until it's perfect and performs flawlessly." },
  { title: "Innovation Focus", desc: "We stay at the forefront of web technologies and best practices to deliver modern, future-proof solutions." },
  { title: "Efficient Workflows", desc: "Seamlessly switch between strategy, development, and testing to deliver your project efficiently without compromising quality." },
  { title: "Results-Driven", desc: "We optimise for your goals: usability, conversion, performance, and business growth." },
];

const TIERS = [
  { name: "Hand-Built Website", serviceId: "Hand-Built Website", tagline: "Professional Presence, No Shortcuts", timeline: "3 to 5 weeks", bestFor: "Service businesses, portfolios, brochure sites", features: ["Custom-coded design, no templates", "React or vanilla JS build for speed", "Mobile-first responsive build", "On-page SEO and performance tuning", "Contact form and CMS integration", "Training and documentation"], youGet: "A fast, fully coded website that is yours to own and grow", accent: BLUE },
  { name: "Custom merchify Store", serviceId: "Custom merchify Store", tagline: "The Full Transformation", timeline: "4 to 6 weeks", bestFor: "Brands ready to sell with a unique store experience", features: ["Custom-coded theme development", "Product & collection setup", "Essential app integrations", "Payment & shipping configuration", "Checkout optimisation", "Mobile merchping experience", "Inventory management setup", "Launch support & training"], youGet: "A conversion-optimised store that reflects your brand", accent: LAVENDER, highlighted: true },
  { name: "Enterprise Solutions", serviceId: "Enterprise Solutions", tagline: "The Scalable Foundation", timeline: "6 to 8+ weeks", bestFor: "Scaling businesses with advanced requirements", features: ["Everything in merchify tier", "Custom app development", "ERP/CRM integrations", "Multi-currency support", "Advanced analytics", "API development", "Dedicated support", "Ongoing optimisation"], youGet: "A fully custom solution that scales with your growth", accent: GOLD },
];

const CARE_PLANS = [
  { name: "Essential Care", serviceId: "Essential Care", tagline: "The Diagnostic Check-up", billing: "Ongoing", bestFor: "Small businesses & startups needing reliable maintenance", features: ["Weekly security updates & patches", "Monthly performance optimisation", "Daily automated backups", "Uptime monitoring & alerts", "Basic bug fixes & support", "Core software updates", "24/7 security monitoring", "Monthly performance reports"], accent: BLUE },
  { name: "Professional Care", serviceId: "Professional Care", tagline: "Growth & Support", billing: "Ongoing", bestFor: "Growing businesses & e-commerce stores", features: ["Everything in Essential Care", "Content updates (up to 4 hours/month)", "SEO monitoring & optimisation", "Conversion rate optimisation", "Advanced performance tuning", "Priority support (4-hour response)", "Monthly strategy calls", "Advanced analytics reporting"], accent: LAVENDER, highlighted: true },
  { name: "Enterprise Care", serviceId: "Enterprise Care", tagline: "The Scalable Foundation", billing: "Ongoing", bestFor: "High-traffic sites & mission-critical applications", features: ["Everything in Professional Care", "Unlimited content updates", "Dedicated account manager", "24/7 priority support (1-hour response)", "Advanced security hardening", "A/B testing implementation", "Custom feature development (2 hrs/month)", "Weekly performance reviews"], accent: GOLD },
];

const FAQS = [
  { q: "How long does a typical web development project take?", a: "Custom coded websites take 3 to 5 weeks, Custom merchify stores 4 to 6 weeks, Enterprise solutions 6 to 8 weeks or more. We provide detailed timelines during discovery." },
  { q: "Do you work with e-commerce platforms other than merchify?", a: "Yes. We work with merchify, Webflow, WooCommerce, and custom React/Next.js builds. We recommend the platform that best fits your goals and budget." },
  { q: "What's included in your website care plans?", a: "Security updates, performance optimisation, backups, monitoring, bug fixes, and ongoing support. Higher tiers include content updates, SEO monitoring, and strategy calls." },
  { q: "Can you migrate my existing website to a new platform?", a: "Yes. We specialise in website migrations, ensuring all your content, SEO rankings, and functionality are preserved during the transition." },
  { q: "Do you provide training for managing my website?", a: "Yes. Every project includes documentation and a handover session so your team can manage and update the site confidently from day one." },
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

export default function WebDevelopmentAndECommercePage() {
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
        <title>Fully Coded Web Development & E-Commerce | NicheUX</title>
        <meta name="description" content="Fully coded websites and Shopify stores built from scratch in React and custom code. No templates, no drag-and-drop, no shortcuts. Fast, secure, and built to scale." />
        <link rel="canonical" href="https://www.nicheux.com/web-development-ecommerce" />
      </Helmet>      <main id="main-content">

        {/* ── HERO ── */}
        <ServiceSection withSpotlight spotlightColor={ACCENT} borderTop={false} id="hero">
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <img src="/images/WebDevelopmentECommerceHero.webp" alt="" loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "saturate(0.45)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, rgba(19,19,19,0.98) 0%, rgba(19,19,19,0.88) 45%, rgba(19,19,19,0.5) 100%)" }} />
          </div>
          <motion.div ref={heroRef} style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1 }}>
            <ContentContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "clamp(24px,3vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "clamp(48px,7vw,96px)", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />Web Development & E-Commerce
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.35)" }}>Build · Optimise · Launch</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(48px,9vw,160px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
                Where Technical Excellence<br /><em style={{ color: ACCENT }}>Meets Business Growth</em>
              </motion.h1>
              <div className="hero-webdev" style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "clamp(32px,5vw,80px)", marginTop: "clamp(48px,6vw,80px)", alignItems: "start" }}>
                <style>{`@media(max-width:768px){.hero-webdev{grid-template-columns:1fr!important}}`}</style>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(17px,1.6vw,22px)", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 clamp(32px,4vw,48px) 0", maxWidth: 640 }}>
                    We build digital experiences that perform flawlessly, convert visitors, and scale with your business. From e-commerce stores to complex web apps, every line of code serves a purpose.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <PrimaryButton onClick={() => go("/contact?selection=Web+Development")}>Start Your Project</PrimaryButton>
                    <SecondaryButton onClick={() => navigate("/featured-work")}>View Our Work</SecondaryButton>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }} style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: "clamp(0px,2vw,32px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  {[{ label: "Stack", value: "React · merchify · Next.js" }, { label: "Delivery", value: "2 to 8+ weeks" }, { label: "Starts From", value: price("Custom merchify Store") }, { label: "Lighthouse", value: "95+ score" }].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(14px,1.3vw,17px)", color: "#fff" }}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ContentContainer>
          </motion.div>
          <BackgroundNumeral value="II" position="right" opacity={0.025} />
        </ServiceSection>

        <WorkStrip />

        <ServiceStatStrip stats={SERVICE_STATS} sectionLabel="Web Development · By the Numbers" />

        {/* ── WHY CUSTOM DEVELOPMENT MATTERS ── */}
        <ServiceSection borderTop>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Why Custom Development Matters</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Drag-and-drop tools get you online fast, <em style={{ color: ACCENT }}>but cap your potential.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 720 }}>They hurt conversions and cost more in the long run.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(48px,6vw,80px)" }} className="why-webdev">
              <style>{`@media(max-width:768px){.why-webdev{grid-template-columns:1fr!important}}`}</style>
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
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, color: "#fff", margin: "0 0 20px 0" }}>Generic, Off-the-Shelf Look</h3>
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

        {/* ── OUR DEVELOPMENT PROCESS ── */}
        <ServiceSection light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(56px,7vw,96px)" }}>
              <Eyebrow>Our Development Process</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0", maxWidth: 900 }}>A structured approach <em style={{ color: ACCENT }}>to builds that perform.</em></h2>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 0" }}>We're not just developers. <span style={{ color: ACCENT }}>We're strategic partners.</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)" }} className="pr-webdev">
              <style>{`@media(max-width:768px){.pr-webdev{grid-template-columns:1fr!important}}`}</style>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)", marginBottom: "clamp(64px,8vw,112px)" }} className="tiers-webdev">
              <style>{`@media(max-width:900px){.tiers-webdev{grid-template-columns:1fr!important}}`}</style>
              {TIERS.map((tier, i) => (
                <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} style={{ background: "#131313", border: `1px solid ${tier.accent}${tier.highlighted ? "50" : "25"}`, borderTop: `4px solid ${tier.accent}`, padding: "clamp(28px,3.5vw,48px)", display: "flex", flexDirection: "column", position: "relative" }}>
                  {tier.highlighted && <div style={{ position: "absolute", top: -1, right: 24, background: tier.accent, color: BLACK, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px" }}>Most Popular</div>}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(22px,2.2vw,28px)", color: "#fff", margin: "0 0 4px 0" }}>{tier.name}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: tier.accent, margin: "0 0 20px 0" }}>{tier.tagline}</p>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(18px,1.8vw,24px)", color: tier.accent, margin: "0 0 4px 0" }}>{price(tier.serviceId)}</div>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "0 0 8px 0" }}>{tier.timeline}</p>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 20px 0", lineHeight: 1.6 }}><strong style={{ color: "rgba(255,255,255,0.7)" }}>Best for:</strong> {tier.bestFor}</p>
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px 0" }} />
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {tier.features.map(f => <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: tier.accent, flexShrink: 0, marginTop: 6 }} />{f}</li>)}
                  </ul>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 600, color: tier.accent, margin: "0 0 20px 0", lineHeight: 1.5 }}><em>You'll Get:</em> {tier.youGet}</p>
                  <button onClick={() => go(`/contact?selection=${encodeURIComponent(tier.name)}`)} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: tier.highlighted ? BLACK : tier.accent, background: tier.highlighted ? tier.accent : "transparent", border: `1px solid ${tier.accent}`, padding: "14px 24px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={e => { if (!tier.highlighted) (e.currentTarget as HTMLElement).style.background = `${tier.accent}15`; }} onMouseLeave={e => { if (!tier.highlighted) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Get Started</button>
                </motion.div>
              ))}
            </div>

            {/* Website Care Plans */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,80px)", maxWidth: 900, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "clamp(48px,6vw,80px)" }}>
              <Eyebrow>Website Care Plans</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Your website is <em style={{ color: ACCENT }}>a living asset.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0 }}>Keep it secure, fast, and optimised with our ongoing care plans.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }} className="care-webdev">
              <style>{`@media(max-width:900px){.care-webdev{grid-template-columns:1fr!important}}`}</style>
              {CARE_PLANS.map((plan, i) => (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} style={{ background: "#131313", border: `1px solid ${plan.accent}${plan.highlighted ? "50" : "25"}`, borderTop: `4px solid ${plan.accent}`, padding: "clamp(28px,3.5vw,48px)", display: "flex", flexDirection: "column", position: "relative" }}>
                  {plan.highlighted && <div style={{ position: "absolute", top: -1, right: 24, background: plan.accent, color: BLACK, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px" }}>Most Popular</div>}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(22px,2.2vw,28px)", color: "#fff", margin: "0 0 4px 0" }}>{plan.name}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: plan.accent, margin: "0 0 20px 0" }}>{plan.tagline}</p>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(18px,1.8vw,24px)", color: plan.accent, margin: "0 0 4px 0" }}>{price(plan.serviceId)}/month</div>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "0 0 8px 0" }}>{plan.billing}</p>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 20px 0", lineHeight: 1.6 }}><strong style={{ color: "rgba(255,255,255,0.7)" }}>Perfect for:</strong> {plan.bestFor}</p>
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px 0" }} />
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {plan.features.map(f => <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: plan.accent, flexShrink: 0, marginTop: 6 }} />{f}</li>)}
                  </ul>
                  <button onClick={() => go(`/contact?selection=${encodeURIComponent(plan.name)}`)} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: plan.highlighted ? BLACK : plan.accent, background: plan.highlighted ? plan.accent : "transparent", border: `1px solid ${plan.accent}`, padding: "14px 24px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.background = `${plan.accent}15`; }} onMouseLeave={e => { if (!plan.highlighted) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Get Started</button>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 22px 0" }}>Ready to make your <em style={{ color: ACCENT }}>website tangible?</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0" }}>Great websites don't happen by accident. They're the result of careful planning, clean code, and relentless refinement. Ready to get started?</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "clamp(56px,7vw,96px)" }}>
                <PrimaryButton onClick={() => go("/contact?selection=Web+Development")}>Schedule a Free Consultation</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/featured-work")}>View Our Work</SecondaryButton>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(40px,5vw,64px)" }} className="cta-steps-webdev">
                <style>{`@media(max-width:768px){.cta-steps-webdev{grid-template-columns:1fr!important}}`}</style>
                {[{ num: "01", title: "Strategy Session", desc: "We discuss your goals and recommend the best approach", c: BLUE }, { num: "02", title: "Custom Proposal", desc: "We create a tailored plan with clear pricing and timeline", c: LAVENDER }, { num: "03", title: "Build & Launch", desc: "We develop, test, and deliver your exceptional website", c: GOLD }].map(step => (
                  <div key={step.num} style={{ padding: "clamp(24px,3vw,40px)", background: `${step.c}14`, textAlign: "left", borderTop: `3px solid ${step.c}` }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", color: step.c, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px,1.6vw,20px)", color: "#fff", margin: "0 0 8px 0" }}>{step.title}</h4>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,3vw,52px)", flexWrap: "nowrap" }}>
                {[{ title: "Quality Guaranteed", sub: "Exceptional results, every time" }, { title: "On-Time Delivery", sub: "We meet deadlines without compromising quality" }, { title: "Built to Scale", sub: "Grows with your business" }].map(g => (
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
