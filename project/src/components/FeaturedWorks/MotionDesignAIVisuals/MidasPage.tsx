import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp, Play } from 'lucide-react';
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
        border: '1px solid rgba(233,198,114,0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.2s',
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={20} color="#E9C672" />
    </button>
  );
}

const DELIVERABLES = [
  {
    lang: 'English',
    file: 'Midas%20(Eng).mp4',
    label: 'Professional & Global',
    format: 'Full HD Promo Reel',
    accent: '#E9C672',
    num: '01',
  },
  {
    lang: 'Malay',
    file: 'Midas%20(Mal).mp4',
    label: 'Local Integration',
    format: 'Full HD Promo Reel',
    accent: '#89B1CC',
    num: '02',
  },
  {
    lang: 'Tamil',
    file: 'Midas%20(Tam).mp4',
    label: 'Regional Engagement',
    format: 'Full HD Promo Reel',
    accent: '#B097BE',
    num: '03',
  },
];

const RAW_FOOTAGE = [
  { file: 'midasvideo.mp4', label: 'Raw Footage 01', num: '01' },
  { file: 'midasvideo2.mp4', label: 'Raw Footage 02', num: '02' },
];

const DESIGN_PRINCIPLES = [
  {
    title: 'Precision Over Flash',
    body: 'Industrial clients distrust cosmetic gloss. Every edit decision was made to amplify the engineering achievement, not decorate over it. SCADA readouts, pressure gauges, flow metrics: these appear because they are proof points, not filler.',
    accent: '#E9C672',
  },
  {
    title: 'Professional Pacing',
    body: 'Raw footage runs at the pace of a working plant. The edit reconstructs it at the pace of a boardroom presentation. Each cut is motivated by a technical highlight, not a beat drop.',
    accent: '#89B1CC',
  },
  {
    title: 'Multilingual Parity',
    body: 'All three versions carry identical visual rhythm and production quality. English does not lead and Malay and Tamil follow. Each version was built for its audience, not translated from a master cut.',
    accent: '#B097BE',
  },
];

