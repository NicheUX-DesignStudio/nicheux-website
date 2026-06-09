"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const PIECES = [
  {
    id: "bloom",
    src: "/images/bloombrewhero.webp",
    alt: "Bloom & Brew. Custom Shopify store launched across three markets",
    category: "Web Development",
    label: "Bloom & Brew",
    accent: GOLD,
    route: "/featured-work/bloom-brew",
  },
  {
    id: "poster",
    src: "/images/BenzPoster.webp",
    alt: "Poster design. Visual Communication series",
    category: "Print & Brand",
    label: "Visual Communication",
    accent: LAVENDER,
    route: "/featured-work/visual-communication",
  },
  {
    id: "ai",
    src: "/images/AIHeroWork.webp",
    alt: "AI Visuals. NicheUX AI Canvas series",
    category: "Motion & AI",
    label: "AI Canvas",
    accent: BLUE,
    route: "/featured-work/ai-canvas",
  },
  {
    id: "conceptual",
    src: "/images/ConceptualArtHeroWork.webp",
    alt: "Conceptual Art. Anatomical illustration series",
    category: "Conceptual Art",
    label: "Anatomical Series",
    accent: LAVENDER,
    route: "/featured-work/conceptual-art",
  },
  {
    id: "web",
    src: "/images/Desktop-home-design.webp",
    alt: "UI/UX Design. Custom web interface design",
    category: "UI/UX Strategy",
    label: "Web Interfaces",
    accent: GOLD,
    route: "/featured-work",
  },
  {
    id: "midas",
    src: "/images/midas-cover.jpg",
    alt: "Midas Utara Engineering. Multilingual video production",
    category: "Motion Design",
    label: "Midas Engineering",
    accent: LAVENDER,
    route: "/featured-work/midas",
  },
  {
    id: "illustration",
    src: "/images/Dragon.webp",
    alt: "Dragon illustration. Character design",
    category: "Illustration",
    label: "Character Design",
    accent: GOLD,
    route: "/featured-work/sequential-art",
  },
] as const;

export default function WorkMosaic() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="work-mosaic"
      aria-label="Portfolio at a glance"
      style={{
        backgroundColor: "#0A0A0A",
        position: "relative",
        borderTop: `1px solid ${GOLD}14`,
        borderBottom: `1px solid ${GOLD}14`,
      }}
    >
      <style>{`
        #wmg {
          display: grid;
          grid-template-areas:
            "bloom bloom poster ai"
            "conceptual web midas illustration";
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 38vh 26vh;
          gap: 1px;
          background-color: rgba(233,199,114,0.1);
        }
        #wmg-bloom      { grid-area: bloom; }
        #wmg-poster     { grid-area: poster; }
        #wmg-ai         { grid-area: ai; }
        #wmg-conceptual { grid-area: conceptual; }
        #wmg-web        { grid-area: web; }
        #wmg-midas      { grid-area: midas; }
        #wmg-illustration { grid-area: illustration; }

        @media (max-width: 900px) {
          #wmg {
            grid-template-areas: none;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, 28vw);
            gap: 1px;
          }
          #wmg > div { grid-area: auto !important; }
          #wmg > div:nth-child(n+5) { display: none; }
        }
        @media (max-width: 540px) {
          #wmg {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3, 56vw);
          }
          #wmg > div:nth-child(n+4) { display: none; }
        }

        .wmg-cell img {
          transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94),
                      filter 0.55s ease;
        }
        .wmg-cell:hover img {
          transform: scale(1.06);
          filter: brightness(0.65) contrast(0.98);
        }
        .wmg-label {
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
        }
        .wmg-cell:hover .wmg-label {
          opacity: 1;
          transform: translateY(0);
        }
        .wmg-arrow {
          transition: opacity 0.25s ease, transform 0.25s ease;
          opacity: 0;
          transform: translate(-4px, 4px);
        }
        .wmg-cell:hover .wmg-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }
        .wmg-overlay {
          transition: opacity 0.4s ease;
          opacity: 0;
        }
        .wmg-cell:hover .wmg-overlay {
          opacity: 1;
        }
      `}</style>

      <div id="wmg">
        {PIECES.map((piece) => (
          <div
            key={piece.id}
            id={`wmg-${piece.id}`}
            className="wmg-cell"
            onClick={() => navigate(piece.route)}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              backgroundColor: "#0D0D0D",
            }}
          >
            <img
              src={piece.src}
              alt={piece.alt}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.82) contrast(0.96)",
              }}
            />

            {/* Gradient overlay on hover */}
            <div
              className="wmg-overlay"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(8,6,4,0.82) 0%, rgba(8,6,4,0.18) 55%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Category + label */}
            <div
              className="wmg-label"
              style={{
                position: "absolute",
                bottom: "clamp(14px, 2vw, 22px)",
                left: "clamp(14px, 2vw, 22px)",
                pointerEvents: "none",
              }}
            >
              <div style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: piece.accent,
                marginBottom: 4,
              }}>
                {piece.category}
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.4vw, 17px)",
                color: "#ffffff",
                lineHeight: 1.1,
              }}>
                {piece.label}
              </div>
            </div>

            {/* Arrow top-right */}
            <div
              className="wmg-arrow"
              aria-hidden
              style={{
                position: "absolute",
                top: "clamp(12px, 1.8vw, 18px)",
                right: "clamp(12px, 1.8vw, 18px)",
                color: piece.accent,
                pointerEvents: "none",
              }}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "clamp(20px, 2.8vw, 32px)",
        }}
      >
        <div style={{ width: 36, height: 1, background: `${GOLD}22` }} />
        <button
          onClick={() => navigate("/featured-work")}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = GOLD;
            e.currentTarget.style.borderColor = `${GOLD}60`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.35)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            background: "none",
            cursor: "pointer",
            padding: "10px 24px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            transition: "color 0.25s ease, border-color 0.25s ease",
          }}
        >
          View all 11 productions
          <ArrowUpRight size={11} />
        </button>
        <div style={{ width: 36, height: 1, background: `${GOLD}22` }} />
      </motion.div>
    </section>
  );
}
