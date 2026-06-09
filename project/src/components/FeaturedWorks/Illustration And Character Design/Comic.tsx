import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BackToTopArrow() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = () => setV(window.pageYOffset > 300); window.addEventListener('scroll', t); return () => window.removeEventListener('scroll', t); }, []);
  if (!v) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#B097BE]/30 hover:border-[#B097BE] transition-all shadow-xl"><ArrowUp size={20} className="text-[#B097BE]" /></button>;
}

const STRIPS = [
  {
    src: '/images/DogComic.webp',
    title: 'Micro-Content Humor',
    sub: 'Quick-hit social media strips',
    brief: 'Create a comic strip that lands within one thumb-stop. built specifically for Twitter and TikTok scroll speed.',
    desc: 'Slice-of-life humor with maximum comedic efficiency. The setup is one beat, the punchline is the second. Nothing unnecessary exists between them.',
    decisions: [
      'Two-panel maximum. social media humor must resolve before the next post appears; more panels means the joke is lost mid-scroll',
      'Character expression carries the entire joke. no reliance on caption text, making it shareable without the original post context',
      'Minimal background detail keeps every pixel of attention on the character beat, not the world around them',
    ],
    accent: '#B097BE',
  },
  {
    src: '/images/MeditationComic.webp',
    title: 'Visualizing Focus',
    sub: 'Abstract concept storytelling',
    brief: 'Illustrate the abstract internal experience of trying to focus. making the invisible battle between intention and distraction visible and universally recognisable.',
    desc: 'A visual narrative that makes a purely internal experience feel shared and seen. Perfect for editorial use and educational content where the feeling is the message and copy alone cannot carry it.',
    decisions: [
      'Visual contrast between calm intention and chaotic interruption drawn from the same character. the conflict is internal, not caused by an external antagonist',
      'Progression across panels mirrors the reader\'s exact lived experience. recognition triggers the emotional engagement that drives sharing',
      'No speech bubbles anywhere. the visual alone carries the meaning, making the strip language-agnostic and shareable across any market',
    ],
    accent: '#89B1CC',
  },
  {
    src: '/images/MysticalPanda.webp',
    title: 'Mascot Narrative',
    sub: 'Brand mascot in-world storytelling',
    brief: 'Demonstrate how a brand mascot holds up across different narrative scenarios while maintaining complete visual and tonal consistency.',
    desc: 'The mascot is designed to travel. different context, same character DNA. Consistency of proportion, restricted palette, and expression style is what turns a one-off character into a brand asset.',
    decisions: [
      'Proportions locked before scenario variation begins. the character must read as the same entity in every scene regardless of pose or context',
      'Palette restricted to 3 colours maximum. mascot characters need to reproduce reliably across merchandise, digital, and print without visual degradation',
      'Expression range tested at design stage. a character that can only do one face has limited story potential and limited brand value',
    ],
    accent: '#B097BE',
  },
  {
    src: '/images/IcecreamComic.webp',
    title: 'The Ice Cream Dilemma',
    sub: 'Four-panel punchline delivery',
    brief: 'Design a four-panel strip with maximum relatability. a setup patient enough that the punchline lands with full weight on the final beat.',
    desc: 'Classic setup-development-reversal-punchline structure. The joke works because the setup is patient. The character\'s internal conflict is the entire story. no external event triggers it.',
    decisions: [
      'Four panels chosen deliberately. three panels build the situation, the fourth subverts it. Fewer panels and the punchline lacks setup weight; more panels and the audience disengages before the payoff',
      'Character expression escalates across all four panels. the visual progression is the comedy, not just the final panel reveal',
      'Subject (ice cream indecision) selected for universal recognition. a hyper-specific relatable moment triggers a universal emotional response in the reader',
    ],
    accent: '#E9C672',
  },
];

