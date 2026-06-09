import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const GOLD = '#E9C672';
const LAVENDER = '#B097BE';
const PURPLE = '#B97BE8';
const CYAN = '#00D4C8';
const PARCHMENT = '#F1E9D2';
const INK = '#1a1a1a';
const BLACK = '#0A0A0A';

function BackToTopArrow() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = () => setV(window.pageYOffset > 300); window.addEventListener('scroll', t); return () => window.removeEventListener('scroll', t); }, []);
  if (!v) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1a1a1a] border border-[#E9C672]/30 hover:border-[#E9C672] transition-all shadow-xl" aria-label="Back to top"><ArrowUp size={20} className="text-[#E9C672]" /></button>;
}

function SectionLabel({ step, title, bg = 'dark' }: { step: string; title: string; bg?: 'dark' | 'parchment' }) {
  const ink = bg === 'parchment' ? INK : 'rgba(255,255,255,0.6)';
  const accentLine = bg === 'parchment' ? INK : GOLD;
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-px" style={{ background: accentLine }} />
      <span className="text-xs font-sans-medium uppercase tracking-widest" style={{ color: ink }}>{step}</span>
    </div>
  );
}

export default function SSJCTournamentPage() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>SSJC Tournament. NicheUX Case Study</title>
        <meta name="description" content="10th redONE Mobile Selangor Super Junior Circuit. Two legs, two gaming-style identities. T-shirts, lanyards, medals, event posters designed by NicheUX." />
        <meta property="og:title" content="SSJC Tournament. NicheUX" />
        <meta property="og:description" content="GAME ON. Two legs, two visual identities, one gaming universe." />
      </Helmet>

      <div style={{ background: BLACK, overflow: 'hidden' }}>

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen flex items-end justify-start overflow-hidden pb-20 md:pb-28 pt-24">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src="/images/ssjc/poster-leg2.jpeg" alt="SSJC GAME ON" className="w-full h-full object-cover object-top opacity-40" loading="eager" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/10" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ scale:[1,1.15,1], opacity:[0.07,0.16,0.07] }} transition={{ duration:12, repeat:Infinity }} className="absolute w-[700px] h-[700px] rounded-full bottom-0 right-0 translate-x-1/4 translate-y-1/4" style={{ background:`radial-gradient(circle,${PURPLE} 0%,transparent 65%)` }} />
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}} className="mb-4 flex items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-sans-medium uppercase tracking-widest" style={{ background:`${PURPLE}20`, border:`1px solid ${PURPLE}40`, color:PURPLE }}>Print · merch Design · Event Identity · Malaysia</span>
              <span className="text-white/20 text-xs font-sans-normal">Production № 07</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.4}} className="font-serif-light text-white leading-[0.88] mb-4" style={{fontSize:'clamp(44px,7.5vw,108px)',letterSpacing:'-0.04em'}}>
              SSJC
              <span className="block italic" style={{fontSize:'0.6em',marginTop:'0.12em',color:PURPLE}}>Tournament 2026</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.6}} className="text-white/50 font-sans-normal text-lg md:text-xl max-w-xl leading-relaxed">
              10th redONE Mobile Selangor Super Junior Circuit. Two legs. Two gaming-universe identities. Every surface, from medal to entrance poster, part of one system.
            </motion.p>
          </motion.div>
        </section>

        {/* TITLE BLOCK */}
        <section className="py-16 md:py-20 px-6 md:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {[{label:'Event',value:'10th redONE Mobile SSJC'},{label:'Country',value:'Malaysia'},{label:'Discipline',value:'Print · merch · Event Design'},{label:'Sponsor',value:'redONE Mobile · MSN · SRAS'}].map(item=>(
              <div key={item.label}><p className="text-white/30 text-xs uppercase tracking-widest font-sans-medium mb-1">{item.label}</p><p className="text-white font-serif-light text-lg">{item.value}</p></div>
            ))}
          </div>
        </section>

        {/* THE BRIEF. parchment */}
        <section style={{ background: PARCHMENT }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-14">
              <span className="text-xs uppercase tracking-widest font-sans-medium block mb-3" style={{color:'rgba(176,151,190,0.6)'}}>The Brief</span>
              <h2 className="font-serif-light text-4xl md:text-5xl mb-4 leading-tight" style={{color:INK}}>These kids play squash at the national level. They also play Valorant. We designed for both.</h2>
              <p className="font-sans-normal text-lg max-w-2xl" style={{color:`${INK}80`}}>The 10th redONE Mobile Selangor Super Junior Circuit. Two legs. Hundreds of junior squash players aged Under 9 to Under 13. They are serious competitors. They are also the exact same generation that watches Twitch, speaks fluently in loading bars and XP indicators, and would immediately feel the difference between a tournament that just brands them and one that actually excites them. The brief was simple. Make it feel like a game. We built a whole gaming universe instead.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'You are designing for a generation that already lives in this visual language', body: 'Under 9 to Under 13. The athletes at SSJC are not just junior squash players. They are kids who go home and load into esports, game with friends, and follow tournament brackets. Gaming aesthetics are not a reference for them. They are a native language. When the tournament speaks that language back, it lands.', accent: PURPLE },
                { title: 'Two separate identities, not one design with a colour swap', body: 'Leg 1 and Leg 2 needed to feel completely different from each other while still belonging to the same world. Not a simple palette change. Two distinct visual personalities sharing the same structural grammar. So that when an athlete gets to Leg 2, they know they have entered a different chapter.', accent: CYAN },
                { title: 'The merch test: does it come home?', body: 'The real measure of tournament merch is not whether it looks good on the day. It is whether the athlete wears the t-shirt the following weekend. Whether the parents photograph the entrance poster. Whether the medal gets put somewhere visible. We designed for the moment after the tournament, not just during it.', accent: PURPLE },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.6,delay:i*0.1}} viewport={{once:true}} className="p-8 rounded-2xl space-y-4" style={{background:'#fff',border:'1px solid rgba(26,26,26,0.1)'}}>
                  <div className="w-8 h-px" style={{background:item.accent}} />
                  <h3 className="font-serif-light text-xl" style={{color:INK}}>{item.title}</h3>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{color:'rgba(26,26,26,0.65)'}}>{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN SYSTEM. dark */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-14">
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-3">Design System</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-4">Two colourways. One gaming universe. And one deliberate decision that breaks every colour convention you have ever seen in junior sports.</h2>
              <p className="text-white/50 font-sans-normal text-lg max-w-2xl">The entire identity was built on a structural decision and a values decision. The structural one: Leg 1 and Leg 2 share the same visual grammar but wear completely different colour systems. The values one: the colours were assigned in a way that deliberately subverts gender stereotypes in junior sports.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { leg: 'Leg 1: Retro Purple and Pink Neon. Boy silhouette.', colors: [{ name: 'Retro Purple', hex: '#7B3FAF', role: 'Primary' }, { name: 'Pink Neon', hex: '#FF69B4', role: 'Accent / Fire' }, { name: 'Deep Black', hex: '#0A0006', role: 'Base background' }], accent: PURPLE, desc: 'Purple and pink are traditionally assigned to girls. The Leg 1 poster features a boy silhouette in those colours. Deliberately. Junior sports have spent decades colour-coding gender. This identity does not.' },
                { leg: 'Leg 2: Cyber Blue and Neon Green. Girl silhouette.', colors: [{ name: 'Cyber Blue', hex: '#00DFEF', role: 'Primary' }, { name: 'Neon Green', hex: '#39FF14', role: 'Accent / Fire' }, { name: 'Dark Navy', hex: '#000614', role: 'Base background' }], accent: CYAN, desc: 'Blue and green are traditionally assigned to boys. The Leg 2 poster features a girl silhouette in those colours. Deliberately. Every athlete at SSJC, Boys and Girls, competes in the same gaming universe. The colours say so.' },
              ].map((item, i) => (
                <motion.div key={item.leg} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.7,delay:i*0.1}} viewport={{once:true}} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-5">
                  <div className="w-8 h-px" style={{background:item.accent}} />
                  <h3 className="font-serif-light text-2xl text-white">{item.leg}</h3>
                  <p className="text-white/50 font-sans-normal text-sm leading-relaxed">{item.desc}</p>
                  <div className="space-y-2">
                    {item.colors.map(c => (
                      <div key={c.name} className="flex items-center gap-3">
                        <div style={{width:24,height:24,borderRadius:4,background:c.hex,flexShrink:0,border:'1px solid rgba(255,255,255,0.08)'}} />
                        <span className="text-white/60 text-xs font-sans-normal">{c.name}</span>
                        <span className="text-white/25 text-xs font-sans-normal">{c.role}</span>
                        <code className="text-white/20 font-mono text-xs ml-auto">{c.hex}</code>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE CONCEPT */}
        <section className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The Concept</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">A junior squash circuit that plays like a video game.</h2>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed">The SSJC is Malaysia's premier junior squash circuit, now in its 10th year. The brief was to design an event identity that would excite the athletes, not just brand them. Concept: treat the tournament like a game. Each player loads in. Every match is a level. GAME ON.</p>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-4">The System</span>
              <p className="text-white/60 font-sans-normal text-lg leading-relaxed mb-6">Two legs, two distinct visual identities: Retro Purple for Leg 1, Cyber Blue for Leg 2. The same gaming-universe language throughout: circuit-board patterns, player silhouettes on fire, loading bars, XP indicators, RPG stat screens. Designed to scale from a lanyard to a full-height event poster.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5" style={{ background:`${PURPLE}10` }}>
                  <div className="w-8 h-px mb-3" style={{ background:PURPLE }} />
                  <p className="text-white font-sans-medium text-sm">LEG 1</p>
                  <p className="text-white/40 font-sans-normal text-xs mt-1">Retro Purple & Pink Neon</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5" style={{ background:`${CYAN}10` }}>
                  <div className="w-8 h-px mb-3" style={{ background:CYAN }} />
                  <p className="text-white font-sans-medium text-sm">LEG 2</p>
                  <p className="text-white/40 font-sans-normal text-xs mt-1">Cyber Blue & Green</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ──── DELIVERABLES. parchment sections alternating with dark ──── */}

        {/* EVENT POSTERS. parchment */}
        <section style={{ background: PARCHMENT }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-12">
              <SectionLabel step="Deliverable 01" title="Event Posters" bg="parchment" />
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>GAME ON.</h2>
              <p className="font-sans-normal text-base mt-3 max-w-xl" style={{color:`${INK}70`}}>A full-height event poster per leg. the visual centrepiece of each tournament. Gaming-style loading screens, player silhouettes on fire, stat overlays. The poster that sets the tone before a ball is hit.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { src: '/images/ssjc/poster-leg1.jpeg', leg: 'LEG 1', theme: 'Retro Purple', accent: PURPLE, desc: 'Boy silhouette. Purple and pink fire. Purple and pink are the colours convention assigns to girls. The boy silhouette wears them without hesitation. Because in this gaming universe, nobody is assigned a colour based on their gender.' },
                { src: '/images/ssjc/poster-leg2.jpeg', leg: 'LEG 2', theme: 'Cyber Blue', accent: CYAN, desc: 'Girl silhouette. Cyan and green fire. Cyan and green are the colours convention assigns to boys. The girl silhouette owns them completely. Because a girl competing at the national level in squash deserves the palette that says precision, power, and speed.' },
              ].map(({ src, leg, theme, accent, desc }) => (
                <motion.div key={leg} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border" style={{borderColor:`${INK}15`}}>
                    <img src={src} alt={`SSJC ${leg} Poster`} className="w-full h-auto" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{background:accent}} />
                    <div>
                      <p className="font-sans-medium text-sm" style={{color:INK}}>{leg}. {theme}</p>
                      <p className="font-sans-normal text-sm leading-relaxed mt-1" style={{color:`${INK}65`}}>{desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* T-SHIRTS. dark */}
        <section style={{ background: BLACK }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-12">
              <SectionLabel step="Deliverable 02" title="T-Shirts" />
              <h2 className="font-serif-light text-4xl md:text-5xl text-white">All-over print. Two editions.</h2>
              <p className="text-white/50 font-sans-normal text-base mt-3 max-w-xl">Circuit-board pattern all-over-print jerseys. front logo placement, back event text. One per leg, each carrying its own colourway identity.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { src: '/images/ssjc/tshirt-leg1.jpeg', leg: 'LEG 1', theme: 'Retro Purple', accent: PURPLE, desc: 'Black base with retro purple neon circuit traces. Front: redONE Mobile. Back: 10th SSJC Leg 1 2026 event text.' },
                { src: '/images/ssjc/tshirt-leg2.jpeg', leg: 'LEG 2', theme: 'Cyber Blue', accent: CYAN, desc: 'Navy base with cyan-green circuit-board traces. Front: redONE Mobile. Back: 10th SSJC Leg 2 2026 event text.' },
              ].map(({ src, leg, theme, accent, desc }) => (
                <motion.div key={leg} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-white/5">
                    <img src={src} alt={`SSJC ${leg} T-shirt`} className="w-full h-auto" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{background:accent}} />
                    <div>
                      <p className="text-white font-sans-medium text-sm">{leg}. {theme}</p>
                      <p className="text-white/50 font-sans-normal text-sm leading-relaxed mt-1">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LANYARDS. parchment */}
        <section style={{ background: PARCHMENT }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-12">
              <SectionLabel step="Deliverable 03" title="Lanyards" bg="parchment" />
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>Carried all day. Seen by everyone.</h2>
              <p className="font-sans-normal text-base mt-3 max-w-xl" style={{color:`${INK}70`}}>Full-bleed print lanyards. SSJC and redONE Mobile branding repeated across the full length. One per leg, matching the t-shirt colourway.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                { front: '/images/ssjc/lanyard-purple.png', back: '/images/ssjc/lanyard-purple-back.png', leg: 'LEG 1', theme: 'Retro Purple', accent: PURPLE, desc: 'SSJC LEG 1 2026, redONE Mobile branding. Retro purple colourway, full-bleed print, production-ready files delivered.' },
                { front: '/images/ssjc/lanyard-blue.png', back: '/images/ssjc/lanyard-blue-back.png', leg: 'LEG 2', theme: 'Cyber Blue', accent: CYAN, desc: 'SSJC LEG 2 2026, redONE Mobile branding. Cyber blue colourway, full-bleed print, production-ready files delivered.' },
              ].map(({ front, back, leg, theme, accent, desc }) => (
                <motion.div key={leg} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{background:accent}} />
                    <p className="font-sans-medium text-sm" style={{color:INK}}>{leg}: {theme}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="rounded-xl overflow-hidden border" style={{borderColor:`${INK}15`}}>
                        <img src={front} alt={`SSJC ${leg} lanyard front design`} className="w-full h-auto" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                      </div>
                      <p className="font-sans-normal text-xs mt-2" style={{color:`${INK}50`}}>Front</p>
                    </div>
                    <div>
                      <div className="rounded-xl overflow-hidden border" style={{borderColor:`${INK}15`}}>
                        <img src={back} alt={`SSJC ${leg} lanyard back design`} className="w-full h-auto" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                      </div>
                      <p className="font-sans-normal text-xs mt-2" style={{color:`${INK}50`}}>Back</p>
                    </div>
                  </div>
                  <p className="font-sans-normal text-sm leading-relaxed" style={{color:`${INK}65`}}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MEDALS + BANNER. dark */}
        <section style={{ background: BLACK }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Medals. show actual medal designs */}
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-14">
              <SectionLabel step="Deliverable 04" title="Medals" />
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-3">48 medals. Every winner recognised.</h2>
              <p className="text-white/70 font-sans-normal text-base max-w-2xl">48 medals across all age categories for Boys and Girls across both legs. Every file delivered print-ready with correct bleed, resolution, and CMYK colour mode.</p>
            </motion.div>
            {/* Leg 1. Boys + Girls */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full" style={{background:PURPLE}} />
                <span className="text-white font-sans-medium text-sm uppercase tracking-widest">LEG 1. Retro Purple</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { src: '/images/ssjc/medal-leg1.jpg', cat: 'Boys', desc: 'Boys U9 · U11 · U13. Retro Purple colourway. Print-ready files across all three age categories.' },
                  { src: '/images/ssjc/medal-leg1.jpg', cat: 'Girls', desc: 'Girls U9 · U11 · U13. Retro Purple colourway. Print-ready files across all three age categories.' },
                ].map(({src, cat, desc}) => (
                  <motion.div key={cat} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.7}} viewport={{once:true}} className="space-y-3">
                    <div className="rounded-2xl overflow-hidden border border-white/5 bg-black/30">
                      <img src={src} alt={`SSJC Leg 1 ${cat} medal. Retro Purple`} className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                    </div>
                    <p className="text-white font-sans-medium text-sm">{cat}</p>
                    <p className="text-white/70 font-sans-normal text-sm leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leg 2. Boys + Girls */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full" style={{background:CYAN}} />
                <span className="text-white font-sans-medium text-sm uppercase tracking-widest">LEG 2. Cyber Blue</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { src: '/images/ssjc/medal-leg2.jpg', cat: 'Boys', desc: 'Boys U9 · U11 · U13. Cyber Blue colourway. Print-ready files across all three age categories.' },
                  { src: '/images/ssjc/medal-leg2.jpg', cat: 'Girls', desc: 'Girls U9 · U11 · U13. Cyber Blue colourway. Print-ready files across all three age categories.' },
                ].map(({src, cat, desc}) => (
                  <motion.div key={cat} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.7}} viewport={{once:true}} className="space-y-3">
                    <div className="rounded-2xl overflow-hidden border border-white/5 bg-black/30">
                      <img src={src} alt={`SSJC Leg 2 ${cat} medal. Cyber Blue`} className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                    </div>
                    <p className="text-white font-sans-medium text-sm">{cat}</p>
                    <p className="text-white/70 font-sans-normal text-sm leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Event Banner */}
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <SectionLabel step="Deliverable 05" title="Event Banner" />
              <h3 className="font-serif-light text-3xl text-white mb-4">In production.</h3>
              <p className="text-white/55 font-sans-normal text-base leading-relaxed mb-6">The event entrance banner is currently in production. Large-format, designed to match the GAME ON visual universe and anchor the venue's visual identity at the entry point.</p>
              <div className="overflow-hidden" style={{ borderRadius: 4, border: `1px solid ${PURPLE}25` }}>
                <img src="/images/ssjc/event-banner.png" alt="SSJC Event Banner" loading="lazy" className="w-full h-auto block" style={{ display: 'block', objectFit: 'cover', objectPosition: 'center top', maxHeight: 480 }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* BEHIND THE SCENES */}
        <section style={{ background: PARCHMENT }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-14">
              <SectionLabel step="Behind the Scenes" title="Where It Starts" bg="parchment" />
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>Before the files. Before the pixels.</h2>
              <p className="font-sans-normal text-base mt-3 max-w-xl" style={{color:`${INK}70`}}>Every design starts with a sketch. These are the initial hand-drawn concepts for the medals and t-shirt layouts, drawn before a single file was opened. The ideas that became the final tournament identity.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { src: '/images/WhatsApp Image 2026-04-23 at 7.27.35 PM.jpeg', caption: 'Initial sketch concepts. Medal layout explorations for Leg 1 and Leg 2.', accent: PURPLE },
                { src: '/images/WhatsApp Image 2026-04-23 at 7.49.17 PM.jpeg', caption: 'T-shirt layout rough. The all-over-print circuit pattern starts as hand-drawn line work.', accent: CYAN },
              ].map((item, i) => (
                <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.7,delay:i*0.1}} viewport={{once:true}} className="space-y-4">
                  <div className="overflow-hidden border" style={{borderColor:`${INK}12`, borderRadius:4}}>
                    <img src={item.src} alt={item.caption} className="w-full h-auto" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.15';}} />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{background:item.accent}} />
                    <p className="font-sans-normal text-sm leading-relaxed" style={{color:`${INK}65`}}>{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DECISIONS */}
        <section style={{ background: PARCHMENT }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}} className="mb-14">
              <SectionLabel step="The Principles" title="Decisions" bg="parchment" />
              <h2 className="font-serif-light text-4xl md:text-5xl" style={{color:INK}}>What we chose and why.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {title:'We did not borrow gaming aesthetics. We committed to them.',body:"There is a version of this brief that produces something gaming-inspired. A few neon accents on a conventional sports design. We did not do that version. Loading bars, XP indicators, stat screens, player silhouettes on fire. This is a gaming universe that happens to have squash in it. Because for a 10-year-old at their first national-level tournament, that framing changes everything about how they feel holding their merch.",accent:PURPLE},
                {title:'The colour-to-silhouette swap was intentional, not accidental.',body:'Junior sports events have spent decades assigning pink to girls and blue to boys. The SSJC identity flips that deliberately. Leg 1 is purple and pink, and the poster silhouette is a boy. Leg 2 is cyan and green, and the poster silhouette is a girl. No athlete at SSJC competes in a colour that was decided for them by gender convention. The design makes that point without a single word of copy.',accent:CYAN},
                {title:'The same system wearing two completely different skins',body:'Leg 1 and Leg 2 share the same underlying compositional logic. Same grid. Same structural rules. Same hierarchy. But they wear completely different colourways and visual energy. Purple nostalgia for Leg 1. Cyberpunk precision for Leg 2. A player who competed in both can look at a t-shirt from across the room and tell you which leg it was from. That is the design working.',accent:PURPLE},
                {title:'Files that go straight to print, no chasing needed',body:'All-over-print jerseys, full-bleed lanyards, large-format entrance posters, and medal files across 36 categories. Every single file was delivered at the correct bleed, in the correct colour mode, at the correct resolution for its physical output. No revision round. No "can you fix the bleed." Everything ready to produce the moment it landed in the client inbox.',accent:GOLD},
              ].map((d,i)=>(
                <motion.div key={d.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.6,delay:i*0.1}} viewport={{once:true}} className="p-8 rounded-2xl border space-y-4" style={{background:'#fff',borderColor:`${INK}12`}}>
                  <div className="w-8 h-px" style={{backgroundColor:d.accent}} /><h3 className="font-serif-light text-xl" style={{color:INK}}>{d.title}</h3><p className="font-sans-normal text-sm leading-relaxed" style={{color:`${INK}70`}}>{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME + STATS */}
        <section style={{ background: BLACK }} className="py-20 md:py-28 px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <span className="text-[#E9C672]/60 text-xs uppercase tracking-widest font-sans-medium block mb-6">The Outcome</span>
              <h2 className="font-serif-light text-4xl md:text-5xl text-white mb-6 leading-tight">A squash tournament that felt like a championship. Because it looked like one.</h2>
              <p className="text-white/60 font-sans-normal text-xl leading-relaxed mb-10 max-w-2xl mx-auto">Two complete gaming-universe identities. Five deliverable types from entrance poster to medal files. 48 medals across Boys and Girls for both legs. Parents photographed the entrance poster. Athletes wore the shirts home. One visual system held together across every surface from the carpark entrance to the award ceremony.</p>
              <div className="grid grid-cols-4 gap-8 mb-12">
                {[{v:'2',u:'legs',l:'Complete identities'},{v:'5',u:'types',l:'Deliverable categories'},{v:'48',u:'medals',l:'Boys & Girls, both legs'},{v:'10th',u:'',l:'Year of the Circuit'}].map(({v,u,l})=>(
                  <div key={l} className="text-center">
                    <div className="font-serif-light text-[#E9C672] leading-none" style={{fontSize:'clamp(28px,3.5vw,44px)'}}>{v}<span className="text-[#E9C672]/50 ml-1" style={{fontSize:'0.4em'}}>{u}</span></div>
                    <div className="text-white/30 text-xs uppercase tracking-widest font-sans-medium mt-2">{l}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a print project <ArrowRight size={14} /></button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 pb-24 md:pb-20 px-6 md:px-8 border-t border-white/5" style={{background:BLACK}}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div><span className="text-white/60 text-xs uppercase tracking-widest font-sans-medium block mb-2">Next Production</span><h3 className="font-serif-light text-3xl text-white">Kishore Aravind's Portfolio Website</h3><p className="text-white/60 font-sans-normal text-sm mt-1">Editorial Design · India</p></div>
            <div className="flex flex-wrap gap-3">
              <button onClick={()=>navigate('/featured-work/kishore-portfolio')} className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9C672]/40 text-[#E9C672] font-sans-medium rounded-lg hover:bg-[#E9C672] hover:text-black transition-all text-sm">View Case Study <ArrowRight size={14} /></button>
              <button onClick={()=>navigate('/contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9C672] text-black font-sans-medium rounded-lg hover:bg-[#B097BE] transition-colors text-sm">Start a project</button>
            </div>
          </div>
        </section>

      </div>
      <BackToTopArrow />
    </>
  );
}
