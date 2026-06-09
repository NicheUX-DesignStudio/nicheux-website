// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef, useState, lazy, Suspense, Component } from 'react';
import type { ReactNode } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X } from 'lucide-react';

// Always-loaded: shell components needed on every page
import Navigation from './components/ui/Navigation';
import Footer from './components/ui/Footer';
import AnnouncementStrip from './components/ui/AnnouncementStrip';
import StagePresence from './components/ui/StagePresence';

// Lazy-loaded pages — each becomes its own JS chunk
const HomePage                       = lazy(() => import('./pages/HomePage'));
const MerchPage                      = lazy(() => import('./pages/MerchPage'));
const BlogPage                       = lazy(() => import('./pages/BlogPage'));
const ArticlePage                    = lazy(() => import('./pages/ArticlePage'));
const GalleryPage                    = lazy(() => import('./pages/GalleryPage'));
const ServicesPage                   = lazy(() => import('./pages/ServicesPage'));
const StrategyAndDesignPage          = lazy(() => import('./pages/StrategyAndDesignPage'));
const WebDevelopmentAndECommercePage = lazy(() => import('./pages/WebDevelopmentAndECommercePage'));
const PrintAndBrandDesignPage        = lazy(() => import('./pages/PrintAndBrandDesignPage'));
const SocialMediaMarketingPage       = lazy(() => import('./pages/SocialMediaMarketingPage'));
const MotionDesignAIVisualsPage      = lazy(() => import('./pages/MotionDesignAIVisualsPage'));
const IllustrationCharacterDesignPage = lazy(() => import('./pages/IllustrationCharacterDesignPage'));
const FeaturedWork                   = lazy(() => import('./pages/FeaturedWork'));
const AboutPage                      = lazy(() => import('./pages/AboutPage'));
const ContactPage                    = lazy(() => import('./pages/ContactPage'));
const NotFoundPage                   = lazy(() => import('./pages/NotFoundPage'));
const TermsOfServicePage             = lazy(() => import('./pages/TermsOfServicePage'));
const PrivacyPolicyPage              = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiesPolicyPage              = lazy(() => import('./pages/CookiesPolicyPage'));

const BloomAndBrewPage        = lazy(() => import('./components/FeaturedWorks/Web Development & E-Commerce/BloomAndBrewPage'));
const Posters                 = lazy(() => import('./components/FeaturedWorks/Print and Brand Design/Posters'));
const AICanvasPage            = lazy(() => import('./components/FeaturedWorks/MotionDesignAIVisuals/AICanvas'));
const ConceptualAnatomyPage   = lazy(() => import('./components/FeaturedWorks/Illustration And Character Design/ConceptualAnatomy'));
const ComicPage               = lazy(() => import('./components/FeaturedWorks/Illustration And Character Design/Comic'));
const NandhiniDCPage          = lazy(() => import('./components/FeaturedWorks/WebDevelopment/NandhiniDCPage'));
const KishorePortfolioPage    = lazy(() => import('./components/FeaturedWorks/WebDevelopment/KishorePortfolioPage'));
const SoorajLinkedInPage      = lazy(() => import('./components/FeaturedWorks/SocialMedia/SoorajLinkedInPage'));
const SoorajWantedCarouselPage = lazy(() => import('./components/FeaturedWorks/SocialMedia/SoorajWantedCarouselPage'));
const SoorajCandyShopPage     = lazy(() => import('./components/FeaturedWorks/SocialMedia/SoorajCandyShopPage'));
const SSJCTournamentPage      = lazy(() => import('./components/FeaturedWorks/PrintBrand/SSJCTournamentPage'));
const MidasPage               = lazy(() => import('./components/FeaturedWorks/MotionDesignAIVisuals/MidasPage'));
const LondonTubeReelPage      = lazy(() => import('./components/FeaturedWorks/MotionDesignAIVisuals/LondonTubeReelPage'));

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ position: 'fixed', inset: 0, background: '#131313', color: '#fff', padding: 40, fontFamily: 'monospace', zIndex: 99999, overflow: 'auto' }}>
          <div style={{ color: '#E9C672', fontSize: 20, marginBottom: 16 }}>NicheUX — Runtime Error (contact dev)</div>
          <div style={{ color: '#ff6b6b', fontSize: 14, marginBottom: 12 }}>{String(err)}</div>
          <pre style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, whiteSpace: 'pre-wrap' }}>{err.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const GOLD    = "#E9C672";
const LAVENDER = "#B097BE";
const EASE    = [0.25, 0.46, 0.45, 0.94] as const;
const WA_HREF = 'https://wa.me/447342736804?text=Hi%20NicheUX%2C%20I%27d%20like%20to%20discuss%20a%20project.';

const NICHEUX_SONG = { title: "NicheUX Original", artist: "NicheUX Studio", src: "/videos/nicheuxsong.mpeg" };

function WhatsAppFloat() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9001,
        width: 52,
        height: 52,
        background: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.55)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)'; }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

