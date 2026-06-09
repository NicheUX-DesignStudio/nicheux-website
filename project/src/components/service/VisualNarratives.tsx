// Visual narrative components for telling design stories through imagery
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLD, LAVENDER, BLUE, BLACK, INK, INK_SOFT, INK_MUTED } from "@/constants/theme";

const FLOW_EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ─────────────────────────────────────────────────────────────────────────────
// BEFORE STATE VISUALIZATIONS (Chaos/Problems)
// ─────────────────────────────────────────────────────────────────────────────

export function SlowLoadingBefore() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="Before: Slow loading page with spinner indicating delay">
      <rect x="0" y="0" width="360" height="240" fill={BLACK} />
      <rect x="0" y="0" width="360" height="16" fill="#0a0a0a" />
      <circle cx="9" cy="8" r="2.5" fill="#666" opacity="0.4" />
      <circle cx="17" cy="8" r="2.5" fill="#666" opacity="0.4" />
      <circle cx="25" cy="8" r="2.5" fill="#666" opacity="0.4" />

      {/* Spinner - indicating loading delay */}
      <circle cx="180" cy="120" r="20" fill="none" stroke="#555" strokeWidth="2" opacity="0.3" />
      <circle cx="180" cy="120" r="20" fill="none" stroke={GOLD} strokeWidth="2"
              strokeDasharray="31.4" strokeDashoffset="20" opacity="0.6" />

      {/* Text - barely loaded */}
      <rect x="20" y="180" width="160" height="4" fill="#333" opacity="0.4" />
      <rect x="20" y="190" width="120" height="4" fill="#333" opacity="0.3" />
      <rect x="20" y="200" width="180" height="4" fill="#333" opacity="0.3" />
    </svg>
  );
}

export function SlowLoadingAfter() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="After: Fast loading page with checkmark indicating instant load">
      <rect x="0" y="0" width="360" height="240" fill={BLACK} />
      <rect x="0" y="0" width="360" height="16" fill="#0a0a0a" />
      <circle cx="9" cy="8" r="2.5" fill="#fff" opacity="0.6" />
      <circle cx="17" cy="8" r="2.5" fill="#fff" opacity="0.6" />
      <circle cx="25" cy="8" r="2.5" fill="#fff" opacity="0.6" />

      {/* Checkmark - fully loaded */}
      <circle cx="180" cy="120" r="20" fill={BLUE} opacity="0.15" />
      <path d="M 172 120 L 178 126 L 188 116" fill="none" stroke={BLUE} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />

      {/* Text - fully rendered */}
      <rect x="20" y="180" width="160" height="4" fill="#fff" opacity="0.9" />
      <rect x="20" y="190" width="120" height="4" fill="#fff" opacity="0.8" />
      <rect x="20" y="200" width="180" height="4" fill="#fff" opacity="0.8" />
    </svg>
  );
}

export function MobileBreakBefore() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="Before: Mobile view with broken layout and overlapping content">
      <rect x="0" y="0" width="360" height="240" fill={BLACK} />

      {/* Mobile frame */}
      <rect x="140" y="20" width="80" height="200" fill="#222" stroke="#444" strokeWidth="1" />
      <rect x="145" y="25" width="70" height="190" fill="#0a0a0a" />

      {/* Broken content - overlapping, misaligned */}
      <rect x="150" y="40" width="60" height="8" fill="#555" opacity="0.6" />
      <rect x="150" y="55" width="65" height="6" fill="#555" opacity="0.5" />
      <rect x="150" y="68" width="55" height="6" fill="#555" opacity="0.4" />
      <rect x="145" y="85" width="75" height="20" fill="#666" opacity="0.4" />
      <rect x="150" y="120" width="60" height="40" fill="#666" opacity="0.35" />

      {/* Broken text indicator */}
      <text x="180" y="175" textAnchor="middle" fontSize="8" fill="#E74C3C" opacity="0.7">BROKEN</text>
    </svg>
  );
}

export function MobileBreakAfter() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="After: Mobile view with responsive design and proper alignment">
      <rect x="0" y="0" width="360" height="240" fill={BLACK} />

      {/* Mobile frame - crisp */}
      <rect x="140" y="20" width="80" height="200" fill="#222" stroke={BLUE} strokeWidth="1.5" />
      <rect x="145" y="25" width="70" height="190" fill="#0a0a0a" />

      {/* Perfect mobile layout */}
      <rect x="150" y="40" width="60" height="8" fill="#fff" opacity="0.8" />
      <rect x="150" y="55" width="60" height="5" fill="#fff" opacity="0.6" />
      <rect x="150" y="65" width="60" height="5" fill="#fff" opacity="0.6" />
      <rect x="148" y="80" width="64" height="30" fill={BLUE} opacity="0.2" />
      <rect x="150" y="120" width="60" height="35" fill="#fff" opacity="0.7" />
      <rect x="150" y="162" width="60" height="10" fill={BLUE} opacity="0.4" />

      {/* Check mark */}
      <path d="M 165 190 L 170 195 L 180 185" fill="none" stroke={BLUE} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}

