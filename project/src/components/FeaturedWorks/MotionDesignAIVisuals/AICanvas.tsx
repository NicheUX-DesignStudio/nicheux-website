import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BackToTopArrow() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = () => setV(window.pageYOffset > 300); window.addEventListener('scroll', t); return () => window.removeEventListener('scroll', t); }, []);
  if (!v) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#E9C672]/30 hover:border-[#E9C672] transition-all shadow-xl" aria-label="Back to top"><ArrowUp size={20} className="text-[#E9C672]" /></button>;
}

const STILLS = [
  {
    src: '/images/AIImageStory.webp',
    title: 'AI Image Story',
    sub: 'Narrative · Editorial Direction · AI Stills',
    brief: 'Build a visual narrative using AI-generated imagery, directed with the same intent as a photo shoot. mood board, composition brief, and tone established before a single generation.',
    desc: 'The prompt is a brief. The output is a starting point, not a result. Every image went through editorial review and was either iterated or replaced until it served the narrative rather than just looking impressive.',
    decisions: [
      'Narrative sequence decided before any generation. each image needed to carry a specific story beat, not just look good in isolation',
      'Composition and mood briefed explicitly per shot: camera angle, subject placement, lighting direction, atmosphere. nothing left to chance',
      'Post-production used to unify colour temperature and contrast across all images, treating AI output as raw footage rather than finished work',
    ],
  },
];

