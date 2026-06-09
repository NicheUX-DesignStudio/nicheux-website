import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GOLD = '#E9C672';
const LAVENDER = '#B097BE';
const BLUE = '#89B1CC';
const BLACK = '#0A0A0A';
const PARCHMENT = '#F1E9D2';
const INK = '#1a1a1a';

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

export default function merchSoorajCandyshopPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [showTexture, setShowTexture] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Kingdom of Sweets. NicheUX</title>
        <meta name="description" content="A personal memory piece for Sooraj Nikam. An arch banner designed from a notes app sketch, to go on a miniature toy merch that holds chocolates for visitors." />
        <meta property="og:title" content="Kingdom of Sweets. Sooraj Nikam × NicheUX" />
        <meta property="og:description" content="A tribute to a place that mattered. Designed from a hand-drawn sketch, made into a banner for a toy-sized merch full of chocolates." />
      </Helmet>

      <div style={{ background: BLACK, overflow: 'hidden' }}>

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24"
        >
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src="/images/sooraj/candy/main.jpg"
              alt="Kingdom of Sweets arch banner by NicheUX"
              className="w-full h-full object-cover object-center opacity-35"
              loading="eager"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/20" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.07, 0.16, 0.07] }} transition={{ duration: 9, repeat: Infinity }}
              className="absolute w-[600px] h-[600px] rounded-full -bottom-40 right-0"
              style={{ background: 'radial-gradient(circle, #f7c59f 0%, transparent 65%)' }} />
            <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 13, repeat: Infinity }}
              className="absolute w-[500px] h-[500px] rounded-full top-0 left-0 -translate-x-1/3"
              style={{ background: `radial-gradient(circle, ${LAVENDER} 0%, transparent 65%)` }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-sans-medium uppercase tracking-widest" style={{ background: `${LAVENDER}20`, border: `1px solid ${LAVENDER}40`, color: LAVENDER }}>
                Personal · Memory Piece · Ireland
              </span>
              <span className="text-white/50 text-xs font-sans-normal">Production Nr. 04c</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
              className="font-serif-light text-white leading-[0.88] mb-6" style={{ fontSize: 'clamp(44px, 7.5vw, 108px)', letterSpacing: '-0.04em' }}>
              Kingdom of
              <span className="block italic" style={{ color: LAVENDER }}>Sweets</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              A place Sooraj worked. A sketch he drew on his phone. A banner for a miniature merch that lives in his home and holds chocolates for anyone who visits.
            </motion.p>
          </motion.div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              { label: 'For', value: 'Sooraj Nikam' },
              { label: 'Type', value: 'Personal Memory Piece' },
              { label: 'Discipline', value: 'Illustration · Print Design' },
              { label: 'Format', value: 'Arch Banner for Mini Toy merch' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p>
                <p className="text-white font-serif-light text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE STORY */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: PARCHMENT, borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: 'rgba(176,151,190,0.7)' }}>The Story</span>
              <h2 className="font-serif-light text-4xl md:text-5xl leading-tight" style={{ color: INK }}>
                Not every brief is a business brief.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
                <p className="font-sans-normal text-lg leading-relaxed" style={{ color: 'rgba(26,26,26,0.75)' }}>
                  Sooraj Nikam worked at Kingdom of Sweets. When he left, he wanted to keep a piece of it. Not a photograph. Something you could hold.
                </p>
                <p className="font-sans-normal text-lg leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>
                  He has a miniature toy merch at home. A small model, the kind you put on a shelf. He fills it with chocolates. When someone visits, they can walk over and pick one. That is the Kingdom of Sweets, now.
                </p>
                <p className="font-sans-normal text-lg leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>
                  He wanted a tiny arch banner for it. Something that looked real, that carried the name and the feeling. He drew the outline himself in a notes app on his phone, sent it over, and asked if we could make it into something.
                </p>
                <p className="font-sans-normal text-lg leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>
                  We could.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <div className="p-8 rounded-2xl space-y-5" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.1)' }}>
                  <div style={{ width: 28, height: 1, background: LAVENDER }} />
                  <h3 className="font-serif-light text-xl" style={{ color: INK }}>The brief, in full</h3>
                  <blockquote className="font-serif-light italic text-lg leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)', borderLeft: `2px solid ${LAVENDER}50`, paddingLeft: 16 }}>
                    "I used to work at Kingdom of Sweets. I have a small toy merch at home that I fill with chocolates for when people visit. I drew the arch banner shape on my phone. Can you make it look real?"
                  </blockquote>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.70)' }}>
                    Sooraj Nikam, Ireland. The sketch was a notes-app outline. The toy merch was already there, waiting for its banner.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FROM SKETCH TO BANNER */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: `${LAVENDER}70` }}>From Sketch to Print</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">A notes app drawing becomes a banner.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'The sketch', body: 'Sooraj drew the arch shape in a phone notes app. A rough outline, the proportions of the banner he had in mind. That was the brief. That shape, made beautiful.', accent: LAVENDER },
                { step: '02', title: 'The design', body: 'We took the arch outline and built a heritage confectionery identity inside it. Warm neutrals, display serif typography, the name Kingdom of Sweets treated as a title card. Something that looked like it had been in business for a century.', accent: GOLD },
                { step: '03', title: 'Two finishes', body: 'A clean version and a textured version with paper grain. The texture makes it feel handmade, aged, like something from a real sweet merch window. Both delivered. Sooraj chose based on how it would look printed small.', accent: BLUE },
              ].map((item, i) => (
                <motion.div key={item.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-8 rounded-2xl space-y-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="font-serif-light italic" style={{ fontSize: 36, color: `${item.accent}30`, lineHeight: 1 }}>{item.step}</div>
                  <div style={{ width: 28, height: 1, background: item.accent }} />
                  <h3 className="font-serif-light text-xl text-white">{item.title}</h3>
                  <p className="font-sans-normal text-sm leading-relaxed text-white/50">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE WORK */}
        <section className="py-10 md:py-20 px-6 md:px-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-10">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: `${LAVENDER}60` }}>The Work</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6">Two versions. One decision.</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => setShowTexture(false)} aria-pressed={!showTexture}
                  className={`px-4 py-2 rounded-full text-sm font-sans-medium transition-all ${!showTexture ? 'text-[#0A0A0A]' : 'bg-white/5 text-white/65 border border-white/10'}`}
                  style={!showTexture ? { background: LAVENDER } : {}}>
                  Without texture
                </button>
                <button onClick={() => setShowTexture(true)} aria-pressed={showTexture}
                  className={`px-4 py-2 rounded-full text-sm font-sans-medium transition-all ${showTexture ? 'text-[#0A0A0A]' : 'bg-white/5 text-white/65 border border-white/10'}`}
                  style={showTexture ? { background: LAVENDER } : {}}>
                  With texture
                </button>
              </div>
            </motion.div>
            <div>
              <motion.div key={showTexture ? 'texture' : 'no-texture'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden border border-white/5" style={{ background: '#111' }}>
                <img
                  src={showTexture ? '/images/sooraj/candy/texture.png' : '/images/sooraj/candy/no-texture.png'}
                  alt={showTexture ? 'Kingdom of Sweets. with texture' : 'Kingdom of Sweets. clean'}
                  className="w-full h-auto" loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.15'; }}
                />
              </motion.div>
              <div className="mt-3 inline-block px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-white/50 text-xs font-sans-medium">
                  {showTexture ? 'Paper grain. feels like a real sweet merch print' : 'Clean version. works for digital and gloss print'}
                </span>
              </div>
            </div>
            <p className="text-white/35 font-sans-normal text-sm leading-relaxed mt-6 max-w-2xl">
              The texture version adds a subtle paper grain that makes the design feel handcrafted and aged, right for a brand that is supposed to feel like a memory. The clean version is crisper for small-format print. Both were delivered; Sooraj chose based on what would look best at the scale of the toy merch banner.
            </p>
          </div>
        </section>

        {/* MAIN DESIGN */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-14 items-center">
              <div className="rounded-2xl overflow-hidden border border-white/5">
                <img src="/images/sooraj/candy/main.jpg" alt="Kingdom of Sweets banner by NicheUX"
                  className="w-full h-auto" loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.15'; }} />
              </div>
              <div>
                <div className="w-8 h-px mb-6" style={{ background: LAVENDER }} />
                <h3 className="font-serif-light text-3xl text-white mb-4">Heritage by design</h3>
                <p className="font-sans-normal text-lg leading-relaxed mb-6 text-white/60">
                  Kingdom of Sweets needed to feel like it had existed for a long time. Not a modern candy brand, but a sweet merch that had been on the same corner for generations. Display serif typography, warm neutrals, the name treated as a statement.
                </p>
                <p className="font-sans-normal text-base leading-relaxed text-white/65">
                  The arch shape Sooraj sketched gave the layout its structure. Everything inside it was built to honour what the name meant to him: a real place, full of sweetness, that he wanted to keep forever in a small model on a shelf.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE OUTCOME */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: PARCHMENT, borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-4" style={{ color: `${LAVENDER}70` }}>The Outcome</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-6 leading-tight" style={{ color: INK }}>
                A tiny merch. A real memory.
              </h2>
              <p className="font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(26,26,26,0.80)' }}>
                The banner lives on the miniature toy merch. The merch lives in Sooraj's home, filled with chocolates. Anyone who visits can take one. Kingdom of Sweets is still open.
              </p>
              <button onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 font-sans-medium rounded-lg text-sm"
                style={{ background: INK, color: PARCHMENT }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = LAVENDER; (e.currentTarget as HTMLButtonElement).style.color = BLACK; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = INK; (e.currentTarget as HTMLButtonElement).style.color = PARCHMENT; }}>
                Start a project <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* NEXT WORK */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span>
              <h3 className="font-serif-light text-3xl text-white">SSJC Tournament</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">Print and merch Design · Malaysia</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/featured-work/ssjc-tournament')}
                className="inline-flex items-center gap-2 px-6 py-3 font-sans-medium rounded-lg text-sm"
                style={{ border: `1px solid ${GOLD}40`, color: GOLD }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = BLACK; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}>
                View Case Study <ArrowRight size={14} />
              </button>
              <button onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 font-sans-medium rounded-lg text-sm"
                style={{ background: GOLD, color: BLACK }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = LAVENDER; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; }}>
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
