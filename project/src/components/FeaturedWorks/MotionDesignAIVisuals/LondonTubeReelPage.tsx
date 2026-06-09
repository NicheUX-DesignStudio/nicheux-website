import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BackToTopArrow() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  if (!isVisible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 50,
        padding: 16,
        background: '#1a1a1a',
        border: '1px solid rgba(176,151,190,0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={20} color="#B097BE" />
    </button>
  );
}

const PRINCIPLES = [
  {
    num: '01',
    name: 'Schema Hijacking',
    brand: 'SnoreLab',
    headline: 'Brain processes it as necessary information. Not as an ad.',
    body: 'SnoreLab mirrored the Tube Map visual language exactly: the roundel, the colour palette, the typeface. Your brain has seen that pattern ten thousand times and filed it as "critical transit information." By the time it registers as an advertisement, you have already read it. The cognitive shortcut does the work.',
    lesson: 'Existing mental models reduce cognitive load to zero. Design into the schema your audience already has.',
    accent: '#E9C672',
  },
  {
    num: '02',
    name: 'The Disfluency Effect',
    brand: 'Allica Bank',
    headline: 'Slightly harder to read means longer memory.',
    body: 'Allica Bank used non-standard grammar and typographic friction intentionally. When text is marginally harder to process, the brain allocates more cognitive resources to it. That additional processing creates stronger memory encoding. The poster you struggle slightly to read is the one you remember on the way home.',
    lesson: 'Intentional friction is a tool for long-term brand recall. Remove all friction and you remove all memorability.',
    accent: '#89B1CC',
  },
  {
    num: '03',
    name: 'Dual Coding',
    brand: 'Timpson',
    headline: 'Image IS the message. Two memory paths. Zero misinterpretation.',
    body: 'Timpson shaped the poster like a key. The text says "key cutting." The visual and verbal channels carry identical information simultaneously. Two independent memory pathways activated by one glance. This is why the Timpson poster requires no headline: the image already contains the complete message before language engages.',
    lesson: 'Visual and verbal reinforcement removes misinterpretation. When both channels say the same thing, the message is bulletproof.',
    accent: '#B097BE',
  },
];