export default function AICanvasPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>AI Canvas. NicheUX Case Study</title>
        <meta name="description" content="Generative art, AI-directed visuals, and motion design by NicheUX. Human imagination directing generative processes. not the other way around." />
        <meta property="og:title" content="AI Canvas. NicheUX" />
        <meta property="og:description" content="The prompt is a brief. The output is a starting point. The designer is always in the room." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src="/images/AIHeroWork.webp" alt="AI Canvas" className="w-full h-full object-cover object-top opacity-50" loading="eager" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-[#0A0A0A]/05" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }} transition={{ duration: 10, repeat: Infinity }} className="absolute w-[700px] h-[700px] rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3" style={{ background: 'radial-gradient(circle,#E9C672 0%,transparent 65%)' }} />
            <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.04, 0.10, 0.04] }} transition={{ duration: 15, repeat: Infinity }} className="absolute w-[500px] h-[500px] rounded-full bottom-0 left-0 -translate-x-1/4 translate-y-1/4" style={{ background: 'radial-gradient(circle,#B097BE 0%,transparent 65%)' }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 bg-[#E9C672]/15 border border-[#E9C672]/30 rounded-full text-[#E9C672] text-xs font-sans-medium uppercase tracking-widest">Generative Art · Motion Design · AI Direction</span>
              <span className="text-white/20 text-xs font-sans-normal">Production № 12</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="font-serif-light text-white leading-[0.88] mb-6" style={{ fontSize: 'clamp(48px,8vw,112px)', letterSpacing: '-0.04em' }}>
              AI
              <span className="block italic text-[#E9C672]">Canvas</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed">
              The prompt is a brief. The output is a starting point. Human imagination directing generative processes. the designer is always in the room.
            </motion.p>
          </motion.div>
        </section>

        {/* METADATA */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[{ label: 'Studio', value: 'NicheUX' }, { label: 'Discipline', value: 'AI Direction · Motion Design' }, { label: 'Tools', value: 'Generative AI · After Effects · Premiere' }, { label: 'Output', value: 'Stills · Motion · Social Content' }].map(item => (
              <div key={item.label}><p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p><p className="text-white font-serif-light text-lg">{item.value}</p></div>
            ))}
          </div>
        </section>

        {/* THE DISCIPLINE */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Discipline</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">Most AI-generated content looks like it was generated by AI. Ours does not.</h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">Anyone can type a prompt. What separates NicheUX's AI work from the rest of the internet is what happens before and after the generation. Before: a clear brief, a visual intention, a compositional direction. After: editorial review, iteration, post-production. The AI is the camera. The designer is still the photographer.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Approach</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">We work across AI-directed still image work, generative visual series, and motion design for social media. The starting point for every piece is a human brief. mood, composition, colour, subject, purpose. Generation is iterated with editorial discipline until the output matches the intent.</p>
              <div className="space-y-3">
                {['Art direction precedes every generation', 'Iterative prompting with design intent, not trial-and-error', 'Compositing and post-production to match final brief', 'Motion design: kinetic type, animated graphics, social-first', 'Ethical AI use: disclosed, directed, and design-led'].map(item => (
                  <div key={item} className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2.5 flex-shrink-0" /><span className="text-white/50 font-sans-normal text-sm">{item}</span></div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURED VIDEO. AI Series Concept Trailer */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 32, height: 1, background: '#E9C672' }} />
                <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium">Featured Work. Video Concept</span>
              </div>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-4">AI Series Concept Trailer.</h2>
              <p className="text-white/50 font-sans-normal text-lg max-w-2xl leading-relaxed">A dynamic video concept for an AI-themed series, featuring a dystopian cityscape and action sequences. Demonstrates visual consistency and narrative flow across AI-generated clips.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 mb-10">
                <video
                  src="/videos/AISeries.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/AIHeroWork.webp"
                  style={{ width: '100%', display: 'block', maxHeight: 600 }}
                  aria-label="AI Series Concept Trailer by NicheUX"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2">
                  <h3 className="font-serif-light text-2xl text-white mb-4">The Brief</h3>
                  <p className="text-white/60 font-sans-normal text-base leading-relaxed mb-6">Develop a concept trailer for an original AI-themed series. The visual world needed to establish a dystopian tone immediately. urban architecture, high contrast, kinetic action. Every clip had to feel like it belonged to the same world, generated from a single directorial vision rather than a sequence of unrelated prompts.</p>
                  <h3 className="font-serif-light text-2xl text-white mb-4">The Approach</h3>
                  <p className="text-white/60 font-sans-normal text-base leading-relaxed">World-building came first: colour palette, environmental rules, character visual language. Each clip was briefed individually then reviewed for tonal consistency against the whole. The result is a trailer that reads as a single coherent vision. not a montage of AI experiments.</p>
                </div>
                <div className="space-y-3 pt-1">
                  {[
                    'Dystopian world-building with consistent visual language',
                    'Action sequence pacing directed before generation',
                    'Narrative flow maintained across multiple AI-generated clips',
                    'Colour grading and tonal consistency applied in post',
                    'AI as production tool. not the creative shortcut',
                  ].map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2 flex-shrink-0" />
                      <span className="text-white/65 font-sans-normal text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI-DIRECTED STILLS */}
        <section style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-8">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 32, height: 1, background: '#1a1a1a' }} />
              <span style={{ color: 'rgba(26,26,26,0.45)', fontSize: 10, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase' as const }}>AI-Directed Stills</span>
            </div>
            <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>Directed outputs.</h2>
            <p className="font-sans-normal text-base mt-3 max-w-xl" style={{ color: 'rgba(26,26,26,0.6)' }}>Still image work built on art direction, not luck. Every image starts with a brief and ends when the brief is met.</p>
          </div>
          {STILLS.map((work, i) => (
            <motion.div key={work.src} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true, margin: '-60px' }} style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}>
              <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20">
                <div className={`grid md:grid-cols-2 gap-12 items-start${i % 2 === 1 ? ' md:[&>*:first-child]:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden sticky top-8" style={{ border: '1px solid rgba(26,26,26,0.1)' }}>
                    {/* object-position: top crops the Gemini watermark at the bottom of AI-generated images */}
                    <img src={work.src} alt={`${work.title} by NicheUX`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'top' }} loading="lazy" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                  </div>
                  <div className="space-y-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="font-serif-light italic" style={{ fontSize: 13, color: 'rgba(26,26,26,0.55)' }}>0{i + 1}</span>
                      <div style={{ width: 32, height: 1, background: '#E9C672' }} />
                    </div>
                    <div>
                      <h3 className="font-serif-light mb-1" style={{ fontSize: 'clamp(22px,2.8vw,34px)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{work.title}</h3>
                      <p className="font-sans-medium text-xs uppercase tracking-widest" style={{ color: '#E9C672' }}>{work.sub}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(26,26,26,0.70)' }}>The Brief</p>
                      <p className="font-sans-normal text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{work.brief}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(26,26,26,0.70)' }}>The Piece</p>
                      <p className="font-sans-normal text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{work.desc}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(26,26,26,0.70)' }}>Design Decisions</p>
                      <div className="space-y-3">
                        {work.decisions.map(d => (
                          <div key={d} className="flex items-start gap-3">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: '#E9C672' }} />
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
            {[{ value: '100%', label: 'Human art-directed. no prompt-and-post' }, { value: '2', label: 'Disciplines: AI stills + motion design' }, { value: '0', label: 'Templates used. every output is original' }].map(({ value, label }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="font-serif-light text-[#E9C672] leading-none" style={{ fontSize: 'clamp(44px,5.5vw,64px)' }}>{value}</div>
                <div className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mt-3">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.1)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: 'rgba(233,198,114,0.6)' }}>The Principles</span>
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>How we use AI in design.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'The brief precedes the prompt', body: 'A prompt is a brief in disguise. Vague prompts produce generic results. Specific prompts. informed by clear visual intent, reference points, and compositional goals. produce something worth using. We treat prompt-writing as a design skill, not a search query.', accent: '#E9C672' },
                { title: 'Generation is iteration, not completion', body: 'The first output is rarely the right one. Directing AI work is an iterative process: generate, evaluate against brief, adjust the direction, generate again. The discipline is knowing when an output has hit the intent. and not stopping before that point.', accent: '#B097BE' },
                { title: 'Motion adds meaning, not decoration', body: "An animation that doesn't add meaning is a distraction. Every motion decision. entrance timing, easing, duration. has a purpose: emphasis, reveal, or rhythm. Motion design at NicheUX starts with 'why is this moving?' before 'how does it move?'", accent: '#89B1CC' },
              ].map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="p-8 rounded-2xl space-y-4" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.1)' }}>
                  <div className="w-8 h-px" style={{ backgroundColor: d.accent }} />
                  <h3 className="font-serif-light text-xl" style={{ color: '#1a1a1a' }}>{d.title}</h3>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.65)' }}>{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">Commission Generative Work</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">If you can describe the image, we can direct it into existence.</h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">Generative stills, AI portrait series, motion design for social. we direct the output until it matches the brief. No prompting and hoping. Design thinking applied to generative tools.</p>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start an AI brief <ArrowRight size={14} /></button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div><span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">All Productions</span><h3 className="font-serif-light text-3xl text-white">Back to the Stage</h3><p className="text-white/65 font-sans-normal text-sm mt-1">See all 12 productions</p></div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/featured-work')} className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm">All Productions <ArrowRight size={14} /></button>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a project</button>
            </div>
          </div>
        </section>
      </div>
      <BackToTopArrow />
    </>
  );
}
