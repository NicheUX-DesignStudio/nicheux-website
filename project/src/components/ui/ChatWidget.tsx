"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";

const GOLD    = "#E9C672";
const LAVENDER= "#B097BE";
const BLACK   = "#131313";
const EASE    = [0.25, 0.46, 0.45, 0.94] as const;

interface Msg { role: "user" | "bot"; text: string; }

// ── KNOWLEDGE BASE ────────────────────────────────────────────────────────────

const KB: { keys: string[]; answer: string }[] = [
  {
    keys: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy"],
    answer: "Hey! Welcome to NicheUX.\n\nWe are a UK-based creative studio. Ask me anything about our services, pricing, process, case studies, or the team. I am here to help.",
  },
  {
    keys: ["services", "offer", "what do you do", "disciplines", "capabilities", "what can you"],
    answer: "We cover six design disciplines:\n\n1. Strategy and UI/UX Design\n2. Web Development and E-Commerce (React, Shopify)\n3. Print and Brand Design (logos, brochures, identity)\n4. Social Media Marketing (content, management, growth)\n5. Motion Design and AI Visuals (animation, explainers, AI video)\n6. Illustration and Character Design\n\nEvery project starts with a free consultation. Which area are you exploring?",
  },
  {
    keys: ["price", "pricing", "cost", "how much", "budget", "rates", "fee", "quote", "charge", "afford"],
    answer: "Pricing depends on your location and project scope. We adjust for purchasing power across 150+ countries.\n\nRough UK prices:\n• Logo design from £350\n• Brand identity from £750\n• Custom coded website from £1,800\n• Shopify store from £1,200\n• Brochure from £200\n• Social media starter plan from £350/month\n• Motion graphics from £450\n• Character design from £200\n\nFor an exact quote, send a brief at /contact. We respond within 24 hours.",
  },
  {
    keys: ["strategy", "ux", "ui", "user experience", "user interface", "wireframe", "audit", "research", "design system"],
    answer: "Strategy and UI/UX Design:\n• UX Audit and Strategy from £450\n• Complete UI/UX Design from £1,200\n• Design System from £2,500\n• Free 30-min consultation\n\nWe map every user journey before touching pixels. Most studios skip this step. We do not.\n\nWant to start with an audit or go straight to design?",
  },
  {
    keys: ["web", "website", "shopify", "ecommerce", "e-commerce", "react", "develop", "landing page", "care plan", "maintenance"],
    answer: "Web Development and E-Commerce:\n• Custom coded website from £1,800\n• Custom Shopify store from £1,200\n• Enterprise solutions from £4,500\n\nCare Plans (ongoing maintenance):\n• Essential from £200/month\n• Professional from £400/month\n• Enterprise from £800/month\n\nAll sites are production-ready, mobile-first, and fast. What type of site are you building?",
  },
  {
    keys: ["print", "brand", "logo", "identity", "brochure", "flyer", "poster", "business card", "signage", "menu", "stationery", "brand kit"],
    answer: "Print and Brand Design:\n• Logo Design from £350\n• Complete Brand Identity from £750\n• Brochure (4-page) from £200\n• Flyer from £120\n• Poster (A2) from £180\n• Business Cards from £95\n• Menu design from £200\n• Pull-up Banner from £150\n\nEvery file is built print-ready: bleeds, CMYK, correct resolution. No reprints.\n\nWhat do you need designed?",
  },
  {
    keys: ["social media", "instagram", "facebook", "linkedin", "content", "management", "marketing", "tiktok", "reels", "posts"],
    answer: "Social Media Marketing plans:\n• Starter from £350/month (8 posts, 2 reels, basic engagement)\n• Professional from £650/month (16 posts, 6 reels, full management)\n• Enterprise from £1,200/month (daily content, ads, full growth strategy)\n\nWe handle strategy, content creation, scheduling, and reporting.\n\nWhat platforms are you on?",
  },
  {
    keys: ["motion", "animation", "video", "explainer", "ai video", "ai visual", "generative", "reel", "motion graphics"],
    answer: "Motion Design and AI Visuals:\n• 30s Explainer Video from £1,350\n• Logo Animation from £450\n• Social Media Video Pack from £1,150\n• Character Animation from £1,900\n• AI Video Generation from £400\n• AI Innovation Suite from £900\n\nWe combine traditional motion craft with AI generation.\n\nWhat is the project?",
  },
  {
    keys: ["illustration", "character", "comic", "drawing", "art", "book illustration", "children", "concept art", "game", "sequential"],
    answer: "Illustration and Character Design:\n• Single Character Design from £200\n• Character Turnaround Sheet from £350\n• Children's Book Package from £800\n• Game Character Package from £600\n• Editorial Illustration from £150 per piece\n• Book Cover from £300\n\nIndhupriya leads illustration. Her work spans publishing and gaming across the UK and Asia.\n\nWhat do you need illustrated?",
  },
  {
    keys: ["shop", "artifact", "mug", "tee", "hoodie", "frame", "book", "commission", "personalised", "custom product"],
    answer: "The Artifact Studio is our commission-based shop. Everything is made to order.\n\nWhat we make:\n• Illustrated Quote Frames (from £35)\n• Custom Photo Frames (from £45)\n• Custom Mugs from £18\n• Story Tees and Hoodies from £28\n• Custom Children's Books from £22\n• Custom Illustrated Mini-Books from £120\n\nEvery commission starts with a brief. No payment until you approve the direction.\n\nBrowse at /shop",
  },
  {
    keys: ["team", "who", "people", "designer", "founder", "thevaki", "indhupriya", "isaac", "akash", "delwin", "kishore"],
    answer: "NicheUX is a six-person studio based in the UK:\n\n• Thevaki (Creative Director, UI/UX, Web Dev)\n• Indhupriya (Character and Illustration)\n• Isaac (Print and Brand Design)\n• Akash (AI Visuals and Art Direction)\n• Delwin (Motion Design)\n• Kishore Aravind (Sales and Marketing)\n\nWe have worked with clients in the UK, Ireland, Canada, Malaysia, and India.\n\nAnything specific you would like to know?",
  },
  {
    keys: ["process", "how does it work", "what happens", "steps", "timeline", "how do i start"],
    answer: "How it works:\n\n1. Share your brief at /contact. Select services, describe the project.\n\n2. We respond within 24 hours with a custom proposal and timeline.\n\n3. We begin work and keep you involved throughout. You see progress, not surprises.\n\nMost projects run 1 to 6 weeks depending on scope. What are you working on?",
  },
  {
    keys: ["timeline", "how long", "turnaround", "deadline", "urgent", "rush"],
    answer: "Typical timelines:\n• Logo: 5 to 7 working days\n• Brand identity: 2 to 3 weeks\n• Website: 3 to 6 weeks\n• Social media content: ongoing from week 1\n• Motion video: 2 to 4 weeks\n• Illustration: 1 to 3 weeks per piece\n\nNeed something faster? We offer Rush Delivery (50% surcharge) which prioritises your project.\n\nWhat is your deadline?",
  },
  {
    keys: ["location", "where", "based", "country", "uk", "united kingdom", "remote", "online"],
    answer: "We are based in the United Kingdom. Our team works remotely so we can serve clients in any timezone.\n\nWe have worked with clients in:\n• United Kingdom\n• Ireland\n• Canada\n• Malaysia\n• India\n\nPricing adjusts automatically for your country on the Contact page.",
  },
  {
    keys: ["portfolio", "work", "examples", "case study", "previous", "clients", "projects", "featured"],
    answer: "Our featured work includes:\n\n• Bloom and Brew (Custom Shopify store, Canada)\n• NandhiniDC (Architecture website, India)\n• Kishore Aravind (Dual-career portfolio with drag wheel, Malaysia)\n• Kingdom of Sweets (Event arch banner, Ireland)\n• SSJC Tournament (Full print identity, medals, t-shirts, Malaysia)\n• Midas Utara Engineering (Multilingual video production, Malaysia)\n• London Underground Series (Behavioural design reel, UK)\n\nSee the full portfolio at /featured-work",
  },
  {
    keys: ["midas", "biogas", "engineering", "carlsberg", "multilingual", "malay", "tamil"],
    answer: "Midas Utara Engineering is a client project we are proud of.\n\nMidas needed their Biogas Flaring System promotional video for Carlsberg Shah Alam Wastewater Treatment Plant elevated into a professional marketing asset in three languages: English, Malay, and Tamil.\n\nWe delivered three fully localised promotional reels with consistent visual identity, professional pacing, and multilingual parity.\n\nSee the full case study at /featured-work/midas",
  },
  {
    keys: ["london", "tube", "underground", "behavioural", "behavioral", "psychology", "schema", "disfluency", "dual coding"],
    answer: "The London Underground Series is a studio project exploring behavioural design in the wild.\n\nWe took to the Victoria Line to deconstruct how top-tier advertising uses cognitive science. Three principles: Schema Hijacking (SnoreLab), The Disfluency Effect (Allica Bank), and Dual Coding (Timpson).\n\nCaptured at King's Cross peak hours. The same principles we apply to every project we build.\n\nSee it at /featured-work/london-tube-reel",
  },
  {
    keys: ["bloom", "brew", "coffee", "canada", "shopify store", "international"],
    answer: "Bloom and Brew is a Canadian patisserie brand that launched into three international markets on day one.\n\nWe built a custom Liquid theme from scratch on Shopify. Zero templates. Every element earned its place.\n\nFull case study at /featured-work/bloom-brew",
  },
  {
    keys: ["nandhini", "architecture", "india", "nandhinidc"],
    answer: "NandhiniDC is an interior architecture studio in India.\n\nWe built their website around a daylight toggle, a draggable horizontal reel of completed projects, and the concept that architecture is a feeling, not just a building.\n\nFull case study at /featured-work/nandhinidc",
  },
  {
    keys: ["ssjc", "squash", "tournament", "malaysia", "medal", "gaming universe", "print identity"],
    answer: "SSJC is the 10th redONE Mobile Selangor Super Junior Circuit, Malaysia's premier junior squash tournament.\n\nWe built a full gaming-universe identity across two legs: Retro Purple (Leg 1) and Cyber Blue (Leg 2). T-shirts, lanyards, medals, event posters.\n\nFull case study at /featured-work/ssjc-tournament",
  },
  {
    keys: ["kishore", "k29", "portfolio", "dual career", "performance"],
    answer: "Kishore Aravind needed one portfolio to hold two careers: squash coach and designer.\n\nWe built K29 with a draggable navigation wheel, a performance gauge meter hero, kinetic red and systematic cyan. Built like a performance system.\n\nFull case study at /featured-work/kishore-portfolio",
  },
  {
    keys: ["gallery", "image", "photos", "behind the scenes", "footage", "videos"],
    answer: "The Gallery at /gallery has photos, videos, and behind-the-scenes content from our studio and client work.\n\nIt includes team photos, SSJC medal designs, studio process sketches, original illustration work, and more. We update it regularly as new projects finish.",
  },
  {
    keys: ["blog", "article", "read", "writing", "journal", "insights"],
    answer: "The Blog at /blog has detailed case studies and studio writing:\n\n• Bloom and Brew Shopify launch story\n• SSJC GAME ON, building a tournament identity\n• NandhiniDC architecture website\n• Eight Slides by 4am, overnight LinkedIn content\n• Where Design Meets Storytelling, studio manifesto\n\nGood reading before you work with us.",
  },
  {
    keys: ["payment", "pay", "invoice", "deposit", "contract", "lock-in"],
    answer: "How payment works:\n\n• No lock-in contracts\n• No payment before work begins\n• We send a proposal with clear pricing. You confirm before anything starts.\n• For one-time projects: typically 50% to start, 50% on delivery. Discussed per project.\n\nTransparent from day one.",
  },
  {
    keys: ["revision", "change", "amend", "feedback", "update", "edit", "iteration"],
    answer: "Revisions are included in every project:\n\n• Logo: 2 initial concepts, 3 revision rounds\n• Brand identity: 2 concepts, 4 rounds\n• Website: 2 rounds of design revisions before development\n• Illustrations: 2 concepts, 2 revision rounds\n\nNeed extended revisions? It is a premium add-on we can include in your proposal.",
  },
  {
    keys: ["contact", "email", "whatsapp", "get in touch", "reach", "talk", "call", "phone"],
    answer: "Ways to reach us:\n\nEmail: hellonicheux@gmail.com\nWhatsApp: +44 7342 736804\n\nOr use the Contact page at /contact to send a brief and get a custom proposal within 24 hours.",
  },
  {
    keys: ["start", "begin", "project", "hire", "work with", "get started", "need a", "looking for", "want a", "build", "create", "launch"],
    answer: "Let's make something.\n\nHead to /contact and fill in the brief form. Select the services you need, describe the project in a sentence or two, and we send a custom proposal within 24 hours.\n\nAlternatively, WhatsApp us at +44 7342 736804.",
  },
  {
    keys: ["thank", "thanks", "great", "perfect", "awesome", "brilliant", "love", "amazing"],
    answer: "Happy to help. Anything else you would like to know about the studio or a specific project?\n\nWhen you are ready, head to /contact or WhatsApp at +44 7342 736804.",
  },
  {
    keys: ["minimum", "cheapest", "budget", "afford", "expensive", "cheap", "small project"],
    answer: "Our smallest projects start from around £95 (business cards) and go up based on scope.\n\nWe adjust pricing for 150+ countries based on purchasing power. Share your budget on the Contact page and we will tell you honestly what is achievable within it.",
  },
  {
    keys: ["nft", "crypto", "web3", "app", "mobile", "ios", "android"],
    answer: "We focus on web design, brand, print, social media, motion, and illustration. We do not currently build native mobile apps or work in Web3.\n\nIf you need a web app or complex web platform, reach out and we can discuss whether it fits.",
  },
  {
    keys: ["refund", "cancel", "money back", "guarantee", "if i'm not happy"],
    answer: "We do not take payment before work begins, so you are never paying for work you have not seen.\n\nFor projects in progress, our terms outline a fair exit based on work completed. We have never had a client leave unhappy and we would rather fix it than have you walk away.\n\nSee the full terms at /terms.",
  },
];

