// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GOLD, PARCHMENT, INK, INK_SOFT, INK_MUTED, LAVENDER } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function AboutStrip() {
  const navigate = useNavigate();
  const [ctaHovered, setCtaHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="about-strip"
      style={{
        backgroundColor: PARCHMENT,
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
      }}
    >
      {/* Massive background numeral. editorial accent on parchment */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(20px, 3vw, 40px)",
          right: "clamp(-20px, -1vw, 0px)",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(180px, 26vw, 420px)",
          lineHeight: 0.85,
          color: "rgba(90,61,92,0.07)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        III
      </div>

      {/* Subtle paper vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(26,26,26,0.06) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* TOP. eyebrow + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "end",
            marginBottom: "clamp(48px, 6vw, 80px)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 1, background: INK }} />
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.32em", textTransform: "uppercase",
              color: INK,
            }}>
              Act III &middot; The Ensemble
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: INK,
            margin: 0,
            textAlign: "right",
          }}>
            We're not an agency.{" "}
            <em style={{ color: LAVENDER }}>
              We're an ensemble.
            </em>
          </h2>
        </motion.div>

        {/* MIDDLE. full-width image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          style={{
            width: "100%",
            marginBottom: "clamp(48px, 6vw, 80px)",
            position: "relative",
            border: `1px solid rgba(26,26,26,0.12)`,
          }}
        >
          <img
            src="/images/GrandTheatreOfCreation.webp"
            alt="The NicheUX ensemble"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "sepia(0.08) contrast(0.96)",
            }}
          />
        </motion.div>

        {/* Director's Note caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(56px, 7vw, 96px)",
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: INK_MUTED,
          }}
        >
          A Director's Note
        </motion.div>

        {/* BOTTOM. three-column: body / facts / cta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          <div
            id="ensemble-bottom-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr auto",
              gap: "clamp(32px, 5vw, 80px)",
              alignItems: "start",
            }}
          >
            <style>{`
              @media (max-width: 900px) {
                #ensemble-bottom-grid {
                  grid-template-columns: 1fr !important;
                  gap: clamp(28px, 4vw, 40px) !important;
                }
              }
            `}</style>

            {/* Body. with editorial drop cap */}
            <p style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.85,
              color: INK_SOFT,
              margin: 0,
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(56px, 6vw, 80px)",
                lineHeight: 0.85,
                color: LAVENDER,
                float: "left",
                marginRight: 10,
                marginTop: 4,
                marginBottom: -4,
              }}>
                H
              </span>
              and-picked specialists &mdash; no bloat, no junior staff learning on
              your budget. Expert craftspeople, perfectly orchestrated to tell
              your story. Each project is staged by people who have spent years
              mastering their craft, and we treat your brand like a performance
              that deserves its own spotlight.
            </p>

            {/* Inline facts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { stat: "40+", label: "Project Deliverables" },
                { stat: "6",   label: "Disciplines" },
                { stat: "4+",  label: "Countries" },
              ].map(({ stat, label }, i) => (
                <div key={label} style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  paddingBottom: i === 2 ? 0 : 12,
                  borderBottom: i === 2 ? "none" : "1px solid rgba(26,26,26,0.12)",
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(22px, 2.4vw, 30px)",
                    color: INK,
                    minWidth: 48,
                  }}>
                    {stat}
                  </span>
                  <span style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: INK_MUTED,
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              onClick={() => navigate("/about")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                alignSelf: "start",
              }}
            >
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: ctaHovered ? LAVENDER : INK,
                paddingBottom: 7,
                borderBottom: `1px solid ${ctaHovered ? LAVENDER : INK}`,
                transition: "color 0.25s ease, border-color 0.25s ease",
              }}>
                Meet the ensemble
              </span>
              <div style={{
                width: 32, height: 32,
                borderRadius: "50%",
                border: `1px solid ${ctaHovered ? LAVENDER : INK}`,
                background: ctaHovered ? LAVENDER : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.25s ease",
                flexShrink: 0,
              }}>
                <ArrowUpRight size={14} style={{
                  color: ctaHovered ? PARCHMENT : INK,
                  transition: "color 0.25s ease",
                }} />
              </div>
            </button>
          </div>

          {/* Signature line */}
          <div style={{
            marginTop: "clamp(48px, 6vw, 72px)",
            display: "flex",
            justifyContent: "flex-end",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(16px, 1.6vw, 20px)",
            color: LAVENDER,
            letterSpacing: "0.01em",
          }}>
            &mdash; the ensemble, with love.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
