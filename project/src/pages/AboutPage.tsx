"use client";

import { useEffect, useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker, Sphere, Graticule } from "react-simple-maps";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Music2, ExternalLink } from "lucide-react";
import Introtext from "../components/about/Introtext";
import Team from "../components/about/Team";
import TheWhy from "../components/about/TheWhy";
import Faq from "../components/about/Faq";

const GOLD      = "#E9C672";
const LAVENDER  = "#B097BE";
const BLUE      = "#89B1CC";
const BLACK     = "#0A0A0A";
const PARCHMENT = "#F1E9D2";
const INK       = "#1A1A1A";
const INK_SOFT  = "#5a5248";
const EASE      = [0.25, 0.46, 0.45, 0.94] as const;


// ── LOGO HERO — first section after the curtain ──────────────────────────────
function LogoHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE }}
      style={{ minHeight: "100vh", background: BLACK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}
      aria-label="NicheUX Studio"
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 52% 52% at 50% 48%, ${GOLD}09 0%, transparent 70%)`, pointerEvents: "none" }} />
      <motion.div aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: EASE }}
        style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}15, transparent)`, transformOrigin: "center", pointerEvents: "none" }}
      />
      <motion.img
        src="/images/LogoTaglineWhite.webp"
        alt="NicheUX Studio"
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
        style={{ width: "clamp(260px, 44vw, 680px)", height: "auto", filter: "drop-shadow(0 0 80px rgba(233,198,114,0.22))", position: "relative", zIndex: 1 }}
      />
      <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}
        style={{ position: "absolute", bottom: "clamp(24px,3vw,40px)", zIndex: 2 }}>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "block", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          SCROLL ↓
        </motion.span>
      </motion.div>
    </motion.section>
  );
}

