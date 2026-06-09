"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { GOLD, LAVENDER, PARCHMENT, INK, INK_MUTED } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the service. A UX audit runs 1 to 2 weeks. A full website build is 3 to 6 weeks. A complete brand identity is 2 to 4 weeks. We give you a clear timeline in the proposal before anything starts.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes. We have helped brands at day one and brands at year ten. The approach is the same: understand where you are, where you need to go, and what will actually get you there. Your budget determines the scope, not the quality.",
  },
  {
    question: "Can we start with just one service?",
    answer:
      "Absolutely. Many clients begin with a single deliverable, then expand as the relationship develops. You do not need to commit to everything upfront. Start where the need is clearest.",
  },
  {
    question: "What if we need changes after launch?",
    answer:
      "Website Care Plans cover ongoing maintenance, updates, and optimisation. For other work, we offer retainer arrangements. Nothing ships without your sign-off, so major surprises are rare.",
  },
  {
    question: "How do you handle communication across time zones?",
    answer:
      "We are UK-based and have worked with clients in India, Canada, Ireland, and Malaysia. Clear briefs, shared timelines, and direct access to the people doing the work solve most communication challenges.",
  },
  {
    question: "What makes you different from other agencies?",
    answer:
      "No account managers between you and the work. The person who designs your brand is the person you talk to. Six specialists who each own their discipline, working together on your brief.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{ background: PARCHMENT, overflow: "hidden", position: "relative" }}
    >
      {/* Subtle warm texture overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(233,198,114,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding:
            "clamp(80px,10vw,140px) clamp(24px,6vw,96px) clamp(80px,10vw,120px)",
          position: "relative",
        }}
      >
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
          style={{ marginBottom: "clamp(56px,7vw,88px)" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: "clamp(20px,2.5vw,32px)",
            }}
          >
            <div
              style={{ width: 44, height: 1, background: "rgba(26,26,26,0.15)" }}
            />
            <span
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: INK_MUTED,
              }}
            >
              Questions
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(44px,7vw,112px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: INK,
              margin: 0,
            }}
          >
            Everything
            <br />
            you need
            <br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>to know.</em>
          </h2>
        </motion.div>

        {/* ── FAQ accordion ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "clamp(40px,6vw,96px)",
            alignItems: "start",
          }}
          className="faq-layout"
        >
          <style>{`@media(max-width:800px){.faq-layout{grid-template-columns:1fr!important}}`}</style>

          {/* Left col — label + decorative element */}
          <div style={{ position: "sticky", top: "clamp(80px,8vw,100px)" }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              viewport={{ once: true }}
            >
              <p
                style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: "clamp(14px,1.3vw,17px)",
                  lineHeight: 1.85,
                  color: INK_MUTED,
                  marginBottom: "clamp(32px,4vw,52px)",
                }}
              >
                Six disciplines, zero compromises, and no account managers
                standing between you and the work. These are the questions we
                get asked most often.
              </p>

              {/* Decorative divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: "clamp(28px,3.5vw,44px)",
                }}
              >
                <div
                  style={{ width: 36, height: 1, background: "rgba(26,26,26,0.18)" }}
                />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 18,
                    color: GOLD,
                  }}
                >
                  ❖
                </span>
              </div>

              {/* Quick facts */}
              {[
                { label: "Response time", value: "24 hours" },
                { label: "Proposal", value: "Free" },
                { label: "Discovery call", value: "30 minutes" },
              ].map((fact) => (
                <div
                  key={fact.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingBottom: "clamp(10px,1.2vw,14px)",
                    marginBottom: "clamp(10px,1.2vw,14px)",
                    borderBottom: "1px solid rgba(26,26,26,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontSize: 12,
                      color: INK_MUTED,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {fact.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(16px,1.6vw,22px)",
                      color: INK,
                    }}
                  >
                    {fact.value}
                  </span>
                </div>
              ))}

              {/* CTA */}
              <motion.button
                onClick={() => (window.location.href = "/contact")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: INK,
                  border: `1px solid rgba(26,26,26,0.25)`,
                  padding: "clamp(12px,1.5vw,16px) clamp(24px,3vw,36px)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginTop: "clamp(20px,2.5vw,32px)",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = GOLD;
                  el.style.borderColor = GOLD;
                  el.style.color = "#131313";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(26,26,26,0.25)";
                  el.style.color = INK;
                }}
              >
                Schedule Your Discovery Call
              </motion.button>
            </motion.div>
          </div>

          {/* Right col — accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                viewport={{ once: true }}
                style={{
                  borderBottom: "1px solid rgba(26,26,26,0.12)",
                  padding: "clamp(18px,2.5vw,28px) 0",
                  borderLeft: open === i ? `3px solid ${GOLD}` : "3px solid transparent",
                  paddingLeft: open === i ? "clamp(16px,2vw,24px)" : 0,
                  transition: "border-left-color 0.25s ease, padding-left 0.25s ease",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      fontSize: "clamp(16px,1.6vw,22px)",
                      lineHeight: 1.3,
                      color: open === i ? INK : `${INK}cc`,
                      margin: 0,
                      transition: "color 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {faq.question}
                  </h3>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      border: `1px solid ${open === i ? GOLD : "rgba(26,26,26,0.2)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: open === i ? GOLD : "rgba(26,26,26,0.35)",
                      transition: "all 0.2s",
                      marginTop: 2,
                    }}
                  >
                    <Plus
                      size={14}
                      style={{
                        transition: "transform 0.25s ease",
                        transform: open === i ? "rotate(45deg)" : "none",
                      }}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontSize: "clamp(13px,1.2vw,16px)",
                          lineHeight: 1.85,
                          color: INK_MUTED,
                          margin: "clamp(12px,1.5vw,18px) 0 0 0",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
