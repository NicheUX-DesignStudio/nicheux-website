// Web Development page visual components for method phase illustrations
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLD, LAVENDER, BLUE, BLACK } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// Discovery phase visualization
export function DiscoveryVisual() {
  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "auto" }} role="img" aria-label="Discovery phase: Research interviews, data analytics, conversion path analysis, strategic alignment">
      {/* Background */}
      <rect width="800" height="400" fill="rgba(0,0,0,0.3)" />

      {/* Conversation bubbles - research interviews */}
      <g>
        <circle cx="100" cy="80" r="35" fill={BLUE} opacity="0.15" />
        <text x="100" y="90" textAnchor="middle" fontSize="24" fill={BLUE} opacity="0.6">?</text>
        <path d="M 100 120 L 90 150 L 110 150" stroke={BLUE} strokeWidth="1" fill="none" opacity="0.4" />
      </g>

      {/* Data visualization - analytics */}
      <g>
        <rect x="300" y="60" width="15" height="80" fill={LAVENDER} opacity="0.4" />
        <rect x="330" y="40" width="15" height="100" fill={LAVENDER} opacity="0.5" />
        <rect x="360" y="80" width="15" height="60" fill={LAVENDER} opacity="0.4" />
        <rect x="390" y="30" width="15" height="110" fill={LAVENDER} opacity="0.6" />
        <rect x="420" y="50" width="15" height="90" fill={LAVENDER} opacity="0.45" />
        <line x1="300" y1="160" x2="450" y2="160" stroke={LAVENDER} strokeWidth="1" opacity="0.3" />
      </g>

      {/* Funnel - conversion path */}
      <g>
        <path d="M 550 50 L 650 50 L 620 120 L 580 120 Z" fill={GOLD} opacity="0.2" />
        <path d="M 580 120 L 620 120 L 590 180 L 610 180 Z" fill={GOLD} opacity="0.3" />
        <path d="M 590 180 L 610 180 L 600 230 Z" fill={GOLD} opacity="0.4" />
      </g>

      {/* Compass/direction - strategy alignment */}
      <circle cx="700" cy="100" r="40" fill="none" stroke={BLUE} strokeWidth="1" opacity="0.3" />
      <line x1="700" y1="60" x2="700" y2="140" stroke={BLUE} strokeWidth="1.5" opacity="0.5" />
      <line x1="660" y1="100" x2="740" y2="100" stroke={BLUE} strokeWidth="1.5" opacity="0.5" />
      <circle cx="700" cy="100" r="5" fill={BLUE} opacity="0.6" />
    </svg>
  );
}

// Architecture/Planning phase visualization
export function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "auto" }} role="img" aria-label="Architecture planning phase: System components, data flow, feature mapping, performance optimization">
      {/* Background */}
      <rect width="800" height="400" fill="rgba(0,0,0,0.3)" />

      {/* Component boxes - system architecture */}
      <g>
        {/* Header component */}
        <rect x="50" y="50" width="140" height="60" fill={BLUE} stroke={BLUE} strokeWidth="1" opacity="0.4" />
        <text x="120" y="85" textAnchor="middle" fontSize="12" fill={BLUE} opacity="0.6">Header</text>

        {/* Content area with columns */}
        <rect x="50" y="130" width="300" height="200" fill={BLUE} stroke={BLUE} strokeWidth="1" opacity="0.3" />
        <rect x="60" y="140" width="90" height="180" fill={BLUE} stroke={BLUE} strokeWidth="0.5" opacity="0.25" />
        <rect x="160" y="140" width="90" height="180" fill={BLUE} stroke={BLUE} strokeWidth="0.5" opacity="0.25" />
        <rect x="260" y="140" width="80" height="180" fill={LAVENDER} stroke={LAVENDER} strokeWidth="0.5" opacity="0.25" />

        {/* Footer */}
        <rect x="50" y="340" width="300" height="40" fill={BLUE} stroke={BLUE} strokeWidth="1" opacity="0.4" />
      </g>

      {/* Data flow arrows */}
      <g stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.5" markerEnd="url(#arrowGold)">
        <path d="M 400 100 Q 450 120 500 150" />
        <path d="M 400 200 Q 450 200 500 200" />
        <path d="M 400 300 Q 450 280 500 250" />
      </g>

      {/* Icons representing features */}
      <g fill={GOLD} opacity="0.4">
        <circle cx="550" cy="100" r="12" />
        <circle cx="550" cy="180" r="12" />
        <circle cx="550" cy="260" r="12" />
        <circle cx="550" cy="340" r="12" />
      </g>

      {/* SVG marker for arrow */}
      <defs>
        <marker id="arrowGold" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={GOLD} opacity="0.5" />
        </marker>
      </defs>

      {/* Performance metric visualization */}
      <g>
        <text x="650" y="60" fontSize="11" fill={GOLD} opacity="0.6" fontWeight="600">SPEED</text>
        <rect x="650" y="75" width="120" height="8" fill={GOLD} stroke={GOLD} strokeWidth="0.5" opacity="0.25" />
        <rect x="650" y="75" width="100" height="8" fill={GOLD} opacity="0.3" />
      </g>
    </svg>
  );
}

