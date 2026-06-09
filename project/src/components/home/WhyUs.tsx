"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE, BLACK } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const PROMISES = [
  {
    numeral: "I",
    title: "No Templates",
    detail: "Every pixel built from scratch. You get a design your competitors simply cannot copy, because it was made only for you.",
    accent: GOLD,
  },
  {
    numeral: "II",
    title: "Senior Talent Only",
    detail: "No juniors learning on your budget. Every discipline runs with our best practitioners, from first brief to final launch.",
    accent: LAVENDER,
  },
  {
    numeral: "III",
    title: "One Team, One Vision",
    detail: "Strategy to launch. one ensemble. No briefing three agencies. No handoffs. No gaps. No excuses.",
    accent: BLUE,
  },
  {
    numeral: "IV",
    title: "Transparent Pricing",
    detail: "A detailed, honest quote within 48 hours. Fixed scopes. No retainers you don't need. No invoice that surprises you.",
    accent: GOLD,
  },
];

export default function WhyUs() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrollActive, setScrollActive] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Always use IntersectionObserver — works on touch AND mouse devices
  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && entry.intersectionRatio >= 0.4) setScrollActive(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const effectiveCard = hoveredCard !== null ? hoveredCard : scrollActive;

  return (
    <section
      ref={sectionRef}
      id="why-us"
      style={{
        backgroundColor: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Ambient radial gradient from top */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "50%",
          background: `radial-gradient(ellipse at 50% 0%, ${GOLD}0a 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: "clamp(56px, 7vw, 96px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: GOLD,
            }}>
              Act IV · The Promise
            </span>
          </div>

          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "#ffffff",
              margin: 0,
            }}>
              Four things we promise.{" "}
              <em style={{ color: LAVENDER }}>Every client.</em>
            </h2>
            <p style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.3vw, 16px)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.35)",
              maxWidth: 320,
              margin: 0,
            }}>
              These aren't marketing bullet points. They're how we've operated since day one. and why clients keep coming back.
            </p>
          </div>
        </motion.div>

        {/* Promise cards. 4-column grid */}
        <div
          id="why-us-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}
        >
          <style>{`
            @media (max-width: 900px) { #why-us-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 540px) { #why-us-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          {PROMISES.map((p, i) => (
            <motion.div
              key={p.numeral}
              ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null; }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                padding: "clamp(36px, 4.5vw, 60px) clamp(24px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                position: "relative",
                overflow: "hidden",
                background: effectiveCard === i ? "rgba(255,255,255,0.03)" : "#0A0A0A",
                transition: "background 0.4s ease",
                cursor: "default",
              }}
            >
              {/* Spotlight bloom on hover */}
              <motion.div
                animate={{ opacity: effectiveCard === i ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "140%",
                  height: "60%",
                  background: `radial-gradient(ellipse at 50% 0%, ${p.accent}15 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Large numeral */}
              <span
                aria-hidden
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(64px, 7.5vw, 104px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: effectiveCard === i ? p.accent : "rgba(255,255,255,0.07)",
                  transition: "color 0.45s ease",
                  display: "block",
                  userSelect: "none",
                }}
              >
                {p.numeral}
              </span>

              {/* Divider + title */}
              <div>
                <div style={{
                  width: 24,
                  height: 1,
                  background: effectiveCard === i ? p.accent : "rgba(255,255,255,0.12)",
                  marginBottom: 16,
                  transition: "background 0.4s ease",
                }} />
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: effectiveCard === i ? "#ffffff" : "rgba(255,255,255,0.7)",
                  margin: 0,
                  transition: "color 0.4s ease",
                }}>
                  {p.title}
                </h3>
              </div>

              {/* Detail text */}
              <p style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: 1.85,
                color: effectiveCard === i ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)",
                margin: 0,
                transition: "color 0.4s ease",
              }}>
                {p.detail}
              </p>
            </motion.div>
          ))}
        </div>
        <style>{`@media(max-width:767px){.whyus-swipe-hint{display:flex!important}}`}</style>
        <p className="whyus-swipe-hint" style={{ display: "none", alignItems: "center", gap: 6, marginTop: 10, fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", userSelect: "none" }}>
          Swipe to explore ›
        </p>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          style={{
            marginTop: "clamp(48px, 6vw, 72px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            paddingTop: "clamp(32px, 4vw, 48px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.5vw, 19px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.35)",
            margin: 0,
          }}>
            These aren't differentiators. They're the baseline.
          </p>

          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = GOLD;
              (e.currentTarget as HTMLButtonElement).style.color = BLACK;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = GOLD;
            }}
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "14px 36px",
              border: `1px solid ${GOLD}60`,
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor: "transparent",
              color: GOLD,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "background-color 0.25s ease, color 0.25s ease",
            }}
          >
            Start a Project
            <ArrowRight size={13} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}