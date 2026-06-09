// ThreadedQuote. real NicheUX client testimonials threaded mid-page
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLD, LAVENDER, BLUE } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type QuoteConfig = {
  quote: string;
  author: string;
  role: string;
  context: string;
  accent: string;
};

const QUOTES: Record<string, QuoteConfig> = {
  design: {
    quote: "Honestly one of the best companies to work with! They have helped me so much with the brand development and my website. Thank you so much NicheUX!",
    author: "Aishwarya",
    role: "Founder · Bloom and Brew Coffee Company",
    context: "On brand identity and web design",
    accent: LAVENDER,
  },
  webdev: {
    quote: "Design and drawing submission on-time, efficient. Good teamwork and coordination.",
    author: "Client",
    role: "NandhiniDC · Tamil Nadu, India",
    context: "On the NandhiniDC web design project",
    accent: BLUE,
  },
  print: {
    quote: "Honestly one of the best companies to work with! They have helped me so much with the brand development and my website. Thank you so much NicheUX!",
    author: "Aishwarya",
    role: "Founder · Bloom and Brew Coffee Company",
    context: "On brand identity and print design",
    accent: GOLD,
  },
  social: {
    quote: "Made me a simple flyer for my tutoring business. Super affordable, turned around fast, and it genuinely got me my first paying clients. Worth every penny.",
    author: "Samyuktha",
    role: "Tutor and Entrepreneur",
    context: "On social media content and design",
    accent: GOLD,
  },
  motion: {
    quote: "Honestly one of the best companies to work with! They have helped me so much with the brand development and my website. Thank you so much NicheUX!",
    author: "Aishwarya",
    role: "Founder · Bloom and Brew Coffee Company",
    context: "On brand design and visual identity",
    accent: LAVENDER,
  },
  illustration: {
    quote: "Design and drawing submission on-time, efficient. Good teamwork and coordination.",
    author: "Client",
    role: "NandhiniDC · Tamil Nadu, India",
    context: "On the architectural design project",
    accent: LAVENDER,
  },
};

export function ThreadedQuote({
  variant = "design",
}: {
  variant?: keyof typeof QUOTES;
}) {
  const config = QUOTES[variant] ?? QUOTES.design;

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Ghost quote mark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "clamp(-40px, -3vw, 0px)",
          transform: "translateY(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(280px, 36vw, 540px)",
          lineHeight: 0.85,
          color: `${config.accent}08`,
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      <div style={{
        position: "relative",
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 clamp(24px, 6vw, 80px)",
      }}>
        <div
          className="tq-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr)",
            gap: "clamp(24px, 4vw, 64px)",
            alignItems: "start",
            maxWidth: 1100,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <style>{`
            @media (max-width: 768px) { .tq-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          {/* Left column. context */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minWidth: 140,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 24, height: 1, background: config.accent }} />
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: config.accent,
              }}>
                In their words
              </span>
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.5,
            }}>
              {config.context}
            </div>
          </motion.div>

          {/* Right column. quote */}
          <div>
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(22px, 3.4vw, 48px)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "#fff",
                margin: 0,
              }}
            >
              "{config.quote}"
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{
                marginTop: "clamp(28px, 3.5vw, 44px)",
                paddingTop: 22,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{
                width: 8, height: 8,
                borderRadius: "50%",
                background: GOLD,
              }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.3vw, 17px)",
                color: "#fff",
              }}>
                {config.author}
              </span>
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}>
                {config.role}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
