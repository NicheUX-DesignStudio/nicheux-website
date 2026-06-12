// Motion Design & AI Visuals Page
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

const MOTION_TABS: ServiceTabGroup[] = [
  { label: "Motion Graphics", items: [
    { name: "30s Explainer Video", serviceId: "30s Explainer Video", desc: "Complete script, voiceover, animation, and sound design" },
    { name: "Logo Animation", serviceId: "Logo Animation", desc: "5 to 10 second animation with 3 unique concepts" },
    { name: "Social Media Video Pack", serviceId: "Social Media Video Pack", desc: "3 videos of 15 to 30 seconds optimised for social platforms" },
    { name: "Character Animation", serviceId: "Character Animation", desc: "30 second character animation with personality and emotion" },
  ]},
  { label: "AI Visual Tools", items: [
    { name: "AI Video Generation", serviceId: "AI Video Generation", desc: "1 to 2 minute AI video with professional refinement" },
    { name: "AI Style Transfer", serviceId: "AI Style Transfer", desc: "Apply artistic styles to footage with quality control" },
    { name: "Rapid Concept Testing", serviceId: "Rapid Concept Testing", desc: "5 AI-generated concepts with strategic analysis" },
    { name: "AI Content Expansion", serviceId: "AI Content Expansion", desc: "Create variations from existing videos with AI" },
  ]},
  { label: "Combined Solutions", items: [
    { name: "Starter Creative Suite", serviceId: "Starter Creative Suite", desc: "AI testing plus basic motion execution" },
    { name: "Pro Creative Powerhouse", serviceId: "Pro Creative Powerhouse", desc: "Full AI exploration plus professional motion package" },
    { name: "Enterprise Visual Suite", serviceId: "Enterprise Visual Suite", desc: "Custom AI and motion workflow for large projects" },
  ]},
];

const COMPARISONS: ComparisonPair[] = [
  { label: "Brand Animation", beforeSrc: "/images/diagnostics/motion-brand-before.png", afterSrc: "/images/diagnostics/motion-brand-after.png", beforeCaption: "Static logo on a coloured background. Forgettable in every feed and presentation.", afterCaption: "A living brand identity that moves with purpose and stops the scroll every time." },
  { label: "Scroll Retention", beforeSrc: "/images/diagnostics/motion-scroll-before.png", afterSrc: "/images/diagnostics/motion-scroll-after.png", beforeCaption: "Text-heavy content that users skip past in the first two seconds.", afterCaption: "Motion-led storytelling that holds attention for the full message duration." },
  { label: "AI Enhancement", beforeSrc: "/images/diagnostics/motion-ai-before.png", afterSrc: "/images/diagnostics/motion-ai-after.png", beforeCaption: "Generic stock visuals that look like everyone else's campaign.", afterCaption: "AI-crafted visuals with a unique aesthetic that no competitor can replicate." },
];
const SERVICE_STATS: [ServiceStat, ServiceStat, ServiceStat, ServiceStat] = [
  { display: "48h", label: "Storyboard\ndelivery" },
  { display: "4K", label: "Export quality\nas standard" },
  { display: "3", numericTarget: 3, label: "Unique concepts\nevery project" },
  { display: "AI+", label: "Traditional craft\nmeets AI" },
];
const go = (path: string) => { window.location.href = path; };

const PAIN_POINTS = [
  { title: "Lost Engagement Opportunities", desc: "Poor quality videos get skipped. Professional motion graphics capture attention and keep viewers watching until your key message." },
  { title: "Brand Trust Erosion", desc: "Amateur visuals undermine credibility. Polished animations signal professionalism and build confidence in your brand." },
  { title: "Missed Conversion Moments", desc: "Unclear messaging fails to drive action. Strategic animation guides viewers toward your desired outcome with precision." },
];
const PROBLEM_BULLETS = ["No clear narrative structure", "Confusing message flow", "Missing call-to-action", "Unclear value proposition", "Visuals that don't match the brand"];
const QUOTE = "Video isn't just about looking good. It's about creating connections that drive business growth. We make every frame count.";