// ── Global NowPlaying pill — draggable on desktop and mobile ─────────────────
function NowPlayingWidget({
  isPlaying, onToggle, onDismiss, dragRef,
}: {
  isPlaying: boolean;
  onToggle: () => void;
  onDismiss: () => void;
  dragRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const song = NICHEUX_SONG;
  return (
    <motion.div
      drag
      dragConstraints={dragRef}
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      style={{
        position: "absolute",
        bottom: 96,
        left: "calc(50% - 175px)",
        pointerEvents: "auto",
        touchAction: "none",
        cursor: "grab",
        userSelect: "none",
        background: "rgba(10,10,10,0.94)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid rgba(235,199,115,0.22)`,
        padding: "10px 14px 10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
        maxWidth: "calc(100vw - 24px)",
        minWidth: 0,
      }}
    >
      {/* Equaliser bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16, flexShrink: 0 }}>
        {[5, 10, 7, 13, 8].map((h, i) => (
          <motion.div
            key={i}
            animate={isPlaying ? { height: [h, h * 1.5, h * 0.7, h] } : { height: 3 }}
            transition={{ duration: 0.9, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 2, background: GOLD, borderRadius: 1 }}
          />
        ))}
      </div>

      {/* Track info */}
      <div style={{ minWidth: 0, overflow: "hidden" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 14, color: "#fff", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {song.title}
        </div>
        <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: `${GOLD}80`, marginTop: 2 }}>
          {song.artist} · {isPlaying ? "Now Playing" : "Paused"}
        </div>
      </div>

      {/* Play / Pause */}
      <button
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        style={{
          background: `${GOLD}18`,
          border: `1px solid ${GOLD}50`,
          cursor: "pointer",
          color: GOLD,
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
          marginLeft: 4,
        }}
      >
        {isPlaying ? <Pause size={12} fill={GOLD} /> : <Play size={12} fill={GOLD} />}
      </button>

      {/* Close */}
      <button
        onClick={onDismiss}
        aria-label="Close"
        style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4, display: "flex", flexShrink: 0 }}
      >
        <X size={12} />
      </button>
    </motion.div>
  );
}

