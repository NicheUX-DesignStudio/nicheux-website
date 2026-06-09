import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp, ExternalLink, Monitor, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GOLD = '#E9C672';
const LAVENDER = '#B097BE';
const BLUE = '#89B1CC';
const BLACK = '#0A0A0A';
const PARCHMENT = '#F1E9D2';
const INK = '#1a1a1a';

function BackToTopArrow() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = () => setV(window.pageYOffset > 300); window.addEventListener('scroll', t); return () => window.removeEventListener('scroll', t); }, []);
  if (!v) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#E9C672]/30 hover:border-[#E9C672] transition-all shadow-xl" aria-label="Back to top"><ArrowUp size={20} className="text-[#E9C672]" /></button>;
}

const SCREENS = [
  { name: 'Homepage', desc: 'Artisan coffee and baked goods. The hero says everything about the brand before you scroll.', laptop: '/images/Desktop-home-design.png', mobile: '/images/Mobile-home-design-web-ecommerce.png' },
  { name: 'merch All Products', desc: 'Coffee, baked goods, and gifts. Clean product grid with filters and clear category hierarchy.', laptop: '/images/Desktop-products-design.png', mobile: '/images/Mobile-product-design-web-ecommerce.png' },
  { name: 'Our Story', desc: '"From humble beginnings to your favourite coffee spot." The brand story that earns trust after the product earns attention.', laptop: '/images/Desktop-about-design.png', mobile: '/images/Mobile-about-design-web-ecommerce.png' },
];

const FLOWS = [
  { src: '/images/bloom-process/flow-primary.png', title: 'Primary Flow', sub: 'Market Discovery → Online Purchase', desc: 'The main conversion path: how a customer discovers Bloom & Brew in a market setting, then completes a purchase online. Mapped to ensure zero friction between physical discovery and digital checkout.' },
  { src: '/images/bloom-process/flow-quote.png', title: 'Event Planner Flow', sub: 'Custom Quote Request Journey', desc: 'B2B path for event planners requesting custom orders. Separate from the direct-consumer flow. different intent, different information needs, different conversion point.' },
  { src: '/images/bloom-process/flow-edge.png', title: 'Edge Case', sub: 'Dietary Restriction → Purchase', desc: 'A user with dietary restrictions searching for suitable products. Designed so filtering and product information handle this without requiring customer support contact.' },
  { src: '/images/bloom-process/flow-error.png', title: 'Error State', sub: 'Out of Stock Item', desc: 'What happens when a product is out of stock. The flow keeps the user engaged: notify me, browse similar, or continue merchping. never a dead end.' },
];

