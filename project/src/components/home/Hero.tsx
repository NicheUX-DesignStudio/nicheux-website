"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, ArrowRight, ChevronDown } from "lucide-react";
import { GOLD, LAVENDER, BLACK } from "@/constants/theme";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseInsideRef = useRef(false);

  const [phase, setPhase] = useState<"void" | "curtain" | "text" | "full">("void");
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);

  const LINE1 = "Every story deserves";
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("curtain"), 200);
    const t2 = setTimeout(() => { setPhase("text"); setShowLine1(true); }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!showLine1) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(LINE1.slice(0, i));
      if (i >= LINE1.length) { clearInterval(id); setTypingDone(true); }
    }, 48);
    return () => clearInterval(id);
  }, [showLine1]);

  useEffect(() => {
    if (!typingDone) return;
    const t1 = setTimeout(() => setShowLine2(true), 300);
    const t2 = setTimeout(() => setShowSub(true), 600);
    const t3 = setTimeout(() => { setPhase("full"); setShowCTAs(true); }, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [typingDone]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Autoplay with sound only on the first homepage visit per session
    const alreadyPlayed = sessionStorage.getItem("heroVideoPlayed");
    if (!alreadyPlayed) {
      sessionStorage.setItem("heroVideoPlayed", "1");
      v.muted = false;
      v.play().then(() => {
        // Unmuted autoplay succeeded
        setIsVideoMuted(false);
      }).catch(() => {
        // Browser blocked unmuted autoplay — fall back to muted (always allowed)
        v.muted = true;
        setIsVideoMuted(true);
        v.play().catch(() => {});
      });
    } else {
      // Already played this session — start muted and silent (no overlay)
      v.muted = true;
      setIsVideoMuted(true);
    }

    const onPlay  = () => setIsVideoPlaying(true);
    const onPause = () => setIsVideoPlaying(false);
    const onFs    = () => setIsFullscreen(!!document.fullscreenElement);
    v.addEventListener("play",  onPlay);
    v.addEventListener("pause", onPause);
    document.addEventListener("fullscreenchange", onFs);

    return () => {
      v.pause();  // stop on page change
      v.removeEventListener("play",  onPlay);
      v.removeEventListener("pause", onPause);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!mouseInsideRef.current || !videoRef.current) return;
      const t = e.target as HTMLElement;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
      if (e.key === " " || e.key === "k") { e.preventDefault(); togglePlay(); }
      if (e.key === "m") { e.preventDefault(); toggleMute(); }
      if (e.key === "f") { e.preventDefault(); toggleFs(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const togglePlay = () => { const v = videoRef.current; if (!v) return; v.paused ? v.play().catch(() => {}) : v.pause(); };
  const toggleMute = () => { const v = videoRef.current; if (!v) return; v.muted = !v.muted; setIsVideoMuted(v.muted); };
  const toggleFs = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;
    document.fullscreenElement ? document.exitFullscreen() : container.requestFullscreen().catch(() => {});
  };

  const EASE = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      onMouseEnter={() => { mouseInsideRef.current = true; }}
      onMouseLeave={() => { mouseInsideRef.current = false; }}
      style={{ position: "relative", minHeight: "100vh", backgroundColor: BLACK, overflow: "hidden" }}
    >
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes heroBulb { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        #hero-inner {
          display: grid;
          grid-template-columns: 55fr 45fr;
          min-height: 100vh;
        }
        @media (max-width: 900px) {
          #hero-inner { grid-template-columns: 1fr !important; }
          #hero-video-col { height: 48vw; min-height: 200px !important; max-height: 320px; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.06); }
          #hero-text-col { padding-bottom: 8px !important; }
        }
        @media (max-width: 480px) {
          #hero-video-col { height: 56vw; min-height: 240px; max-height: 340px; }
          #hero-text-col { padding-bottom: 16px !important; }
        }
      `}</style>

      {/* Curtain panels */}
      <AnimatePresence>
        {phase === "curtain" && (
          <>
            <motion.div key="cl"
              initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", backgroundColor: BLACK, transformOrigin: "left", zIndex: 50 }}
            />
            <motion.div key="cr"
              initial={{ scaleX: 1 }} animate={{ scaleX: 0 }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", backgroundColor: BLACK, transformOrigin: "right", zIndex: 50 }}
            />
          </>
        )}
      </AnimatePresence>


      <div id="hero-inner">
        {/* ── LEFT: Text ── */}
        <div id="hero-text-col" style={{
          position: "relative", zIndex: 3,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(100px, 14vh, 160px) clamp(32px, 6vw, 80px) clamp(60px, 8vh, 100px)",
        }}>
          {/* Top stage line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={showLine1 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              top: "clamp(72px, 10vh, 108px)",
              left: "clamp(32px, 6vw, 80px)",
              right: 0,
              height: 1,
              background: `linear-gradient(90deg, ${GOLD}50, ${LAVENDER}30, transparent)`,
              transformOrigin: "left",
            }}
          />

          {/* Headline */}
          <div style={{ maxWidth: 680 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "clamp(44px, 6.5vw, 100px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "clamp(4px, 0.5vh, 8px)",
            }}>
              {typed}
              {!typingDone && showLine1 && (
                <span style={{ color: LAVENDER, fontStyle: "italic", animation: "blink 1s step-end infinite" }}>|</span>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={showLine2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: "easeOut" }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "clamp(44px, 6.5vw, 100px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: LAVENDER,
                marginBottom: "clamp(4px, 1vh, 12px)",
              }}
            >
              a stage.
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={showSub ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                color: "rgba(255,255,255,0.72)",
                maxWidth: 420,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Strategy, brand, web and motion design for businesses that want to be impossible to ignore.
            </motion.p>
          </div>

          {/* CTAs */}
          <AnimatePresence>
            {showCTAs && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{ display: "flex", gap: 12, marginTop: "clamp(36px, 5vh, 52px)", flexWrap: "wrap" }}
              >
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: 700, fontSize: 11,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "14px 36px",
                    border: "none", borderRadius: 2, cursor: "pointer",
                    backgroundColor: GOLD, color: BLACK,
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                >
                  Start a Project
                  <ArrowRight size={13} />
                </motion.button>

                <motion.button
                  onClick={() => navigate("/featured-work")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: 600, fontSize: 11,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "14px 36px",
                    borderRadius: 2, cursor: "pointer",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  View Our Work
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust micro-line. countries */}
          <AnimatePresence>
            {showCTAs && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(6px, 1vw, 10px)",
                  marginTop: "clamp(18px, 2.5vh, 24px)",
                  flexWrap: "wrap",
                }}
              >
                <span style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                }}>
                  Trusted by businesses in
                </span>
                {["🇬🇧 UK", "🇮🇪 Ireland", "🇮🇳 India", "🇨🇦 Canada", "🇲🇾 Malaysia"].map((loc, i, arr) => (
                  <span key={loc} style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.05em",
                  }}>
                    {loc}{i < arr.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom stage line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={showCTAs ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: "clamp(32px, 6vw, 80px)",
              right: 0,
              height: 1,
              background: `linear-gradient(90deg, ${GOLD}35, ${LAVENDER}20, transparent)`,
              transformOrigin: "left",
            }}
          />

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={showCTAs ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: "clamp(24px, 3.5vh, 40px)",
              left: 0, right: 0,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              pointerEvents: "none",
            }}
          >
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}>
              Scroll to continue
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
        </div>

        {/* ── RIGHT: Video, framed by proscenium ── */}
        <div
          id="hero-video-col"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          style={{
            position: "relative",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: BLACK,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 4vw, 80px) clamp(28px, 3.5vw, 56px)",
            overflow: "hidden",
          }}
        >
          {/* Spotlight cone descending from above the stage */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0, left: "50%",
              transform: "translateX(-50%)",
              width: "140%",
              height: "60%",
              background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${GOLD}14 0%, ${GOLD}06 30%, transparent 65%)`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Marquee bulbs above the stage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
            aria-hidden
            style={{
              width: "100%",
              maxWidth: 720,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 clamp(12px, 2vw, 20px)",
              marginBottom: "clamp(8px, 1.2vw, 14px)",
              position: "relative",
              zIndex: 2,
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: GOLD,
                  boxShadow: `0 0 6px ${GOLD}90, 0 0 12px ${GOLD}50`,
                  animation: `heroBulb 1.6s ${i * 0.06}s infinite ease-in-out`,
                }}
              />
            ))}
          </motion.div>

          {/* Gold valance. arched gradient line beneath bulbs */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden
            style={{
              width: "100%",
              maxWidth: 720,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${GOLD}90, ${GOLD}, ${GOLD}90, transparent)`,
              boxShadow: `0 1px 8px ${GOLD}60`,
              transformOrigin: "center",
              marginBottom: 6,
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Center fleuron. programme ornament at the apex */}
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
            aria-hidden
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: GOLD,
              fontSize: 18,
              lineHeight: 1,
              marginBottom: "clamp(10px, 1.5vw, 18px)",
              position: "relative",
              zIndex: 2,
              textShadow: `0 0 14px ${GOLD}60`,
            }}
          >
            ❦
          </motion.span>

          {/* The stage. video frame with ornamental corners */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 720,
              aspectRatio: "16 / 9",
              zIndex: 2,
              boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${GOLD}40, 0 0 60px ${GOLD}18`,
            }}
          >
            {/* Ornamental corners. gold fleurons */}
            {[
              { top: -12, left: -12, rotate: 0 },
              { top: -12, right: -12, rotate: 90 },
              { bottom: -12, right: -12, rotate: 180 },
              { bottom: -12, left: -12, rotate: 270 },
            ].map(({ rotate, ...posStyle }, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  ...posStyle,
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  color: GOLD,
                  fontSize: 18,
                  transform: `rotate(${rotate}deg)`,
                  zIndex: 4,
                  textShadow: `0 0 8px ${GOLD}80`,
                }}
              >
                ✦
              </span>
            ))}

            {/* Video */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
              }}
            >
              <video
                ref={videoRef}
                src="/videos/HeroVideo.mp4"
                loop playsInline preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", background: "#131313" }}
              />
              {/* Bottom vignette for control readability */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(14,14,14,0.45) 0%, transparent 35%)",
                pointerEvents: "none",
              }} />

              {/* Unmute nudge — shown when browser fell back to muted autoplay */}
              <AnimatePresence>
                {isVideoMuted && isVideoPlaying && (
                  <motion.button
                    key="unmute-nudge"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    style={{
                      position: "absolute", top: 14, left: 14,
                      display: "flex", alignItems: "center", gap: 7,
                      backgroundColor: "rgba(0,0,0,0.72)",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${GOLD}55`,
                      padding: "6px 12px 6px 9px",
                      cursor: "pointer",
                      zIndex: 20,
                    }}
                  >
                    <VolumeX style={{ width: 12, height: 12, color: GOLD }} />
                    <span style={{
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: GOLD,
                    }}>
                      Tap to hear
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Video controls */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    style={{
                      position: "absolute", bottom: 20, left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex", alignItems: "center", gap: 2,
                      backgroundColor: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(14px)",
                      borderRadius: 999, padding: "6px 12px",
                      zIndex: 20,
                    }}
                  >
                    {[
                      { icon: isVideoPlaying ? Pause : Play, action: togglePlay },
                      { icon: isVideoMuted ? VolumeX : Volume2, action: toggleMute },
                      { icon: isFullscreen ? Minimize2 : Maximize2, action: toggleFs },
                    ].map(({ icon: Icon, action }, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); action(); }}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          padding: 6, background: "none", border: "none",
                          cursor: "pointer", color: "white", borderRadius: "50%",
                        }}
                      >
                        <Icon style={{ width: 14, height: 14 }} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stage floor. gold rule under the video */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden
            style={{
              width: "100%",
              maxWidth: 720,
              height: 1,
              marginTop: "clamp(14px, 2vw, 22px)",
              background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)`,
              transformOrigin: "center",
              position: "relative",
              zIndex: 2,
            }}
          />

          {/* Programme credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: "clamp(4px, 1vw, 16px)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: GOLD,
              opacity: 0.7,
            }}>
              On Stage
            </span>
            <span style={{ width: 14, height: 1, background: `${GOLD}50` }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
            }}>
              A NicheUX production
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
