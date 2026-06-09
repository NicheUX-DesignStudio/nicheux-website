import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BackToTopArrow() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = () => setV(window.pageYOffset > 300); window.addEventListener('scroll', t); return () => window.removeEventListener('scroll', t); }, []);
  if (!v) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#E9C672]/30 hover:border-[#E9C672] transition-all shadow-xl" aria-label="Back to top"><ArrowUp size={20} className="text-[#E9C672]" /></button>;
}

const PIECES = [
  {
    src: '/images/BenzPoster.webp',
    title: 'Commercial Ad Mockup',
    sub: 'Automotive · Luxury · Dark Tone',
    brief: 'Drive interest in a high-performance, efficient product through a single, arresting visual.',
    desc: 'Dark, moody lighting eliminates every visual competitor and focuses the eye entirely on the car. Minimalist typography and deliberate hierarchy reinforce a luxury, professional tone with nothing wasted.',
    decisions: [
      'Dark background removes visual noise. the product becomes the only element in the frame worth looking at',
      'Single-weight sans-serif headline prevents the type competing with the image for attention',
      'Bottom-anchored copy creates breathing room above, letting the car fill and dominate the space',
    ],
    accent: '#E9C672',
  },
  {
    src: '/images/LoveArtPoster.webp',
    title: 'Abstract Personal Poster',
    sub: 'Personal · Editorial · Silhouette',
    brief: 'Explore abstract themes of art, identity, and landscape through a dreamlike visual language.',
    desc: 'Silhouette/cutout technique and warm natural photography combine to create a reflection piece that feels personal without being literal. Colour blocking guides the eye to key words without conventional typographic hierarchy.',
    decisions: [
      'Silhouette technique removes literal representation. the viewer projects their own identity into the form rather than being told how to feel',
      'Warm photographic texture inside a cold geometric cutout creates deliberate visual tension that holds attention',
      'Selective colour-blocking on key words defines reading order without needing size or weight hierarchy',
    ],
    accent: '#B097BE',
  },
  {
    src: '/images/MotherNature.webp',
    title: 'Environmental Advocacy',
    sub: 'Editorial · Conservation · Double-Exposure',
    brief: 'Create emotional resonance for a conservation message that connects humanity and the environment.',
    desc: 'Double-exposure technique blends a human face with natural forms, making the visual argument before a word is read. Serif typography adds an elegant, serious tone that the subject demands.',
    decisions: [
      'Double-exposure fuses human and natural form. the message (we are nature) becomes the technique itself, not just copy layered over an image',
      'Serif typeface signals permanence and seriousness, contrasting the informal register of most environmental content',
      'Earth-toned palette only. prevents the piece romanticising what should feel urgent',
    ],
    accent: '#89B1CC',
  },
];

