// Testimonials and social proof for service pages
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLD, BLUE, BLACK } from "@/constants/theme";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TESTIMONIALS = [
  {
    quote: "Nicheux took our confused UX and turned it into a conversion engine. Our form completion went from 12% to 63% in three months.",
    author: "Sarah Chen",
    role: "CEO, Digital Commerce Co",
    color: GOLD,
  },
  {
    quote: "We were on a slow, broken platform. Their rebuild cut our load time by 85% and our support tickets dropped by half.",
    author: "Mike Patterson",
    role: "Operations Director, Retail Plus",
    color: BLUE,
  },
];

export function Testimonials() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 4vw, 48px)" }}>
      {TESTIMONIALS.map((testimonial, i) => (
        <motion.div
          key={testimonial.author}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          viewport={{ once: true }}
          style={{
            padding: "clamp(28px, 3.5vw, 40px)",
            border: `1px solid ${testimonial.color}25`,
            background: `${testimonial.color}08`,
            borderRadius: 4,
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.7,
              color: "#fff",
              margin: "0 0 20px 0",
            }}
          >
            "{testimonial.quote}"
          </p>

          <div>
            <p
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: testimonial.color,
                margin: "0 0 4px 0",
              }}
            >
              {testimonial.author}
            </p>
            <p
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                margin: 0,
              }}
            >
              {testimonial.role}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