const DUAL_APPROACH = [
  { title: "Traditional Craftsmanship", desc: "Precision animation and emotional storytelling that builds lasting brand connections", points: ["Frame-perfect timing", "Emotional storytelling", "Brand consistency", "Strategic messaging"], accent: BLUE },
  { title: "AI Innovation", desc: "Rapid ideation and production acceleration that expands creative boundaries", points: ["Instant concept generation", "Style exploration", "Rapid iteration", "Cost efficiency"], accent: LAVENDER },
  { title: "Perfect Synergy", desc: "Where human creativity meets AI efficiency for unprecedented results", points: ["60% faster production", "Higher creative quality", "More innovative outcomes", "Optimal ROI"], accent: GOLD },
];

const PROCESS = [
  { num: "01", accent: LAVENDER, title: "Strategy & Approach Selection", desc: "We analyse your goals to recommend the perfect blend of traditional craftsmanship and AI innovation.", artifacts: ["Goal Analysis", "Approach Recommendation", "Timeline Planning", "Budget Optimisation"] },
  { num: "02", accent: GOLD, title: "Creative Execution", desc: "Our team executes using the optimal mix of hand-crafted animation and AI-powered tools.", artifacts: ["Traditional Animation", "AI Enhancement", "Quality Refinement", "Brand Alignment"] },
  { num: "03", accent: BLUE, title: "Polish & Multi-Platform Delivery", desc: "We apply final touches and optimise for every platform, ensuring perfect presentation everywhere.", artifacts: ["Platform Optimisation", "Quality Assurance", "Performance Review", "Multi-Format Delivery"] },
];

const PRINCIPLES = [
  { title: "Strategic Guidance", desc: "We help you choose the right approach for your specific goals, timeline, and budget." },
  { title: "Dual Expertise", desc: "Deep expertise in both traditional motion graphics and cutting-edge AI tools." },
  { title: "Quality Guaranteed", desc: "Whether AI or traditional, every project meets our exacting quality standards." },
  { title: "Innovation Focus", desc: "We stay at the forefront of both animation techniques and AI advancements." },
  { title: "Flexible Workflows", desc: "Seamlessly switch between AI speed and traditional precision as needed." },
  { title: "Results-Driven", desc: "We optimise for your goals: speed, quality, or the perfect balance." },
];

const PACKAGES = [
  { name: "Motion Excellence", serviceId: "Motion Excellence", desc: "Premium motion graphics for brand-building campaigns", features: ["30s Explainer Video", "Logo Animation", "Social Media Video Pack", "Professional Editing"], accent: BLUE, highlight: false },
  { name: "AI Innovation Suite", serviceId: "AI Innovation Suite", desc: "Cutting-edge AI tools for rapid content creation", features: ["AI Video Generation", "AI Style Transfer", "Rapid Concept Testing", "AI Content Expansion"], accent: LAVENDER, highlight: false },
  { name: "Creative Power Duo", serviceId: "Creative Power Duo", desc: "The perfect blend of AI and traditional approaches", features: ["AI Concept Testing", "30s Explainer Video", "Social Media Video Pack", "Rapid Prototyping"], accent: GOLD, highlight: true },
];

