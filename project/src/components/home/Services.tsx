// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE, BLACK } from "@/constants/theme";

const ACTS = [
  {
    numeral: "I",
    name: "Strategy & Design",
    discipline: "UI · UX · Research",
    descriptor: "We map every user's journey before a single pixel is placed. No assumptions. No guesswork. Just clarity.",
    tools: ["Figma", "FigJam", "Hotjar"],
    accent: GOLD,
    path: "/strategy-design",
  },
  {
    numeral: "II",
    name: "Web Development",
    discipline: "React · Next.js · merchify",
    descriptor: "Handcrafted, custom-coded. Zero templates, zero limits. Built to convert, built to last.",
    tools: ["React", "TypeScript", "merchify"],
    accent: BLUE,
    path: "/web-development-ecommerce",
  },
  {
    numeral: "III",
    name: "Motion & AI Visuals",
    discipline: "Animation · Generative AI",
    descriptor: "Motion is not decoration. It is the part of the story a still frame cannot carry. We design for the pause, the second watch, the screenshot.",
    tools: ["After Effects", "Midjourney", "Lottie"],
    accent: LAVENDER,
    path: "/motion-design-ai-visuals",
  },
  {
    numeral: "IV",
    name: "Print & Brand Identity",
    discipline: "Identity · Collateral · Print",
    descriptor: "Identities so precise you own the room before you speak. From logomark to brand system.",
    tools: ["Illustrator", "InDesign", "Procreate"],
    accent: GOLD,
    path: "/print-brand-design",
  },
  {
    numeral: "V",
    name: "Social Media & Content",
    discipline: "Strategy · Content · Growth",
    descriptor: "Every post earns its place on the feed. Content engineered to perform, not just to exist.",
    tools: ["Premiere Pro", "CapCut", "Buffer"],
    accent: BLUE,
    path: "/social-media-marketing",
  },
  {
    numeral: "VI",
    name: "Illustration & Character",
    discipline: "Editorial · Publishing · Gaming",
    descriptor: "Technical mastery meeting narrative vision. Worlds built from imagination, executed with discipline.",
    tools: ["Procreate", "Photomerch", "Blender"],
    accent: LAVENDER,
    path: "/illustration-character-design",
  },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function Services() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<number>(0);
  const [spotY, setSpotY] = useState(0);
  const hoveredRef = useRef<number | null>(null);

  const active = hovered !== null ? hovered : scrolled;
  const accent = ACTS[active]?.accent ?? GOLD;

  // Keep ref in sync so scroll handler reads current value without stale closure
  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  // When hover changes, recompute spotlight position from live DOM
  useEffect(() => {
    if (hovered === null || !rowsRef.current) return;
    const rows = Array.from(rowsRef.current.querySelectorAll("[data-act-row]")) as HTMLElement[];
    if (!rows[hovered]) return;
    const cr = rowsRef.current.getBoundingClientRect();
    const ar = rows[hovered].getBoundingClientRect();
    setSpotY(ar.top + ar.height / 2 - cr.top);
  }, [hovered]);

  // IntersectionObserver-based row activation — works on all devices including mobile
  useEffect(() => {
    if (!rowsRef.current) return;
    const rows = Array.from(rowsRef.current.querySelectorAll("[data-act-row]")) as HTMLElement[];
    if (!rows.length) return;
    const observers = rows.map((row, i) => {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          if (hoveredRef.current !== null) return;
          setScrolled(i);
          if (rowsRef.current) {
            const cr = rowsRef.current.getBoundingClientRect();
            setSpotY(entry.boundingClientRect.top + entry.boundingClientRect.height / 2 - cr.top);
          }
        }
      }, { threshold: 0.3, rootMargin: "-5% 0px -35% 0px" });
      obs.observe(row);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const spring = useSpring(spotY, { stiffness: 220, damping: 24, mass: 0.4 });
  useEffect(() => { spring.set(spotY); }, [spotY, spring]);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        backgroundColor: BLACK,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient accent glow. shifts with active discipline */}
      <motion.div
        aria-hidden
        animate={{
          background: `radial-gradient(ellipse 60% 40% at 18% 50%, ${accent}10 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            paddingTop: "clamp(64px, 9vw, 112px)",
            paddingBottom: "clamp(40px, 5vw, 64px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: GOLD,
              }}>
                Act II. Six Disciplines
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: "#ffffff",
              margin: 0,
            }}>
              Six acts.{" "}
              <em style={{ color: LAVENDER }}>One ensemble.</em>
            </h2>
          </div>

          <p style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.4vw, 16px)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.4)",
            maxWidth: 340,
            margin: 0,
          }}>
            Every discipline working as one company, one vision, one standard. No handoffs. No gaps.
          </p>
        </motion.div>

        {/* Rows + spotlight rail */}
        <div ref={rowsRef} style={{ position: "relative", paddingBottom: "clamp(64px, 9vw, 112px)" }}>

          {/* Vertical rail backdrop */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 24,
              top: 0,
              bottom: "clamp(64px, 9vw, 112px)",
              width: 1,
              background: "rgba(255,255,255,0.06)",
            }}
          />

          {/* Moving spotlight token. gold disc that tracks the active row */}
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              left: 24,
              top: 0,
              y: spring,
              translateY: "-50%",
              translateX: "-50%",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 12px ${accent}, 0 0 28px ${accent}80, 0 0 60px ${accent}40`,
              zIndex: 2,
              pointerEvents: "none",
              transition: "background 0.5s ease, box-shadow 0.5s ease",
            }}
          />

          {/* Vertical gold gradient trail (above spotlight) */}
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              left: 24,
              top: 0,
              height: spring,
              width: 1,
              background: `linear-gradient(180deg, transparent 0%, ${accent}30 60%, ${accent} 100%)`,
              transform: "translateX(-50%)",
              zIndex: 1,
              pointerEvents: "none",
              transition: "background 0.5s ease",
            }}
          />

          {ACTS.map((act, i) => (
            <ServiceRow
              key={act.numeral}
              act={act}
              index={i}
              inView={inView}
              isActive={active === i}
              isAnyActive={true}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
              onClick={() => navigate(act.path)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  act,
  index,
  inView,
  isActive,
  isAnyActive,
  onEnter,
  onLeave,
  onClick,
}: {
  act: (typeof ACTS)[number];
  index: number;
  inView: boolean;
  isActive: boolean;
  isAnyActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <motion.div
      data-act-row
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        alignItems: "center",
        gap: "clamp(16px, 3vw, 40px)",
        padding: "clamp(20px, 3vw, 36px) 0 clamp(20px, 3vw, 36px) 56px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        cursor: "pointer",
        opacity: isAnyActive && !isActive ? 0.32 : 1,
        transition: "opacity 0.25s ease",
        position: "relative",
      }}
    >
      {/* Roman numeral */}
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "clamp(13px, 1.4vw, 16px)",
        color: isActive ? act.accent : "rgba(255,255,255,0.3)",
        letterSpacing: "0.05em",
        transition: "color 0.25s ease",
        userSelect: "none",
      }}>
        {act.numeral}
      </span>

      {/* Name + descriptor */}
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px, 2.5vw, 32px)" }}>
          <motion.span
            animate={{ fontSize: isActive ? "clamp(36px, 5vw, 64px)" : "clamp(22px, 3vw, 36px)" }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.78)",
              display: "block",
              transition: "color 0.25s ease",
            }}
          >
            {act.name}
          </motion.span>
        </div>

        {/* Descriptor — collapses completely when inactive so no gap on mobile */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.3vw, 15px)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
                maxWidth: 420,
                margin: 0,
                overflow: "hidden",
              }}
            >
              {act.descriptor}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tools */}
        <div style={{ display: "flex", gap: 12, marginTop: isActive ? 14 : 8, flexWrap: "wrap", transition: "margin 0.25s ease" }}>
          {act.tools.map(tool => (
            <span key={tool} style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: isActive ? act.accent : "rgba(255,255,255,0.25)",
              transition: "color 0.25s ease",
            }}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
        <motion.div
          animate={{ rotate: isActive ? 45 : 0, color: isActive ? act.accent : "rgba(255,255,255,0.25)" }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          <ArrowUpRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
}
