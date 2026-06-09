import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BackToTopArrow() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = () => setV(window.pageYOffset > 300); window.addEventListener('scroll', t); return () => window.removeEventListener('scroll', t); }, []);
  if (!v) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#89B1CC]/30 hover:border-[#89B1CC] transition-all shadow-xl" aria-label="Back to top"><ArrowUp size={20} className="text-[#89B1CC]" /></button>;
}

const WORKS = [
  {
    src: '/images/Dragon.webp',
    title: 'The Dragon',
    sub: 'Character Design · Fantasy · Publishing',
    brief: 'A high-impact concept art piece demonstrating mastery of texture, dynamic lighting, and complex composition for publishing and senior concept art roles.',
    desc: 'Rim and specular lighting separate the form from the background without losing the darkness of the piece. Scale texture is handled through value variation rather than individual line detail. faster to read, more convincing at any print size.',
    decisions: [
      'Rim/specular lighting over frontal light. creates immediate drama while keeping the silhouette readable at thumbnail size and full size equally',
      'Scale texture built with value variation, not line-by-line detail. this reads faster and holds up better at print resolution than line-heavy rendering',
      'Warm ambient fill against a cool rim prevents the piece reading flat despite the predominantly dark background',
    ],
    accent: '#89B1CC',
  },
  {
    src: '/images/SkullFace.webp',
    title: 'Anatomical Concept Study',
    sub: 'Anatomy · Technical Illustration · Character',
    brief: 'Demonstrate command of technical anatomical illustration with artistic stylisation. confirming ability to handle serious, specialist subject matter.',
    desc: 'Skeletal structure rendered with dramatic shading and deliberate stylisation. Classical anatomical study applied to a contemporary visual language. structure first, surface treatment second.',
    decisions: [
      'High-contrast value structure prioritises form over texture. skeletal anatomy reads cleanly in silhouette before any surface detail is added',
      'Stylisation applied after structural accuracy is established. the distortion is an artistic choice, not accidental',
      'Dark negative space used as compositional weight, not neutral background. the void is designed as part of the piece',
    ],
    accent: '#B097BE',
  },
  {
    src: '/images/Woman.webp',
    title: 'Dynamic Figure Study',
    sub: 'Figure Drawing · Anatomy · Editorial',
    brief: 'Showcase proficiency in human anatomy, dynamic posing, and conveying mood through posture and gesture rather than facial expression.',
    desc: 'Weight distribution, line of action, and secondary gesture all read correctly. Mood is carried entirely by posture. crucial for character-driven projects where the face is secondary or absent.',
    decisions: [
      'Line of action established before any rendering. the pose reads in silhouette before a single value is placed',
      'Weight shift visible through hip/shoulder counter-balance. the figure looks physically credible, not simply posed',
      'Mood carried by posture and gesture only. no reliance on facial expression, making this approach more versatile across character design contexts',
    ],
    accent: '#E9C672',
  },
];