export default function VisualCommunicationPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Visual Communication. NicheUX Case Study</title>
        <meta name="description" content="Poster design, advertising, and print collateral by NicheUX. Commercial precision meeting editorial craft." />
        <meta property="og:title" content="Visual Communication. NicheUX" />
        <meta property="og:description" content="A poster has one job: make you stop. We design for that moment." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src="/images/PrintBrandHeroWork.webp" alt="Visual Communication" className="w-full h-full object-cover opacity-40" loading="eager" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/10" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1, 1.14, 1], opacity: [0.06, 0.14, 0.06] }} transition={{ duration: 14, repeat: Infinity }} className="absolute w-[700px] h-[700px] rounded-full -top-40 -right-40" style={{ background: 'radial-gradient(circle,#E9C672 0%,transparent 65%)' }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 bg-[#E9C672]/15 border border-[#E9C672]/30 rounded-full text-[#E9C672] text-xs font-sans-medium uppercase tracking-widest">Print · Advertising · Brand Design</span>
              <span className="text-white/50 text-xs font-sans-normal">Production № 09</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="font-serif-light text-white leading-[0.88] mb-6" style={{ fontSize: 'clamp(48px,8vw,112px)', letterSpacing: '-0.04em' }}>
              Visual
              <span className="block italic text-[#E9C672]">Communication</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed">
              A poster has one job: make you stop. We design for that moment. commercial precision meeting editorial craft.
            </motion.p>
          </motion.div>
        </section>

        {/* METADATA */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[{ label: 'Studio', value: 'NicheUX' }, { label: 'Discipline', value: 'Print · Brand · Advertising' }, { label: 'Medium', value: 'Digital & Physical Print' }, { label: 'Scope', value: 'Posters · Campaigns · Identity' }].map(item => (
              <div key={item.label}><p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p><p className="text-white font-serif-light text-lg">{item.value}</p></div>
            ))}
          </div>
        </section>

        {/* THE DISCIPLINE */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Discipline</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">A poster cannot explain itself. It has one second to say everything.</h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">Visual communication is the most unforgiving discipline in design. A poster cannot explain itself. An advertisement cannot apologise. Every decision. the typeface, the weight, the silence. either works or it doesn't. NicheUX builds print and advertising work from a single point of focus: what is the one thing this piece needs to communicate, and how do we make it impossible to miss?</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Approach</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">Every brief starts with a single question: what is the one thing this needs to communicate? The concept must be clear before the execution begins. A beautiful layout built on a weak idea is still a weak piece. Once the concept is right, every visual decision. type, colour, composition, negative space. serves it.</p>
              <div className="space-y-3">
                {['Concept-first. idea before execution, always', 'Typographic rigour: type is architecture, not decoration', 'Print-spec files: CMYK, correct bleed, correct resolution', 'Brand identity systems that extend consistently across surfaces', 'Commercial briefs to editorial campaigns. same discipline applies'].map(item => (
                  <div key={item} className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2.5 flex-shrink-0" /><span className="text-white/50 font-sans-normal text-sm">{item}</span></div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE CHALLENGE */}
        <section className="py-16 px-6 md:px-8 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-10">
              <div>
                <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Challenge</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Three briefs. Three completely different tones. commercial luxury, personal editorial, conservation advocacy. The discipline is the same across all of them: one idea, made visually impossible to ignore.</p>
              </div>
              <div>
                <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Constraint</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Print design has no second chances. The piece goes to print at a fixed resolution in a fixed colour mode. Every decision has to be right before it leaves the studio. CMYK, bleed, resolution. not approximate.</p>
              </div>
              <div>
                <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Result</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Three pieces that each do exactly one job and do it completely. The Benz ad sells. The personal poster reflects. The advocacy editorial argues. No piece tries to do more than its brief allows.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE WORK */}
        <section style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-8">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 32, height: 1, background: '#1a1a1a' }} />
              <span style={{ color: 'rgba(26,26,26,0.45)', fontSize: 10, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase' as const }}>The Work</span>
            </div>
            <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>Three pieces. Three briefs.</h2>
            <p className="font-sans-normal text-base mt-3 max-w-xl" style={{ color: 'rgba(26,26,26,0.80)' }}>Each piece analysed: the brief, the design decisions, and what they demonstrate about the craft.</p>
          </div>
          {PIECES.map((piece, i) => (
            <motion.div key={piece.src} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true, margin: '-60px' }} style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}>
              <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20">
                <div className={`grid md:grid-cols-2 gap-12 items-start${i % 2 === 1 ? ' md:[&>*:first-child]:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden sticky top-8" style={{ border: '1px solid rgba(26,26,26,0.1)' }}>
                    <img src={piece.src} alt={`${piece.title}. print work by NicheUX`} className="w-full h-auto" loading="lazy" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                  </div>
                  <div className="space-y-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="font-serif-light italic" style={{ fontSize: 13, color: 'rgba(26,26,26,0.55)' }}>0{i + 1}</span>
                      <div style={{ width: 32, height: 1, background: piece.accent }} />
                    </div>
                    <div>
                      <h3 className="font-serif-light mb-1" style={{ fontSize: 'clamp(22px,2.8vw,34px)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{piece.title}</h3>
                      <p className="font-sans-medium text-xs uppercase tracking-widest" style={{ color: piece.accent }}>{piece.sub}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(26,26,26,0.70)' }}>The Brief</p>
                      <p className="font-sans-normal text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.7)' }}>{piece.brief}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(26,26,26,0.70)' }}>The Piece</p>
                      <p className="font-sans-normal text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{piece.desc}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(26,26,26,0.70)' }}>Design Decisions</p>
                      <div className="space-y-3">
                        {piece.decisions.map(d => (
                          <div key={d} className="flex items-start gap-3">
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: piece.accent }} />
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
            {[{ value: '3', label: 'Distinct tonal registers. luxury, personal, advocacy' }, { value: '0', label: 'Stock imagery or template layouts used' }, { value: '100%', label: 'Print-ready: CMYK, bleed, correct resolution on every file' }].map(({ value, label }) => (
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
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>How we design print.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Concept before execution', body: 'A weak idea in a beautiful layout is still a weak idea. Every piece starts with one question: what is the single thing this must communicate? Once the concept is clear, design serves it. Not before.', accent: '#E9C672' },
                { title: 'Typography as architecture', body: 'In print work, type carries most of the weight. Font choice, weight, spacing, hierarchy. every decision is structural. Typographic decisions are load-bearing, not decorative. We treat them accordingly.', accent: '#B097BE' },
                { title: 'Print-ready from the start', body: 'Designing without knowing the output is designing blind. Every piece is built to the correct colour mode, bleed spec, and resolution from the first artboard. What you approve is what gets printed. no surprises.', accent: '#89B1CC' },
              ].map((d, i) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="p-8 rounded-2xl space-y-4" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.1)' }}>
                  <div className="w-8 h-px" style={{ backgroundColor: d.accent }} />
                  <h3 className="font-serif-light text-xl" style={{ color: '#1a1a1a' }}>{d.title}</h3>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">Commission Print Work</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">You need print that people actually stop for.</h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">From a single campaign poster to a full brand identity system. we design print that earns the wall it's put on.</p>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a print project <ArrowRight size={14} /></button>
            </motion.div>
          </div>
        </section>

        {/* NEXT CASE */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span>
              <h3 className="font-serif-light text-3xl text-white">Conceptual Art</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">High-Detail Illustration</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/featured-work/conceptual-art')} className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm">View Case Study <ArrowRight size={14} /></button>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a project</button>
            </div>
          </div>
        </section>
      </div>
      <BackToTopArrow />
    </>
  );
}