// ── NUMBERS STRIP — parchment ─────────────────────────────────────────────────
function NumbersStrip() {
  const stats = [
    { val: "6",   label: "Disciplines", sub: "Under one roof",                                                              color: GOLD    },
    { val: "4+",  label: "Countries",   sub: "UK · Ireland · Canada · Malaysia · India",                                   color: LAVENDER },
    { val: "3",   label: "Live Sites",  sub: "Bloom & Brew · NandhiniDC · Kishore Aravind",   color: BLUE    },
    { val: "24h", label: "Response",    sub: "Proposal turnaround, every time",                                             color: GOLD    },
  ];

  return (
    <section style={{ background: PARCHMENT, borderTop: "1px solid rgba(26,26,26,0.07)", borderBottom: "1px solid rgba(26,26,26,0.07)" }} aria-label="Studio at a glance">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(26,26,26,0.08)" }} className="nums-strip">
        <style>{`
          @media(max-width:768px){ .nums-strip{ grid-template-columns: repeat(2,1fr) !important; } }
          @media(max-width:420px){ .nums-strip{ grid-template-columns: 1fr !important; } }
        `}</style>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            viewport={{ once: true }}
            style={{ background: PARCHMENT, padding: "clamp(28px,3.5vw,48px) clamp(20px,2.5vw,36px)" }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px,5.5vw,76px)", lineHeight: 1, color: s.color, marginBottom: 10 }}>
              {s.val}
            </div>
            <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: INK, marginBottom: 6 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: INK_SOFT, lineHeight: 1.65 }}>
              {s.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── STUDIO VALUES ─────────────────────────────────────────────────────────────
const VALUES = [
  {
    numeral: "I",
    title: "No account managers",
    body: "The person who designs your brand is the person you talk to. Every project, every time. There is no layer between your brief and the hands that build it.",
    accent: GOLD,
  },
  {
    numeral: "II",
    title: "Design is a decision",
    body: "Every colour, typeface, and spacing choice is an argument on behalf of your brand. We do not decorate. We decide, deliberately, in service of your story.",
    accent: BLUE,
  },
  {
    numeral: "III",
    title: "The story comes before the style",
    body: "We do not start with a mood board. We start with the story your brand needs to tell, the audience who needs to hear it, and the feeling that needs to land.",
    accent: LAVENDER,
  },
  {
    numeral: "IV",
    title: "Speed without compromise",
    body: "Fast does not mean shallow. We work quickly because we have systems, not shortcuts. Overnight does not mean overnight quality.",
    accent: GOLD,
  },
  {
    numeral: "V",
    title: "Craft is the point",
    body: "We care about the radius on the corner, the weight of the type at small sizes, the way the motion feels when the page loads. The details are not optional.",
    accent: BLUE,
  },
  {
    numeral: "VI",
    title: "We measure success by yours",
    body: "A beautiful website that does not convert is a beautiful failure. We track what the work does in the world, not just what it looks like on a portfolio.",
    accent: LAVENDER,
  },
];

function StudioValues() {
  return (
    <section style={{ background: PARCHMENT, borderTop: `1px solid rgba(26,26,26,0.07)` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(24px,5vw,80px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true }}
          style={{ marginBottom: "clamp(48px,6vw,80px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
            <div style={{ width: 44, height: 1, background: "rgba(26,26,26,0.15)" }} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)" }}>What we believe</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(40px,6vw,84px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: INK, margin: 0 }}>
            Six principles that<br />
            <span style={{ color: GOLD }}>guide every project.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(26,26,26,0.07)" }} className="values-grid">
          <style>{`@media(max-width:900px){.values-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){.values-grid{grid-template-columns:1fr!important}}`}</style>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.numeral}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }} viewport={{ once: true }}
              style={{ background: PARCHMENT, padding: "clamp(28px,3.5vw,48px) clamp(20px,2.5vw,36px)" }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px,3.5vw,44px)", color: `${v.accent}70`, lineHeight: 1, marginBottom: 16 }}>
                {v.numeral}
              </div>
              <h3 style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, fontSize: "clamp(13px,1.1vw,15px)", letterSpacing: "0.04em", color: v.accent, textTransform: "uppercase", margin: "0 0 12px" }}>
                {v.title}
              </h3>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.1vw,15px)", lineHeight: 1.8, color: INK_SOFT, margin: 0 }}>
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ORIGIN STORY ─────────────────────────────────────────────────────────────
function OriginStory() {
  return (
    <section style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }} aria-label="How NicheUX started">
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "clamp(96px,11vw,152px) clamp(24px,6vw,80px)" }}>
        <div className="origin-layout" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(48px,8vw,120px)", alignItems: "start" }}>
          <style>{`@media(max-width:768px){.origin-layout{grid-template-columns:1fr!important}}`}</style>

          {/* Left: year + founding quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }} viewport={{ once: true }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: `${GOLD}55` }} />
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: `${GOLD}65` }}>How It Started</span>
            </div>
            <div style={{ marginTop: 36, borderLeft: `2px solid ${GOLD}25`, paddingLeft: 20 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(15px,1.4vw,19px)", color: "rgba(255,255,255,0.32)", lineHeight: 1.65, margin: "0 0 14px" }}>
                "What if your creative partner acted like a world-class theatre director?"
              </p>
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.14)" }}>
                The Founding Idea
              </span>
            </div>
          </motion.div>

          {/* Right: narrative */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }} viewport={{ once: true }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(36px,5vw,72px)", lineHeight: 0.94, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 clamp(32px,4vw,52px)" }}
            >
              The gap was not a niche.<br /><span style={{ color: GOLD }}>It was a stage waiting to be built.</span>
            </motion.h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2.2vw,28px)" }}>
              {[
                "Brilliant founders were everywhere. Products that genuinely deserved attention were everywhere. What was missing was the creative partner who could make the world stop and look. Not an agency that handed the brief to a junior team the founder would never meet. Not a lone freelancer who might go quiet three weeks before launch.",
                "NicheUX was built to be the third option. Six disciplines brought together not because we needed to fill a roster, but because every great story needs more than one voice. A director needs a set designer. A composer needs a choreographer. And your brand needs people who understand that every pixel is an argument on your behalf.",
                "We took the agency model and stripped out everything that existed for the agency's convenience, not yours. No account managers. No templated decks. No strategy documents that fit everyone and therefore fit no one. What was left was what we actually care about: the work, the story, the result.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }} viewport={{ once: true }}
                  style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(14px,1.25vw,16px)", lineHeight: 1.95, color: "rgba(255,255,255,0.48)", margin: 0 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── GLOBE SECTION ─────────────────────────────────────────────────────────────
const GLOBE_CITIES = [
  { name: "London",  country: "England",  note: "Studio home",            lat: 51.5,  lng: -0.1,  accent: GOLD    },
  { name: "Toronto", country: "Canada",   note: "Bloom & Brew Coffee",    lat: 43.7,  lng: -79.4, accent: LAVENDER },
  { name: "Puchong", country: "Malaysia",  note: "Two clients. One city.", lat:  3.0,  lng: 101.6, accent: BLUE    },
  { name: "Chennai", country: "India",    note: "NandhiniDC Architecture",lat: 13.1,  lng:  80.3, accent: GOLD    },
  { name: "Dublin",  country: "Ireland",  note: "Sooraj Nikam",           lat: 53.3,  lng:  -6.3, accent: LAVENDER },
];

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Returns true only if the city is on the visible face of the globe
function cityVisible(cityLat: number, cityLng: number, rotLng: number): boolean {
  const toRad = (d: number) => d * Math.PI / 180;
  const centerLat = toRad(28);   // globe tilt is -28 so visible center is +28°
  const centerLng = toRad(-rotLng);
  const pLat = toRad(cityLat);
  const pLng = toRad(cityLng);
  const angle = Math.acos(
    Math.sin(centerLat) * Math.sin(pLat) +
    Math.cos(centerLat) * Math.cos(pLat) * Math.cos(pLng - centerLng)
  );
  return angle < Math.PI / 2;
}

function GlobeSection() {
  const [rotLng, setRotLng] = useState(2); // start with UK roughly centered

  useEffect(() => {
    const id = setInterval(() => setRotLng(r => r - 0.22), 33);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{ background: "#06060a", borderTop: "1px solid rgba(255,255,255,0.04)", overflow: "hidden", position: "relative" }}
      aria-label="Cities NicheUX has worked in"
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(1px 1px at 18% 28%, ${GOLD}18 0%, transparent 100%), radial-gradient(1px 1px at 72% 68%, ${LAVENDER}12 0%, transparent 100%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(24px,5vw,80px)", position: "relative" }}>
        <div className="globe-layout" style={{ display: "grid", gap: "clamp(48px,6vw,80px)", alignItems: "center" }}>
          <style>{`@media(min-width:840px){ .globe-layout{ grid-template-columns: 1fr 1fr; } }`}</style>

          {/* Left: heading + city legend */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE }} viewport={{ once: true }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: `${GOLD}50` }} />
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: `${GOLD}60` }}>
                Every city, a brief
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(40px,6vw,84px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 clamp(32px,4vw,52px)" }}>
              The work has{" "}
              <span style={{ color: GOLD }}>landed here.</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {GLOBE_CITIES.map((city, i) => (
                <motion.div key={city.name} initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease: EASE }} viewport={{ once: true }}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: city.accent, flexShrink: 0, boxShadow: `0 0 8px ${city.accent}90` }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(17px,1.8vw,24px)", color: city.accent, flexShrink: 0 }}>{city.name}</span>
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.22)", flex: 1 }}>{city.country}</span>
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.16)", fontStyle: "italic", textAlign: "right", flexShrink: 0 }}>{city.note}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: SVG orthographic globe */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: "clamp(280px, 44vw, 520px)",
              aspectRatio: "1",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#070d1a",
              border: `1px solid ${GOLD}38`,
              boxShadow: `0 0 80px ${GOLD}20, 0 0 0 1px rgba(255,255,255,0.03), inset 0 0 80px rgba(0,0,0,0.55)`,
            }}>
              <ComposableMap
                projection="geoOrthographic"
                projectionConfig={{ rotate: [rotLng, -28, 0], scale: 260 }}
                width={520}
                height={520}
                style={{ width: "100%", height: "100%" }}
              >
                <Sphere id="rsm-sphere" fill="#070d1a" stroke={`${GOLD}18`} strokeWidth={0.4} />
                <Graticule stroke="rgba(255,255,255,0.035)" strokeWidth={0.35} />
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1a3558"
                        stroke="#2a5080"
                        strokeWidth={0.4}
                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                      />
                    ))
                  }
                </Geographies>
                {GLOBE_CITIES.filter(city => cityVisible(city.lat, city.lng, rotLng)).map(city => (
                  <Marker key={city.name} coordinates={[city.lng, city.lat]}>
                    <circle r={6} fill={city.accent} stroke="rgba(0,0,0,0.55)" strokeWidth={1.5} />
                    <circle r={11} fill={city.accent} opacity={0.25} />
                  </Marker>
                ))}
              </ComposableMap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STUDIO PLAYLIST ───────────────────────────────────────────────────────────
