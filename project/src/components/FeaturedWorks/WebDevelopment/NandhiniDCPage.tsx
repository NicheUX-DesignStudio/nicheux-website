import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ExternalLink, ArrowUp, ChevronLeft, ChevronRight, Sun, Sunset, Moon, Monitor, Smartphone } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const GOLD = "#E9C672";
const LAVENDER = "#B097BE";
const BLUE = "#89B1CC";

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
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#E9C672]/30 hover:border-[#E9C672] transition-all group shadow-xl"
      aria-label="Back to top"
    >
      <ArrowUp size={20} className="text-[#E9C672]" />
    </button>
  );
}

// Daylight toggle. Stone One's signature interaction, shown as a concept
function DaylightToggle() {
  const [mode, setMode] = useState<'morning' | 'golden' | 'twilight'>('golden');

  const modes = {
    morning: {
      label: 'Morning',
      icon: Sun,
      bg: 'from-[#87CEEB]/20 to-[#FFF8DC]/10',
      accent: '#87CEEB',
      overlay: 'Morning light washes the stone in cool clarity. The structure breathes.',
    },
    golden: {
      label: 'Golden Hour',
      icon: Sunset,
      bg: 'from-[#E9C672]/20 to-[#D4A853]/10',
      accent: '#E9C672',
      overlay: 'Golden hour turns every surface to warmth. Architecture becomes emotion.',
    },
    twilight: {
      label: 'Twilight',
      icon: Moon,
      bg: 'from-[#B097BE]/20 to-[#1a1a2e]/20',
      accent: '#B097BE',
      overlay: 'At dusk the building withdraws into silence. Space becomes meditation.',
    },
  };

  const current = modes[mode];
  const Icon = current.icon;

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${current.bg} transition-all duration-700 p-8 md:p-12`}>
      <div className="flex flex-wrap gap-2 mb-8">
        {(Object.keys(modes) as Array<keyof typeof modes>).map((m) => {
          const MIcon = modes[m].icon;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans-medium transition-all ${
                mode === m
                  ? 'text-black'
                  : 'bg-white/5 text-white/50 hover:text-white/80'
              }`}
              style={mode === m ? { backgroundColor: current.accent } : {}}
            >
              <MIcon size={14} />
              {modes[m].label}
            </button>
          );
        })}
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden mb-6" style={{
        background: mode === 'morning'
          ? 'linear-gradient(135deg, hsl(100,53%,10%) 0%, hsl(200,40%,18%) 100%)'
          : mode === 'golden'
          ? 'linear-gradient(135deg, hsl(100,53%,6%) 0%, hsl(40,30%,14%) 100%)'
          : 'linear-gradient(135deg, hsl(100,53%,4%) 0%, hsl(260,20%,10%) 100%)',
        transition: 'background 0.7s ease',
      }}>
        {/* Blueprint grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: `linear-gradient(${current.accent}20 1px, transparent 1px), linear-gradient(90deg, ${current.accent}20 1px, transparent 1px)`, backgroundSize: '40px 40px', transition: 'opacity 0.7s' }} />
        {/* Colour wash overlay */}
        <div className="absolute inset-0 transition-all duration-700" style={{
          background: mode === 'morning'
            ? 'radial-gradient(ellipse at 30% 40%, rgba(135,206,235,0.18) 0%, transparent 65%)'
            : mode === 'golden'
            ? 'radial-gradient(ellipse at 30% 40%, rgba(233,198,114,0.22) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 30% 40%, rgba(176,151,190,0.20) 0%, transparent 65%)',
        }} />
        {/* Tamil watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(64px,10vw,110px)', color: `${current.accent}18`, lineHeight: 1, transition: 'color 0.7s', letterSpacing: '0.06em' }}>
            நந்தினி
          </span>
        </div>
        {/* Abstract architectural lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet" style={{ opacity: 0.15 }}>
          <line x1="120" y1="60" x2="120" y2="390" stroke={current.accent} strokeWidth="0.5" />
          <line x1="120" y1="390" x2="680" y2="390" stroke={current.accent} strokeWidth="0.5" />
          <line x1="680" y1="60" x2="680" y2="390" stroke={current.accent} strokeWidth="0.5" />
          <rect x="200" y="200" width="160" height="190" fill="none" stroke={current.accent} strokeWidth="0.5" />
          <rect x="440" y="200" width="160" height="190" fill="none" stroke={current.accent} strokeWidth="0.5" />
          <rect x="280" y="80" width="240" height="120" fill="none" stroke={current.accent} strokeWidth="0.5" />
          <line x1="120" y1="60" x2="280" y2="60" stroke={current.accent} strokeWidth="0.5" />
          <line x1="520" y1="60" x2="680" y2="60" stroke={current.accent} strokeWidth="0.5" />
        </svg>
        {/* Mode label */}
        <div className="absolute bottom-4 left-4">
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: current.accent, opacity: 0.7 }}>
            {current.label} mode active
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="font-serif-light text-xl text-white/80 text-center italic"
        >
          "{current.overlay}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// Project gallery. horizontal scrolling reel
