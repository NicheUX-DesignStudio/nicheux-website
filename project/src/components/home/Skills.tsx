"use client";

import { Target, Code, Zap, Printer, TrendingUp, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ServicesProps {
  onNavigate?: (view: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const navigate = useNavigate();
  
  // FIXED: Updated paths to match App.tsx routes
  const services = [
    {
      title: "Strategy & Design",
      description: "Strategic guidance to shape meaningful digital experiences built on empathy and clarity.",
      icon: Target,
      color: "#E9C672",
      pastel: "#E9C67225",
      link: "/strategy-design",
    },
    {
      title: "Web Development & E-Commerce",
      description: "Powerful, high-performing websites and merchify stores built for conversion and brand cohesion.",
      icon: Code,
      color: "#89B1CC",
      pastel: "#89B1CC25",
      link: "/web-development-ecommerce",
    },
    {
      title: "Motion Design & AI Visuals",
      description: "Cutting-edge visual experiences powered by dynamic motion design and AI-generated visuals that captivate audiences.",
      icon: Zap,
      color: "#B097BE",
      pastel: "#B097BE25",
      link: "/motion-design-ai-visuals",
    },
    {
      title: "Print & Brand Design",
      description: "Visual storytelling that bridges digital and print to amplify your brand voice across all mediums.",
      icon: Printer,
      color: "#E9C672",
      pastel: "#E9C67225",
      link: "/print-brand-design", // FIXED: was "/print-brand"
    },
    {
      title: "Social Media Marketing",
      description: "Strategic social media campaigns that expand your reach and engage your target audience effectively.",
      icon: TrendingUp,
      color: "#89B1CC",
      pastel: "#89B1CC25",
      link: "/social-media-marketing", // FIXED: was "/social-media"
    },
    {
      title: "Illustration & Character Design",
      description: "Unique character designs and illustrations that bring stories to life and create memorable brand identities.",
      icon: Palette,
      color: "#B097BE",
      pastel: "#B097BE25",
      link: "/illustration-character-design", // FIXED: was "/illustration-character"
    },
  ];

  const handleServiceClick = (link: string) => {
    navigate(link);
  };

  return (
    <section id="services" className="relative py-12 md:py-6 lg:py-8 xl:py-24 px-4 md:px-8 lg:px-12 xl:px-20 bg-white overflow-hidden">
      {/* SEO-Optimized Header */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16 xl:mb-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[60px] font-serif text-[#121212] mb-4 md:mb-6"
        >
          Go <span className="text-[#B097BE]">Beyond</span> Your Market
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 font-sans text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed"
        >
          UI/UX design, web development, and brand strategy services that help businesses 
          worldwide expand reach and increase conversions
        </motion.p>
      </div>

      <div className="flex flex-col gap-4 md:gap-10 lg:gap-6 xl:gap-16 max-w-6xl mx-auto px-2 sm:px-4">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-4 xl:gap-6 w-full"
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-white transition-transform hover:scale-105 shadow-lg mx-auto md:mx-0"
                style={{ backgroundColor: service.color }}
              >
                <Icon size={24} strokeWidth={2} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>

              {/* Text & Button */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
                <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-[32px] font-sans font-normal text-[#121212] mb-2 md:mb-3 lg:mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 font-sans text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 md:mb-4 lg:mb-6 max-w-3xl">
                  {service.description}
                </p>

                <div className="w-full flex justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleServiceClick(service.link)}
                    className="mt-2 md:mt-3 inline-flex items-center gap-2 font-sans font-medium text-[#121212] px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-lg transition-all duration-200 group hover:shadow-md"
                    style={{ backgroundColor: service.pastel }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = service.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = service.pastel)}
                  >
                    <span className="text-sm md:text-base lg:text-base">Learn More</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1 w-4 h-4 md:w-5 md:h-5"
                    >
                      <path
                        d="M7.5 5L12.5 10L7.5 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


