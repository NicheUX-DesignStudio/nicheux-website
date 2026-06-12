// Social Media Marketing Page
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
const ACCENT = GOLD;

const COMPARISONS: ComparisonPair[] = [
  { label: "Content Strategy", beforeSrc: "/images/diagnostics/social-strategy-before.png", afterSrc: "/images/diagnostics/social-strategy-after.png", beforeCaption: "Random posting with no plan. Inconsistent message, zero momentum.", afterCaption: "Data-driven strategy where every post serves a clear business objective." },
  { label: "Brand Consistency", beforeSrc: "/images/diagnostics/social-consistency-before.png", afterSrc: "/images/diagnostics/social-consistency-after.png", beforeCaption: "Mismatched visuals across posts. Followers can't recognise the brand.", afterCaption: "A unified visual identity that builds instant recognition in every scroll." },
  { label: "Conversion", beforeSrc: "/images/diagnostics/social-conversion-before.png", afterSrc: "/images/diagnostics/social-conversion-after.png", beforeCaption: "Likes but no leads. Engagement that never translates to business.", afterCaption: "Content engineered to move followers from passive audience to paying clients." },
];
const SERVICE_STATS: [ServiceStat, ServiceStat, ServiceStat, ServiceStat] = [
  { display: "3×", label: "Average\nengagement growth" },
  { display: "20+", numericTarget: 20, label: "Posts per month\non Professional" },
  { display: "100%", label: "Original content,\nno stock templates" },
  { display: "30", numericTarget: 30, label: "Days to\nfirst traction" },
];
const go = (path: string) => { window.location.href = path; };

const PAIN_POINTS = [
  { title: "Purpose-Driven Strategy", desc: "Every post serves a business objective. No more random content. Just strategic messaging that converts followers into customers." },
  { title: "Scroll-Stopping Content", desc: "We create content that makes people stop scrolling. Motion graphics, custom illustrations, and platform-optimised videos that capture attention." },
  { title: "Data-Driven Optimisation", desc: "We track what works and double down on it. Real analytics that show ROI, not just vanity metrics that look good on paper." },
];
const PROBLEM_BULLETS = ["Posting without purpose or strategy", "No audience analysis or targeting", "Inconsistent visual identity across posts", "No measurement of what's actually working", "Content that doesn't drive action"];
const QUOTE = "Your social media isn't just about posting. It's your direct line to customers. It should build relationships that drive your business forward.";

const PROCESS = [
  { num: "01", accent: GOLD, title: "Strategy & Research", desc: "We analyse your audience, competitors, and goals to create a data-driven social media strategy that aligns with your business objectives.", artifacts: ["Audience Analysis", "Competitor Research", "Content Strategy", "Platform Selection"] },
  { num: "02", accent: LAVENDER, title: "Content Creation & Planning", desc: "Our team produces high-quality content including motion graphics, illustrations, and platform-optimised posts scheduled for maximum impact.", artifacts: ["Content Calendar", "Visual Creation", "Copywriting", "Scheduling"] },
  { num: "03", accent: BLUE, title: "Engagement & Optimisation", desc: "We actively manage your presence, engage with your community, and continuously optimise based on performance analytics.", artifacts: ["Community Management", "Performance Tracking", "Strategy Refinement", "ROI Reporting"] },
];

const PRINCIPLES = [
  { title: "Strategy-Driven Approach", desc: "We don't just post content. We create strategic narratives that align with your business goals and drive meaningful results." },
  { title: "Visual Excellence", desc: "Our in-house motion graphics and design team creates scroll-stopping content that captures attention and converts." },
  { title: "Data-First Decisions", desc: "We track what matters: engagement, conversions, ROI. No vanity metrics, just actionable insights that fuel growth." },
  { title: "Brand Protection", desc: "Professional crisis management and reputation protection ensure your brand stays strong through challenges." },
  { title: "Consistent Excellence", desc: "We deliver quality content on schedule, every time. Your social presence is always active and effective." },
  { title: "Community Building", desc: "We don't just grow followers. We build engaged communities that become brand advocates and loyal customers." },
];