function ProjectReel({ title, images }: { title: string; images: string[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="space-y-4">
      <h4 className="font-sans-medium text-white/50 text-xs uppercase tracking-widest">{title}</h4>
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title}. view ${current + 1}`}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
        </AnimatePresence>
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all z-10">
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all z-10">
          <ChevronRight size={16} />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const NDC_SCREENS = [
  { name: 'Homepage', desc: 'Dark editorial hero. "We don\'t build structures. We stage life." Vastu-aligned architecture, Singapore-grade structural engineering.', desktop: '/images/nandhinidc/ndc-home-desktop.png', mobile: '/images/nandhinidc/ndc-home-mobile.png' },
  { name: 'Projects', desc: '"Our landmarks.". Four projects across three districts. Each one a record of how the firm actually builds, from first sketch to last snag cleared.', desktop: '/images/nandhinidc/ndc-projects-desktop.png', mobile: '/images/nandhinidc/ndc-projects-mobile.png' },
  { name: 'About', desc: 'The firm\'s story and methodology. Parchment-toned editorial layout connecting the family legacy to the built environment.', desktop: '/images/nandhinidc/ndc-about-desktop.png', mobile: '/images/nandhinidc/ndc-about-mobile.png' },
];

function NDCDeviceMockup() {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [screen, setScreen] = useState(0);
  const [animating, setAnimating] = useState(false);
  const go = useCallback((dir: 1 | -1) => {
    if (animating) return;
    setAnimating(true);
    setScreen(s => (s + dir + NDC_SCREENS.length) % NDC_SCREENS.length);
    setTimeout(() => setAnimating(false), 400);
  }, [animating]);
  useEffect(() => {
    const id = setInterval(() => { if (!animating) go(1); }, 5000);
    return () => clearInterval(id);
  }, [animating, go]);
  const cur = NDC_SCREENS[screen];

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['desktop', 'mobile'] as const).map(d => {
          const Icon = d === 'desktop' ? Monitor : Smartphone;
          return (
            <button key={d} onClick={() => setDevice(d)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans-medium transition-all ${device === d ? 'bg-[#E9C672] text-black' : 'bg-white/5 text-white/65 border border-white/10 hover:text-white/80'}`}>
              <Icon size={13} />{d === 'desktop' ? 'Desktop' : 'Mobile'}
            </button>
          );
        })}
      </div>

      <div style={{ perspective: '1100px' }}>
        <div style={{ transform: device === 'desktop' ? 'rotateX(5deg) rotateY(-1.5deg)' : 'rotateX(3deg)', transformStyle: 'preserve-3d' }}>
          {device === 'desktop' ? (
            <div>
              <div style={{ background: '#0a1408', borderRadius: '12px 12px 0 0', padding: '11px 11px 0', border: '1.5px solid rgba(200,151,58,0.2)', borderBottom: 'none' }}>
                <div style={{ background: '#070f06', borderRadius: '7px 7px 0 0', overflow: 'hidden' }}>
                  <div style={{ background: '#040a03', padding: '7px 11px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(200,151,58,0.08)' }}>
                    <div style={{ display: 'flex', gap: 4 }}>{['#ff5f56', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.75 }} />)}</div>
                    <div style={{ flex: 1, background: 'rgba(200,151,58,0.06)', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: 'rgba(200,151,58,0.4)', fontFamily: "'Source Sans Pro', sans-serif" }}>nandhinidc.in</div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.img key={`d-${screen}`} src={cur.desktop} alt={`NandhiniDC ${cur.name} page. desktop`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 460, objectFit: 'cover', objectPosition: 'top' }} loading="lazy" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                  </AnimatePresence>
                </div>
              </div>
              <div style={{ height: 16, background: '#0a1408', borderRadius: '0 0 8px 8px', border: '1.5px solid rgba(200,151,58,0.12)', borderTop: 'none', boxShadow: '0 18px 50px rgba(0,0,0,0.6)' }} />
            </div>
          ) : (
            <div style={{ maxWidth: 210, margin: '0 auto' }}>
              <div style={{ background: '#0a1408', borderRadius: 22, padding: '13px 7px 18px', border: '1.5px solid rgba(200,151,58,0.2)', boxShadow: '0 18px 50px rgba(0,0,0,0.6)' }}>
                <div style={{ background: '#070f06', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ height: 7, background: '#040a03', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 36, height: 3, background: '#0a1408', borderRadius: 2 }} /></div>
                  <AnimatePresence mode="wait">
                    <motion.img key={`m-${screen}`} src={cur.mobile} alt={`NandhiniDC ${cur.name} page. mobile`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <button onClick={() => go(-1)} className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E9C672]/40 transition-all"><ChevronLeft size={14} className="text-white/65" /></button>
        <div className="text-center">
          <p className="text-white font-sans-medium text-sm">{cur.name}</p>
          <p className="text-white/65 font-sans-normal text-xs mt-0.5">{cur.desc}</p>
        </div>
        <button onClick={() => go(1)} className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E9C672]/40 transition-all"><ChevronRight size={14} className="text-white/65" /></button>
      </div>
      <div className="flex gap-1 md:gap-2 justify-center">{NDC_SCREENS.map((_, i) => <button key={i} onClick={() => setScreen(i)} className={`rounded-full transition-all ${i === screen ? 'w-2 h-1.5 bg-[#E9C672]' : 'w-1.5 h-1.5 md:w-2 md:h-2 bg-white/25'}`} />)}</div>
    </div>
  );
}