export default function ConceptualAnatomyPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Conceptual Art. NicheUX Case Study</title>
        <meta name="description" content="High-detail concept art and illustration by NicheUX. Characters, environments, and conceptual work for publishing, gaming, and branding." />
        <meta property="og:title" content="Conceptual Art. NicheUX" />
        <meta property="og:description" content="Technical mastery and imagination working at the same level of discipline." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src="/images/ConceptualArtHeroWork.webp" alt="Conceptual Art" className="w-full h-full object-cover opacity-50" loading="eager" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-[#0A0A0A]/05" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 16, repeat: Infinity }} className="absolute w-[600px] h-[600px] rounded-full bottom-0 right-0 translate-x-1/4 translate-y-1/4" style={{ background: 'radial-gradient(circle,#89B1CC 0%,transparent 65%)' }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 bg-[#89B1CC]/15 border border-[#89B1CC]/30 rounded-full text-[#89B1CC] text-xs font-sans-medium uppercase tracking-widest">Concept Art · Character Design · Illustration</span>
              <span className="text-white/50 text-xs font-sans-normal">Production № 10</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="font-serif-light text-white leading-[0.88] mb-6" style={{ fontSize: 'clamp(48px,8vw,112px)', letterSpacing: '-0.04em' }}>
              Conceptual
              <span className="block italic text-[#89B1CC]">Art</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed">
              Technical mastery and imagination working at the same level of discipline. Characters, environments, and concepts built for publishing, gaming, and visual branding.
            </motion.p>
          </motion.div>
        </section>

        {/* METADATA */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[{ label: 'Studio', value: 'NicheUX' }, { label: 'Discipline', value: 'Concept Art · Illustration' }, { label: 'Contexts', value: 'Publishing · Gaming · Branding' }, { label: 'Scope', value: 'Characters · Anatomy · Studies' }].map(item => (
              <div key={item.label}><p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p><p className="text-white font-serif-light text-lg">{item.value}</p></div>
            ))}
          </div>
        </section>

        {/* THE DISCIPLINE */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Discipline</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">A great character design tells you who they are before they say a single word.</h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">Concept art is not just drawing. It is world-building compressed into a single image. The posture, the clothing, the silhouette at thumbnail size. every element either adds meaning or takes it away. At NicheUX, concept art starts with classical anatomy and proportion, then gets pushed into publishing covers, game assets, brand mascots, and editorial work. The result holds up at any scale and rewards the people who look closely.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Process</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">Every illustration brief starts with research: what does this character, creature, or concept need to communicate about itself? Then structure: proportion, anatomy, silhouette. Then detail: texture, light, atmosphere. The result is work that holds up at thumbnail size and rewards close inspection.</p>
              <div className="space-y-3">
                {['Classical anatomy and proportion as foundation. always', 'Character design with embedded narrative, not just surface decoration', 'Silhouette test before any rendering begins', 'Digital painting with traditional technique discipline', 'Delivered print-ready: correct resolution and colour profile'].map(item => (
                  <div key={item} className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-[#89B1CC] mt-2.5 flex-shrink-0" /><span className="text-white/50 font-sans-normal text-sm">{item}</span></div>
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
                <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Challenge</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Three distinct subject types. fantasy character design, anatomical study, and figure work. Each demands a different technical approach while sharing the same underlying discipline: structure before style, always.</p>
              </div>
              <div>
                <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Standard</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Publishing-grade and game-ready concept art holds up at any output size. A piece that only works at full resolution is a piece that only works in one context. Every illustration here reads at 100px and at 3000px.</p>
              </div>
              <div>
                <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Talent</span>
                <p className="text-white/60 font-sans-normal text-base leading-relaxed">Every piece in this case study was created by Indhupriya. a senior illustrator with classical training. No AI assistance. No stock references used as tracing foundations. Original work, from observation.</p>
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
            <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>Studio pieces.</h2>
            <p className="font-sans-normal text-base mt-3 max-w-xl" style={{ color: 'rgba(26,26,26,0.80)' }}>Each piece broken down: the brief, the technique, the specific design decisions, and what they demonstrate.</p>
          </div>
          {WORKS.map((work, i) => (
            <motion.div key={work.src} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true, margin: '-60px' }} style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}>
              <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20">
                <div className={`grid md:grid-cols-2 gap-12 items-start${i % 2 === 1 ? ' md:[&>*:first-child]:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden sticky top-8" style={{ border: '1px solid rgba(26,26,26,0.1)' }}>
                    <img src={work.src} alt={`${work.title}. illustration by NicheUX`} className="w-full h-auto" loading="lazy" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                  </div>
                  <div className="space-y-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="font-serif-light italic" style={{ fontSize: 13, color: 'rgba(26,26,26,0.55)' }}>0{i + 1}</span>
                      <div style={{ width: 32, height: 1, background: work.accent }} />
                    </div>
                    <div>
                      <h3 className="font-serif-light mb-1" style={{ fontSize: 'clamp(22px,2.8vw,34px)', color: '#1a1a1a', letterSpacing: '-0.02em' }}>{work.title}</h3>
                      <p className="font-sans-medium text-xs uppercase tracking-widest" style={{ color: work.accent }}>{work.sub}</p>
                    </div>
                    <div>
                      <p className="font-sans-medium text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(26,26,26,0.70)' }}>The Brief</p>
                      <p className="font-sans-normal text-base leading-relaxed" style={{ color: 'rgba(26,26,26,0.7)' }}>{work.brief}</p>
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
                            <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: work.accent }} />
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
            {[{ value: '0', label: 'AI assistance used. every line is hand-drawn' }, { value: '3', label: 'Distinct illustration disciplines in one case study' }, { value: '100%', label: 'Silhouette-readable. works at thumbnail and full size' }].map(({ value, label }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="font-serif-light text-[#89B1CC] leading-none" style={{ fontSize: 'clamp(44px,5.5vw,64px)' }}>{value}</div>
                <div className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mt-3">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.1)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-14">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: 'rgba(137,177,204,0.6)' }}>The Principles</span>
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>How we build characters.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Silhouette first', body: 'A character that only reads at 100% zoom is a character that only works in one context. Every design starts with the silhouette test: is it instantly readable without any internal detail? If yes, add detail. If no, redesign before you render.', accent: '#89B1CC' },
                { title: 'Anatomy as vocabulary', body: "Classical anatomy isn't about strict realism. it's about credibility. A character with structurally sound anatomy feels real even when heavily stylised. We use anatomical understanding as the foundation, then push style as far as the brief demands.", accent: '#B097BE' },
                { title: 'Narrative embedded in design', body: "A character's story should be readable in their design before anyone writes a line of copy. Clothing, posture, wear and tear, colour choices. every visual element is an opportunity to add narrative depth without adding text.", accent: '#E9C672' },
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
        <section className="py-20 md:py-28 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <span className="text-[#89B1CC]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">Commission Illustration Work</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">If you can describe it, we can build it.</h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">Publishing covers, game characters, brand mascots, editorial pieces. The kind of illustration that earns a double-take and makes someone want to know more. Send us a brief and tell us what you are trying to bring to life.</p>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#89B1CC] text-[#0A0A0A] font-sans-medium rounded-lg hover:bg-[#E9C672] transition-colors text-sm">Start an illustration brief <ArrowRight size={14} /></button>
            </motion.div>
          </div>
        </section>

        {/* NEXT CASE */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span>
              <h3 className="font-serif-light text-3xl text-white">Sequential Art</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">Comics & Storytelling</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/featured-work/sequential-art')} className="inline-flex items-center gap-2 px-6 py-3 border border-[#89B1CC]/40 text-[#89B1CC] font-sans-medium rounded-lg hover:bg-[#89B1CC] hover:text-black transition-all text-sm">View Case Study <ArrowRight size={14} /></button>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a project</button>
            </div>
          </div>
        </section>
      </div>
      <BackToTopArrow />
    </>
  );
}
