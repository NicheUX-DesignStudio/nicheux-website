import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#E9C672]/30 hover:border-[#E9C672] transition-all shadow-xl"
      aria-label="Back to top"
    >
      <ArrowUp size={20} className="text-[#E9C672]" />
    </button>
  );
}

const BANNERS = [
  {
    src: '/images/sooraj/linkedin/banner-green.png',
    title: 'Green & White. Final Direction',
    desc: 'Clean, confident, minimal. The green-and-white palette reads distinctively in a feed of navy and beige. a colour choice designed to stand out before anyone reads the words.',
    accent: '#4CAF82',
  },
  {
    src: '/images/sooraj/linkedin/banner-alt.png',
    title: 'Alternative Direction',
    desc: 'A second exploration. same brief, different visual register. Held in reserve; the client selected the primary direction for live use.',
    accent: '#E9C672',
  },
];

export default function SoorajLinkedInPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // Banners shown as scrollable sections. no active state needed

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Sooraj Nikam. LinkedIn Banner | NicheUX Case Study</title>
        <meta name="description" content="LinkedIn banner for a Data & AI Graduate with 4x international publications, MSc University of Galway. Designed to be seen before the first connection request." />
        <meta property="og:title" content="Sooraj Nikam. LinkedIn Banner | NicheUX" />
        <meta property="og:description" content="Data & AI Graduate. 4x publications. One banner that makes the case before he says a word." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24"
        >
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src="/images/sooraj/linkedin/banner-green.png" alt="Sooraj Nikam LinkedIn Banner by NicheUX"
              className="w-full h-full object-cover object-top opacity-25"
              loading="eager"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-[#0A0A0A]/30" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute w-[700px] h-[700px] rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3"
              style={{ background: 'radial-gradient(circle, #89B1CC 0%, transparent 70%)' }}
            />
          </div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="inline-block px-3 py-1 bg-[#89B1CC]/15 border border-[#89B1CC]/30 rounded-full text-[#89B1CC] text-xs font-sans-medium uppercase tracking-widest">
                Career Brand · LinkedIn · Ireland
              </span>
              <span className="text-white/50 text-xs font-sans-normal">Production № 04a</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif-light text-white leading-[0.9] mb-6"
              style={{ fontSize: 'clamp(52px, 8vw, 112px)', letterSpacing: '-0.04em' }}
            >
              Sooraj Nikam
              <span className="block text-[#89B1CC]" style={{ fontSize: 'clamp(24px, 3vw, 40px)', marginTop: '0.3em', fontStyle: 'italic', letterSpacing: '-0.02em' }}>
                LinkedIn Banner
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Data & AI Graduate. 4× international publications. MSc Galway. One banner that makes the case before he says a word.
            </motion.p>
          </motion.div>
        </section>

        {/* CLIENT CONTEXT. parchment */}
        <section className="py-16 md:py-20 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Who is Sooraj', value: 'Data and AI Graduate with four international publications', detail: 'MSc from the University of Galway. Four internationally published research papers while completing a master\'s degree. Python, AWS, Power BI, Machine Learning. Looking for a role in data analytics or AI in Ireland or remotely. His credentials are genuinely exceptional. His LinkedIn banner was not saying any of that.' },
                { label: 'The actual problem', value: 'Four seconds. That is all a recruiter gives a profile.', detail: 'Recruiters on LinkedIn spend between three and seven seconds deciding whether to click through or keep scrolling. The banner is the first thing they see. Before the headline. Before the about section. Before the publications. Sooraj had four research papers and a master\'s degree, and none of that was visible at first glance. A bad banner is not just a design problem. It is a career problem.' },
                { label: 'What the banner needed to do', value: 'Communicate everything worth knowing in under a second', detail: 'Technical credibility. Research credibility. Professional confidence. It needed to feel like it belonged to someone who works at the intersection of data science and serious academic output, without screaming it. No template. Nothing that looks like every other graduate on LinkedIn. Something that made a recruiter stop and think: who is this person?' },
              ].map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.08 }} viewport={{ once: true }}
                  className="p-6 rounded-2xl space-y-3" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.1)' }}>
                  <span className="text-xs uppercase tracking-widest font-sans-medium block" style={{ color: 'rgba(137,177,204,0.6)' }}>{item.label}</span>
                  <h3 className="font-serif-light text-lg" style={{ color: '#1a1a1a' }}>{item.value}</h3>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH. dark */}
        <section className="py-16 md:py-20 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-10">
              <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">Platform Analysis</span>
              <h2 className="font-serif-light text-3xl md:text-4xl text-white">Most LinkedIn banners are doing absolutely nothing. Here is what they are doing wrong and what we did instead.</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-serif-light text-xl text-white">The mistakes we see constantly</h3>
                {['Generic gradient or stock photo: every recruiter has seen it a thousand times', 'Blank banner: you are handing back the most valuable visual real estate on your profile', 'Dark background with white text: the circular profile photo eats 20% of the left side. Whatever was there is gone', 'Matching LinkedIn\'s own blue: you blend into the platform. That is the opposite of the goal'].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-4 h-px bg-white/20 mt-3 flex-shrink-0" />
                    <span className="text-white/65 font-sans-normal text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="font-serif-light text-xl text-white">What we designed instead</h3>
                {['Green on white. A feed full of navy and beige does not have this combination. It earns attention before the copy even registers', 'Composition built around the profile photo. The key information sits in the safe zone that the circular crop cannot touch', 'Legible at thumbnail size. Most banners fail completely when viewed on mobile. We designed for both scales', 'Two full directions developed. Sooraj chose one. The second is held in reserve for when he wants a refresh without starting from scratch'].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-4 h-px bg-[#89B1CC] mt-3 flex-shrink-0" />
                    <span className="text-white/70 font-sans-normal text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              { label: 'Client', value: 'Sooraj Nikam' },
              { label: 'Country', value: 'Ireland' },
              { label: 'Discipline', value: 'Career Brand Design' },
              { label: 'Format', value: 'LinkedIn Banner · 1584 × 396px' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p>
                <p className="text-white font-serif-light text-lg">{item.value}</p>
              </div>
            ))}
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
              <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Brief</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                A banner that makes a recruiter stop before they read a single word.
              </h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">
                Sooraj Nikam has a master's degree from the University of Galway and four internationally published research papers. He knows Python, AWS, Power BI, and Machine Learning. By any measure, he is exactly the kind of hire that data teams are looking for. His LinkedIn profile was not saying any of that at a glance. We fixed that in a single deliverable: a banner that does the talking before a recruiter reads a word.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Challenge</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">
                Most graduates default to a LinkedIn template. Sooraj has a genuinely impressive profile. 4 published research papers, a top-tier MSc, in-demand technical skills. but a generic banner undersells all of that before anyone reads the first line. The brief was clear: the visual needs to do the work that credentials alone can't.
              </p>
              <div className="space-y-3">
                {[
                  'Must work behind a circular profile photo (left side effectively obscured)',
                  'Communicate technical credibility. not just "looking for work"',
                  'Ireland / Galway context without being generic',
                  'Two directions explored. one selected, one held in reserve',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-[#89B1CC] mt-2.5 flex-shrink-0" />
                    <span className="text-white/50 font-sans-normal text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE WORK. full-width banner display */}
        {BANNERS.map((banner, i) => (
          <motion.section
            key={banner.src}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-60px' }}
            style={{ background: i % 2 === 0 ? '#F1E9D2' : '#0A0A0A', borderTop: `1px solid ${i % 2 === 0 ? 'rgba(26,26,26,0.1)' : 'rgba(255,255,255,0.05)'}` }}
            className="py-16 md:py-24"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              {i === 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 32, height: 1, background: '#1a1a1a' }} />
                  <span style={{ color: '#1a1a1a', fontSize: 10, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase' as const }}>The Work</span>
                </div>
              )}
              {/* Banner NUMBER + TITLE */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 13, color: i % 2 === 0 ? 'rgba(26,26,26,0.3)' : 'rgba(255,255,255,0.2)' }}>0{i + 1}</span>
                <div style={{ width: 32, height: 1, background: banner.accent, alignSelf: 'center' }} />
                <h3 className="font-serif-light" style={{ fontSize: 'clamp(20px,2.4vw,30px)', color: i % 2 === 0 ? '#1a1a1a' : '#fff', letterSpacing: '-0.02em', margin: 0 }}>{banner.title}</h3>
              </div>
              {/* FULL-WIDTH Banner image */}
              <div style={{ overflow: 'hidden', border: `1px solid ${i % 2 === 0 ? 'rgba(26,26,26,0.12)' : 'rgba(255,255,255,0.06)'}`, marginBottom: 20 }}>
                <img
                  src={banner.src}
                  alt={`Sooraj Nikam LinkedIn banner. ${banner.title}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.15'; }}
                />
              </div>
              {/* Description below */}
              <p className="font-sans-normal text-base leading-relaxed" style={{ color: i % 2 === 0 ? 'rgba(26,26,26,0.70)' : 'rgba(255,255,255,0.55)', maxWidth: 720 }}>{banner.desc}</p>
            </div>
          </motion.section>
        ))}

        {/* THE DECISIONS. parchment */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: "rgba(26,26,26,0.80)" }}>The Decisions</span>
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: "#1a1a1a" }}>What we chose and why.</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Green as differentiation, not brand',
                  body: 'Most Data & AI graduate banners use navy or grey. the safe, corporate palette. Green reads as confident and unusual in that context. The colour choice is strategic: stand out before the recruiter reads the title, so that when they do read it, they\'re already paying attention.',
                  accent: '#4CAF82',
                },
                {
                  title: 'Profile photo composition first',
                  body: "Every LinkedIn banner must account for a circular profile photo covering the left ~20% of the banner. Both directions were designed with the photo in mind. text hierarchy, negative space, and visual weight all balanced around that constraint. A banner designed without the photo is a banner designed wrong.",
                  accent: '#89B1CC',
                },
              ].map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl space-y-4" style={{ background: "#fff", border: "1px solid rgba(26,26,26,0.1)" }}
                >
                  <div className="w-8 h-px" style={{ backgroundColor: d.accent }} />
                  <h3 className="font-serif-light text-xl" style={{ color: "#1a1a1a" }}>{d.title}</h3>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.80)" }}>{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE OUTCOME */}
        <section className="py-20 md:py-28 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Outcome</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                A profile that earns the click before it earns the read.
              </h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Two directions explored. one selected, one held in reserve. The final banner gives Sooraj's LinkedIn the visual weight his credentials deserve: distinctive, credible, and impossible to mistake for a template.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#89B1CC] text-[#0A0A0A] font-sans-medium rounded-lg hover:bg-[#E9C672] transition-colors text-sm"
              >
                Build your career brand <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* NEXT WORK */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span>
              <h3 className="font-serif-light text-3xl text-white">The Generation Conversation</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">Wanted Poster Campaign · Event Social Media · Galway</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/featured-work/sooraj-wanted')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm"
              >
                View Case Study <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm"
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
