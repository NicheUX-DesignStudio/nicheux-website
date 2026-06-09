"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GOLD, BLACK } from "@/constants/theme";

const CLIENTS = [
  "Bloom & Brew",
  "Visual Communication",
  "AI Canvas",
  "Conceptual Art",
  "Samyuktha Tutoring",
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      aria-label="Selected clients"
      style={{
        backgroundColor: BLACK,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingTop: "clamp(40px, 5vw, 64px)",
        paddingBottom: "clamp(40px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" }}>
        <div
          id="trust-row"
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "clamp(24px, 4vw, 64px)",
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              #trust-row { grid-template-columns: 1fr !important; gap: 24px !important; }
              #trust-marks { justify-content: flex-start !important; }
            }
          `}</style>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}
          >
            <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              whiteSpace: "nowrap",
            }}>
              Trusted by
            </span>
          </motion.div>

          {/* Wordmarks */}
          <div
            id="trust-marks"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "clamp(20px, 3vw, 40px)",
            }}
          >
            {CLIENTS.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE }}
                onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  letterSpacing: "-0.005em",
                  color: "rgba(255,255,255,0.55)",
                  whiteSpace: "nowrap",
                  cursor: "default",
                  transition: "color 0.3s ease",
                }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