export default function LondonTubeReelPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>London Underground Series. Behavioural Design in the Wild | NicheUX</title>
        <meta name="description" content="Schema Hijacking, Disfluency, and Dual Coding deconstructed from Victoria Line advertising. Captured at King's Cross peak hours. The London Underground as the world's best UX laboratory." />
        <meta property="og:title" content="London Underground Series | NicheUX Case Study" />
        <meta property="og:description" content="The Tube as the world's best UX laboratory. Three behavioural design principles deconstructed from real advertising." />
      </Helmet>

      <div style={{ background: '#0A0A0A', overflow: 'hidden' }}>

        {/* HERO */}
        <section
          ref={heroRef}
          style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', overflow: 'hidden', paddingBottom: 80, paddingTop: 96 }}
        >
          {/* Background orbs */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.11, 0.05] }}
              transition={{ duration: 16, repeat: Infinity }}
              style={{
                position: 'absolute',
                width: 900,
                height: 900,
                borderRadius: '50%',
                top: '-15%',
                right: '-15%',
                background: 'radial-gradient(circle, #B097BE 0%, transparent 70%)',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 20, repeat: Infinity, delay: 6 }}
              style={{
                position: 'absolute',
                width: 600,
                height: 600,
                borderRadius: '50%',
                bottom: '5%',
                left: '-8%',
                background: 'radial-gradient(circle, #89B1CC 0%, transparent 70%)',
              }}
            />
          </div>

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,0.25) 100%)' }} />

          <motion.div
            style={{ opacity: heroOpacity, y: heroY, position: 'relative', zIndex: 10, maxWidth: 1152, margin: '0 auto', padding: '0 32px', width: '100%' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(176,151,190,0.12)',
                border: '1px solid rgba(176,151,190,0.28)',
                color: '#B097BE',
                fontSize: 11,
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>
                Behavioural Design · Motion · London
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: "'Source Sans Pro', sans-serif" }}>Production No 14</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 0.9,
                marginBottom: 24,
                fontSize: 'clamp(52px, 8vw, 112px)',
                letterSpacing: '-0.04em',
              }}
            >
              London
              <br />
              Underground
              <span style={{
                display: 'block',
                color: '#B097BE',
                fontSize: 'clamp(22px, 3vw, 40px)',
                marginTop: '0.3em',
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
              }}>
                Series
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: 18,
                maxWidth: 560,
                lineHeight: 1.65,
              }}
            >
              Behavioural Design in the Wild. The London Underground is the world's most high-traffic UX laboratory. We went to find out why.
            </motion.p>
          </motion.div>
        </section>

        {/* PROJECT METADATA */}
        <section style={{ padding: '48px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            {[
              { label: 'Location', value: 'London, United Kingdom' },
              { label: 'Discipline', value: 'Behavioural Design · Motion' },
              { label: 'Captured At', value: "King's Cross, Peak Hours" },
              { label: 'Principles', value: 'Schema Hijacking · Disfluency · Dual Coding' },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</p>
                <p style={{ color: '#ffffff', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 17 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE BRIEF */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span style={{ color: 'rgba(176,151,190,0.6)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>The Concept</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#ffffff', lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.02em' }}>
                The London Underground is the world's most high-traffic UX laboratory.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 17, lineHeight: 1.7 }}>
                Most digital design fails because it ignores the environment. Designers work in silence, in controlled light, with infinite time and attention available. Real users have none of that. We took to the Victoria Line to find the mechanisms that make certain posters impossible to ignore in one of the noisiest environments on earth.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span style={{ color: 'rgba(176,151,190,0.6)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>What We Found</span>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
                Three principles keep appearing in the work that earns attention. Schema Hijacking. The Disfluency Effect. Dual Coding. These are not aesthetic choices. They are cognitive mechanisms. And they work identically whether you are designing a poster on the Northern Line or a checkout flow for a fintech product.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Footage captured on the Victoria Line at King\'s Cross peak hours',
                  'Design breakdowns overlaid using the NicheUX motion system',
                  'Three real advertisements. Three principles deconstructed.',
                  'Applied directly to NicheUX client work as a diagnostic framework',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#B097BE', marginTop: 9, flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* VIDEO */}
        <section style={{ padding: '0 0 80px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 32px' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ paddingTop: 64 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <div style={{ width: 32, height: 1, background: '#B097BE' }} />
                <span style={{ color: '#B097BE', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>The Reel</span>
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <video
                  src="/videos/london-tube-reel.mp4"
                  controls
                  poster="/images/london-tube-thumb.jpg"
                  style={{ width: '100%', display: 'block', background: '#0A0A0A' }}
                  preload="metadata"
                />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: "'Source Sans Pro', sans-serif", marginTop: 12, letterSpacing: '0.06em' }}>
                Footage captured at King's Cross · Victoria Line · 2026 · Design breakdowns overlaid using NicheUX motion system
              </p>
            </motion.div>
          </div>
        </section>

        {/* THREE PRINCIPLES */}
        <section style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 1, background: '#B097BE' }} />
                <span style={{ color: '#B097BE', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Three Principles Deconstructed</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px, 4.5vw, 58px)', color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Why these posters
                <br />
                <span style={{ color: '#B097BE', fontStyle: 'italic' }}>are impossible to ignore.</span>
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 }}
                  viewport={{ once: true, margin: '-40px' }}
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    padding: '48px 0',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '0 48px', alignItems: 'start' }}>
                    {/* Number */}
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 48, color: 'rgba(255,255,255,0.08)', lineHeight: 1, paddingTop: 4 }}>{p.num}</div>

                    {/* Main content */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(24px, 3vw, 38px)', color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>{p.name}</h3>
                        <span style={{
                          padding: '4px 12px',
                          border: `1px solid ${p.accent}40`,
                          color: p.accent,
                          fontSize: 10,
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: 600,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                        }}>
                          {p.brand}
                        </span>
                      </div>

                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 24px)', color: 'rgba(255,255,255,0.75)', marginBottom: 20, lineHeight: 1.4 }}>
                        {p.headline}
                      </p>

                      <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: 680, marginBottom: 24 }}>
                        {p.body}
                      </p>

                      {/* Design Lesson */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 20px', border: `1px solid ${p.accent}20`, background: `${p.accent}06` }}>
                        <div style={{ width: 32, height: 1, background: p.accent, marginTop: 11, flexShrink: 0 }} />
                        <div>
                          <span style={{ color: p.accent, fontSize: 9, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Design Lesson</span>
                          <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{p.lesson}</p>
                        </div>
                      </div>
                    </div>

                    {/* Accent line */}
                    <div style={{ width: 2, height: '100%', background: `linear-gradient(to bottom, ${p.accent}, transparent)`, opacity: 0.4, minHeight: 120 }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE STRATEGY */}
        <section style={{ padding: '80px 32px', background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
              <span style={{ color: 'rgba(26,26,26,0.5)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>How NicheUX Applies This</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px, 4vw, 48px)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                This reel is a diagnostic tool.
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {[
                {
                  step: '01',
                  title: 'Audit',
                  body: 'Identify the user schema. What pattern does your audience already have wired into their brain? What does the environment train them to expect? We map existing mental models before writing a single brief.',
                  accent: '#E9C672',
                },
                {
                  step: '02',
                  title: 'Friction',
                  body: 'Introduce disfluency at attention moments. Not friction that confuses, but friction that demands processing. The login flow, the CTA, the onboarding screen. These are where a deliberate pause creates recall.',
                  accent: '#89B1CC',
                },
                {
                  step: '03',
                  title: 'Reinforcement',
                  body: 'Dual code every call to action. If the visual says it and the text says it, there is no gap for misinterpretation. Every NicheUX deliverable is reviewed against this principle before it leaves the studio.',
                  accent: '#B097BE',
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{ padding: 32, background: '#ffffff', border: '1px solid rgba(26,26,26,0.1)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 32, color: 'rgba(26,26,26,0.15)', lineHeight: 1 }}>{s.step}</span>
                    <div style={{ width: 24, height: 1, background: s.accent, alignSelf: 'center' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 24, color: '#1a1a1a', marginBottom: 12, letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, lineHeight: 1.7, color: 'rgba(26,26,26,0.72)' }}>{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING QUOTE */}
        <section style={{ padding: '96px 32px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                <div style={{ width: 48, height: 1, background: '#B097BE' }} />
                <span style={{ color: 'rgba(176,151,190,0.6)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>The Outcome</span>
              </div>

              <blockquote style={{ margin: 0, padding: 0 }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(26px, 4vw, 48px)',
                  color: '#ffffff',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: 32,
                }}>
                  "The same brain rules that make a Tube poster impossible to ignore make a checkout flow impossible to abandon. The environment changes. The cognitive architecture does not."
                </p>
                <footer style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 32, height: 1, background: '#B097BE' }} />
                  <span style={{ color: 'rgba(176,151,190,0.8)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, letterSpacing: '0.08em' }}>NicheUX Behavioural Audit Framework</span>
                </footer>
              </blockquote>

              <div style={{ marginTop: 56, padding: '32px', border: '1px solid rgba(176,151,190,0.15)', background: 'rgba(176,151,190,0.04)' }}>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 16, lineHeight: 1.75, margin: 0 }}>
                  This reel bridges the physical and digital design worlds. The same three principles that earn attention on the Victoria Line are the ones applied to every NicheUX project: whether designing a squash event identity, a fintech checkout, or a LinkedIn banner for a data scientist. The environment changes. The human brain does not.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px, 4vw, 44px)', color: '#ffffff', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Want a behavioural audit on your product?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 16, lineHeight: 1.65, marginBottom: 32, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
                We apply the same diagnostic framework to digital interfaces: identify the schema, introduce the friction, reinforce the message.
              </p>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 32px',
                  background: '#B097BE',
                  color: '#0A0A0A',
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                Start a project <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* NEXT WORK */}
        <section style={{ padding: '64px 32px 80px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
            <div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Explore More</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 28, color: '#ffffff' }}>Midas Utara Engineering</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, marginTop: 4 }}>Video Editing · Multilingual · Technical Storytelling</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button
                onClick={() => navigate('/featured-work/midas')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  border: '1px solid rgba(176,151,190,0.4)',
                  color: '#B097BE',
                  background: 'transparent',
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                View Case Study <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: '#B097BE',
                  color: '#0A0A0A',
                  border: 'none',
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Start a project
              </button>
            </div>
          </div>
        </section>

      </div>

      <BackToTopArrow />
    </>
  );
}
