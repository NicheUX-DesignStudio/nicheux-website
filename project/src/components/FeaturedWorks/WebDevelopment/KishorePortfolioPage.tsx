import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp, User, Zap, Award, Layers, BarChart2, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GOLD      = "#EBC773";
const LAVENDER  = "#B097BE";
const BLUE      = "#89B0CC";
const BLACK     = "#131313";
const PARCHMENT = "#F1E9D2";
const INK       = "#1A1A1A";
const INK_MUTED = "#7A736A";
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const IMPACT_STATS = [
  { num: "90+",  label: "Players coached" },
  { num: "5+",   label: "Years coached" },
  { num: "50+",  label: "Design systems delivered" },
  { num: "50K+", label: "Donated (RM)" },
];

const PROCESS_DOCS = [
  { src: "/images/kishore-process/ia.png",        label: "Information Architecture", note: "Site structure mapped across three career tracks" },
  { src: "/images/kishore-process/flow.png",      label: "User Flow",                note: "Primary path: referral visit to contact" },
  { src: "/images/kishore-process/journey.png",   label: "Journey Map",              note: "Full experience from discovery to connection" },
  { src: "/images/kishore-process/wireframe.png", label: "Wireframe",                note: "Layout decisions before visual design began" },
];

const SITE_SECTIONS = [
  { src: "/images/kishore-process/kishore-careers-desktop.png",  label: "Careers — three tabs, one weight" },
  { src: "/images/kishore-process/kishore-timeline-desktop.png", label: "Timeline — instinct to systems" },
  { src: "/images/kishore-process/kishore-impact-desktop.png",   label: "Impact dashboard — numbers that speak" },
  { src: "/images/kishore-process/kishore-seals-desktop.png",    label: "Verification — trust made visual" },
];

interface WheelNode { label: string; desc: string; icon: LucideIcon; color: string; }
const WHEEL_NODES: WheelNode[] = [
  { label: "About",     desc: "The person behind three careers",        icon: User,       color: GOLD },
  { label: "Playing",   desc: "15 years of competitive squash",          icon: Zap,        color: BLUE },
  { label: "Coaching",  desc: "WSF certified performance coaching",      icon: Award,      color: GOLD },
  { label: "Designing", desc: "50+ design systems delivered",            icon: Layers,     color: LAVENDER },
  { label: "Impact",    desc: "Measurable outcomes, real numbers",       icon: BarChart2,  color: BLUE },
  { label: "Contact",   desc: "Start a conversation",                    icon: Mail,       color: GOLD },
];