export default function ComicPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Sequential Art. NicheUX Case Study</title>
        <meta name="description" content="Comics and sequential storytelling by NicheUX. Relatable narratives built for social media audiences." />
        <meta property="og:title" content="Sequential Art. NicheUX" />
        <meta property="og:description" content="Stories told in panels. One beat of setup, one beat of truth." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src="/images/ComicHeroWork.webp" alt="Sequential art and comic strips by NicheUX" className="w-full h-full object-cover opacity-45" loading="eager" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-[#0A0A0A]/05" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1, 1.16, 1], opacity: [0.06, 0.13, 0.06] }} transition={{ duration: 12, repeat: Infinity }} className="absolute w-[600px] h-[600px] rounded-full top-0 left-0 -translate-x-1/4 -translate-y-1/4" style={{ background: 'radial-gradient(circle,#B097BE 0%,transparent 65%)' }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 bg-[#B097BE]/15 border border-[#B097BE]/30 rounded-full text-[#B097BE] text-xs font-sans-medium uppercase tracking-widest">Comics · Sequential Art · Storytelling</span>
              <span className="text-white/50 text-xs font-sans-normal">Production № 11</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="font-serif-light text-white leading-[0.88] mb-6" style={{ fontSize: 'clamp(48px,8vw,112px)', letterSpacing: '-0.04em' }}>
              Sequential
              <span className="block italic text-[#B097BE]">Art</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed">
              Stories told in panels. One beat of setup, one beat of truth. Comics built to earn a save and make an audience feel seen.
            </motion.p>
          </motion.div>
        </section>

        {/* METADATA */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[{ label: 'Studio', value: 'NicheUX' }, { label: 'Discipline', value: 'Sequential Art · Comics' }, { label: 'Format', value: 'Strips · Multi-panel · Series' }, { label: 'Distribution', value: 'Social Media · Editorial · Brand' }].map(item => (
              <div key={item.label}><p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p><p className="text-white font-serif-light text-lg">{item.value}</p></div>
            ))}
          </div>
        </section>

        {/* THE DISCIPLINE */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Discipline</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">Comics are one of the most powerful content formats on social media. Almost nobody is doing them properly.</h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">A comic strip that makes someone laugh out loud earns a save. A save means they come back to it. They share it. They associate that feeling with your brand. Sequential art is one of the highest-performing content formats on social media and almost no brand is doing it well. NicheUX creates comics for digital audiences: designed at scroll speed, readable at thumbnail size, built to earn saves and shares rather than just impressions.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Strategy</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">Comics work for brands because they communicate without looking like they're trying to sell anything. A strip that makes someone laugh or feel seen earns trust in a way that a promotional post never does. The joke is the brand message. just dressed up so it doesn't feel like one.</p>
              <div className="space-y-3">
                {['Slice-of-life subjects for maximum audience recognition', 'Social-first format: works as a thumbnail and at full size', 'Consistent character design across every strip in a series', 'Brand storytelling through narrative, not promotion', 'Designed to earn saves and shares. not just views'].map(item => (
                  <div key={item} className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-[#B097BE] mt-2.5 flex-shrink-0" /><span className="text-white/50 font-sans-normal text-sm">{item}</span></div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section className="py-16 px-6 md:px-8 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-10">
              <div>
                <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Challenge</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Four strips. Four different comedic registers. quick-hit gag, abstract concept, mascot narrative, and classic four-panel setup. Each demands a different panel structure and timing approach while maintaining consistent visual quality.</p>
              </div>
              <div>
                <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Constraint</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Social media comics fail when the punchline is rushed. The setup must breathe. Every panel removed makes the punchline weaker. Every panel added risks losing the audience before the payoff. Panel count is a design decision, not an accident.</p>
              </div>
              <div>
                <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Measure</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">The metric for comic success on social media isn't likes. it's saves. A liked post is forgotten. A saved post is returned to. Comics that make someone feel seen get saved. That's the target every strip is built toward.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE WORK */}
        <section style={{ background: '#F1E9D2' }}>
          <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-8">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 32, height: 1, background: '#1a1a1a' }} />
              <span style={{ color: '#1a1a1a', fontSize: 10, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase' as const }}>The Work</span>
            </div>
            <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>Four strips. Four briefs.</h2>
            <p className="font-sans-normal text-base mt-3 max-w-xl" style={{ color: 'rgba(26,26,26,0.80)' }}>Each strip broken down: the brief, the comedic approach, the panel decisions, and what makes it earn the save.</p>
          </div>
          {STRIPS.map((strip, i) => (
            <motion.div key={strip.src} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true, margin: '-60px' }} style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}>
              <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20">
                <div className={`grid md:grid-cols-2 gap-12 items-start${i % 2 === 1 ? ' md:[&>*:first-child]:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden sticky top-8" style={{ border: '1px solid rgba(26,26,26,0.1)' }}>
                    <img src={strip.src} alt={`${strip.title} comic strip by NicheUX`} className="w-full h-auto" loading="lazy" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                  </div>
                  <div className="space-y-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="font-serif-light italic" style={{ fontSize: 13, color: 'rgba(26,26,26,0.55)' }}>0{i + 1}</span>
                      <div style={{ width: 32, height: 1, background: strip.accent }} />
                    </div>
                    <div>
                      <h3 className="font-serif-light mb-1" style={{ fontSize: 'clamp(22px,2.8vw,34px)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{strip.title}</h3>
                      <p className="font-sans-medium text-xs uppercase tracking-widest" style={{ color: strip.accent }}>{strip.sub}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(26,26,26,0.70)' }}>The Brief</p>
                      <p className="font-sans-normal text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.7)' }}>{strip.brief}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(26,26,26,0.70)' }}>The Strip</p>
                      <p className="font-sans-normal text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{strip.desc}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(26,26,26,0.70)' }}>Design Decisions</p>
                      <div className="space-y-3">
                        {strip.decisions.map(d => (
                          <div key={d} className="flex items-start gap-3">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: strip.accent }} />
                            <p className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{d}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* STAT BAR */}
        <section className="py-14 px-6 md:px-8 border-y border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
            {[{ value: '4', label: 'Distinct comedic formats. gag, abstract, mascot, four-panel' }, { value: '0', label: 'Promotional copy. the strip is the message' }, { value: '100%', label: 'Designed to earn saves, not just likes' }].map(({ value, label }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="font-serif-light text-[#B097BE] leading-none" style={{ fontSize: 'clamp(44px,5.5vw,64px)' }}>{value}</div>
                <div className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mt-3">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#0A0A0A' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Principles</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">How we build sequential stories.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'The beat is the unit of design', body: 'Every panel is a beat: setup, development, or punchline. Bad comics rush the punchline. Good comics earn it by letting the setup breathe. Panel count, panel size, and the silence between them are all design decisions. none of them happen by accident.', accent: '#B097BE' },
                { title: 'Relatable is harder than impressive', body: "An impressive illustration makes someone say wow. A relatable comic makes someone say that is exactly me. The second is harder to design and far more valuable on social media. Every strip starts with a universal human experience, then finds the visual shorthand that makes the reader feel seen.", accent: '#E9C672' },
                { title: 'Character consistency as brand', body: "If someone sees your comic without a username attached, they should recognise the character immediately. Consistent visual design. same proportions, same palette, same line weight. is what turns a strip into a series and a series into a brand asset.", accent: '#89B1CC' },
              ].map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="p-8 rounded-2xl border border-white/5 space-y-4">
                  <div className="w-8 h-px" style={{ backgroundColor: d.accent }} />
                  <h3 className="font-serif-light text-xl text-white">{d.title}</h3>
                  <p className="text-white/50 font-sans-normal text-sm leading-relaxed">{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#F1E9D2' }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="font-sans-medium text-xs uppercase tracking-widest block mb-4" style={{ color: 'rgba(176,151,190,0.7)' }}>Commission Sequential Work</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-6 leading-tight" style={{ color: '#1a1a1a' }}>Brand comics get saved. Promotional posts get scrolled.</h2>
              <p className="font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(26,26,26,0.80)' }}>Brand comics, social media strips, editorial sequences, or character-driven series. we build the story that earns the save.</p>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 font-sans-medium rounded-lg text-sm" style={{ background: '#B097BE', color: '#0A0A0A' }} aria-label="Commission comics work from NicheUX">Start a comics brief <ArrowRight size={14} /></button>
            </motion.div>
          </div>
        </section>

        {/* NEXT CASE */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5" style={{ background: '#0A0A0A' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span>
              <h3 className="font-serif-light text-3xl text-white">AI Canvas</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">Generative Innovation · Motion</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/featured-work/ai-canvas')} aria-label="View AI Canvas case study" className="inline-flex items-center gap-2 px-6 py-3 border border-[#B097BE]/40 text-[#B097BE] font-sans-medium rounded-lg hover:bg-[#B097BE] hover:text-black transition-all text-sm">View Case Study <ArrowRight size={14} /></button>
              <button onClick={() => navigate('/contact')} aria-label="Start a project with NicheUX" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a project</button>
            </div>
          </div>
        </section>
      </div>
      <BackToTopArrow />
    </>
  );
}
