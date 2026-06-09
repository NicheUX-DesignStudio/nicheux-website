// @ts-nocheck
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GOLD, LAVENDER } from "@/constants/theme";

export default function TestimonialStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonial-strip"
      ref={ref}
      style={{
        backgroundColor: "#121212",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "120px 64px",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          #testimonial-strip { padding: 80px 28px !important; }
        }
      `}</style>

      <div style={{ maxWidth: "900px" }}>
        {/* Opening quote mark */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "block",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "96px",
            color: LAVENDER,
            opacity: inView ? 0.3 : 0,
            lineHeight: 1,
            marginBottom: "20px",
            userSelect: "none",
          }}
        >
          "
        </motion.span>

        {/* Quote text */}
        <motion.blockquote
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(24px, 3.5vw, 42px)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.88)",
            margin: 0,
            padding: 0,
            border: "none",
          }}
        >
          Every detail was thoughtful and strategic. They delivered not just a
          design. but a complete experience that{" "}
          <span style={{ color: GOLD }}>
            transformed how our customers see us.
          </span>
        </motion.blockquote>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "48px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: LAVENDER,
              color: "#121212",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              flexShrink: 0,
              letterSpacing: "0.02em",
            }}
          >
            JM
          </div>

          {/* Name + role */}
          <div>
            <div
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#ffffff",
              }}
            >
              Jacob Mercer
            </div>
            <div
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.32)",
                marginTop: "2px",
              }}
            >
              Founder, Bloom & Brew Coffee Co.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
