import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { PARCHMENT, GOLD, INK, INK_MUTED, LAVENDER } from "@/constants/theme";

export interface ServiceStat {
  display: string;
  numericTarget?: number;
  label: string;
}

interface Props {
  stats: [ServiceStat, ServiceStat, ServiceStat, ServiceStat];
  sectionLabel?: string;
}

const ROMAN = ["I", "II", "III", "IV"] as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function CountCell({ stat, idx, inView }: { stat: ServiceStat; idx: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  const isNumeric = stat.numericTarget != null;

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const delay = setTimeout(() => {
      const start = Date.now();
      const dur = 1400;
      const iv = setInterval(() => {
        const t = Math.min((Date.now() - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(ease * stat.numericTarget!));
        if (t >= 1) clearInterval(iv);
      }, 16);
      return () => clearInterval(iv);
    }, idx * 120 + 200);
    return () => clearTimeout(delay);
  }, [inView, idx, isNumeric, stat.numericTarget]);

  // For numeric stats, rebuild the display with the counted value
  const rendered = isNumeric
    ? stat.display.replace(/\d+/, String(count))
    : stat.display;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE }}
      style={{
        padding: "clamp(36px,5vh,60px) clamp(24px,3vw,40px)",
        borderRight: idx < 3 ? "1px solid rgba(26,26,26,0.10)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: 11,
        letterSpacing: "0.16em",
        color: LAVENDER,
        opacity: 0.7,
      }}>
        {ROMAN[idx]}.
      </span>

      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "clamp(48px,7vw,88px)",
        lineHeight: 1,
        letterSpacing: "-0.035em",
        color: INK,
        display: "block",
      }}>
        {rendered}
      </span>

      <span style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.24em",
        textTransform: "uppercase" as const,
        color: INK_MUTED,
        lineHeight: 1.7,
        whiteSpace: "pre-line" as const,
      }}>
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function ServiceStatStrip({ stats, sectionLabel = "By the Numbers" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} aria-label={sectionLabel} style={{ backgroundColor: PARCHMENT, position: "relative", padding: "clamp(40px,6vw,64px) 0" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.04) 100%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,6vw,80px)", position: "relative" }}>

        {/* Playbill header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: "clamp(32px,4vw,48px)", flexWrap: "wrap" }}
        >
          <div style={{ width: 44, height: 1, background: `${INK}28` }} />
          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.42em", textTransform: "uppercase" as const, color: INK }}>
            {sectionLabel}
          </span>
          <div style={{ width: 44, height: 1, background: `${INK}28` }} />
        </motion.div>

        {/* Stats grid */}
        <div
          id="svc-stat-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "1px solid rgba(26,26,26,0.10)" }}
        >
          <style>{`
            @media(max-width:767px){
              #svc-stat-grid{grid-template-columns:repeat(2,1fr)!important}
              #svc-stat-grid>div:nth-child(2){border-right:none!important}
              #svc-stat-grid>div:nth-child(1),#svc-stat-grid>div:nth-child(2){border-bottom:1px solid rgba(26,26,26,0.10)!important}
            }
          `}</style>
          {stats.map((s, i) => (
            <CountCell key={s.label} stat={s} idx={i} inView={inView} />
          ))}
        </div>

        {/* Fleuron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: "clamp(32px,4vw,48px)" }}
        >
          <div style={{ width: 60, height: 1, background: `${INK}20` }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: GOLD, transform: "translateY(-1px)" }}>❖</span>
          <div style={{ width: 60, height: 1, background: `${INK}20` }} />
        </motion.div>
      </div>
    </section>
  );
}
