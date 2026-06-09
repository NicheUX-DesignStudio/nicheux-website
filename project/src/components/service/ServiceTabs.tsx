import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, LAVENDER, BLUE, BLACK } from "@/constants/theme";

const CYCLING_COLORS = [GOLD, LAVENDER, BLUE] as const;

export interface ServiceItem {
  name: string;
  serviceId: string;
  desc: string;
  accent?: string;
}

export interface ServiceTabGroup {
  label: string;
  items: ServiceItem[];
}

interface ServiceTabsProps {
  tabs: ServiceTabGroup[];
  accent: string;
  getPrice: (id: string) => string;
  onSelect: (name: string) => void;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function ServiceTabs({ tabs, accent, getPrice, onSelect }: ServiceTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
      {/* Tab bar */}
      <style>{`
        .svc-tab-bar::-webkit-scrollbar { display: none; }
        @media(max-width:899px){
          .svc-tab-wrapper::after {
            content: '';
            position: absolute;
            top: 0; right: 0; bottom: 0;
            width: 56px;
            background: linear-gradient(to right, transparent, #0a0a0a);
            pointer-events: none;
            z-index: 1;
          }
        }
      `}</style>
      <div className="svc-tab-wrapper" style={{ position: "relative", marginBottom: "clamp(28px,3.5vw,44px)" }}>
      <div className="svc-tab-bar" style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.08)", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            style={{
              background: "none",
              border: "none",
              borderBottom: i === active ? `2px solid ${accent}` : "2px solid transparent",
              padding: "12px clamp(16px,2vw,28px)",
              cursor: "pointer",
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: "clamp(11px,1vw,13px)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: i === active ? accent : "rgba(255,255,255,0.38)",
              transition: "color 0.15s, border-color 0.15s",
              whiteSpace: "nowrap",
              marginBottom: -1,
              flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      </div>

      {/* Grid of service cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="svc-tab-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(8px,1.2vw,16px)" }}
        >
          <style>{`@media(max-width:900px){.svc-tab-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){.svc-tab-grid{grid-template-columns:1fr!important}}`}</style>
          {tabs[active].items.map((svc, i) => (
            <ServiceCard key={svc.name} svc={svc} accent={accent} price={getPrice(svc.serviceId)} onSelect={onSelect} delay={i * 0.04} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ServiceCard({ svc, accent, price, onSelect, delay, index }: { svc: ServiceItem; accent: string; price: string; onSelect: (name: string) => void; delay: number; index: number }) {
  const [hov, setHov] = useState(false);
  const cardAccent = svc.accent || accent;
  const priceColor = CYCLING_COLORS[index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${cardAccent}08` : "#131313",
        border: `1px solid ${hov ? cardAccent + "35" : "rgba(255,255,255,0.07)"}`,
        padding: "clamp(16px,2vw,24px)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(14px,1.3vw,17px)", color: priceColor, lineHeight: 1.1 }}>
        {price === "Free" ? "Free" : `Starts at ${price.split("–")[0].trim()}`}
      </div>
      <h3 style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, fontSize: "clamp(13px,1.1vw,15px)", color: "#fff", margin: 0, lineHeight: 1.35 }}>{svc.name}</h3>
      <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(11px,1vw,13px)", color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6, flex: 1 }}>{svc.desc}</p>
      <button
        onClick={() => onSelect(svc.name)}
        style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: cardAccent,
          background: "transparent",
          border: `1px solid ${cardAccent}35`,
          padding: "8px 14px",
          cursor: "pointer",
          alignSelf: "flex-start",
          marginTop: 4,
          transition: "background 0.15s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${cardAccent}15`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
      >
        Select This
      </button>
    </motion.div>
  );
}
