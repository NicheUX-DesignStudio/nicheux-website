"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE } from "@/constants/theme";

const BLACK  = "#0A0A0A";
const EASE   = [0.25, 0.46, 0.45, 0.94] as const;

const TEAM = [
  {
    name:       "Thevaki",
    role:       "Creative Director",
    discipline: "UI/UX · Web Development",
    bio:        "Sets the vision. Builds the systems. The first call on every project and the last eye before anything ships.",
    motto:      "Design is not decoration. It is direction.",
    accent:     GOLD,
    image:      "/images/Thevaki-uiuxdesigner-developer-web-designer-nicheux.webp",
  },
  {
    name:       "Indhupriya",
    role:       "Character & Illustration",
    discipline: "World-building · Storytelling",
    bio:        "Creates characters, illustrated books, and visual worlds with emotional intelligence that makes every illustration feel lived-in.",
    motto:      "Every character carries a world.",
    accent:     LAVENDER,
    image:      "/images/Indhupriya-character-illustrator-nicheux.webp",
  },
  {
    name:       "Isaac",
    role:       "Print & Brand Design",
    discipline: "Identity · Print Production",
    bio:        "Handles all print and brand identity. Files go straight to print. No chasing, no corrections, no reprints.",
    motto:      "Print is permanent. Make it count.",
    accent:     BLUE,
    image:      "/images/Issac-graphic-designer-print-brand-nicheux.webp",
  },
  {
    name:       "Akash",
    role:       "AI Visuals",
    discipline: "Generative Art · Direction",
    bio:        "Bridges human creative intent and machine output. Produces work that feels authored, not generated.",
    motto:      "Human intent. Machine execution.",
    accent:     GOLD,
    image:      "/images/Akash-ai-visual-nicheux.webp",
  },
  {
    name:       "Delwin",
    role:       "Motion Design",
    discipline: "Animation · Social Video",
    bio:        "Finds the timing that makes audiences stop scrolling. Motion graphics, animated logos, social videos.",
    motto:      "Motion is the difference between noticed and ignored.",
    accent:     LAVENDER,
    image:      "/images/Delwin-motion-design-social-media-nicheux.webp",
  },
  {
    name:       "Kishore Aravind",
    role:       "Sales & Marketing",
    discipline: "Strategy · Client Relations",
    bio:        "Understands both the commercial reality and the creative work well enough to represent both honestly.",
    motto:      "The best product means nothing unsold.",
    accent:     BLUE,
    image:      "/images/Kishore.jpeg",
  },
];

function MemberCard({ m, idx }: { m: typeof TEAM[number]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: idx * 0.09, ease: EASE }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", background: "#0e0e0e" }}
    >
      {/* ── Photo area ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: `3px solid ${m.accent}`,
          height: "clamp(280px,32vw,420px)",
        }}
      >
        <img
          src={m.image}
          alt={`${m.name}, ${m.role} at NicheUX`}
          loading="eager"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            filter: hovered ? "brightness(0.38)" : "brightness(0.88) grayscale(0.08)",
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.06"; }}
        />

        {/* Motto overlay — appears on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "clamp(20px,3vw,40px)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: m.accent,
                  marginBottom: 16,
                }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(16px,1.8vw,22px)",
                  lineHeight: 1.45,
                  color: "#fff",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                "{m.motto}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always-visible gradient at bottom */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(14,14,14,0.96) 0%, transparent 100%)",
            pointerEvents: "none",
            transition: "opacity 0.4s",
            opacity: hovered ? 0 : 1,
          }}
        />
      </div>

      {/* ── Text block ── */}
      <div
        style={{
          padding: "clamp(18px,2vw,26px)",
          flex: 1,
          background: hovered ? "#181818" : "#0e0e0e",
          transition: "background 0.3s",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(22px,2.4vw,32px)",
            letterSpacing: "-0.025em",
            color: hovered ? m.accent : "#fff",
            lineHeight: 1,
            margin: "0 0 8px",
            transition: "color 0.3s",
          }}
        >
          {m.name}
        </h3>

        <div
          style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: m.accent,
            marginBottom: 4,
          }}
        >
          {m.role}
        </div>

        <div
          style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginBottom: 12,
          }}
        >
          {m.discipline}
        </div>

        <p
          style={{
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: "clamp(12px,1.1vw,14px)",
            lineHeight: 1.78,
            color: "rgba(255,255,255,0.38)",
            margin: 0,
          }}
        >
          {m.bio}
        </p>
      </div>
    </motion.article>
  );
}

