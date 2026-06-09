"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GOLD, BLUE, LAVENDER } from "@/constants/theme";

const BLACK = "#0A0A0A";
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const acts = [
  {
    roman: "I",
    num: "01",
    title: "The Discovery",
    desc: "A 30-minute conversation about your vision and the challenges you want to solve. No pitch. No pressure. Just listening.",
    color: GOLD,
    detail: "Understand",
  },
  {
    roman: "II",
    num: "02",
    title: "The Blueprint",
    desc: "We craft a tailored plan with clear scope, honest timeline, and transparent investment. You know exactly what you are paying for before a single pixel moves.",
    color: LAVENDER,
    detail: "Plan",
  },
  {
    roman: "III",
    num: "03",
    title: "The Production",
    desc: "We hand-pick your specialist team and begin creating. You stay involved throughout. The work goes live when it is genuinely ready.",
    color: BLUE,
    detail: "Create",
  },
];

const services = [
  { name: "Strategy & Design", color: GOLD },
  { name: "Web Development & E-Commerce", color: BLUE },
  { name: "Motion Design & AI Visuals", color: LAVENDER },
  { name: "Print & Brand Design", color: GOLD },
  { name: "Social Media Marketing", color: BLUE },
  { name: "Illustration & Character Design", color: LAVENDER },
];

export default function Steps() {
  const navigate = useNavigate();

  return (
    <section
      style={{ background: BLACK, overflow: "hidden", position: "relative" }}
    >
      {/* Subtle centre glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "70vw",
          height: "50vw",
          background: LAVENDER,
          filter: "blur(160px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* ── Section header ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding:
            "clamp(96px,11vw,152px) clamp(24px,6vw,96px) 0",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: "clamp(28px,3.5vw,48px)",
            }}
          >
            <div
              style={{
                flex: 1,
                maxWidth: 48,
                height: 1,
                background: "rgba(255,255,255,0.12)",
              }}
            />
            <span
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              How It Works
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(48px,8vw,128px)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              color: "#fff",
              margin: 0,
            }}
          >
            Begin
            <br />
            <em style={{ color: LAVENDER, fontStyle: "italic" }}>
              Your Production
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: "clamp(15px,1.4vw,18px)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.35)",
              maxWidth: 480,
              margin: "clamp(24px,3vw,40px) 0 0 0",
            }}
          >
            Three acts. From first conversation to final delivery.
          </p>
        </motion.div>
      </div>

      {/* ── Three Acts ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "clamp(72px,8vw,112px) auto 0",
          position: "relative",
        }}
      >
        {/* Top rule */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.07)",
            margin: "0 clamp(24px,6vw,96px)",
          }}
        />

        {acts.map((act, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <motion.div
              key={act.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: idx * 0.1, ease: EASE }}
              viewport={{ once: true }}
              style={{
                position: "relative",
                padding: "0 clamp(24px,6vw,96px)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isEven
                    ? "minmax(0,2fr) minmax(0,1fr) minmax(0,2.5fr) clamp(80px,10vw,160px)"
                    : "clamp(80px,10vw,160px) minmax(0,2.5fr) minmax(0,1fr) minmax(0,2fr)",
                  gap: "clamp(16px,2.5vw,40px)",
                  alignItems: "center",
                  padding: "clamp(32px,4.5vw,64px) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
                className="act-row"
              >
                <style>{`
                  @media(max-width:860px){
                    .act-row{
                      grid-template-columns:1fr!important;
                      grid-template-rows:auto;
                    }
                    .act-numeral-bg{ display:none; }
                  }
                `}</style>

                {!isEven && (
                  /* Roman numeral background watermark */
                  <div
                    className="act-numeral-bg"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(80px,12vw,160px)",
                      lineHeight: 1,
                      color: `${act.color}10`,
                      letterSpacing: "-0.06em",
                      userSelect: "none",
                      textAlign: "center",
                    }}
                  >
                    {act.roman}
                  </div>
                )}

                {/* Step label + title block */}
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      fontSize: "clamp(28px,3.5vw,52px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {act.title}
                  </h3>
                </div>

                {/* Step number */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(40px,5vw,72px)",
                    color: `${act.color}28`,
                    lineHeight: 1,
                    textAlign: isEven ? "right" : "left",
                  }}
                >
                  {act.num}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontSize: "clamp(14px,1.3vw,16px)",
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                  }}
                >
                  {act.desc}
                </p>

                {isEven && (
                  /* Roman numeral background watermark — right side for even rows */
                  <div
                    className="act-numeral-bg"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(80px,12vw,160px)",
                      lineHeight: 1,
                      color: `${act.color}10`,
                      letterSpacing: "-0.06em",
                      userSelect: "none",
                      textAlign: "center",
                    }}
                  >
                    {act.roman}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          padding:
            "clamp(56px,7vw,96px) clamp(24px,6vw,96px) clamp(72px,9vw,112px)",
          position: "relative",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(20px,2vw,28px)",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "clamp(24px,3vw,40px)",
          }}
        >
          "Every story deserves a stage."
        </p>
        <motion.button
          onClick={() => navigate("/contact")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            background: GOLD,
            color: BLACK,
            border: "none",
            padding: "clamp(14px,1.8vw,18px) clamp(32px,4vw,52px)",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = LAVENDER;
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = GOLD;
            el.style.color = BLACK;
          }}
        >
          Begin Your Production <ArrowRight size={12} />
        </motion.button>
      </motion.div>

      {/* ── Services marquee ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fade edges */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "clamp(48px,6vw,96px)",
            background: `linear-gradient(to right, ${BLACK}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "clamp(48px,6vw,96px)",
            background: `linear-gradient(to left, ${BLACK}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 22, ease: "linear" },
          }}
          style={{
            display: "flex",
            gap: "clamp(32px,4vw,56px)",
            padding: "clamp(18px,2.5vw,28px) 0",
          }}
        >
          {[...services, ...services].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(20px,2.5vw,36px)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: "clamp(11px,1.1vw,14px)",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: s.color,
                  opacity: 0.65,
                }}
              >
                {s.name}
              </span>
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: s.color,
                  opacity: 0.3,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
