"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, X, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitToNotion } from '@/services/notionService';
import { useCountryPricing } from '@/hooks/useCountryPricing';
import { getMerchPrice } from '@/utils/pricingService';

const GOLD    = '#E9C672';
const LAVENDER= '#B097BE';
const BLUE    = '#89B1CC';
const BLACK   = '#0A0A0A';
const PARCHMENT='#F1E9D2';
const INK     = '#1a1a1a';
const INK_SOFT= 'rgba(26,26,26,0.62)';
const EASE    = [0.25, 0.46, 0.45, 0.94] as const;

// ── DATA ─────────────────────────────────────────────────────────────────────

interface Artifact {
  id: string;
  name: string;
  concept: string;
  tagline: string;
  narrative: string;
  price: string;
  baseGBP: number;
  priceNote: string;
  commissioned: boolean;
  commissionHint?: string;
  accent: string;
  image: string;
  imagePosition?: string;
  useContain?: boolean;
  badge?: string;
}

function formatArtPrice(a: Artifact, symbol: string, countryCode: string): string {
  const converted = getMerchPrice(a.baseGBP, countryCode);
  const prefix = a.price.startsWith('From') ? 'From ' : '';
  return `${prefix}${symbol}${converted}`;
}

const ARTIFACTS: Artifact[] = [
  {
    id: 'quote-frame',
    name: 'Illustrated Quote Frame',
    concept: 'Anchored Memory',
    tagline: 'Your words. Our art.',
    narrative: 'Choose a line that anchored you: a quote, a verse, a phrase that arrived at the right moment and stayed. We illustrate it into a ready-to-hang framed print made entirely for you. Every one is different. No two will ever be the same.',
    price: 'From £85',
    baseGBP: 85,
    priceNote: 'A4 or A3 giclée print, framed',
    commissioned: true,
    commissionHint: 'Your quote, your name, your story',
    accent: GOLD,
    image: '/images/illustrated-quote-frame--anchored-memory.webp',
  },
  {
    id: 'stage-print',
    name: 'The Stage is Yours',
    concept: 'The Threshold',
    tagline: 'Limited. Numbered. Permanent.',
    narrative: 'A theatrical figure standing at the edge of the stage, looking out. Original NicheUX illustration. A3 giclée print, signed and hand-numbered. First edition of 50. When they are gone, this edition closes forever.',
    price: '£55',
    baseGBP: 55,
    priceNote: 'A3 · signed · numbered · edition of 50',
    commissioned: false,
    accent: LAVENDER,
    image: '/images/the-stage-is-yours-print--threshold-manifesto.webp',
    badge: 'Limited · 50 only',
  },
  {
    id: 'photo-frame',
    name: 'Custom Photo Frame',
    concept: 'Narrative Border',
    tagline: 'The photo means more with context.',
    narrative: 'Send us a photo: a moment, a portrait, a place that holds weight. We build an illustrated border around it that tells the story of what makes it matter. The border is bespoke. The frame is built around your image, not the other way around.',
    price: 'From £95',
    baseGBP: 95,
    priceNote: 'Print and frame included · digital proof first',
    commissioned: true,
    commissionHint: 'Your photo, custom illustrated border',
    accent: BLUE,
    image: '/images/custom-photo-frame--narrative-border.webp',
    imagePosition: 'center 20%',
    useContain: true,
  },
  {
    id: 'manifesto-mug',
    name: '"Design is a Feeling" Mug',
    concept: 'Daily Ritual',
    tagline: 'The manifesto you drink from.',
    narrative: 'Ceramic mug with the NicheUX hand-lettered quote wrap. Dishwasher safe. The kind that turns a morning into a ritual rather than a routine.',
    price: '£28',
    baseGBP: 28,
    priceNote: 'Ceramic · 330ml · dishwasher safe',
    commissioned: false,
    accent: GOLD,
    image: '/images/manifesto-mug--design-is-a-feeling.webp',
  },
  {
    id: 'name-mug',
    name: 'Custom Name Mug',
    concept: 'Identity Piece',
    tagline: 'Not a mug. An identity piece.',
    narrative: 'A name is where identity begins. Give us a name or short phrase and we letter it in our signature hand-drawn style. A real gift means something specific to one person.',
    price: 'From £38',
    baseGBP: 38,
    priceNote: 'Ceramic · colour options · hand-lettered',
    commissioned: true,
    commissionHint: 'Name or phrase, mug colour',
    accent: LAVENDER,
    image: '/images/custom-name-mug--identity-piece.webp',
  },
  {
    id: 'scene-mug',
    name: 'Illustrated Scene Mug',
    concept: 'Map of History',
    tagline: 'A whole world on a mug.',
    narrative: 'Detailed wrap illustration of cityscapes, libraries, theatres, markets. Choose a scene or share a place. Every sip, a different world.',
    price: '£34',
    baseGBP: 34,
    priceNote: 'Ceramic · 330ml · 4 scenes',
    commissioned: false,
    accent: BLUE,
    image: '/images/city-scene-mug--map-of-history.webp',
  },
  {
    id: 'story-tee',
    name: 'NicheUX Story Tee',
    concept: 'Wearable Manifesto',
    tagline: 'Wear the manifesto.',
    narrative: 'Heavyweight 100% cotton. Your storyline with a typographic print and an illustration of it on the back. A position piece. The kind of tee you keep for years.',
    price: 'From £55',
    baseGBP: 55,
    priceNote: 'Unisex · 100% heavyweight cotton · XS to 3XL',
    commissioned: false,
    accent: GOLD,
    image: '/images/nicheux-story-hoodie--wearable-manifesto.webp',
    imagePosition: 'center 18%',
  },
  {
    id: 'quote-tee',
    name: 'Custom Quote Tee',
    concept: 'Personal Verse',
    tagline: 'Your verse. Your back.',
    narrative: 'Give us a line in any language. Something that belongs to you. We typeset it, you pick the colour. Printed to order. One is enough.',
    price: 'From £68',
    baseGBP: 68,
    priceNote: 'Unisex · custom print · any language',
    commissioned: true,
    commissionHint: 'Your verse, tee colour, size',
    accent: LAVENDER,
    image: '/images/STUDIO_VOICE.webp',
    imagePosition: 'center 18%',
  },
  {
    id: 'hoodie',
    name: '"Storytelling" Hoodie',
    concept: 'Wearable Legacy',
    tagline: 'For the ones who build worlds.',
    narrative: 'Midweight fleece. Embroidered "Storytelling" script on the back. The kind you keep for years. The kind people ask about.',
    price: 'From £89',
    baseGBP: 89,
    priceNote: 'Unisex · midweight fleece · XS to 3XL',
    commissioned: false,
    accent: BLUE,
    image: '/images/storytelling-teeshirt.webp',
    imagePosition: 'center 12%',
    badge: 'New',
  },
  {
    id: 'kids-book',
    name: 'My Design Story',
    concept: 'World Builder',
    tagline: 'A story starring someone you love.',
    narrative: 'A fully illustrated 24-page hardcover children\'s story where the main character shares your child\'s name. The story follows a child who discovers that creativity is a superpower. For ages 3 to 8.',
    price: 'From £85',
    baseGBP: 85,
    priceNote: 'Hardcover · 24 pages · named and personalised',
    commissioned: true,
    commissionHint: "Child's name, dedication message",
    accent: GOLD,
    image: '/images/childrens-story-book--world-builder-legacy.webp',
    imagePosition: 'center center',
    badge: 'Bestseller',
  },
  {
    id: 'stage-book',
    name: 'The Stage is Set',
    concept: 'World Builder',
    tagline: 'A story about building something from nothing.',
    narrative: 'A picture book about a girl who builds a theatre from nothing. For children who love art, making things, and big dreams. Ages 4 to 9.',
    price: '£35',
    baseGBP: 35,
    priceNote: 'Softcover · illustrated throughout',
    commissioned: false,
    accent: LAVENDER,
    image: '/images/stage-book.webp',
    imagePosition: 'center center',
  },
  {
    id: 'mini-book',
    name: 'Custom Illustrated Mini-Book',
    concept: 'Private Archive',
    tagline: 'Your story. Illustrated. Bound.',
    narrative: 'You give us the story: family history, a trip that changed something, a legend, a tribute. We illustrate every page and print it as a bound book. Minimum 12 pages. This is an heirloom, not a product.',
    price: 'From £185',
    baseGBP: 185,
    priceNote: 'Fully bespoke · minimum 12 pages · illustrated throughout',
    commissioned: true,
    commissionHint: 'Your story, your history, fully illustrated',
    accent: BLUE,
    image: '/images/custom-illustrated-minibook--private-archive.webp',
    imagePosition: 'center center',
  },
];