export function CodeMessBefore() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="Before: Inconsistent code with syntax warnings and errors">
      <rect x="0" y="0" width="360" height="240" fill="#0a0a0a" />
      <rect x="0" y="0" width="360" height="20" fill="#1a1a1a" />

      {/* Code lines - messy, inconsistent */}
      <line x1="15" y1="40" x2="200" y2="40" stroke="#555" strokeWidth="1" opacity="0.4" />
      <line x1="15" y1="55" x2="280" y2="55" stroke="#555" strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="70" x2="150" y2="70" stroke={GOLD} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="85" x2="250" y2="85" stroke="#555" strokeWidth="1" opacity="0.35" />
      <line x1="15" y1="100" x2="200" y2="100" stroke="#555" strokeWidth="1" opacity="0.4" />
      <line x1="15" y1="115" x2="220" y2="115" stroke={GOLD} strokeWidth="1" opacity="0.25" />
      <line x1="15" y1="130" x2="180" y2="130" stroke="#555" strokeWidth="1" opacity="0.35" />
      <line x1="15" y1="145" x2="270" y2="145" stroke="#555" strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="160" x2="240" y2="160" stroke={GOLD} strokeWidth="1" opacity="0.3" />

      {/* Warning indicators */}
      <circle cx="345" cy="55" r="3" fill="#E74C3C" opacity="0.6" />
      <circle cx="345" cy="100" r="3" fill="#E74C3C" opacity="0.5" />
      <circle cx="345" cy="160" r="3" fill="#E74C3C" opacity="0.6" />
    </svg>
  );
}

export function CodeMessAfter() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="After: Clean, consistent code with proper syntax and type checking">
      <rect x="0" y="0" width="360" height="240" fill="#0a0a0a" />
      <rect x="0" y="0" width="360" height="20" fill="#1a1a1a" />

      {/* Code lines - clean, consistent */}
      <line x1="15" y1="40" x2="200" y2="40" stroke={BLUE} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="55" x2="220" y2="55" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="70" x2="180" y2="70" stroke={LAVENDER} strokeWidth="1" opacity="0.55" />
      <line x1="15" y1="85" x2="240" y2="85" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="100" x2="200" y2="100" stroke={BLUE} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="115" x2="210" y2="115" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="130" x2="190" y2="130" stroke={LAVENDER} strokeWidth="1" opacity="0.55" />
      <line x1="15" y1="145" x2="230" y2="145" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="160" x2="220" y2="160" stroke={BLUE} strokeWidth="1" opacity="0.6" />

      {/* Check marks */}
      <path d="M 340 40 L 345 45 L 350 35" fill="none" stroke={BLUE} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M 340 100 L 345 105 L 350 95" fill="none" stroke={BLUE} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M 340 160 L 345 165 L 350 155" fill="none" stroke={BLUE} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

export function SecurityBefore() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="Before: Security vulnerabilities indicated by broken lock and warning signs">
      <rect x="0" y="0" width="360" height="240" fill={BLACK} />

      {/* Lock - broken/open */}
      <rect x="150" y="60" width="60" height="50" fill="none" stroke="#E74C3C" strokeWidth="2" rx="4" opacity="0.5" />
      <path d="M 160 90 L 160 80 Q 160 70 170 70 Q 180 70 180 80 L 180 90"
            fill="none" stroke="#E74C3C" strokeWidth="2" opacity="0.5" />
      <circle cx="170" cy="100" r="3" fill="#E74C3C" opacity="0.4" />

      {/* Vulnerabilities - red indicators */}
      <circle cx="100" cy="80" r="8" fill="#E74C3C" opacity="0.4" />
      <text x="100" y="83" textAnchor="middle" fontSize="10" fill="#E74C3C" opacity="0.7">!</text>

      <circle cx="260" cy="100" r="8" fill="#E74C3C" opacity="0.4" />
      <text x="260" y="103" textAnchor="middle" fontSize="10" fill="#E74C3C" opacity="0.7">!</text>

      <circle cx="120" cy="160" r="8" fill="#E74C3C" opacity="0.4" />
      <text x="120" y="163" textAnchor="middle" fontSize="10" fill="#E74C3C" opacity="0.7">!</text>
    </svg>
  );
}

