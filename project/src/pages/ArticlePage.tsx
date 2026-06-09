import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { articles, type ArticleBlock } from '../data/articles';

const BLACK = '#0A0A0A';
const PARCHMENT = '#F1E9D2';
const INK = '#1a1a1a';

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(16px,1.4vw,18px)',
          lineHeight: 1.85,
          color: 'rgba(26,26,26,0.75)',
          margin: '0 0 1.5em 0',
        }}>
          {block.content}
        </p>
      );

    case 'heading':
      return (
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: 'clamp(24px,2.5vw,32px)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: INK,
          margin: '2.2em 0 0.6em 0',
        }}>
          {block.content}
        </h2>
      );

    case 'image':
      return (
        <figure style={{ margin: '2.5em 0', padding: 0 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(26,26,26,0.1)', background: 'rgba(26,26,26,0.03)' }}>
            <img
              src={block.src}
              alt={block.alt || ''}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1'; }}
            />
          </div>
          {block.caption && (
            <figcaption style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(26,26,26,0.5)',
              marginTop: 12,
              paddingLeft: 10,
              borderLeft: '2px solid rgba(233,198,114,0.5)',
            }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      return (
        <figure style={{ margin: '2.5em 0', padding: 0 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(26,26,26,0.1)', background: '#000', aspectRatio: '16/9' }}>
            <video
              src={block.src}
              controls
              style={{ width: '100%', height: '100%', display: 'block' }}
              aria-label={block.alt || block.caption || 'Article video'}
            />
          </div>
          {block.caption && (
            <figcaption style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: 'rgba(26,26,26,0.5)',
              marginTop: 12,
              paddingLeft: 10,
              borderLeft: '2px solid rgba(233,198,114,0.5)',
            }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote style={{
          margin: '2.5em 0',
          padding: '1.5em 2em',
          background: '#fff',
          borderLeft: '3px solid #E9C672',
          borderRadius: '0 8px 8px 0',
          boxShadow: '0 2px 20px rgba(26,26,26,0.06)',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(18px,2vw,22px)',
            lineHeight: 1.5,
            color: INK,
            margin: '0 0 0.6em 0',
          }}>
            "{block.content}"
          </p>
          {block.author && (
            <cite style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase' as const,
              color: '#E9C672',
              fontStyle: 'normal',
            }}>
              {block.author}
            </cite>
          )}
        </blockquote>
      );

    case 'list':
      return (
        <ul style={{ margin: '1.5em 0', padding: 0, listStyle: 'none' }}>
          {block.items?.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E9C672', flexShrink: 0, marginTop: 8 }} />
              <span style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(15px,1.3vw,17px)',
                lineHeight: 1.75,
                color: 'rgba(26,26,26,0.72)',
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case 'divider':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '3em 0' }}>
          <div style={{ height: 1, flex: 1, background: 'rgba(26,26,26,0.12)' }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, color: 'rgba(233,198,114,0.5)' }}>❦</span>
          <div style={{ height: 1, flex: 1, background: 'rgba(26,26,26,0.12)' }} />
        </div>
      );

    default:
      return null;
  }
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [notionBody, setNotionBody] = useState<ArticleBlock[] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Try to load article body from Notion CMS
    if (slug) {
      fetch(`/api/blog/${slug}`)
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(data => { if (data.body?.length) setNotionBody(data.body); })
        .catch(() => {});
    }
  }, [slug]);

  const article = articles.find(a => a.slug === slug);
  const idx = articles.findIndex(a => a.slug === slug);
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  const body = notionBody ?? article?.body ?? [];

  if (!article) {
    return (
      <div style={{ background: BLACK, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 32, color: 'rgba(255,255,255,0.4)' }}>Article not found.</p>
          <button onClick={() => navigate('/blog')} style={{ marginTop: 20, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E9C672', background: 'none', border: 'none', cursor: 'pointer' }}>
            Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | NicheUX Journal</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} | NicheUX`} />
        <meta property="og:description" content={article.excerpt} />
        {article.coverImage && <meta property="og:image" content={article.coverImage} />}
      </Helmet>

      <div style={{ background: BLACK, overflow: 'hidden' }}>

        {/* COVER. dark hero */}
        <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', paddingTop: 120, paddingBottom: 'clamp(48px,6vw,80px)' }}>
          {article.coverImage && (
            <div style={{ position: 'absolute', inset: 0 }}>
              <img
                src={article.coverImage}
                alt={article.coverAlt || article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.35 }}
                loading="eager"
              />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.55) 55%, rgba(10,8,6,0.2) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)', width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <button
                onClick={() => navigate('/blog')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#E9C672'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}
              >
                <ArrowLeft size={12} /> Journal
              </button>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>·</span>
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: article.accent }}>
                {article.category}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px,5vw,60px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff', margin: '0 0 20px 0' }}>
              {article.title}
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{article.date}</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{article.readTime} read</span>
            </motion.div>
          </div>
        </section>

        {/* ARTICLE BODY. parchment */}
        <section style={{ background: PARCHMENT, borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,48px)' }}>

            {/* Lede / excerpt */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(19px,2vw,24px)',
              lineHeight: 1.55,
              color: 'rgba(26,26,26,0.7)',
              borderLeft: `3px solid ${article.accent}`,
              paddingLeft: 20,
              margin: '0 0 2.5em 0',
            }}>
              {article.excerpt}
            </p>

            {/* Body blocks */}
            {body.map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0 }} viewport={{ once: true, margin: '-40px' }}>
                <Block block={block} />
              </motion.div>
            ))}

            {/* End mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '3em 0 0 0' }}>
              <div style={{ height: 1, flex: 1, background: 'rgba(26,26,26,0.12)' }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 18, color: 'rgba(233,198,114,0.6)' }}>❦</span>
              <div style={{ height: 1, flex: 1, background: 'rgba(26,26,26,0.12)' }} />
            </div>
          </div>
        </section>

        {/* PREV / NEXT navigation. dark */}
        <section style={{ background: BLACK, borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(40px,5vw,64px) clamp(24px,5vw,48px)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
            {prev ? (
              <button onClick={() => navigate(`/blog/${prev.slug}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <ArrowLeft size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Previous</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(16px,1.6vw,20px)', color: '#fff', lineHeight: 1.2, maxWidth: 300, margin: 0 }}>{prev.title}</p>
              </button>
            ) : <div />}

            {next && (
              <button onClick={() => navigate(`/blog/${next.slug}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', padding: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Next</span>
                  <ArrowRight size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(16px,1.6vw,20px)', color: '#fff', lineHeight: 1.2, maxWidth: 300, margin: 0 }}>{next.title}</p>
              </button>
            )}
          </div>

          <div style={{ maxWidth: 800, margin: '40px auto 0', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <button onClick={() => navigate('/blog')} style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#E9C672'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.35)'; }}>
              Back to Journal
            </button>
          </div>
        </section>

      </div>
    </>
  );
}
