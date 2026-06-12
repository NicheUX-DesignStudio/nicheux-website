import { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, Phone, MapPin, ChevronDown, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { submitToNotion } from '@/services/notionService';
import { useCountryPricing } from '@/hooks/useCountryPricing';

const GOLD     = '#E9C672';
const LAVENDER = '#B097BE';
const BLUE     = '#89B1CC';
const BLACK    = '#131313';
const PARCHMENT= '#F1E9D2';
const INK      = '#1A1A1A';
const INK_SOFT = '#5a5248';
const EASE     = [0.25, 0.46, 0.45, 0.94] as const;

// ── FULL SERVICE TREE ─────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'strategy',
    label: 'Strategy & Design',
    accent: LAVENDER,
    path: '/strategy-design',
    items: [
      'UX Audit & Strategy',
      'Complete UI/UX Design',
      'Design System',
      'UI/UX Consultation (free)',
    ],
  },
  {
    id: 'web',
    label: 'Web Development & E-Commerce',
    accent: BLUE,
    path: '/web-development-ecommerce',
    items: [
      'Hand-Built Website',
      'Custom Shopify Store',
      'Enterprise Solutions',
      'Essential Care (from £100/month)',
      'Professional Care (from £220/month)',
      'Enterprise Care (from £450/month)',
      'Web Development Consultation (free)',
    ],
  },
  {
    id: 'print',
    label: 'Print & Brand Design',
    accent: GOLD,
    path: '/print-brand-design',
    groups: [
      { heading: 'Brand Identity', items: ['Logo Design', 'Basic Brand Kit', 'Complete Brand Identity', 'Brand Guidelines Document', 'Starter Brand Kit', 'Complete Brand Launch', 'Marketing Pro Package'] },
      { heading: 'Brochures & Print', items: ['4-page Brochure', '8-page Brochure', '12-page Catalogue', '16-page Catalogue', 'Custom Folds', 'Single-sided Flyer', 'Double-sided Flyer', 'Poster (up to A2)'] },
      { heading: 'Stationery', items: ['Business Cards', 'Letterhead + Envelope', 'Presentation Folder', 'Complete Stationery Suite', 'Presentation Design'] },
      { heading: 'Signage & Displays', items: ['Pull-up Banner', 'Retail Store Banner', 'Window Graphics', 'Billboard Design'] },
      { heading: 'Menus', items: ['Menu (4 pages)', 'Drinks Menu', 'Specials Board', 'Takeaway Menu'] },
      { heading: 'Digital', items: ['Social Media Kit', 'Email Template', 'Web Banners'] },
    ],
  },
  {
    id: 'social',
    label: 'Social Media Marketing',
    accent: LAVENDER,
    path: '/social-media-marketing',
    items: [
      'Social Media Starter Plan (from £450/month)',
      'Social Media Professional Plan (from £900/month)',
      'Social Media Enterprise Plan (from £2,000/month)',
      'Social Media Consultation (free)',
    ],
  },
  {
    id: 'motion',
    label: 'Motion Design & AI Visuals',
    accent: GOLD,
    path: '/motion-design-ai-visuals',
    groups: [
      { heading: 'Motion Graphics', items: ['30s Explainer Video', 'Logo Animation', 'Social Media Video Pack', 'Character Animation'] },
      { heading: 'AI Video', items: ['AI Video Generation', 'AI Style Transfer', 'Rapid Concept Testing', 'AI Content Expansion'] },
      { heading: 'Packages', items: ['Motion Excellence', 'AI Innovation Suite', 'Creative Power Duo', 'Starter Creative Suite', 'Pro Creative Powerhouse'] },
    ],
  },
  {
    id: 'illustration',
    label: 'Illustration & Character Design',
    accent: BLUE,
    path: '/illustration-character-design',
    groups: [
      { heading: 'Character Design', items: ['Single Character Design', 'Character Turnaround Sheet', 'Character Expression Sheet', 'Character Series (3 characters)', 'Character Style Guide', 'Character Portrait'] },
      { heading: 'Books & Editorial', items: ["Children's Book Package", 'Book Cover Illustration', 'Editorial Illustration', "Children's Book Page", 'Digital Painting'] },
      { heading: 'Commercial & Comics', items: ['Comic Strip Page', 'Storyboard Page (6 panels)', 'Commercial Sequence', 'Keyframe Art', 'Pre-visualization Set'] },
      { heading: 'Games & Concept', items: ['Game Character Package', 'Game Asset Concept', 'Environment Concept', 'Prop Design', 'Mood Board Creation'] },
    ],
  },
];