function DeviceMockup() {
  const [device, setDevice] = useState<'laptop'|'mobile'>('laptop');
  const [screen, setScreen] = useState(0);
  const [animating, setAnimating] = useState(false);
  const go = useCallback((dir: 1|-1) => { if (animating) return; setAnimating(true); setScreen(s => (s + dir + SCREENS.length) % SCREENS.length); setTimeout(() => setAnimating(false), 450); }, [animating]);
  useEffect(() => { const id = setInterval(() => { if (!animating) go(1); }, 5000); return () => clearInterval(id); }, [animating, go]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [go]);
  const cur = SCREENS[screen];

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['laptop','mobile'] as const).map(d => {
          const Icon = d === 'laptop' ? Monitor : Smartphone;
          return <button key={d} onClick={() => setDevice(d)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans-medium transition-all ${device === d ? 'bg-[#E9C672] text-black' : 'bg-white/5 text-white/40 border border-white/10 hover:text-white/70'}`}><Icon size={13} />{d === 'laptop' ? 'Desktop' : 'Mobile'}</button>;
        })}
      </div>
      <div style={{ perspective: "1100px" }}>
        <div style={{ transform: device === 'laptop' ? "rotateX(5deg) rotateY(-1.5deg)" : "rotateX(3deg)", transformStyle: "preserve-3d" }}>
          {device === 'laptop' ? (
            <div>
              <div style={{ background: "#1c1c1c", borderRadius: "12px 12px 0 0", padding: "11px 11px 0", border: "1.5px solid rgba(233,198,114,0.15)", borderBottom: "none" }}>
                <div style={{ background: "#111", borderRadius: "7px 7px 0 0", overflow: "hidden" }}>
                  <div style={{ background: "#0d0d0d", padding: "7px 11px", display: "flex", alignItems: "center", gap: 7, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display: "flex", gap: 4 }}>{["#ff5f56","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.75 }} />)}</div>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 3, padding: "2px 8px", fontSize: 9, color: "rgba(255,255,255,0.18)", fontFamily: "'Source Sans Pro', sans-serif" }}>bloomandbrewcoffeecompany.ca</div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.img key={`l-${screen}`} src={cur.laptop} alt={cur.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ width: "100%", height: "auto", display: "block", maxHeight: 440, objectFit: "cover", objectPosition: "top" }} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.1"; }} />
                  </AnimatePresence>
                </div>
              </div>
              <div style={{ height: 16, background: "#141414", borderRadius: "0 0 8px 8px", border: "1.5px solid rgba(233,198,114,0.1)", borderTop: "none", boxShadow: "0 18px 50px rgba(0,0,0,0.6)" }} />
            </div>
          ) : (
            <div style={{ maxWidth: 210, margin: "0 auto" }}>
              <div style={{ background: "#1c1c1c", borderRadius: 22, padding: "13px 7px 18px", border: "1.5px solid rgba(233,198,114,0.15)", boxShadow: "0 18px 50px rgba(0,0,0,0.6)" }}>
                <div style={{ background: "#111", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ height: 7, background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 36, height: 3, background: "#222", borderRadius: 2 }} /></div>
                  <AnimatePresence mode="wait">
                    <motion.img key={`m-${screen}`} src={cur.mobile} alt={cur.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.1"; }} />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-2">
        <button onClick={() => go(-1)} className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E9C672]/40 transition-all"><ChevronLeft size={14} className="text-white/40" /></button>
        <div className="flex gap-1 md:gap-2">{SCREENS.map((_, i) => <button key={i} onClick={() => setScreen(i)} className={`rounded-full transition-all ${i === screen ? 'w-2 h-2 md:w-2 md:h-2 bg-[#E9C672]' : 'w-1.5 h-1.5 bg-white/30'}`} />)}</div>
        <button onClick={() => go(1)} className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E9C672]/40 transition-all"><ChevronRight size={14} className="text-white/40" /></button>
      </div>
    </div>
  );
}

export default function BloomAndBrewPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Bloom and Brew Coffee. merchify Web Design by NicheUX</title>
        <meta name="description" content="Custom merchify Liquid theme designed and built by NicheUX for Bloom and Brew Coffee Company, Canada. UX research, user flow mapping, wireframes, and full merchify development. Launched in Canada, UK, and Ireland in 6 weeks with a perfect 100/100 SEO score." />
        <meta property="og:title" content="Bloom and Brew Coffee. Custom merchify Website by NicheUX" />
        <meta property="og:description" content="A custom merchify Liquid store for an artisan coffee and baked goods brand. Built from scratch for Canada, UK, and Ireland. 6 weeks from brief to launch." />
      </Helmet>

      <div style={{ background: BLACK, overflow: "hidden" }}>

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src="/images/bloombrewhero.webp" alt="Bloom & Brew" className="w-full h-full object-cover opacity-45" loading="eager" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/10" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale: [1,1.12,1], opacity:[0.06,0.14,0.06] }} transition={{ duration:14, repeat:Infinity }} className="absolute w-[700px] h-[700px] rounded-full bottom-0 left-0 -translate-x-1/4 translate-y-1/4" style={{ background:`radial-gradient(circle,${GOLD} 0%,transparent 65%)` }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}} className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 bg-[#E9C672]/15 border border-[#E9C672]/30 rounded-full text-[#E9C672] text-xs font-sans-medium uppercase tracking-widest">Web Development · merchify · Canada</span>
              <span className="text-white/20 text-xs font-sans-normal">Production № 01</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.4}} className="font-serif-light text-white leading-[0.88] mb-6" style={{fontSize:'clamp(48px,8vw,112px)',letterSpacing:'-0.04em'}}>
              Bloom & Brew
              <span className="block italic text-[#E9C672]" style={{fontSize:'0.55em', marginTop:'0.15em'}}>Coffee Company</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.6}} className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed">
              Custom merchify Liquid theme. A pâtissière's brand built for an international audience. launched into 3 markets on day one.
            </motion.p>
          </motion.div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[{label:'Client',value:'Bloom & Brew Coffee Co.'},{label:'Country',value:'Canada'},{label:'Platform',value:'Custom merchify Liquid'},{label:'Live site',value:'bloomandbrewcoffeecompany.ca'}].map(item=>(
              <div key={item.label}><p className="text-white/30 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p><p className="text-white font-serif-light text-lg">{item.value}</p></div>
            ))}
          </div>
        </section>

        {/* THE BRIEF */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Brief</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">She had a brand that people genuinely loved. She just had no website to sell from.</h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">Bloom and Brew is run by a pâtissière who puts real thought into everything she makes. Her Instagram had an engaged, loyal following that loved her. But she had nowhere to actually sell online. When she came to NicheUX, the ask was clear: build a merchify store from zero that carries the same warmth her social media had, and launch it across Canada, the UK, and Ireland in one go. No template. No shortcuts. A real brand with a real online home.</p>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Challenge</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">merchify's template library is designed so anyone can launch quickly. The tradeoff is that every template store starts looking exactly like every other template store. Bloom and Brew deserved better than that. The brief called for custom merchify Liquid code written from scratch, three active markets at launch, and a perfect SEO score. Six weeks to pull it off.</p>
              <div className="space-y-3">
                {['Zero templates. Custom Liquid from line one','SEO 100/100 across all pages','Mobile-first, fully responsive','6 weeks concept to live'].map(item=>(
                  <div key={item} className="flex items-start gap-3"><div className="w-1 h-1 rounded-full bg-[#E9C672] mt-2.5 flex-shrink-0" /><span className="text-white/50 font-sans-normal text-sm">{item}</span></div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROCESS. PARCHMENT SECTION */}
        <section style={{ background: PARCHMENT }}>

          {/* 0. Research + Personas */}
          <div className="py-20 md:py-28 px-6 md:px-8 border-b" style={{ borderColor: `${INK}12` }}>
            <div className="max-w-6xl mx-auto">
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-12">
                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-px" style={{background:INK}} /><span style={{color:INK}} className="text-xs font-sans-medium uppercase tracking-widest">Social Media Analysis</span></div>
                <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>Before building anything, we needed to understand exactly what made people feel the way they did about this brand on Instagram.</h2>
                <p className="font-sans-normal text-lg mt-4 max-w-2xl" style={{color:`${INK}80`}}>Bloom and Brew had no website. Just a social media presence that people genuinely loved. We went through every post, every comment, every reply. People wrote things like "this feels like Sunday morning" and "I need this in my life." That emotional pull, that warmth, that sense of care. It lived entirely in the Instagram. Our job was to understand what created it, then carry it into a merchify store so it would still be there when someone went to actually buy something.</p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'The Instagram Follower', type: 'Loves the brand, ready to buy',
                    goals: 'They have been following Bloom and Brew for a while. They love the aesthetic, the warmth, the way every post makes them want to be in that kitchen. They are ready to order. They just need somewhere to go.',
                    pain: 'There was nowhere to buy. No website, no online merch. They could DM, but that is friction. Impulse buys die at the moment of friction.',
                    need: 'A merch that feels exactly like the Instagram. The same warmth, the same voice, a straightforward way to actually purchase.',
                    accent: GOLD,
                  },
                  {
                    name: 'The Cautious Buyer', type: 'Needs information before committing',
                    goals: 'Wants to know what is in the food before ordering for their family. They look for allergen and ingredient information before they commit to anything from a new brand.',
                    pain: 'Without a website, the only option was to DM and wait. Most people do not. That silent friction was losing real customers every week.',
                    need: 'Clear ingredient and allergen information upfront. A low-friction way to ask questions. Trust signals that show this brand takes the details seriously.',
                    accent: LAVENDER,
                  },
                  {
                    name: 'The Event Buyer', type: 'Sourcing artisan catering',
                    goals: 'Looking for something special for a corporate event or celebration. Wants artisan quality and a brand story they can talk about. Bloom and Brew fits perfectly, but they would never know.',
                    pain: 'No website means no discovery outside of Instagram followers. Corporate buyers do not DM. They Google, they browse, they decide. Without a site, Bloom and Brew was invisible to them.',
                    need: 'A professional online presence. Custom order and catering paths clearly communicated. Enough credibility signals to make a buying decision without a phone call.',
                    accent: BLUE,
                  },
                ].map((p, i) => (
                  <motion.div key={p.name} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.6,delay:i*0.1}} viewport={{once:true}} className="p-8 rounded-2xl space-y-4" style={{background:'#fff',border:`1px solid ${INK}15`}}>
                    <div style={{width:32,height:1,background:p.accent}} />
                    <div>
                      <p className="font-sans-medium text-sm" style={{color:INK}}>{p.name}</p>
                      <p className="font-sans-normal text-xs uppercase tracking-widest mt-1" style={{color:`${INK}45`}}>{p.type}</p>
                    </div>
                    <div className="space-y-3">
                      <div><p className="font-sans-medium text-xs uppercase tracking-widest mb-1" style={{color:p.accent}}>Goal</p><p className="font-sans-normal text-sm leading-relaxed" style={{color:`${INK}65`}}>{p.goals}</p></div>
                      <div><p className="font-sans-medium text-xs uppercase tracking-widest mb-1" style={{color:'rgba(200,0,0,0.5)'}}>Pain</p><p className="font-sans-normal text-sm leading-relaxed" style={{color:`${INK}65`}}>{p.pain}</p></div>
                      <div><p className="font-sans-medium text-xs uppercase tracking-widest mb-1" style={{color:'rgba(0,150,80,0.6)'}}>Need</p><p className="font-sans-normal text-sm leading-relaxed" style={{color:`${INK}65`}}>{p.need}</p></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 1. Information Architecture */}
          <div className="py-20 md:py-28 px-6 md:px-8 border-b" style={{ borderColor: `${INK}12` }}>
            <div className="max-w-6xl mx-auto">
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-10">
                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-px" style={{background:INK}} /><span style={{color:INK}} className="text-xs font-sans-medium uppercase tracking-widest">Process · Step 01</span></div>
                <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>Information Architecture</h2>
                <p className="font-sans-normal text-base mt-3 max-w-xl" style={{color:`${INK}80`}}>Before any visual design, we mapped the full site structure: how products, collections, pages, and checkout flows connect to each other and to the user's goals.</p>
              </motion.div>
              <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.9,delay:0.1}} viewport={{once:true}} className="rounded-2xl overflow-hidden border" style={{borderColor:`${INK}15`}}>
                <img src="/images/bloom-process/ia.png" alt="Bloom & Brew Information Architecture" className="w-full h-auto" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
              </motion.div>
            </div>
          </div>

          {/* 2. User Journey */}
          <div className="py-20 md:py-28 px-6 md:px-8 border-b" style={{ borderColor: `${INK}12` }}>
            <div className="max-w-6xl mx-auto">
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-10">
                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-px" style={{background:INK}} /><span style={{color:INK}} className="text-xs font-sans-medium uppercase tracking-widest">Process · Step 02</span></div>
                <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>User Journey Mapping</h2>
                <p className="font-sans-normal text-base mt-3 max-w-xl" style={{color:`${INK}80`}}>Mapped the emotional arc of a Bloom & Brew customer. from discovery at a local market to trust, purchase, and return visit. Every touchpoint considered, every friction point removed.</p>
              </motion.div>
              <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.9,delay:0.1}} viewport={{once:true}} className="rounded-2xl overflow-hidden border" style={{borderColor:`${INK}15`}}>
                <img src="/images/bloom-process/journey.png" alt="Bloom & Brew User Journey" className="w-full h-auto" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
              </motion.div>
            </div>
          </div>

          {/* 3. User Flows */}
          <div className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-10">
                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-px" style={{background:INK}} /><span style={{color:INK}} className="text-xs font-sans-medium uppercase tracking-widest">Process · Step 03</span></div>
                <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>User Flow Diagrams</h2>
                <p className="font-sans-normal text-base mt-3 max-w-xl" style={{color:`${INK}80`}}>Four distinct flows mapped: primary conversion, B2B quote requests, dietary restriction edge cases, and out-of-stock error handling. Every path leads somewhere useful.</p>
              </motion.div>
              {/* Flow tabs. grid prevents mobile overlap */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {FLOWS.map((f,i)=>(
                  <button key={i} onClick={()=>setActiveFlow(i)} className="px-4 py-2.5 rounded-xl text-sm font-sans-medium transition-all text-center" style={{background:activeFlow===i?INK:'rgba(26,26,26,0.06)', color:activeFlow===i?PARCHMENT:`${INK}`, border:`1px solid ${INK}20`}}>
                    {f.title}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <motion.div key={activeFlow} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="rounded-2xl overflow-hidden border" style={{borderColor:`${INK}15`}}>
                  <img src={FLOWS[activeFlow].src} alt={FLOWS[activeFlow].title} className="w-full h-auto" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                </motion.div>
                <motion.div key={`fd-${activeFlow}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="space-y-4 pt-2">
                  <div className="w-8 h-px" style={{background:GOLD}} />
                  <h3 className="font-serif-light text-2xl" style={{color:INK}}>{FLOWS[activeFlow].title}</h3>
                  <p className="font-sans-normal text-sm" style={{color:`${INK}70`}}>{FLOWS[activeFlow].sub}</p>
                  <p className="font-sans-normal text-base leading-relaxed" style={{color:`${INK}75`}}>{FLOWS[activeFlow].desc}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* WIREFRAMES. parchment continues */}
        <section style={{ background: PARCHMENT }}>
          <div className="py-20 md:py-28 px-6 md:px-8 border-b" style={{ borderColor: `${INK}12` }}>
            <div className="max-w-6xl mx-auto">
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-10">
                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-px" style={{background:INK}} /><span style={{color:INK}} className="text-xs font-sans-medium uppercase tracking-widest">Process · Step 03b</span></div>
                <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>Wireframes: structure before style.</h2>
                <p className="font-sans-normal text-base mt-3 max-w-xl" style={{color:`${INK}70`}}>Low-fidelity wireframes for every key page. Layout decisions locked in before colour or typography. Each screen validated against the user flows before moving to design.</p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { src: '/images/bloom-process/screen-home.png', label: 'Homepage' },
                  { src: '/images/bloom-process/screen-shop.png', label: 'Shop' },
                  { src: '/images/bloom-process/screen-product.png', label: 'Product Page' },
                  { src: '/images/bloom-process/screen-cart.png', label: 'Cart' },
                ].map(w => (
                  <motion.div key={w.label} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.7}} viewport={{once:true}} className="space-y-2">
                    <div className="rounded-xl overflow-hidden border" style={{borderColor:`${INK}15`}}>
                      <img src={w.src} alt={`Bloom and Brew ${w.label} wireframe`} className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                    </div>
                    <p className="font-sans-medium text-xs uppercase tracking-widest text-center" style={{color:`${INK}45`}}>{w.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* THE WORK. DARK SECTION */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{background:BLACK}}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-14">
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">Process · Step 04</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">The finished site.</h2>
              <p className="text-white/40 font-sans-normal text-base mt-3">Custom Liquid · Canada, UK & Ireland · Live now</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
                <DeviceMockup />
              </motion.div>
              <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}} className="space-y-8 pt-4">
                {SCREENS.map((s,i)=>(
                  <div key={s.name} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-serif-light italic text-white/20" style={{fontSize:13}}>0{i+1}</span>
                      <div className="w-8 h-px" style={{background:GOLD}} />
                      <h3 className="font-serif-light text-xl text-white">{s.name}</h3>
                    </div>
                    <p className="text-white/45 font-sans-normal text-sm leading-relaxed pl-14">{s.desc}</p>
                  </div>
                ))}
                <div className="pt-2">
                  <a href="https://bloomandbrewcoffeecompany.ca/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Visit Live Site <ExternalLink size={13} /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DECISIONS. PARCHMENT */}
        <section style={{ background: PARCHMENT }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-14">
              <span style={{color:`${INK}50`}} className="text-xs uppercase tracking-widest font-sans-medium block mb-3">The Decisions</span>
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>What we chose and why.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {title:'Custom Shopify Liquid instead of a template',body:"Every template store looks exactly the same. Bloom and Brew is an artisan brand selling to buyers in three countries. That story deserves a store that feels as considered as the products inside it. Writing custom Liquid from scratch took longer. But the result is a site nobody could mistake for a template.",accent:GOLD},
                {title:'SEO built into the structure, not added at the end',body:'A perfect 100/100 SEO score is never the result of last-minute optimisation. It comes from decisions made during the build itself. Semantic HTML, structured data, canonical URLs, image compression, and performance budgets treated as core requirements from day one.',accent:BLUE},
              ].map((d,i)=>(
                <motion.div key={d.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.6,delay:i*0.1}} viewport={{once:true}} className="p-8 rounded-2xl border space-y-4" style={{background:'#fff',borderColor:`${INK}12`}}>
                  <div className="w-8 h-px" style={{backgroundColor:d.accent}} /><h3 className="font-serif-light text-xl" style={{color:INK}}>{d.title}</h3><p className="font-sans-normal text-sm leading-relaxed" style={{color:`${INK}70`}}>{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME + TESTIMONIAL. DARK */}
        <section className="py-20 md:py-28 px-6 md:px-8" style={{background:BLACK}}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-8">The Outcome</span>
              <p className="font-serif-light text-3xl md:text-4xl text-white leading-snug mb-6" style={{letterSpacing:'-0.015em'}}>
                "Honestly one of the best companies to work with! They have helped me so much with the brand development and my website. Thank you so much NicheUX!"
              </p>
              <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-px bg-[#E9C672]" /><span className="text-white/65 font-sans-normal text-sm">Aishwarya · Founder, Bloom and Brew Coffee Company</span><div className="w-8 h-px bg-[#E9C672]" /></div>
              <p className="text-white/60 font-sans-normal text-base mb-10 max-w-xl mx-auto">A custom merchify store designed and built by NicheUX. Six weeks from the first brief to a live international e-commerce site selling artisan coffee, pastries, and baked goods to customers in Canada, the UK, and Ireland.</p>
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                {[{v:'6',u:'weeks',l:'Concept to live'},{v:'100',u:'/100',l:'SEO score'},{v:'3',u:'markets',l:'Launched day one'},{v:'0',u:'templates',l:'Built from scratch'}].map(({v,u,l})=>(
                  <div key={l} className="text-center">
                    <div className="font-serif-light text-[#E9C672] leading-none" style={{fontSize:'clamp(36px,4.5vw,52px)'}}>{v}<span className="text-[#E9C672]/50 ml-1" style={{fontSize:'0.4em'}}>{u}</span></div>
                    <div className="text-white/30 text-xs uppercase tracking-widest font-sans-medium mt-2">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="https://bloomandbrewcoffeecompany.ca/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">View Live Site <ExternalLink size={14} /></a>
                <button onClick={()=>navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm">Start an e-commerce project <ArrowRight size={14} /></button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* NEXT */}
        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5" style={{background:BLACK}}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div><span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span><h3 className="font-serif-light text-3xl text-white">NandhiniDC</h3><p className="text-white/60 font-sans-normal text-sm mt-1">Web Design & Development · India</p></div>
            <div className="flex flex-wrap gap-3">
              <button onClick={()=>navigate('/featured-work/nandhinidc')} className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm">View Case Study <ArrowRight size={14} /></button>
              <button onClick={()=>navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a project</button>
            </div>
          </div>
        </section>
      </div>
      <BackToTopArrow />
    </>
  );
}
