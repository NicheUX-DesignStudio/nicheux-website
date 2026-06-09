"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GOLD, PARCHMENT, INK, INK_MUTED, LAVENDER } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const STATS = [
  { roman: "I",   value: "40+", target: 40,  suffix: "+", label: "Project Deliverables\nDelivered" },
  { roman: "II",  value: "6",   target: 6,   suffix: "",  label: "Design\nDisciplines" },
  { roman: "III", value: "4+",  target: 4,   suffix: "+", label: "Countries\nServed" },
  { roman: "IV",  value: "UK",  target: null, suffix: "", label: "Based,\nGlobal Reach" },
];

function Cell({ stat, index, inView }: { stat: typeof STATS[0]; index: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || stat.target === null) return;
    const delay = setTimeout(() => {
      const start = Date.now();
      const dur = 1400;
      const iv = setInterval(() => {
        const t = Math.min((Date.now() - start) / dur, 1);
        const e = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(e * (stat.target as number)));
        if (t >= 1) clearInterval(iv);
      }, 16);
      return () => clearInterval(iv);
    }, index * 120 + 250);
    return () => clearTimeout(delay);
  }, [inView, index, stat.target]);

  const display = stat.target === null ? stat.value : `${count}${stat.suffix}`;
  const isLast = index === STATS.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      style={{
        padding: "clamp(40px, 5vh, 64px) clamp(28px, 3vw, 44px)",
        borderRight: isLast ? "none" : "1px solid rgba(26,26,26,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
      }}
    >
      {/* Roman numeral marker */}
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: 11,
        letterSpacing: "0.16em",
        color: LAVENDER,
        opacity: 0.7,
      }}>
        {stat.roman}.
      </span>

      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "clamp(56px, 7.5vw, 96px)",
        lineHeight: 1,
        letterSpacing: "-0.035em",
        color: INK,
        display: "block",
      }}>
        {display}
      </span>

      <span style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: INK_MUTED,
        lineHeight: 1.7,
        whiteSpace: "pre-line",
      }}>
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function StatStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="programme"
      aria-label="Studio at a glance"
      style={{
        backgroundColor: PARCHMENT,
        position: "relative",
        paddingTop: "clamp(48px, 6vw, 72px)",
        paddingBottom: "clamp(48px, 6vw, 72px)",
      }}
    >
      {/* Subtle paper grain. radial vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.05) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 clamp(24px, 6vw, 80px)",
        position: "relative",
      }}>

        {/* Playbill header. printed programme feel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginBottom: "clamp(36px, 4.5vw, 56px)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: 44, height: 1, background: `${INK}30` }} />
          <span style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: INK,
          }}>
            The Playbill &middot; Est. MMXX &middot; London &middot; UK
          </span>
          <div style={{ width: 44, height: 1, background: `${INK}30` }} />
        </motion.div>

        {/* Stats grid */}
        <div
          id="stat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: `1px solid rgba(26,26,26,0.12)`,
            background: "transparent",
          }}
        >
          <style>{`
            @media (max-width: 767px) {
              #stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
              #stat-grid > div:nth-child(2) { border-right: none !important; }
              #stat-grid > div:nth-child(1),
              #stat-grid > div:nth-child(2) { border-bottom: 1px solid rgba(26,26,26,0.12) !important; }
            }
          `}</style>
          {STATS.map((s, i) => <Cell key={s.label} stat={s} index={i} inView={inView} />)}
        </div>

        {/* Bottom flourish. fleuron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginTop: "clamp(36px, 4.5vw, 56px)",
          }}
        >
          <div style={{ width: 60, height: 1, background: `${INK}25` }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 16,
            color: GOLD,
            transform: "translateY(-1px)",
          }}>
            &#10086;
          </span>
          <div style={{ width: 60, height: 1, background: `${INK}25` }} />
        </motion.div>
      </div>
    </section>
  );
}
