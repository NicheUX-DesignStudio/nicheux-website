import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GOLD = '#E9C672';
const BLACK = '#0A0A0A';
const PARCHMENT = '#F1E9D2';
const INK = '#1a1a1a';

// ── GALLERY DATA ──────────────────────────────────────────────────────────────
// Behind the scenes: team, process, events, work-in-progress.
// Add new items here as you get more content. Videos go in public/videos/gallery/.
// Photos go in public/images/gallery/ or reference any existing public image.
// type: 'image' | 'video'

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  poster?: string;        // thumbnail for video
  alt: string;
  category: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // ── Works (finished client pieces) ──
  { id: 23, type: 'image', src: '/images/sooraj/linkedin/banner-green.png',         alt: 'Sooraj LinkedIn banner design',          category: 'Works', caption: 'Sooraj Nikam LinkedIn Banner. Designed to be seen before the first connection request.' },
  { id: 24, type: 'image', src: '/images/sooraj/carousel/slide-1.png',             alt: 'The Generation Conversation carousel',   category: 'Works', caption: 'The Generation Conversation. Eight Wanted-poster slides built overnight for a PorterShed Galway entrepreneurship event.' },
  { id: 25, type: 'image', src: '/images/sooraj/candy/no-texture.png',             alt: 'Kingdom of Sweets arch banner',          category: 'Works', caption: 'Kingdom of Sweets. Heritage-aesthetic arch banner built to be the most photographed backdrop at the event.' },
  { id: 26, type: 'image', src: '/images/poster-leg1.jpeg',                   alt: 'SSJC Leg 1 tournament poster',           category: 'Works', caption: 'SSJC Leg 1 Tournament. Retro Purple gaming-universe identity for Malaysia\'s premier junior squash circuit.' },
  { id: 27, type: 'image', src: '/images/poster-leg2.jpeg',                   alt: 'SSJC Leg 2 tournament poster',           category: 'Works', caption: 'SSJC Leg 2 Tournament. Cyber Blue chapter. Same visual system, new identity.' },
  { id: 13, type: 'image', src: '/images/ssjc/medal-leg1-boys.png',               alt: 'SSJC Leg 1 Boys medal design',           category: 'Works', caption: 'SSJC Leg 1 Boys Medal. Physical medal design for the gaming-universe tournament identity.' },
  { id: 15, type: 'image', src: '/images/ssjc/medal-leg2-boys.png',               alt: 'SSJC Leg 2 Boys medal design',           category: 'Works', caption: 'SSJC Leg 2 Boys Medal. Cyber Blue chapter.' },

  // ── Images (studio & creative) ──
  { id: 7,  type: 'image', src: '/images/MotherNature.jpg',                        alt: 'Mother Nature conceptual illustration',  category: 'Images', caption: 'Mother Nature. Conceptual illustration from the NicheUX studio.' },
  { id: 6,  type: 'image', src: '/images/Dragon.jpg',                              alt: 'Dragon illustration by Indhupriya',      category: 'Images', caption: 'Dragon. NicheUX first original artwork. Before we had clients, we made this.' },

  // ── Videos ──
  { id: 30, type: 'video', src: '/videos/london-tube-reel.mp4', poster: '/images/london-tube-thumb.jpg', alt: 'London Underground Series, Behavioural Design in the Wild', category: 'Videos', caption: 'London Underground Series. Schema Hijacking, Disfluency, Dual Coding deconstructed from Victoria Line advertising. Captured at King\'s Cross peak hours.' },
  { id: 31, type: 'video', src: '/videos/AISeries.mp4', poster: '/images/ai-canvas-thumb.jpg', alt: 'AI Canvas, Generative art direction by NicheUX', category: 'Videos', caption: 'AI Canvas. Where human imagination meets generative direction. NicheUX studio exploration.' },

  // ── Behind the Scenes (team + process) ──
  { id: 1,  type: 'image', src: '/images/Thevaki-uiuxdesigner-developer-web-designer-nicheux.webp',  alt: 'Thevaki, Creative Director at NicheUX',       category: 'Behind the Scenes', caption: 'Thevaki. Creative Director, UI/UX, Web Development.' },
  { id: 2,  type: 'image', src: '/images/Indhupriya-character-illustrator-nicheux.webp',              alt: 'Indhupriya, Character Illustrator at NicheUX', category: 'Behind the Scenes', caption: 'Indhupriya. Character and Illustration Designer.' },
  { id: 3,  type: 'image', src: '/images/Issac-graphic-designer-print-brand-nicheux.webp',            alt: 'Isaac, Print and Brand Designer at NicheUX',   category: 'Behind the Scenes', caption: 'Isaac. Print and Brand Designer.' },
  { id: 4,  type: 'image', src: '/images/Akash-ai-visual-nicheux.webp',                               alt: 'Akash, AI Visual Director at NicheUX',          category: 'Behind the Scenes', caption: 'Akash. AI Visuals and art direction.' },
  { id: 5,  type: 'image', src: '/images/Delwin-motion-design-social-media-nicheux.webp',             alt: 'Delwin, Motion Designer at NicheUX',            category: 'Behind the Scenes', caption: 'Delwin. Motion Design and social media.' },
  { id: 16, type: 'image', src: '/images/Kishore.jpeg',                                               alt: 'Kishore Aravind, Sales and Marketing at NicheUX', category: 'Behind the Scenes', caption: 'Kishore Aravind. Sales and Marketing.' },
  { id: 17, type: 'image', src: '/images/kishore-working.jpeg',                                      alt: 'Kishore Aravind working behind the scenes at NicheUX', category: 'Behind the Scenes', caption: 'Kishore at work. The calls, the clients, the follow-ups. Sales and marketing in motion.' },
  { id: 18, type: 'image', src: '/images/kishore-working1.jpeg',                                     alt: 'Kishore Aravind NicheUX behind the scenes', category: 'Behind the Scenes', caption: 'Kishore Aravind. Between the conversations that turn into projects.' },
  { id: 19, type: 'image', src: '/images/kishore-working2.jpeg',                                     alt: 'Kishore Aravind process photo NicheUX', category: 'Behind the Scenes', caption: 'Kishore. The work that makes the work happen.' },
  { id: 8,  type: 'image', src: '/images/WhatsApp%20Image%202026-04-23%20at%207.27.35%20PM.jpeg',    alt: 'NicheUX studio work in progress',               category: 'Behind the Scenes', caption: 'Early concept sketch. The ideas that become final deliverables always start here.' },
  { id: 9,  type: 'image', src: '/images/WhatsApp%20Image%202026-04-23%20at%207.49.17%20PM.jpeg',    alt: 'NicheUX design process behind the scenes',      category: 'Behind the Scenes', caption: 'Design process. Before the screens, the pencil.' },
  { id: 10, type: 'image', src: '/images/WhatsApp%20Image%202026-04-23%20at%208.03.43%20PM.jpeg',    alt: 'NicheUX behind the scenes studio work',          category: 'Behind the Scenes', caption: 'Studio work. The work behind the work.' },
];

