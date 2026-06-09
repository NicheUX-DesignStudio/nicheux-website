import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE, BLACK, PARCHMENT, INK, INK_SOFT, INK_MUTED } from "@/constants/theme";

// ── PRODUCTIONS DATA ──────────────────────────────────────────────────────────

const CLIENT = [
  {
    id: "bloom-brew",
    num: "01",
    title: "Bloom & Brew",
    sub: "Coffee Company",
    discipline: "Web Development · merchify",
    country: "Canada",
    tagline: "Launched into 3 international markets on day one.",
    story: "Custom Liquid theme from scratch. A pâtissière's brand built for an international audience. every pixel earned its place on a £0-template budget.",
    image: "/images/bloombrewhero.webp",
    accent: GOLD,
    route: "/featured-work/bloom-brew",
    featured: true,
  },
  {
    id: "nandhinidc",
    num: "02",
    title: "NandhiniDC",
    sub: "Interior Architecture Studio",
    discipline: "Web Design & Development",
    country: "India",
    tagline: "Architectural storytelling that earned new commissions.",
    story: '"We don\'t build structures. We stage life." Daylight toggle, draggable horizontal reel, four completed projects and one in design.',
    image: "/images/nandhinidc/stone-facade-1.webp",
    accent: LAVENDER,
    route: "/featured-work/nandhinidc",
  },
  {
    id: "kishore-portfolio",
    num: "03",
    title: "Kishore Aravind",
    sub: "K29. Performance Architecture",
    discipline: "Web Design & UX",
    country: "Malaysia",
    tagline: "Drag the wheel to navigate. The system holds both careers.",
    story: "K29. squash coach, designer, one portfolio. A draggable navigation wheel. Gauge meter hero. Kinetic red and systematic cyan. Built like a performance system.",
    image: "/images/kishore-k29.jpg",
    accent: BLUE,
    route: "/featured-work/kishore-portfolio",
  },
  {
    id: "sooraj-linkedin",
    num: "04",
    title: "Sooraj Nikam",
    sub: "LinkedIn Banner",
    discipline: "Career Brand Design",
    country: "Ireland",
    tagline: "Designed to be seen before the first connection request.",
    story: "Data & AI Graduate. 4× international publications. MSc Galway. One banner that makes the case before anyone reads the About section.",
    image: "/images/sooraj/linkedin/banner-green.png",
    imagePosition: "center 30%",
    accent: BLUE,
    route: "/featured-work/sooraj-linkedin",
  },
  {
    id: "sooraj-wanted",
    num: "05",
    title: "The Generation Conversation",
    sub: "LinkedIn Carousel",
    discipline: "Social Media Content",
    country: "Ireland",
    tagline: "Brief received evening. Live by 4am.",
    story: "Sooraj attended an entrepreneurship event at PorterShed Galway. Eight Wanted poster slides built overnight. content that felt like him, not a reshare.",
    image: "/images/sooraj/carousel/slide-1.png",
    accent: GOLD,
    route: "/featured-work/sooraj-wanted",
  },
  {
    id: "sooraj-candy-shop",
    num: "06",
    title: "Kingdom of Sweets",
    sub: "Event Arch Banner",
    discipline: "Brand Identity · Print",
    country: "Ireland",
    tagline: "A brand that looks sweet before you taste it.",
    story: "Arch banner for a candy shop brand. Heritage aesthetic, photogenic, built to be the most photographed backdrop at the event.",
    image: "/images/sooraj/candy/no-texture.png",
    accent: LAVENDER,
    route: "/featured-work/sooraj-candy-shop",
  },
  {
    id: "ssjc-tournament",
    num: "07",
    title: "SSJC Tournament",
    sub: "10th redONE Mobile SSJC",
    discipline: "Print & Brand Design",
    country: "Malaysia",
    tagline: "GAME ON. Two legs, two visual identities, one gaming universe.",
    story: "Retro Purple Leg 1. Cyber Blue Leg 2. T-shirts, lanyards, medals, event posters. a gaming-style identity for Malaysia's premier junior squash circuit.",
    image: "/images/ssjc/poster-leg2.jpeg",
    imagePosition: "center top",
    accent: GOLD,
    route: "/featured-work/ssjc-tournament",
  },
  {
    id: "midas",
    num: "08",
    title: "Midas Utara Engineering",
    sub: "Biogas Flaring System",
    discipline: "Video Editing · Multilingual",
    country: "Malaysia",
    tagline: "Three languages. One engineering standard.",
    story: "Biogas flaring system promotional reel for Carlsberg Shah Alam Wastewater Treatment Plant. English, Malay, and Tamil versions. Raw footage elevated to multilingual marketing asset.",
    image: "/images/midas-cover.jpg",
    accent: GOLD,
    route: "/featured-work/midas",
  },
];