const TIERS = [
  {
    name: "Social Media Starter Plan",
    serviceId: "Social Media Starter Plan",
    tagline: "Build a consistent presence",
    billing: "Monthly rolling",
    platforms: "2 platforms",
    bestFor: "Small businesses and startups who need a professional, consistent presence without the chaos of doing it themselves",
    features: [
      "2 platforms (Instagram + Facebook or Instagram + LinkedIn)",
      "12 posts per month (8 static + 4 carousel)",
      "6 Instagram Stories per month",
      "4 Reels or TikToks per month (15 to 30 seconds)",
      "Caption copywriting with hashtag strategy",
      "Content calendar planned 2 weeks ahead",
      "3 branded Story Highlight covers",
      "Graphics built to your brand guidelines",
      "Comment and basic DM management",
      "Monthly performance report (reach, engagement, follower growth)",
    ],
    youGet: "A professional feed that looks intentional, posts that go out on time, and a team handling it so you never have to think about it",
    accent: GOLD,
  },
  {
    name: "Social Media Professional Plan",
    serviceId: "Social Media Professional Plan",
    tagline: "Grow, engage, convert",
    billing: "Monthly rolling",
    platforms: "3 platforms",
    bestFor: "Growing businesses ready to build real engagement, turn followers into customers, and compound month on month",
    features: [
      "3 platforms (Instagram, LinkedIn, and Facebook or TikTok)",
      "20 posts per month (static, carousel, and mixed media)",
      "10 Stories per month",
      "6 Reels or short-form videos per month (up to 60 seconds)",
      "4 LinkedIn-optimised thought leadership posts",
      "Caption copywriting with SEO-optimised hashtag sets",
      "Content calendar planned 3 weeks ahead",
      "Community management and DM response within 24 hours",
      "1 monthly strategy call (45 minutes)",
      "Weekly performance snapshot + monthly deep analytics report",
      "Interactive Story content (polls, quizzes, countdowns)",
      "Competitor monitoring across top 3 brands monthly",
    ],
    youGet: "Content that gets saved, shared, and acted on. A strategy that builds compounding momentum and visibility every month",
    accent: LAVENDER,
    highlighted: true,
  },
  {
    name: "Social Media Enterprise Plan",
    serviceId: "Social Media Enterprise Plan",
    tagline: "Full-scale social operation",
    billing: "Monthly rolling",
    platforms: "All major platforms",
    bestFor: "Established brands and growing companies that need a complete content team without the overhead of hiring one",
    features: [
      "All major platforms (Instagram, LinkedIn, TikTok, Facebook, X, YouTube Shorts)",
      "30 posts per month (static, carousel, produced video, and mixed media)",
      "20 Stories per month across platforms",
      "8 Reels or short-form videos per month (produced by our motion team)",
      "4 custom illustrations per month (original artwork, not stock)",
      "4 branded motion graphics per month",
      "2 LinkedIn articles or newsletters per month",
      "Full caption copywriting and tone-of-voice management",
      "Dedicated account manager with direct messaging access",
      "Full community management across all platforms (under 2 hours business hours)",
      "Weekly strategy call (30 minutes)",
      "Monthly deep analytics and competitor intelligence report",
      "A/B testing on content formats, CTAs, and post timing",
      "Campaign planning for up to 2 launches or promotions per month",
      "Ad creative production for paid campaigns (up to 4 creatives, ad spend not included)",
    ],
    youGet: "A complete in-house social team without the hiring. Every piece of content is original, on-brand, and built to perform at every stage of your funnel",
    accent: BLUE,
  },
];

