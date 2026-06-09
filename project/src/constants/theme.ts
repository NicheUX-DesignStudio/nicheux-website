// src/constants/theme.ts - COMPLETE FIXED VERSION
// ============================================
// COLORS - Keep this as the main colors export
// ============================================
export const GOLD = "#EBC773";
export const BLUE = "#89B0CC";
export const LAVENDER = "#B097BE";
export const BLACK = "#131313";

// Programme palette — light "intermission" sections (printed playbill feel)
export const PARCHMENT = "#F1E9D2";
export const PARCHMENT_DEEP = "#E8DEC2";
export const INK = "#1A1A1A";
export const INK_SOFT = "#3A3530";
export const INK_MUTED = "#7A736A";

// Main colors object (keep this name since components import from it)
export const COLORS = {
  GOLD,
  BLUE,
  LAVENDER,
  BLACK,
  primary: "#121212",
  secondary: "#E9C672",
  tertiary: "#89B1CC",
  accent: "#B097BE",
  text: {
    primary: "#121212",
    secondary: "#FFFFFF",
    muted: "#6B7280",
  },
} as const;

// ============================================
// TYPOGRAPHY
// ============================================
export const TYPOGRAPHY = {
  h1: "text-[48px] md:text-[56px] lg:text-[60px] font-serif leading-tight tracking-tight",
  h2: "text-[36px] md:text-[42px] lg:text-[48px] font-serif leading-tight",
  h3: "text-[28px] md:text-[32px] lg:text-[36px] font-serif",
  body: "text-[18px] md:text-[20px] lg:text-[24px] font-sans leading-relaxed",
  caption: "text-[16px] md:text-[18px] font-sans",
  button: "font-sans font-sans-medium text-[14px]",
} as const;

// ============================================
// STYLES
// ============================================
export const SHADOWS = {
  blue: {
    sm: "shadow-[0_2px_10px_rgba(137,177,204,0.2)]",
    md: "shadow-[0_8px_30px_rgba(137,177,204,0.15)]",
    lg: "shadow-[0_20px_50px_rgba(137,177,204,0.25)]",
    xl: "shadow-[0_20px_50px_rgba(137,177,204,0.3)]",
  },
} as const;

export const BUTTON_STYLES = {
  primary: "bg-[#E9C672] text-[#121212] hover:bg-[#d4b463] active:bg-[#B097BE]",
  secondary: "border border-[#E9C672] text-[#E9C672] hover:bg-[#E9C672] hover:text-[#121212]",
  outline: "border border-[#B097BE] text-[#B097BE] hover:bg-[#B097BE] hover:text-white",
} as const;

export const ANIMATIONS = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
} as const;

// ============================================
// EXPORT ALL
// ============================================
export default {
  COLORS,
  TYPOGRAPHY,
  SHADOWS,
  BUTTON_STYLES,
  ANIMATIONS,
};

