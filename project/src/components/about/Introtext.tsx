"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GOLD, BLUE, LAVENDER } from "@/constants/theme";
import { ChevronDown } from "lucide-react";

const BLACK = "#0A0A0A";
const EASE  = [0.25, 0.46, 0.45, 0.94] as const;

interface IntrotextProps {
  onComplete?: () => void;
}

// ─── VOID: 24 pre-defined gold particles ──────────────────────────────────────
const PARTICLES = [
  { x: "9%",  y: "14%", s: 4, d: 0.0, o: 0.38 }, { x: "24%", y: "8%",  s: 3, d: 0.4, o: 0.26 },
  { x: "44%", y: "19%", s: 5, d: 0.2, o: 0.44 }, { x: "67%", y: "11%", s: 3, d: 0.6, o: 0.30 },
  { x: "81%", y: "24%", s: 4, d: 0.3, o: 0.36 }, { x: "91%", y: "58%", s: 3, d: 0.7, o: 0.28 },
  { x: "78%", y: "72%", s: 5, d: 0.1, o: 0.40 }, { x: "55%", y: "81%", s: 4, d: 0.8, o: 0.34 },
  { x: "32%", y: "76%", s: 3, d: 0.5, o: 0.26 }, { x: "12%", y: "68%", s: 4, d: 0.3, o: 0.32 },
  { x: "4%",  y: "42%", s: 3, d: 0.6, o: 0.24 }, { x: "18%", y: "35%", s: 5, d: 0.1, o: 0.42 },
  { x: "38%", y: "44%", s: 3, d: 0.9, o: 0.22 }, { x: "62%", y: "46%", s: 4, d: 0.2, o: 0.36 },
  { x: "76%", y: "38%", s: 3, d: 0.5, o: 0.28 }, { x: "86%", y: "82%", s: 4, d: 0.8, o: 0.38 },
  { x: "57%", y: "62%", s: 5, d: 0.0, o: 0.46 }, { x: "28%", y: "54%", s: 3, d: 0.7, o: 0.26 },
  { x: "71%", y: "88%", s: 4, d: 0.4, o: 0.34 }, { x: "15%", y: "88%", s: 3, d: 0.2, o: 0.24 },
  { x: "48%", y: "7%",  s: 4, d: 0.5, o: 0.40 }, { x: "93%", y: "40%", s: 3, d: 0.8, o: 0.26 },
  { x: "35%", y: "28%", s: 4, d: 0.1, o: 0.36 }, { x: "72%", y: "55%", s: 3, d: 0.6, o: 0.28 },
];

// ─── NOISE: 16 brand/marketing words at fixed positions ───────────────────────
const NOISE_WORDS = [
  { t: "NOISE",       x: "5%",  y: "12%", sz: 72, r: -7,  o: 0.065, drift: 5  },
  { t: "TEMPLATE",    x: "62%", y: "8%",  sz: 44, r: 4,   o: 0.055, drift: 4  },
  { t: "GENERIC",     x: "75%", y: "38%", sz: 58, r: -3,  o: 0.075, drift: 6  },
  { t: "LOST",        x: "16%", y: "54%", sz: 40, r: 11,  o: 0.050, drift: 3  },
  { t: "INVISIBLE",   x: "44%", y: "74%", sz: 52, r: -5,  o: 0.065, drift: 5  },
  { t: "SCROLL",      x: "28%", y: "18%", sz: 48, r: 8,   o: 0.055, drift: 4  },
  { t: "CLICK",       x: "84%", y: "62%", sz: 36, r: -9,  o: 0.048, drift: 3  },
  { t: "BLAND",       x: "52%", y: "88%", sz: 50, r: 6,   o: 0.065, drift: 5  },
  { t: "SAFE",        x: "8%",  y: "80%", sz: 38, r: -4,  o: 0.055, drift: 4  },
  { t: "CLUTTER",     x: "72%", y: "76%", sz: 56, r: 3,   o: 0.075, drift: 6  },
  { t: "IGNORED",     x: "33%", y: "42%", sz: 42, r: -12, o: 0.055, drift: 4  },
  { t: "AVERAGE",     x: "18%", y: "30%", sz: 46, r: 7,   o: 0.065, drift: 5  },
  { t: "BLUR",        x: "59%", y: "20%", sz: 34, r: -6,  o: 0.048, drift: 3  },
  { t: "FORGETTABLE", x: "38%", y: "56%", sz: 38, r: 5,   o: 0.055, drift: 4  },
  { t: "STATIC",      x: "88%", y: "22%", sz: 46, r: -8,  o: 0.065, drift: 5  },
  { t: "PIXELS",      x: "22%", y: "65%", sz: 40, r: 10,  o: 0.048, drift: 3  },
];