const STUDIO = [
  {
    id: "visual-communication",
    num: "09",
    title: "Visual Communication",
    discipline: "Print · Advertising",
    tagline: "Commercial precision meeting editorial craft.",
    story: "High-impact visual work across advertising, editorial, and commercial campaigns.",
    image: "/images/PrintBrandHeroWork.webp",
    accent: GOLD,
    route: "/featured-work/visual-communication",
  },
  {
    id: "conceptual-art",
    num: "10",
    title: "Conceptual Art",
    discipline: "High-Detail Illustration",
    tagline: "Technical mastery for publishing, gaming and branding.",
    story: "Visualising complex themes with technical discipline for publishing and visual branding worlds.",
    image: "/images/ConceptualArtHeroWork.webp",
    accent: BLUE,
    route: "/featured-work/conceptual-art",
  },
  {
    id: "sequential-art",
    num: "11",
    title: "Sequential Art",
    discipline: "Comics & Storytelling",
    tagline: "Relatable narratives built for digital-first audiences.",
    story: "High-engagement storytelling through comics that drive social media presence and audience loyalty.",
    image: "/images/ComicHeroWork.webp",
    accent: LAVENDER,
    route: "/featured-work/sequential-art",
  },
  {
    id: "ai-canvas",
    num: "12",
    title: "AI Canvas",
    discipline: "Generative · Motion",
    tagline: "Where human imagination meets generative direction.",
    story: "Exploring the creative frontier at the intersection of craft, vision, and artificial intelligence.",
    image: "/images/AIHeroWork.webp",
    accent: GOLD,
    route: "/featured-work/ai-canvas",
  },
  {
    id: "london-tube-reel",
    num: "14",
    title: "London Underground Series",
    discipline: "Behavioural Design · Motion",
    tagline: "The Tube as the world's best UX laboratory.",
    story: "Schema Hijacking, Disfluency, Dual Coding deconstructed from Victoria Line advertising. Captured at King's Cross peak hours.",
    image: "/images/london-tube-thumb.jpg",
    accent: LAVENDER,
    route: "/featured-work/london-tube-reel",
  },
];

const TOTAL = CLIENT.length + STUDIO.length;

// ── SPOTLIGHT CURSOR ───────────────────────────────────────────────────────────

function SpotlightCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setActive(true); };
    const leave = () => setActive(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: 600, height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle at center, ${GOLD}08 0%, ${GOLD}03 35%, transparent 70%)`,
        transform: `translate(${pos.x - 300}px, ${pos.y - 300}px)`,
        pointerEvents: "none",
        zIndex: 1,
        transition: "transform 0.08s linear, opacity 0.3s ease",
        opacity: active ? 1 : 0,
      }}
    />
  );
}

// ── REVOLVING SPOTLIGHT ───────────────────────────────────────────────────────
// Each client project takes the centre stage in turn. Auto-advances every 5s.

// ── ORBITAL ORRERY ────────────────────────────────────────────────────────────
// Projects as planets on an orbit. Each takes a turn at the active position (top).
// Center shows the active project's details. Planets animate smoothly to new positions.

const ORRERY_PROJECTS = CLIENT.filter(p => !("pending" in p && (p as any).pending));

function OrreryShowcase({ onNavigate }: { onNavigate: (route: string) => void }) {
  const N = ORRERY_PROJECTS.length;
  const STEP = 360 / N;

  const [activeIdx, setActiveIdx] = useState(0);
  const [baseAngle, setBaseAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: "0px" });

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  function goNext() { setActiveIdx(i => (i + 1) % N); setBaseAngle(a => a - STEP); }
  function goPrev() { setActiveIdx(i => (i - 1 + N) % N); setBaseAngle(a => a + STEP); }
  function selectPlanet(target: number) {
    if (target === activeIdx) return;
    const diff = ((target - activeIdx) + N) % N;
    if (diff <= N - diff) { setBaseAngle(a => a - diff * STEP); } else { setBaseAngle(a => a + (N - diff) * STEP); }
    setActiveIdx(target);
    setPaused(true);
  }

  // Auto-advance every 4s
  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, 2500);
    return () => clearInterval(t);
  }, [paused, N, activeIdx]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); setPaused(true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev(); setPaused(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [N]);

  const active = ORRERY_PROJECTS[activeIdx];

  // SVG coordinate system: 1000×1000 viewBox, center (500,500)
  // Active position is at RIGHT (3 o'clock = 0°) not top
  const CX = 500;
  const CY = 500;
  const ORBIT_R = 390;
  const PLANET_R = 58;

  function getAngleDeg(i: number): number {
    return i * STEP + baseAngle;
  }

  function polarToXY(deg: number): { x: number; y: number } {
    const rad = (deg * Math.PI) / 180;
    return { x: CX + Math.cos(rad) * ORBIT_R, y: CY + Math.sin(rad) * ORBIT_R };
  }

  return (
    <section
      style={{ background: PARCHMENT, padding: "clamp(40px,5vw,72px) clamp(24px,6vw,80px)", position: "relative", overflow: "hidden", borderBottom: `1px solid ${INK}12`, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Section label */}
      <div ref={inViewRef} style={{ maxWidth: 1400, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(32px,5vw,56px)" }}
        >
          <div style={{ width: 24, height: 1, background: INK }} />
          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: INK }}>
            Every production · in orbit
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 12, color: INK_MUTED }}>
            Click any planet to bring it to centre stage
          </span>
        </motion.div>

        {isMobile ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "8px 0 8px" }}
            >
              <svg width="200" height="200" viewBox="0 0 200 200" style={{ overflow: "visible", flexShrink: 0 }}>
                <defs>
                  <clipPath id="mob-orbit-clip">
                    <circle cx="100" cy="100" r="90" />
                  </clipPath>
                </defs>
                <circle cx="100" cy="100" r="96" fill="none" stroke={active.accent} strokeWidth="1.5" strokeOpacity="0.6" />
                <circle cx="100" cy="100" r="96" fill="none" stroke={active.accent} strokeWidth="18" strokeOpacity="0.06" />
                {active.image && (
                  <image href={active.image} x="10" y="10" width="180" height="180" clipPath="url(#mob-orbit-clip)" preserveAspectRatio="xMidYMid slice" />
                )}
              </svg>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 13, color: active.accent, marginBottom: 8, letterSpacing: "0.06em" }}>
                  {active.num}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(26px, 7vw, 38px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: INK, margin: "0 0 10px" }}>
                  {active.title}
                </h3>
                <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: active.accent, marginBottom: 4 }}>
                  {active.discipline.toUpperCase()}
                </div>
                {"country" in active && (
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, color: INK_MUTED }}>
                    {(active as any).country}
                  </div>
                )}
              </div>
              <button
                onClick={() => onNavigate(active.route)}
                style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: BLACK, background: active.accent, border: "none", padding: "14px 32px", cursor: "pointer", borderRadius: 2 }}
              >
                Read Case Study
              </button>
            </motion.div>
          </AnimatePresence>
        ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <svg
            viewBox="0 0 1000 1000"
            style={{ width: "min(calc(100vh - 200px), 88vw, 900px)", height: "min(calc(100vh - 200px), 88vw, 900px)", overflow: "visible" }}
          >
            <defs>
              {ORRERY_PROJECTS.map((_, i) => (
                <clipPath key={i} id={`op-clip-${i}`}>
                  <circle cx="0" cy="0" r={PLANET_R - 3} />
                </clipPath>
              ))}
              <radialGradient id="op-center-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={active.accent} stopOpacity="0.12" />
                <stop offset="100%" stopColor={active.accent} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient center glow */}
            <circle cx={CX} cy={CY} r="220" fill="url(#op-center-glow)" />

            {/* Inner dashed ring around center */}
            <circle cx={CX} cy={CY} r="130" fill="none" stroke={`${INK}12`} strokeWidth="0.5" strokeDasharray="2 8" />

            {/* Orbit ring */}
            <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke={`${INK}22`} strokeWidth="1" strokeDasharray="3 11" />
            {/* Second orbit ring. faint outer halo */}
            <circle cx={CX} cy={CY} r={ORBIT_R + 18} fill="none" stroke={`${INK}06`} strokeWidth="8" />

            {/* Active position marker */}
            <circle cx={CX + ORBIT_R} cy={CY} r="7" fill={active.accent} opacity="0.85" />
            <circle cx={CX + ORBIT_R} cy={CY} r="18" fill={active.accent} opacity="0.07" />

            {/* Dashed line: center → active planet on right */}
            <motion.line
              key={`line-${activeIdx}`}
              x1={CX + 130}
              y1={CY}
              x2={CX + ORBIT_R - PLANET_R - 4}
              y2={CY}
              stroke={active.accent} strokeWidth="0.8"
              strokeOpacity="0.3" strokeDasharray="5 7"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Center info. pure SVG text on parchment */}
            <AnimatePresence mode="wait">
              <motion.g
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Number */}
                <text x={CX} y={CY - 100} textAnchor="middle"
                  fontFamily="'Cormorant Garamond', serif" fontStyle="italic"
                  fontSize="32" fill={active.accent} fillOpacity="0.9">
                  {active.num}
                </text>
                {/* Title. split to 2 lines if long */}
                {active.title.length > 11 ? (
                  <>
                    <text x={CX} y={CY - 48} textAnchor="middle"
                      fontFamily="'Cormorant Garamond', serif" fontWeight="300"
                      fontSize="54" fill={INK}>
                      {active.title.split(" ").slice(0, Math.ceil(active.title.split(" ").length / 2)).join(" ")}
                    </text>
                    <text x={CX} y={CY + 16} textAnchor="middle"
                      fontFamily="'Cormorant Garamond', serif" fontWeight="300"
                      fontSize="54" fill={INK}>
                      {active.title.split(" ").slice(Math.ceil(active.title.split(" ").length / 2)).join(" ")}
                    </text>
                  </>
                ) : (
                  <text x={CX} y={CY - 16} textAnchor="middle"
                    fontFamily="'Cormorant Garamond', serif" fontWeight="300"
                    fontSize="60" fill={INK}>
                    {active.title}
                  </text>
                )}
                {/* Discipline */}
                <text x={CX} y={CY + 58} textAnchor="middle"
                  fontFamily="'Source Sans Pro', sans-serif" fontWeight="600"
                  fontSize="18" letterSpacing="2.5" fill={active.accent}>
                  {(active.discipline).toUpperCase()}
                </text>
                {/* Country */}
                <text x={CX} y={CY + 84} textAnchor="middle"
                  fontFamily="'Source Sans Pro', sans-serif"
                  fontSize="18" fill={INK_MUTED}>
                  {"country" in active ? (active as any).country : ""}
                </text>
                {/* CTA button */}
                <g style={{ cursor: "pointer" }} onClick={() => onNavigate(active.route)}
                  role="button" aria-label={`Read ${active.title} case study`}>
                  <rect
                    x={CX - 130} y={CY + 104}
                    width="260" height="46" rx="4"
                    fill={active.accent}
                  />
                  <text x={CX} y={CY + 133} textAnchor="middle"
                    fontFamily="'Source Sans Pro', sans-serif" fontWeight="700"
                    fontSize="16" letterSpacing="3" fill={BLACK}>
                    READ CASE STUDY
                  </text>
                </g>
              </motion.g>
            </AnimatePresence>

            {/* Orbiting planets */}
            {ORRERY_PROJECTS.map((proj, i) => {
              const pos = polarToXY(getAngleDeg(i));
              const isActive = i === activeIdx;
              return (
                <g
                  key={proj.id}
                  style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94)", cursor: "pointer" }}
                  onClick={() => selectPlanet(i)}
                >
                  {/* Glow ring for active — static, no infinite animation */}
                  {isActive && (
                    <circle r={PLANET_R + 10} fill="none" stroke={proj.accent} strokeWidth="1.5" opacity="0.3" />
                  )}
                  {isActive && (
                    <circle r={PLANET_R + 4} fill={proj.accent} opacity="0.08" />
                  )}
                  {/* Planet circle */}
                  <circle
                    r={isActive ? PLANET_R + 2 : PLANET_R}
                    fill="#0A0A0A"
                    stroke={isActive ? proj.accent : `${proj.accent}40`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{ transition: "r 0.4s ease, stroke 0.4s ease, stroke-width 0.4s ease" }}
                  />
                  {/* Planet image */}
                  {proj.image ? (
                    <image
                      href={proj.image}
                      x={-(PLANET_R - 2)}
                      y={-(PLANET_R - 2)}
                      width={(PLANET_R - 2) * 2}
                      height={(PLANET_R - 2) * 2}
                      clipPath={`url(#op-clip-${i})`}
                      preserveAspectRatio="xMidYMid slice"
                      style={{ opacity: isActive ? 1 : 0.65, transition: "opacity 0.4s ease" }}
                    />
                  ) : (
                    <circle r={PLANET_R - 3} fill={`${proj.accent}40`} />
                  )}
                  {/* Label below planet */}
                  <text
                    y={PLANET_R + 18}
                    textAnchor="middle"
                    fontSize="13"
                    fontFamily="'Source Sans Pro', sans-serif"
                    fontWeight="600"
                    letterSpacing="1"
                    fill={isActive ? proj.accent : `${INK}55`}
                    style={{ textTransform: "uppercase", userSelect: "none", transition: "fill 0.4s ease" }}
                  >
                    {proj.title.length > 13 ? proj.title.slice(0, 11) + "…" : proj.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>
        )}

        {/* Arrow + dot navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: "clamp(24px,3vw,40px)" }}>
          <button onClick={() => { goPrev(); setPaused(true); }} aria-label="Previous production"
            style={{ background: "none", border: "none", cursor: "pointer", color: `${INK}70`, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "50%", transition: "background 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${INK}08`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}>
            <ChevronLeft size={18} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {ORRERY_PROJECTS.map((p, i) => (
              <button
                key={i}
                onClick={() => selectPlanet(i)}
                aria-label={`Show ${p.title}`}
                aria-pressed={i === activeIdx}
                className="pagination-dot-tiny"
                style={{ background: i === activeIdx ? active.accent : `${INK}30`, transition: "background 0.3s" }}
              />
            ))}
          </div>
          <button onClick={() => { goNext(); setPaused(true); }} aria-label="Next production"
            style={{ background: "none", border: "none", cursor: "pointer", color: `${INK}70`, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRadius: "50%", transition: "background 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${INK}08`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}>
            <ChevronRight size={18} />
          </button>
        </div>
        <p style={{ textAlign: "center", marginTop: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: `${INK}45`, letterSpacing: "0.14em" }}>
          USE ARROW KEYS OR CLICK TO NAVIGATE
        </p>
      </div>
    </section>
  );
}

// ── ORBITAL RING (hero bg) ─────────────────────────────────────────────────────

function OrbitalRing() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", width: "max(900px, 90vw)", height: "max(900px, 90vw)", top: "50%", left: "55%", transform: "translate(-50%, -50%)", willChange: "transform" }}
      >
        <svg viewBox="-450 -450 900 900" style={{ width: "100%", height: "100%" }}>
          <defs>
            <path id="ring1" d="M0,0 m-440,0 a440,440 0 1,1 880,0 a440,440 0 1,1 -880,0" />
          </defs>
          <circle cx="0" cy="0" r="440" fill="none" stroke={`${GOLD}12`} strokeWidth="0.5" strokeDasharray="2 10" />
          <circle cx="0" cy="0" r="320" fill="none" stroke={`${LAVENDER}08`} strokeWidth="0.5" />
          <text fill="rgba(255,255,255,0.07)" fontSize="11" fontFamily="'Source Sans Pro', sans-serif" fontWeight="600" letterSpacing="7">
            <textPath href="#ring1">
              EVERY STORY DESERVES A STAGE · NICHEUX STUDIO · {TOTAL} PRODUCTIONS · 5 COUNTRIES · 6 DISCIPLINES · ❦ · WHERE DESIGN MEETS STORYTELLING · &nbsp;
            </textPath>
          </text>
        </svg>
      </motion.div>
      {/* Ambient center glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}08 0%, transparent 65%)`, pointerEvents: "none" }} />
    </div>
  );
}

// ── PRODUCTION LIST ROW (programme-style) ─────────────────────────────────────

function ProgrammeRow({ p, index, onClick }: { p: any; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(16px, 3vw, 40px)",
        padding: "clamp(16px, 2.5vw, 24px) 0",
        borderBottom: `1px solid ${hovered ? `${p.accent}30` : `${INK}18`}`,
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Hover line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1, background: p.accent, transformOrigin: "left", zIndex: 1 }}
      />

      {/* Number */}
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(14px, 1.6vw, 20px)", color: hovered ? p.accent : INK_MUTED, letterSpacing: "0.04em", minWidth: 36, transition: "color 0.3s ease", flexShrink: 0 }}>
        {p.num}
      </span>

      {/* Thumb image */}
      <div style={{ width: 56, height: 56, borderRadius: 4, overflow: "hidden", flexShrink: 0, border: `1px solid ${INK}20`, transition: "border-color 0.3s ease", borderColor: hovered ? `${p.accent}40` : `${INK}15` }}>
        {p.image ? (
          <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "sepia(0.1)" }} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.1"; }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${p.accent}20, ${p.accent}06)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, color: `${p.accent}50` }}>?</span>
          </div>
        )}
      </div>

      {/* Title + sub */}
      <div style={{ flex: "0 0 auto", minWidth: "clamp(140px, 20vw, 260px)" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", letterSpacing: "-0.02em", color: hovered ? INK : INK, margin: 0, transition: "color 0.3s ease", lineHeight: 1.2 }}>
          {p.title}
        </h3>
        {p.sub && (
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(11px, 1vw, 13px)", color: hovered ? p.accent : INK_MUTED, letterSpacing: "0.04em", margin: "3px 0 0", transition: "color 0.3s ease" }}>
            {p.sub}
          </p>
        )}
      </div>

      {/* Discipline */}
      <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px, 1vw, 12px)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: INK_MUTED, flex: "0 0 auto", display: "none" }} className="hidden md:block">
        {p.discipline || `${p.discipline}`}
      </span>

      {/* Country */}
      {"country" in p && (
        <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px, 0.9vw, 11px)", letterSpacing: "0.14em", textTransform: "uppercase", color: INK_MUTED, flex: "0 0 auto" }}>
          {(p as any).country}
        </span>
      )}

      {/* Tagline */}
      <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 1.1vw, 14px)", lineHeight: 1.65, color: hovered ? INK_SOFT : INK_MUTED, margin: 0, flex: 1, display: "none" }} className="hidden lg:block">
        {p.tagline}
      </p>

      {/* Pending badge */}
      {"pending" in p && (p as any).pending && (
        <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: p.accent, padding: "3px 8px", border: `1px solid ${p.accent}40`, borderRadius: 2, flexShrink: 0 }}>
          In Progress
        </span>
      )}

      {/* Arrow */}
      <ArrowUpRight size={14} style={{ color: hovered ? p.accent : INK_MUTED, transition: "color 0.3s ease, transform 0.3s ease", transform: hovered ? "translate(2px, -2px)" : "translate(0,0)", marginLeft: "auto", flexShrink: 0 }} />
    </motion.div>
  );
}

