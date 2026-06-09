"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE, BLACK } from "@/constants/theme";

const INK = "#0A0A0A";

const MESSAGES = [
  { label: "Now Booking", body: "Q3 2026 productions · limited availability", cta: "Book a call", href: "/contact", bg: GOLD },
  { label: "On Stage", body: "Custom-coded websites from £3,200", cta: "See packages", href: "/web-development-ecommerce", bg: LAVENDER },
  { label: "Encore", body: "Full brand identity systems for studios and founders", cta: "Open the brief", href: "/print-brand-design", bg: BLUE },
];

export default function AnnouncementStrip() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--strip-h", dismissed ? "0px" : "40px");
  }, [dismissed]);

  // Auto-rotate every 5s
  useEffect(() => {
    if (dismissed || MESSAGES.length <= 1) return;
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % MESSAGES.length);
        setFading(false);
      }, 200);
    }, 5000);
    return () => clearInterval(t);
  }, [dismissed]);

  if (dismissed) return null;

  const m = MESSAGES[index];

  function goTo(i: number) {
    setFading(true);
    setTimeout(() => { setIndex(i); setFading(false); }, 180);
  }

  return (
    <div role="region" aria-label="Studio announcements"
      style={{ background: m.bg, position: "fixed", top: 0, left: 0, right: 0, overflow: "hidden", zIndex: 1002, height: 40, display: "flex", alignItems: "center", transition: "background 0.4s" }}>

      <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto", padding: "0 clamp(12px, 4vw, 40px)", display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 20px)" }}>

        {/* Clickable content area — the whole label + body + CTA is one link */}
        <Link to={m.href} style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 16px)", flex: 1, minWidth: 0, textDecoration: "none", opacity: fading ? 0 : 1, transition: "opacity 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}>

          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: INK, flexShrink: 0 }}>
            {m.label}
          </span>

          <span aria-hidden style={{ width: 1, height: 12, background: "rgba(10,10,10,0.25)", flexShrink: 0 }} />

          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(13px,1.2vw,15px)", color: INK, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {m.body}
          </span>

          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, borderBottom: "1px solid rgba(10,10,10,0.4)", paddingBottom: 1, whiteSpace: "nowrap", flexShrink: 0 }}>
            {m.cta} →
          </span>
        </Link>

        {/* Dot nav */}
        {MESSAGES.length > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <button onClick={() => goTo((index - 1 + MESSAGES.length) % MESSAGES.length)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(10,10,10,0.45)", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ChevronLeft size={11} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {MESSAGES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Announcement ${i + 1}`}
                  className="pagination-dot-tiny"
                  style={{ background: i === index ? "rgba(10,10,10,0.65)" : "rgba(10,10,10,0.28)", transition: "background 0.3s" }} />
              ))}
            </div>
            <button onClick={() => goTo((index + 1) % MESSAGES.length)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(10,10,10,0.45)", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ChevronRight size={11} />
            </button>
          </div>
        )}

        {/* Dismiss */}
        <button onClick={() => setDismissed(true)} aria-label="Dismiss"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(10,10,10,0.45)", display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, padding: 0, flexShrink: 0, transition: "color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = INK; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(10,10,10,0.45)"; }}>
          <X size={11} />
        </button>
      </div>
    </div>
  );
}
