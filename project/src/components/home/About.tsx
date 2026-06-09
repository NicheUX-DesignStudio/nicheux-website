// @ts-nocheck
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GOLD, LAVENDER, BLACK } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function About() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        backgroundColor: BLACK,
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
      }}
    >
      {/* Atmospheric background video. very low opacity */}
      <video
        src="/videos/soft-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.08 }}
        aria-hidden="true"
      />
      {/* Scrim so text stays readable */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: BLACK, opacity: 0.55 }}
      />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-[2] grid lg:grid-cols-2 items-center gap-6 lg:gap-20 xl:gap-28"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(1rem, 5vw, 5rem)",
          paddingRight: "clamp(1rem, 5vw, 5rem)",
        }}
      >
        {/* Left. text block */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              display: "block",
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "20px",
            }}
          >
            Our Story
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "clamp(20px, 3vw, 32px)",
            }}
          >
            The{" "}
            <em style={{ color: LAVENDER }}>
              Story Behind
            </em>{" "}
            Our Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.8vw, 1.125rem)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.55)",
              marginBottom: "clamp(32px, 4vw, 52px)",
              maxWidth: "520px",
            }}
          >
            We believe great design solves real problems. At NicheUX, we combine
            user research with beautiful interfaces to create digital experiences
            that drive business growth and user satisfaction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <button
              onClick={() => navigate("/about")}
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                backgroundColor: GOLD,
                color: BLACK,
                border: "none",
                padding: "14px 36px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#d4b463")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = GOLD)
              }
            >
              Discover Our Process
            </button>
          </motion.div>
        </div>

        {/* Right. logo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="flex justify-center lg:justify-end"
        >
          <img
            src="/images/LogoTaglineWhite.png"
            alt="NicheUX. Design Studio"
            loading="lazy"
            style={{
              width: "100%",
              maxWidth: "clamp(200px, 28vw, 420px)",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
