// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE, PARCHMENT, INK, INK_SOFT, INK_MUTED } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const FEATURED = {
  index: "01",
  title: "SSJC Tournament",
  category: "Print & Brand Design · Malaysia",
  outcome: "GAME ON. Two visual identities, one gaming universe.",
  pullQuote: "Retro Purple meets Cyber Blue. A full tournament identity spanning medals, t-shirts, lanyards and event posters for Malaysia's premier junior squash circuit.",
  image: "/images/ssjc/tshirt-leg1.jpeg",
  accent: GOLD,
  route: "/featured-work/ssjc-tournament",
};

const GRID_PROJECTS = [
  {
    index: "02",
    title: "NandhiniDC",
    category: "Web Design & Development · India",
    outcome: "Architectural storytelling that earned new international commissions.",
    image: "/images/nandhinidc/stone-facade-1.webp",
    accent: LAVENDER,
    route: "/featured-work/nandhinidc",
  },
  {
    index: "03",
    title: "AI Canvas",
    category: "Generative Art · Motion · Studio",
    outcome: "Where human imagination meets generative direction.",
    image: "/images/AIHeroWork.webp",
    accent: LAVENDER,
    route: "/featured-work/ai-canvas",
  },
  {
    index: "08",
    title: "Midas Utara Engineering",
    category: "Motion Design · AI Visuals · Malaysia",
    outcome: "Three languages. One engineering standard. Industrial storytelling for a biogas plant.",
    image: "/images/midas-engineering-cover.jpg",
    accent: GOLD,
    route: "/featured-work/midas",
  },
] as const;

