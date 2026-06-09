// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GOLD, LAVENDER } from "@/constants/theme";

export default function CTASection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [btn1Hovered, setBtn1Hovered] = useState(false);

  const fade = (y: number, delay: number, duration: number) => ({
    initial: { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration, delay, ease: "easeOut" },
  });

  return (
    <section
      id="cta-section"
      ref={ref}
      style={{
        backgroundColor: GOLD,
        padding: "140px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          #cta-section { padding: 100px 28px !important; }
        }
      `}</style>

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-100px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-60px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.04)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.span
          {...fade(12, 0, 0.6)}
          style={{
            display: "block",
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(18,18,18,0.4)",
          }}
        >
          Ready when you are
        </motion.span>

        {/* Headline */}
        <motion.h2
          {...fade(32, 0.1, 1)}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#121212",
            maxWidth: "680px",
            marginTop: "20px",
            marginBottom: 0,
          }}
        >
          Let's build something
          <br />
          extraordinary
          <br />
          together.
        </motion.h2>

        {/* Subline */}
        <motion.p
          {...fade(16, 0.25, 0.8)}
          style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "rgba(18,18,18,0.5)",
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          No commitment. Just a conversation about your goals.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fade(14, 0.4, 0.7)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px",
            marginTop: "52px",
          }}
        >
          {/* Primary button */}
          <button
            onMouseEnter={() => setBtn1Hovered(true)}
            onMouseLeave={() => setBtn1Hovered(false)}
            onClick={() => navigate("/contact")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: btn1Hovered ? LAVENDER : "#121212",
              color: btn1Hovered ? "#121212" : GOLD,
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "16px 36px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
          >
            Book a free discovery call
            <ArrowUpRight size={15} />
          </button>

          {/* Email link */}
          <a
            href="mailto:hellonicheux@gmail.com"
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "rgba(18,18,18,0.5)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            hellonicheux@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