export default function NandhiniDCPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const decisions = [
    {
      title: 'The daylight toggle: because stone looks different at 8am and 6pm',
      body: 'Vastu Shastra treats light as the first material of design. So the NandhiniDC website lets you experience the same building in morning light, golden hour, and twilight. Not as a gimmick. As a statement about what kind of studio this is: one that thinks about how a space feels across the full arc of a day, not just how it photographs.',
      accent: GOLD,
    },
    {
      title: 'You walk through a house. You should walk through a portfolio too.',
      body: 'Architecture portfolios default to grids. Thumbnail, thumbnail, thumbnail. But you do not experience a building by selecting it from a menu. You move through it. The draggable horizontal reel replicates that movement so each project reveals itself as you go, the way a room does when you step inside.',
      accent: LAVENDER,
    },
    {
      title: 'The watermark that says everything without saying anything',
      body: 'The vertical நந்தினி runs up the right side of every page at 13% opacity. It is the name of Saran\'s late sister, rendered in Tamil script, present on every page without explanation. Visitors who read Tamil understand it immediately. Visitors who do not feel its weight without knowing why. That is exactly the effect it was designed to have.',
      accent: BLUE,
    },
  ];

  return (
    <>
      <Helmet>
        <title>NandhiniDC. NicheUX Case Study</title>
        <meta name="description" content="Full web design and development for an Indian interior design studio. Where design meets storytelling." />
        <meta property="og:title" content="NandhiniDC. NicheUX Case Study" />
        <meta property="og:description" content="Full web design and development for NandhiniDC, an interior design studio where every space is a stage." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24"
        >
          {/* Hero background: NandhiniDC website screenshot */}
          <motion.div style={{ y: heroY }} className="absolute inset-0" aria-hidden>
            <img src="/images/nandhinidc/ndc-home-desktop.png" alt="NandhiniDC website"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', opacity: 0.3, filter: 'saturate(0.7)' }} />
            {/* Blueprint grid overlay */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'linear-gradient(rgba(200,151,58,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(200,151,58,0.12) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            {/* Tamil watermark */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 20, display: 'flex', alignItems: 'center', pointerEvents: 'none', userSelect: 'none' }}>
              <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(72px,12vw,130px)', lineHeight: 1, color: 'rgba(200,151,58,0.07)', letterSpacing: '0.06em' }}>
                நந்தினி
              </span>
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 bg-[#E9C672]/15 border border-[#E9C672]/30 rounded-full text-[#E9C672] text-xs font-sans-medium uppercase tracking-widest">
                Web Design & Development · India
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif-light text-white leading-[0.9] mb-6"
            >
              NandhiniDC
              <span className="block text-[#E9C672] font-serif-normal text-3xl md:text-4xl mt-4">
                "We don't build structures. We stage life."
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="https://www.nandhinidc.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] hover:text-black transition-colors text-sm"
              >
                View Live Site <ExternalLink size={14} />
              </a>
              <div className="flex gap-4 text-white/50 text-sm font-sans-normal">
                <span>Saran &amp; Prabaharan · Clients</span>
                <span>·</span>
                <span>Marakkanam, India</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              { label: 'Clients', value: 'Saran & Prabaharan' },
              { label: 'Country', value: 'India' },
              { label: 'Discipline', value: 'Web Design & Dev' },
              { label: 'Status', value: 'Live at nandhinidc.in/' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p>
                <p className="text-white font-serif-light text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLIENT CONTEXT. parchment */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: 'rgba(200,151,58,0.7)' }}>The Client</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-6 leading-tight" style={{ color: '#1a1a1a' }}>
                A name is not branding. It is tribute.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: 'Studio founders', value: 'Saran & Prabaharan', detail: 'Architects and interior designers, Tamil Nadu, India. The name NandhiniDC honours Saran\'s late sister Nandhini. Every decision the studio makes carries that weight.' },
                { label: 'Philosophy', value: 'Vastu Shastra', detail: 'Every project is guided by Vastu, the ancient Indian spatial philosophy. Spaces should be designed to enhance the wellbeing, energy, and purpose of the people who live in them.' },
                { label: 'Portfolio scope', value: '4 projects + 1 in design', detail: 'Stone One (Marakkanam), Second Gear (Kumbakonam), Third Moon (Nannilam), Fourth Pillar (Thiruvallur, in design). Each project documented with construction photography and architectural drawings.' },
              ].map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-8 rounded-2xl space-y-3" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.1)' }}>
                  <span className="text-xs uppercase tracking-widest font-sans-medium block" style={{ color: 'rgba(200,151,58,0.6)' }}>{item.label}</span>
                  <h3 className="font-serif-light text-xl" style={{ color: '#1a1a1a' }}>{item.value}</h3>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE USERS. parchment continues */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: 'rgba(200,151,58,0.7)' }}>Who Uses This Site</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-4 leading-tight" style={{ color: '#1a1a1a' }}>Three types of visitor. Three different needs.</h2>
              <p className="font-sans-normal text-lg max-w-2xl" style={{ color: 'rgba(26,26,26,0.80)' }}>Research with Saran identified three primary audiences. Each one has a different question they are trying to answer when they arrive.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  persona: 'The Prospective Client',
                  question: '"Can this studio design a home that reflects who we are?"',
                  needs: ['See the quality of completed work', 'Understand the studio\'s philosophy and values', 'Feel that this architect understands them personally', 'Find contact details without friction'],
                  accent: '#C8973A',
                },
                {
                  persona: 'The Referral Visitor',
                  question: '"My friend told me about this studio. Let me see what they do."',
                  needs: ['Quick visual impression of quality', 'Understand the range of project types', 'Confirm they work in the right geography', 'Easy way to get in touch'],
                  accent: '#3D6B28',
                },
                {
                  persona: 'The Professional Contact',
                  question: '"I am a contractor, engineer, or vendor. Is this studio credible?"',
                  needs: ['Understand project scale and complexity', 'See the studio\'s technical rigour', 'Confirm active projects in their geography', 'Direct contact for business enquiries'],
                  accent: '#C8973A',
                },
              ].map((p, i) => (
                <motion.div key={p.persona} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-8 rounded-2xl space-y-4" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.1)' }}>
                  <div style={{ width: 32, height: 1, background: p.accent }} />
                  <h3 className="font-serif-light text-lg" style={{ color: '#1a1a1a' }}>{p.persona}</h3>
                  <p className="font-sans-normal text-sm italic leading-relaxed" style={{ color: 'rgba(26,26,26,0.55)', borderLeft: `2px solid ${p.accent}60`, paddingLeft: 10 }}>{p.question}</p>
                  <div className="space-y-2">
                    {p.needs.map(n => (
                      <div key={n} className="flex items-start gap-2">
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: p.accent, flexShrink: 0, marginTop: 7 }} />
                        <span className="font-sans-normal text-xs leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{n}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INFORMATION ARCHITECTURE. dark */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">Information Architecture</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">The hierarchy was built around trust, not convention.</h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">
                Most architecture portfolios put the projects first. We put the philosophy first. Visitors who arrive from Tamil Nadu professional networks need to understand who Saran is before they commit to a consultation. The site structure reflects this:
              </p>
              <div className="space-y-3">
                {[
                  'Studio name visible immediately: NandhiniDC, not "Interior Design"',
                  'Tamil script watermark signals cultural identity at first scroll',
                  'Vastu philosophy copy in the hero establishes values before portfolio',
                  'Projects are four named chapters, not a generic grid',
                  'Contact is a WhatsApp FAB, the primary conversion in the target market',
                  'English and Tamil typography coexist throughout the design',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-[#C8973A] mt-2.5 flex-shrink-0" />
                    <span className="text-white/50 font-sans-normal text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">Design System</span>
              <div className="space-y-4">
                {[
                  { label: 'Forest Night', value: 'hsl(100,53%,6%)', desc: 'Primary dark. Rich and organic, unlike the sterile navy of corporate architecture sites' },
                  { label: 'Gold Accent', value: 'hsl(42,64%,55%)', desc: 'Call to action, highlights, decorative elements. Warm authority' },
                  { label: 'Forest Green', value: 'hsl(89,50%,32%)', desc: 'Secondary actions and hover states' },
                  { label: 'Warm Paper', value: 'hsl(45,44%,95%)', desc: 'Light sections and card backgrounds. Aged paper warmth' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div style={{ width: 36, height: 36, borderRadius: 6, background: c.value, flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)' }} />
                    <div className="flex-1">
                      <p className="text-white font-sans-medium text-sm">{c.label}</p>
                      <p className="text-white/35 font-sans-normal text-xs mt-0.5">{c.desc}</p>
                    </div>
                    <code className="text-white/50 font-mono text-xs">{c.value}</code>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE BRIEF */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Brief</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                A studio named after someone who mattered.
              </h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">
                Saran built NandhiniDC in honour of his late sister Nandhini. The company name is a tribute, not branding. Every spatial decision in the studio is guided by Vastu philosophy and the belief that a designed space should change the people who live in it. He needed a web presence that held the same weight.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block">The Challenge</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">
                Interior design portfolios default to the grid: photos arranged, light described in captions. We wanted the site to behave like the spaces Saran creates, changing as you move through it. The signature interaction, the daylight study, emerged from a single question: what if visitors could choose what time of day they visit a room?
              </p>
              <div className="space-y-3 pt-2">
                {['Daylight toggle (Morning / Golden Hour / Twilight)', 'Draggable horizontal project reel', 'Vastu philosophy embedded in copy', 'Tamil script as visual identity element'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2.5 flex-shrink-0" />
                    <span className="text-white/50 font-sans-normal text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE WEBSITE. design system + browser mockup */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Website</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">How we staged the work.</h2>
              <p className="text-white/65 font-sans-normal text-base mt-3 max-w-xl">
                The architecture photos are the client's work. The website is ours, a designed space in its own right.
              </p>
            </motion.div>

            {/* Real website screenshots. interactive device mockup */}
            <NDCDeviceMockup />

            {/* Design system */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: "Colour System",
                  content: [
                    { color: "hsl(100,53%,6%)", name: "Forest Night", hex: "#0A1F07" },
                    { color: "hsl(42,64%,55%)", name: "Gold Accent", hex: "#C8973A" },
                    { color: "hsl(89,50%,32%)", name: "Forest Green", hex: "#3D6B28" },
                    { color: "hsl(45,44%,95%)", name: "Warm Paper", hex: "#F5EDD8" },
                  ],
                },
              ].map(({ label, content }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-white/5 bg-[#0A0A0A] space-y-4"
                >
                  <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium">{label}</span>
                  <div className="space-y-2">
                    {content.map(({ color, name, hex }) => (
                      <div key={name} className="flex items-center gap-3">
                        <div style={{ width: 24, height: 24, borderRadius: 4, background: color, border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }} />
                        <span className="text-white/50 text-xs font-sans-normal">{name}</span>
                        <span className="text-white/50 text-xs font-mono ml-auto">{hex}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/5 bg-[#0A0A0A] space-y-4"
              >
                <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium">Typography</span>
                <div className="space-y-4">
                  <div>
                    <div className="text-xl text-[#C8973A] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, letterSpacing: "0.04em" }}>Cormorant Garamond</div>
                    <span className="text-white/25 text-xs font-sans-normal">Display · Headings · Captions</span>
                  </div>
                  <div>
                    <div className="text-base text-white/60" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>DM Sans</div>
                    <span className="text-white/25 text-xs font-sans-normal">Body · Navigation · Labels</span>
                  </div>
                  <div>
                    <div className="text-sm text-white/65" style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.06em" }}>IBM Plex Mono</div>
                    <span className="text-white/25 text-xs font-sans-normal">Technical · Coordinates · Data</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/5 bg-[#0A0A0A] space-y-4"
              >
                <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium">Signature Details</span>
                <div className="space-y-3">
                  {[
                    "Custom animated cursor (dot + ring)",
                    "Scroll-progress indicator",
                    "Tamil script watermark",
                    "Blueprint grid background patterns",
                    "FAB WhatsApp integration",
                    "Wipe image reveal animations",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "#C8973A" }} />
                      <span className="text-white/50 text-xs font-sans-normal leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://www.nandhinidc.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm"
              >
                Visit nandhinidc.in/ <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* DAYLIGHT INTERACTION. signature moment */}
        <section className="py-10 md:py-16 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">Signature Interaction</span>
              <h2 className="font-serif-light text-3xl md:text-4xl text-white">The Daylight Study</h2>
              <p className="text-white/65 font-sans-normal text-base mt-3 max-w-xl mx-auto">Architecture lives differently in every light. Toggle between them.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <DaylightToggle />
            </motion.div>
          </div>
        </section>

        {/* FEATURE SPOTLIGHTS */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">Feature Spotlights</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">What we built and why it works.</h2>
              <p className="text-white/65 font-sans-normal text-base mt-3 max-w-xl">Four signature features that make the NandhiniDC site behave like the spaces it documents.</p>
            </motion.div>

            <div className="space-y-8">
              {/* Feature 1: Tamil watermark */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-10 items-center p-8 md:p-12 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div>
                  <span className="text-[#E9C672]/50 text-xs uppercase tracking-widest font-sans-medium block mb-4">Feature 01</span>
                  <h3 className="font-serif-light text-2xl text-white mb-4">Tamil script watermark</h3>
                  <p className="text-white/55 font-sans-normal text-base leading-relaxed mb-4">The vertical நந்தினி watermark runs up the right side of every hero. It is not a design detail. It is the name of Saran's late sister, rendered in her script, present on every page without explanation. Visitors who read Tamil understand immediately. Visitors who do not feel its weight without knowing why.</p>
                  <div className="space-y-2">
                    {['CSS writing-mode: vertical-rl with text-orientation: mixed', 'Cormorant Garamond at 13% opacity for ghosted presence', 'Scales with clamp() across all viewport sizes', 'Pointer-events: none so it never blocks interaction'].map(d => (
                      <div key={d} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2 flex-shrink-0" />
                        <code className="text-white/35 text-xs font-mono leading-relaxed">{d}</code>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5">
                  <img src="/images/nandhinidc/ndc-watermark.png" alt="Tamil script watermark நந்தினி on live NandhiniDC website" className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                  <p className="text-white/50 text-xs font-sans-normal text-center py-2" style={{background:'hsl(100,53%,6%)'}}>Live screenshot. nandhinidc.in</p>
                </div>
              </motion.div>

              {/* Feature 2: WhatsApp FAB */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-10 items-center p-8 md:p-12 rounded-2xl border border-white/5 bg-white/[0.02] md:[&>*:first-child]:order-2">
                <div>
                  <span className="text-[#E9C672]/50 text-xs uppercase tracking-widest font-sans-medium block mb-4">Feature 02</span>
                  <h3 className="font-serif-light text-2xl text-white mb-4">WhatsApp as primary CTA</h3>
                  <p className="text-white/55 font-sans-normal text-base leading-relaxed mb-4">In Tamil Nadu's professional network, WhatsApp is how business is done. A form is friction. A WhatsApp message is a conversation. The floating action button bypasses email entirely and opens a direct line to Saran. This single decision is responsible for the majority of the site's conversions.</p>
                  <div className="space-y-2">
                    {['Fixed position FAB, bottom-right, z-index above all content', 'Pulse animation draws attention without demanding it', 'Pre-filled message: "Hello, I found your work on nandhinidc.in"', 'Opens WhatsApp web on desktop, native app on mobile'].map(d => (
                      <div key={d} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2 flex-shrink-0" />
                        <code className="text-white/35 text-xs font-mono leading-relaxed">{d}</code>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5" style={{ maxWidth: 300, margin: '0 auto' }}>
                  <img src="/images/nandhinidc/ndc-whatsapp-fab.png" alt="WhatsApp floating action button on NandhiniDC mobile" className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                  <p className="text-white/50 text-xs font-sans-normal text-center py-2" style={{background:'hsl(100,53%,6%)'}}>Live screenshot. mobile view</p>
                </div>
              </motion.div>

              {/* Feature 3: Blueprint grid */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-10 items-center p-8 md:p-12 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div>
                  <span className="text-[#E9C672]/50 text-xs uppercase tracking-widest font-sans-medium block mb-4">Feature 03</span>
                  <h3 className="font-serif-light text-2xl text-white mb-4">Blueprint grid background</h3>
                  <p className="text-white/55 font-sans-normal text-base leading-relaxed mb-4">Architecture firms use blueprints. NandhiniDC's digital presence should feel like one. A CSS grid pattern runs beneath hero sections and key transitions: barely visible, technically precise, referencing the profession without announcing it.</p>
                  <div className="space-y-2">
                    {['CSS background-image with two linear-gradient layers', '40px grid spacing, matching standard architectural scale', 'rgba(200,151,58,0.08) opacity for near-invisible presence', 'No JavaScript, no SVG: pure CSS, zero performance cost'].map(d => (
                      <div key={d} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2 flex-shrink-0" />
                        <code className="text-white/35 text-xs font-mono leading-relaxed">{d}</code>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5">
                  <img src="/images/nandhinidc/ndc-blueprint-grid.png" alt="Blueprint grid CSS pattern on live NandhiniDC website" className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                  <p className="text-white/50 text-xs font-sans-normal text-center py-2" style={{background:'hsl(100,53%,6%)'}}>Live screenshot. nandhinidc.in</p>
                </div>
              </motion.div>

              {/* Feature 4: Horizontal scroll reel */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="p-8 md:p-12">
                  <span className="text-[#E9C672]/50 text-xs uppercase tracking-widest font-sans-medium block mb-4">Feature 04</span>
                  <h3 className="font-serif-light text-2xl text-white mb-4">Horizontal project reel</h3>
                  <p className="text-white/65 font-sans-normal text-base leading-relaxed max-w-2xl">Interior design is sequential. You walk through a space. A draggable horizontal reel replicates that movement so each project unfolds rather than being selected from a grid. The scroll progress bar below shows position within the reel.</p>
                </div>
                <div className="rounded-b-2xl overflow-hidden">
                  <img src="/images/nandhinidc/ndc-horizontal-reel.png" alt="Horizontal draggable project reel on live NandhiniDC homepage" className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                  <p className="text-white/50 text-xs font-sans-normal text-center py-2" style={{background:'hsl(100,53%,6%)'}}>Live screenshot. "Landmarks across Tamil Nadu" section</p>
                </div>
              </motion.div>
            </div>

            {/* Fourth Pillar status */}
            <div className="mt-8 p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E9C672] animate-pulse flex-shrink-0" />
              <div>
                <span className="text-[#E9C672] text-xs uppercase tracking-widest font-sans-medium block mb-1">Currently in design</span>
                <p className="text-white/65 font-sans-normal text-sm">Fourth Pillar, Thiruvallur. Will be added to the site on completion. The live site already lists it as active.</p>
              </div>
            </div>
          </div>
        </section>

        {/* THE DECISIONS */}
        <section className="py-20 md:py-28 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Decisions</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">What we chose and why.</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {decisions.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-white/5 bg-[#0A0A0A] space-y-4"
                >
                  <div className="w-8 h-px" style={{ backgroundColor: d.accent }} />
                  <h3 className="font-serif-light text-xl text-white">{d.title}</h3>
                  <p className="text-white/50 font-sans-normal text-sm leading-relaxed">{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE OUTCOME */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Outcome</span>
                <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                  Live at nandhinidc.in. A website that feels like its buildings: considered, structured, and built with soul.
                </h2>
                <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">
                  The daylight toggle is the first thing people engage with. The horizontal reel keeps them moving through the portfolio the way you move through a house. One room at a time. The Tamil watermark is noticed by everyone and understood by fewer. That is exactly the design intention. And it works.
                </p>
                <a
                  href="https://www.nandhinidc.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm"
                >
                  Visit nandhinidc.in/ <ExternalLink size={14} />
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                className="relative aspect-video rounded-2xl overflow-hidden border border-white/5"
                style={{ background: 'hsl(100,53%,6%)' }}
              >
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(rgba(200,151,58,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(200,151,58,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'rgba(200,151,58,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Live at nandhinidc.in</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 18, color: 'rgba(245,237,216,0.4)' }}>We don't build structures. We stage life.</p>
                </div>
              </motion.div>
            </div>

            {/* Client testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 48 }}
            >
              <div style={{ maxWidth: 720 }}>
                <div style={{ width: 28, height: 1, background: '#C8973A', marginBottom: 20 }} />
                <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px,2.8vw,30px)', color: 'rgba(245,237,216,0.85)', lineHeight: 1.4, letterSpacing: '-0.01em', margin: '0 0 20px 0' }}>
                  "Thevaki and the team at NicheUX did an exceptional job in bringing our dream website to life. She delivered everything on time with great professionalism and attention to detail. The final outcome exceeded our expectations, and our entire team was truly impressed with the presentation and quality of work. Highly recommended for anyone looking for creative, reliable, and professional web solutions."
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: '#C8973A' }}>N</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: 'rgba(200,151,58,0.7)', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>Nandhini Design Constructions</p>
                    <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: 'rgba(245,237,216,0.3)', margin: '2px 0 0', letterSpacing: '0.04em' }}>Marakkanam, India · Google Review</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* NEXT WORK */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Case Study</span>
              <h3 className="font-serif-light text-3xl text-white">Bloom & Brew</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">Custom merchify store · Canada</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/featured-work/bloom-brew')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm"
              >
                View Case Study <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm"
              >
                Start a similar project
              </button>
            </div>
          </div>
        </section>

      </div>

      <BackToTopArrow />
    </>
  );
}