function matchAnswer(text: string): string | null {
  const lower = text.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.keys.some(k => lower.includes(k))) return entry.answer;
  }
  return null;
}

// ── STARTERS ─────────────────────────────────────────────────────────────────

const STARTERS = [
  "What services do you offer?",
  "How does pricing work?",
  "Show me your work",
  "I want to start a project",
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState<Msg[]>([
    { role: "bot", text: "Hey, I am the NicheUX studio assistant.\n\nAsk me about services, pricing, our work, or anything else. If I cannot answer, Thevaki will get back to you personally." }
  ]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  // Email capture state for escalation
  const [awaitingEmail, setAwaitingEmail] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  async function saveToNotion(question: string, email: string) {
    try {
      await fetch(
        "/api/submit-simple-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: email || "Chat visitor",
            email: email || "no-email@visitor.com",
            message: `CHATBOT UNANSWERED QUESTION:\n\n${question}`,
          }),
        }
      );
    } catch (_) {}
  }

  function send(text?: string) {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text: msg }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      // Email capture mode
      if (awaitingEmail) {
        const isEmail = /\S+@\S+\.\S+/.test(msg);
        if (isEmail) {
          saveToNotion(pendingQuestion, msg);
          setAwaitingEmail(false);
          setPendingQuestion("");
          setMsgs(m => [...m, {
            role: "bot",
            text: `Got it. Thevaki will get back to you at ${msg} as soon as possible.\n\nIn the meantime, feel free to WhatsApp us at +44 7342 736804 if it is urgent.`
          }]);
        } else {
          saveToNotion(pendingQuestion, "");
          setAwaitingEmail(false);
          setPendingQuestion("");
          setMsgs(m => [...m, {
            role: "bot",
            text: "No worries. Thevaki will look into this and reply to any inquiry at /contact.\n\nWhatsApp: +44 7342 736804 for faster replies."
          }]);
        }
        return;
      }

      const answer = matchAnswer(msg);
      if (answer) {
        setMsgs(m => [...m, { role: "bot", text: answer }]);
      } else {
        // Escalate to Thevaki
        setAwaitingEmail(true);
        setPendingQuestion(msg);
        setMsgs(m => [...m, {
          role: "bot",
          text: "Good question. I do not have a precise answer for that right now, but Thevaki will get back to you personally.\n\nDrop your email below and you will hear back within a few hours:",
        }]);
        if (!open) setUnread(u => u + 1);
      }
    }, 600 + Math.random() * 400);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open studio chat"
        style={{ position: "fixed", bottom: 92, right: 28, zIndex: 9000, width: 52, height: 52, borderRadius: 0, background: "#131313", border: `1px solid ${GOLD}40`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s, transform 0.2s", boxShadow: "0 4px 24px rgba(0,0,0,0.45)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}40`; (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}>
        <MessageCircle size={20} style={{ color: GOLD }} />
        {unread > 0 && (
          <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: LAVENDER, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 9, fontWeight: 700, color: "#fff" }}>{unread}</span>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ position: "fixed", bottom: 160, right: 28, zIndex: 9001, width: "min(380px, calc(100vw - 32px))", background: "#0e0e0e", border: `1px solid rgba(255,255,255,0.08)`, borderTop: `2px solid ${GOLD}`, display: "flex", flexDirection: "column", boxShadow: "0 24px 72px rgba(0,0,0,0.6)" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", boxShadow: "0 0 8px #4CAF5060" }} />
                <div>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.06em" }}>NicheUX Assistant</div>
                  <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>Thevaki replies personally to complex questions</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", display: "flex", padding: 4, transition: "color 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12, maxHeight: 380 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    background: m.role === "user" ? GOLD : "rgba(255,255,255,0.06)",
                    color: m.role === "user" ? "#131313" : "rgba(255,255,255,0.82)",
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display: "flex", gap: 4, padding: "12px 14px", background: "rgba(255,255,255,0.06)", width: "fit-content" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, opacity: 0.7 }} />
                  ))}
                </div>
              )}

              {/* Starter chips — only on first message */}
              {msgs.length === 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {STARTERS.map(s => (
                    <button key={s} onClick={() => send(s)}
                      style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 11, color: GOLD, background: `${GOLD}10`, border: `1px solid ${GOLD}30`, padding: "5px 11px", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${GOLD}20`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${GOLD}10`; }}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 12px", display: "flex", gap: 8, flexShrink: 0 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder={awaitingEmail ? "Your email address..." : "Ask anything..."}
                style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 13, padding: "9px 12px", outline: "none", transition: "border-color 0.2s" }}
                onFocus={e => { e.currentTarget.style.borderColor = `${GOLD}50`; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              />
              <button onClick={() => send()} style={{ background: GOLD, border: "none", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "opacity 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
                <Send size={15} style={{ color: BLACK }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