const ALL_ITEMS = CATEGORIES.flatMap(c =>
  'items' in c ? c.items : c.groups!.flatMap(g => g.items)
);

const TIMELINES = ['As soon as possible', 'Within a month', 'In 2 to 3 months', 'Just exploring for now'];
const SOURCES   = ['Google Search', 'Social Media', 'Referral', 'Previous client', 'Other'];
const CC_OPTIONS = ['+44 🇬🇧', '+1 🇺🇸', '+353 🇮🇪', '+91 🇮🇳', '+60 🇲🇾', '+65 🇸🇬', '+971 🇦🇪', '+61 🇦🇺', '+49 🇩🇪', '+33 🇫🇷', '+92 🇵🇰', '+94 🇱🇰'];

interface Form { name: string; email: string; phone: string; message: string; timeline: string; source: string; }

const CART_KEY = 'nicheux_brief_cart';

export default function ContactPage() {
  const [selected, setSelected]         = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
  });
  const [open, setOpen]                 = useState<string[]>([]);
  const [form, setForm]                 = useState<Form>({ name: '', email: '', phone: '', message: '', timeline: '', source: '' });
  const [submitting, setSubmitting]     = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const { countryInfo } = useCountryPricing();

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(selected)); } catch {}
  }, [selected]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    const sel = params.get('selection');
    if (sel) {
      const dec = decodeURIComponent(sel);
      if (ALL_ITEMS.includes(dec)) {
        // ADD to existing cart, don't replace
        setSelected(prev => prev.includes(dec) ? prev : [...prev, dec]);
        const cat = CATEGORIES.find(c =>
          ('items' in c ? c.items : c.groups!.flatMap(g => g.items)).includes(dec)
        );
        if (cat) setOpen([cat.id]);
      } else {
        const cat = CATEGORIES.find(c => c.label === dec || c.id === dec);
        if (cat) setOpen([cat.id]);
      }
      // "Something Else" param or unrecognised selection → auto-add Something Else
      if (dec === 'Something Else') {
        setSelected(prev => prev.includes('Something Else') ? prev : [...prev, 'Something Else']);
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
    const src = params.get('source');
    if (src) setForm(f => ({ ...f, source: decodeURIComponent(src) }));
    const hint = params.get('hint');
    if (hint) setForm(f => ({ ...f, message: f.message ? f.message : decodeURIComponent(hint) }));
  }, []);

  const toggle = (item: string) =>
    setSelected(s => s.includes(item) ? s.filter(x => x !== item) : [...s, item]);

  const toggleOpen = (id: string) =>
    setOpen(o => o.includes(id) ? o.filter(x => x !== id) : [...o, id]);

  const set = (field: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please add your name and email so we can reply.');
      return;
    }
    setSubmitting(true); setError(null);
    try {
      const result = await submitToNotion({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: '',
        timeline: form.timeline,
        source: form.source,
        message: form.message,
        services: selected.length ? selected : ['Not specified'],
        country: countryInfo?.countryName || 'Unknown',
        currency: countryInfo?.symbol || '£',
      });
      if (result.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', message: '', timeline: '', source: '' });
        setSelected([]); setOpen([]);
        try { localStorage.removeItem(CART_KEY); } catch {}
      } else throw new Error(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Email us directly at hellonicheux@gmail.com.');
    } finally { setSubmitting(false); }
  };

  const inp: React.CSSProperties = { fontFamily: "'Source Sans Pro', sans-serif", fontSize: 16, color: INK, background: '#fff', border: '1.5px solid rgba(26,26,26,0.15)', padding: '14px 18px', width: '100%', outline: 'none', lineHeight: 1.5, boxSizing: 'border-box', transition: 'border-color 0.2s' };
  const lbl: React.CSSProperties = { fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: INK_SOFT, marginBottom: 8, display: 'block' };

  return (
    <div style={{ background: PARCHMENT, minHeight: '100vh' }}>
      <style>{`
        .c-inp:focus { border-color: ${LAVENDER} !important; }
        @media(max-width:900px){ .c-grid{grid-template-columns:1fr!important} .c-sticky{position:relative!important;top:auto!important} }
        @media(max-width:600px){ .c-two{grid-template-columns:1fr!important} }
        .svc-item { padding:7px 12px; border:1px solid rgba(26,26,26,0.14); cursor:pointer; fontFamily:"Source Sans Pro,sans-serif"; fontSize:12; background:rgba(255,255,255,0.5); transition:all 0.15s; }
        .svc-item:hover { background:rgba(255,255,255,0.9); }
      `}</style>

      <Helmet>
        <title>Start a Project | NicheUX</title>
        <meta name="description" content="Tell us what you need. Get a custom proposal within 24 hours." />
        <link rel="canonical" href="https://www.nicheux.com/contact" />
      </Helmet>

      {/* ── DARK HERO ── */}
      <section style={{ background: BLACK, padding: 'clamp(120px,14vw,180px) clamp(24px,5.5vw,88px) clamp(64px,7vw,96px)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '20%', right: '-5%', width: '45vw', height: '45vw', background: `radial-gradient(ellipse, ${LAVENDER}08 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} style={{ maxWidth: 840 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD }}>Start a Project</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(44px,7vw,108px)', lineHeight: 0.92, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 32px' }}>
            Build something<br />
            <em style={{ color: GOLD, fontStyle: 'italic' }}>worth talking about.</em>
          </h1>
          <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 'clamp(15px,1.4vw,19px)', lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', margin: '0 0 48px', maxWidth: 520 }}>
            Select your services, tell us what you need in a few sentences, and we come back with a real proposal within 24 hours.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { icon: Mail,  label: 'Email',    val: 'hellonicheux@gmail.com', href: 'mailto:hellonicheux@gmail.com', color: BLUE },
              { icon: Phone, label: 'WhatsApp', val: '+44 7342 736804',        href: 'https://wa.me/447342736804',   color: '#25D366' },
              { icon: MapPin,label: 'Based in', val: 'United Kingdom',         href: null,                           color: LAVENDER },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}18`, border: `1px solid ${item.color}30`, flexShrink: 0 }}><Icon size={15} style={{ color: item.color }} /></div>
                  <div>
                    <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>{item.label}</div>
                    {item.href ? <a href={item.href} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#fff', textDecoration: 'none' }}>{item.val}</a>
                      : <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{item.val}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── MAIN ── */}
      <div className="c-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', maxWidth: 1400, margin: '0 auto', alignItems: 'start' }}>

        {/* ── LEFT: Form ── */}
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{ padding: 'clamp(40px,5vw,72px) clamp(24px,4vw,56px)' }}>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20, padding: 'clamp(40px,5vw,64px) 0' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px,6vw,80px)', color: GOLD, lineHeight: 1 }}>❖</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,48px)', color: INK, margin: 0, lineHeight: 1.1 }}>Brief received.</h2>
                <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 16, lineHeight: 1.85, color: INK_SOFT, maxWidth: 440, margin: 0 }}>
                  We will come back with a real proposal within 24 hours. Check your inbox.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <CheckCircle size={18} style={{ color: '#4CAF50' }} />
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: INK_SOFT }}>No payment until work begins. No lock-in contracts.</span>
                </div>
                <button onClick={() => setSubmitted(false)}
                  style={{ marginTop: 20, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'none', border: `1px solid ${INK}30`, color: INK, padding: '12px 24px', cursor: 'pointer' }}>
                  Send another brief
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* Selected services cart */}
                <AnimatePresence>
                  {selected.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                      style={{ background: `${INK}06`, border: `1px solid ${GOLD}40`, borderLeft: `4px solid ${GOLD}`, padding: '20px 22px', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 22, color: GOLD }}>❖</span>
                          <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: INK }}>Your brief ({selected.length} {selected.length === 1 ? 'service' : 'services'})</span>
                        </div>
                        <button type="button" onClick={() => setSelected([])}
                          style={{ background: 'none', border: 'none', color: INK_SOFT, padding: '4px 8px', cursor: 'pointer', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          Clear all
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {selected.map(s => (
                          <button key={s} type="button" onClick={() => toggle(s)}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, background: GOLD, color: BLACK, border: 'none', padding: '6px 12px', cursor: 'pointer', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>
                            {s} <X size={10} />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Service accordion */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 14, height: 1, background: INK }} />
                    <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: INK_SOFT }}>What do you need? (pick as many as you like)</span>
                  </div>
                  <div style={{ border: `1px solid ${INK}12` }}>
                    {CATEGORIES.map((cat, ci) => {
                      const allItems = 'items' in cat ? cat.items : cat.groups!.flatMap(g => g.items);
                      const selectedCount = allItems.filter(i => selected.includes(i)).length;
                      const isOpen = open.includes(cat.id);
                      return (
                        <div key={cat.id} style={{ borderBottom: ci < CATEGORIES.length - 1 ? `1px solid ${INK}10` : undefined }}>
                          {/* Category header */}
                          <button type="button" onClick={() => toggleOpen(cat.id)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: isOpen ? `${cat.accent}08` : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', borderLeft: `3px solid ${selectedCount > 0 ? cat.accent : 'transparent'}`, transition: 'all 0.15s', textAlign: 'left' }}>
                            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, fontWeight: 700, color: selectedCount > 0 ? INK : INK_SOFT }}>
                              {cat.label}
                              {selectedCount > 0 && <span style={{ marginLeft: 8, background: cat.accent, color: BLACK, fontSize: 9, fontWeight: 700, padding: '2px 7px', letterSpacing: '0.1em' }}>{selectedCount}</span>}
                            </span>
                            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', color: cat.accent }}>
                              <ChevronDown size={15} />
                            </motion.span>
                          </button>

                          {/* Expanded content */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: EASE }}
                                style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.4)' }}>
                                <div style={{ padding: '12px 16px 16px' }}>
                                  {'items' in cat ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                      {cat.items.map(item => {
                                        const active = selected.includes(item);
                                        return (
                                          <button key={item} type="button" onClick={() => toggle(item)}
                                            style={{ padding: '6px 12px', background: active ? cat.accent : 'rgba(255,255,255,0.8)', color: active ? BLACK : INK_SOFT, border: `1px solid ${active ? cat.accent : `${INK}18`}`, cursor: 'pointer', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: active ? 700 : 400, transition: 'all 0.15s' }}>
                                            {item}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    cat.groups!.map(group => (
                                      <div key={group.heading} style={{ marginBottom: 12 }}>
                                        <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${INK}50`, marginBottom: 8 }}>{group.heading}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                          {group.items.map(item => {
                                            const active = selected.includes(item);
                                            return (
                                              <button key={item} type="button" onClick={() => toggle(item)}
                                                style={{ padding: '5px 11px', background: active ? cat.accent : 'rgba(255,255,255,0.8)', color: active ? BLACK : INK_SOFT, border: `1px solid ${active ? cat.accent : `${INK}18`}`, cursor: 'pointer', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: active ? 700 : 400, transition: 'all 0.15s' }}>
                                                {item}
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                    {/* Something else */}
                    <button type="button" onClick={() => toggle('Something Else')}
                      style={{ width: '100%', padding: '14px 16px', background: selected.includes('Something Else') ? `${GOLD}18` : 'rgba(255,255,255,0.35)', border: 'none', borderLeft: `3px solid ${selected.includes('Something Else') ? GOLD : 'transparent'}`, cursor: 'pointer', textAlign: 'left', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 600, color: INK_SOFT, transition: 'all 0.15s' }}>
                      Something Else, describe it in the message below
                    </button>
                  </div>
                </div>

                {/* Name + Email */}
                <div className="c-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={lbl}>Your Name *</label><input className="c-inp" name="name" required value={form.name} onChange={set('name')} placeholder="First and last name" style={inp} /></div>
                  <div><label style={lbl}>Email *</label><input className="c-inp" name="email" type="email" required value={form.email} onChange={set('email')} placeholder="your@email.com" style={inp} /></div>
                </div>

                {/* Phone with country code */}
                <div>
                  <label style={lbl}>Phone / WhatsApp <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span></label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <select className="c-inp" defaultValue="+44 🇬🇧"
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value.split(' ')[0] + ' ' + f.phone.replace(/^\+\d+\s?/, '') }))}
                      style={{ ...inp, width: 110, flexShrink: 0, cursor: 'pointer', appearance: 'none' as const }}>
                      {CC_OPTIONS.map(cc => <option key={cc} value={cc}>{cc}</option>)}
                    </select>
                    <input className="c-inp" name="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="7342 736804" style={{ ...inp, flex: 1 }} />
                  </div>
                </div>

                {/* Brief */}
                <div>
                  <label style={lbl}>Tell us about the project</label>
                  <textarea className="c-inp" name="message" value={form.message} onChange={set('message')} rows={5}
                    placeholder="What are you building, why does it matter, and who is it for? A few sentences is enough." style={{ ...inp, resize: 'vertical', lineHeight: 1.75 }} />
                </div>

                {/* Timeline + Source */}
                <div className="c-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={lbl}>Timeline</label>
                    <select className="c-inp" name="timeline" value={form.timeline} onChange={set('timeline')} style={{ ...inp, cursor: 'pointer', appearance: 'none' as const }}>
                      <option value="">Select timeline</option>
                      {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>How did you find us?</label>
                    <select className="c-inp" name="source" value={form.source} onChange={set('source')} style={{ ...inp, cursor: 'pointer', appearance: 'none' as const }}>
                      <option value="">Select one</option>
                      {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ background: '#fff0f0', border: '1px solid #f5c6cb', padding: '12px 16px', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#c0392b' }}>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div style={{ borderTop: `1px solid ${INK}12`, paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <motion.button type="submit" disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.01 }} whileTap={{ scale: submitting ? 1 : 0.98 }}
                    style={{ width: '100%', background: submitting ? `${GOLD}80` : GOLD, color: BLACK, border: 'none', padding: '18px 32px', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    {submitting ? 'Sending...' : (<>Send the Brief <ArrowRight size={14} /></>)}
                  </motion.button>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, color: 'rgba(26,26,26,0.4)', margin: 0, textAlign: 'center', lineHeight: 1.6 }}>
                    No payment until work begins. We respond within 24 hours.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── RIGHT: What happens next ── */}
        <motion.div className="c-sticky" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          style={{ position: 'sticky', top: 'clamp(80px,10vh,100px)', borderLeft: `1px solid ${INK}10`, padding: 'clamp(40px,5vw,72px) clamp(24px,4vw,56px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 18, height: 1, background: INK }} />
            <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: INK_SOFT }}>What happens next</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 48 }}>
            {[
              { n: 'I',   h: 'You send the brief',         b: 'Pick your services, tell us what you need in a few sentences.' },
              { n: 'II',  h: 'We respond within 24 hours', b: 'A real proposal with a clear price and a timeline. No vague estimates.' },
              { n: 'III', h: 'We get to work',              b: 'We begin and keep you involved. You see progress, not surprises.' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 20 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 22, color: GOLD, opacity: 0.7, flexShrink: 0, lineHeight: 1.2, paddingTop: 2 }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6 }}>{s.h}</div>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, lineHeight: 1.75, color: INK_SOFT }}>{s.b}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${INK}15`, paddingTop: 28 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(15px,1.3vw,18px)', lineHeight: 1.6, color: INK, margin: '0 0 20px' }}>
              "They made a website that didn't just look good. It made people feel something."
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['24h Quote Response', 'No Lock-in Contracts', '6 Design Disciplines'].map(t => (
                <span key={t} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK_SOFT, background: `${INK}08`, padding: '5px 12px', border: `1px solid ${INK}12` }}>{t}</span>
              ))}
            </div>
          </div>
          <a href="https://wa.me/447342736804?text=Hi%20NicheUX%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '13px 24px', fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 28 }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Message us on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