export default function Portfolio() {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const featuredRef = useRef<HTMLElement>(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: "-60px" });

  return (
    <section
      id="portfolio"
      style={{
        backgroundColor: PARCHMENT,
        position: "relative",
        paddingTop: "clamp(80px, 10vw, 130px)",
        paddingBottom: "clamp(80px, 10vw, 130px)",
        overflow: "hidden",
      }}
    >
      {/* Paper vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(26,26,26,0.05) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative" }}>

        {/* Editorial masthead */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(20px, 2.5vw, 32px)",
            borderBottom: `1px solid ${INK}25`,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
            >
              <div style={{ width: 28, height: 1, background: INK }} />
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: INK,
              }}>
                Act I. Selected Performances
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(40px, 5.5vw, 72px)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: INK,
                margin: 0,
              }}
            >
              Stories we've{" "}
              <em style={{ color: LAVENDER }}>told.</em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.3vw, 16px)",
              color: INK_MUTED,
            }}>
              11 productions. Clients across five countries.
            </span>
            <button
              onClick={() => navigate("/featured-work")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = LAVENDER;
                e.currentTarget.style.borderBottomColor = LAVENDER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = INK;
                e.currentTarget.style.borderBottomColor = INK;
              }}
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: INK,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 0 4px 0",
                borderBottom: `1px solid ${INK}`,
                transition: "color 0.25s ease, border-color 0.25s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
              }}
            >
              View All <ArrowUpRight size={13} />
            </button>
          </motion.div>
        </div>

        {/* ── FEATURED PRODUCTION ── */}
        <motion.article
          ref={featuredRef}
          onClick={() => navigate(FEATURED.route)}
          initial={{ opacity: 0, y: 32 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(380px, 52vw, 640px)",
            overflow: "hidden",
            cursor: "pointer",
            border: `1px solid ${INK}18`,
            marginBottom: "clamp(40px, 5vw, 64px)",
          }}
          className="featured-card"
        >
          <style>{`
            .featured-card:hover .featured-img { transform: scale(1.04); }
            .featured-card:hover .featured-cta { opacity: 1; transform: translateX(0); }
          `}</style>

          {/* Background image */}
          <img
            src={FEATURED.image}
            alt={FEATURED.title}
            className="featured-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "sepia(0.08) contrast(0.96)",
              transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          />

          {/* Gradient overlay. heavy bottom, light top */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.45) 45%, rgba(10,8,6,0.12) 100%)",
            }}
          />

          {/* Top-left badge */}
          <div style={{
            position: "absolute",
            top: "clamp(20px, 2.5vw, 32px)",
            left: "clamp(24px, 3vw, 40px)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: FEATURED.accent,
              padding: "5px 12px",
              border: `1px solid ${FEATURED.accent}50`,
              background: `${FEATURED.accent}10`,
            }}>
              Featured Production
            </span>
          </div>

          {/* Bottom content */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(28px, 4vw, 56px)",
          }}>
            {/* Outcome */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "clamp(12px, 1.5vw, 20px)",
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: FEATURED.accent,
                boxShadow: `0 0 8px ${FEATURED.accent}`,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: FEATURED.accent,
              }}>
                {FEATURED.outcome}
              </span>
            </div>

            {/* Index + title */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(12px, 2vw, 24px)", marginBottom: "clamp(10px, 1.5vw, 16px)", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(16px, 2vw, 22px)",
                color: `${FEATURED.accent}80`,
                letterSpacing: "0.05em",
              }}>
                № {FEATURED.index}
              </span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(36px, 5.5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                margin: 0,
              }}>
                {FEATURED.title}
              </h3>
            </div>

            {/* Category + CTA row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              paddingTop: "clamp(14px, 2vw, 20px)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}>
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}>
                {FEATURED.category}
              </span>
              <span
                className="featured-cta"
                style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: 0.7,
                  transform: "translateX(-8px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                Read the production
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </motion.article>

        {/* ── 3-COLUMN GRID ── */}
        <div
          id="portfolio-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 40px)" }}
        >
          <style>{`
            @media (max-width: 900px) { #portfolio-grid { grid-template-columns: 1fr !important; } }
            @media (min-width: 540px) and (max-width: 900px) { #portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            .grid-card:hover .grid-img { transform: scale(1.05); }
          `}</style>

          {GRID_PROJECTS.map((project, i) => (
            <GridCard
              key={project.index}
              project={project}
              index={i}
              onClick={() => navigate(project.route)}
            />
          ))}
        </div>
        <style>{`@media(max-width:767px){.portfolio-swipe-hint{display:flex!important}}`}</style>
        <p className="portfolio-swipe-hint" style={{ display: "none", alignItems: "center", gap: 6, marginTop: 10, fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: `${INK_MUTED}`, userSelect: "none" }}>
          Swipe to explore ›
        </p>

        {/* ── VIEW ALL CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            marginTop: "clamp(48px, 6vw, 72px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div style={{ width: 44, height: 1, background: `${INK}25` }} />
          <button
            onClick={() => navigate("/featured-work")}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = LAVENDER;
              e.currentTarget.style.borderColor = LAVENDER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = INK;
              e.currentTarget.style.borderColor = INK;
            }}
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: INK,
              background: "none",
              cursor: "pointer",
              padding: "12px 28px",
              border: `1px solid ${INK}60`,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "color 0.25s ease, border-color 0.25s ease",
            }}
          >
            View All 11 Productions
            <ArrowUpRight size={13} />
          </button>
          <div style={{ width: 44, height: 1, background: `${INK}25` }} />
        </motion.div>
      </div>
    </section>
  );
}

function GridCard({
  project,
  index,
  onClick,
}: {
  project: (typeof GRID_PROJECTS)[number];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid-card"
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${INK}18`,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="grid-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "sepia(0.06) contrast(0.97)",
            transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        {/* Index plate */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: PARCHMENT,
          borderRight: `1px solid ${INK}25`,
          borderBottom: `1px solid ${INK}25`,
          padding: "8px 14px",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 13,
          color: INK,
          letterSpacing: "0.05em",
        }}>
          № {project.index}
        </div>
      </div>

      {/* Text block */}
      <div style={{
        padding: "clamp(20px, 2.5vw, 32px)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        flex: 1,
        background: PARCHMENT,
        borderTop: `1px solid ${INK}12`,
      }}>
        {/* Outcome */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: project.accent,
            flexShrink: 0,
            marginTop: 4,
          }} />
          <span style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: project.accent,
            lineHeight: 1.5,
          }}>
            {project.outcome}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "clamp(22px, 2.4vw, 32px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: INK,
          margin: 0,
        }}>
          {project.title}
        </h3>

        {/* Category + CTA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
          borderTop: `1px solid ${INK}12`,
          marginTop: "auto",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <span style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK_MUTED,
          }}>
            {project.category}
          </span>
          <span style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: hovered ? project.accent : INK_SOFT,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.25s ease",
          }}>
            Read <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}