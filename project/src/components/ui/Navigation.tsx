"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, LAVENDER, BLACK } from "@/constants/theme";

const BLUE = "#89B1CC";
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICES = [
  { name: "Strategy & Design",               path: "/strategy-design",              discipline: "UI · UX · Research" },
  { name: "Web Development & E-Commerce",    path: "/web-development-ecommerce",    discipline: "React · Shopify · Custom Code" },
  { name: "Motion Design & AI Visuals",      path: "/motion-design-ai-visuals",     discipline: "Animation · Generative AI" },
  { name: "Print & Brand Design",            path: "/print-brand-design",           discipline: "Identity · Collateral · Print" },
  { name: "Social Media Marketing",          path: "/social-media-marketing",       discipline: "Strategy · Content · Growth" },
  { name: "Illustration & Character Design", path: "/illustration-character-design",discipline: "Editorial · Publishing · Gaming" },
] as const;

// Active client productions shown in Work dropdown
const WORKS = [
  { title: "Bloom & Brew",            sub: "Shopify · Web Dev",          path: "/featured-work/bloom-brew",        image: "/images/bloombrewhero.webp",                      accent: GOLD },
  { title: "NandhiniDC",              sub: "Web Design · Architecture",  path: "/featured-work/nandhinidc",        image: "/images/nandhinidc/stone-facade-1.webp",          accent: LAVENDER },
  { title: "Kishore's Portfolio Website", sub: "Portfolio · UX Design",   path: "/featured-work/kishore-portfolio", image: "/images/kishore-k29.jpg",                        accent: BLUE },
  { title: "Midas Engineering",       sub: "Motion · AI Visuals",        path: "/featured-work/midas",             image: "/images/midas-engineering-cover.jpg",             accent: GOLD },
  { title: "LinkedIn Banner",         sub: "Career Brand · Design",      path: "/featured-work/sooraj-linkedin",   image: "/images/sooraj/linkedin/banner-green.png",         accent: BLUE },
  { title: "The Generation Convo",    sub: "LinkedIn Carousel",          path: "/featured-work/sooraj-wanted",     image: "/images/sooraj/carousel/slide-1.png",             accent: GOLD },
  { title: "Kingdom of Sweets",       sub: "Brand · Print Design",       path: "/featured-work/sooraj-candy-shop", image: "/images/sooraj/candy/no-texture.png",            accent: LAVENDER },
  { title: "SSJC Tournament",         sub: "Print · Brand Design",       path: "/featured-work/ssjc-tournament",   image: "/images/ssjc/poster-leg1.jpeg",             accent: GOLD },
] as const;

// Shop products organised by category — id must match ARTIFACTS id in MerchPage
const SHOP_CATEGORIES = [
  {
    label: "Frames & Prints",
    accent: GOLD,
    items: [
      { name: "Illustrated Quote Frame", concept: "Anchored Memory", id: "quote-frame" },
      { name: "The Stage is Yours", concept: "The Threshold", badge: "Limited", id: "stage-print" },
      { name: "Custom Photo Frame", concept: "Narrative Border", id: "photo-frame" },
    ],
  },
  {
    label: "Mugs",
    accent: LAVENDER,
    items: [
      { name: '"Design is a Feeling" Mug', concept: "Daily Ritual", id: "manifesto-mug" },
      { name: "Custom Name Mug", concept: "Identity Piece", id: "name-mug" },
      { name: "Illustrated Scene Mug", concept: "Map of History", id: "scene-mug" },
    ],
  },
  {
    label: "Apparel",
    accent: BLUE,
    items: [
      { name: "NicheUX Story Tee", concept: "Wearable Manifesto", id: "story-tee" },
      { name: "Custom Quote Tee", concept: "Personal Verse", id: "quote-tee" },
      { name: '"Storytelling" Hoodie', concept: "Wearable Legacy", badge: "New", id: "hoodie" },
    ],
  },
  {
    label: "Books",
    accent: GOLD,
    items: [
      { name: "My Design Story", concept: "World Builder", badge: "Bestseller", id: "kids-book" },
      { name: "The Stage is Set", concept: "World Builder", id: "stage-book" },
      { name: "Custom Illustrated Mini-Book", concept: "Private Archive", id: "mini-book" },
    ],
  },
] as const;

