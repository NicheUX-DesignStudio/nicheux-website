// Services landing page - central hub for all service offerings
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { GOLD, LAVENDER, BLUE, BLACK, PARCHMENT } from "@/constants/theme";
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  ServiceSection,
  ContentContainer,
  ItemGrid,
  SectionTitle,
  DescriptionText,
} from "@/components/service/ServicePagePrimitives";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICES = [
  {
    title: "UI/UX Strategy & Design",
    subtitle: "Research-led, conversion-focused design",
    description: "Complete UX audits, user research, design systems, and pixel-perfect interfaces engineered to convert. From diagnosis to redesign, we turn visitors into customers.",
    features: ["UX Research", "Design Systems", "User Testing", "Design Specs"],
    accent: GOLD,
    link: "/strategy-design",
    cta: "Explore Design Services",
  },
  {
    title: "Custom Web Development",
    subtitle: "Hand-coded sites that load fast and convert hard",
    description: "React, Next.js, Astro, and merchify stores built from scratch. No templates, no shortcuts. Every line of code earns its place, tuned for the metrics you actually care about.",
    features: ["React/Next.js", "merchify", "Performance", "E-Commerce"],
    accent: BLUE,
    link: "/web-development-ecommerce",
    cta: "Explore Development Services",
  },
];

function ServiceCard({ service }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      viewport={{ once: true }}
      style={{
        padding: "clamp(40px, 5vw, 64px)",
        border: `2px solid ${service.accent}30`,
        background: `${service.accent}05`,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      whileHover={{
        borderColor: service.accent,
        background: `${service.accent}12`,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          background: `radial-gradient(circle, ${service.accent}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Eyebrow color={service.accent}>{service.subtitle}</Eyebrow>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "20px 0 24px 0",
          }}
        >
          {service.title}
        </h2>

        <DescriptionText style={{ marginBottom: "clamp(24px, 3vw, 40px)", maxWidth: 600 }}>
          {service.description}
        </DescriptionText>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(20px, 3vw, 32px)",
            marginBottom: "clamp(32px, 4vw, 48px)",
          }}
        >
          {service.features.map((feature: string) => (
            <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span
                style={{
                  color: service.accent,
                  flexShrink: 0,
                  fontSize: "1.2em",
                  marginTop: 2,
                }}
              >
                ✓
              </span>
              <span
                style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <PrimaryButton onClick={() => (window.location.href = service.link)}>
          {service.cta}
        </PrimaryButton>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const metaDescription =
    "NicheUX services: UI/UX strategy & design, custom web development, and e-commerce solutions. Research-led, conversion-focused, hand-built.";
  const canonicalUrl = "https://www.nicheux.com/services";

  return (
    <div style={{ backgroundColor: BLACK, color: "#fff" }}>
      <Helmet>
        <title>Services | NicheUX. Design & Web Development</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Services | NicheUX" />
        <meta property="og:description" content={metaDescription} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.nicheux.com",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": canonicalUrl,
              },
            ],
          })}
        </script>
      </Helmet>

      <a
        href="#main-content"
        style={{
          position: "absolute",
          top: "-40px",
          left: 0,
          backgroundColor: GOLD,
          color: BLACK,
          padding: "8px 16px",
          textDecoration: "none",
          zIndex: 100,
          borderRadius: 2,
        }}
        onFocus={(e) => {
          e.currentTarget.style.top = "0";
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = "-40px";
        }}
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* HERO */}
        <ServiceSection borderTop={false} withSpotlight spotlightColor={GOLD} id="hero">
          <ContentContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ marginBottom: "clamp(32px, 4vw, 48px)" }}
            >
              <Eyebrow>What We Do</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(44px, 6.5vw, 96px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: "#fff",
                margin: 0,
                maxWidth: 1000,
              }}
            >
              Two complementary services. <em style={{ color: GOLD }}>One shared obsession:</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              style={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.4vw, 17px)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.6)",
                margin: "clamp(24px, 3vw, 40px) 0 0 0",
                maxWidth: 660,
              }}
            >
              Beautiful design that doesn't convert is decoration. Functional code without purpose is waste. We do both, together, measured by outcomes.
            </motion.p>
          </ContentContainer>
        </ServiceSection>

        {/* SERVICES */}
        <ServiceSection borderTop id="offerings">
          <ContentContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              viewport={{ once: true }}
              style={{ marginBottom: "clamp(56px, 7vw, 96px)" }}
            >
              <Eyebrow>Our Offerings</Eyebrow>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 5vw, 72px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  margin: "20px 0 0 0",
                }}
              >
                Pick your starting point.
              </h2>
            </motion.div>

            <ItemGrid columns={1} gap="clamp(40px, 6vw, 64px)">
              {SERVICES.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </ItemGrid>
          </ContentContainer>
        </ServiceSection>

        {/* CTA */}
        <ServiceSection borderTop>
          <ContentContainer maxWidth={900} style={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              viewport={{ once: true }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 5vw, 56px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  margin: "0 0 24px 0",
                }}
              >
                Not sure which service fits? <em style={{ color: GOLD }}>We'll figure it out.</em>
              </h2>
              <p
                style={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.6)",
                  margin: "0 0 32px 0",
                }}
              >
                Start with a free 30-minute discovery call. We'll understand your goals, evaluate your project, and show you the right path forward.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <PrimaryButton onClick={() => (window.location.href = "/contact")}>
                  Book a Discovery Call
                </PrimaryButton>
                <SecondaryButton onClick={() => (window.location.href = "/")}> Back to Home</SecondaryButton>
              </div>
            </motion.div>
          </ContentContainer>
        </ServiceSection>
      </main>
    </div>
  );
}