const FAQS = [
  { q: "How do I choose between AI and traditional motion graphics?", a: "We recommend AI when you need rapid concept exploration, high volume content, or tight budgets. Traditional is better for brand-defining campaigns, character animation, and precision storytelling. Often the best result combines both: AI for speed, traditional for polish." },
  { q: "Can AI tools match the quality of traditional motion graphics?", a: "For certain styles and outputs, yes. For others, no. AI excels at image-based video, style transfers, and rapid iteration. Traditional motion graphics remain superior for custom character animation, complex brand storytelling, and frame-perfect timing. We'll tell you honestly which approach fits your project." },
  { q: "What's the typical turnaround time for each approach?", a: "AI projects can turn around in 3 to 7 days. Traditional motion graphics typically take 2 to 4 weeks depending on complexity. Combined approaches fall in between, often 1 to 2 weeks. We provide exact timelines after a brief review." },
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

export default function MotionDesignAIVisualsPage() {
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
        <title>Motion Design & AI Visuals | NicheUX</title>
        <meta name="description" content="Traditional motion graphics excellence and cutting-edge AI innovation. Both approaches deliver exceptional results for different needs and goals." />
        <link rel="canonical" href="https://www.nicheux.com/motion-design-ai-visuals" />
      </Helmet>      <main id="main-content">

        {/* ── HERO ── */}
        <ServiceSection withSpotlight spotlightColor={ACCENT} borderTop={false} id="hero">
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <img src="/images/MotionGraphicsAIVisualsHero.webp" alt="" loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "saturate(0.45)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, rgba(19,19,19,0.98) 0%, rgba(19,19,19,0.88) 45%, rgba(19,19,19,0.5) 100%)" }} />
          </div>
          <motion.div ref={heroRef} style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1 }}>
            <ContentContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "clamp(24px,3vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "clamp(48px,7vw,96px)", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />Motion Graphics × AI Visuals
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.35)" }}>Craft · Innovation · Story</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(48px,9vw,160px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
                Where Craftsmanship<br /><em style={{ color: ACCENT }}>Meets Innovation</em>
              </motion.h1>
              <div className="hero-motion" style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "clamp(32px,5vw,80px)", marginTop: "clamp(48px,6vw,80px)", alignItems: "start" }}>
                <style>{`@media(max-width:768px){.hero-motion{grid-template-columns:1fr!important}}`}</style>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(17px,1.6vw,22px)", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 clamp(32px,4vw,48px) 0", maxWidth: 640 }}>
                    Choose between traditional motion graphics excellence and cutting-edge AI innovation. Both approaches deliver exceptional results for different needs and goals.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <PrimaryButton onClick={() => go("/contact?selection=Motion+Design+%26+AI+Visuals")}>Start Your Project</PrimaryButton>
                    <SecondaryButton onClick={() => navigate("/featured-work")}>View Our Work</SecondaryButton>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }} style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: "clamp(0px,2vw,32px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  {[{ label: "Approaches", value: "Traditional · AI · Hybrid" }, { label: "Delivery", value: "3 days to 4 weeks" }, { label: "Formats", value: "MP4 · MOV · GIF · WebM" }, { label: "Starts From", value: price("Logo Animation") }].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(14px,1.3vw,17px)", color: "#fff" }}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ContentContainer>
          </motion.div>
          <BackgroundNumeral value="III" position="right" opacity={0.025} />
        </ServiceSection>

        <WorkStrip />

        <ServiceStatStrip stats={SERVICE_STATS} sectionLabel="Motion Design & AI · By the Numbers" />

        {/* ── WHY PROFESSIONAL VIDEO MATTERS ── */}
        <ServiceSection borderTop>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Why Professional Video Matters</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Great video builds trust, <em style={{ color: ACCENT }}>drives engagement.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 720 }}>Poor execution undermines your message and delivers measurably worse business results.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(48px,6vw,80px)" }} className="why-motion">
              <style>{`@media(max-width:768px){.why-motion{grid-template-columns:1fr!important}}`}</style>
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
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, color: "#fff", margin: "0 0 20px 0" }}>Poor Storytelling</h3>
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

        {/* ── OUR DUAL APPROACH ── */}
        <ServiceSection borderTop>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Our Dual Approach</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Choose between traditional excellence <em style={{ color: ACCENT }}>and AI innovation.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 720 }}>Or combine both for the ultimate creative solution. Each method brings unique strengths that deliver exceptional value.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }} className="dual-motion">
              <style>{`@media(max-width:768px){.dual-motion{grid-template-columns:1fr!important}}`}</style>
              {DUAL_APPROACH.map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }} viewport={{ once: true }} style={{ padding: "clamp(28px,3.5vw,48px)", background: "#131313", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ width: 40, height: 3, background: d.accent }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(20px,2vw,26px)", lineHeight: 1.2, color: "#fff", margin: 0 }}>{d.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px,1.1vw,15px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: 0 }}>{d.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {d.points.map(pt => (
                      <li key={pt} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1vw,14px)", color: "rgba(255,255,255,0.65)" }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: d.accent, flexShrink: 0 }} />{pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </ContentContainer>
        </ServiceSection>

        {/* ── WHY WORK WITH US ── */}
        <ServiceSection borderTop light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow color={INK_MUTED}>Why Work With Us</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 0" }}>We master both traditional <span style={{ color: ACCENT }}>and cutting-edge AI.</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)" }} className="pr-motion">
              <style>{`@media(max-width:768px){.pr-motion{grid-template-columns:1fr!important}}`}</style>
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

        {/* ── OUR ADAPTIVE PROCESS ── */}
        <ServiceSection light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(56px,7vw,96px)" }}>
              <Eyebrow>Our Adaptive Process</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0", maxWidth: 900 }}>A flexible workflow that <em style={{ color: ACCENT }}>delivers optimal results.</em></h2>
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

        <BeforeAfterSection pairs={COMPARISONS} accent={ACCENT} />

        {/* ── TRANSPARENT PRICING ── */}
        <ServiceSection borderTop id="pricing">
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)", maxWidth: 900 }}>
              <Eyebrow>Transparent Pricing</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 20px 0" }}>Clear pricing for <em style={{ color: ACCENT }}>both approaches.</em></h2>
            </motion.div>

            {/* Tabbed Individual Services */}
            <ServiceTabs
              tabs={MOTION_TABS}
              accent={ACCENT}
              getPrice={(id) => price(id)}
              onSelect={(name) => go(`/contact?selection=${encodeURIComponent(name)}`)}
            />

            {/* Packages */}
            <Eyebrow>Popular Packages</Eyebrow>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", color: "rgba(255,255,255,0.55)", margin: "16px 0 clamp(32px,4vw,48px) 0" }}>Curated solutions for different creative needs.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }} className="pkgs-motion">
              <style>{`@media(max-width:900px){.pkgs-motion{grid-template-columns:1fr!important}}`}</style>
              {PACKAGES.map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} style={{ background: "#131313", border: `1px solid ${pkg.accent}${pkg.highlight ? "50" : "25"}`, borderTop: `4px solid ${pkg.accent}`, padding: "clamp(28px,3.5vw,48px)", display: "flex", flexDirection: "column", position: "relative" }}>
                  {pkg.highlight && <div style={{ position: "absolute", top: -1, right: 24, background: pkg.accent, color: BLACK, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px" }}>Most Popular</div>}
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(20px,2vw,26px)", color: pkg.accent, margin: "0 0 8px 0" }}>{price(pkg.serviceId)}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(20px,2vw,26px)", color: "#fff", margin: "0 0 8px 0" }}>{pkg.name}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "0 0 20px 0", lineHeight: 1.6 }}>{pkg.desc}</p>
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px 0" }} />
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {pkg.features.map(f => <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,14px)", color: "rgba(255,255,255,0.65)" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: pkg.accent, flexShrink: 0 }} />{f}</li>)}
                  </ul>
                  <button onClick={() => go(`/contact?selection=${encodeURIComponent(pkg.name)}`)} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: pkg.highlight ? BLACK : pkg.accent, background: pkg.highlight ? pkg.accent : "transparent", border: `1px solid ${pkg.accent}`, padding: "14px 24px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={e => { if (!pkg.highlight) (e.currentTarget as HTMLElement).style.background = `${pkg.accent}15`; }} onMouseLeave={e => { if (!pkg.highlight) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Get This Package</button>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 22px 0" }}>Ready to bring your <em style={{ color: ACCENT }}>vision to life?</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0" }}>Whether you need the precision of traditional motion graphics or the speed of AI innovation, we'll help you choose the perfect approach.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "clamp(56px,7vw,96px)" }}>
                <PrimaryButton onClick={() => go("/contact?selection=Motion+Design+%26+AI+Visuals")}>Schedule a Free Consultation</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/featured-work")}>View Our Work</SecondaryButton>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(40px,5vw,64px)" }} className="cta-steps-motion">
                <style>{`@media(max-width:768px){.cta-steps-motion{grid-template-columns:1fr!important}}`}</style>
                {[{ num: "01", title: "Strategy Session", desc: "We discuss your goals and recommend the best approach", c: LAVENDER }, { num: "02", title: "Custom Proposal", desc: "We create a tailored plan with clear pricing and timeline", c: GOLD }, { num: "03", title: "Create & Launch", desc: "We produce and launch your exceptional video content", c: BLUE }].map(step => (
                  <div key={step.num} style={{ padding: "clamp(24px,3vw,40px)", background: `${step.c}14`, textAlign: "left", borderTop: `3px solid ${step.c}` }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", color: step.c, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px,1.6vw,20px)", color: "#fff", margin: "0 0 8px 0" }}>{step.title}</h4>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,3vw,52px)", flexWrap: "nowrap" }}>
                {[{ title: "Quality Guaranteed", sub: "Exceptional results, regardless of approach" }, { title: "On-Time Delivery", sub: "We meet deadlines without compromising quality" }, { title: "Strategic Approach", sub: "We recommend what's truly best for your project" }].map(g => (
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
