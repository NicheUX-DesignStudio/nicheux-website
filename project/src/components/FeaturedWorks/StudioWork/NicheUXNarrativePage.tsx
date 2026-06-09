import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp, Instagram, Linkedin } from 'lucide-react';
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

// Simulated social post card
function PostCard({ platform, text, date, index }: { platform: 'instagram' | 'linkedin' | 'threads'; text: string; date: string; index: number }) {
  const Icon = platform === 'instagram' ? Instagram : platform === 'linkedin' ? Linkedin : Instagram;
  const platformColors = {
    instagram: '#E9C672',
    linkedin: '#89B1CC',
    threads: '#B097BE',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4 hover:border-white/10 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color: platformColors[platform] }} />
          <span className="text-white/60 text-xs font-sans-medium capitalize">{platform}</span>
        </div>
        <span className="text-white/50 text-xs font-sans-normal">{date}</span>
      </div>
      <p className="text-white/70 font-sans-normal text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

const posts = [
  {
    platform: 'instagram' as const,
    text: 'Week 1. We have a name. We have a vision. We don\'t have clients yet. but we have a dragon. Dragon.webp is the first piece of original art NicheUX made for itself. Illustration by Indhupriya.',
    date: 'Week 1',
  },
  {
    platform: 'linkedin' as const,
    text: 'Starting a design studio in public. This is week one. We\'re documenting everything. the process, the decisions, the uncertainty. If you\'re building something too, watch this space.',
    date: 'Week 1',
  },
  {
    platform: 'threads' as const,
    text: 'NicheUX is live. Our first piece of art is a dragon. which tells you everything you need to know about what we\'re building. Not the safe option. Never the safe option.',
    date: 'Week 1',
  },
  {
    platform: 'instagram' as const,
    text: 'Six people. Six disciplines. One name: NicheUX. Creative direction, illustration, print design, AI visuals, motion, marketing. all under one roof. Meet the ensemble.',
    date: 'Week 1',
  },
  {
    platform: 'linkedin' as const,
    text: '"Where Design Meets Storytelling." That\'s not a tagline. It\'s a discipline. Every piece we make has a narrative logic. the visuals exist because a story needed to be told.',
    date: 'Week 1',
  },
];

export default function NicheUXNarrativePage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>NicheUX Narrative. Building in Public</title>
        <meta name="description" content="Week 1 of building NicheUX in public. Instagram, LinkedIn, and Threads. the studio origin story." />
        <meta property="og:title" content="NicheUX Narrative. Building in Public" />
        <meta property="og:description" content="Week one. A dragon. Six people. Building a studio in public." />
      </Helmet>

      <div className="bg-[#0A0A0A] overflow-hidden">

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24"
        >
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src="/images/Dragon.jpg" alt="Dragon. first original artwork by NicheUX, illustrated by Indhupriya"
              className="w-full h-full object-cover opacity-30"
              loading="eager"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/10" />

          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute w-[700px] h-[700px] bg-[#B097BE]/10 blur-[150px] rounded-full top-0 right-0"
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
              <span className="inline-block px-3 py-1 bg-[#B097BE]/15 border border-[#B097BE]/30 rounded-full text-[#B097BE] text-xs font-sans-medium uppercase tracking-widest">
                Studio Work · Building in Public
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif-light text-white leading-[0.9] mb-4"
            >
              The NicheUX
              <span className="block font-serif-normal text-[#B097BE]">Narrative</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl"
            >
              Week one. A dragon. Six people. Building a studio in public. on Instagram, LinkedIn, and Threads.
            </motion.p>
          </motion.div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[
              { label: 'Studio', value: 'NicheUX' },
              { label: 'Type', value: 'Building in Public' },
              { label: 'Channels', value: 'Instagram · LinkedIn · Threads' },
              { label: 'Week', value: 'Week 1. Ongoing' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-white/60 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p>
                <p className="text-white font-serif-light text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THE ORIGIN. parchment */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: '#F1E9D2', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-4" style={{ color: "rgba(176,151,190,0.6)" }}>The Origin</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-6 leading-tight" style={{ color: "#1a1a1a" }}>
                Week one. Everything starts with a dragon.
              </h2>
              <p className="font-sans-normal text-lg leading-relaxed mb-6" style={{ color: "rgba(26,26,26,0.80)" }}>
                NicheUX launched publicly in week one with a single piece of original art. Dragon.webp. illustrated by Indhupriya. It wasn't a logo or a product. It was a statement of intent: this studio makes things it believes in before anyone asks it to.
              </p>
              <p className="font-sans-normal text-lg leading-relaxed" style={{ color: "rgba(26,26,26,0.80)" }}>
                The studio documented the entire first week on Instagram, LinkedIn, and Threads. Six people, six disciplines, one name. Not a pitch. a record.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(26,26,26,0.12)" }}>
                <img
                  src="/images/Dragon.webp"
                  alt="Dragon. Indhupriya's first NicheUX illustration"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl px-4 py-3" style={{ background: "#1a1a1a" }}>
                <p className="text-xs font-sans-normal" style={{ color: "rgba(255,255,255,0.5)" }}>Illustration by</p>
                <p className="text-white font-sans-medium text-sm">Indhupriya</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE POSTS */}
        <section className="py-10 md:py-20 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">Week One Posts</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">Everything we said out loud.</h2>
              <p className="text-white/65 font-sans-normal text-base mt-3 max-w-xl">The studio in its own words. across three channels. from day one.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post, i) => (
                <PostCard key={i} {...post} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* THE TEAM. parchment */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: "#F1E9D2", borderTop: "1px solid rgba(26,26,26,0.08)" }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-14 text-center"
            >
              <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">The Ensemble</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">Six disciplines. One studio.</h2>
              <p className="text-white/65 font-sans-normal text-base mt-3 max-w-xl mx-auto">Introduced to the world in week one.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Thevaki', role: 'Creative Director, UI/UX, Web Dev', accent: '#E9C672' },
                { name: 'Indhupriya', role: 'Character & Illustration', accent: '#B097BE' },
                { name: 'Isaac', role: 'Print & Brand Design', accent: '#89B1CC' },
                { name: 'Kishore Aravind', role: 'Sales & Marketing', accent: '#89B1CC' },
              ].map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all"
                >
                  <div className="w-6 h-px mb-4" style={{ backgroundColor: member.accent }} />
                  <h3 className="font-serif-light text-xl text-white mb-1">{member.name}</h3>
                  <p className="text-white/65 font-sans-normal text-xs">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOLLOW THE STORY */}
        <section className="py-20 md:py-28 px-6 md:px-8 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[#B097BE]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">Follow the Story</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">
                The narrative is still being written.
              </h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Week one was the beginning. Follow NicheUX on Instagram, LinkedIn, and Threads as the studio grows. every project, every decision, documented in public.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/featured-work')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#B097BE]/40 text-[#B097BE] font-sans-medium rounded-lg hover:bg-[#B097BE] hover:text-black transition-all text-sm"
                >
                  See all studio work <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm"
                >
                  Work with us
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>

      <BackToTopArrow />
    </>
  );
}