export default function Team() {
  const navigate = useNavigate();

  return (
    <section
      aria-label="The NicheUX ensemble"
      style={{ background: BLACK, overflow: "hidden", position: "relative" }}
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
        style={{ position: "absolute", top: "-12%", right: "-6%", width: "52vw", height: "52vw", background: LAVENDER, filter: "blur(160px)", borderRadius: "50%", pointerEvents: "none" }}
      />

      {/* ── Programme header ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(96px,11vw,152px) clamp(24px,5.5vw,88px) clamp(56px,6vw,80px)",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
        >
          {/* Playbill label */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: "clamp(24px,3vw,40px)" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(11px,1vw,13px)", color: "rgba(255,255,255,0.16)", letterSpacing: "0.18em", whiteSpace: "nowrap" }}>
              The Company &nbsp;·&nbsp; NicheUX Studio
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* Headline */}
          <div style={{ textAlign: "center", marginBottom: "clamp(16px,2vw,24px)" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(52px,9vw,144px)",
                lineHeight: 0.86,
                letterSpacing: "-0.045em",
                color: "#fff",
                margin: "0 0 clamp(14px,2vw,22px)",
              }}
            >
              Behind Every
              <br />
              <span style={{ color: GOLD }}>Great Story.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: "clamp(13px,1.2vw,16px)",
                lineHeight: 1.88,
                color: "rgba(255,255,255,0.3)",
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              No account managers. No middlemen. The person who designs your brand is the person you talk to.
            </p>
          </div>

          {/* Decorative rule */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: "clamp(20px,2.5vw,32px)" }}>
            <div style={{ width: 48, height: 1, background: `rgba(233,198,114,0.18)` }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: `${GOLD}55` }}>❖</span>
            <div style={{ width: 48, height: 1, background: `rgba(233,198,114,0.18)` }} />
          </div>
        </motion.div>
      </div>

      {/* ── Portrait grid ── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5.5vw,88px) clamp(64px,7vw,96px)" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(12px,1.6vw,22px)" }}
          className="team-grid"
        >
          <style>{`
            @media(max-width:900px){ .team-grid{ grid-template-columns: repeat(2,1fr) !important; } }
            @media(max-width:520px){ .team-grid{ grid-template-columns: 1fr !important; } }
          `}</style>
          {TEAM.map((member, idx) => (
            <MemberCard key={member.name} m={member} idx={idx} />
          ))}
        </div>
      </div>

      {/* ── Grand Theatre full-bleed ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        viewport={{ once: true }}
        style={{ position: "relative", height: "clamp(280px,38vw,520px)", overflow: "hidden" }}
      >
        <img
          src="/images/GrandTheatreOfCreation.webp"
          alt="NicheUX studio, the grand theatre of creation"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.24) saturate(0.45)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0A0A0A 0%, transparent 18%, transparent 82%, #0A0A0A 100%)" }} />

        {/* Quote center */}
        <div
          style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 clamp(24px,6vw,96px)", gap: 16 }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.38em" }}
            transition={{ duration: 1.6, ease: EASE }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: `${GOLD}60`, display: "block" }}
          >
            The Studio &nbsp;·&nbsp; United Kingdom
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(22px,3.8vw,58px)", lineHeight: 1.16, letterSpacing: "-0.02em", color: "#fff", margin: 0, maxWidth: 820 }}
          >
            "Six disciplines. Zero compromise.
            <br />
            Every story deserves a stage."
          </motion.p>
        </div>
      </motion.div>

      {/* ── CTA strip ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(32px,4vw,52px) clamp(24px,5.5vw,88px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(16px,1.7vw,22px)", color: "rgba(255,255,255,0.24)", margin: 0 }}>
          The person who builds your brand is the person you talk to.
        </p>
        <motion.button
          onClick={() => navigate("/contact")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, background: "transparent", border: `1px solid ${GOLD}42`, padding: "13px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.22s, border-color 0.22s" }}
          onMouseEnter={(e) => { const b = e.currentTarget; b.style.background = `${GOLD}14`; b.style.borderColor = GOLD; }}
          onMouseLeave={(e) => { const b = e.currentTarget; b.style.background = "transparent"; b.style.borderColor = `${GOLD}42`; }}
        >
          Work with the company <ArrowRight size={12} />
        </motion.button>
      </div>
    </section>
  );
}
