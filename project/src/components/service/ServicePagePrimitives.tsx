// Service page shared components & primitives for consistency across all service offerings
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GOLD, LAVENDER, BLACK, PARCHMENT, INK, INK_MUTED } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ─────────────────────────────────────────────────────────────────────────────
// EYEBROW LABEL
// ─────────────────────────────────────────────────────────────────────────────
export function Eyebrow({ children, color = GOLD, style = {} }: { children: React.ReactNode; color?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }}>
      <div style={{ width: 28, height: 1, background: color }} />
      <span style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color,
      }}>
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUTTONS
// ─────────────────────────────────────────────────────────────────────────────
export function PrimaryButton({ onClick, children, disabled = false }: any) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        padding: "14px 32px",
        backgroundColor: disabled ? "rgba(233, 198, 114, 0.5)" : GOLD,
        color: BLACK,
        border: "2px solid transparent",
        borderRadius: 2,
        cursor: disabled ? "default" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        opacity: disabled ? 0.6 : 1,
        outline: "none",
        transition: "box-shadow 0.2s ease",
      }}
      onFocus={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 3px ${GOLD}80`;
        }
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
      }}
    >
      {children}
      <ArrowRight size={13} />
    </motion.button>
  );
}

export function SecondaryButton({ onClick, children, light = false }: any) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        padding: "14px 32px",
        background: "transparent",
        border: light ? `1px solid ${BLACK}30` : "1px solid rgba(255,255,255,0.18)",
        borderRadius: 2,
        cursor: "pointer",
        color: light ? BLACK : "rgba(255,255,255,0.75)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        outline: "none",
        transition: "box-shadow 0.2s ease",
      }}
      onFocus={(e) => {
        const accentColor = light ? BLACK : "rgba(255,255,255,0.75)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 3px ${accentColor}40`;
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
      }}
    >
      {children}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION CONTAINER
