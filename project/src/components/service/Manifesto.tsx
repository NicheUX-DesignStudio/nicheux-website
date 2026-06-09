// Manifesto - editorial spread moment that breaks dark sections with light contrast
// Acts as the studio's "voice" - a magazine pull-quote moment
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLD, LAVENDER, BLUE, INK, PARCHMENT } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type ManifestoConfig = {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  signature: string;
  signatureRole: string;
  accent: string;
};

const DESIGN_MANIFESTO: ManifestoConfig = {
  eyebrow: "What we believe",
  title: (
    <>
      Beautiful design that doesn't&nbsp;
      <em style={{ color: "#8E6BAA" }}>
        convert
      </em>
      &nbsp;is just decoration.
    </>
  ),
  body: "We've watched too many studios chase aesthetic without intent. Pretty grids. Gradient garbage. Animations that announce themselves. Beautiful, sure. but not honest, and not useful. We design the other way around: outcomes first, craft to serve them. Every pixel earns its place. Every interaction has a job. The work is beautiful because it had to be. not because it tried to be.",
  signature: "The studio",
  signatureRole: "On the discipline of design",
  accent: LAVENDER,
};

const WEBDEV_MANIFESTO: ManifestoConfig = {
  eyebrow: "What we believe",
  title: (
    <>
      The web is being&nbsp;
      <em style={{ color: "#5A8AAB" }}>
        assembled
      </em>
      &nbsp;when it should be built.
    </>
  ),
  body: "Drag-and-drop builders made everyone a developer and made every site forgettable. We don't assemble. We write. Hand-coded React. Semantic HTML. Performance you can measure. Type-safe APIs. Code your team can read in a year. The internet is full of fast-food sites pretending to be restaurants. We make restaurants.",
  signature: "The studio",
  signatureRole: "On the discipline of code",
  accent: BLUE,
};

const PRINT_MANIFESTO: ManifestoConfig = {
  eyebrow: "What we believe",
  title: (
    <>
      A logo is not a brand. A brand is the&nbsp;
      <em style={{ color: "#C8973A" }}>
        feeling
      </em>
      &nbsp;before anyone reads a word.
    </>
  ),
  body: "Most clients come in wanting a logo. What they need is a visual language. A logo is a mark. A brand is the decision you made about the colour, the typeface, the silence between elements, and the feeling those things create at a distance, before anyone reads anything. We build the language first. The logo comes out of that, and it is better for it. Every time.",
  signature: "The studio",
  signatureRole: "On the discipline of brand",
  accent: GOLD,
};

const SOCIAL_MANIFESTO: ManifestoConfig = {
  eyebrow: "What we believe",
  title: (
    <>
      Most social content is&nbsp;
      <em style={{ color: "#C8973A" }}>
        performing.
      </em>
      &nbsp;The best content is just saying something worth saving.
    </>
  ),
  body: "The brands winning on social are not the ones posting the most. They are the ones saying things their audience wanted someone to say. Not chasing the algorithm. Not performing for the feed. Just making content that earns its place in a saved folder, a screenshot, a reshare. That is a harder brief than three posts a week. It is also the only one worth solving.",
  signature: "The studio",
  signatureRole: "On the discipline of content",
  accent: GOLD,
};

const MOTION_MANIFESTO: ManifestoConfig = {
  eyebrow: "What we believe",
  title: (
    <>
      An animation that has no reason to move is just&nbsp;
      <em style={{ color: "#8E6BAA" }}>
        decoration
      </em>
      &nbsp;with a frame rate.
    </>
  ),
  body: "The best motion is invisible. Not because it is subtle, but because you feel the effect without noticing the cause. The timing that makes an entrance land. The easing that makes a transition feel inevitable. The sequence that moves you from curious to convinced without you realising you were being moved. Motion design is not a finishing layer. It is a decision about what happens next, and when, and why.",
  signature: "The studio",
  signatureRole: "On the discipline of motion",
  accent: LAVENDER,
};

const ILLUSTRATION_MANIFESTO: ManifestoConfig = {
  eyebrow: "What we believe",
  title: (
    <>
      Anyone can fill a space with an image. Not everyone can&nbsp;
      <em style={{ color: "#5A8AAB" }}>
        tell a story
      </em>
      &nbsp;with one.
    </>
  ),
  body: "A good illustration is not a picture. It is an argument. A character whose posture says more than their dialogue. A cover that tells you everything about the book before you read the title. An editorial image that changes what a reader thinks before they start reading. We build illustration with one standard: not does this look good, but does this work.",
  signature: "The studio",
  signatureRole: "On the discipline of illustration",
  accent: BLUE,
};

const MANIFESTO_MAP: Record<string, ManifestoConfig> = {
  design: DESIGN_MANIFESTO,
  webdev: WEBDEV_MANIFESTO,
  print: PRINT_MANIFESTO,
  social: SOCIAL_MANIFESTO,
  motion: MOTION_MANIFESTO,
  illustration: ILLUSTRATION_MANIFESTO,
};

export function Manifesto({ variant = "design" }: { variant?: "design" | "webdev" | "print" | "social" | "motion" | "illustration" }) {
  const config = MANIFESTO_MAP[variant] ?? DESIGN_MANIFESTO;

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: PARCHMENT,
        color: INK,
        paddingTop: "clamp(120px, 14vw, 200px)",
        paddingBottom: "clamp(120px, 14vw, 200px)",
        overflow: "hidden",
      }}
    >
      {/* Background decorative quote mark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(40px, 6vw, 80px)",
          right: "clamp(-20px, 2vw, 80px)",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(280px, 36vw, 540px)",
          lineHeight: 0.85,
          color: `${config.accent}12`,
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* Subtle grid pattern background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${INK}03 1px, transparent 1px), linear-gradient(90deg, ${INK}03 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 80px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(56px, 8vw, 120px)",
          alignItems: "start",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 1,
              background: config.accent,
            }}
          />
          <span
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: "clamp(10px, 1vw, 12px)",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: config.accent,
            }}
          >
            {config.eyebrow}
          </span>
        </motion.div>

        {/* Massive editorial title */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(48px, 8vw, 128px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            color: INK,
            margin: 0,
            maxWidth: 1200,
          }}
        >
          {config.title}
        </motion.h2>

        {/* Body copy + signature */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(40px, 5vw, 64px)",
            maxWidth: 1100,
            marginLeft: "auto",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(17px, 1.6vw, 22px)",
              lineHeight: 1.7,
              color: `${INK}CC`,
              margin: 0,
              maxWidth: 720,
              marginLeft: "auto",
              columnCount: 1,
            }}
          >
            {config.body}
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              maxWidth: 720,
              marginLeft: "auto",
              paddingTop: 24,
              borderTop: `1px solid ${INK}15`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: GOLD,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  color: INK,
                  marginBottom: 2,
                }}
              >
               . {config.signature}
              </div>
              <div
                style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: `${INK}80`,
                }}
              >
                {config.signatureRole}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
