// Behind The Scenes - process imagery section that humanizes the work
// Adds visual storytelling through real-life process imagery
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLD, LAVENDER, BLUE } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type ProcessFrame = {
  caption: string;
  detail: string;
  image: string;
  size?: "wide" | "tall" | "square";
};

const DESIGN_PROCESS: ProcessFrame[] = [
  {
    caption: "Sketches before screens",
    detail: "Every flow starts on paper. Cheap to throw away, fast to iterate.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=1200&fit=crop&q=80",
    size: "tall",
  },
  {
    caption: "Wireframes that argue",
    detail: "We sketch in low-fidelity until the structure can defend itself.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop&q=80",
    size: "wide",
  },
  {
    caption: "Type as decision",
    detail: "Hierarchy isn't decoration. It's where attention goes.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
  {
    caption: "The handoff that holds up",
    detail: "Specs developers actually want to read. Tokens. States. Edge cases.",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
];

const WEBDEV_PROCESS: ProcessFrame[] = [
  {
    caption: "Architecture first",
    detail: "Folder structures, type contracts, data shapes. Decided before the first commit.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=1200&fit=crop&q=80",
    size: "tall",
  },
  {
    caption: "Code, hand-written",
    detail: "Every component reasoned. Every API typed. No copy-paste from Stack Overflow.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop&q=80",
    size: "wide",
  },
  {
    caption: "Performance is the test",
    detail: "Lighthouse, real device throttling, bundle inspection. Every PR.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
  {
    caption: "Ship without scars",
    detail: "Staging mirrors prod. Smoke tests on launch. We don't celebrate yet.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
];

const PRINT_PROCESS: ProcessFrame[] = [
  {
    caption: "The brief before the mark",
    detail: "Position, feeling, audience. Everything that matters is decided before a single letterform is drawn.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&h=1200&fit=crop&q=80",
    size: "tall",
  },
  {
    caption: "Construction grids and colour systems",
    detail: "Logo geometry, spacing rules, colour values in every mode. The language before the application.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&h=800&fit=crop&q=80",
    size: "wide",
  },
  {
    caption: "Substrate testing",
    detail: "CMYK on uncoated stock reads differently than RGB on screen. We test before we send to press.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
  {
    caption: "The production file pack",
    detail: "AI, PDF, PNG, SVG. CMYK and RGB. Bleed and crop marks. Every format, ready to use immediately.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
];

const SOCIAL_PROCESS: ProcessFrame[] = [
  {
    caption: "The content brief",
    detail: "Audience, pillars, voice, platform rules. Strategy is decided before a single asset is made.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&h=1200&fit=crop&q=80",
    size: "tall",
  },
  {
    caption: "The visual direction board",
    detail: "Colour, typography, composition rules, image style. The brief your feed will follow.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop&q=80",
    size: "wide",
  },
  {
    caption: "The draft round",
    detail: "First pass, reviewed against the brief. Not against 'does this look good' but 'does this work'.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
  {
    caption: "Scheduled and performing",
    detail: "Published at optimal times. Reviewed monthly. What worked, what did not, and why.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
];

const MOTION_PROCESS: ProcessFrame[] = [
  {
    caption: "The storyboard",
    detail: "Every scene, every transition, every beat. Decided before After Effects opens.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&h=1200&fit=crop&q=80",
    size: "tall",
  },
  {
    caption: "The timeline",
    detail: "Frame-by-frame. Easing curves. Layer organisation. The craft that makes motion feel inevitable.",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e2ab?w=1200&h=800&fit=crop&q=80",
    size: "wide",
  },
  {
    caption: "The colour grade",
    detail: "Palette tied to brand. Tone calibrated for the platform. Consistent across every clip.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
  {
    caption: "The export pack",
    detail: "MP4, MOV, GIF, Lottie. 9:16, 1:1, 16:9. Every format, every platform, ready to post.",
    image: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
];

const ILLUSTRATION_PROCESS: ProcessFrame[] = [
  {
    caption: "The rough sketch",
    detail: "Loose, exploratory, cheap to throw away. Silhouette and weight before any detail.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&h=1200&fit=crop&q=80",
    size: "tall",
  },
  {
    caption: "The structure pass",
    detail: "Anatomy, proportion, line of action. The reason the finished piece holds up at any scale.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&h=800&fit=crop&q=80",
    size: "wide",
  },
  {
    caption: "The render stage",
    detail: "Linework, flat colour, shading, texture. Every layer named, every stroke deliberate.",
    image: "https://images.unsplash.com/photo-1558618047-f4e80c0dc3d4?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
  {
    caption: "The delivery files",
    detail: "High-res PNG, layered PSD, vector AI. Sized for print, web, and screen. Nothing left out.",
    image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=900&h=900&fit=crop&q=80",
    size: "square",
  },
];

function ProcessFrameCard({ frame, index, accent }: { frame: ProcessFrame; index: number; accent: string }) {
  const aspectRatio =
    frame.size === "wide" ? "16 / 10" :
    frame.size === "tall" ? "3 / 4" :
    "1 / 1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        gridColumn: frame.size === "wide" ? "span 2" : "span 1",
      }}
      whileHover="hover"
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio,
          overflow: "hidden",
          borderRadius: 4,
          border: `1px solid ${accent}20`,
          marginBottom: 18,
        }}
      >
        <motion.img
          src={frame.image}
          alt={frame.caption}
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.7) contrast(1.05) brightness(0.92)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.5) 100%)`,
          pointerEvents: "none",
        }} />
        <motion.div
          variants={{ hover: { opacity: 0.18 } }}
          initial={{ opacity: 0.08 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: accent,
            mixBlendMode: "color",
            pointerEvents: "none",
          }}
        />
        {/* Frame index in corner */}
        <div style={{
          position: "absolute",
          top: 16,
          left: 16,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 14,
          color: "#fff",
          opacity: 0.7,
          letterSpacing: "0.04em",
        }}>
          fig. {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>

      <div style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}>
        <span style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: accent,
          marginTop: 9,
          flexShrink: 0,
        }} />
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(16px, 1.4vw, 20px)",
            lineHeight: 1.3,
            color: "#fff",
            marginBottom: 6,
          }}>
            {frame.caption}
          </div>
          <p style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.1vw, 14px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.5)",
            margin: 0,
          }}>
            {frame.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const PROCESS_MAP: Record<string, ProcessFrame[]> = {
  design: DESIGN_PROCESS,
  webdev: WEBDEV_PROCESS,
  print: PRINT_PROCESS,
  social: SOCIAL_PROCESS,
  motion: MOTION_PROCESS,
  illustration: ILLUSTRATION_PROCESS,
};

const ACCENT_MAP: Record<string, string> = {
  design: LAVENDER, webdev: BLUE, print: "#E9C672",
  social: "#E9C672", motion: LAVENDER, illustration: LAVENDER,
};

const HEADLINE_MAP: Record<string, string> = {
  design: "workmerch.", webdev: "build room.", print: "print room.",
  social: "content studio.", motion: "edit suite.", illustration: "drawing board.",
};

const DESC_MAP: Record<string, string> = {
  design: "What happens between the kickoff and the launch. The mess that makes the polish.",
  webdev: "What happens between the brief and the deploy. The work behind the work.",
  print: "What happens between the brief and the finished brand. The craft that makes it last.",
  social: "What happens between the strategy session and the published post. The decisions that matter.",
  motion: "What happens between the storyboard and the final export. The frames that earn their place.",
  illustration: "What happens between the brief and the final render. The marks that build the world.",
};

export function BehindTheScenes({ variant = "design" }: { variant?: "design" | "webdev" | "print" | "social" | "motion" | "illustration" }) {
  const frames = PROCESS_MAP[variant] ?? DESIGN_PROCESS;
  const accent = ACCENT_MAP[variant] ?? LAVENDER;
  const headline = <><em style={{ color: accent }}>Inside the </em>{HEADLINE_MAP[variant] ?? "workmerch."}</>;
  const description = DESC_MAP[variant] ?? DESC_MAP.design;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true, amount: 0.1 }}
        style={{
          marginBottom: "clamp(56px, 7vw, 96px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
          }}>
            <div style={{ width: 32, height: 1, background: accent, opacity: 0.6 }} />
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: "clamp(10px, 1vw, 12px)",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: accent,
            }}>
              Behind the work
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "0 0 16px 0",
          }}>
            {headline}
          </h2>
          <p style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
            maxWidth: 640,
          }}>
            {description}
          </p>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(13px, 1.1vw, 15px)",
          color: "rgba(255,255,255,0.4)",
          textAlign: "right",
          maxWidth: 240,
        }}>
          Process · {frames.length} frames<br/>
          From the cutting room.
        </div>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 3vw, 40px)",
        }}
      >
        <style>{`
          @media (max-width: 900px) {
            .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .process-grid > div { grid-column: span 1 !important; }
          }
          @media (max-width: 600px) {
            .process-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        <div className="process-grid" style={{ display: "contents" }}>
          {frames.map((frame, i) => (
            <ProcessFrameCard key={frame.caption} frame={frame} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  );
}
