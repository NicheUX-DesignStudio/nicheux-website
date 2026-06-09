"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GOLD, BLUE, LAVENDER, PARCHMENT, INK, INK_MUTED } from "@/constants/theme";

const BLACK = "#0A0A0A";
const EASE  = [0.25, 0.46, 0.45, 0.94] as const;

const PROOF = [
  { number: "6",   label: "Disciplines",      detail: "Strategy, web, motion, print, illustration, social. All under one roof.",   accent: GOLD    },
  { number: "5",   label: "Client countries", detail: "United Kingdom · India · Canada · Ireland · Malaysia",                      accent: LAVENDER },
  { number: "3",   label: "Live client sites", detail: "Bloom & Brew · NandhiniDC · Kishore Aravind", accent: BLUE    },
];

export default function TheWhy() {
  const quoteRef  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: quoteRef, offset: ["start end", "end start"] });
  const quoteY    = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section style={{ background: BLACK, overflow: "hidden", position: "relative" }} aria-label="The NicheUX story">

      {/* Atmospheric glows */}
      <motion.div aria-hidden
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }} transition={{ duration: 14, repeat: Infinity }}
        style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "60vw", background: LAVENDER, filter: "blur(180px)", borderRadius: "50%", pointerEvents: "none" }}
      />
      <motion.div aria-hidden
        animate={{ opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 18, repeat: Infinity, delay: 5 }}
        style={{ position: "absolute", bottom: "5%", right: "-5%", width: "45vw", height: "45vw", background: GOLD, filter: "blur(160px)", borderRadius: "50%", pointerEvents: "none" }}
      />

      {/* ── Pull quote hero ── */}
      <div ref={quoteRef} style={{ padding: "clamp(96px,11vw,152px) clamp(24px,8vw,120px) clamp(64px,7vw,96px)", textAlign: "center", position: "relative" }}>
        <motion.div
          style={{ width: 1, height: "clamp(48px,6vw,80px)", background: `linear-gradient(to bottom, transparent, ${GOLD}55)`, margin: "0 auto clamp(24px,3vw,40px)" }}
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.2, ease: EASE }} viewport={{ once: true }}
        />

        <motion.span
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }}
          style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.42em", textTransform: "uppercase", color: `${GOLD}70`, display: "block", marginBottom: "clamp(18px,2.5vw,32px)" }}
        >
          The Studio Belief
        </motion.span>

        <motion.blockquote
          style={{ y: quoteY, margin: 0 }}
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1, ease: EASE }} viewport={{ once: true }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(26px,4.5vw,70px)", lineHeight: 1.14, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 clamp(14px,2vw,24px)", maxWidth: 1000, marginLeft: "auto", marginRight: "auto" }}>
            "A brand is not a product.{" "}
            <em style={{ color: GOLD }}>It is a feeling your customers carry forever.</em>"
          </p>
          <footer style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.16)" }}>
            NicheUX · Studio Positioning
          </footer>
        </motion.blockquote>

        <motion.div
          style={{ width: 1, height: "clamp(48px,6vw,80px)", background: `linear-gradient(to top, transparent, ${GOLD}55)`, margin: "clamp(24px,3vw,40px) auto 0" }}
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 }} viewport={{ once: true }}
        />
      </div>


    </section>
  );
}

export function StudioProofStrip() {
  return (
    <section style={{ background: PARCHMENT }} aria-label="Studio at a glance">
      <div style={{ padding: "clamp(48px,6vw,80px) clamp(24px,6vw,96px)", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: "clamp(32px,4.5vw,56px)" }}
        >
          <div style={{ width: 56, height: 1, background: "rgba(26,26,26,0.12)" }} />
          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.44em", textTransform: "uppercase", color: INK }}>The Studio · At a Glance</span>
          <div style={{ width: 56, height: 1, background: "rgba(26,26,26,0.12)" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)", maxWidth: 1100, margin: "0 auto" }} className="proof-grid">
          <style>{`@media(max-width:640px){.proof-grid{grid-template-columns:1fr!important}}`}</style>
          {PROOF.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }}
              style={{ background: PARCHMENT, padding: "clamp(28px,3.5vw,48px) clamp(20px,3vw,40px)" }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(48px,7vw,96px)", lineHeight: 1, color: p.accent, marginBottom: 12 }}>
                {p.number}
              </div>
              <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: INK, marginBottom: 8 }}>
                {p.label}
              </div>
              <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, lineHeight: 1.7, color: INK_MUTED }}>
                {p.detail}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: "clamp(32px,4vw,52px)" }}>
          <div style={{ width: 56, height: 1, background: "rgba(26,26,26,0.08)" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, color: GOLD }}>❖</span>
          <div style={{ width: 56, height: 1, background: "rgba(26,26,26,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