const TRACKS = [
  {
    title: "I Have a Dream",
    artist: "ABBA",
    film: "The Album",
    lang: "English",
    note: "The overture of our studio; the optimistic spark that reminds us every great story deserves a stage.",
    href: "https://www.youtube.com/watch?v=ER_3h03omdE",
    accent: GOLD,
  },
  {
    title: "Aagaayam",
    artist: "S.P. Balasubrahmanyam",
    film: "Unakkum Enakkum",
    lang: "Tamil",
    note: "Our midnight anthem; the soundtrack of the 2 AM grind where early concepts first found their form.",
    href: "https://www.youtube.com/watch?v=bFCiXHoukBw",
    accent: LAVENDER,
  },
  {
    title: "The Architect",
    artist: "Kacey Musgraves",
    film: "Deeper Well",
    lang: "English",
    note: "A reminder that behind every creative flourish lies the precise, intentional blueprint of an architect.",
    href: "https://www.youtube.com/watch?v=UJ4LAE2HpCg",
    accent: BLUE,
  },
  {
    title: "A Million Dreams",
    artist: "Ziv Zaifman, Hugh Jackman",
    film: "The Greatest Showman",
    lang: "English",
    note: "Fuel for the imagination; the drive to build vibrant, impossible worlds that exist only in our sketches.",
    href: "https://www.youtube.com/watch?v=pSQk-4fddDI",
    accent: GOLD,
  },
  {
    title: "What a Wonderful World",
    artist: "Louis Armstrong",
    film: "Hello, Dolly! (1969)",
    lang: "English",
    note: "Our design filter; capturing the warmth, natural light, and wonder we aim to weave into every brand.",
    href: "https://www.youtube.com/watch?v=rBrd_3VMC3c",
    accent: LAVENDER,
  },
  {
    title: "Azhagu",
    artist: "G.V. Prakash Kumar",
    film: "Saivam",
    lang: "Tamil",
    note: "The heartbeat of our craft; an ode to the tactile, human details that give our work its authentic soul.",
    href: "https://www.youtube.com/watch?v=O0winofKgUU",
    accent: BLUE,
  },
  {
    title: "Kayilae Aagasam",
    artist: "Saindhavi",
    film: "Soorarai Pottru",
    lang: "Tamil",
    note: "The scale of our ambition; proof that with collective vision, even the sky is well within our grasp.",
    href: "https://www.youtube.com/watch?v=hjuAufsWqs0",
    accent: GOLD,
  },
  {
    title: "Secret of Success",
    artist: "A.R. Rahman",
    film: "Boys",
    lang: "Tamil",
    note: "The rhythm of the hustle; the unfiltered energy that drives our team to consistently outdo yesterday's best.",
    href: "https://www.youtube.com/watch?v=C39RnOYx22k",
    accent: LAVENDER,
  },
  {
    title: "Unwritten",
    artist: "Natasha Bedingfield",
    film: "Unwritten",
    lang: "English",
    note: "The blank canvas; a celebration of the fresh start and infinite possibility we find at the beginning of every project.",
    href: "https://www.youtube.com/watch?v=b7k0a5hYnSI",
    accent: BLUE,
  },
  {
    title: "Keep Your Head Up",
    artist: "Andy Grammer",
    film: "Andy Grammer",
    lang: "English",
    note: "The rhythm of resilience; the persistent drive that pushes our team forward through every creative challenge.",
    href: "https://www.youtube.com/watch?v=wq7edbqi9n0",
    accent: GOLD,
  },
  {
    title: "Manam Ninaithal",
    artist: "Harris Jayaraj",
    film: "7am Arivu",
    lang: "Tamil",
    note: "The quiet conviction; a reminder that what the mind truly believes, the hands will find a way to build.",
    href: "https://www.youtube.com/watch?v=uqj-gCCTlOc",
    accent: LAVENDER,
  },
];

