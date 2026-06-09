// SelectedWork. real NicheUX case studies embedded in every service page
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GOLD, BLUE, LAVENDER } from "@/constants/theme";
import { useNavigate } from "react-router-dom";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type WorkPiece = {
  num: string;
  title: string;
  client: string;
  category: string;
  outcome: string;
  image: string;
  accent: string;
  route: string;
  size?: "lg" | "md";
};

// ── DESIGN & STRATEGY ────────────────────────────────────────────────────────
const DESIGN_WORK: WorkPiece[] = [
  {
    num: "01",
    title: "Kishore Aravind",
    client: "K29 Digital Identity · Malaysia",
    category: "UX Design · Portfolio · Dual Identity",
    outcome: "A single site that holds two careers without either diminishing the other",
    image: "/images/kishore-process/kishore-careers-desktop.png",
    accent: LAVENDER,
    route: "/featured-work/kishore-portfolio",
    size: "lg",
  },
  {
    num: "02",
    title: "NandhiniDC",
    client: "Architectural Firm · Tamil Nadu",
    category: "UI/UX · Web Design · Brand",
    outcome: "Architectural storytelling that earned new international commissions",
    image: "/images/nandhinidc/ndc-home-desktop.png",
    accent: BLUE,
    route: "/featured-work/nandhinidc",
    size: "md",
  },
  {
    num: "03",
    title: "Bloom and Brew",
    client: "Coffee and Bakery · Canada",
    category: "UX Research · merchify · Brand Strategy",
    outcome: "Social media brand with no website. We researched, mapped the flows, and launched in three markets.",
    image: "/images/Desktop-home-design.png",
    accent: GOLD,
    route: "/featured-work/bloom-brew",
    size: "md",
  },
];

// ── WEB DEVELOPMENT ──────────────────────────────────────────────────────────
const WEBDEV_WORK: WorkPiece[] = [
  {
    num: "01",
    title: "Bloom and Brew",
    client: "Coffee and Bakery · Canada",
    category: "merchify · Custom Liquid · E-Commerce",
    outcome: "From Instagram-only brand to live in three international markets. Built from zero.",
    image: "/images/Desktop-home-design.png",
    accent: GOLD,
    route: "/featured-work/bloom-brew",
    size: "lg",
  },
  {
    num: "02",
    title: "NandhiniDC",
    client: "Architectural Firm · Tamil Nadu, India",
    category: "React · Custom Web Design",
    outcome: "Full-stack architecture firm site with site videos, floor plans, and WhatsApp-first inquiry",
    image: "/images/nandhinidc/ndc-projects-desktop.png",
    accent: BLUE,
    route: "/featured-work/nandhinidc",
    size: "md",
  },
  {
    num: "03",
    title: "Kishore Aravind",
    client: "K29 Portfolio · Malaysia",
    category: "React · TypeScript · Framer Motion",
    outcome: "Custom-built portfolio that holds two careers equally. Live on Vercel.",
    image: "/images/kishore-process/kishore-impact-desktop.png",
    accent: LAVENDER,
    route: "/featured-work/kishore-portfolio",
    size: "md",
  },
];

// ── PRINT & BRAND ────────────────────────────────────────────────────────────
const PRINT_WORK: WorkPiece[] = [
  {
    num: "01",
    title: "SSJC Tournament",
    client: "Sports Event · Malaysia",
    category: "Print · merchandise · Brand Identity",
    outcome: "Medals, banners, lanyards, t-shirts. One visual language across five mediums.",
    image: "/images/poster-leg1.jpeg",
    accent: GOLD,
    route: "/featured-work/ssjc-tournament",
    size: "lg",
  },
  {
    num: "02",
    title: "Visual Communication",
    client: "Editorial Poster Series",
    category: "Print · Poster Design · Typography",
    outcome: "Editorial precision applied to commercial advertising",
    image: "/images/BenzPoster.webp",
    accent: LAVENDER,
    route: "/featured-work/visual-communication",
    size: "md",
  },
  {
    num: "03",
    title: "Bloom and Brew",
    client: "Coffee and Bakery · Canada",
    category: "Brand Identity · merchify Design",
    outcome: "The packaging alone got us picked up by two boutique stockists in the first month",
    image: "/images/bloombrewhero.webp",
    accent: BLUE,
    route: "/featured-work/bloom-brew",
    size: "md",
  },
];

// ── SOCIAL MEDIA ─────────────────────────────────────────────────────────────
const SOCIAL_WORK: WorkPiece[] = [
  {
    num: "01",
    title: "Sooraj Nikam",
    client: "Career Brand · Ireland",
    category: "LinkedIn · Career Brand · Carousel Design",
    outcome: "A banner and eight-slide carousel that made a recruiter stop before they read a word",
    image: "/images/sooraj/linkedin/banner-green.png",
    accent: BLUE,
    route: "/featured-work/sooraj-linkedin",
    size: "lg",
  },
  {
    num: "02",
    title: "The Generation Conversation",
    client: "Sooraj Nikam · Galway Event",
    category: "LinkedIn Carousel · Event Content",
    outcome: "Eight slides. Built overnight. Live before morning.",
    image: "/images/sooraj/carousel/slide-1.png",
    accent: GOLD,
    route: "/featured-work/sooraj-wanted",
    size: "md",
  },
  {
    num: "03",
    title: "Kingdom of Sweets",
    client: "Sooraj Nikam · Personal Project",
    category: "Brand Identity · Social Design",
    outcome: "A personal memory turned into a banner. Designed from a phone sketch.",
    image: "/images/sooraj/candy/main.jpg",
    accent: LAVENDER,
    route: "/featured-work/sooraj-candy-shop",
    size: "md",
  },
];