function K29WheelInteractive() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeNode, setActiveNode] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startAngle: 0, startRotation: 0, active: false });

  const R = 118;
  const SIZE = 340;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const NODE_COUNT = WHEEL_NODES.length;
  const NODE_R = 26;

  const getAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.atan2(
      (clientY - rect.top)  * (SIZE / rect.height) - cy,
      (clientX - rect.left) * (SIZE / rect.width)  - cx
    ) * (180 / Math.PI);
  }, [cx, cy]);

  const applyRotation = useCallback((newRot: number) => {
    setRotation(newRot);
    const nodeAngle = 360 / NODE_COUNT;
    const normalized = (((-newRot % 360) + 360) % 360);
    setActiveNode(Math.round(normalized / nodeAngle) % NODE_COUNT);
  }, [NODE_COUNT]);

  useEffect(() => {
    const onMove = (clientX: number, clientY: number) => {
      if (!dragRef.current.active) return;
      applyRotation(dragRef.current.startRotation + getAngle(clientX, clientY) - dragRef.current.startAngle);
    };
    const onEnd = () => { dragRef.current.active = false; setIsDragging(false); };
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [getAngle, applyRotation]);

  const startDrag = (clientX: number, clientY: number) => {
    dragRef.current = { startAngle: getAngle(clientX, clientY), startRotation: rotation, active: true };
    setIsDragging(true);
  };

  const displayDeg = Math.round(((rotation % 360) + 360) % 360);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
          Navigation Wheel
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.25)", margin: 0 }}>
          Drag the wheel or tap icons to navigate
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseDown={e => startDrag(e.clientX, e.clientY)}
        onTouchStart={e => { e.preventDefault(); startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
        style={{ position: 'relative', width: '100%', maxWidth: SIZE, aspectRatio: '1', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none', userSelect: 'none' }}
      >
        {/* SVG: rings, spokes, node circles, hub */}
        <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ position: 'absolute', inset: 0 }}>
          {/* Wheel body */}
          <circle cx={cx} cy={cy} r={R + NODE_R + 14} fill="#0c0c0c" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
          {/* Inner dashed guide ring */}
          <circle cx={cx} cy={cy} r={R * 0.48} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} strokeDasharray="3 10" />

          {WHEEL_NODES.map((node, i) => {
            const deg = (i * 360) / NODE_COUNT + rotation;
            const rad = (deg * Math.PI) / 180;
            const nx = cx + R * Math.cos(rad);
            const ny = cy + R * Math.sin(rad);
            const isActive = activeNode === i;
            return (
              <g key={node.label}>
                <line x1={cx} y1={cy} x2={nx} y2={ny}
                  stroke={isActive ? node.color + "50" : "rgba(255,255,255,0.05)"}
                  strokeWidth={0.8}
                />
                {isActive && <circle cx={nx} cy={ny} r={NODE_R + 14} fill={node.color + "16"} />}
                <circle
                  cx={nx} cy={ny} r={NODE_R}
                  fill={isActive ? node.color + "18" : "#181818"}
                  stroke={isActive ? node.color : "rgba(255,255,255,0.12)"}
                  strokeWidth={isActive ? 1.5 : 1}
                />
              </g>
            );
          })}

          {/* Hub */}
          <circle cx={cx} cy={cy} r={40} fill="#0c0c0c" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <circle cx={cx} cy={cy} r={35} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
          <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.28)"
            fontFamily="'Source Sans Pro', sans-serif" fontSize={7} fontWeight={700}>
            DRAG
          </text>
          <text x={cx} y={cy + 9} textAnchor="middle" dominantBaseline="middle"
            fill={GOLD} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize={12}>
            K29
          </text>
        </svg>

        {/* Icon overlays — positioned as % of container so they scale with SVG */}
        {WHEEL_NODES.map((node, i) => {
          const deg = (i * 360) / NODE_COUNT + rotation;
          const rad = (deg * Math.PI) / 180;
          const nx = cx + R * Math.cos(rad);
          const ny = cy + R * Math.sin(rad);
          const isActive = activeNode === i;
          const Icon = node.icon;
          return (
            <div
              key={node.label}
              style={{
                position: 'absolute',
                left: `${(nx / SIZE) * 100}%`,
                top: `${(ny / SIZE) * 100}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              <Icon size={14} color={isActive ? node.color : "rgba(255,255,255,0.28)"} />
            </div>
          );
        })}
      </div>

      {/* Current section display */}
      <motion.div
        key={activeNode}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
          Current:
        </span>
        <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: WHEEL_NODES[activeNode].color }}>
          {WHEEL_NODES[activeNode].label}
        </span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 9 }}>·</span>
        <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
          {displayDeg}°
        </span>
      </motion.div>
    </div>
  );
}

function BackToTopArrow() {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = useCallback(() => setIsVisible(window.pageYOffset > 300), []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  if (!isVisible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 50, padding: 16, borderRadius: '50%', background: '#1a1a1a', border: `1px solid ${GOLD}40`, cursor: 'pointer', color: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default function KishorePortfolioPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <Helmet>
        <title>Kishore Aravind, K29 Portfolio | NicheUX Case Study</title>
        <meta name="description" content="How NicheUX designed and built the K29 portfolio for Kishore Aravind — squash champion, WSF-certified coach, and brand designer. One identity for three disciplines." />
        <link rel="preload" as="image" href="/images/kishore-process/kishore-home-desktop.png" />
      </Helmet>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ background: BLACK, minHeight: "85vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "clamp(80px, 12vw, 140px)" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: heroY, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "50vw", height: "60vh", background: `radial-gradient(ellipse at right top, ${BLUE}18, transparent 65%)` }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "30vw", height: "30vh", background: `radial-gradient(ellipse at left bottom, ${GOLD}10, transparent 70%)` }} />
        </motion.div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px, 6vw, 80px) clamp(24px, 6vw, 80px)", position: "relative", zIndex: 1, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
              <button onClick={() => navigate("/featured-work")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 5, padding: 0 }}>
                <ArrowRight size={9} style={{ transform: "rotate(180deg)" }} /> Work
              </button>
              <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 10 }}>/</span>
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: BLUE }}>Kishore Aravind</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(48px, 8vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 28px" }}>
              K29:<br />
              <em style={{ fontStyle: "italic", color: BLUE }}>Player. Coach.</em><br />
              Designer.
            </h1>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", maxWidth: 580, margin: "0 0 44px" }}>
              Kishore Aravind is a national-level squash champion, WSF and IOC-certified performance coach, and brand designer based in Malaysia. Three fully formed careers. One portfolio that had to carry all of them without diluting any.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[["Category", "Web Design"], ["Scope", "Portfolio Site"], ["Stack", "React, TypeScript"], ["Country", "Malaysia"]].map(([label, val]) => (
                <div key={label} style={{ padding: "10px 18px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.78)" }}>{val}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Hero image ── */}
      <div style={{ background: "#0C0C0C", overflow: "hidden", maxHeight: 560 }}>
        <img src="/images/kishore-process/kishore-home-desktop.png" alt="K29 portfolio homepage" decoding="async" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top", opacity: 0.92 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>

      {/* ── Challenge ── */}
      <section style={{ background: BLACK, padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <style>{`@media(max-width:768px){.k-2col{grid-template-columns:1fr!important}}`}</style>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="k-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)", alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: BLUE }} />
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: BLUE }}>The Challenge</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
                Three careers.<br /><em style={{ color: BLUE }}>One coherent story.</em>
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.85, color: "rgba(255,255,255,0.52)", margin: "0 0 20px" }}>
                Most portfolios solve for one discipline. Kishore needed a site that solved for three simultaneously: 15 years of competitive squash, current work as a WSF Level 2 and IOC-certified performance coach, and a growing design practice with 50+ systems delivered.
              </p>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.85, color: "rgba(255,255,255,0.52)", margin: 0 }}>
                The wrong answer was tabs. Three tabs present three careers as three separate businesses sharing a domain. The right answer was a navigation system that made the plurality feel like the point, not the problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Design Process ── */}
      <section style={{ background: PARCHMENT, padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: INK_MUTED }} />
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: INK_MUTED }}>The Process</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px, 4.5vw, 58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: INK, margin: "0 0 16px" }}>
              Research first.<br /><em>Design second.</em>
            </h2>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.8, color: INK_MUTED, maxWidth: 560, margin: 0 }}>
              Every structural decision on the K29 site came out of a documented process: user flows, journey mapping, information architecture, and wireframes before any visual work began.
            </p>
          </div>
          <style>{`@media(max-width:640px){.k-process-grid{grid-template-columns:1fr!important}}`}</style>
          <div className="k-process-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {PROCESS_DOCS.map((doc, i) => (
              <motion.div key={doc.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }} style={{ background: "rgba(0,0,0,0.04)", overflow: "hidden" }}>
                <div style={{ background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                  <img src={doc.src} alt={doc.label} decoding="async" style={{ width: "100%", height: "auto", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div style={{ padding: "clamp(16px, 2vw, 24px)" }}>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: INK_MUTED, marginBottom: 6 }}>{doc.label}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.6, color: INK, margin: 0 }}>{doc.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section style={{ background: "#0C0C0C", padding: "clamp(56px, 7vw, 80px) clamp(24px, 6vw, 80px)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(22px, 3vw, 36px)", lineHeight: 1.45, color: "rgba(255,255,255,0.7)", margin: 0 }}>
            "A steering wheel is not a metaphor. It is the mechanism through which a driver moves between positions. That is exactly what a nav system should be."
          </p>
          <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD, marginTop: 24 }}>NicheUX Design Brief</div>
        </div>
      </section>

      {/* ── Interactive Wheel ── */}
      <section style={{ background: BLACK, padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <style>{`@media(max-width:768px){.k-wheel-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
          <div className="k-wheel-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: GOLD }} />
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD }}>The Navigation System</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 24px" }}>
                Try the wheel.
              </h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", margin: "0 0 20px" }}>
                The K29 navigation is a draggable steering wheel. Six sections. One floating button. Spin to explore.
              </p>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", margin: 0 }}>
                On the live site it lives fixed in the corner at every scroll position. Here, experience the interaction directly.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <K29WheelInteractive />
            </div>
          </div>
        </div>
      </section>

      {/* ── Navigation in production ── */}
      <section style={{ background: "#0C0C0C", padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <style>{`@media(max-width:768px){.k-nav-grid{grid-template-columns:1fr!important}}`}</style>
          <div className="k-nav-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: GOLD }} />
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD }}>In Production</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 24px" }}>The steering wheel as site map.</h2>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", margin: "0 0 20px" }}>
                Instead of a conventional nav bar, the site uses a floating wheel button fixed in the corner at every scroll position. One click reveals all six sections.
              </p>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", margin: 0 }}>
                The wheel sits bottom-right at all times. Persistent. Unobtrusive. Available the moment the user needs it.
              </p>
            </div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} style={{ overflow: "hidden", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <img src="/images/kishore-process/kishore-home-desktop.png" alt="K29 homepage with floating wheel navigation button" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Site Sections Gallery ── */}
      <section style={{ background: BLACK, padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: BLUE }} />
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: BLUE }}>The Site</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px, 4.5vw, 58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
              From brief to browser.
            </h2>
          </div>
          <style>{`@media(max-width:640px){.k-site-grid{grid-template-columns:1fr!important}}`}</style>
          <div className="k-site-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {SITE_SECTIONS.map((sec, i) => (
              <motion.div key={sec.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }} style={{ overflow: "hidden", position: "relative" }}>
                <div style={{ overflow: "hidden", background: "#111" }}>
                  <img src={sec.src} alt={sec.label} decoding="async" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top", opacity: 0.88 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div style={{ padding: "14px 0 4px", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>
                  {sec.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile Views ── */}
      <section style={{ background: "#0C0C0C", padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: LAVENDER }} />
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: LAVENDER }}>Mobile</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px, 4.5vw, 58px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 16px" }}>
              Built for every screen.
            </h2>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.8, color: "rgba(255,255,255,0.4)", maxWidth: 520, margin: 0 }}>
              The wheel interaction, tab system, and timeline all adapt to touch. The identity does not compress on mobile — it reconfigures.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} style={{ maxWidth: 340, margin: "0 auto" }}>
            <div style={{ background: "#111", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              <img src="/images/kishore-process/kishore-home-mobile.png" alt="K29 homepage, mobile" decoding="async" style={{ width: "100%", display: "block", opacity: 0.9 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 12 }}>Homepage, mobile</div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact stats ── */}
      <section style={{ background: PARCHMENT, padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
            <div style={{ width: 24, height: 1, background: INK_MUTED }} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: INK_MUTED }}>Impact Dashboard</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(32px, 5vw, 56px)" }}>
            {IMPACT_STATS.map(({ num, label }) => (
              <motion.div key={num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1, letterSpacing: "-0.03em", color: INK, marginBottom: 12 }}>{num}</div>
                <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, lineHeight: 1.6, color: INK_MUTED }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verification Seals ── */}
      <section style={{ background: BLACK, padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Verification Seals</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
              Trust made visual.<br /><em style={{ color: "rgba(255,255,255,0.4)" }}>Without a word of explanation.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
            {[
              { label: "WSF Level 2 Coach",       body: "World Squash Federation certified — the governing body standard for elite coaching methodology and athlete development." },
              { label: "IOC Mental Health",        body: "International Olympic Committee certification in athlete mental health and performance psychology." },
              { label: "Digital Journalism",       body: "Certified in digital media production and journalism, underpinning the content strategy across all brand work." },
              { label: "Squash United Foundation", body: "Foundation-level recognition for contributions to squash development and player welfare programmes." },
            ].map((seal, i) => (
              <motion.div key={seal.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }} style={{ padding: "clamp(20px, 2.5vw, 32px)", background: "rgba(255,255,255,0.03)", borderTop: `2px solid ${GOLD}` }}>
                <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>{seal.label}</div>
                <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px, 1.2vw, 14px)", lineHeight: 1.75, color: "rgba(255,255,255,0.38)", margin: 0 }}>{seal.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#0C0C0C", padding: "clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px, 4vw, 50px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 44px" }}>
            Ready to build something worth showcasing?
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/contact")} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BLACK, background: GOLD, border: "none", padding: "14px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Start a Project <ArrowRight size={12} />
            </button>
            <button onClick={() => navigate("/featured-work")} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "none", border: "1px solid rgba(255,255,255,0.14)", padding: "14px 28px", cursor: "pointer" }}>
              See All Work
            </button>
          </div>
        </div>
      </section>

      <BackToTopArrow />
    </>
  );
}
