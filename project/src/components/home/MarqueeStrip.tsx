// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import { GOLD, BLACK } from "@/constants/theme";

const items = [
  "Strategy & Design",
  "Brand Identity",
  "Web Development",
  "Motion & AI Visuals",
  "Illustration",
  "Social Media",
  "Print Design",
];

function Bulbs({ count = 24 }: { count?: number }) {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 clamp(16px, 3vw, 32px)",
        height: 14,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: GOLD,
            boxShadow: `0 0 8px ${GOLD}80, 0 0 14px ${GOLD}40`,
            opacity: i % 2 === 0 ? 1 : 0.55,
            animation: `marqueeBulb 1.4s ${i * 0.08}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

function MarqueeItems() {
  return (
    <>
      {items.map((label, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(11px, 1.1vw, 13px)",
            color: GOLD,
            opacity: 0.55,
            marginRight: 14,
            letterSpacing: "0.04em",
          }}>
            {String(i + 1).padStart(2, "0")}.
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.4vw, 32px)",
              letterSpacing: "-0.01em",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
          <span
            aria-hidden
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(20px, 2.4vw, 30px)",
              color: GOLD,
              margin: "0 clamp(28px, 3.5vw, 48px)",
              transform: "translateY(-2px)",
              opacity: 0.7,
            }}
          >
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeStrip() {
  return (
    <section
      aria-label="Tonight's programme"
      style={{
        width: "100%",
        background: BLACK,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes marqueeBulb {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Top bulb strip */}
      <Bulbs count={28} />

      {/* Header line. "TONIGHT'S PROGRAMME" */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "10px 0 4px",
      }}>
        <div style={{ width: 36, height: 1, background: `${GOLD}50` }} />
        <span style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: GOLD,
        }}>
          Tonight's Programme
        </span>
        <div style={{ width: 36, height: 1, background: `${GOLD}50` }} />
      </div>

      {/* The marquee. italic Playfair, large, theatre sign style */}
      <div style={{
        position: "relative",
        padding: "clamp(20px, 2.5vw, 32px) 0",
        borderTop: `1px solid ${GOLD}20`,
        borderBottom: `1px solid ${GOLD}20`,
        margin: "0 clamp(16px, 3vw, 32px)",
      }}>
        {/* Edge fades */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 140,
          background: `linear-gradient(90deg, ${BLACK} 0%, transparent 100%)`,
          zIndex: 2, pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 140,
          background: `linear-gradient(270deg, ${BLACK} 0%, transparent 100%)`,
          zIndex: 2, pointerEvents: "none",
        }} />

        <motion.div
          style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        >
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <MarqueeItems />
          </span>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <MarqueeItems />
          </span>
        </motion.div>
      </div>

      {/* Bottom bulb strip */}
      <Bulbs count={28} />
    </section>
  );
}