export function SecurityAfter() {
  return (
    <svg viewBox="0 0 360 240" style={{ width: "100%", height: "auto" }} role="img" aria-label="After: Security hardened with secured lock and checkmarks indicating safe implementation">
      <rect x="0" y="0" width="360" height="240" fill={BLACK} />

      {/* Lock - closed/secure */}
      <rect x="150" y="60" width="60" height="50" fill="none" stroke={BLUE} strokeWidth="2" rx="4" opacity="0.7" />
      <path d="M 160 90 L 160 80 Q 160 70 170 70 Q 180 70 180 80 L 180 90"
            fill="none" stroke={BLUE} strokeWidth="2" opacity="0.7" />
      <circle cx="170" cy="100" r="3" fill={BLUE} opacity="0.8" />

      {/* Check marks - secured */}
      <g opacity="0.6">
        <circle cx="100" cy="80" r="8" fill={BLUE} opacity="0.2" />
        <path d="M 95 80 L 100 85 L 105 75" fill="none" stroke={BLUE} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g opacity="0.6">
        <circle cx="260" cy="100" r="8" fill={BLUE} opacity="0.2" />
        <path d="M 255 100 L 260 105 L 265 95" fill="none" stroke={BLUE} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g opacity="0.6">
        <circle cx="120" cy="160" r="8" fill={BLUE} opacity="0.2" />
        <path d="M 115 160 L 120 165 L 125 155" fill="none" stroke={BLUE} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS FLOW VISUALIZATIONS
// ─────────────────────────────────────────────────────────────────────────────

export function DiscoveryFlow() {
  return (
    <svg viewBox="0 0 800 300" style={{ width: "100%", height: "auto" }} role="img" aria-label="Discovery process flow: Listen to stakeholders, Analyze data, Synthesize insights, Create brief">
      <rect width="800" height="300" fill="rgba(0,0,0,0.2)" />

      {/* Stage 1: Questions */}
      <g>
        <circle cx="100" cy="150" r="35" fill={BLUE} opacity="0.15" />
        <text x="100" y="160" textAnchor="middle" fontSize="24" fill={BLUE} opacity="0.5">?</text>
        <text x="100" y="210" textAnchor="middle" fontSize="12" fill="#fff" opacity="0.6" fontWeight="600">LISTEN</text>
      </g>

      {/* Arrow 1 */}
      <path d="M 140 150 L 210 150" stroke={BLUE} strokeWidth="2" fill="none" opacity="0.4" />
      <polygon points="215,150 210,145 210,155" fill={BLUE} opacity="0.4" />

      {/* Stage 2: Data */}
      <g>
        <rect x="230" y="115" width="60" height="70" fill={BLUE} opacity="0.1" stroke={BLUE} strokeWidth="1" />
        <line x1="250" y1="130" x2="290" y2="130" stroke={BLUE} strokeWidth="1.5" opacity="0.35" />
        <line x1="250" y1="145" x2="290" y2="145" stroke={BLUE} strokeWidth="1.5" opacity="0.35" />
        <line x1="250" y1="160" x2="280" y2="160" stroke={BLUE} strokeWidth="1.5" opacity="0.35" />
        <text x="260" y="210" textAnchor="middle" fontSize="12" fill="#fff" opacity="0.6" fontWeight="600">ANALYZE</text>
      </g>

      {/* Arrow 2 */}
      <path d="M 300 150 L 370 150" stroke={BLUE} strokeWidth="2" fill="none" opacity="0.4" />
      <polygon points="375,150 370,145 370,155" fill={BLUE} opacity="0.4" />

      {/* Stage 3: Synthesis */}
      <g>
        <circle cx="430" cy="150" r="35" fill={BLUE} opacity="0.15" />
        <text x="430" y="150" textAnchor="middle" fontSize="32" fill={BLUE} opacity="0.5">→</text>
        <text x="430" y="210" textAnchor="middle" fontSize="12" fill="#fff" opacity="0.6" fontWeight="600">SYNTHESIZE</text>
      </g>

      {/* Arrow 3 */}
      <path d="M 470 150 L 540 150" stroke={BLUE} strokeWidth="2" fill="none" opacity="0.4" />
      <polygon points="545,150 540,145 540,155" fill={BLUE} opacity="0.4" />

      {/* Stage 4: Brief */}
      <g>
        <rect x="560" y="115" width="70" height="70" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.5" />
        <text x="595" y="155" textAnchor="middle" fontSize="28" fill={GOLD} opacity="0.5">📄</text>
        <text x="595" y="210" textAnchor="middle" fontSize="12" fill="#fff" opacity="0.6" fontWeight="600">BRIEF</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDITORIAL FLOW TIMELINE
// Replaces the old SVG flow diagrams. Built as legible HTML/CSS so it works on
// the PARCHMENT Method sections and animates on scroll. Single shared component
// drives both the design and webdev pages so they stay perfectly consistent.
// ─────────────────────────────────────────────────────────────────────────────

type FlowStage = { num: string; name: string; verb: string; detail: string };

const DESIGN_STAGES: FlowStage[] = [
  { num: "I",   name: "Research", verb: "Listen",   detail: "Interviews, analytics, heuristic teardown." },
  { num: "II",  name: "Design",   verb: "Craft",    detail: "Wireframes, systems, high-fidelity mockups." },
  { num: "III", name: "Test",     verb: "Validate", detail: "Usability sessions, friction maps, edge cases." },
  { num: "IV",  name: "Refine",   verb: "Iterate",  detail: "Patterns retuned until friction is gone." },
  { num: "V",   name: "Deliver",  verb: "Launch",   detail: "Specs, tokens, handoff that holds up." },
];

const WEBDEV_STAGES: FlowStage[] = [
  { num: "I",   name: "Plan",  verb: "Map",      detail: "Audit, stack, architecture, the brief that earns it." },
  { num: "II",  name: "Code",  verb: "Build",    detail: "Hand-written components, typed APIs, semantic HTML." },
  { num: "III", name: "Test",  verb: "Harden",   detail: "Lighthouse, load, hostile inputs, OWASP top 10." },
  { num: "IV",  name: "Ship",  verb: "Launch",   detail: "Staging mirror, smoke tests, 30-day warranty." },
];

type FlowVariant = "design" | "webdev";

function EditorialFlow({ stages, accent, ariaLabel, gridId }: {
  stages: FlowStage[];
  accent: string;
  ariaLabel: string;
  gridId: string;
}) {
  return (
    <div role="img" aria-label={ariaLabel} style={{ position: "relative" }}>
      <style>{`
        @media (max-width: 900px) {
          .${gridId} {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .${gridId} .flow-stage {
            border-top: 1px solid ${INK}15 !important;
            padding-top: clamp(28px, 4vw, 40px) !important;
            padding-bottom: clamp(28px, 4vw, 40px) !important;
          }
          .${gridId} .flow-stage:first-child {
            border-top: none !important;
            padding-top: 0 !important;
          }
          .${gridId} .flow-connector {
            display: none !important;
          }
        }
      `}</style>

      <div
        className={gridId}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
          gap: "clamp(16px, 2.4vw, 40px)",
          alignItems: "start",
        }}
      >
        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1;
          return (
            <motion.div
              key={stage.num}
              className="flow-stage"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: FLOW_EASE }}
              viewport={{ once: true, amount: 0.25 }}
              style={{ position: "relative" }}
            >
              {/* Top hairline + roman numeral + connector to next stage */}
              <div style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "clamp(20px, 2.4vw, 32px)",
                minHeight: 28,
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(20px, 2vw, 28px)",
                  color: accent,
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}>
                  {stage.num}
                </span>

                {!isLast && (
                  <motion.div
                    className="flow-connector"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.12 * i + 0.2, ease: FLOW_EASE }}
                    viewport={{ once: true, amount: 0.4 }}
                    style={{
                      flex: 1,
                      height: 1,
                      background: `linear-gradient(90deg, ${accent}, ${accent}33)`,
                      transformOrigin: "left center",
                    }}
                  />
                )}

                {!isLast && (
                  <span aria-hidden className="flow-connector" style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: accent,
                    opacity: 0.5,
                    flexShrink: 0,
                  }} />
                )}
              </div>

              {/* Stage name */}
              <h4 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: INK,
                margin: "0 0 6px 0",
              }}>
                <em style={{ fontStyle: "italic" }}>{stage.name}.</em>
              </h4>

              {/* Verb / motion */}
              <div style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: "clamp(10px, 0.9vw, 11px)",
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: accent,
                marginBottom: 14,
              }}>
               . {stage.verb}
              </div>

              {/* Detail */}
              <p style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.05vw, 14px)",
                lineHeight: 1.55,
                color: INK_SOFT,
                margin: 0,
                maxWidth: 220,
              }}>
                {stage.detail}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function DesignFlow() {
  return (
    <EditorialFlow
      stages={DESIGN_STAGES}
      accent={LAVENDER}
      gridId="design-flow-grid"
      ariaLabel="Design process timeline: Research and Listen, Design and Craft, Test and Validate, Refine and Iterate, Deliver and Launch"
    />
  );
}

export function BuildFlow() {
  return (
    <EditorialFlow
      stages={WEBDEV_STAGES}
      accent={BLUE}
      gridId="build-flow-grid"
      ariaLabel="Web development process timeline: Plan and Map, Code and Build, Test and Harden, Ship and Launch"
    />
  );
}