// ── STUDIO CARD (dark, 2-column editorial) ────────────────────────────────────

function StudioCard({ p, index, onClick }: { p: any; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ cursor: "pointer", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}
      className="studio-card"
    >
      <style>{`.studio-card:hover .sc-img { transform: scale(1.06); }`}</style>
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
        {p.image ? (
          <img src={p.image} alt={p.title} loading="lazy" className="sc-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "sepia(0.06) brightness(0.88)", transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)" }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: `radial-gradient(ellipse at 40% 50%, ${p.accent}18 0%, transparent 65%)` }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
          № {p.num}
        </div>
      </div>
      <div style={{ padding: "clamp(16px, 2.5vw, 24px)", display: "flex", flexDirection: "column", gap: 10, flex: 1, background: "#111" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent, flexShrink: 0, marginTop: 4 }} />
          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: p.accent, lineHeight: 1.5 }}>
            {p.tagline}
          </span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(20px, 2.4vw, 28px)", letterSpacing: "-0.02em", color: "#fff", margin: 0, lineHeight: 1.15 }}>
          {p.title}
        </h3>
        <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 1.1vw, 13px)", lineHeight: 1.75, color: "rgba(255,255,255,0.4)", margin: 0 }}>
          {p.story}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "auto" }}>
          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            {p.discipline}
          </span>
          <ArrowUpRight size={13} style={{ color: hovered ? p.accent : "rgba(255,255,255,0.3)", transition: "color 0.25s ease" }} />
        </div>
      </div>
    </motion.article>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function FeaturedWork() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  // useInView can miss the initial render in production builds — use a timed mount flag instead
  const [heroInView, setHeroInView] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroInView(true), 80); return () => clearTimeout(t); }, []);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const [programmeOpen, setProgrammeOpen] = useState(false);

  // Preload orbit planet images so SVG doesn't stutter on first rotation
  useEffect(() => {
    ORRERY_PROJECTS.forEach(p => {
      if (p.image) { const img = new Image(); img.src = p.image; }
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Helmet>
        <title>Stage Productions | NicheUX. Where Design Meets Storytelling</title>
        <meta name="description" content={`${TOTAL} stage productions across web, brand, print, social media, illustration and motion design. NicheUX. where design meets storytelling.`} />
        <meta property="og:title" content="Stage Productions | NicheUX" />
        <meta property="og:description" content="Every brief becomes a story. Every story deserves a stage." />
      </Helmet>

      <SpotlightCursor />

      {/* ── ACT I: THE STAGE. hero ─────────────────────────────────────────── */}
      <section
        style={{ background: BLACK, position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.04)", minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        <OrbitalRing />

        {/* Ghost number */}
        <div aria-hidden style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(200px, 30vw, 440px)", color: "#fff", opacity: 0.025, lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none" }}>
          {TOTAL}
        </div>

        <div ref={heroRef} style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(130px, 14vw, 180px) clamp(24px, 6vw, 80px) clamp(80px, 10vw, 130px)", position: "relative", zIndex: 2, width: "100%" }}>

          {/* Act label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(28px, 4vw, 48px)" }}
          >
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ height: 1, width: 40, background: GOLD, transformOrigin: "left" }}
            />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: GOLD }}>
              Stage Productions
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
              Where design meets storytelling
            </span>
          </motion.div>

          <motion.div style={{ y: heroTextY, opacity: heroOpacity }}>
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(56px, 10vw, 156px)", lineHeight: 0.88, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(28px, 4vw, 44px) 0", maxWidth: 980 }}
            >
              Every story,
              <br />
              <em style={{ fontStyle: "italic", color: LAVENDER }}>staged.</em>
            </motion.h1>

            {/* Sub + stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: "clamp(40px, 5vw, 64px)" }}
            >
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.8, color: "rgba(255,255,255,0.4)", maxWidth: 460, margin: 0 }}>
                Client commissions, studio explorations, and creative craft. built from scratch, every time. Across web, brand, motion, print, and illustration.
              </p>
              <div style={{ display: "flex", gap: "clamp(28px, 4vw, 52px)", flexShrink: 0 }}>
                {[{ v: String(TOTAL), l: "Productions" }, { v: "4+", l: "Countries" }, { v: "6", l: "Disciplines" }].map(({ v, l }) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1, letterSpacing: "-0.03em", color: GOLD }}>
                      {v}
                    </div>
                    <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Programme toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={() => setProgrammeOpen(!programmeOpen)}
              style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, padding: "10px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.25s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = GOLD; (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}40`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              {programmeOpen ? "↑ Close programme" : "↓ View full programme"}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Programme list. collapsible */}
      <AnimatePresence>
        {programmeOpen && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ background: BLACK, overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(32px, 5vw, 56px) clamp(24px, 6vw, 80px)" }}>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
                Full Programme · {TOTAL} Productions
              </p>
              {[...CLIENT, ...STUDIO].map((p, i) => (
                <ProgrammeRow key={p.id} p={p} index={i} onClick={() => { navigate(p.route); setProgrammeOpen(false); }} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── ACT II: ORBITAL ORRERY. planets revolving ────────────────────── */}
      <OrreryShowcase onNavigate={navigate} />

      {/* ── CREATIVE & STUDIO ─────────────────────────────── */}
      <section style={{ background: BLACK, borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at 65% 35%, ${LAVENDER}05 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "clamp(40px, 5vw, 64px) clamp(24px, 6vw, 80px) clamp(24px, 3vw, 36px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div style={{ width: 24, height: 1, background: LAVENDER }} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
              Creative and Studio
            </span>
          </motion.div>
          <div id="studio-grid-fw" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            <style>{`@media(max-width:900px){#studio-grid-fw{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:500px){#studio-grid-fw{grid-template-columns:1fr!important;}}`}</style>
            {STUDIO.map((p, i) => (
              <StudioCard key={p.id} p={p} index={i} onClick={() => navigate(p.route)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EPILOGUE: CTA ─────────────────────────────────── */}
      <section style={{ background: BLACK, padding: "clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)", position: "relative", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${GOLD}06 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span aria-hidden style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: GOLD, display: "block", marginBottom: 32 }}>❦</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 clamp(18px, 2.5vw, 28px) 0" }}>
              Your story is next.
            </h2>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", margin: "0 auto clamp(36px, 5vw, 52px)", maxWidth: 500 }}>
              Every production starts with a conversation. Tell us your brief. we'll build the stage it deserves.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#d4b463"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; }}
                style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", padding: "14px 36px", border: "none", borderRadius: 2, cursor: "pointer", background: GOLD, color: BLACK, display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.25s ease" }}
              >
                Commission a Production <ArrowUpRight size={13} />
              </motion.button>
              <motion.button
                onClick={() => navigate("/about")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = LAVENDER; (e.currentTarget as HTMLButtonElement).style.borderColor = LAVENDER; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", padding: "14px 36px", border: `1px solid rgba(255,255,255,0.2)`, borderRadius: 2, cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.5)", transition: "color 0.25s ease, border-color 0.25s ease" }}
              >
                Meet the Ensemble
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