// Development & Delivery phase visualization
export function DevelopmentVisual() {
  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "auto" }} role="img" aria-label="Development phase: Code implementation, unit testing, integration testing, performance monitoring, deployment pipeline">
      {/* Background */}
      <rect width="800" height="400" fill="rgba(0,0,0,0.3)" />

      {/* Code editor representation */}
      <g>
        <rect x="40" y="40" width="280" height="280" fill="rgba(0,0,0,0.2)" stroke={BLUE} strokeWidth="1" opacity="0.3" />
        <rect x="40" y="40" width="280" height="30" fill={BLUE} opacity="0.08" />

        {/* Code lines */}
        <line x1="50" y1="65" x2="200" y2="65" stroke={LAVENDER} strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="85" x2="280" y2="85" stroke={BLUE} strokeWidth="1" opacity="0.3" />
        <line x1="50" y1="105" x2="240" y2="105" stroke={GOLD} strokeWidth="1" opacity="0.35" />
        <line x1="50" y1="125" x2="200" y2="125" stroke={LAVENDER} strokeWidth="1" opacity="0.35" />
        <line x1="50" y1="145" x2="260" y2="145" stroke={BLUE} strokeWidth="1" opacity="0.3" />
        <line x1="50" y1="165" x2="180" y2="165" stroke={GOLD} strokeWidth="1" opacity="0.3" />
        <line x1="50" y1="185" x2="220" y2="185" stroke={LAVENDER} strokeWidth="1" opacity="0.35" />
        <line x1="50" y1="205" x2="270" y2="205" stroke={BLUE} strokeWidth="1" opacity="0.3" />
        <line x1="50" y1="225" x2="200" y2="225" stroke={GOLD} strokeWidth="1" opacity="0.35" />
        <line x1="50" y1="245" x2="240" y2="245" stroke={LAVENDER} strokeWidth="1" opacity="0.35" />
        <line x1="50" y1="265" x2="210" y2="265" stroke={BLUE} strokeWidth="1" opacity="0.3" />
        <line x1="50" y1="285" x2="250" y2="285" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      </g>

      {/* Testing phases */}
      <g>
        {/* Unit tests */}
        <circle cx="400" cy="100" r="40" fill="none" stroke={LAVENDER} strokeWidth="1" opacity="0.3" />
        <circle cx="400" cy="100" r="30" fill={LAVENDER} opacity="0.08" />
        <text x="400" y="105" textAnchor="middle" fontSize="10" fill={LAVENDER} opacity="0.5">Unit</text>

        {/* Integration tests */}
        <circle cx="520" cy="100" r="40" fill="none" stroke={BLUE} strokeWidth="1" opacity="0.3" />
        <circle cx="520" cy="100" r="30" fill={BLUE} opacity="0.08" />
        <text x="520" y="105" textAnchor="middle" fontSize="10" fill={BLUE} opacity="0.5">E2E</text>

        {/* Performance tests */}
        <circle cx="640" cy="100" r="40" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.35" />
        <circle cx="640" cy="100" r="30" fill={GOLD} opacity="0.08" />
        <text x="640" y="105" textAnchor="middle" fontSize="10" fill={GOLD} opacity="0.5">Perf</text>
      </g>

      {/* Deployment pipeline */}
      <g opacity="0.4">
        <rect x="350" y="220" width="60" height="30" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="0.5" />
        <text x="380" y="240" textAnchor="middle" fontSize="9" fill={GOLD}>Stage</text>

        <polygon points="420,235 430,220 430,250" fill={GOLD} opacity="0.3" />

        <rect x="440" y="220" width="60" height="30" fill={GOLD} opacity="0.25" stroke={GOLD} strokeWidth="0.5" />
        <text x="470" y="240" textAnchor="middle" fontSize="9" fill={GOLD}>Prod</text>
      </g>

      {/* Monitoring chart */}
      <g>
        <rect x="380" y="290" width="200" height="80" fill={BLUE} stroke={BLUE} strokeWidth="0.5" opacity="0.2" />
        <polyline points="395,350 420,330 445,340 470,310 495,325 520,305 545,315 560,295"
                  fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.5" />
      </g>
    </svg>
  );
}