export default function MidasPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Midas Utara Engineering. Biogas Flaring System | NicheUX Case Study</title>
        <meta name="description" content="Multilingual promotional reel for Midas Utara Engineering's biogas flaring system at Carlsberg Shah Alam. English, Malay, and Tamil versions. Technical storytelling for industrial clients." />
        <meta property="og:title" content="Midas Utara Engineering. Biogas Flaring System | NicheUX" />
        <meta property="og:description" content="Three languages. One engineering standard. Raw footage elevated into a multilingual marketing asset for regional industrial clients." />
      </Helmet>

      <div style={{ background: '#0A0A0A', overflow: 'hidden' }}>

        {/* HERO */}
        <section
          ref={heroRef}
          style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', overflow: 'hidden', paddingBottom: 80, paddingTop: 96 }}
        >
          {/* Hero image — extracted from the actual Midas Engineering video */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <img src="/images/midas-engineering-cover.jpg" alt="Midas Utara Engineering biogas facility at Carlsberg Shah Alam"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.55, filter: 'saturate(0.7) contrast(1.05)' }}
              onError={e => { (e.target as HTMLImageElement).src = '/images/MotionGraphicsAIVisualsHero.webp'; }} />
          </div>

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.35) 100%)' }} />

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
                background: 'rgba(233,198,114,0.12)',
                border: '1px solid rgba(233,198,114,0.28)',
                color: '#E9C672',
                fontSize: 11,
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>
                Video Editing · Multilingual · Technical Storytelling
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: "'Source Sans Pro', sans-serif" }}>Production No 13</span>
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
              Midas Utara
              <span style={{
                display: 'block',
                color: '#E9C672',
                fontSize: 'clamp(22px, 3vw, 40px)',
                marginTop: '0.3em',
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
              }}>
                Engineering
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: 18,
                maxWidth: 520,
                lineHeight: 1.65,
              }}
            >
              Biogas flaring system for Carlsberg Shah Alam. Three languages. One engineering standard. Raw footage transformed into a multilingual marketing asset.
            </motion.p>
          </motion.div>
        </section>

        {/* PROJECT METADATA */}
        <section style={{ padding: '48px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            {[
              { label: 'Client', value: 'Midas Utara Engineering' },
              { label: 'Project', value: 'Biogas Flaring System' },
              { label: 'Location', value: 'Shah Alam, Malaysia' },
              { label: 'Discipline', value: 'Video · Multilingual Adaptation' },
              { label: 'Deliverables', value: '3 Localised Promo Reels' },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</p>
                <p style={{ color: '#ffffff', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 18 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE BRIEF + CHALLENGE */}
        <section style={{ padding: '80px 32px', maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span style={{ color: 'rgba(233,198,114,0.6)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>The Brief</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#ffffff', lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.02em' }}>
                Elevate raw industrial footage into a professional marketing asset. In three languages.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 17, lineHeight: 1.7 }}>
                Midas Utara Engineering had raw footage of a biogas flaring system installed for Carlsberg Shah Alam's wastewater treatment plant. The footage was real. The engineering was impressive. The goal was to turn it into a promotional reel that could speak to regional clients in English, Malay, and Tamil without losing any of the technical authority.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span style={{ color: 'rgba(233,198,114,0.6)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>The Challenge</span>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
                Raw footage captures technical reality. Flares burning. SCADA interfaces with live pressure and flow metrics. Temperature readings. But technical reality does not sell a vision. The challenge was building a narrative from the engineering achievements without softening them.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'SCADA readouts showing pressure stability and flow metrics as trust signals',
                  'Consistent visual rhythm across all three language versions',
                  'Localization without hierarchy: no version is more important than another',
                  'Narrative arc from raw footage to engineering partner positioning',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#E9C672', marginTop: 9, flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CLIENT SUPPLIED RAW FOOTAGE */}
        <section style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Client Supplied Raw Footage</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(24px, 3vw, 38px)', color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.02em' }}>
                What we started with.
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {RAW_FOOTAGE.map((item, i) => (
                <motion.div
                  key={item.file}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>{item.num}</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</span>
                    </div>
                    <Play size={12} color="rgba(255,255,255,0.3)" />
                  </div>
                  <video
                    src={`/videos/${item.file}`}
                    controls
                    style={{ width: '100%', display: 'block', background: '#0A0A0A' }}
                    preload="metadata"
                    poster="/images/midas-engineering-cover.jpg"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section style={{ padding: '80px 32px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 1, background: '#E9C672' }} />
                <span style={{ color: '#E9C672', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>The Deliverables</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Three languages.
                <br />
                <span style={{ color: '#E9C672', fontStyle: 'italic' }}>One engineering standard.</span>
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
              {DELIVERABLES.map((d, i) => (
                <motion.div
                  key={d.lang}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, margin: '-60px' }}
                  style={{ borderTop: `1px solid ${i === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`, paddingTop: 40 }}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>{d.num}</span>
                    <div style={{ width: 32, height: 1, background: d.accent, alignSelf: 'center' }} />
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(22px, 2.5vw, 34px)', color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
                      {d.lang} Version
                    </h3>
                    <span style={{
                      marginLeft: 'auto',
                      padding: '4px 12px',
                      border: `1px solid ${d.accent}40`,
                      color: d.accent,
                      fontSize: 10,
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}>
                      {d.label}
                    </span>
                  </div>

                  {/* Video */}
                  <div style={{ border: `1px solid rgba(255,255,255,0.06)`, overflow: 'hidden', marginBottom: 16 }}>
                    <video
                      src={`/videos/${d.file}`}
                      controls
                      style={{ width: '100%', display: 'block', background: '#0A0A0A' }}
                      preload="auto"
                    />
                  </div>

                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: "'Source Sans Pro', sans-serif", letterSpacing: '0.08em' }}>
                    {d.format} · {d.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN PRINCIPLES */}
        <section style={{ padding: '80px 32px', background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
              <span style={{ color: 'rgba(26,26,26,0.5)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Design Principles</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px, 4vw, 48px)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                What guides every edit decision.
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {DESIGN_PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{ padding: 32, background: '#ffffff', border: '1px solid rgba(26,26,26,0.1)' }}
                >
                  <div style={{ width: 32, height: 2, background: p.accent, marginBottom: 20 }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 22, color: '#1a1a1a', marginBottom: 12, letterSpacing: '-0.01em' }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, lineHeight: 1.7, color: 'rgba(26,26,26,0.75)' }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE OUTCOME */}
        <section style={{ padding: '96px 32px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span style={{ color: 'rgba(233,198,114,0.6)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>The Outcome</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(30px, 5vw, 58px)', color: '#ffffff', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.03em' }}>
                From service provider
                <br />
                <span style={{ color: '#E9C672', fontStyle: 'italic' }}>to engineering partner.</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                Three localised promotional reels. A scalable template for future industrial projects. A visual identity that positions Midas Utara Engineering as a trusted partner rather than a vendor, across three regional languages simultaneously.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginBottom: 48 }}>
                {[
                  { num: '3', label: 'Localised Reels' },
                  { num: '3', label: 'Languages' },
                  { num: '1', label: 'Scalable Template' },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 48, color: '#E9C672', lineHeight: 1 }}>{stat.num}</div>
                    <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 28px',
                  background: '#E9C672',
                  color: '#0A0A0A',
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
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
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Next Production</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 28, color: '#ffffff' }}>London Underground Series</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, marginTop: 4 }}>Behavioural Design in the Wild · Motion Reel</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button
                onClick={() => navigate('/featured-work/london-tube-reel')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  border: '1px solid rgba(233,198,114,0.4)',
                  color: '#E9C672',
                  background: 'transparent',
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
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
                  background: '#E9C672',
                  color: '#0A0A0A',
                  border: 'none',
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
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
