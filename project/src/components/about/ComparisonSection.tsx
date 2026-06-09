"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE, PARCHMENT, INK, INK_MUTED } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const disciplines = [
  { numeral: "I",   title: "Strategy & Design",     line: "We map every user's journey before a single pixel is placed.",     detail: "UX Audit · Research · Wireframes · UI Design Systems",            accent: GOLD,    path: "/strategy-design" },
  { numeral: "II",  title: "Web Development",        line: "Handcrafted, custom-coded. Zero templates, zero limits.",           detail: "React · Shopify · Custom Themes · Care Plans",                   accent: BLUE,    path: "/web-development-ecommerce" },
  { numeral: "III", title: "Motion & AI Visuals",    line: "Your audience stops scrolling in 1.3 seconds. Or not at all.",    detail: "Explainer Videos · Logo Animation · AI Generation · Social Reels",accent: LAVENDER, path: "/motion-design-ai-visuals" },
  { numeral: "IV",  title: "Print & Brand Identity", line: "Identities so precise you own the room before you speak.",         detail: "Logo Systems · Brochures · Business Essentials · Signage",        accent: GOLD,    path: "/print-brand-design" },
  { numeral: "V",   title: "Social Media & Content", line: "Every post earns its place on the feed.",                          detail: "Strategy · Content Creation · Reels · Community Growth",          accent: BLUE,    path: "/social-media-marketing" },
  { numeral: "VI",  title: "Illustration & Character",line: "Worlds built from imagination, executed with discipline.",         detail: "Character Design · Children's Books · Editorial · Comics",        accent: LAVENDER, path: "/illustration-character-design" },
];

export default function StudioPositioning() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: PARCHMENT, overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(24px,5vw,80px)" }}>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }}
          style={{ marginBottom: "clamp(48px,6vw,80px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
            <div style={{ width: 44, height: 1, background: "rgba(26,26,26,0.2)" }} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: INK_MUTED }}>Six disciplines</span>
            <div style={{ width: 44, height: 1, background: "rgba(26,26,26,0.2)" }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: INK, margin: 0 }}>
            Every type of creative work<br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>under one roof.</em>
          </h2>
        </motion.div>

        <div>
          {disciplines.map((d, i) => {
            const isH = hovered === i;
            return (
              <motion.div key={d.numeral}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(d.path)}
                style={{ display: "grid", gridTemplateColumns: "clamp(40px,5vw,64px) 1fr auto", alignItems: "center", gap: "clamp(16px,3vw,40px)", padding: "clamp(20px,2.5vw,32px) clamp(16px,2vw,24px)", borderBottom: `1px solid ${isH ? `${d.accent}30` : "rgba(26,26,26,0.1)"}`, cursor: "pointer", background: isH ? `${d.accent}07` : "transparent", transition: "background 0.25s, border-color 0.25s" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(18px,2.5vw,30px)", color: isH ? d.accent : `${INK}30`, lineHeight: 1, transition: "color 0.25s" }}>{d.numeral}</span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(20px,2.5vw,34px)", lineHeight: 1.1, color: isH ? INK : `${INK}CC`, margin: "0 0 6px", letterSpacing: "-0.01em", transition: "color 0.25s" }}>{d.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(12px,1.1vw,14px)", color: isH ? INK_MUTED : `${INK_MUTED}80`, margin: 0, lineHeight: 1.5, transition: "color 0.25s" }}>{isH ? d.detail : d.line}</p>
                </div>
                <motion.div animate={{ x: isH ? 4 : 0, opacity: isH ? 1 : 0.25 }} transition={{ duration: 0.2 }} style={{ color: d.accent, flexShrink: 0 }}><ArrowRight size={18} /></motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} viewport={{ once: true }}
          style={{ marginTop: "clamp(40px,5vw,64px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(16px,1.6vw,20px)", color: INK_MUTED, margin: 0 }}>
            You don't need a different studio for each discipline.
          </p>
          <button onClick={() => navigate("/contact")}
            style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, background: GOLD, border: "none", padding: "12px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.82"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
            Get Started <ArrowRight size={12} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