// ── MOTION & AI VISUALS ──────────────────────────────────────────────────────
const MOTION_WORK: WorkPiece[] = [
  {
    num: "01",
    title: "AI Series Concept Trailer",
    client: "NicheUX Studio Work",
    category: "AI-Directed Video · Motion",
    outcome: "A dystopian series concept. Consistent world, consistent visual language, generated with direction.",
    image: "/images/AIImageStory.webp",
    accent: GOLD,
    route: "/featured-work/ai-canvas",
    size: "lg",
  },
  {
    num: "02",
    title: "Midas",
    client: "Brand Motion Film",
    category: "Motion Design · Brand Film",
    outcome: "Everything he touches turns to gold. Kinetic typography and colour-graded brand motion.",
    image: "/images/AIHeroWork.webp",
    accent: LAVENDER,
    route: "/featured-work/ai-canvas",
    size: "md",
  },
  {
    num: "03",
    title: "AI Image Story",
    client: "Editorial Direction",
    category: "AI Direction · Visual Narrative",
    outcome: "A visual narrative built with editorial direction, not just prompting",
    image: "/images/AIImageStory.webp",
    accent: BLUE,
    route: "/featured-work/ai-canvas",
    size: "md",
  },
];

// ── ILLUSTRATION ─────────────────────────────────────────────────────────────
const ILLUSTRATION_WORK: WorkPiece[] = [
  {
    num: "01",
    title: "Conceptual Art",
    client: "NicheUX Studio Series",
    category: "Concept Art · Character Design · Illustration",
    outcome: "The Dragon. Anatomical Study. Dynamic Figure. Characters that exist before they speak.",
    image: "/images/Dragon.webp",
    accent: LAVENDER,
    route: "/featured-work/conceptual-art",
    size: "lg",
  },
  {
    num: "02",
    title: "Sequential Art",
    client: "Comics and Narrative Work",
    category: "Comics · Sequential Art · Character",
    outcome: "Comics built to earn saves. Four strips, four different comedic registers.",
    image: "/images/ComicHeroWork.webp",
    accent: GOLD,
    route: "/featured-work/sequential-art",
    size: "md",
  },
  {
    num: "03",
    title: "Visual Communication",
    client: "Poster and Editorial Design",
    category: "Poster Design · Editorial · Typography",
    outcome: "Three posters. Three briefs. Commercial, personal, advocacy.",
    image: "/images/BenzPoster.webp",
    accent: BLUE,
    route: "/featured-work/visual-communication",
    size: "md",
  },
];

const VARIANT_MAP = {
  design: DESIGN_WORK,
  webdev: WEBDEV_WORK,
  print: PRINT_WORK,
  social: SOCIAL_WORK,
  motion: MOTION_WORK,
  illustration: ILLUSTRATION_WORK,
} as const;

function WorkCard({ piece, index }: { piece: WorkPiece; index: number }) {
  const navigate = useNavigate();
  const isLarge = piece.size === "lg";

  return (
    <motion.article
      onClick={() => navigate(piece.route)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        display: "block",
        position: "relative",
        gridColumn: isLarge ? "span 2" : "span 1",
        cursor: "pointer",
      }}
      className="work-card"
      whileHover="hover"
    >
      <style>{`
        .work-card .wc-img { transition: transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94); }
        .work-card:hover .wc-img { transform: scale(1.04); }
        .work-card .wc-arrow { transition: transform 0.3s ease; }
        .work-card:hover .wc-arrow { transform: translate(3px, -3px); }
        @media (max-width: 768px) {
          .selected-work-grid > article { grid-column: span 2 !important; }
        }
      `}</style>

      {/* Image */}
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: isLarge ? "16 / 9" : "4 / 5",
        overflow: "hidden",
        border: `1px solid ${piece.accent}25`,
        marginBottom: 24,
      }}>
        <img
          src={piece.image}
          alt={piece.title}
          className="wc-img"
          loading="lazy"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            filter: "saturate(0.85) contrast(1.05)",
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }} />
        {/* Number */}
        <div style={{
          position: "absolute", top: 24, left: 24,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(48px, 5vw, 72px)",
          lineHeight: 1, color: "#fff", opacity: 0.9,
          textShadow: "0 2px 12px rgba(0,0,0,0.4)",
        }}>
          {piece.num}
        </div>
        {/* Arrow */}
        <div
          className="wc-arrow"
          style={{
            position: "absolute", top: 24, right: 24,
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
          }}
        >
          <ArrowUpRight size={18} />
        </div>
        {/* Client bottom strip */}
        <div style={{
          position: "absolute", bottom: 24, left: 24, right: 24,
        }}>
          <span style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "#fff", opacity: 0.85,
          }}>
            {piece.category}
          </span>
        </div>
      </div>

      {/* Details */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: piece.accent, flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: piece.accent,
          }}>
            {piece.client}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: isLarge ? "clamp(28px, 3.5vw, 44px)" : "clamp(22px, 2.5vw, 32px)",
          lineHeight: 1.15, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 10px 0", maxWidth: 560,
        }}>
          {piece.title}
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(14px, 1.2vw, 16px)",
          lineHeight: 1.6, color: "rgba(255,255,255,0.6)",
          margin: 0, maxWidth: 520,
        }}>
          {piece.outcome}
        </p>
      </div>
    </motion.article>
  );
}

export function SelectedWork({
  variant = "design",
}: {
  variant?: keyof typeof VARIANT_MAP;
}) {
  const work = VARIANT_MAP[variant] ?? DESIGN_WORK;

  return (
    <div
      className="selected-work-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "clamp(40px, 5vw, 80px)",
      }}
    >
      {work.map((piece, i) => (
        <WorkCard key={piece.num} piece={piece} index={i} />
      ))}
    </div>
  );
}
