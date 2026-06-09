"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialForm from "./TestimonialForm";
import { GOLD, PARCHMENT, INK, INK_SOFT, INK_MUTED, LAVENDER } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TESTIMONIALS = [
  {
    name: "Aishwarya",
    role: "Founder, Bloom & Brew Coffee Company",
    quote: "Honestly one of the best companies to work with! They have helped me so much with the brand development and my website. Thank you so much NicheUX!",
    source: "Google Review",
  },
  {
    name: "Kishore Aravind",
    role: "Performance Coach & Designer, Malaysia",
    quote: "Working with this company was a great experience from start to finish. They were incredibly quick in understanding the concept and turning simple discussions into clear, creative execution. What stood out the most was how effortlessly they grasped the idea and brought in innovative tech-driven suggestions that elevated the entire project. Revisions were handled immediately and professionally. If you're looking for a team that truly understands your vision and executes it with creativity and precision, this company absolutely delivers.",
    source: "Google Review",
  },
  {
    name: "Nandhini Design Constructions",
    role: "Architecture Studio, Marakkanam, India",
    quote: "Thevaki and the team at NicheUX did an exceptional job in bringing our dream website to life. She delivered everything on time with great professionalism and attention to detail. The final outcome exceeded our expectations, and our entire team was truly impressed with the presentation and quality of work. Highly recommended for anyone looking for creative, reliable, and professional web solutions.",
    source: "Google Review",
  },
  {
    name: "Sooraj Nikam",
    role: "Data & AI Graduate, Ireland",
    quote: "100% satisfied with outcome. Highly recommended.",
    source: "Google Review",
  },
];

const PER_PAGE = 3;

function ReviewClipping({ t, index, inView }: { t: any; index: number; inView: boolean }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: EASE }}
      style={{
        margin: 0,
        padding: "clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 36px)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        height: "100%",
        backgroundColor: PARCHMENT,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        paddingBottom: 14,
        borderBottom: `1px solid ${INK}25`,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 14,
          color: LAVENDER,
        }}>
          ★★★★★
        </span>
        <span style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: INK_MUTED,
        }}>
          Reviewed
        </span>
      </div>

      <blockquote style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 400,
        fontStyle: "italic",
        fontSize: "clamp(17px, 1.5vw, 20px)",
        lineHeight: 1.55,
        letterSpacing: "-0.005em",
        color: INK,
        margin: 0,
        flex: 1,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(40px, 4vw, 56px)",
          lineHeight: 0,
          color: GOLD,
          marginRight: 4,
          verticalAlign: "-0.4em",
        }}>
          &ldquo;
        </span>
        {t.quote}
      </blockquote>

      <figcaption style={{
        marginTop: "auto",
        paddingTop: 18,
        borderTop: `1px solid ${INK}15`,
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: "clamp(15px, 1.4vw, 17px)",
          color: INK,
          marginBottom: 4,
        }}>
          {t.name}
        </div>
        <div style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: INK_SOFT,
        }}>
          {t.role}
        </div>
      </figcaption>
    </motion.figure>
  );
}

export default function Testimonials() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [notionTestimonials, setNotionTestimonials] = useState<typeof TESTIMONIALS>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const fetchNotionTestimonials = async () => {
      try {
        const res = await fetch('/api/get-testimonials');
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setNotionTestimonials(data.testimonials);
        }
      } catch {
        // Silently fall back to hardcoded testimonials
      }
    };
    fetchNotionTestimonials();
  }, []);

  const ALL_TESTIMONIALS = notionTestimonials.length > 0
    ? [...notionTestimonials, ...TESTIMONIALS]
    : TESTIMONIALS;

  const totalPages = Math.ceil(ALL_TESTIMONIALS.length / PER_PAGE);
  const hasPagination = ALL_TESTIMONIALS.length > PER_PAGE;

  const visible = useMemo(() => {
    const start = page * PER_PAGE;
    return ALL_TESTIMONIALS.slice(start, start + PER_PAGE);
  }, [page, ALL_TESTIMONIALS]);

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setPage((next + totalPages) % totalPages);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        backgroundColor: PARCHMENT,
        position: "relative",
        paddingTop: "clamp(80px, 10vw, 130px)",
        paddingBottom: "clamp(80px, 10vw, 130px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "clamp(36px, 4vw, 56px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 44, height: 1, background: `${INK}30` }} />
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.34em", textTransform: "uppercase",
              color: INK,
            }}>
              The Reviews
            </span>
            <div style={{ width: 44, height: 1, background: `${INK}30` }} />
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(36px, 5vw, 60px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: INK,
            margin: 0,
          }}>
            What our clients{" "}
            <em style={{ color: LAVENDER }}>
              wrote home about.
            </em>
          </h2>
        </motion.div>

        {/* ── Mobile: auto-scroll marquee ── */}
        {isMobile ? (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <style>{`@keyframes t-march{0%{transform:translateX(0)}100%{transform:translateX(-50%)}} .t-strip{display:flex;gap:16px;animation:t-march 42s linear infinite;width:max-content}`}</style>
            <div className="t-strip">
              {[...ALL_TESTIMONIALS, ...ALL_TESTIMONIALS].map((t, i) => (
                <div key={i} style={{ width: "clamp(280px,82vw,340px)", flexShrink: 0 }}>
                  <ReviewClipping t={t} index={i % ALL_TESTIMONIALS.length} inView={inView} />
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 56, background: `linear-gradient(to right, ${PARCHMENT}, transparent)`, pointerEvents: "none", zIndex: 2 }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 56, background: `linear-gradient(to left, ${PARCHMENT}, transparent)`, pointerEvents: "none", zIndex: 2 }} />
          </div>
        ) : (
          <>
            {/* ── Desktop: paginated 3-column grid ── */}
            <style>{`@media (min-width: 768px) { #testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; } }`}</style>
            <div id="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", alignItems: "stretch", minHeight: "clamp(240px, 32vw, 420px)" }}>
              {visible.map((t, i) => (
                <ReviewClipping key={`${page}-${t.name}`} t={t} index={i} inView={inView} />
              ))}
            </div>
            {hasPagination && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: "clamp(36px, 4.5vw, 56px)" }}
              >
                <button onClick={() => goTo(page - 1, -1)} style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${INK}40`, background: "transparent", cursor: "pointer", color: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ChevronLeft size={16} />
                </button>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: INK }}>
                  <span style={{ fontWeight: 400, fontSize: 22 }}>{String(page + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 14, color: INK_MUTED }}>/</span>
                  <span style={{ fontSize: 14, color: INK_MUTED }}>{String(totalPages).padStart(2, "0")}</span>
                </div>
                <button onClick={() => goTo(page + 1, 1)} style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${INK}40`, background: "transparent", cursor: "pointer", color: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </>
        )}

        <TestimonialForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSuccess={() => {}} />
      </div>
    </section>
  );
}
