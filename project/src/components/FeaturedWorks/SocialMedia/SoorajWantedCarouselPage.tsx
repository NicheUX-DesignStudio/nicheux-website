import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
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
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#E9C672]/30 hover:border-[#E9C672] transition-all shadow-xl"
      aria-label="Back to top"
    >
      <ArrowUp size={20} className="text-[#E9C672]" />
    </button>
  );
}

const SLIDES = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/sooraj/carousel/slide-${i + 1}.png`,
  num: i + 1,
}));

export default function SoorajWantedCarouselPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function next() {
    setDirection(1);
    setCurrent(c => (c + 1) % SLIDES.length);
  }
  function prev() {
    setDirection(-1);
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  }

  // Keyboard navigation for carousel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Helmet>
        <title>The Generation Conversation. NicheUX Case Study</title>
        <meta name="description" content="Wanted poster LinkedIn carousel for Sooraj Nikam's attendance at the Generation Conversation event, PorterShed Galway. Designed overnight by NicheUX." />
        <meta property="og:title" content="The Generation Conversation. Sooraj Nikam × NicheUX" />
        <meta property="og:description" content="8 slides designed overnight. Sooraj attended an entrepreneurship event. NicheUX built the LinkedIn content that told the story." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24"
        >
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src="/images/sooraj/carousel/slide-1.png"
              alt="The Generation Conversation Wanted poster LinkedIn campaign by NicheUX"
              className="w-full h-full object-cover object-center opacity-30"
              loading="eager"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/15" />

          {/* Sepia atmospheric glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute w-[800px] h-[800px] rounded-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
              style={{ background: 'radial-gradient(circle, #E9C672 0%, transparent 65%)' }}
            />
          </div>

          {/* 4AM badge */}
          <div className="absolute top-24 right-6 md:right-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center"
            >
              <div className="font-serif-light text-[#E9C672] leading-none" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>4am</div>
              <div className="text-white/25 text-xs uppercase tracking-widest font-sans-medium mt-1">delivered</div>
            </motion.div>
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
                Event Campaign · Social Media · Galway
              </span>
              <span className="text-white/50 text-xs font-sans-normal">Production № 04b</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif-light text-white leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(44px, 7.5vw, 108px)', letterSpacing: '-0.04em' }}
            >
              The Generation
              <span className="block italic text-[#E9C672]">Conversation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Brief received evening. 8 slides. Live by 4am. LinkedIn content for Sooraj's attendance at an entrepreneurship event in Galway. built to make the post as memorable as the event itself.
            </motion.p>
          </motion.div>
        </section>

        {/* CONTENT STRATEGY. parchment */}
        <section className="py-16 md:py-20 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-10">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: 'rgba(233,198,114,0.6)' }}>Why a carousel, not a reshare</span>
              <h2 className="font-serif-light text-3xl md:text-4xl mb-4 leading-tight" style={{ color: '#1a1a1a' }}>LinkedIn personal brand requires a specific kind of content.</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="font-serif-light text-xl" style={{ color: '#1a1a1a' }}>What Sooraj could have done</h3>
                {['Reshare the event organiser\'s poster: zero personal brand value', 'Post a selfie at the event: forgettable, looks like everyone else\'s content', 'Write a text-only post with takeaways: low visual impact, scrolled past', 'Not post at all: missed a brand-building moment'].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-4 h-px mt-3 flex-shrink-0" style={{ background: 'rgba(26,26,26,0.2)' }} />
                    <span className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="font-serif-light text-xl" style={{ color: '#1a1a1a' }}>What we designed instead</h3>
                {['8 Wanted poster slides. Visual recall that stops the scroll before anyone reads', 'Sooraj is the subject. Not the event, not the organiser. Him', 'Wanted poster format signals: this person thinks differently', 'Carousel format keeps people on the post for longer, which the algorithm rewards', '4am delivery. Posted at peak morning engagement hours'].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-4 h-px mt-3 flex-shrink-0" style={{ background: '#E9C672' }} />
                    <span className="font-sans-normal text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>{item}</span>
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
              { label: 'Event attended', value: 'PorterShed Galway' },
              { label: 'Content type', value: 'LinkedIn Carousel' },
              { label: 'Turnaround', value: 'Evening brief → 4am delivery' },
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
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-4" style={{ color: "rgba(233,198,114,0.6)" }}>The Brief</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-6 leading-tight" style={{ color: '#1a1a1a' }}>
                Sooraj attended an event. LinkedIn needed to know about it.
              </h2>
              <p className="font-sans-normal text-lg leading-relaxed" style={{ color: 'rgba(26,26,26,0.80)' }}>
                The Generation Conversation was a live entrepreneurship event at PorterShed Galway, supported by AIB and the Local Enterprise Office Gaillimh. Sooraj was attending, and wanted to share that on LinkedIn in a way that reflected who he is, not just where he was. Not a screenshot of the flyer. Something that told the story.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-4" style={{ color: "rgba(233,198,114,0.6)" }}>The Challenge</span>
              <p className="font-sans-normal text-lg leading-relaxed mb-6" style={{ color: 'rgba(26,26,26,0.80)' }}>
                The brief arrived in the evening. The content needed to be live before the next morning. Eight slides from nothing, overnight. A visual system built to feel personal and immediate, not templated.
              </p>
              <div className="space-y-3">
                {[
                  '8 carousel slides. Brief to live in one overnight session',
                  'LinkedIn content, not event promotion. Sooraj is the story',
                  'Wanted poster format chosen for recall, not convention',
                  'Designed to feel like Sooraj made it, not like a studio did',
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

        {/* THE WORK. carousel viewer */}
        <section className="py-10 md:py-20 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Work</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">Eight slides. Every one earned.</h2>
            </motion.div>

            {/* Carousel */}
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#111] aspect-square max-w-xl mx-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={current}
                  src={SLIDES[current].src}
                  alt={`Slide ${SLIDES[current].num}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }}
                />
              </AnimatePresence>

              {/* Nav arrows. inside the container so they're not clipped */}
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#1a1a1a]/90 border border-white/10 hover:border-[#E9C672]/50 transition-all"
              >
                <ChevronLeft size={18} className="text-white/70" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#1a1a1a]/90 border border-white/10 hover:border-[#E9C672]/50 transition-all"
              >
                <ChevronRight size={18} className="text-white/70" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 md:gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all ${i === current ? 'w-2 h-2 md:w-6 md:h-1.5 bg-[#E9C672]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </div>

            {/* Slide number indicator */}
            <div className="text-center mt-6">
              <span className="text-white/25 font-serif-light text-sm tracking-widest">
                {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Strip thumbnails */}
            <div className="grid grid-cols-8 gap-2 mt-6">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                    i === current ? 'border-[#E9C672]/60 scale-105' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <img
                    src={s.src}
                    alt={`Slide ${s.num}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

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
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{ color: 'rgba(233,198,114,0.6)' }}>The Decisions</span>
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{ color: '#1a1a1a' }}>Why Wanted posters for a LinkedIn post.</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Wanted posters for LinkedIn content',
                  body: "Most people share an event they attended by reposting the organiser's flyer. Sooraj doesn't work that way. he wants his LinkedIn to feel like him. The Wanted poster format creates visual contrast in a scroll, makes people stop, and signals that this person thinks differently. It makes attending an event look as interesting as running one.",
                  accent: '#E9C672',
                },
                {
                  title: 'One visual system, overnight',
                  body: 'Eight slides in one session requires a system, not a series of individual decisions. A single typographic grid with consistent weight and colour logic means every slide looks intentional without each one requiring fresh thought. Systematic design is what makes overnight possible without losing quality.',
                  accent: '#B097BE',
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

        {/* STAT CALLOUT */}
        <section className="py-16 px-6 md:px-8 bg-white/[0.015] border-y border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
            {[
              { value: '1', unit: 'night', label: 'Total turnaround time' },
              { value: '8', unit: 'slides', label: 'Carousel deliverables' },
              { value: '29', unit: 'quotes', label: 'Positioning statements designed' },
            ].map(({ value, unit, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="font-serif-light text-[#E9C672] leading-none" style={{ fontSize: 'clamp(52px, 7vw, 80px)' }}>
                  {value}<span className="text-[#E9C672]/50 ml-2" style={{ fontSize: '0.45em' }}>{unit}</span>
                </div>
                <div className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mt-3">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* THE OUTCOME */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Outcome</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                Eight slides. One overnight. A post that stood out.
              </h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Delivered live before morning. The Wanted poster carousel went out on Sooraj's LinkedIn for his attendance at the Generation Conversation at PorterShed Galway. a format that felt like him, not like a reshare.
              </p>
              <button
                onClick={() => navigate('/contact?selection=Social%20Media%20Starter%20Plan&hint=I%27d%20like%20to%20start%20a%20social%20media%20campaign%20')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm"
              >
                Start a campaign <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* NEXT WORK */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span>
              <h3 className="font-serif-light text-3xl text-white">Kingdom of Sweets</h3>
              <p className="text-white/65 font-sans-normal text-sm mt-1">Brand Identity · Event Signage · Ireland</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/featured-work/sooraj-candy-shop')}
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
