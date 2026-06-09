"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GOLD    = "#E9C672";
const LAVENDER= "#B097BE";
const BLUE    = "#89B1CC";
const BLACK   = "#0A0A0A";
const EASE    = [0.25, 0.46, 0.45, 0.94] as const;

const navigateWithScroll = (navigate: ReturnType<typeof useNavigate>, path: string) => {
  navigate(path);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const SERVICES = [
  { name: "Strategy & Design",               path: "/strategy-design",               accent: LAVENDER },
  { name: "Web Development & E-Commerce",    path: "/web-development-ecommerce",     accent: BLUE },
  { name: "Motion Design & AI Visuals",      path: "/motion-design-ai-visuals",      accent: LAVENDER },
  { name: "Print & Brand Design",            path: "/print-brand-design",            accent: GOLD },
  { name: "Social Media Marketing",          path: "/social-media-marketing",        accent: GOLD },
  { name: "Illustration & Character Design", path: "/illustration-character-design", accent: LAVENDER },
];

const LINKS = [
  { name: "Home",    path: "/" },
  { name: "About",   path: "/about" },
  { name: "Work",    path: "/featured-work" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog",    path: "/blog" },
  { name: "Shop",    path: "/shop" },
  { name: "Contact", path: "/contact" },
];

const LEGAL = [
  { name: "Privacy", path: "/privacy" },
  { name: "Terms",   path: "/terms" },
  { name: "Cookies", path: "/cookies" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  TikTok: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  Threads: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c0-3.518.85-6.372 2.495-8.423C5.845 1.26 8.598.08 12.18.056h.014c2.746.02 5.043.725 6.826 2.09 1.82 1.394 3.016 3.437 3.556 6.066l-3.73.714c-.752-3.532-2.982-5.373-6.652-5.373h-.007c-2.44.017-4.228.797-5.307 2.318-1.144 1.613-1.381 3.86-1.381 5.129v.068c0 1.27.237 3.516 1.381 5.13 1.079 1.52 2.867 2.3 5.307 2.318h.007c1.843-.024 3.24-.578 4.278-1.692.8-.86 1.3-2.052 1.486-3.543l-3.786-.72c-.11.816-.398 1.462-.828 1.93-.567.625-1.381.944-2.482.96-.86-.012-1.569-.23-2.13-.654-1.28-.955-1.62-2.695-1.62-3.955V12c0-1.26.34-3 1.62-3.954.56-.423 1.27-.641 2.13-.653 1.101.015 1.915.334 2.482.96.43.468.717 1.113.828 1.93l3.786-.72c-.187-1.492-.687-2.685-1.486-3.544C15.44 4.91 16.043 4.36 14.2 4.336h-.014c-1.843.024-3.24.578-4.278 1.692z"/></svg>,
  LinkedIn: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  YouTube: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,
  Medium: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>,
};

const SOCIALS = [
  { name: "Instagram", url: "https://instagram.com/nicheux.studio" },
  { name: "TikTok",    url: "https://tiktok.com/@nicheux.studio" },
  { name: "Threads",   url: "https://threads.net/@nicheux.studio" },
  { name: "LinkedIn",  url: "https://linkedin.com/company/nicheux" },
  { name: "YouTube",   url: "https://youtube.com/@nicheux" },
  { name: "Medium",    url: "https://medium.com/@nicheux" },
];

export default function Footer() {
  const navigate = useNavigate();
  const nav = (path: string) => navigateWithScroll(navigate, path);

  return (
    <footer style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>

      {/* Ambient glow */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: "20%", width: "60vw", height: "40vw", background: `radial-gradient(ellipse, ${GOLD}04 0%, transparent 65%)`, pointerEvents: "none" }} />

      {/* ── STATEMENT BLOCK ── */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "clamp(64px,8vw,112px) clamp(24px,5.5vw,88px)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48, flexWrap: "wrap", maxWidth: 1400, margin: "0 auto" }}>

          <div style={{ flex: 1, minWidth: 260 }}>
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.36em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 28 }}>
              Based in United Kingdom
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(44px,6.5vw,96px)", lineHeight: 0.9, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 36px" }}>
              Every story<br />
              deserves a{" "}
              <em style={{ color: GOLD }}>stage.</em>
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => nav("/contact")}
              style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", background: GOLD, color: BLACK, border: "none", padding: "15px 36px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Start Your Project <ArrowRight size={12} />
            </motion.button>
          </div>

          {/* Right: contact + social */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-end", minWidth: 220 }}>
            <a href="mailto:hellonicheux@gmail.com"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(16px,1.8vw,22px)", color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = BLUE; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)"; }}>
              hellonicheux@gmail.com
            </a>
            <a href="https://wa.me/447342736804" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.7)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#25D366"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}>
              +44 7342 736804
            </a>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {SOCIALS.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{ width: 38, height: 38, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, background 0.2s, color 0.2s", color: "rgba(255,255,255,0.8)" }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = GOLD; a.style.background = `${GOLD}10`; a.style.color = GOLD; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "rgba(255,255,255,0.08)"; a.style.background = "transparent"; a.style.color = "rgba(255,255,255,0.55)"; }}>
                  {SOCIAL_ICONS[s.name]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── NAV COLUMNS ── */}
      <div style={{ padding: "clamp(40px,5vw,64px) clamp(24px,5.5vw,88px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        className="footer-cols">
        <style>{`
          .footer-cols { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: clamp(32px,4vw,64px); max-width: 1400px; margin: 0 auto; }
          @media(max-width:768px){ .footer-cols{ grid-template-columns: 1fr 1fr !important; } }
          @media(max-width:480px){ .footer-cols{ grid-template-columns: 1fr !important; } }
        `}</style>

        {/* Services */}
        <div>
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 20px" }}>Services</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {SERVICES.map(s => (
              <li key={s.path}>
                <button onClick={() => nav(s.path)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,14px)", color: "rgba(255,255,255,0.72)", transition: "color 0.15s", textAlign: "left" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = s.accent; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  <span style={{ width: 14, height: 1, background: "currentColor", flexShrink: 0 }} />
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 20px" }}>Navigation</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {LINKS.map(l => (
              <li key={l.path}>
                <button onClick={() => nav(l.path)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,14px)", color: "rgba(255,255,255,0.72)", transition: "color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = LAVENDER; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  {l.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand + trust */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <img src="/images/LogoTaglineWhite.webp" alt="NicheUX" style={{ height: 52, width: "auto", marginBottom: 14, opacity: 0.85 }} />
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", margin: 0 }}>
              Design, strategy, and storytelling for brands that want to matter.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["24h Quote Response", "No Lock-in Contracts", "100% UK-Based Team"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ padding: "18px clamp(24px,5.5vw,88px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.55)", margin: 0 }}>
          &copy; {new Date().getFullYear()} NicheUX Ltd. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {LEGAL.map(l => (
            <button key={l.path} onClick={() => nav(l.path)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.55)", transition: "color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.18)"; }}>
              {l.name}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
