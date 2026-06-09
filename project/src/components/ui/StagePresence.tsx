"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { GOLD } from "@/constants/theme";

type ActEntry =
  | { id: string; type: "matter"; roman?: undefined; name: string }
  | { id: string; type: "act"; roman: string; name: string };

const ACTS: ActEntry[] = [
  { id: "hero-section", type: "matter", name: "Overture" },
  { id: "programme",    type: "matter", name: "Playbill" },
  { id: "portfolio",    type: "act", roman: "I",   name: "Performances" },
  { id: "services",     type: "act", roman: "II",  name: "Six Disciplines" },
  { id: "about-strip",  type: "act", roman: "III", name: "The Ensemble" },
  { id: "testimonials", type: "matter", name: "Reviews" },
  { id: "contact",      type: "matter", name: "Curtain Call" },
];

export default function StagePresence() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const ropeProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  const [activeAct, setActiveAct] = useState<ActEntry | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveAct(null);
      setVisible(false);
      return;
    }

    // Set up intersection observer for known section IDs
    const elements = ACTS
      .map((a) => ({ act: a, el: document.getElementById(a.id) }))
      .filter((x) => x.el);

    if (elements.length === 0) {
      // Sections not yet mounted; retry shortly
      const t = setTimeout(() => {
        const els = ACTS
          .map((a) => ({ act: a, el: document.getElementById(a.id) }))
          .filter((x) => x.el);
        if (els.length === 0) return;
        attach(els);
      }, 250);
      return () => clearTimeout(t);
    }
    return attach(elements);

    function attach(els: { act: typeof ACTS[0]; el: HTMLElement | null }[]) {
      const observer = new IntersectionObserver(
        (entries) => {
          // Pick the entry closest to the top of the viewport that is intersecting
          const intersecting = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (intersecting.length > 0) {
            const id = intersecting[0].target.id;
            const match = ACTS.find((a) => a.id === id);
            if (match) {
              setActiveAct(match);
              // Show only after scrolling past the hero
              setVisible(match.id !== "hero-section");
            }
          }
        },
        { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.1, 0.5] }
      );

      els.forEach((x) => x.el && observer.observe(x.el));
      return () => observer.disconnect();
    }
  }, [pathname]);

  // Hide indicator entirely on non-home pages
  if (pathname !== "/") return null;

  return (
    <>
      {/* Top curtain rope. scroll progress indicator */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${GOLD}, ${GOLD} 60%, ${GOLD}90 100%)`,
          transformOrigin: "0% 50%",
          scaleX: ropeProgress,
          zIndex: 100,
          boxShadow: `0 0 8px ${GOLD}60`,
          pointerEvents: "none",
        }}
      />

      {/* Right-edge ACT indicator. vertical rail */}
      <AnimatePresence>
        {visible && activeAct && (
          <motion.div
            key="stage-presence"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              right: "clamp(12px, 1.5vw, 24px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 90,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              background: "rgba(10,10,10,0.72)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              padding: "clamp(10px, 1.5vw, 18px) clamp(8px, 1vw, 14px)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            id="stage-presence-rail"
          >
            <style>{`
              @media (max-width: 900px) {
                #stage-presence-rail { display: none !important; }
              }
            `}</style>

            {/* Top label: "ACT" for acts, blank for matter */}
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: GOLD,
              opacity: activeAct.type === "act" ? 0.7 : 0,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              transition: "opacity 0.4s ease",
              minHeight: 28,
            }}>
              Act
            </span>

            {/* Big symbol slot. Roman numeral for acts, fleuron for matter */}
            <div style={{ position: "relative", width: 44, height: 56 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeAct.type === "act" ? `act-${activeAct.roman}` : `matter-${activeAct.name}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: activeAct.type === "act" ? 44 : 30,
                    lineHeight: 1,
                    color: GOLD,
                    letterSpacing: "-0.02em",
                    textShadow: `0 0 20px ${GOLD}30`,
                  }}
                >
                  {activeAct.type === "act" ? activeAct.roman : "❦"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Vertical hairline */}
            <span style={{
              width: 1,
              height: 36,
              background: `linear-gradient(180deg, ${GOLD}80, transparent)`,
            }} />

            {/* Act name. vertical, italic */}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeAct.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "nowrap",
                }}
              >
                {activeAct.name}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
