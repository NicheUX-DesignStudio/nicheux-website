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

export default function AadharshamPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Aadharsham Photography. NicheUX Case Study</title>
        <meta name="description" content="Editorial design and booklet layout for Aadharsham Photography. a photographer's body of work bound, sequenced, and presented. By NicheUX." />
        <meta property="og:title" content="Aadharsham Photography. NicheUX" />
        <meta property="og:description" content="A photographer's life's work. curated, laid out, and presented as a booklet publication." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24"
        >
          {/* Atmospheric gradient */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(233,198,114,0.06) 0%, transparent 60%), #0A0A0A" }} />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 16, repeat: Infinity }}
              className="absolute w-[800px] h-[800px] rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3"
              style={{ background: 'radial-gradient(circle, #E9C672 0%, transparent 60%)' }}
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
              <span className="inline-block px-3 py-1 bg-[#E9C672]/15 border border-[#E9C672]/30 rounded-full text-[#E9C672] text-xs font-sans-medium uppercase tracking-widest">
                Editorial Design · Photography Booklet · India
              </span>
              <span className="text-white/50 text-xs font-sans-normal">Production № 08</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif-light text-white leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(48px, 8vw, 112px)', letterSpacing: '-0.04em' }}
            >
              Aadharsham
              <span className="block italic text-[#E9C672]">Photography</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed"
            >
              A photographer's body of work. curated, sequenced, and presented as a booklet publication. Every photograph earned its place on the page.
            </motion.p>
          </motion.div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              { label: 'Client', value: 'Aadharsham Photography' },
              { label: 'Country', value: 'India' },
              { label: 'Discipline', value: 'Editorial Design · Print' },
              { label: 'Format', value: 'Photography Booklet' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p>
                <p className="text-white font-serif-light text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE BRIEF */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: "#F1E9D2", borderTop: "1px solid rgba(26,26,26,0.08)" }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-4" style={{ color: 'rgba(233,198,114,0.6)' }}>The Brief</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-6 leading-tight" style={{ color: '#1a1a1a' }}>
                A life's work deserves more than a folder.
              </h2>
              <p className="font-sans-normal text-lg leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>
                Aadharsham Photography needed a publication. Not a portfolio website, not a PDF gallery, but a real booklet. Printed, sequenced, and designed to hold the weight of years of photographic work. The brief was to bring editorial discipline to an artist's archive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-4" style={{ color: 'rgba(233,198,114,0.6)' }}>The Work</span>
              <p className="font-sans-normal text-lg leading-relaxed mb-6" style={{ color: 'rgba(26,26,26,0.80)' }}>
                Layout, image selection, sequencing, typographic hierarchy, and print-ready production. The booklet was designed to function as both a portfolio artifact and a keepsake. something a client or collaborator would hold onto.
              </p>
              <div className="space-y-3">
                {[
                  'Full editorial layout. every spread designed individually',
                  'Image sequencing for narrative flow',
                  'Typography calibrated for print stock and scale',
                  'Print-ready production files',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0" style={{ background: '#E9C672' }} />
                    <span className="font-sans-normal text-sm" style={{ color: 'rgba(26,26,26,0.80)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CASE STUDY IN PROGRESS */}
        <section className="py-20 md:py-24 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full border border-[#E9C672]/20 flex items-center justify-center mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-dashed border-[#E9C672]/40 rounded-full"
                />
              </div>
              <h2 className="font-serif-light text-3xl md:text-4xl text-white mb-4">Case study in production.</h2>
              <p className="text-white/50 font-sans-normal text-lg leading-relaxed max-w-xl mx-auto mb-8">
                The full booklet spreads and editorial process will be documented here. The production work exists. we're staging it properly.
              </p>
              <p className="text-white/25 font-sans-normal text-sm">Coming soon · Editorial design documentation in progress</p>
            </motion.div>
          </div>
        </section>

        {/* NEXT WORK */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">See All Work</span>
              <h3 className="font-serif-light text-3xl text-white">All Productions</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">Back to the full stage</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/featured-work')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm"
              >
                View All Productions <ArrowRight size={14} />
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
