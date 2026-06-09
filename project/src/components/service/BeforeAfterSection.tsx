import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, LAVENDER, BLUE, BLACK } from "@/constants/theme";
import { ContentContainer, Eyebrow } from "./ServicePagePrimitives";

export interface ComparisonPair {
  label: string;
  beforeSrc: string;
  afterSrc: string;
  beforeCaption: string;
  afterCaption: string;
  accent?: string;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function BeforeAfterSection({ pairs, accent = GOLD }: { pairs: ComparisonPair[]; accent?: string }) {
  const [active, setActive] = useState(0);
  const pair = pairs[active];

  return (
    <section style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "clamp(56px,7vw,96px) 0" }}>
      <ContentContainer>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: "clamp(36px,4vw,52px)" }}>
          <Eyebrow>The Transformation</Eyebrow>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", margin: "18px 0 0" }}>
            See the difference{" "}
            <em style={{ color: accent }}>we make.</em>
          </h2>
        </motion.div>

        {/* Tab row */}
        <style>{`
          .baf-tabs::-webkit-scrollbar { display: none; }
        `}</style>
        <div className="baf-tabs" style={{ display: "flex", gap: 0, marginBottom: "clamp(28px,3vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.08)", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ background: "none", border: "none", borderBottom: i === active ? `2px solid ${accent}` : "2px solid transparent", padding: "10px clamp(10px,2vw,24px)", cursor: "pointer", fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px,1vw,12px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: i === active ? accent : "rgba(255,255,255,0.35)", transition: "color 0.15s, border-color 0.15s", whiteSpace: "nowrap", marginBottom: -1, flexShrink: 0 }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Comparison panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, alignItems: "stretch" }}>
              {/* Before */}
              <div style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: "rgba(0,0,0,0.7)", padding: "4px 12px" }}>
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Before</span>
                </div>
                <img
                  src={pair.beforeSrc}
                  alt={pair.beforeCaption}
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", filter: "saturate(0.7) brightness(0.85)", flexShrink: 0 }}
                  onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15"; }}
                />
                <div style={{ padding: "12px 14px", background: "#131313", borderTop: `3px solid rgba(255,255,255,0.08)`, flex: 1 }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px,1.1vw,12px)", color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{pair.beforeCaption}</p>
                </div>
              </div>

              {/* After */}
              <div style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: `${accent}cc`, padding: "4px 12px" }}>
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#000" }}>After NicheUX</span>
                </div>
                <img
                  src={pair.afterSrc}
                  alt={pair.afterCaption}
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", flexShrink: 0 }}
                  onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15"; }}
                />
                <div style={{ padding: "12px 14px", background: "#131313", borderTop: `3px solid ${accent}`, flex: 1 }}>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px,1.1vw,12px)", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>{pair.afterCaption}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: "clamp(24px,3vw,36px)" }}>
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${pairs[i].label}`}
              style={{ width: i === active ? 24 : 8, minWidth: i === active ? 24 : 8, maxWidth: i === active ? 24 : 8, height: 8, minHeight: 8, maxHeight: 8, borderRadius: 4, background: i === active ? accent : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", transition: "all 0.25s", padding: 0, display: "block", flexShrink: 0, appearance: "none", WebkitAppearance: "none" }}
            />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
