// Live Teardown - signature thinking moment for the Design page
// A public UX critique that demonstrates expertise through original analysis
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLD, LAVENDER } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type Finding = {
  num: string;
  pattern: string;
  observation: string;
  fix: string;
  severity: "Friction" | "Leak" | "Missed";
};

const FINDINGS: Finding[] = [
  {
    num: "01",
    pattern: "The hero promises everything",
    observation: "Three CTAs compete for attention in the first viewport. Demo, Sign Up, Get Started. each one a different commitment, each one a different cost. Visitors don't choose; they leave.",
    fix: "One CTA, one outcome. Demo for the curious; the rest moves below the fold or to a separate page.",
    severity: "Leak",
  },
  {
    num: "02",
    pattern: "Form fields ask before earning",
    observation: "Eight fields before a value exchange. Phone, company size, role, budget. collected upfront like an interrogation, not a conversation.",
    fix: "Email + first name. Earn the rest with a useful response. Progressive disclosure, not paranoid gatekeeping.",
    severity: "Friction",
  },
  {
    num: "03",
    pattern: "Pricing buries the model",
    observation: "Three tiers, no anchor logic. Why does the middle tier exist? What changes between tiers. features, seats, or both? The visitor is left to guess.",
    fix: "Lead with the most common case. Anchor the others as exceptions, not equals.",
    severity: "Missed",
  },
  {
    num: "04",
    pattern: "Trust signals come too late",
    observation: "Logos, testimonials, and case studies sit at the bottom of the page. after the user has already made the back-button decision.",
    fix: "Thread proof through the journey. One quote after the hero. One logo strip after the value prop. Never one big block at the end.",
    severity: "Missed",
  },
];

const SEVERITY_COLORS: Record<Finding["severity"], string> = {
  Friction: "#E27A6E",
  Leak: GOLD,
  Missed: LAVENDER,
};

export function LiveTeardown() {
  return (
    <div>
      {/* Header. newsroom feel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, amount: 0.1 }}
        style={{ marginBottom: "clamp(56px, 7vw, 96px)" }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
        }}>
          <div style={{ width: 32, height: 1, background: LAVENDER, opacity: 0.6 }} />
          <span style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: "clamp(10px, 1vw, 12px)",
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: LAVENDER,
          }}>
            The Teardown · Field notes
          </span>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "end",
        }}>
          <style>{`
            @media (max-width: 768px) {
              .teardown-header { grid-template-columns: 1fr !important; }
            }
          `}</style>
          <div className="teardown-header">
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#fff",
              margin: "0 0 16px 0",
            }}>
              Four leaks, one page. Spotted in the wild.
            </h2>
            <p style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              maxWidth: 640,
            }}>
              We tear down a B2B SaaS landing page every month. anonymized, but accurate. The same patterns leak conversion across every category. Here's what we see, and what we'd ship instead.
            </p>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingLeft: "clamp(0px, 2vw, 24px)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}>
              This edition
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 1.6vw, 22px)",
              color: "#fff",
            }}>
              May 2026 · No. 04
            </div>
            <div style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              marginTop: 8,
            }}>
              Published the first Monday of each month.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Findings. newsroom dossier rows */}
      <div style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        overflow: "hidden",
        background: "rgba(255,255,255,0.015)",
      }}>
        {FINDINGS.map((f, i) => (
          <motion.div
            key={f.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            viewport={{ once: true, amount: 0.2 }}
            style={{
              padding: "clamp(32px, 4vw, 56px) clamp(24px, 3vw, 48px)",
              borderBottom: i < FINDINGS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              display: "grid",
              gridTemplateColumns: "auto minmax(0, 1fr)",
              gap: "clamp(24px, 3vw, 56px)",
              alignItems: "start",
              position: "relative",
            }}
          >
            <style>{`
              @media (max-width: 768px) {
                .teardown-row-${f.num} { grid-template-columns: 1fr !important; }
              }
            `}</style>
            {/* Left column. number + severity */}
            <div className={`teardown-row-${f.num}`} style={{ minWidth: 200 }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(56px, 7vw, 96px)",
                lineHeight: 0.95,
                color: LAVENDER,
                marginBottom: 16,
              }}>
                {f.num}
              </div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 12px",
                border: `1px solid ${SEVERITY_COLORS[f.severity]}40`,
                background: `${SEVERITY_COLORS[f.severity]}08`,
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: SEVERITY_COLORS[f.severity],
                borderRadius: 2,
              }}>
                <span style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: SEVERITY_COLORS[f.severity],
                }} />
                {f.severity}
              </div>
            </div>

            {/* Right column. pattern + observation + fix */}
            <div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(22px, 2.6vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: "0 0 24px 0",
                maxWidth: 800,
              }}>
                {f.pattern}.
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "auto minmax(0, 1fr)",
                gap: "clamp(16px, 2vw, 32px)",
                marginBottom: 24,
                alignItems: "start",
              }}>
                <span style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 4,
                  flexShrink: 0,
                }}>
                  Observation
                </span>
                <p style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.65)",
                  margin: 0,
                }}>
                  {f.observation}
                </p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "auto minmax(0, 1fr)",
                gap: "clamp(16px, 2vw, 32px)",
                paddingTop: 20,
                borderTop: `1px solid ${GOLD}20`,
                alignItems: "start",
              }}>
                <span style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginTop: 4,
                  flexShrink: 0,
                }}>
                  What we'd ship
                </span>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.5vw, 20px)",
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                }}>
                  {f.fix}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(14px, 1.2vw, 16px)",
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          margin: "clamp(40px, 5vw, 64px) auto 0",
          maxWidth: 720,
          lineHeight: 1.6,
        }}
      >
        Want your site torn down? We do one for free each quarter.
      </motion.p>
    </div>
  );
}