// ─── SEATS: SVG theatre seating plan ──────────────────────────────────────────
const SVG_W = 800;
const SVG_H = 430;

interface SeatRow {
  y: number;
  count: number;
  sw: number;
  sh: number;
  gap: number;
  spotlightSeats?: number[];
}

const SEAT_ROWS: SeatRow[] = [
  { y: 350, count: 20, sw: 26, sh: 30, gap: 10, spotlightSeats: [4, 15] },
  { y: 305, count: 18, sw: 24, sh: 28, gap: 9  },
  { y: 263, count: 16, sw: 22, sh: 26, gap: 8  },
  { y: 224, count: 14, sw: 20, sh: 24, gap: 8  },
  { y: 188, count: 12, sw: 18, sh: 22, gap: 7  },
  { y: 155, count: 10, sw: 16, sh: 20, gap: 7  },
];

function rowStartX(count: number, sw: number, gap: number): number {
  return (SVG_W - (count * sw + (count - 1) * gap)) / 2;
}

function aisleIndices(count: number): [number, number] {
  const m = Math.floor(count / 2);
  return [m - 1, m];
}

function TheatreSeats() {
  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={{ width: "min(88vw, 800px)", height: "auto", display: "block" }}
      aria-hidden
    >
      {/* Stage edge */}
      <line x1="60" y1="406" x2="740" y2="406" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
      {/* Footlights */}
      {Array.from({ length: 17 }).map((_, i) => (
        <ellipse
          key={i}
          cx={72 + i * 40}
          cy={414}
          rx={6}
          ry={3.5}
          fill={i % 3 === 1 ? `${GOLD}70` : "rgba(255,255,255,0.18)"}
        />
      ))}

      {/* Seat rows */}
      {SEAT_ROWS.map((row, ri) => {
        const sx       = rowStartX(row.count, row.sw, row.gap);
        const [a1, a2] = aisleIndices(row.count);
        const rowOpacity = 0.82 - ri * 0.09;
        const backH  = row.sh * 0.63;
        const cushH  = row.sh * 0.37;

        return (
          <g key={ri} opacity={rowOpacity}>
            {Array.from({ length: row.count }).map((_, si) => {
              if (si === a1 || si === a2) return null; // aisle gap
              const isSpot = row.spotlightSeats?.includes(si) ?? false;
              const x      = sx + si * (row.sw + row.gap);
              return (
                <g key={si}>
                  {/* Seat back */}
                  <rect
                    x={x} y={row.y} width={row.sw} height={backH}
                    rx={2.5}
                    fill={isSpot ? `${GOLD}18` : "rgba(255,255,255,0.03)"}
                    stroke={isSpot ? GOLD : "rgba(255,255,255,0.24)"}
                    strokeWidth={isSpot ? 1.2 : 0.65}
                  />
                  {/* Cushion */}
                  <rect
                    x={x + 2} y={row.y + backH} width={row.sw - 4} height={cushH}
                    rx={1.5}
                    fill={isSpot ? `${GOLD}10` : "none"}
                    stroke={isSpot ? `${GOLD}80` : "rgba(255,255,255,0.14)"}
                    strokeWidth={isSpot ? 0.9 : 0.45}
                  />
                  {/* Spotlight bloom */}
                  {isSpot && (
                    <ellipse
                      cx={x + row.sw / 2} cy={row.y + row.sh / 2}
                      rx={row.sw * 1.1} ry={row.sh * 0.85}
                      fill={`${GOLD}12`}
                    />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// ─── CURTAIN SCENE ─────────────────────────────────────────────────────────────
function CurtainScene({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0=closed, 1=curtains opening, 2=spotlight blooms, 3=text reveal, 4=fading out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 180);   // curtains start parting
    const t2 = setTimeout(() => setPhase(2), 1900);  // spotlight blooms from above
    const t3 = setTimeout(() => setPhase(3), 2700);  // text drops in
    const t4 = setTimeout(() => setPhase(4), 4600);  // fade to black
    const t5 = setTimeout(() => onFinish(), 5200);   // hand off to page
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      key="curtain"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 4 ? 0 : 1 }}
      transition={{ duration: phase === 4 ? 0.8 : 0.4 }}
      style={{ position: "fixed", inset: 0, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
    >

      {/* Left curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: phase >= 1 ? "-100%" : 0 }}
        transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
        style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", zIndex: 20,
          background: "repeating-linear-gradient(90deg, #070707 0px, #101010 16px, #1b1b1b 32px, #131313 48px, #0a0a0a 64px, #070707 80px)",
          boxShadow: "inset -80px 0 140px rgba(0,0,0,0.99)" }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.01) 3px, rgba(255,255,255,0.01) 4px)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 72, height: "100%", background: "linear-gradient(to right, transparent, rgba(0,0,0,0.88))" }} />
      </motion.div>

      {/* Right curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: phase >= 1 ? "100%" : 0 }}
        transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
        style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", zIndex: 20,
          background: "repeating-linear-gradient(-90deg, #070707 0px, #101010 16px, #1b1b1b 32px, #131313 48px, #0a0a0a 64px, #070707 80px)",
          boxShadow: "inset 80px 0 140px rgba(0,0,0,0.99)" }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.01) 3px, rgba(255,255,255,0.01) 4px)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 72, height: "100%", background: "linear-gradient(to left, transparent, rgba(0,0,0,0.88))" }} />
      </motion.div>

      {/* Center stage — text only, no logo */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 clamp(24px,6vw,80px)" }}>

        {/* "This Is Where" */}
        <motion.p
          initial={{ opacity: 0, y: 44, filter: "blur(12px)" }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 44, filter: phase >= 3 ? "blur(0px)" : "blur(12px)" }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "normal", fontSize: "clamp(52px,8.5vw,128px)", lineHeight: 0.94, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 0.04em" }}
        >
          This Is Where
        </motion.p>

        {/* "We Come In" — gold, delayed */}
        <motion.p
          initial={{ opacity: 0, y: 44, filter: "blur(12px)" }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 44, filter: phase >= 3 ? "blur(0px)" : "blur(12px)" }}
          transition={{ duration: 1.2, delay: 0.26, ease: EASE }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "normal", fontSize: "clamp(52px,8.5vw,128px)", lineHeight: 0.94, letterSpacing: "-0.03em", color: GOLD, margin: 0 }}
        >
          We Come In.
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Introtext({ onComplete }: IntrotextProps) {
  const [scrollProgress, setScrollProgress]   = useState(0);
  const [experienceComplete, setExperienceComplete] = useState(false);
  const [isMobile, setIsMobile]               = useState(false);
  const containerRef    = useRef<HTMLDivElement>(null);
  const scrollAccum     = useRef(0);
  const lastTapTime     = useRef(0);

  const activeScene = Math.floor(scrollProgress);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleComplete = () => {
    setExperienceComplete(true);
    onComplete?.();
  };

  useEffect(() => {
    if (experienceComplete) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current = Math.min(Math.max(scrollAccum.current + e.deltaY, 0), 1500);
      setScrollProgress(scrollAccum.current / 500);
    };

    let touchY0 = 0;
    const handleTouchStart = (e: TouchEvent) => { e.preventDefault(); touchY0 = e.touches[0].clientY; };
    const handleTouchMove  = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchY0 - e.touches[0].clientY;
      if (Math.abs(dy) > 4) {
        scrollAccum.current = Math.min(Math.max(scrollAccum.current + dy * 2.5, 0), 1500);
        touchY0 = e.touches[0].clientY;
        setScrollProgress(scrollAccum.current / 500);
      }
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const now  = Date.now();
      const diff = Math.abs(touchY0 - e.changedTouches[0].clientY);
      if (now - lastTapTime.current > 280 && diff < 10) {
        lastTapTime.current = now;
        scrollAccum.current = Math.min(scrollAccum.current + 200, 1500);
        setScrollProgress(scrollAccum.current / 500);
      }
    };

    const el = containerRef.current;
    el?.addEventListener("wheel",        handleWheel,      { passive: false });
    el?.addEventListener("touchstart",   handleTouchStart, { passive: false });
    el?.addEventListener("touchmove",    handleTouchMove,  { passive: false });
    el?.addEventListener("touchend",     handleTouchEnd);
    return () => {
      el?.removeEventListener("wheel",      handleWheel);
      el?.removeEventListener("touchstart", handleTouchStart);
      el?.removeEventListener("touchmove",  handleTouchMove);
      el?.removeEventListener("touchend",   handleTouchEnd);
    };
  }, [experienceComplete]);

  if (experienceComplete) return null;

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, touchAction: "none", cursor: "default", overscrollBehavior: "none", userSelect: "none", zIndex: 50 }}
    >
      {/* ── SCENE 0: THE VOID ── */}
      <AnimatePresence mode="wait">
        {activeScene === 0 && (
          <motion.div
            key="void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            style={{ position: "fixed", inset: 0, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
          >
            {/* Particles */}
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                aria-hidden
                style={{ position: "absolute", left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: "50%", background: GOLD, pointerEvents: "none" }}
                animate={{ opacity: [p.o * 0.25, p.o, p.o * 0.25], scale: [0.6, 1, 0.6] }}
                transition={{ duration: 3.5 + p.d * 1.8, repeat: Infinity, delay: p.d * 2, ease: "easeInOut" }}
              />
            ))}

            {/* Central gold pulse */}
            <motion.div
              aria-hidden
              animate={{ scale: [0.85, 1, 0.85], opacity: [0.06, 0.14, 0.06] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", width: "clamp(320px,50vw,600px)", height: "clamp(320px,50vw,600px)", background: `radial-gradient(circle, ${GOLD}55 0%, transparent 68%)`, filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }}
            />

            {/* Text */}
            <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.4 }}
                style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px,1.1vw,13px)", fontWeight: 700, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: "clamp(12px,2vw,20px)" }}
              >
                Before the spotlight,
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, scale: 1.14 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(64px,13vw,160px)", lineHeight: 0.88, letterSpacing: "-0.05em", color: GOLD, margin: 0 }}
              >
                the void
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SCENE 1: THE NOISE ── */}
      <AnimatePresence mode="wait">
        {activeScene === 1 && (
          <motion.div
            key="noise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            style={{ position: "fixed", inset: 0, background: BLACK, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
          >
            {/* Word soup */}
            {NOISE_WORDS.map((w, i) => (
              <motion.span
                key={i}
                aria-hidden
                style={{ position: "absolute", left: w.x, top: w.y, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 900, fontSize: w.sz, letterSpacing: "0.04em", color: BLUE, opacity: w.o, transform: `rotate(${w.r}deg)`, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}
                animate={{ y: [0, -w.drift, 0], opacity: [w.o, w.o * 1.4, w.o] }}
                transition={{ duration: 5 + i * 0.28, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
              >
                {w.t}
              </motion.span>
            ))}

            {/* Horizontal scan lines — subtle */}
            <motion.div
              aria-hidden
              animate={{ backgroundPosition: ["0px 0px", "0px 30px"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(137,176,204,0.06) 3px, rgba(137,176,204,0.06) 4px)", backgroundSize: "100% 30px", pointerEvents: "none" }}
            />

            {/* Central clear text */}
            <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px,1.1vw,13px)", fontWeight: 700, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: "clamp(12px,2vw,20px)" }}
              >
                Before the connection,
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(64px,13vw,160px)", lineHeight: 0.88, letterSpacing: "-0.05em", color: BLUE, margin: 0 }}
              >
                the noise
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SCENE 2: THE EMPTY SEATS ── */}
      <AnimatePresence mode="wait">
        {activeScene === 2 && (
          <motion.div
            key="seats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            style={{ position: "fixed", inset: 0, background: BLACK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", gap: "clamp(20px,3vw,36px)" }}
          >
            {/* Text top */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <motion.p
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
                style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(10px,1.1vw,13px)", fontWeight: 700, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", margin: "0 0 clamp(8px,1.2vw,14px)" }}
              >
                Before the standing ovation,
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(48px,9vw,120px)", lineHeight: 0.88, letterSpacing: "-0.05em", color: LAVENDER, margin: 0 }}
              >
                the empty seats
              </motion.h2>
            </div>

            {/* SVG theatre seats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            >
              <TheatreSeats />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SCENE 3: THE CURTAIN ── */}
      <AnimatePresence mode="wait">
        {activeScene >= 3 && (
          <CurtainScene key="curtain" onFinish={handleComplete} />
        )}
      </AnimatePresence>

      {/* ── SCROLL INDICATOR ── */}
      {activeScene < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ position: "fixed", bottom: "clamp(24px,4vw,44px)", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 60, pointerEvents: "none" }}
        >
          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
            {isMobile ? "Tap to continue" : "Scroll to continue"}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
          >
            <ChevronDown size={20} style={{ color: GOLD }} />
            <ChevronDown size={20} style={{ color: `${GOLD}55`, marginTop: -10 }} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