function WaveformBars({ color, active }: { color: string; active: boolean }) {
  const heights = [4, 10, 7, 14, 9, 6, 12, 8, 5, 11, 6, 13, 7, 9, 5];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 20 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={active ? { height: [h, h * 1.6, h * 0.6, h] } : { height: h }}
          transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 2, background: color, borderRadius: 1, minHeight: 3 }}
        />
      ))}
    </div>
  );
}

function StudioPlaylist() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{ background: "#0a0a10", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}
      aria-label="The NicheUX Studio Score"
    >
      <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "35%", background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${LAVENDER}07 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(24px,5vw,80px)", position: "relative" }}>

        {/* Full-width header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: "clamp(48px,6vw,72px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Music2 size={11} color={`${LAVENDER}90`} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.38em", textTransform: "uppercase", color: `${LAVENDER}80` }}>
              The NicheUX Studio Score
            </span>
          </div>
          <div className="score-header-row" style={{ display: "grid", gap: "clamp(20px,4vw,48px)", alignItems: "end" }}>
            <style>{`@media(min-width:720px){ .score-header-row{ grid-template-columns: 1fr auto; } }`}</style>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(40px,5.5vw,80px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
              The NicheUX<br />
              <span style={{ color: LAVENDER }}>Studio Score.</span>
            </h2>
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: "clamp(13px,1.2vw,15px)", color: "rgba(255,255,255,0.28)", lineHeight: 1.9, maxWidth: 300, margin: 0 }}>
              Songs played on loop. Design does not happen in silence.
            </p>
          </div>
        </motion.div>

        {/* 2-column track grid */}
        <div className="tracks-grid" style={{ display: "grid", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          <style>{`@media(min-width:720px){ .tracks-grid{ grid-template-columns: 1fr 1fr; } }`}</style>

          {TRACKS.map((track, i) => (
            <motion.a
              key={track.title}
              href={track.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.04, ease: EASE }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                gap: "clamp(12px,1.5vw,20px)",
                textDecoration: "none",
                background: hovered === i ? "rgba(176,151,190,0.07)" : "#0a0a10",
                padding: "clamp(18px,2.2vw,26px) clamp(18px,2.2vw,26px)",
                transition: "background 0.2s",
                alignItems: "flex-start",
              }}
            >
              {/* Track number */}
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(28px,3vw,42px)", lineHeight: 1, color: `${track.accent}28`, flexShrink: 0, width: "clamp(32px,3.5vw,48px)", paddingTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(17px,1.8vw,24px)", lineHeight: 1.1, color: "#fff", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {track.title}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: track.accent }}>
                        {track.artist}
                      </span>
                      <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>
                        {track.film}
                      </span>
                      <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: `${LAVENDER}60`, border: `1px solid ${LAVENDER}28`, padding: "1px 5px" }}>
                        {track.lang}
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={11} color={hovered === i ? LAVENDER : "rgba(255,255,255,0.14)"} style={{ transition: "color 0.2s", flexShrink: 0, marginTop: 3 }} />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <WaveformBars color={hovered === i ? LAVENDER : "rgba(255,255,255,0.11)"} active={hovered === i} />
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.18)", fontStyle: "italic", lineHeight: 1.5, textAlign: "right", maxWidth: 180 }}>
                    {track.note}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(13px,1.2vw,15px)", color: "rgba(255,255,255,0.14)", marginTop: 24, lineHeight: 1.7 }}
        >
          The score grows as the studio does.
        </motion.p>
      </div>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [showRestOfPage, setShowRestOfPage] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: BLACK }}>
      <Helmet>
        <title>About NicheUX | The Ensemble Behind the Work</title>
        <meta name="description" content="Meet the NicheUX ensemble. Six designers, developers, and strategists under one roof. No account managers. The person who builds your brand is the person you talk to." />
        <meta property="og:title" content="About NicheUX | The Ensemble Behind the Work" />
        <meta property="og:description" content="Six disciplines. Zero compromise. Meet the team that builds digital stages for brands that want to be impossible to ignore." />
        <meta property="og:url" content="https://www.nicheux.com/about" />
        <link rel="canonical" href="https://www.nicheux.com/about" />
      </Helmet>

      {/* ── THE EXPERIENCE: void → noise → empty seats → curtain + logo ── */}
      <Introtext onComplete={() => setShowRestOfPage(true)} />

      {/* ── PAGE CONTENT — revealed after the curtain ── */}
      {showRestOfPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 1. Logo splash */}
          <LogoHero />

          {/* 2. Founding narrative */}
          <OriginStory />

          {/* 3. Stats at a glance — parchment */}
          <NumbersStrip />

          {/* 4. The ensemble */}
          <Team />

          {/* 5. Studio belief */}
          <TheWhy />

          {/* 6. Six principles — parchment */}
          <StudioValues />

          {/* 7. Globe */}
          <GlobeSection />

          {/* 8. Studio score */}
          <StudioPlaylist />

          {/* 9. FAQ */}
          <Faq />
        </motion.div>
      )}
    </div>
  );
}