const FAQS = [
  { q: "What's included in your social media management?", a: "Every plan includes strategy, content creation (graphics, captions, Reels), scheduling, community management, and monthly performance reporting. The Professional plan adds thought leadership posts and competitor monitoring. Enterprise adds motion graphics, custom illustrations, LinkedIn articles, and ad creative production." },
  { q: "How many Reels or videos do you produce per month?", a: "The Starter plan includes 4 Reels or TikToks per month. Professional includes 6 (up to 60 seconds each). Enterprise includes 8 produced by our in-house motion team, plus 4 branded motion graphics. No stock footage, no templates." },
  { q: "Do you manage LinkedIn as well as Instagram?", a: "Yes. Every plan covers LinkedIn. The Professional plan includes 4 LinkedIn-optimised thought leadership posts per month. Enterprise includes 2 LinkedIn articles or newsletters monthly, written in your voice." },
  { q: "How do you measure results?", a: "We track engagement rate, reach, follower growth, website clicks, and lead generation, not impressions and likes. The Professional plan includes a weekly snapshot and monthly deep report. Enterprise adds competitor intelligence and A/B testing results." },
  { q: "Can I cancel or change my plan anytime?", a: "Yes. All plans are month-to-month with no lock-in. You can upgrade, downgrade, or pause with 30 days notice. Most clients start on Starter to test the relationship, then move to Professional within 2 to 3 months." },
  { q: "How quickly will I see results?", a: "Initial traction typically shows in the first 30 to 60 days. Consistent growth compounds over 3 to 6 months. We set clear monthly benchmarks so you know exactly what you're getting and when." },
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

export default function SocialMediaMarketingPage() {
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
        <title>Social Media Marketing | NicheUX. Strategic Social Media Management</title>
        <meta name="description" content="Transform your social media from random posting to strategic growth engine. Building communities that drive real business results." />
        <link rel="canonical" href="https://www.nicheux.com/social-media-marketing" />
      </Helmet>      <main id="main-content">

        {/* ── HERO ── */}
        <ServiceSection withSpotlight spotlightColor={ACCENT} borderTop={false} id="hero">
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <img src="/images/SocialMediaGraphicsHero.webp" alt="" loading="eager" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "saturate(0.45)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, rgba(19,19,19,0.98) 0%, rgba(19,19,19,0.88) 45%, rgba(19,19,19,0.5) 100%)" }} />
          </div>
          <motion.div ref={heroRef} style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1 }}>
            <ContentContainer>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "clamp(24px,3vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "clamp(48px,7vw,96px)", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />Social Media Marketing
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.35)" }}>Strategy · Creation · Growth</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(48px,9vw,160px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
                Elevate Your Social.<br /><em style={{ color: ACCENT }}>Start Connecting.</em>
              </motion.h1>
              <div className="hero-social" style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "clamp(32px,5vw,80px)", marginTop: "clamp(48px,6vw,80px)", alignItems: "start" }}>
                <style>{`@media(max-width:768px){.hero-social{grid-template-columns:1fr!important}}`}</style>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(17px,1.6vw,22px)", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 clamp(32px,4vw,48px) 0", maxWidth: 640 }}>
                    We transform your social media from random posting to strategic growth engine. Building communities that drive real business results.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <PrimaryButton onClick={() => go("/contact?selection=Social+Media+Marketing")}>Start Your Project</PrimaryButton>
                    <SecondaryButton onClick={() => navigate("/featured-work/sooraj-linkedin")}>View Our Work</SecondaryButton>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }} style={{ display: "flex", flexDirection: "column", gap: 28, paddingLeft: "clamp(0px,2vw,32px)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  {[{ label: "Platforms", value: "Insta · LinkedIn · TikTok" }, { label: "Delivery", value: "Monthly rolling" }, { label: "First Batch", value: "Within 7 to 10 days" }, { label: "Starts From", value: price("Social Media Starter Plan") }].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(14px,1.3vw,17px)", color: "#fff" }}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ContentContainer>
          </motion.div>
          <BackgroundNumeral value="V" position="right" opacity={0.025} />
        </ServiceSection>

        <WorkStrip />

        <ServiceStatStrip stats={SERVICE_STATS} sectionLabel="Social Media · By the Numbers" />

        {/* ── WHY STRATEGIC SOCIAL MATTERS ── */}
        <ServiceSection borderTop>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
              <Eyebrow>Why Strategic Social Media Matters</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0" }}>Random posting <em style={{ color: ACCENT }}>gets you nowhere.</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 720 }}>Strategic social media builds communities, drives revenue, and creates lasting brand loyalty.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(48px,6vw,80px)" }} className="why-social">
              <style>{`@media(max-width:768px){.why-social{grid-template-columns:1fr!important}}`}</style>
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
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, color: "#fff", margin: "0 0 20px 0" }}>Random Posting</h3>
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

        {/* ── OUR SOCIAL MEDIA PROCESS ── */}
        <ServiceSection light>
          <ContentContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(56px,7vw,96px)" }}>
              <Eyebrow>Our Social Media Process</Eyebrow>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "20px 0 16px 0", maxWidth: 900 }}>From random posting <em style={{ color: ACCENT }}>to strategic growth.</em></h2>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: "20px 0 0" }}>We're not just managers. <span style={{ color: ACCENT }}>We're strategic partners.</span></h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)" }} className="pr-social">
              <style>{`@media(max-width:768px){.pr-social{grid-template-columns:1fr!important}}`}</style>
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
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.55)", margin: 0 }}>Month-to-month. No lock-in. Cancel anytime with 30 days notice.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(12px,2vw,20px)" }} className="tiers-social">
              <style>{`@media(max-width:900px){.tiers-social{grid-template-columns:1fr!important}}`}</style>
              {TIERS.map((tier, i) => (
                <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }} style={{ background: "#131313", border: `1px solid ${tier.accent}${tier.highlighted ? "50" : "25"}`, borderTop: `4px solid ${tier.accent}`, padding: "clamp(28px,3.5vw,48px)", display: "flex", flexDirection: "column", position: "relative" }}>
                  {tier.highlighted && <div style={{ position: "absolute", top: -1, right: 24, background: tier.accent, color: BLACK, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px" }}>Most Popular</div>}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(20px,2vw,26px)", color: "#fff", margin: "0 0 4px 0" }}>{tier.name}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: tier.accent, margin: "0 0 20px 0" }}>{tier.tagline}</p>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(18px,1.8vw,24px)", color: tier.accent, margin: "0 0 4px 0" }}>{price(tier.serviceId)}/month</div>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "0 0 4px 0" }}>{tier.billing} · {tier.platforms}</p>
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
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }} viewport={{ once: true }} style={{ textAlign: "center", marginTop: "clamp(40px,5vw,64px)" }}>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 16px 0" }}>Need help choosing the right plan?</p>
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 22px 0" }}>Ready to elevate your <em style={{ color: ACCENT }}>social presence?</em></h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 32px 0" }}>Stop guessing and start growing. Let's build a social media strategy that drives real business results and creates lasting customer relationships.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "clamp(56px,7vw,96px)" }}>
                <PrimaryButton onClick={() => go("/contact?selection=Social+Media+Marketing")}>Schedule a Free Consultation</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/featured-work/sooraj-linkedin")}>View Our Work</SecondaryButton>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(40px,5vw,64px)" }} className="cta-steps-social">
                <style>{`@media(max-width:768px){.cta-steps-social{grid-template-columns:1fr!important}}`}</style>
                {[{ num: "01", title: "Strategy Session", desc: "We analyse your goals, audience, and current presence", c: GOLD }, { num: "02", title: "Custom Proposal", desc: "Tailored strategy and transparent pricing", c: BLUE }, { num: "03", title: "Post & Grow", desc: "We implement and optimise your social success", c: LAVENDER }].map(step => (
                  <div key={step.num} style={{ padding: "clamp(24px,3vw,40px)", background: `${step.c}14`, textAlign: "left", borderTop: `3px solid ${step.c}` }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4vw,48px)", color: step.c, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px,1.6vw,20px)", color: "#fff", margin: "0 0 8px 0" }}>{step.title}</h4>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,3vw,52px)", flexWrap: "nowrap" }}>
                {[{ title: "Quality Guaranteed", sub: "Exceptional results, every time" }, { title: "On-Time Delivery", sub: "We meet deadlines without compromising quality" }, { title: "Strategic Approach", sub: "We recommend what's truly best for your project" }].map(g => (
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
