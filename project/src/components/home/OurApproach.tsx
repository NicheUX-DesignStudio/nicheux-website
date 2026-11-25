"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { GOLD, LAVENDER, BLACK } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const ROWS = [
  {
    n: "I",
    q: "What does the business need?",
    a: "We begin with the result you want, whether that is bookings, orders or enquiries, so every design choice has a job to do.",
  },
  {
    n: "II",
    q: "What story is only yours?",
    a: "Every brand has one. We find it, then let it decide the colours, the words and the pictures, so you look like yourself and nobody else.",
  },
  {
    n: "III",
    q: "What do you love?",
    a: "Tell us how it should feel. We shape the work around your taste, so you are proud to put your name on it.",
  },
];

export default function OurApproach() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="our-approach"
      aria-labelledby="our-approach-heading"
      style={{
        background: BLACK,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "clamp(80px,10vw,140px) clamp(24px,5.5vw,88px)",
      }}
    >
      <style>{`
        @media (max-width: 860px) { .approach-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div
        className="approach-grid"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)",
          gap: "clamp(40px,7vw,120px)",
          alignItems: "start",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD }}>
              How we work
            </span>
          </div>
          <h2
            id="our-approach-heading"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(38px,5.2vw,78px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 28px" }}
          >
            Your goals. Your story.{" "}
            <em style={{ fontStyle: "italic", color: LAVENDER }}>Your taste.</em>
          </h2>
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.85, color: "rgba(255,255,255,0.75)", margin: "0 0 36px", maxWidth: 460 }}>
            Most studios start with a template. We start with three questions, and the answers become your brand and your website.
          </p>
          <Link
            to="/contact?selection=Free%20Website%20Check%20%28send%20your%20link%29&hint=My%20website%20link%20is%3A%20"
            style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD}`, display: "inline-block", padding: "14px 0 6px" }}
          >
            Send us your website link
          </Link>
        </motion.div>

        <div>
          {ROWS.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE }}
              style={{
                display: "grid",
                gridTemplateColumns: "56px minmax(0,1fr)",
                gap: 20,
                padding: "clamp(24px,3vw,36px) 0",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderBottom: i === ROWS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 26, color: GOLD, opacity: 0.8, lineHeight: 1.2 }}>
                {r.n}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(24px,2.4vw,34px)", lineHeight: 1.15, color: "#fff", margin: "0 0 10px" }}>
                  {r.q}
                </h3>
                <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: 0 }}>
                  {r.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