// ─────────────────────────────────────────────────────────────────────────────
export function ServiceSection({
  children,
  bgColor,
  light = false,
  borderTop = true,
  withSpotlight = false,
  spotlightColor = GOLD,
  id = "",
}: {
  children: React.ReactNode;
  bgColor?: string;
  light?: boolean;
  borderTop?: boolean;
  withSpotlight?: boolean;
  spotlightColor?: string;
  id?: string;
}) {
  const bg = bgColor ?? (light ? PARCHMENT : BLACK);
  const borderColor = light ? "1px solid rgba(26,26,26,0.08)" : "1px solid rgba(255,255,255,0.05)";
  return (
    <section
      id={id}
      data-light={light || undefined}
      style={{
        position: "relative",
        backgroundColor: bg,
        borderTop: borderTop ? borderColor : "none",
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        overflow: "hidden",
      }}
    >
      {light && (
        <style>{`
          section[data-light] h2,section[data-light] h3,section[data-light] h4{color:${INK}!important}
          section[data-light] h2 em,section[data-light] h3 em{color:unset!important}
          section[data-light] p{color:${INK_MUTED}!important}
          section[data-light] .artifact-tag{color:${INK_MUTED}!important;background:rgba(26,26,26,0.04)!important;border-color:rgba(26,26,26,0.12)!important}
          section[data-light] .process-border{border-bottom-color:rgba(26,26,26,0.1)!important}
          section[data-light] .step-label{color:inherit!important}
          section[data-light] .faq-border{border-bottom-color:rgba(26,26,26,0.12)!important}
          section[data-light] .faq-q{color:${INK}!important}
          section[data-light] .faq-a{color:${INK_MUTED}!important}
          section[data-light] .faq-icon{color:rgba(26,26,26,0.45)!important;border-color:rgba(26,26,26,0.25)!important}
          section[data-light] .faq-icon:hover{color:${INK}!important}
          section[data-light] span[style*="background: rgba(255,255,255"]{background:rgba(26,26,26,0.08)!important}
        `}</style>
      )}
      {withSpotlight && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "80%",
            height: "70%",
            transform: "translateX(-50%)",
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${spotlightColor}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND NUMERAL (for section visual emphasis)
// ─────────────────────────────────────────────────────────────────────────────
export function BackgroundNumeral({
  value,
  opacity = 0.025,
  position = "right",
}: {
  value: string | number;
  opacity?: number;
  position?: "left" | "right";
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "clamp(40px, 5vw, 80px)",
        [position]: "clamp(-30px, -2vw, 0px)",
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: "clamp(220px, 28vw, 440px)",
        lineHeight: 0.85,
        color: `rgba(235,199,115,${opacity})`,
        letterSpacing: "-0.04em",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {value}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT CONTAINER (max-width constraint with padding)
// ─────────────────────────────────────────────────────────────────────────────
export function ContentContainer({ children, maxWidth = 1400, style = {} }: any) {
  return (
    <div
      style={{
        maxWidth,
        margin: "0 auto",
        padding: "0 clamp(24px, 6vw, 80px)",
        position: "relative",
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER (title, description, eyebrow)
// ─────────────────────────────────────────────────────────────────────────────
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  description,
  inView = true,
  counter,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  inView?: boolean;
  counter?: { current: number; total: number };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      style={{
        marginBottom: "clamp(40px, 5vw, 64px)",
        display: "grid",
        gridTemplateColumns: counter ? "1fr auto" : "1fr",
        gap: "clamp(24px, 4vw, 64px)",
        alignItems: "end",
      }}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "20px 0 0 0",
            maxWidth: 1000,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              margin: "24px 0 0 0",
              maxWidth: 720,
            }}
          >
            {description}
          </p>
        )}
        {subtitle && (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(12px, 1.1vw, 13.5px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.35)",
              margin: "14px 0 0 0",
              maxWidth: 720,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {counter && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 6vw, 72px)",
              lineHeight: 1,
              color: GOLD,
              letterSpacing: "-0.02em",
            }}
          >
            {counter.current}
            <span style={{ fontSize: "0.45em", color: "rgba(255,255,255,0.4)" }}>
              {" / "}
              {String(counter.total).padStart(2, "0")}
            </span>
          </span>
          <span
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            fig. {counter.current}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARISON FRAME SVG
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenFrame({ children, accent = "#444" }: any) {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect x="0" y="0" width="360" height="240" fill={BLACK} />
      <rect x="0" y="0" width="360" height="16" fill="#0a0a0a" />
      <circle cx="9" cy="8" r="2.5" fill={accent} opacity="0.4" />
      <circle cx="17" cy="8" r="2.5" fill={accent} opacity="0.4" />
      <circle cx="25" cy="8" r="2.5" fill={accent} opacity="0.4" />
      {children}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ERROR DOT (red friction indicator)
// ─────────────────────────────────────────────────────────────────────────────
export function FrictionDot({ x, y }: any) {
  return (
    <circle
      cx={x}
      cy={y}
      r="3"
      fill="#E74C3C"
      opacity="0.6"
      style={{ filter: "drop-shadow(0 0 2px rgba(231,76,60,0.6))" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUCCESS DOT (gold check indicator)
// ─────────────────────────────────────────────────────────────────────────────
export function CheckDot({ x, y, c = GOLD }: any) {
  return (
    <circle
      cx={x}
      cy={y}
      r="3"
      fill={c}
      opacity="0.8"
      style={{ filter: `drop-shadow(0 0 2px ${c}80)` }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID LAYOUT (for items/features)
// ─────────────────────────────────────────────────────────────────────────────
export function ItemGrid({
  children,
  columns = 3,
  gap = "clamp(32px, 4vw, 48px)",
  mobileColumns = 1,
}: {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  mobileColumns?: number;
}) {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  };

  return (
    <div>
      <style>{`
        @media (max-width: 900px) {
          #item-grid { grid-template-columns: repeat(${mobileColumns}, 1fr) !important; }
        }
      `}</style>
      <div id="item-grid" style={style}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// METRIC ITEM (for results/stats sections)
// ─────────────────────────────────────────────────────────────────────────────
export function MetricItem({
  label,
  stat,
  sub,
  color = GOLD,
  inView = true,
  delay = 0,
}: {
  label: string;
  stat: string | number;
  sub: string;
  color?: string;
  inView?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{
        padding: "clamp(32px, 4vw, 56px) clamp(28px, 3.5vw, 48px)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: color,
        opacity: 0.4,
      }} />
      <span
        style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: "clamp(9px, 0.9vw, 11px)",
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: color,
          opacity: 0.7,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(52px, 7vw, 88px)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          color,
          marginBottom: 4,
        }}
      >
        {stat}
      </span>
      <span
        style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {sub}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADING HELPER
// ─────────────────────────────────────────────────────────────────────────────
export function SectionTitle({ children, style = {} }: any) {
  return (
    <h3
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 400,
        fontSize: "clamp(32px, 4vw, 56px)",
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        color: "#fff",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESCRIPTION TEXT
// ─────────────────────────────────────────────────────────────────────────────
export function DescriptionText({ children, style = {} }: any) {
  return (
    <p
      style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 400,
        fontSize: "clamp(15px, 1.4vw, 17px)",
        lineHeight: 1.8,
        color: "rgba(255,255,255,0.6)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIAGNOSIS SECTION — shared 5-item before/after section used on all 6 service pages
// ─────────────────────────────────────────────────────────────────────────────
export type DiagnosisSlide = {
  num: string;
  label: string;
  beforeNote: string;
  afterNote: string;
  impact: string;
  insight: string;
  beforeImg?: string;
  afterImg?: string;
};

export function DiagnosisSection({
  eyebrow,
  title,
  description,
  slides,
  accentColor = LAVENDER,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  slides: DiagnosisSlide[];
  accentColor?: string;
}) {
  const EASE = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, amount: 0.1 }}
        style={{ marginBottom: "clamp(56px,7vw,96px)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 28, height: 1, background: accentColor }} />
          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: accentColor }}>{eyebrow}</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 20px 0", maxWidth: 1000 }}>{title}</h2>
        <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.85, color: "rgba(255,255,255,0.6)", margin: 0, maxWidth: 760 }}>{description}</p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(64px,8vw,120px)" }}>
        {slides.map((slide, i) => (
          <motion.article
            key={slide.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            viewport={{ once: true, amount: 0.15 }}
            style={{ position: "relative", paddingTop: i === 0 ? 0 : "clamp(40px,5vw,64px)", borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Ghost number */}
            <div aria-hidden style={{ position: "absolute", top: i === 0 ? -32 : "clamp(20px,3vw,40px)", right: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(140px,20vw,320px)", lineHeight: 0.85, color: `${accentColor}08`, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em" }}>{slide.num}</div>

            {/* Label + impact */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: "clamp(24px,3vw,40px)", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(20px,2vw,28px)", color: accentColor }}>{slide.num}</span>
                <span style={{ width: 32, height: 1, background: accentColor, opacity: 0.4 }} />
                <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(11px,1vw,13px)", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: accentColor }}>{slide.label}</span>
              </div>
              <div style={{ padding: "6px 14px", border: `1px solid ${GOLD}40`, background: "rgba(235,199,115,0.04)", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD }} />
                {slide.impact}
              </div>
            </div>

            {/* Before → After headline */}
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(28px,4.5vw,56px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 clamp(32px,4vw,56px) 0", maxWidth: 1100, position: "relative" }}>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>{slide.beforeNote}</span>
              {" → "}
              <em style={{ color: GOLD }}>{slide.afterNote}.</em>
            </h3>

            {/* Before / After panels */}
            <div className={`ba-diag-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(16px,2vw,32px)", alignItems: "center", marginBottom: "clamp(40px,5vw,64px)", position: "relative" }}>
              <style>{`@media(max-width:768px){.ba-diag-${i}{grid-template-columns:1fr!important}.ba-arr-${i}{display:none!important}}`}</style>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ padding: "clamp(10px,1.5vw,14px) clamp(16px,2vw,24px)", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>Before</div>
                {slide.beforeImg ? (
                  <img src={slide.beforeImg} alt={`${slide.label} before`} style={{ width: "100%", display: "block" }} />
                ) : (
                  <div style={{ padding: "0 clamp(16px,2vw,24px) clamp(16px,2vw,24px)", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 2, width: "70%" }} />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 2, width: "90%" }} />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 2, width: "60%" }} />
                    <div style={{ height: 28, background: "rgba(255,255,255,0.06)", borderRadius: 2, width: "40%", marginTop: 8 }} />
                  </div>
                )}
              </div>
              <div className={`ba-arr-${i}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                <svg width="60" height="40" viewBox="0 0 60 40">
                  <line x1="6" y1="20" x2="48" y2="20" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 42 12 L 54 20 L 42 28" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ border: `1px solid ${GOLD}30`, background: "rgba(235,199,115,0.02)", borderRadius: 4, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GOLD, opacity: 0.5 }} />
                <div style={{ padding: "clamp(10px,1.5vw,14px) clamp(16px,2vw,24px)", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD }}>After</div>
                {slide.afterImg ? (
                  <img src={slide.afterImg} alt={`${slide.label} after`} style={{ width: "100%", display: "block" }} />
                ) : (
                  <div style={{ padding: "0 clamp(16px,2vw,24px) clamp(16px,2vw,24px)", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ height: 10, background: "rgba(255,255,255,0.9)", borderRadius: 2, width: "75%" }} />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.7)", borderRadius: 2, width: "95%" }} />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.6)", borderRadius: 2, width: "65%" }} />
                    <div style={{ height: 28, background: GOLD, opacity: 0.85, borderRadius: 2, width: "42%", marginTop: 8 }} />
                  </div>
                )}
              </div>
            </div>

            {/* Insight */}
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", paddingTop: "clamp(24px,3vw,40px)", borderTop: `1px solid ${accentColor}20`, position: "relative" }}>
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: accentColor, flexShrink: 0, marginTop: 8 }}>Insight</span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(18px,2.2vw,30px)", lineHeight: 1.4, color: "rgba(255,255,255,0.88)", margin: 0 }}>{slide.insight}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
