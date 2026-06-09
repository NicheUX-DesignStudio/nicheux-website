import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
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

const deliverables = [
  {
    title: 'The Generation Conversation',
    type: 'Event Social Campaign',
    description: '5-slide Wanted poster campaign for a live event at PorterShed Galway, supported by AIB and Local Enterprise Office Gaillimh. The Wanted poster format was chosen for urgency and visual recall. it made the event feel unmissable.',
    images: [
      '/images/sooraj/2.jpeg',
    ],
    accent: '#E9C672',
  },
  {
    title: '29 Positioning Quotes',
    type: 'Carousel Campaign',
    description: 'A 29-slide carousel of positioning quotes, designed overnight and delivered by 4am. Visual rhythm, consistent typographic voice, ready to deploy across LinkedIn and Instagram.',
    images: [
      '/images/sooraj/carousel/slide-1.png',
      '/images/sooraj/carousel/slide-2.png',
      '/images/sooraj/carousel/slide-3.png',
    ],
    accent: '#B097BE',
    note: 'Delivered overnight. Brief received evening; live by 4am.',
  },
  {
    title: 'LinkedIn Banner',
    type: 'Professional Brand Asset',
    description: 'A personal LinkedIn banner that distils Sooraj\'s positioning into a single frame. entrepreneurship, Ireland, storytelling.',
    images: ['/images/sooraj/linkedin/banner-green.png'],
    accent: '#89B1CC',
  },
  {
    title: 'Kingdom of Sweets',
    type: 'Event Arch Banner',
    description: 'Arch banner design for Kingdom of Sweets. large-format event signage designed for physical impact and photographic backdrops.',
    images: ['/images/sooraj/4.jpg'],
    accent: '#E9C672',
  },
];

export default function SoorajNikamPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Sooraj Nikam. NicheUX Case Study</title>
        <meta name="description" content="Social media campaigns, event design, and brand assets for an Ireland-based entrepreneur. Ongoing work by NicheUX." />
        <meta property="og:title" content="Sooraj Nikam. NicheUX Case Study" />
        <meta property="og:description" content="Wanted posters at 4am. 29 positioning quotes overnight. A brand built in public across Galway." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24"
        >
          {/* Hero image. first WhatsApp asset */}
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src="/images/sooraj/2.jpeg"
              alt="Sooraj Nikam. The Generation Conversation campaign"
              className="w-full h-full object-cover opacity-40"
              loading="eager"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/20" />

          {/* Atmospheric pulse */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute w-[600px] h-[600px] bg-[#E9C672]/8 blur-[150px] rounded-full bottom-0 left-0"
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
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 bg-[#E9C672]/15 border border-[#E9C672]/30 rounded-full text-[#E9C672] text-xs font-sans-medium uppercase tracking-widest">
                Social Media · Event Design · Brand Assets · Ireland
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif-light text-white leading-[0.9] mb-4"
            >
              Sooraj Nikam
              <span className="block font-serif-normal text-[#E9C672] text-3xl md:text-4xl mt-4">
                Ongoing. Ireland.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/50 font-sans-normal text-lg md:text-xl max-w-2xl"
            >
              Wanted posters at 4am. 29 positioning quotes overnight. A brand being built in public across Galway.
            </motion.p>
          </motion.div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              { label: 'Client', value: 'Sooraj Nikam' },
              { label: 'Country', value: 'Ireland' },
              { label: 'Discipline', value: 'Social, Event, Brand' },
              { label: 'Status', value: 'Ongoing' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-white/30 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p>
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
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Brief</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                A founder building in public, at speed.
              </h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">
                Sooraj is an entrepreneur based in Galway, Ireland. The work with NicheUX is ongoing and reactive. event campaigns go live within hours, social content is turned around overnight, brand assets are built to match momentum rather than planned cycles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Challenge</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">
                Consistency without a fixed brand system. Sooraj moves across event promotion, personal positioning, and commercial retail. each requiring a different visual register while still feeling like the same person. The design has to adapt without losing coherence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* THE WORK. deliverables */}
        <section className="py-10 md:py-20 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Work</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">Four deliverables. One ongoing relationship.</h2>
            </motion.div>

            <div className="space-y-20">
              {deliverables.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className="space-y-4">
                    <div className="w-8 h-px" style={{ backgroundColor: item.accent }} />
                    <span className="text-white/30 text-xs uppercase tracking-widest font-sans-medium">{item.type}</span>
                    <h3 className="font-serif-light text-3xl text-white">{item.title}</h3>
                    <p className="text-white/60 font-sans-normal text-base leading-relaxed">{item.description}</p>
                    {item.note && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.accent }} />
                        <span className="text-white/50 text-xs font-sans-medium">{item.note}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {item.images.map((src, j) => (
                      <div key={j} className="rounded-xl overflow-hidden border border-white/5 bg-black/20">
                        <img
                          src={src}
                          alt={`${item.title}. ${j + 1}`}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
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

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Wanted poster for the event campaign',
                  body: 'The Generation Conversation needed to feel unmissable. A Wanted poster format creates urgency, visual contrast in a feed, and an immediate sense of occasion. It also photographs well at a live event.',
                  accent: '#E9C672',
                },
                {
                  title: 'Overnight delivery on positioning quotes',
                  body: 'Sooraj needed the 29-quote carousel within hours. The decision was to design systematically. one typographic grid, consistent colour logic. so each slide felt like a chapter in the same book rather than 29 individual decisions.',
                  accent: '#B097BE',
                },
              ].map((d, i) => (
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
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Outcome</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                A brand that moves at the speed of its founder.
              </h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                The work is ongoing. Each deliverable adds another layer to a visual identity that's being built in public, at pace, without losing its coherence.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm"
              >
                Start a social project <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* NEXT WORK */}
        <section className="py-20 px-6 md:px-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-white/30 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Case Study</span>
              <h3 className="font-serif-light text-3xl text-white">SSJC Tournament</h3>
              <p className="text-white/40 font-sans-normal text-sm mt-1">Print & merch Design · Malaysia</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/featured-work/ssjc-tournament')}
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
