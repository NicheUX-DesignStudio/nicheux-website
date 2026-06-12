"use client";

import { Helmet } from "react-helmet-async";
import Hero from "@/components/home/Hero";
import StatStrip from "@/components/home/StatStrip";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import Portfolio from "@/components/home/Portfolio";
import Services from "@/components/home/Services";
import AboutStrip from "@/components/home/AboutStrip";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>NicheUX | UK Design Studio. Web, Brand, Motion & Illustration</title>
        <meta
          name="description"
          content="NicheUX is a UK-based design studio. UI/UX strategy, web development, brand identity, motion design, illustration. We build digital experiences that get you clients."
        />
        <meta property="og:title" content="NicheUX | UK Design Studio. Web, Brand, Motion & Illustration" />
        <meta
          property="og:description"
          content="NicheUX is a UK-based design studio. UI/UX strategy, web development, brand identity, motion design, illustration. We build digital experiences that get you clients."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nicheux.com" />
        <link rel="canonical" href="https://www.nicheux.com" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NicheUX",
          "alternateName": "NicheUX Studio",
          "url": "https://www.nicheux.com",
          "logo": "https://www.nicheux.com/images/NicheUXLogo.jpg",
          "description": "UK-based design studio crafting strategy, brand, web, motion, illustration, and print. Every story deserves a stage.",
          "slogan": "Every story deserves a stage.",
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "GB",
            "addressLocality": "London"
          },
          "contactPoint": [{
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hellonicheux@gmail.com",
            "telephone": "+44-7342-736804",
            "availableLanguage": "English"
          }],
          "knowsAbout": [
            "UI/UX Strategy & Design",
            "Web Development",
            "Brand Identity",
            "Motion Design",
            "AI Visuals",
            "Illustration",
            "Print Design",
            "Social Media Content"
          ],
          "areaServed": ["United Kingdom", "United States", "Europe", "Worldwide"]
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NicheUX",
          "url": "https://www.nicheux.com",
          "publisher": { "@type": "Organization", "name": "NicheUX" },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.nicheux.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>

      <main className="relative">
        <Hero />
        <StatStrip />
        <MarqueeStrip />
        <Portfolio />
        <Services />
        <WhyUs />
        <AboutStrip />
        <Testimonials />
      </main>
    </>
  );
}