// ── Inner app — lives inside Router so useLocation works ─────────────────────
function AppContent() {
  const { pathname } = useLocation();

  // Scroll to top on navigation — disable browser scroll restoration so it doesn't fight us
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // iOS Safari
  }, [pathname]);

  // Global music state — persists across page navigation
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [dismissed, setDismissed]           = useState(false);
  const audioRef                            = useRef<HTMLAudioElement | null>(null);
  const musicTriggeredRef                   = useRef(false);
  const musicDragRef                        = useRef<HTMLDivElement>(null);
  const pausedByHomepageRef                 = useRef(false);

  function getAudio() {
    if (!audioRef.current) {
      const audio = new Audio(NICHEUX_SONG.src);
      audio.loop = true;
      audioRef.current = audio;
    }
    return audioRef.current;
  }

  function startPlaying() {
    getAudio().play().catch(() => {});
    setIsPlaying(true);
  }

  function stopPlaying() {
    audioRef.current?.pause();
    setIsPlaying(false);
  }

  // Start music the moment user clicks About in nav (user gesture required for audio autoplay).
  useEffect(() => {
    const handler = () => {
      if (!musicTriggeredRef.current && !dismissed) {
        musicTriggeredRef.current = true;
        setShowNowPlaying(true);
        startPlaying();
      }
    };
    document.addEventListener('nicheux:about-click', handler);
    return () => document.removeEventListener('nicheux:about-click', handler);
  }, [dismissed]);

  // Pause music on homepage (hero video plays with sound). Resume when leaving.
  useEffect(() => {
    if (pathname === '/') {
      if (isPlaying) {
        stopPlaying();
        pausedByHomepageRef.current = true;
      }
    } else {
      if (pausedByHomepageRef.current && showNowPlaying && !dismissed) {
        pausedByHomepageRef.current = false;
        startPlaying();
      }
    }
  }, [pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      stopPlaying();
      pausedByHomepageRef.current = false;
    } else {
      pausedByHomepageRef.current = false;
      startPlaying();
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowNowPlaying(false);
    stopPlaying();
    audioRef.current = null;
  };

  return (
    <div className="App">
      <Helmet>
        <meta name="google-site-verification" content="google9b1d4245b2b7f92d" />
      </Helmet>

      <a href="#main-content" style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }} onFocus={e => { e.currentTarget.style.cssText = "position:fixed;top:0;left:0;padding:12px 24px;background:#EBC773;color:#131313;z-index:99999;font-family:'Source Sans Pro',sans-serif;font-weight:700;font-size:14px;"; }} onBlur={e => { e.currentTarget.style.cssText = "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;"; }}>Skip to main content</a>
      <AnnouncementStrip />
      <Navigation />
      {pathname === "/" && <StagePresence />}

      <div id="main-content">
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/strategy-design" element={<StrategyAndDesignPage />} />
          <Route path="/web-development-ecommerce" element={<WebDevelopmentAndECommercePage />} />
          <Route path="/print-brand-design" element={<PrintAndBrandDesignPage />} />
          <Route path="/social-media-marketing" element={<SocialMediaMarketingPage />} />
          <Route path="/motion-design-ai-visuals" element={<MotionDesignAIVisualsPage />} />
          <Route path="/illustration-character-design" element={<IllustrationCharacterDesignPage />} />

          <Route path="/featured-work" element={<FeaturedWork />} />
          <Route path="/featured-work/bloom-brew" element={<BloomAndBrewPage />} />
          <Route path="/featured-work/visual-communication" element={<Posters />} />
          <Route path="/featured-work/conceptual-art" element={<ConceptualAnatomyPage />} />
          <Route path="/featured-work/sequential-art" element={<ComicPage />} />
          <Route path="/featured-work/ai-canvas" element={<AICanvasPage />} />
          <Route path="/featured-work/nandhinidc" element={<NandhiniDCPage />} />
          <Route path="/featured-work/kishore-portfolio" element={<KishorePortfolioPage />} />
          <Route path="/featured-work/sooraj-linkedin" element={<SoorajLinkedInPage />} />
          <Route path="/featured-work/sooraj-wanted" element={<SoorajWantedCarouselPage />} />
          <Route path="/featured-work/sooraj-candy-shop" element={<SoorajCandyShopPage />} />
          <Route path="/featured-work/ssjc-tournament" element={<SSJCTournamentPage />} />
          <Route path="/featured-work/midas" element={<MidasPage />} />
          <Route path="/featured-work/london-tube-reel" element={<LondonTubeReelPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<MerchPage />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/gallery" element={<GalleryPage />} />

          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/cookies" element={<CookiesPolicyPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </div>

      <Footer />
      <WhatsAppFloat />

      {/* Global NowPlaying widget — fixed full-screen container is the drag boundary */}
      <div ref={musicDragRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10001 }}>
        <AnimatePresence>
          {showNowPlaying && !dismissed && (
            <NowPlayingWidget
              isPlaying={isPlaying}
              onToggle={handleToggle}
              onDismiss={handleDismiss}
              dragRef={musicDragRef}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