// ── FORM TYPE HELPER ─────────────────────────────────────────────────────────
// A = story/memory commissions (frames, photo, mini-book)
// B = custom text commissions (name mug, custom quote tee)
// C = book character commissions (children's books)
// D = order forms for fixed-design products (apparel, mugs with set design)
type FormType = 'A' | 'B' | 'C' | 'D';
function getFormType(concept: string): FormType {
  if (['Anchored Memory', 'Narrative Border', 'Private Archive'].includes(concept)) return 'A';
  if (['World Builder'].includes(concept)) return 'C';
  if (['Daily Ritual', 'Map of History', 'Wearable Manifesto', 'Wearable Legacy', 'The Threshold'].includes(concept)) return 'D';
  return 'B';
}

// ── COMMISSION MODAL (3 form variants) ────────────────────────────────────────
function CommissionModal({ a, onClose }: { a: Artifact; onClose: () => void }) {
  const ft = getFormType(a.concept);
  const [submitted, setSubmitted] = useState(false);
  const { countryInfo } = useCountryPricing();

  const [cName, setCName] = useState('');
  const [email, setEmail] = useState('');
  // Form A
  const [narrative, setNarrative] = useState('');
  const [vibe, setVibe] = useState('');
  const [elements, setElements] = useState('');
  // Form B
  const [verse, setVerse] = useState('');
  const [tone, setTone] = useState('Legacy Script');
  const [placement, setPlacement] = useState('Back');
  // Form C
  const [protagonist, setProtagonist] = useState('');
  const [theme, setTheme] = useState('Construction');
  const [dedication, setDedication] = useState('');
  // Form D (order)
  const [size, setSize] = useState('M');
  const [colorPref, setColorPref] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [qty, setQty] = useState('1');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [onClose]);

  function buildBrief() {
    let brief = `${ft === 'D' ? 'Order' : 'Commission'}: ${a.name}\nProduct: ${a.concept}\nFrom: ${cName} (${email})`;
    if (ft === 'A') brief += `\n\nNarrative: ${narrative}\nVisual Vibe: ${vibe || 'Not specified'}\nKey Elements: ${elements}`;
    if (ft === 'B') brief += `\n\nText/Name to print: ${verse}\nDesign Voice: ${tone}\nPlacement: ${placement}`;
    if (ft === 'C') brief += `\n\nProtagonist: ${protagonist}\nTheme/Superpower: ${theme}\nDedication: ${dedication}`;
    if (ft === 'D') brief += `\n\nSize: ${size}\nColour preference: ${colorPref || 'No preference'}\nQuantity: ${qty}\nNote: ${orderNote || 'None'}`;
    return brief;
  }

  async function submit() {
    if (!cName.trim() || !email.trim()) return;
    try {
      await submitToNotion({
        name: cName,
        email,
        phone: '',
        company: '',
        timeline: '',
        source: 'Artifact Studio',
        message: buildBrief(),
        services: [a.name],
        country: countryInfo?.countryName || 'United Kingdom',
        currency: countryInfo?.symbol || '£',
      });
    } catch (_) {}
    setSubmitted(true);
  }

  const inp: React.CSSProperties = { fontFamily: "'Source Sans Pro',sans-serif", fontSize: 14, color: '#fff', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', width: '100%', outline: 'none', resize: 'vertical' as const, lineHeight: 1.6, boxSizing: 'border-box' as const };
  const lbl: React.CSSProperties = { fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 7, display: 'block' };

  const META: Record<FormType, { eyebrow: string; headline: string }> = {
    A: { eyebrow: 'Anchored Memory · Private Archive', headline: 'Tell us the story.' },
    B: { eyebrow: 'Custom Text · Personal Design', headline: 'Give us the words.' },
    C: { eyebrow: 'World Builder · Custom Illustration', headline: 'Introduce the protagonist.' },
    D: { eyebrow: 'Place Your Order', headline: 'Your details.' },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 10000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'clamp(12px,3vw,40px)', overflowY: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#0f0f0f', maxWidth: 620, width: '100%', padding: 'clamp(24px,4vw,52px)', position: 'relative', borderTop: `3px solid ${a.accent}`, marginTop: 'clamp(16px,5vw,80px)', marginBottom: 24 }}>

        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}><X size={14} /></button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: 'clamp(24px,4vw,48px) 0' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(40px,6vw,64px)', color: a.accent, lineHeight: 1, marginBottom: 20 }}>❖</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(24px,3.5vw,36px)', color: '#fff', margin: '0 0 12px' }}>Commission received.</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
              <CheckCircle size={16} style={{ color: '#4CAF50' }} />
              <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Your brief has been sent to the NicheUX team.
              </p>
            </div>
            <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: '0 0 32px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              We will come back to you within 24 hours with a proposal. No payment until you approve the direction.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <a href="https://wa.me/447342736804?text=Hi%20NicheUX%2C%20I%27d%20like%20to%20discuss%20my%20commission."
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: a.accent, color: BLACK, padding: '12px 24px', fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}>
                Email hellonicheux@gmail.com <ArrowRight size={11} />
              </a>
              <a href="https://wa.me/447342736804?text=Hi%20NicheUX%2C%20I%27d%20like%20to%20commission%20an%20artifact."
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '12px 24px', fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp us
              </a>
            </div>
            <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.22)', margin: '24px 0 0' }}>
              We respond within 24 hours. No payment until you approve the direction.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 16, height: 1, background: a.accent }} />
                <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: a.accent }}>{META[ft].eyebrow}</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(24px,3.5vw,38px)', lineHeight: 1.05, color: '#fff', margin: '0 0 6px' }}>{a.name}</h2>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(15px,1.5vw,19px)', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{META[ft].headline}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <style>{`@media(max-width:480px){.cm-names{grid-template-columns:1fr!important}}`}</style>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="cm-names">
                <div><label style={lbl}>Your Name</label><input value={cName} onChange={e => setCName(e.target.value)} placeholder="Full name" style={inp} /></div>
                <div><label style={lbl}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inp} /></div>
              </div>

              {ft === 'A' && <>
                <div><label style={lbl}>The Narrative</label>
                  <textarea value={narrative} onChange={e => setNarrative(e.target.value)} rows={4} placeholder="Tell us the memory, history, or tribute. What is the emotional core of this story?" style={inp} />
                </div>
                <div><label style={lbl}>The Visual Vibe</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Nostalgic / Sepia', 'Vibrant / Modern', 'Minimal / Architectural', 'Romantic / Floral', 'Dark / Editorial'].map(v => (
                      <button key={v} onClick={() => setVibe(v)} style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 600, padding: '7px 13px', background: vibe === v ? a.accent : 'rgba(255,255,255,0.04)', color: vibe === v ? BLACK : 'rgba(255,255,255,0.5)', border: `1px solid ${vibe === v ? a.accent : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', transition: 'all 0.15s' }}>{v}</button>
                    ))}
                  </div>
                </div>
                <div><label style={lbl}>Key Elements</label><input value={elements} onChange={e => setElements(e.target.value)} placeholder="Names, dates, symbols (e.g. a specific flower, a clock, a landmark)" style={inp} /></div>
              </>}

              {ft === 'B' && <>
                <div><label style={lbl}>The Verse</label>
                  <textarea value={verse} onChange={e => setVerse(e.target.value)} rows={3} placeholder="Write exactly what you want printed. Any language." style={inp} />
                </div>
                <div><label style={lbl}>Studio Design Voice</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Legacy Script', 'Stoic Serif', 'Modernist Sans'].map(t => (
                      <button key={t} onClick={() => setTone(t)} style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 600, padding: '7px 13px', background: tone === t ? a.accent : 'rgba(255,255,255,0.04)', color: tone === t ? BLACK : 'rgba(255,255,255,0.5)', border: `1px solid ${tone === t ? a.accent : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', transition: 'all 0.15s' }}>{t}</button>
                    ))}
                  </div>
                </div>
                <div><label style={lbl}>Placement</label>
                  <select value={placement} onChange={e => setPlacement(e.target.value)} style={{ ...inp, resize: undefined }}>
                    {['Back', 'Front', 'Neckline', 'Pocket / Chest', 'Full Wrap'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </>}

              {ft === 'C' && <>
                <div><label style={lbl}>The Protagonist</label>
                  <textarea value={protagonist} onChange={e => setProtagonist(e.target.value)} rows={3} placeholder="Name and description of the child: hair colour, favourite item they own, a personality detail." style={inp} />
                </div>
                <div><label style={lbl}>Theme / Superpower</label>
                  <select value={theme} onChange={e => setTheme(e.target.value)} style={{ ...inp, resize: undefined }}>
                    {['Construction', 'Magic', 'Nature', 'Space', 'Ocean', 'Art & Creativity', 'Music', 'Sport', 'History & Heritage', 'Custom Theme'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Dedication</label>
                  <textarea value={dedication} onChange={e => setDedication(e.target.value)} rows={2} placeholder="What should the personal dedication on the inside cover say?" style={inp} />
                </div>
              </>}

              {ft === 'D' && <>
                {/* Size — only show for apparel */}
                {['Wearable Manifesto', 'Wearable Legacy', 'Personal Verse'].includes(a.concept) && (
                  <div><label style={lbl}>Size</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(s => (
                        <button key={s} onClick={() => setSize(s)} style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 600, padding: '7px 13px', background: size === s ? a.accent : 'rgba(255,255,255,0.04)', color: size === s ? BLACK : 'rgba(255,255,255,0.5)', border: `1px solid ${size === s ? a.accent : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', transition: 'all 0.15s', minWidth: 40 }}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={lbl}>Colour preference</label>
                    <input value={colorPref} onChange={e => setColorPref(e.target.value)} placeholder="e.g. Black, Navy, White..." style={inp} />
                  </div>
                  <div><label style={lbl}>Quantity</label>
                    <select value={qty} onChange={e => setQty(e.target.value)} style={{ ...inp, resize: undefined }}>
                      {['1', '2', '3', '4', '5', '6+'].map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                </div>
                <div><label style={lbl}>Any special note (optional)</label>
                  <textarea value={orderNote} onChange={e => setOrderNote(e.target.value)} rows={2} placeholder="Gift message, special instructions, or anything else we should know." style={inp} />
                </div>
              </>}

              <div style={{ marginTop: 4, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={submit} style={{ background: a.accent, color: BLACK, border: 'none', padding: '13px 28px', fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, width: 'fit-content', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.82'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                  Send the Brief <ArrowRight size={12} />
                </button>
                <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.22)', margin: 0 }}>
                  Custom proposal by email within 24 hours. No payment until you approve the direction.
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────

function Lightbox({ a, onClose, onCommission }: { a: Artifact; onClose: () => void; onCommission: (a: Artifact) => void }) {
  const { countryInfo } = useCountryPricing();
  const displayPrice = countryInfo ? formatArtPrice(a, countryInfo.symbol, countryInfo.countryCode) : a.price;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(12px,3vw,48px)' }}>
      <style>{`
        .lb-grid { display: grid; grid-template-columns: 55% 45%; max-height: 92vh; overflow: hidden; }
        @media (max-width: 680px) {
          .lb-grid { grid-template-columns: 1fr !important; max-height: 95vh !important; overflow-y: auto !important; }
          .lb-img-col { min-height: 200px !important; max-height: 40vw !important; }
        }
      `}</style>
      <motion.div initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#111', maxWidth: 980, width: '100%', position: 'relative' }}
        className="lb-grid">

        {/* Image */}
        <div className="lb-img-col" style={{ overflow: 'hidden', background: '#0d0d0d', minHeight: 420, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={a.image} alt={a.name}
            loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: a.useContain ? 'contain' : 'cover', objectPosition: a.imagePosition || 'center center', display: 'block' }}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.lb-ph')) {
                const ph = document.createElement('div');
                ph.className = 'lb-ph';
                ph.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;';
                ph.innerHTML = `<div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:64px;color:rgba(255,255,255,0.06);line-height:1;">❖</div><div style="font-family:'Source Sans Pro',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:rgba(255,255,255,0.15);">Image Coming Soon</div>`;
                parent.appendChild(ph);
              }
            }}
          />
          {/* Corner gradient to hide any AI watermarks */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '35%', height: '20%', background: 'linear-gradient(to top left, #0d0d0d 10%, transparent 70%)', pointerEvents: 'none' }} />
          {a.badge && <div style={{ position: 'absolute', top: 16, left: 16, background: a.accent, color: BLACK, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 12px' }}>{a.badge}</div>}
        </div>

        {/* Text */}
        <div style={{ padding: 'clamp(28px,4vw,52px)', display: 'flex', flexDirection: 'column', gap: 18, overflowY: 'auto' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.55)' }}><X size={15} /></button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 18, height: 1, background: a.accent }} />
            <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: a.accent }}>{a.concept}</span>
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>{a.name}</h2>

          <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{a.narrative}</p>

          {a.commissioned && a.commissionHint && (
            <div style={{ background: `${a.accent}0d`, border: `1px solid ${a.accent}28`, padding: '12px 16px' }}>
              <div style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: a.accent, marginBottom: 6 }}>Commission includes</div>
              <div style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{a.commissionHint}</div>
            </div>
          )}

          <div>
            <div style={{ fontFamily: "'Source Sans Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(20px,2.5vw,28px)', color: a.accent, letterSpacing: '-0.01em' }}>{displayPrice}</div>
            <div style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{a.priceNote}</div>
          </div>

          <button onClick={() => onCommission(a)}
            style={{ background: a.accent, color: BLACK, border: 'none', padding: '13px 26px', fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, width: 'fit-content', transition: 'opacity 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.82'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
            {a.commissioned ? 'Commission Your Story' : 'Order This Artifact'} <ArrowRight size={12} />
          </button>

          <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.2)', margin: 0, lineHeight: 1.65 }}>
            {a.commissioned
              ? 'Custom proposal within 24 hours. No payment until you approve the design direction.'
              : 'Order confirmed within 24 hours. Ships tracked to your door.'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── SMALL CARD (for the grid) ─────────────────────────────────────────────────

function ArtCard({ a, onClick }: { a: Artifact; onClick: () => void }) {
  const [h, setH] = useState(false);
  const { countryInfo } = useCountryPricing();
  const displayPrice = countryInfo ? formatArtPrice(a, countryInfo.symbol, countryInfo.countryCode) : a.price;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} viewport={{ once: true, margin: '-30px' }}
      onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ cursor: 'pointer', background: '#131313', border: `1px solid ${h ? `${a.accent}55` : 'rgba(255,255,255,0.07)'}`, display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.25s', transform: h ? 'translateY(-4px)' : 'none', overflow: 'hidden', borderTop: `2px solid ${a.accent}` }}>

      <div style={{ overflow: 'hidden', aspectRatio: '4/3', background: '#111', position: 'relative' }}>
        <img src={a.image} alt={a.name}
          loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: a.useContain ? 'contain' : 'cover', objectPosition: a.imagePosition || 'center center', display: 'block', transition: 'transform 0.4s ease', transform: h ? 'scale(1.04)' : 'none' }}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.art-placeholder')) {
              const ph = document.createElement('div');
              ph.className = 'art-placeholder';
              ph.style.cssText = `position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;`;
              ph.innerHTML = `<div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:28px;color:rgba(255,255,255,0.08);line-height:1;">❖</div><div style="font-family:'Source Sans Pro',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.15);">${a.concept}</div>`;
              parent.appendChild(ph);
            }
          }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '35%', height: '22%', background: 'linear-gradient(to top left, #111 10%, transparent 70%)', pointerEvents: 'none' }} />
        {a.badge && <div style={{ position: 'absolute', top: 10, left: 10, background: a.accent, color: BLACK, fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 9px' }}>{a.badge}</div>}
        {a.commissioned && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.65)', color: 'rgba(255,255,255,0.65)', fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '3px 8px' }}>Commission</div>}
      </div>

      <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 12, height: 1, background: a.accent }} />
          <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: a.accent }}>{a.concept}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.25, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{a.name}</h3>
        <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0, flex: 1 }}>{a.tagline}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(16px,1.8vw,22px)', color: a.accent }}>{displayPrice}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: a.accent, opacity: h ? 1 : 0.5, transition: 'opacity 0.2s' }}>
            {a.commissioned ? 'Commission' : 'View'} <ArrowUpRight size={10} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function merchPage() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<Artifact | null>(null);
  const [commissionTarget, setCommissionTarget] = useState<Artifact | null>(null);
  const [notionArtifacts, setNotionArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch Notion products and prepend to static fallback
    fetch('/api/products')
      .then(r => r.ok ? r.json() : { success: false })
      .then(data => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setNotionArtifacts(data.products);
        }
      })
      .catch(() => {});
    // Handle deep link from nav dropdown: /merch#product-id opens that product
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const target = ARTIFACTS.find(a => a.id === hash);
      if (target) {
        setTimeout(() => {
          setLightbox(target);
          const el = document.getElementById(`artifact-${hash}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      }
    }
  }, []);

  function openCommission(a: Artifact) {
    setLightbox(null);
    setCommissionTarget(a);
  }

  // Notion products take precedence; static ARTIFACTS fill the rest
  const notionIds = new Set(notionArtifacts.map(a => a.id));
  const grid = notionArtifacts.length > 0
    ? [...notionArtifacts, ...ARTIFACTS.filter(a => !notionIds.has(a.id))]
    : ARTIFACTS;

  return (
    <>
      <Helmet>
        <title>The Artifact Studio | NicheUX | Commission Your Story</title>
        <meta name="description" content="NicheUX Artifact Studio. Illustrated frames, mugs, apparel, and bespoke books, each one commissioned from a story. We don't sell products. We make memories you can hold." />
      </Helmet>

      <AnimatePresence>
        {lightbox && <Lightbox a={lightbox} onClose={() => setLightbox(null)} onCommission={openCommission} />}
        {commissionTarget && <CommissionModal a={commissionTarget} onClose={() => setCommissionTarget(null)} />}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '90vh', background: BLACK, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', position: 'relative' }} className="hero-split">
        <style>{`.hero-split{@media(max-width:768px){grid-template-columns:1fr!important}}`}</style>

        {/* Left: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(100px,10vw,140px) clamp(28px,5.5vw,88px) clamp(56px,6vw,80px)', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 22, height: 1, background: GOLD }} />
            <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD }}>The Artifact Studio</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(48px,7vw,96px)', lineHeight: 0.95, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 32px' }}>
            We make<br />
            memories<br />
            <em style={{ color: GOLD }}>you can hold.</em>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
            style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 'clamp(14px,1.3vw,17px)', lineHeight: 1.88, color: 'rgba(255,255,255,0.5)', maxWidth: 440, marginBottom: 40 }}>
            Every artifact starts with a story. A quote that anchored you. A photo that holds weight. A name that belongs to one person. We translate those into something permanent and beautiful.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', background: GOLD, color: BLACK, border: 'none', padding: '14px 32px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = LAVENDER; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = BLACK; }}>
              See the Artifacts <ArrowRight size={12} />
            </button>
            <button onClick={() => navigate('/contact?selection=Something%20Else&source=Artifact%20Studio%3A%20Custom%20Brief&hint=I%27d%20like%20to%20commission%20a%20custom%20artifact%20')}
              style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.18)', padding: '14px 24px', cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = LAVENDER; b.style.color = LAVENDER; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.18)'; b.style.color = 'rgba(255,255,255,0.5)'; }}>
              Share a Narrative
            </button>
          </motion.div>

          {/* trust strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', gap: 28, marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap' }}>
            {[
              { val: '100%', label: 'Made to order' },
              { val: '24h', label: 'Proposal turnaround' },
              { val: 'Free', label: 'Design consultation' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(20px,2vw,26px)', color: GOLD, letterSpacing: '-0.02em' }}>{s.val}</span>
                <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: editorial image grid */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0d0d0d', display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2 }} className="hero-col-r">
          <style>{`.hero-col-r{@media(max-width:768px){display:none!important}}`}</style>
          {/* Top slot — My Design Story book */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 0.4 }}
            style={{ overflow: 'hidden', position: 'relative', background: '#111' }}>
            <img src="/images/childrens-story-book--world-builder-legacy.webp" alt="My Design Story illustrated book" loading="lazy" decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
            <div style={{ position: 'absolute', top: 16, left: 16, background: GOLD, color: BLACK, fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px' }}>Bestseller</div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #0d0d0d)', pointerEvents: 'none' }} />
          </motion.div>
          {/* Bottom slot — illustrated quote frame hero piece */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 0.6 }}
            style={{ overflow: 'hidden', position: 'relative', background: '#0a0a0a' }}>
            <img src="/images/illustrated-quote-frame--anchored-memory.webp" alt="Illustrated quote frame, anchored memory" loading="lazy" decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
            <div style={{ position: 'absolute', top: 16, left: 16, background: GOLD, color: BLACK, fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px' }}>Commission</div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, transparent 60%, #0a0a0a)', pointerEvents: 'none' }} />
          </motion.div>
          {/* Centre accent line */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: 2, background: `linear-gradient(to right, transparent, ${GOLD}80, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        </div>
      </section>

      {/* ── MANIFESTO STRIP — parchment ──────────────────────────────────────── */}
      <section style={{ background: PARCHMENT, borderTop: '1px solid rgba(26,26,26,0.08)', borderBottom: '1px solid rgba(26,26,26,0.08)', padding: 'clamp(40px,5vw,64px) clamp(28px,5.5vw,88px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(24px,4vw,64px)', alignItems: 'center' }} className="manifesto-g">
          <style>{`.manifesto-g{@media(max-width:680px){grid-template-columns:1fr!important}}`}</style>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: GOLD }}>Our Philosophy</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: INK }}>
              Not products.<br /><em style={{ color: GOLD }}>Artifacts.</em>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(20px,3vw,40px)' }} className="manifesto-inner">
            <style>{`.manifesto-inner{@media(max-width:540px){grid-template-columns:1fr!important}}`}</style>
            {[
              { label: 'Commission, not checkout', body: 'There is no merchping cart. You share the story, we send a custom proposal within 24 hours. Payment follows approval, never before.' },
              { label: 'Made for one person', body: 'Every commissioned artifact is built specifically for the person who sent the brief. Not a variation of something standard. Something that could only belong to them.' },
              { label: 'Design you can trust', body: 'Six designers. Four years of client commissions. Our work ships to families and businesses across the UK, Ireland, Canada, and Malaysia.' },
            ].map(p => (
              <div key={p.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(15px,1.4vw,18px)', color: INK, margin: 0, lineHeight: 1.3 }}>{p.label}</h4>
                <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 13, color: INK_SOFT, lineHeight: 1.75, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL COLLECTION — dark ──────────────────────────────────────────── */}
      <section id="collection" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px,7vw,88px) clamp(28px,5.5vw,88px)' }}>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 'clamp(36px,4.5vw,52px)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 20, height: 1, background: GOLD }} />
                <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: GOLD }}>The Full Collection</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff', margin: 0 }}>
                Every artifact. <em style={{ color: GOLD }}>Every story.</em>
              </h2>
            </div>
            <button onClick={() => navigate('/contact?source=Artifact%20Studio%3A%20Custom%20Brief')}
              style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: GOLD, color: BLACK, border: 'none', padding: '12px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', transition: 'background 0.2s' }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = LAVENDER; b.style.color = '#fff'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = GOLD; b.style.color = BLACK; }}>
              Commission something custom <ArrowRight size={11} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3 }} className="coll-grid">
            <style>{`
              @media(max-width:1024px){.coll-grid{grid-template-columns:repeat(3,1fr)!important}}
              @media(max-width:720px){.coll-grid{grid-template-columns:repeat(2,1fr)!important}}
              @media(max-width:480px){.coll-grid{grid-template-columns:1fr!important}}
            `}</style>
            {grid.map(a => (
              <div key={a.id} id={`artifact-${a.id}`}>
                <ArtCard a={a} onClick={() => setLightbox(a)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW THE COMMISSION WORKS — dark ─────────────────────────────────── */}
      <section style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(64px,8vw,108px) clamp(28px,5.5vw,88px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }} className="process-g">
            <style>{`.process-g{@media(max-width:720px){grid-template-columns:1fr!important}}`}</style>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 20, height: 1, background: GOLD }} />
                <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: `${GOLD}70` }}>The Commission</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,52px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff', margin: '0 0 20px' }}>
                How it works.
              </h2>
              <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.85, margin: 0 }}>
                We have designed for families, businesses, and individuals across four countries. Every commission follows the same three steps.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(20px,3vw,40px)' }} className="steps-g">
              <style>{`.steps-g{@media(max-width:600px){grid-template-columns:1fr!important}}`}</style>
              {[
                { num: '01', accent: GOLD, title: 'Commission Your Story', body: 'Select an artifact and use "Commission Your Story" or "Start the Design Process". Tell us the memory, feeling, or history you want illustrated. We review within 24 hours.' },
                { num: '02', accent: LAVENDER, title: 'The Design Process', body: 'We translate your experience into visual form. You approve the creative direction before production begins. No payment until you confirm the vision is right.' },
                { num: '03', accent: BLUE, title: 'The Final Artifact', body: 'We craft the artifact and track your piece until it is in your hands. Framed prints, bound books, printed apparel. Every commission handled with the same care.' },
              ].map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }} viewport={{ once: true }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(32px,3.5vw,48px)', color: `${s.accent}35`, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</div>
                  <div style={{ width: 20, height: 1, background: s.accent }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(16px,1.6vw,20px)', color: '#fff', margin: 0, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.44)', lineHeight: 1.8, margin: 0 }}>{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST / WHY US — parchment ───────────────────────────────────────── */}
      <section style={{ background: PARCHMENT, borderTop: '1px solid rgba(26,26,26,0.08)', padding: 'clamp(56px,7vw,88px) clamp(28px,5.5vw,88px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{ width: 20, height: 1, background: GOLD }} />
            <span style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: GOLD }}>Why Commission From NicheUX</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(16px,3vw,40px)' }} className="why-g">
            <style>{`.why-g{@media(max-width:768px){grid-template-columns:repeat(2,1fr)!important}} @media(max-width:460px){.why-g{grid-template-columns:1fr!important}}`}</style>
            {[
              { icon: '❖', title: 'Six designers', body: 'A full studio behind every commission: illustration, typography, print, motion, web, brand.' },
              { icon: '❖', title: '4 years of client work', body: 'We have built identities for businesses across the UK, Ireland, Canada, and Malaysia.' },
              { icon: '❖', title: 'No payment before approval', body: 'You approve the creative direction first. Payment follows confirmation, never the other way.' },
              { icon: '❖', title: 'Production-ready files', body: 'Every file is built to print specification. Bleeds, CMYK, correct resolution. No reprints.' },
            ].map(w => (
              <div key={w.title} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: GOLD, lineHeight: 1 }}>{w.icon}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(15px,1.4vw,18px)', color: INK, margin: 0, lineHeight: 1.3 }}>{w.title}</h4>
                <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 13, color: INK_SOFT, lineHeight: 1.75, margin: 0 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — dark ───────────────────────────────────────────────────────── */}
      <section style={{ background: BLACK, borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(72px,9vw,120px) clamp(28px,5.5vw,88px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 28px' }}>
              Every artifact begins<br />with a <em style={{ color: GOLD }}>narrative.</em>
            </h2>
            <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.88, color: 'rgba(255,255,255,0.48)', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
              Tell us the memory, feeling, or history you want us to illustrate. Do not worry about what is possible or what it will cost. Just tell us the story. We will take it from here.
            </p>
            <button onClick={() => navigate('/contact?source=Artifact%20Studio%3A%20Commission%20Brief')}
              style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', background: GOLD, color: BLACK, border: 'none', padding: '16px 44px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.2s' }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = LAVENDER; b.style.color = '#fff'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = GOLD; b.style.color = BLACK; }}>
              Share the Narrative <ArrowRight size={12} />
            </button>
            <p style={{ fontFamily: "'Source Sans Pro',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.22)', marginTop: 20 }}>
              Custom proposal within 24 hours. No commitment required.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
