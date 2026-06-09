"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, CheckCircle, AlertTriangle, Loader2, ArrowRight } from "lucide-react";
import { GOLD, LAVENDER, BLACK } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function ContactHome() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const response = await fetch("/api/submit-simple-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message || "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({ type: "error", message: result.message || "Failed to send message" });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        backgroundColor: BLACK,
        overflow: "hidden",
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Ghost background. "CURTAIN" */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-0.08em",
          right: "-0.05em",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(180px, 24vw, 380px)",
          lineHeight: 0.85,
          color: "rgba(255,255,255,0.018)",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        Finis.
      </div>

      {/* Theatrical spotlight. radial gold cone from top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: "8%",
          width: "55%",
          height: "100%",
          background: `radial-gradient(ellipse 70% 60% at 60% -5%, ${GOLD}0d 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Ambient lavender. bottom left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "40%",
          height: "60%",
          background: `radial-gradient(ellipse at 30% 80%, ${LAVENDER}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: "#ffffff",
            margin: 0,
          }}>
            The stage{" "}
            <em style={{ color: LAVENDER }}>is set.</em>
          </h2>

          {/* Availability badge. trust signal */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: "clamp(24px, 3vw, 32px)",
            padding: "8px 16px",
            border: "1px solid rgba(235,199,115,0.25)",
            background: "rgba(235,199,115,0.04)",
            borderRadius: 999,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: GOLD,
              boxShadow: `0 0 10px ${GOLD}`,
            }} />
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD,
            }}>
              Now booking · Q3 2026 productions
            </span>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div
          id="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(48px, 7vw, 96px)",
            alignItems: "start",
          }}
        >
          <style>{`
            @media (max-width: 1023px) {
              #contact-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* LEFT. invitation copy + contact details */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(16px, 1.6vw, 19px)",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 420,
                margin: 0,
              }}
            >
              Every great production starts with a single conversation. Tell us your story . 
              we'll build the stage it deserves.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              style={{
                height: 1,
                background: `linear-gradient(90deg, ${GOLD}40, transparent)`,
                margin: "clamp(32px, 4vw, 48px) 0",
                transformOrigin: "left",
              }}
            />

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {[
                { icon: Mail, label: "Email us", value: "hellonicheux@gmail.com", href: "mailto:hellonicheux@gmail.com" },
                { icon: Phone, label: "Call us", value: "+44 7342 736804", href: "tel:+447342736804" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={href} href={href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={14} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      marginBottom: 4,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: 15,
                      color: "rgba(255,255,255,0.6)",
                    }}>
                      {value}
                    </div>
                  </div>
                </a>
              ))}

              <p style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.2)",
                marginTop: 8,
              }}>
                We typically respond within 24 hours
              </p>
            </motion.div>
          </div>

          {/* RIGHT. form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            {/* Form. direct on stage, separated by a vertical gold rule */}
            <div style={{
              position: "relative",
              paddingLeft: "clamp(0px, 4vw, 56px)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}>
              {/* Form status */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: 28 }}
                >
                  <div style={{
                    padding: "14px 18px",
                    border: `1px solid ${submitStatus.type === "success" ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`,
                    background: submitStatus.type === "success" ? "rgba(74,222,128,0.05)" : "rgba(248,113,113,0.05)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    borderRadius: 2,
                  }}>
                    {submitStatus.type === "success"
                      ? <CheckCircle size={15} style={{ color: "rgba(74,222,128,0.8)", flexShrink: 0, marginTop: 2 }} />
                      : <AlertTriangle size={15} style={{ color: "rgba(248,113,113,0.8)", flexShrink: 0, marginTop: 2 }} />
                    }
                    <div>
                      <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: 14, color: "#ffffff", margin: 0 }}>
                        {submitStatus.message}
                      </p>
                      {submitStatus.type === "success" && (
                        <p style={{ fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>
                          We'll be in touch within 24 hours.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                {/* Name + Email */}
                <div id="form-name-email-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 3vw, 28px)" }}>
                  <style>{`@media (max-width: 639px) { #form-name-email-grid { grid-template-columns: 1fr !important; } }`}</style>
                  {[
                    { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
                    { name: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{
                        display: "block",
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontSize: 10, fontWeight: 600,
                        letterSpacing: "0.22em", textTransform: "uppercase",
                        color: focusedField === f.name ? LAVENDER : "rgba(255,255,255,0.3)",
                        marginBottom: 10,
                        transition: "color 0.2s ease",
                      }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={formData[f.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required={f.required}
                        disabled={isSubmitting}
                        onFocus={() => setFocusedField(f.name)}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          background: "transparent",
                          border: "none",
                          borderBottom: `1px solid ${focusedField === f.name ? LAVENDER : "rgba(255,255,255,0.12)"}`,
                          color: "#ffffff",
                          padding: "10px 0",
                          width: "100%",
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: 400,
                          fontSize: 15,
                          outline: "none",
                          borderRadius: 0,
                          transition: "border-color 0.25s ease",
                          opacity: isSubmitting ? 0.5 : 1,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: "block",
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: focusedField === "message" ? LAVENDER : "rgba(255,255,255,0.3)",
                    marginBottom: 10,
                    transition: "color 0.2s ease",
                  }}>
                    Your Brief
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your story. your project, your vision, your audience…"
                    rows={5}
                    required
                    disabled={isSubmitting}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${focusedField === "message" ? LAVENDER : "rgba(255,255,255,0.12)"}`,
                      color: "#ffffff",
                      padding: "10px 0",
                      width: "100%",
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: 15,
                      outline: "none",
                      borderRadius: 0,
                      resize: "none",
                      transition: "border-color 0.25s ease",
                      opacity: isSubmitting ? 0.5 : 1,
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    backgroundColor: isSubmitting ? "rgba(233,198,114,0.4)" : GOLD,
                    color: isSubmitting ? "rgba(0,0,0,0.4)" : BLACK,
                    border: "none",
                    padding: "16px 36px",
                    borderRadius: 2,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "background-color 0.25s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#d4b463"; }}
                  onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = GOLD; }}
                >
                  {isSubmitting ? (
                    <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
                  ) : (
                    <>Send Your Brief <ArrowRight size={13} /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Production timeline. trust signal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          style={{
            marginTop: "clamp(64px, 8vw, 112px)",
            paddingTop: "clamp(32px, 4vw, 48px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: GOLD,
            }}>
              How it unfolds
            </span>
          </div>

          <div id="process-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(24px, 3vw, 48px)",
          }}>
            <style>{`@media (max-width: 767px) { #process-grid { grid-template-columns: 1fr !important; } }`}</style>
            {[
              { num: "I",   when: "Today",       what: "Brief Received",   desc: "We read every word. No template responses." },
              { num: "II",  when: "Within 24h",  what: "First Call",       desc: "30 minutes. No pitch deck. Just your story." },
              { num: "III", when: "Within 1 week", what: "Concept Stage",  desc: "Direction, timeline, and a transparent quote." },
            ].map(step => (
              <div key={step.num} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  color: GOLD,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}>
                  {step.num}
                </span>
                <span style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}>
                  {step.when}
                </span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "clamp(18px, 1.9vw, 22px)",
                  color: "#fff",
                  lineHeight: 1.2,
                }}>
                  {step.what}
                </span>
                <span style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.72)",
                }}>
                  {step.desc}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