const CATEGORIES = ['All', 'Works', 'Images', 'Videos', 'Behind the Scenes'];

// Fetch Notion gallery items and merge with static fallback
async function fetchNotionItems(): Promise<GalleryItem[]> {
  try {
    const res = await fetch('/api/gallery');
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.success || !Array.isArray(data.items)) return [];
    return data.items.map((item: GalleryItem, i: number) => ({
      ...item,
      id: item.id || (9000 + i),
    }));
  } catch {
    return [];
  }
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function VideoThumbnail({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ position: 'relative', cursor: 'pointer', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(26,26,26,0.1)', aspectRatio: '16/9', background: '#111' }} className="gallery-thumb">
      {item.poster ? (
        <img src={item.poster} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#111,#222)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={32} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', transition: 'background 0.2s' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(233,198,114,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={18} style={{ color: '#0A0A0A', marginLeft: 2 }} />
        </div>
      </div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch Notion gallery items and prepend to static fallback
    fetchNotionItems().then(notionItems => {
      if (notionItems.length > 0) {
        // Deduplicate by src — Notion items take precedence
        const notionSrcs = new Set(notionItems.map(i => i.src));
        const staticOnly = GALLERY_ITEMS.filter(i => !notionSrcs.has(i.src));
        setItems([...notionItems, ...staticOnly]);
      }
    });
  }, []);

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);
  const activeItem = lightbox !== null ? items.find(i => i.id === lightbox) : null;
  const filteredIdx = activeItem ? filtered.findIndex(i => i.id === lightbox) : -1;

  function closeL() { setLightbox(null); }
  function nextL() { if (filteredIdx < 0 || filteredIdx >= filtered.length - 1) return; setLightbox(filtered[filteredIdx + 1].id); }
  function prevL() { if (filteredIdx <= 0) return; setLightbox(filtered[filteredIdx - 1].id); }

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeL();
      if (e.key === 'ArrowRight') nextL();
      if (e.key === 'ArrowLeft') prevL();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [lightbox, filteredIdx, filtered.length]);

  return (
    <>
      <Helmet>
        <title>Gallery | NicheUX. Behind the Scenes</title>
        <meta name="description" content="Behind the scenes at NicheUX. the team, the process, studio artwork, and moments from events. Images and videos updated regularly." />
        <meta property="og:title" content="Gallery | NicheUX" />
        <meta property="og:description" content="Behind the scenes at NicheUX. The team, the process, the studio." />
      </Helmet>

      {/* LIGHTBOX — z-index above nav (nav is 1000) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,8,6,0.97)', backdropFilter: 'blur(16px)', padding: '16px' }}
            onClick={closeL}
            role="dialog" aria-modal="true" aria-label={`Viewing: ${activeItem.alt}`}>
            <motion.div initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: 'relative', maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={e => e.stopPropagation()}>

              {activeItem.type === 'video' ? (
                <video src={activeItem.src} controls autoPlay preload="metadata" style={{ width: '100%', maxHeight: 'calc(100vh - 140px)', borderRadius: 8, display: 'block' }} aria-label={activeItem.alt} />
              ) : (
                <img src={activeItem.src} alt={activeItem.alt}
                  style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 140px)', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 8, display: 'block', margin: '0 auto' }} />
              )}

              <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 400, fontSize: 18, color: 'rgba(255,255,255,0.85)', margin: 0 }}>{activeItem.caption}</p>
                  <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${GOLD}70`, marginTop: 6 }}>{activeItem.category}</p>
                </div>
                <button onClick={closeL} aria-label="Close" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <X size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                </button>
              </div>

              {/* Counter */}
              <p style={{ textAlign: 'center', marginTop: 12, fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.16em' }}>
                {filteredIdx + 1} / {filtered.length}
              </p>
            </motion.div>

            {/* Nav arrows */}
            {filteredIdx > 0 && (
              <button onClick={e => { e.stopPropagation(); prevL(); }} aria-label="Previous image"
                style={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,8,6,0.8)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10001 }}>
                <ChevronLeft size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
              </button>
            )}
            {filteredIdx < filtered.length - 1 && (
              <button onClick={e => { e.stopPropagation(); nextL(); }} aria-label="Next image"
                style={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,8,6,0.8)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10001 }}>
                <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ background: BLACK, overflow: 'hidden' }}>

        {/* HERO */}
        <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 'clamp(56px,7vw,80px)', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(24px,5vw,64px)', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD }}>Behind the Scenes</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
              style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(52px,9vw,120px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 24px 0' }}>
              Gallery.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "'Source Sans Pro',sans-serif", fontWeight: 400, fontSize: 'clamp(15px,1.4vw,18px)', color: 'rgba(255,255,255,0.4)', maxWidth: 520, lineHeight: 1.75 }}>
              The team, the process, the studio, the events. Photos and videos from behind the work. Updated as we go.
            </motion.p>
          </div>
        </section>

        {/* GALLERY. parchment */}
        <section style={{ background: PARCHMENT, borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,5vw,72px) clamp(24px,5vw,48px)' }}>

            {/* Filter */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} aria-pressed={filter === cat}
                  style={{ fontFamily: "'Source Sans Pro',sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '7px 14px', borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s ease',
                    background: filter === cat ? INK : 'transparent',
                    color: filter === cat ? PARCHMENT : 'rgba(26,26,26,0.45)',
                    border: `1px solid rgba(26,26,26,${filter === cat ? 0.8 : 0.2})`,
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div style={{ columns: 'auto', columnCount: 3, columnGap: 16 }} id="gallery-grid">
              <style>{`@media(max-width:900px){#gallery-grid{column-count:2!important;}}`}</style>
              {filtered.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.03 }} viewport={{ once: true }}
                  style={{ breakInside: 'avoid', marginBottom: 16, position: 'relative' }}
                  className="gallery-card">
                  <style>{`.gallery-card:hover .gc-overlay{opacity:1}`}</style>

                  {item.type === 'video' ? (
                    <VideoThumbnail item={item} onClick={() => setLightbox(item.id)} />
                  ) : (
                    <div onClick={() => setLightbox(item.id)} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(26,26,26,0.1)', cursor: 'pointer', position: 'relative' }} className="gallery-img">
                      <style>{`.gallery-img:hover img{transform:scale(1.03)}`}</style>
                      <img src={item.src} alt={item.alt} style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }} loading="lazy"
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                      <div className="gc-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.8) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'flex-end', padding: 16 }}>
                        <div>
                          <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: 0 }}>{item.caption}</p>
                          <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${GOLD}90`, margin: '4px 0 0' }}>{item.category}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 24, color: 'rgba(26,26,26,0.35)' }}>Nothing in this category yet.</p>
              </div>
            )}

            {/* Add your content CTA */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              style={{ marginTop: 72, paddingTop: 48, borderTop: '1px solid rgba(26,26,26,0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }} id="gallery-cta">
              <style>{`@media(max-width:640px){#gallery-cta{grid-template-columns:1fr!important;}}`}</style>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(22px,2.5vw,30px)', color: INK, margin: '0 0 12px 0', lineHeight: 1.15 }}>
                  Got a photo or video to share?
                </h3>
                <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontWeight: 400, fontSize: 14, color: 'rgba(26,26,26,0.6)', lineHeight: 1.75, margin: 0 }}>
                  Behind-the-scenes from events, team moments, work-in-progress shots, client photos of NicheUX work in the real world. Send them to us and we will add them here.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                <a href="mailto:hellonicheux@gmail.com?subject=Gallery%20Submission&body=Hi%20NicheUX%2C%0A%0AI%27d%20like%20to%20submit%20a%20photo%2Fvideo%20for%20the%20gallery."
                  style={{ fontFamily: "'Source Sans Pro',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '12px 24px', background: INK, color: PARCHMENT, border: 'none', borderRadius: 2, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = GOLD; (e.currentTarget as HTMLAnchorElement).style.color = BLACK; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = INK; (e.currentTarget as HTMLAnchorElement).style.color = PARCHMENT; }}>
                  Email a submission <ArrowRight size={13} />
                </a>
                <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 12, color: 'rgba(26,26,26,0.4)', margin: 0 }}>
                  Subject: "Gallery submission" · hellonicheux@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