const NAV_LINKS = [
  { label: "About",   path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog",    path: "/blog" },
] as const;

function isServiceActive(p: string) { return SERVICES.some(s => p === s.path); }
function isWorkActive(p: string)    { return p.startsWith("/featured-work"); }
function isShopActive(p: string)    { return p === "/shop" || p === "/merch"; }

export default function Navigation() {
  const [scrolled, setScrolled]             = useState(false);
  const [servicesOpen, setServicesOpen]     = useState(false);
  const [workOpen, setWorkOpen]             = useState(false);
  const [shopOpen, setShopOpen]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileWork, setMobileWork]         = useState(false);
  const [mobileShop, setMobileShop]         = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false); setMobileServices(false); setMobileWork(false); setMobileShop(false);
    setServicesOpen(false); setWorkOpen(false); setShopOpen(false);
  }, [location.pathname]);

  const go = (path: string) => {
    navigate(path);
    setServicesOpen(false); setWorkOpen(false); setShopOpen(false); setMobileOpen(false);
  };

  const active = (path: string) => location.pathname === path;

  const navBtnStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 5,
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize: 11, fontWeight: 600,
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: isActive ? LAVENDER : "rgba(255,255,255,0.52)",
    padding: "4px 0",
    transition: "color 0.25s ease",
  });

  const dropBase: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "#0C0C0C",
    border: "1px solid rgba(255,255,255,0.07)",
    borderTop: `2px solid ${GOLD}`,
    zIndex: 1001,
    boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
  };

  return (
    <>
      <nav style={{ position: "fixed", top: "var(--strip-h, 0px)", left: 0, right: 0, zIndex: 1000, backgroundColor: BLACK, borderBottom: scrolled ? `1px solid ${GOLD}28` : "1px solid rgba(255,255,255,0.05)", transition: "border-color 0.45s ease" }}>
        <style>{`
          .nav-d { display: flex; }
          .nav-m { display: none; }
          @media (max-width: 1100px) { .nav-d { display: none !important; } .nav-m { display: flex !important; } }
        `}</style>

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 72px)", height: "clamp(60px, 5.5vh, 76px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>

          {/* Logo */}
          <button onClick={() => go("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }} aria-label="NicheUX home">
            <img src="/images/LogoTaglineWhite.webp" alt="NicheUX" style={{ height: "clamp(32px, 4vh, 46px)", width: "auto" }} />
          </button>

          {/* Desktop */}
          <div className="nav-d" style={{ alignItems: "center", gap: "clamp(20px, 2.5vw, 36px)" }}>

            {/* Home */}
            <button
              onClick={() => navigate("/")}
              style={navBtnStyle(location.pathname === "/")}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = location.pathname === "/" ? LAVENDER : "rgba(255,255,255,0.52)"; }}
            >
              Home
            </button>

            {/* Services — full-width 3-column mega panel */}
            <div style={{ position: "static" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button style={navBtnStyle(isServiceActive(location.pathname))}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.color = isServiceActive(location.pathname) ? LAVENDER : "rgba(255,255,255,0.52)"; }}>
                Services
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", color: "inherit" }}><ChevronDown size={11} /></motion.span>
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.1, ease: EASE }}
                    style={{ ...dropBase, position: "fixed", top: "calc(var(--strip-h, 0px) + clamp(60px, 5.5vh, 76px))", left: 0, right: 0, padding: "24px clamp(24px, 5vw, 72px)", willChange: "transform, opacity" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ width: 20, height: 1, background: LAVENDER }} />
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 15, color: "rgba(255,255,255,0.45)" }}>Six disciplines. One studio.</span>
                        <div style={{ flex: 1 }} />
                        <button onClick={() => go("/contact")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, display: "flex", alignItems: "center", gap: 5 }}>
                          Start a project <ArrowRight size={10} />
                        </button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                        {SERVICES.map((svc, i) => {
                          const accents = [GOLD, LAVENDER, BLUE, GOLD, LAVENDER, BLUE];
                          const accent = accents[i];
                          return (
                            <button key={svc.path} onClick={() => go(svc.path)}
                              style={{ display: "flex", flexDirection: "column", gap: 6, padding: "18px 20px", background: active(svc.path) ? "rgba(255,255,255,0.04)" : "none", border: "none", borderLeft: `2px solid ${active(svc.path) ? accent : "transparent"}`, cursor: "pointer", textAlign: "left", transition: "background 0.15s, border-color 0.15s" }}
                              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; if (!active(svc.path)) e.currentTarget.style.borderLeftColor = `${accent}55`; }}
                              onMouseLeave={e => { e.currentTarget.style.background = active(svc.path) ? "rgba(255,255,255,0.04)" : "none"; if (!active(svc.path)) e.currentTarget.style.borderLeftColor = "transparent"; }}>
                              <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, fontWeight: 600, color: active(svc.path) ? accent : "rgba(255,255,255,0.85)" }}>{svc.name}</div>
                              <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>{svc.discipline}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Work — full-width mega panel with image grid */}
            <div style={{ position: "static" }} onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
              <button style={navBtnStyle(isWorkActive(location.pathname))}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.color = isWorkActive(location.pathname) ? LAVENDER : "rgba(255,255,255,0.52)"; }}>
                Work
                <motion.span animate={{ rotate: workOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", color: "inherit" }}><ChevronDown size={11} /></motion.span>
              </button>
              <AnimatePresence>
                {workOpen && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.1, ease: EASE }}
                    style={{ ...dropBase, position: "fixed", top: "calc(var(--strip-h, 0px) + clamp(60px, 5.5vh, 76px))", left: 0, right: 0, padding: "20px clamp(24px, 5vw, 72px)", willChange: "transform, opacity" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ width: 20, height: 1, background: GOLD }} />
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 15, color: "rgba(255,255,255,0.45)" }}>Every production. Every stage.</span>
                        <div style={{ flex: 1 }} />
                        <button onClick={() => go("/featured-work")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, display: "flex", alignItems: "center", gap: 5 }}>
                          View all <ArrowRight size={10} />
                        </button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8 }}>
                        {WORKS.map(w => (
                          <button key={w.path} onClick={() => go(w.path)}
                            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, transition: "transform 0.15s" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
                            <div style={{ aspectRatio: "3/2", overflow: "hidden", background: "#1a1a1a", marginBottom: 8, borderTop: `2px solid ${w.accent}` }}>
                              <img src={w.image} alt={w.title} loading="lazy" decoding="async"
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                                onError={e => { (e.target as HTMLImageElement).style.opacity = "0.08"; }}
                              />
                            </div>
                            <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.82)", marginBottom: 2, lineHeight: 1.3 }}>{w.title}</div>
                            <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{w.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shop — full-width mega-menu with all 12 products */}
            <div style={{ position: "static" }} onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button style={navBtnStyle(isShopActive(location.pathname))}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.color = isShopActive(location.pathname) ? LAVENDER : "rgba(255,255,255,0.52)"; }}>
                Shop
                <motion.span animate={{ rotate: shopOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", color: "inherit" }}><ChevronDown size={11} /></motion.span>
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
                    style={{ ...dropBase, position: "fixed", top: "calc(var(--strip-h, 0px) + clamp(60px, 5.5vh, 76px))", left: 0, right: 0, padding: "24px clamp(24px, 5vw, 72px)" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ width: 20, height: 1, background: GOLD }} />
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 16, color: "rgba(255,255,255,0.55)" }}>We make memories you can hold.</span>
                        <div style={{ flex: 1 }} />
                        <button onClick={() => go("/merch")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, display: "flex", alignItems: "center", gap: 5 }}>
                          Browse the Artifact Studio <ArrowRight size={10} />
                        </button>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                        {SHOP_CATEGORIES.map(cat => (
                          <div key={cat.label}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                              <div style={{ width: 12, height: 2, background: cat.accent }} />
                              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: cat.accent }}>{cat.label}</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              {cat.items.map(item => (
                                <button key={item.name} onClick={() => go(`/merch#${item.id}`)}
                                  style={{ background: "none", border: "none", borderLeft: `2px solid transparent`, cursor: "pointer", textAlign: "left", padding: "9px 0 9px 12px", transition: "border-color 0.15s, background 0.15s" }}
                                  onMouseEnter={e => { e.currentTarget.style.borderLeftColor = cat.accent; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                                  onMouseLeave={e => { e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.background = "none"; }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.82)", lineHeight: 1.3 }}>{item.name}</span>
                                    {'badge' in item && item.badge && <span style={{ background: cat.accent, color: BLACK, fontSize: 7, fontWeight: 700, letterSpacing: "0.14em", padding: "2px 5px" }}>{item.badge}</span>}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {NAV_LINKS.map(item => (
              <button key={item.path} onClick={() => { if (item.path === '/about') document.dispatchEvent(new CustomEvent('nicheux:about-click')); go(item.path); }}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: active(item.path) ? LAVENDER : "rgba(255,255,255,0.52)", padding: "4px 0", borderBottom: `1px solid ${active(item.path) ? LAVENDER : "transparent"}`, transition: "color 0.25s, border-color 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.color = active(item.path) ? LAVENDER : "rgba(255,255,255,0.52)"; }}>
                {item.label}
              </button>
            ))}

            <motion.button onClick={() => go("/contact")} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BLACK, backgroundColor: GOLD, border: "none", borderRadius: 2, padding: "10px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
              Start a Project <ArrowRight size={11} />
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-m" onClick={() => setMobileOpen(true)} aria-label="Open navigation"
            style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, padding: 8, alignItems: "center", justifyContent: "center" }}>
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)", zIndex: 9998 }} />
            <motion.div key="sb" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.28, ease: EASE }}
              style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "min(320px, 88vw)", background: "#0C0C0C", borderRight: "1px solid rgba(255,255,255,0.06)", zIndex: 9999, display: "flex", flexDirection: "column", overflowY: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(20px,6vw,28px)", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
                <img src="/images/LogoTaglineWhite.webp" alt="NicheUX" style={{ height: 38, width: "auto" }} />
                <button onClick={() => setMobileOpen(false)} aria-label="Close navigation" style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, padding: 4, display: "flex" }}><X size={22} /></button>
              </div>

              <div style={{ flex: 1, padding: "16px clamp(20px,6vw,28px)" }}>
                <MobileItem label="Home" onClick={() => go("/")} active={active("/")} />
                <MobileItem label="About" onClick={() => { document.dispatchEvent(new CustomEvent('nicheux:about-click')); go("/about"); }} active={active("/about")} />

                <MobileAccordion label="Services" isActive={isServiceActive(location.pathname)} open={mobileServices} toggle={() => setMobileServices(p => !p)}>
                  {SERVICES.map(s => <MobileSub key={s.path} label={s.name} onClick={() => go(s.path)} active={active(s.path)} />)}
                </MobileAccordion>

                <MobileAccordion label="Work" isActive={isWorkActive(location.pathname)} open={mobileWork} toggle={() => setMobileWork(p => !p)}>
                  <MobileSub label="All Work" onClick={() => go("/featured-work")} active={active("/featured-work")} gold />
                  {WORKS.map(w => <MobileSub key={w.path} label={w.title} onClick={() => go(w.path)} active={active(w.path)} />)}
                </MobileAccordion>

                <MobileAccordion label="Shop" isActive={isShopActive(location.pathname)} open={mobileShop} toggle={() => setMobileShop(p => !p)}>
                  <MobileSub label="Browse All Artifacts" onClick={() => go("/shop")} active={isShopActive(location.pathname)} gold />
                  {SHOP_CATEGORIES.map(cat => cat.items.map(item => (
                    <MobileSub key={item.name} label={item.name} onClick={() => go(`/merch#${item.id}`)} active={false} />
                  )))}
                </MobileAccordion>

                <MobileItem label="Gallery" onClick={() => go("/gallery")} active={active("/gallery")} />
                <MobileItem label="Blog" onClick={() => go("/blog")} active={active("/blog")} />
              </div>

              <div style={{ padding: "16px clamp(20px,6vw,28px) 28px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
                <button onClick={() => go("/contact")}
                  style={{ width: "100%", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BLACK, background: GOLD, border: "none", borderRadius: 2, padding: "14px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  Start a Project <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileItem({ label, onClick, active }: { label: string; onClick: () => void; active: boolean }) {
  return (
    <button onClick={onClick} style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: active ? GOLD : "rgba(255,255,255,0.65)" }}>
      {label}
    </button>
  );
}

function MobileAccordion({ label, isActive, open, toggle, children }: { label: string; isActive: boolean; open: boolean; toggle: () => void; children: React.ReactNode }) {
  return (
    <div>
      <button onClick={toggle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: isActive ? GOLD : "rgba(255,255,255,0.65)" }}>
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ display: "flex", color: GOLD }}><ChevronDown size={15} /></motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
            <div style={{ paddingTop: 4, paddingBottom: 4 }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSub({ label, onClick, active, gold }: { label: string; onClick: () => void; active: boolean; gold?: boolean }) {
  return (
    <button onClick={onClick} style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "9px 0 9px 14px", borderLeft: `2px solid ${active || gold ? GOLD : "rgba(255,255,255,0.08)"}`, marginBottom: 2, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: gold ? 600 : 400, color: active || gold ? GOLD : "rgba(255,255,255,0.5)" }}>
      {label}
    </button>
  );
}
