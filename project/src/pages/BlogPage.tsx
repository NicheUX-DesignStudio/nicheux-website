import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/articles';

const GOLD = '#E9C672';
const LAVENDER = '#B097BE';
const BLACK = '#0A0A0A';
const PARCHMENT = '#F1E9D2';
const INK = '#1a1a1a';

const CATEGORIES = ['All', 'Case Study', 'Process', 'Studio', 'Industry', 'Behind the Scenes'] as const;

export default function BlogPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');
  const [articleList, setArticleList] = useState(articles);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/blog')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (data.articles?.length) setArticleList(data.articles); })
      .catch(() => {});
  }, []);

  const filtered = filter === 'All' ? articleList : articleList.filter(a => a.category === filter);

  return (
    <>
      <Helmet>
        <title>The Journal | NicheUX</title>
        <meta name="description" content="Case studies, process notes, and studio writing from NicheUX. How we design, why we decide, and what we learn." />
        <meta property="og:title" content="The Journal | NicheUX" />
        <meta property="og:description" content="Articles on design, process, and storytelling from the NicheUX studio." />
      </Helmet>

      <div style={{ background: BLACK, overflow: 'hidden' }}>

        {/* HERO. dark */}
        <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 'clamp(56px,7vw,96px)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <motion.div animate={{ scale:[1,1.1,1], opacity:[0.04,0.1,0.04] }} transition={{ duration:18, repeat:Infinity }}
              style={{ position:'absolute', width:700, height:700, borderRadius:'50%', top:0, left:'50%', transform:'translate(-50%,-50%)', background:`radial-gradient(circle,${LAVENDER} 0%,transparent 65%)` }} />
          </div>

          <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 clamp(24px,5vw,64px)', position:'relative', zIndex:1 }}>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.7}} style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
              <div style={{width:28,height:1,background:GOLD}} />
              <span style={{fontFamily:"'Source Sans Pro', sans-serif",fontSize:10,fontWeight:700,letterSpacing:'0.32em',textTransform:'uppercase',color:GOLD}}>The Journal</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.1}}
              style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'clamp(52px,9vw,120px)',lineHeight:0.9,letterSpacing:'-0.04em',color:'#fff',margin:'0 0 24px 0'}}>
              The Journal.
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.3}}
              style={{fontFamily:"'Source Sans Pro', sans-serif",fontWeight:300,fontSize:'clamp(15px,1.4vw,18px)',color:'rgba(255,255,255,0.4)',maxWidth:520,lineHeight:1.75}}>
              Case studies, process notes, and studio writing. How we design, why we decide, and what we learn from every brief.
            </motion.p>
          </div>
        </section>

        {/* ARTICLES. parchment */}
        <section style={{ background:PARCHMENT, borderTop:'1px solid rgba(26,26,26,0.08)' }}>
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(48px,6vw,72px) clamp(24px,5vw,64px)' }}>

            {/* Category filter */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:48 }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} aria-pressed={filter===cat}
                  style={{ fontFamily:"'Source Sans Pro', sans-serif", fontWeight:600, fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', padding:'7px 14px', borderRadius:20, cursor:'pointer', transition:'all 0.2s ease',
                    background: filter===cat ? INK : 'transparent',
                    color: filter===cat ? PARCHMENT : 'rgba(26,26,26,0.45)',
                    border: `1px solid rgba(26,26,26,${filter===cat ? 0.8 : 0.2})`,
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign:'center', padding:'80px 0' }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:24, color:'rgba(26,26,26,0.35)' }}>No articles in this category yet.</p>
                <p style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:13, color:'rgba(26,26,26,0.35)', marginTop:8 }}>Check back soon.</p>
              </div>
            )}

            {/* Featured article (first one, large) */}
            {filtered.length > 0 && filter === 'All' && (
              <motion.article initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.9}} viewport={{once:true}}
                onClick={() => navigate(`/blog/${filtered[0].slug}`)} style={{ cursor:'pointer', marginBottom:64 }} className="featured-article">
                <style>{`.featured-article:hover .fa-img img { transform: scale(1.03); } .featured-article:hover .fa-cta { opacity: 1; }`}</style>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(24px,4vw,56px)', alignItems:'center' }} className="fa-grid">
                  <style>{`.fa-grid{@media(max-width:600px){grid-template-columns:1fr!important}}`}</style>
                  <div className="fa-img" style={{ borderRadius:12, overflow:'hidden', border:'1px solid rgba(26,26,26,0.1)', aspectRatio:'16/10' }}>
                    {filtered[0].coverImage ? (
                      <img src={filtered[0].coverImage} alt={filtered[0].coverAlt || filtered[0].title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }} loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                    ) : (
                      <div style={{ width:'100%', height:'100%', background:`linear-gradient(135deg, ${filtered[0].accent}18, ${filtered[0].accent}06)` }} />
                    )}
                  </div>
                  <div style={{ padding:'8px 0' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                      <span style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', color:filtered[0].accent }}>{filtered[0].category}</span>
                      <span style={{ color:'rgba(26,26,26,0.25)', fontSize:10 }}>·</span>
                      <span style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:11, color:'rgba(26,26,26,0.4)' }}>{filtered[0].date}</span>
                      <span style={{ color:'rgba(26,26,26,0.25)', fontSize:10 }}>·</span>
                      <span style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:11, color:'rgba(26,26,26,0.4)' }}>{filtered[0].readTime}</span>
                    </div>
                    <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(24px,3vw,38px)', lineHeight:1.1, letterSpacing:'-0.02em', color:INK, margin:'0 0 16px 0' }}>{filtered[0].title}</h2>
                    <p style={{ fontFamily:"'Source Sans Pro',sans-serif", fontWeight:300, fontSize:'clamp(14px,1.3vw,16px)', lineHeight:1.75, color:'rgba(26,26,26,0.6)', margin:'0 0 24px 0' }}>{filtered[0].excerpt}</p>
                    <div className="fa-cta" style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:"'Source Sans Pro',sans-serif", fontWeight:700, fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:filtered[0].accent, opacity:0.6, transition:'opacity 0.25s ease' }}>
                      Read article <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Rest of articles. 3-column grid */}
            {(filter === 'All' ? filtered.slice(1) : filtered).length > 0 && (
              <>
                {filter === 'All' && (
                  <div style={{ height:1, background:'rgba(26,26,26,0.1)', marginBottom:48 }} />
                )}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(24px,3vw,40px)' }} id="articles-grid">
                  <style>{`@media(max-width:900px){#articles-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:560px){#articles-grid{grid-template-columns:1fr!important;}}`}</style>
                  {(filter === 'All' ? filtered.slice(1) : filtered).map((article, i) => (
                    <motion.article key={article.id} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.7,delay:i*0.07}} viewport={{once:true}}
                      onClick={() => navigate(`/blog/${article.slug}`)} style={{ cursor:'pointer', display:'flex', flexDirection:'column', borderTop:`2px solid rgba(26,26,26,0.08)`, paddingTop:20 }} className="grid-article">
                      <style>{`.grid-article:hover .ga-img img{transform:scale(1.04)}.grid-article:hover .ga-cta{opacity:1}`}</style>
                      {article.coverImage && (
                        <div className="ga-img" style={{ borderRadius:8, overflow:'hidden', border:'1px solid rgba(26,26,26,0.1)', aspectRatio:'16/9', marginBottom:16 }}>
                          <img src={article.coverImage} alt={article.coverAlt || article.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }} loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity='0.1';}} />
                        </div>
                      )}
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                        <span style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:article.accent }}>{article.category}</span>
                        <span style={{ color:'rgba(26,26,26,0.25)', fontSize:10 }}>·</span>
                        <span style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:11, color:'rgba(26,26,26,0.4)' }}>{article.date}</span>
                      </div>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(18px,1.8vw,22px)', lineHeight:1.15, letterSpacing:'-0.01em', color:INK, margin:'0 0 10px 0', flex:1 }}>{article.title}</h3>
                      <p style={{ fontFamily:"'Source Sans Pro',sans-serif", fontWeight:300, fontSize:13, lineHeight:1.7, color:'rgba(26,26,26,0.55)', margin:'0 0 14px 0' }}>{article.excerpt}</p>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid rgba(26,26,26,0.08)' }}>
                        <span style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:11, color:'rgba(26,26,26,0.4)' }}>{article.readTime}</span>
                        <div className="ga-cta" style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:"'Source Sans Pro',sans-serif", fontWeight:700, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:article.accent, opacity:0.5, transition:'opacity 0.2s' }}>
                          Read <ArrowRight size={11} />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </>
            )}

            {/* Coming soon note */}
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} style={{ textAlign:'center', marginTop:80, paddingTop:56, borderTop:'1px solid rgba(26,26,26,0.1)' }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:22, color:'rgba(26,26,26,0.35)' }}>More articles being written.</p>
              <p style={{ fontFamily:"'Source Sans Pro',sans-serif", fontSize:12, color:'rgba(26,26,26,0.3)', marginTop:6 }}>New case studies, process notes, and studio writing added as work is completed.</p>
            </motion.div>
          </div>
        </section>

        {/* CTA. dark */}
        <section style={{ background:BLACK, borderTop:'1px solid rgba(255,255,255,0.05)', padding:'clamp(56px,7vw,88px) clamp(24px,5vw,64px)' }}>
          <div style={{ maxWidth:600, margin:'0 auto', textAlign:'center' }}>
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:0.8}} viewport={{once:true}}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(32px,4vw,52px)', color:'#fff', lineHeight:1.05, letterSpacing:'-0.025em', margin:'0 0 16px 0' }}>
                Want us to tell your story?
              </h2>
              <p style={{ fontFamily:"'Source Sans Pro',sans-serif", fontWeight:300, fontSize:'clamp(14px,1.3vw,16px)', color:'rgba(255,255,255,0.4)', lineHeight:1.75, margin:'0 0 32px 0' }}>
                Every project we take becomes a case study. Every case study becomes an article. Start a project and we will document it properly.
              </p>
              <button onClick={() => navigate('/contact')}
                style={{ fontFamily:"'Source Sans Pro',sans-serif", fontWeight:700, fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', padding:'14px 32px', background:GOLD, color:BLACK, border:'none', borderRadius:2, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8 }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=LAVENDER;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=GOLD;}}>
                Start a Project <ArrowRight size={13} />
              </button>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
