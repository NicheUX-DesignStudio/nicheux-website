// File: src/utils/pricingService.ts - COMPLETE FIXED VERSION
// ALL SERVICES + ALL COUNTRIES + ADJUSTED UK PRICING

export interface ServicePricing {
  min: number;
  max: number;
  pricingType?: 'fixed' | 'percentage' | 'free';
  complexityLevel?: 'simple' | 'standard' | 'complex';
  valueTier?: 'essential' | 'professional' | 'enterprise';
}

export interface PricingServices {
  [key: string]: ServicePricing;
}

export interface CountryPricing {
  currency: string;
  symbol: string;
  services: PricingServices;
  name: string;
  affordability: 'high' | 'medium' | 'low';
  purchasingPowerIndex: number;
  gdpPerCapita: number;
  marketTier: 'premium' | 'mid-market' | 'budget';
  localMultiplier: number;
}

export interface CountryPricingMap {
  [key: string]: CountryPricing;
}

// ==================== CURRENCY RATES (GBP to local) ====================
const CURRENCY_RATES: Record<string, number> = {
  'GBP': 1.00, 'EUR': 1.18, 'USD': 1.28, 'CAD': 1.75, 'AUD': 1.95,
  'NZD': 2.10, 'CHF': 1.12, 'SEK': 13.50, 'NOK': 13.00, 'DKK': 8.80,
  'PLN': 4.85, 'CZK': 29.00, 'HUF': 450, 'RON': 5.60, 'BGN': 2.15,
  'CNY': 9.20, 'JPY': 185, 'KRW': 1700, 'TWD': 40, 'HKD': 9.80,
  'SGD': 1.72, 'MYR': 6.00, 'THB': 45, 'IDR': 19500, 'PHP': 72,
  'VND': 31000, 'INR': 107, 'PKR': 354, 'BDT': 150, 'LKR': 380,
  'AED': 4.65, 'SAR': 4.75, 'QAR': 4.50, 'KWD': 0.39, 'OMR': 0.48,
  'BHD': 0.48, 'JOD': 0.90, 'ILS': 4.70, 'TRY': 40, 'EGP': 60,
  'MAD': 13, 'DZD': 175, 'TND': 3.80, 'ZAR': 23.8, 'NGN': 2050,
  'KES': 200, 'GHS': 16, 'ETB': 70, 'MXN': 22, 'BRL': 6.70,
  'ARS': 1300, 'CLP': 1200, 'COP': 5000, 'PEN': 4.80, 'UYU': 50,
  'XOF': 785, 'XAF': 785, 'ISK': 175, 'RSD': 138, 'BAM': 2.31,
  'ALL': 122, 'MKD': 72.5, 'MOP': 10.3, 'MNT': 4400, 'BND': 1.72,
  'KHR': 5200, 'LAK': 27000, 'MMK': 2700, 'NPR': 168, 'BTN': 105,
  'MVR': 19.7, 'AFN': 87, 'KZT': 610, 'UZS': 15500, 'KGS': 112,
  'TJS': 13.6, 'TMT': 4.5, 'LYD': 6.1, 'SDG': 750, 'XPF': 140,
  'CUP': 128, 'DOP': 75, 'HTG': 168, 'JMD': 197, 'TTD': 8.7,
  'BBD': 2.56, 'BSD': 1.28, 'VES': 46, 'BOB': 8.9, 'PYG': 9500,
  'GYD': 267, 'SRD': 36, 'FJD': 2.9, 'PGK': 4.8, 'SBD': 10.7,
  'VUV': 152, 'NAD': 23, 'BWP': 17, 'ZMW': 32, 'ZWL': 520,
  'MWK': 1730, 'MZN': 81, 'MGA': 5900, 'MUR': 58, 'SCR': 17.5,
  'GTQ': 10, 'HNL': 31.5, 'NIO': 46.5, 'CRC': 670, 'CDF': 3600,
  'TZS': 3200, 'UGX': 4800, 'RWF': 1760, 'BIF': 3700, 'SSP': 167,
  'CG': 785, 'AOA': 1060, 'GNF': 11000, 'SLL': 26500, 'LRD': 240,
  'SOS': 732, 'DJF': 227, 'ERN': 19.2, 'MRT': 45.6, 'SZL': 23,
  'LSL': 23, 'GMD': 86, 'SHP': 1.00, 'STN': 28.8, 'CVE': 130,
  'GIP': 1.00, 'FKP': 1.00, 'IMP': 1.00, 'JEP': 1.00, 'GGP': 1.00,
  'AZN': 2.18, 'GEL': 3.5, 'AMD': 495, 'BYN': 4.2, 'MDL': 23,
  'UAH': 53, 'RUB': 120, 'KYD': 1.07, 'BMD': 1.28, 'AWG': 2.3,
  'ANG': 2.3, 'SVC': 1.28, 'PAB': 1.28, 'CUC': 1.28, 'XCD': 3.46,
  'BZD': 2.58, 'WST': 3.5, 'TOP': 3.0, 'KID': 1.95, 'TVD': 1.95,
  'NRU': 1.95, 'YER': 321, 'IQD': 1680, 'LBP': 19200, 'SYP': 13100
};

// ==================== COMPLETE UK PRICING - SOURCE-VALIDATED 2025-26 RATES ====================
const createUKPricing = (): PricingServices => ({
  // ========== AI & AUTOMATION ==========
  'AI Video Generation': { min: 600, max: 2000, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'AI Style Transfer': { min: 200, max: 600, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Rapid Concept Testing': { min: 300, max: 900, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'AI Content Expansion': { min: 250, max: 800, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'essential' },

  // ========== WEB DEVELOPMENT ==========
  'Hand-Built Website': { min: 3500, max: 12000, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Custom Coded Website': { min: 3500, max: 12000, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Custom merchify Store': { min: 4000, max: 15000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },
  'Enterprise Solutions': { min: 12000, max: 45000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },
  'Essential Care': { min: 100, max: 200, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Professional Care': { min: 220, max: 400, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Enterprise Care': { min: 450, max: 750, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },

  // ========== STRATEGY & DESIGN ==========
  'UX Audit & Strategy': { min: 1000, max: 3500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Complete UI/UX Design': { min: 3500, max: 12000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },
  'Design System': { min: 2000, max: 7000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },

  // ========== BRAND IDENTITY ==========
  'Logo Design': { min: 700, max: 3000, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Basic Brand Kit': { min: 1200, max: 4500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Complete Brand Identity': { min: 3000, max: 9000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },
  'Brand Guidelines Document': { min: 500, max: 1800, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Starter Brand Kit': { min: 500, max: 1800, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Complete Brand Launch': { min: 4000, max: 14000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },
  'Marketing Pro Package': { min: 1200, max: 4000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },

  // ========== PRINT & MARKETING MATERIALS ==========
  '4-page Brochure': { min: 500, max: 1800, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  '8-page Brochure': { min: 800, max: 2500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  '12-page Catalogue': { min: 1200, max: 3500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  '16-page Catalogue': { min: 1800, max: 5000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },
  'Custom folds': { min: 350, max: 1200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Single-sided Flyer': { min: 100, max: 350, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Double-sided Flyer': { min: 180, max: 500, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Poster (up to A2)': { min: 150, max: 500, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Menu (4 pages)': { min: 250, max: 800, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Social Media Kit': { min: 350, max: 1200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Email Template': { min: 220, max: 700, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Web Banners': { min: 150, max: 500, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Presentation Design': { min: 400, max: 1500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Business Cards': { min: 100, max: 350, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Letterhead + Envelope': { min: 180, max: 550, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Presentation Folder': { min: 300, max: 900, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Complete Stationery Suite': { min: 500, max: 1600, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Pull-up Banner': { min: 250, max: 800, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Retail Store Banner': { min: 350, max: 1100, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Window Graphics': { min: 450, max: 1400, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Billboard Design': { min: 600, max: 2000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },
  'Main Menu (4 pages)': { min: 250, max: 800, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Drinks Menu': { min: 180, max: 600, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Specials Board': { min: 130, max: 450, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Takeaway Menu': { min: 250, max: 800, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Print Management': { min: 200, max: 600, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Rush Delivery': { min: 150, max: 500, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Custom Illustrations': { min: 350, max: 1200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Print Design Project': { min: 500, max: 3500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },

  // ========== SOCIAL MEDIA (per month) ==========
  'Social Media Starter Plan': { min: 450, max: 1000, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Social Media Professional Plan': { min: 900, max: 2200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Social Media Enterprise Plan': { min: 2000, max: 5000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },

  // ========== MOTION GRAPHICS ==========
  '30s Explainer Video': { min: 2000, max: 6000, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Logo Animation': { min: 400, max: 1500, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Social Media Video Pack': { min: 1200, max: 4500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Character Animation': { min: 2000, max: 7500, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },

  // ========== ILLUSTRATION & CHARACTER DESIGN ==========
  'Single Character Design': { min: 300, max: 900, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Character Turnaround Sheet': { min: 280, max: 850, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Character Expression Sheet': { min: 240, max: 700, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Character Series (3 characters)': { min: 900, max: 2800, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Character Style Guide': { min: 400, max: 1300, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Character Portrait': { min: 180, max: 600, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Children\'s Book Page': { min: 260, max: 800, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Book Cover Illustration': { min: 500, max: 1600, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Editorial Illustration': { min: 280, max: 850, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Digital Painting': { min: 380, max: 1200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Coloring Book Page': { min: 150, max: 500, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Package Illustration': { min: 320, max: 1000, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Visual Sequence Panel': { min: 180, max: 580, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Storyboard Page (6 panels)': { min: 450, max: 1400, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Commercial Sequence': { min: 850, max: 2500, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },
  'Comic Strip Page': { min: 380, max: 1200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Keyframe Art': { min: 280, max: 900, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Pre-visualization Set': { min: 550, max: 1700, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },
  'Character Concept Sheet': { min: 280, max: 900, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Environment Concept': { min: 380, max: 1200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Prop Design': { min: 220, max: 700, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Mood Board Creation': { min: 130, max: 450, pricingType: 'fixed', complexityLevel: 'simple', valueTier: 'essential' },
  'Game Asset Concept': { min: 220, max: 700, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Game Character Package': { min: 750, max: 2500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Children\'s Book Package': { min: 1800, max: 7000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },
  'Brand Essentials Package': { min: 750, max: 2200, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Character Design Suite': { min: 1200, max: 4000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },
  'Book Illustration Suite': { min: 2200, max: 8000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },

  // ========== PACKAGES ==========
  'Starter Creative Suite': { min: 2500, max: 7500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Pro Creative Powerhouse': { min: 6000, max: 18000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },
  'Enterprise Visual Suite': { min: 12000, max: 35000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'enterprise' },
  'Motion Excellence': { min: 4000, max: 12000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },
  'AI Innovation Suite': { min: 1500, max: 4500, pricingType: 'fixed', complexityLevel: 'standard', valueTier: 'professional' },
  'Creative Power Duo': { min: 5000, max: 16000, pricingType: 'fixed', complexityLevel: 'complex', valueTier: 'professional' },

  // ========== CONSULTATIONS (FREE) ==========
  'Print Design Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
  'Social Media Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
  'Motion Graphics & AI Video Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
  'Illustration & Character Design Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
  'Web Development Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
  'Motion Graphics Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
  'Illustration Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
  'UI/UX Design Consultation': { min: 0, max: 0, pricingType: 'free', complexityLevel: 'simple', valueTier: 'essential' },
});

// ==================== COMPLETE COUNTRY CONFIG (150+ COUNTRIES) - UNCHANGED ====================
const COUNTRY_PRICING_CONFIG: Record<string, { 
  currency: string; 
  name: string; 
  symbol: string;
  affordability: 'high' | 'medium' | 'low';
  purchasingPowerIndex: number;
  gdpPerCapita: number;
  marketTier: 'premium' | 'mid-market' | 'budget';
  localMultiplier: number;
}> = {
  // EUROPE - Western (Premium)
  'GB': { currency: 'GBP', name: 'United Kingdom', symbol: '£', affordability: 'high', purchasingPowerIndex: 1.0, gdpPerCapita: 48, marketTier: 'premium', localMultiplier: 1.0 },
  'IE': { currency: 'EUR', name: 'Ireland', symbol: '€', affordability: 'high', purchasingPowerIndex: 1.10, gdpPerCapita: 105, marketTier: 'premium', localMultiplier: 1.00 },
  'DE': { currency: 'EUR', name: 'Germany', symbol: '€', affordability: 'high', purchasingPowerIndex: 1.10, gdpPerCapita: 52, marketTier: 'premium', localMultiplier: 0.655 },
  'FR': { currency: 'EUR', name: 'France', symbol: '€', affordability: 'high', purchasingPowerIndex: 1.05, gdpPerCapita: 45, marketTier: 'premium', localMultiplier: 0.62 },
  'NL': { currency: 'EUR', name: 'Netherlands', symbol: 'â‚¬', affordability: 'high', purchasingPowerIndex: 1.00, gdpPerCapita: 63, marketTier: 'premium', localMultiplier: 0.72 },
  'BE': { currency: 'EUR', name: 'Belgium', symbol: 'â‚¬', affordability: 'high', purchasingPowerIndex: 1.00, gdpPerCapita: 51, marketTier: 'premium', localMultiplier: 0.9 },
  'CH': { currency: 'CHF', name: 'Switzerland', symbol: 'CHF', affordability: 'high', purchasingPowerIndex: 1.25, gdpPerCapita: 93, marketTier: 'premium', localMultiplier: 1.1 },
  'AT': { currency: 'EUR', name: 'Austria', symbol: 'â‚¬', affordability: 'high', purchasingPowerIndex: 0.96, gdpPerCapita: 55, marketTier: 'premium', localMultiplier: 0.9 },
  'LU': { currency: 'EUR', name: 'Luxembourg', symbol: 'â‚¬', affordability: 'high', purchasingPowerIndex: 1.30, gdpPerCapita: 135, marketTier: 'premium', localMultiplier: 1.0 },
  
  // EUROPE - Southern (Mid-Market)
  'IT': { currency: 'EUR', name: 'Italy', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.80, gdpPerCapita: 36, marketTier: 'mid-market', localMultiplier: 0.85 },
  'ES': { currency: 'EUR', name: 'Spain', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.70, gdpPerCapita: 32, marketTier: 'mid-market', localMultiplier: 0.87 },
  'PT': { currency: 'EUR', name: 'Portugal', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.65, gdpPerCapita: 26, marketTier: 'mid-market', localMultiplier: 0.74 },
  'GR': { currency: 'EUR', name: 'Greece', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.55, gdpPerCapita: 22, marketTier: 'mid-market', localMultiplier: 0.79 },
  
  // EUROPE - Nordic (Premium)
  'SE': { currency: 'SEK', name: 'Sweden', symbol: 'kr', affordability: 'high', purchasingPowerIndex: 1.05, gdpPerCapita: 58, marketTier: 'premium', localMultiplier: 0.90 },
  'NO': { currency: 'NOK', name: 'Norway', symbol: 'kr', affordability: 'high', purchasingPowerIndex: 1.15, gdpPerCapita: 89, marketTier: 'premium', localMultiplier: 0.85 },
  'DK': { currency: 'DKK', name: 'Denmark', symbol: 'kr', affordability: 'high', purchasingPowerIndex: 1.08, gdpPerCapita: 68, marketTier: 'premium', localMultiplier: 1.0 },
  'FI': { currency: 'EUR', name: 'Finland', symbol: 'â‚¬', affordability: 'high', purchasingPowerIndex: 0.95, gdpPerCapita: 54, marketTier: 'premium', localMultiplier: 0.9 },
  'IS': { currency: 'ISK', name: 'Iceland', symbol: 'kr', affordability: 'high', purchasingPowerIndex: 0.95, gdpPerCapita: 72, marketTier: 'premium', localMultiplier: 1.0 },
  
  // EUROPE - Eastern (Mid to Budget)
  'PL': { currency: 'PLN', name: 'Poland', symbol: 'zÅ‚', affordability: 'medium', purchasingPowerIndex: 0.60, gdpPerCapita: 19, marketTier: 'mid-market', localMultiplier: 0.47 },
  'CZ': { currency: 'CZK', name: 'Czech Republic', symbol: 'KÄ', affordability: 'medium', purchasingPowerIndex: 0.62, gdpPerCapita: 27, marketTier: 'mid-market', localMultiplier: 1.25 },
  'HU': { currency: 'HUF', name: 'Hungary', symbol: 'Ft', affordability: 'medium', purchasingPowerIndex: 0.50, gdpPerCapita: 20, marketTier: 'mid-market', localMultiplier: 1.27 },
  'RO': { currency: 'RON', name: 'Romania', symbol: 'lei', affordability: 'medium', purchasingPowerIndex: 0.45, gdpPerCapita: 15, marketTier: 'mid-market', localMultiplier: 1.36 },
  'BG': { currency: 'BGN', name: 'Bulgaria', symbol: 'Ð»Ð²', affordability: 'low', purchasingPowerIndex: 0.38, gdpPerCapita: 13, marketTier: 'budget', localMultiplier: 0.32 },
  'RS': { currency: 'RSD', name: 'Serbia', symbol: 'Ð´Ð¸Ð½', affordability: 'low', purchasingPowerIndex: 0.33, gdpPerCapita: 9, marketTier: 'budget', localMultiplier: 0.28 },
  'HR': { currency: 'EUR', name: 'Croatia', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.52, gdpPerCapita: 18, marketTier: 'mid-market', localMultiplier: 0.42 },
  'SI': { currency: 'EUR', name: 'Slovenia', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.60, gdpPerCapita: 29, marketTier: 'mid-market', localMultiplier: 0.48 },
  'SK': { currency: 'EUR', name: 'Slovakia', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.58, gdpPerCapita: 22, marketTier: 'mid-market', localMultiplier: 0.46 },
  'EE': { currency: 'EUR', name: 'Estonia', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.63, gdpPerCapita: 28, marketTier: 'mid-market', localMultiplier: 0.5 },
  'LV': { currency: 'EUR', name: 'Latvia', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.55, gdpPerCapita: 21, marketTier: 'mid-market', localMultiplier: 0.44 },
  'LT': { currency: 'EUR', name: 'Lithuania', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.57, gdpPerCapita: 24, marketTier: 'mid-market', localMultiplier: 0.45 },
  'BA': { currency: 'BAM', name: 'Bosnia & Herzegovina', symbol: 'KM', affordability: 'low', purchasingPowerIndex: 0.28, gdpPerCapita: 7, marketTier: 'budget', localMultiplier: 0.24 },
  'AL': { currency: 'ALL', name: 'Albania', symbol: 'L', affordability: 'low', purchasingPowerIndex: 0.25, gdpPerCapita: 6, marketTier: 'budget', localMultiplier: 0.22 },
  'MK': { currency: 'MKD', name: 'North Macedonia', symbol: 'Ð´ÐµÐ½', affordability: 'low', purchasingPowerIndex: 0.31, gdpPerCapita: 7, marketTier: 'budget', localMultiplier: 0.26 },
  'ME': { currency: 'EUR', name: 'Montenegro', symbol: 'â‚¬', affordability: 'medium', purchasingPowerIndex: 0.46, gdpPerCapita: 9, marketTier: 'mid-market', localMultiplier: 0.38 },
  'MD': { currency: 'MDL', name: 'Moldova', symbol: 'L', affordability: 'low', purchasingPowerIndex: 0.22, gdpPerCapita: 5, marketTier: 'budget', localMultiplier: 0.2 },
  'UA': { currency: 'UAH', name: 'Ukraine', symbol: 'â‚´', affordability: 'low', purchasingPowerIndex: 0.18, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 1.20 },
  'BY': { currency: 'BYN', name: 'Belarus', symbol: 'Br', affordability: 'low', purchasingPowerIndex: 0.28, gdpPerCapita: 7, marketTier: 'budget', localMultiplier: 0.24 },
  'RU': { currency: 'RUB', name: 'Russia', symbol: 'â‚½', affordability: 'medium', purchasingPowerIndex: 0.42, gdpPerCapita: 12, marketTier: 'mid-market', localMultiplier: 0.35 },
  'GE': { currency: 'GEL', name: 'Georgia', symbol: 'â‚¾', affordability: 'low', purchasingPowerIndex: 0.30, gdpPerCapita: 6, marketTier: 'budget', localMultiplier: 0.26 },
  'AM': { currency: 'AMD', name: 'Armenia', symbol: 'Ö', affordability: 'low', purchasingPowerIndex: 0.28, gdpPerCapita: 5, marketTier: 'budget', localMultiplier: 0.24 },
  'AZ': { currency: 'AZN', name: 'Azerbaijan', symbol: 'â‚¼', affordability: 'medium', purchasingPowerIndex: 0.38, gdpPerCapita: 6, marketTier: 'mid-market', localMultiplier: 0.32 },
  
  // ASIA - East (Premium/Mid)
  'CN': { currency: 'CNY', name: 'China', symbol: 'Â¥', affordability: 'medium', purchasingPowerIndex: 0.46, gdpPerCapita: 13, marketTier: 'mid-market', localMultiplier: 0.68 },
  'JP': { currency: 'JPY', name: 'Japan', symbol: 'Â¥', affordability: 'high', purchasingPowerIndex: 0.90, gdpPerCapita: 40, marketTier: 'premium', localMultiplier: 0.85 },
  'KR': { currency: 'KRW', name: 'South Korea', symbol: 'â‚©', affordability: 'high', purchasingPowerIndex: 0.88, gdpPerCapita: 35, marketTier: 'premium', localMultiplier: 0.8 },
  'TW': { currency: 'TWD', name: 'Taiwan', symbol: 'NT$', affordability: 'high', purchasingPowerIndex: 0.85, gdpPerCapita: 33, marketTier: 'premium', localMultiplier: 0.75 },
  'HK': { currency: 'HKD', name: 'Hong Kong', symbol: 'HK$', affordability: 'high', purchasingPowerIndex: 0.95, gdpPerCapita: 50, marketTier: 'premium', localMultiplier: 0.85 },
  'MO': { currency: 'MOP', name: 'Macao', symbol: 'MOP$', affordability: 'high', purchasingPowerIndex: 0.97, gdpPerCapita: 45, marketTier: 'premium', localMultiplier: 0.85 },
  'MN': { currency: 'MNT', name: 'Mongolia', symbol: 'â‚®', affordability: 'low', purchasingPowerIndex: 0.22, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.2 },
  
  // ASIA - Southeast (Mixed)
  'SG': { currency: 'SGD', name: 'Singapore', symbol: 'S$', affordability: 'high', purchasingPowerIndex: 1.05, gdpPerCapita: 73, marketTier: 'premium', localMultiplier: 1.05 },
  'MY': { currency: 'MYR', name: 'Malaysia', symbol: 'RM', affordability: 'medium', purchasingPowerIndex: 0.52, gdpPerCapita: 12, marketTier: 'mid-market', localMultiplier: 0.85 },
  'TH': { currency: 'THB', name: 'Thailand', symbol: '฿', affordability: 'medium', purchasingPowerIndex: 0.30, gdpPerCapita: 8, marketTier: 'mid-market', localMultiplier: 1.0 },
  'ID': { currency: 'IDR', name: 'Indonesia', symbol: 'Rp', affordability: 'low', purchasingPowerIndex: 0.30, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 2.44 },
  'PH': { currency: 'PHP', name: 'Philippines', symbol: '₱', affordability: 'low', purchasingPowerIndex: 0.25, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.72 },
  'VN': { currency: 'VND', name: 'Vietnam', symbol: '₫', affordability: 'low', purchasingPowerIndex: 0.30, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 1.50 },
  'KH': { currency: 'KHR', name: 'Cambodia', symbol: '៛', affordability: 'low', purchasingPowerIndex: 0.08, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.10 },
  'LA': { currency: 'LAK', name: 'Laos', symbol: '₭', affordability: 'low', purchasingPowerIndex: 0.07, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.09 },
  'MM': { currency: 'MMK', name: 'Myanmar', symbol: 'Ks', affordability: 'low', purchasingPowerIndex: 0.06, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.09 },
  'BN': { currency: 'BND', name: 'Brunei', symbol: 'B$', affordability: 'high', purchasingPowerIndex: 0.95, gdpPerCapita: 31, marketTier: 'premium', localMultiplier: 0.80 },

  // ASIA - South (Budget)
  'IN': { currency: 'INR', name: 'India', symbol: '₹', affordability: 'medium', purchasingPowerIndex: 0.35, gdpPerCapita: 2, marketTier: 'mid-market', localMultiplier: 0.37 },
  'PK': { currency: 'PKR', name: 'Pakistan', symbol: '₨', affordability: 'low', purchasingPowerIndex: 0.101, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.99 },
  'BD': { currency: 'BDT', name: 'Bangladesh', symbol: '৳', affordability: 'low', purchasingPowerIndex: 0.42, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 1.35 },
  'LK': { currency: 'LKR', name: 'Sri Lanka', symbol: 'රු', affordability: 'low', purchasingPowerIndex: 0.45, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 1.34 },
  'NP': { currency: 'NPR', name: 'Nepal', symbol: 'रू', affordability: 'low', purchasingPowerIndex: 0.08, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.09 },
  'BT': { currency: 'BTN', name: 'Bhutan', symbol: 'Nu.', affordability: 'low', purchasingPowerIndex: 0.10, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.11 },
  'MV': { currency: 'MVR', name: 'Maldives', symbol: 'Rf', affordability: 'medium', purchasingPowerIndex: 0.45, gdpPerCapita: 11, marketTier: 'mid-market', localMultiplier: 0.32 },
  'AF': { currency: 'AFN', name: 'Afghanistan', symbol: '؋', affordability: 'low', purchasingPowerIndex: 0.04, gdpPerCapita: 0.5, marketTier: 'budget', localMultiplier: 0.08 },
  
  // ASIA - Central (Budget)
  'KZ': { currency: 'KZT', name: 'Kazakhstan', symbol: 'â‚¸', affordability: 'medium', purchasingPowerIndex: 0.42, gdpPerCapita: 10, marketTier: 'mid-market', localMultiplier: 0.34 },
  'UZ': { currency: 'UZS', name: 'Uzbekistan', symbol: 'soÊ»m', affordability: 'low', purchasingPowerIndex: 0.13, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.18 },
  'KG': { currency: 'KGS', name: 'Kyrgyzstan', symbol: 'Ñ', affordability: 'low', purchasingPowerIndex: 0.10, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  'TJ': { currency: 'TJS', name: 'Tajikistan', symbol: 'SM', affordability: 'low', purchasingPowerIndex: 0.07, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.13 },
  'TM': { currency: 'TMT', name: 'Turkmenistan', symbol: 'm', affordability: 'medium', purchasingPowerIndex: 0.33, gdpPerCapita: 8, marketTier: 'mid-market', localMultiplier: 0.3 },
  
  // MIDDLE EAST (Premium/Mid)
  'AE': { currency: 'AED', name: 'United Arab Emirates', symbol: 'Ø¯.Ø¥', affordability: 'high', purchasingPowerIndex: 0.82, gdpPerCapita: 44, marketTier: 'premium', localMultiplier: 1.0 },
  'SA': { currency: 'SAR', name: 'Saudi Arabia', symbol: 'ï·¼', affordability: 'high', purchasingPowerIndex: 0.91, gdpPerCapita: 23, marketTier: 'premium', localMultiplier: 1.0 },
  'QA': { currency: 'QAR', name: 'Qatar', symbol: 'Ø±.Ù‚', affordability: 'high', purchasingPowerIndex: 0.80, gdpPerCapita: 62, marketTier: 'premium', localMultiplier: 0.80 },
  'KW': { currency: 'KWD', name: 'Kuwait', symbol: 'Ø¯.Ùƒ', affordability: 'high', purchasingPowerIndex: 1.05, gdpPerCapita: 34, marketTier: 'premium', localMultiplier: 0.9 },
  'OM': { currency: 'OMR', name: 'Oman', symbol: 'Ø±.Ø¹.', affordability: 'medium', purchasingPowerIndex: 0.65, gdpPerCapita: 16, marketTier: 'mid-market', localMultiplier: 0.52 },
  'BH': { currency: 'BHD', name: 'Bahrain', symbol: '.Ø¯.Ø¨', affordability: 'high', purchasingPowerIndex: 0.88, gdpPerCapita: 26, marketTier: 'premium', localMultiplier: 0.75 },
  'JO': { currency: 'JOD', name: 'Jordan', symbol: 'Ø¯.Ø§', affordability: 'medium', purchasingPowerIndex: 0.46, gdpPerCapita: 4, marketTier: 'mid-market', localMultiplier: 0.38 },
  'LB': { currency: 'LBP', name: 'Lebanon', symbol: 'Ù„.Ù„', affordability: 'low', purchasingPowerIndex: 0.16, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.2 },
  'SY': { currency: 'SYP', name: 'Syria', symbol: '£S', affordability: 'low', purchasingPowerIndex: 0.06, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.12 },
  'IQ': { currency: 'IQD', name: 'Iraq', symbol: 'Ø¹.Ø¯', affordability: 'medium', purchasingPowerIndex: 0.38, gdpPerCapita: 5, marketTier: 'mid-market', localMultiplier: 0.32 },
  'IR': { currency: 'IRR', name: 'Iran', symbol: 'ï·¼', affordability: 'low', purchasingPowerIndex: 0.22, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.22 },
  'TR': { currency: 'TRY', name: 'Turkey', symbol: 'â‚º', affordability: 'medium', purchasingPowerIndex: 0.52, gdpPerCapita: 10, marketTier: 'mid-market', localMultiplier: 0.4 },
  'IL': { currency: 'ILS', name: 'Israel', symbol: 'â‚ª', affordability: 'high', purchasingPowerIndex: 0.92, gdpPerCapita: 55, marketTier: 'premium', localMultiplier: 0.85 },
  'PS': { currency: 'ILS', name: 'Palestine', symbol: 'â‚ª', affordability: 'low', purchasingPowerIndex: 0.20, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.22 },
  'YE': { currency: 'YER', name: 'Yemen', symbol: 'ï·¼', affordability: 'low', purchasingPowerIndex: 0.04, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.1 },
  
  // AFRICA - North
  'EG': { currency: 'EGP', name: 'Egypt', symbol: 'Ø¬.Ù…', affordability: 'low', purchasingPowerIndex: 0.13, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.55 },
  'MA': { currency: 'MAD', name: 'Morocco', symbol: 'Ø¯.Ù….', affordability: 'low', purchasingPowerIndex: 0.22, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.50 },
  'DZ': { currency: 'DZD', name: 'Algeria', symbol: 'Ø¯.Ø¬', affordability: 'medium', purchasingPowerIndex: 0.35, gdpPerCapita: 4, marketTier: 'mid-market', localMultiplier: 0.3 },
  'TN': { currency: 'TND', name: 'Tunisia', symbol: 'Ø¯.Øª', affordability: 'medium', purchasingPowerIndex: 0.38, gdpPerCapita: 4, marketTier: 'mid-market', localMultiplier: 0.32 },
  'LY': { currency: 'LYD', name: 'Libya', symbol: 'Ù„.Ø¯', affordability: 'medium', purchasingPowerIndex: 0.44, gdpPerCapita: 6, marketTier: 'mid-market', localMultiplier: 0.36 },
  'SD': { currency: 'SDG', name: 'Sudan', symbol: 'Ø¬.Ø³.', affordability: 'low', purchasingPowerIndex: 0.09, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  
  // AFRICA - West
  'NG': { currency: 'NGN', name: 'Nigeria', symbol: 'â‚¦', affordability: 'low', purchasingPowerIndex: 0.091, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.88 },
  'GH': { currency: 'GHS', name: 'Ghana', symbol: 'GHâ‚µ', affordability: 'low', purchasingPowerIndex: 0.16, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.13 },
  'CI': { currency: 'XOF', name: 'Ivory Coast', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.15, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.19 },
  'SN': { currency: 'XOF', name: 'Senegal', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.17, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.2 },
  'ML': { currency: 'XOF', name: 'Mali', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.12, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.17 },
  'BF': { currency: 'XOF', name: 'Burkina Faso', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.10, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  'GN': { currency: 'GNF', name: 'Guinea', symbol: 'FG', affordability: 'low', purchasingPowerIndex: 0.08, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.14 },
  'SL': { currency: 'SLL', name: 'Sierra Leone', symbol: 'Le', affordability: 'low', purchasingPowerIndex: 0.06, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.12 },
  'LR': { currency: 'LRD', name: 'Liberia', symbol: '$', affordability: 'low', purchasingPowerIndex: 0.09, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  'BJ': { currency: 'XOF', name: 'Benin', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.11, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.16 },
  'TG': { currency: 'XOF', name: 'Togo', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.10, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  'NE': { currency: 'XOF', name: 'Niger', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.07, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.13 },
  'MR': { currency: 'MRU', name: 'Mauritania', symbol: 'UM', affordability: 'low', purchasingPowerIndex: 0.11, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.16 },
  'GM': { currency: 'GMD', name: 'Gambia', symbol: 'D', affordability: 'low', purchasingPowerIndex: 0.08, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.14 },
  'CV': { currency: 'CVE', name: 'Cape Verde', symbol: '$', affordability: 'low', purchasingPowerIndex: 0.19, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.21 },
  
  // AFRICA - East
  'KE': { currency: 'KES', name: 'Kenya', symbol: 'KSh', affordability: 'low', purchasingPowerIndex: 0.15, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 1.0 },
  'ET': { currency: 'ETB', name: 'Ethiopia', symbol: 'Br', affordability: 'low', purchasingPowerIndex: 0.07, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.1 },
  'TZ': { currency: 'TZS', name: 'Tanzania', symbol: 'TSh', affordability: 'low', purchasingPowerIndex: 0.08, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.14 },
  'UG': { currency: 'UGX', name: 'Uganda', symbol: 'USh', affordability: 'low', purchasingPowerIndex: 0.07, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.13 },
  'RW': { currency: 'RWF', name: 'Rwanda', symbol: 'RF', affordability: 'low', purchasingPowerIndex: 0.10, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  'BI': { currency: 'BIF', name: 'Burundi', symbol: 'FBu', affordability: 'low', purchasingPowerIndex: 0.04, gdpPerCapita: 0.2, marketTier: 'budget', localMultiplier: 0.11 },
  'SS': { currency: 'SSP', name: 'South Sudan', symbol: '£', affordability: 'low', purchasingPowerIndex: 0.06, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.12 },
  'SO': { currency: 'SOS', name: 'Somalia', symbol: 'Sh', affordability: 'low', purchasingPowerIndex: 0.05, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.11 },
  'DJ': { currency: 'DJF', name: 'Djibouti', symbol: 'Fdj', affordability: 'low', purchasingPowerIndex: 0.14, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.18 },
  'ER': { currency: 'ERN', name: 'Eritrea', symbol: 'Nfk', affordability: 'low', purchasingPowerIndex: 0.06, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.12 },
  
  // AFRICA - Central
  'CD': { currency: 'CDF', name: 'DR Congo', symbol: 'FC', affordability: 'low', purchasingPowerIndex: 0.04, gdpPerCapita: 0.6, marketTier: 'budget', localMultiplier: 0.1 },
  'CG': { currency: 'XAF', name: 'Republic of Congo', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.13, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.2 },
  'CM': { currency: 'XAF', name: 'Cameroon', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.15, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.24 },
  'GA': { currency: 'XAF', name: 'Gabon', symbol: 'CFA', affordability: 'medium', purchasingPowerIndex: 0.50, gdpPerCapita: 8, marketTier: 'mid-market', localMultiplier: 0.55 },
  'TD': { currency: 'XAF', name: 'Chad', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.08, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.14 },
  'CF': { currency: 'XAF', name: 'Central African Republic', symbol: 'CFA', affordability: 'low', purchasingPowerIndex: 0.04, gdpPerCapita: 0.5, marketTier: 'budget', localMultiplier: 0.11 },
  'GQ': { currency: 'XAF', name: 'Equatorial Guinea', symbol: 'CFA', affordability: 'medium', purchasingPowerIndex: 0.52, gdpPerCapita: 8, marketTier: 'mid-market', localMultiplier: 0.42 },
  'AO': { currency: 'AOA', name: 'Angola', symbol: 'Kz', affordability: 'low', purchasingPowerIndex: 0.20, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.22 },
  
  // AFRICA - Southern
  'ZA': { currency: 'ZAR', name: 'South Africa', symbol: 'R', affordability: 'low', purchasingPowerIndex: 0.155, gdpPerCapita: 7, marketTier: 'budget', localMultiplier: 0.97 },
  'NA': { currency: 'NAD', name: 'Namibia', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.38, gdpPerCapita: 5, marketTier: 'mid-market', localMultiplier: 0.32 },
  'BW': { currency: 'BWP', name: 'Botswana', symbol: 'P', affordability: 'medium', purchasingPowerIndex: 0.44, gdpPerCapita: 8, marketTier: 'mid-market', localMultiplier: 0.36 },
  'ZM': { currency: 'ZMW', name: 'Zambia', symbol: 'ZK', affordability: 'low', purchasingPowerIndex: 0.13, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.18 },
  'ZW': { currency: 'ZWL', name: 'Zimbabwe', symbol: '$', affordability: 'low', purchasingPowerIndex: 0.09, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  'MW': { currency: 'MWK', name: 'Malawi', symbol: 'MK', affordability: 'low', purchasingPowerIndex: 0.07, gdpPerCapita: 0.6, marketTier: 'budget', localMultiplier: 0.13 },
  'MZ': { currency: 'MZN', name: 'Mozambique', symbol: 'MT', affordability: 'low', purchasingPowerIndex: 0.08, gdpPerCapita: 0.5, marketTier: 'budget', localMultiplier: 0.14 },
  'MG': { currency: 'MGA', name: 'Madagascar', symbol: 'Ar', affordability: 'low', purchasingPowerIndex: 0.06, gdpPerCapita: 0.5, marketTier: 'budget', localMultiplier: 0.12 },
  'LS': { currency: 'LSL', name: 'Lesotho', symbol: 'L', affordability: 'low', purchasingPowerIndex: 0.15, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.19 },
  'SZ': { currency: 'SZL', name: 'Eswatini', symbol: 'E', affordability: 'low', purchasingPowerIndex: 0.18, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.2 },
  
  // AFRICA - Islands
  'SC': { currency: 'SCR', name: 'Seychelles', symbol: 'â‚¨', affordability: 'medium', purchasingPowerIndex: 0.60, gdpPerCapita: 15, marketTier: 'mid-market', localMultiplier: 0.48 },
  'KM': { currency: 'KMF', name: 'Comoros', symbol: 'CF', affordability: 'low', purchasingPowerIndex: 0.09, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.15 },
  'ST': { currency: 'STN', name: 'SÃ£o TomÃ© & PrÃ­ncipe', symbol: 'Db', affordability: 'low', purchasingPowerIndex: 0.10, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.15 },
  
  // AMERICAS - North
  'US': { currency: 'USD', name: 'United States', symbol: '$', affordability: 'high', purchasingPowerIndex: 1.20, gdpPerCapita: 70, marketTier: 'premium', localMultiplier: 1.00 },
  'CA': { currency: 'CAD', name: 'Canada', symbol: 'C$', affordability: 'high', purchasingPowerIndex: 1.00, gdpPerCapita: 52, marketTier: 'premium', localMultiplier: 0.85 },
  'MX': { currency: 'MXN', name: 'Mexico', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.55, gdpPerCapita: 10, marketTier: 'mid-market', localMultiplier: 0.60 },
  
  // AMERICAS - Central
  'GT': { currency: 'GTQ', name: 'Guatemala', symbol: 'Q', affordability: 'low', purchasingPowerIndex: 0.20, gdpPerCapita: 5, marketTier: 'budget', localMultiplier: 0.22 },
  'HN': { currency: 'HNL', name: 'Honduras', symbol: 'L', affordability: 'low', purchasingPowerIndex: 0.16, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.2 },
  'SV': { currency: 'USD', name: 'El Salvador', symbol: '$', affordability: 'low', purchasingPowerIndex: 0.22, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.24 },
  'NI': { currency: 'NIO', name: 'Nicaragua', symbol: 'C$', affordability: 'low', purchasingPowerIndex: 0.13, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.18 },
  'CR': { currency: 'CRC', name: 'Costa Rica', symbol: 'â‚¡', affordability: 'medium', purchasingPowerIndex: 0.46, gdpPerCapita: 13, marketTier: 'mid-market', localMultiplier: 0.38 },
  'PA': { currency: 'USD', name: 'Panama', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.60, gdpPerCapita: 16, marketTier: 'mid-market', localMultiplier: 0.5 },
  'BZ': { currency: 'BZD', name: 'Belize', symbol: 'BZ$', affordability: 'medium', purchasingPowerIndex: 0.38, gdpPerCapita: 5, marketTier: 'mid-market', localMultiplier: 0.32 },
  
  // AMERICAS - Caribbean
  'CU': { currency: 'CUP', name: 'Cuba', symbol: '$', affordability: 'low', purchasingPowerIndex: 0.11, gdpPerCapita: 9, marketTier: 'budget', localMultiplier: 0.16 },
  'DO': { currency: 'DOP', name: 'Dominican Republic', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.38, gdpPerCapita: 9, marketTier: 'mid-market', localMultiplier: 0.32 },
  'HT': { currency: 'HTG', name: 'Haiti', symbol: 'G', affordability: 'low', purchasingPowerIndex: 0.07, gdpPerCapita: 1, marketTier: 'budget', localMultiplier: 0.13 },
  'JM': { currency: 'JMD', name: 'Jamaica', symbol: 'J$', affordability: 'medium', purchasingPowerIndex: 0.35, gdpPerCapita: 5, marketTier: 'mid-market', localMultiplier: 0.3 },
  'TT': { currency: 'TTD', name: 'Trinidad & Tobago', symbol: 'TT$', affordability: 'medium', purchasingPowerIndex: 0.63, gdpPerCapita: 17, marketTier: 'mid-market', localMultiplier: 0.5 },
  'BB': { currency: 'BBD', name: 'Barbados', symbol: 'Bds$', affordability: 'medium', purchasingPowerIndex: 0.57, gdpPerCapita: 18, marketTier: 'mid-market', localMultiplier: 0.46 },
  'BS': { currency: 'BSD', name: 'Bahamas', symbol: 'B$', affordability: 'high', purchasingPowerIndex: 0.88, gdpPerCapita: 31, marketTier: 'premium', localMultiplier: 0.75 },
  
  // AMERICAS - South
  'BR': { currency: 'BRL', name: 'Brazil', symbol: 'R$', affordability: 'medium', purchasingPowerIndex: 0.22, gdpPerCapita: 9, marketTier: 'mid-market', localMultiplier: 1.0 },
  'AR': { currency: 'ARS', name: 'Argentina', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.28, gdpPerCapita: 11, marketTier: 'mid-market', localMultiplier: 0.50 },
  'CO': { currency: 'COP', name: 'Colombia', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.31, gdpPerCapita: 6, marketTier: 'mid-market', localMultiplier: 0.55 },
  'CL': { currency: 'CLP', name: 'Chile', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.46, gdpPerCapita: 16, marketTier: 'mid-market', localMultiplier: 0.62 },
  'PE': { currency: 'PEN', name: 'Peru', symbol: 'S/', affordability: 'medium', purchasingPowerIndex: 0.33, gdpPerCapita: 7, marketTier: 'mid-market', localMultiplier: 0.28 },
  'VE': { currency: 'VES', name: 'Venezuela', symbol: 'Bs.S', affordability: 'low', purchasingPowerIndex: 0.06, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.12 },
  'EC': { currency: 'USD', name: 'Ecuador', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.35, gdpPerCapita: 6, marketTier: 'mid-market', localMultiplier: 0.3 },
  'BO': { currency: 'BOB', name: 'Bolivia', symbol: 'Bs.', affordability: 'low', purchasingPowerIndex: 0.20, gdpPerCapita: 4, marketTier: 'budget', localMultiplier: 0.22 },
  'PY': { currency: 'PYG', name: 'Paraguay', symbol: 'â‚²', affordability: 'low', purchasingPowerIndex: 0.24, gdpPerCapita: 6, marketTier: 'budget', localMultiplier: 0.24 },
  'UY': { currency: 'UYU', name: 'Uruguay', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.52, gdpPerCapita: 18, marketTier: 'mid-market', localMultiplier: 0.42 },
  'GY': { currency: 'GYD', name: 'Guyana', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.38, gdpPerCapita: 18, marketTier: 'mid-market', localMultiplier: 0.32 },
  'SR': { currency: 'SRD', name: 'Suriname', symbol: '$', affordability: 'medium', purchasingPowerIndex: 0.42, gdpPerCapita: 5, marketTier: 'mid-market', localMultiplier: 0.34 },
  
  // OCEANIA
  'AU': { currency: 'AUD', name: 'Australia', symbol: 'A$', affordability: 'high', purchasingPowerIndex: 0.92, gdpPerCapita: 65, marketTier: 'premium', localMultiplier: 1.05 },
  'NZ': { currency: 'NZD', name: 'New Zealand', symbol: 'NZ$', affordability: 'high', purchasingPowerIndex: 0.95, gdpPerCapita: 48, marketTier: 'premium', localMultiplier: 0.85 },
  'FJ': { currency: 'FJD', name: 'Fiji', symbol: 'FJ$', affordability: 'medium', purchasingPowerIndex: 0.31, gdpPerCapita: 5, marketTier: 'mid-market', localMultiplier: 0.28 },
  'PG': { currency: 'PGK', name: 'Papua New Guinea', symbol: 'K', affordability: 'low', purchasingPowerIndex: 0.16, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.2 },
  'SB': { currency: 'SBD', name: 'Solomon Islands', symbol: 'SI$', affordability: 'low', purchasingPowerIndex: 0.11, gdpPerCapita: 2, marketTier: 'budget', localMultiplier: 0.16 },
  'VU': { currency: 'VUV', name: 'Vanuatu', symbol: 'VT', affordability: 'low', purchasingPowerIndex: 0.13, gdpPerCapita: 3, marketTier: 'budget', localMultiplier: 0.18 },
  'NC': { currency: 'XPF', name: 'New Caledonia', symbol: 'â‚£', affordability: 'high', purchasingPowerIndex: 0.85, gdpPerCapita: 35, marketTier: 'premium', localMultiplier: 0.7 },
  'PF': { currency: 'XPF', name: 'French Polynesia', symbol: 'â‚£', affordability: 'high', purchasingPowerIndex: 0.80, gdpPerCapita: 18, marketTier: 'premium', localMultiplier: 0.65 },
  
  // DEFAULT FALLBACK
  'DEFAULT': { currency: 'GBP', name: 'United Kingdom', symbol: '£', affordability: 'high', purchasingPowerIndex: 0.95, gdpPerCapita: 48, marketTier: 'premium', localMultiplier: 1.0 }
};

// ==================== FIXED CALCULATION FUNCTIONS ====================
const getMinimumViablePrice = (basePrice: number, valueTier?: string, marketTier: string = 'premium'): number => {
  let minMultiplier = 1.0;

  switch (valueTier) {
    case 'essential': minMultiplier = 0.15; break;
    case 'professional': minMultiplier = 0.22; break;
    case 'enterprise': minMultiplier = 0.30; break;
    default: minMultiplier = 0.18;
  }

  switch (marketTier) {
    case 'premium': minMultiplier = Math.max(minMultiplier, 0.38); break;
    case 'mid-market': minMultiplier = Math.max(minMultiplier, 0.25); break;
    case 'budget': minMultiplier = Math.max(minMultiplier, 0.15); break;
  }

  return Math.round(basePrice * minMultiplier);
};

const calculateAdjustedPrice = (basePrice: number, countryCode: string, valueTier?: string): number => {
  const config = COUNTRY_PRICING_CONFIG[countryCode] || COUNTRY_PRICING_CONFIG.DEFAULT;
  const currencyRate = CURRENCY_RATES[config.currency] || 1;
  
  // Apply purchasing power adjustment
  const pppMultiplier = config.purchasingPowerIndex;
  const localAdjustment = config.localMultiplier;
  
  // Calculate adjusted price in GBP
  let adjustedGBP = basePrice * pppMultiplier * localAdjustment;
  
  // Ensure minimum viable price
  const minViableGBP = getMinimumViablePrice(basePrice, valueTier, config.marketTier);
  adjustedGBP = Math.max(adjustedGBP, minViableGBP);
  
  // Convert to local currency
  let adjustedPrice = Math.round(adjustedGBP * currencyRate);
  
  // Smart rounding
  if (config.currency === 'INR' || config.currency === 'PKR') {
    adjustedPrice = Math.round(adjustedPrice / 100) * 100;
  } else if (config.marketTier === 'premium') {
    adjustedPrice = Math.round(adjustedPrice / 50) * 50;
  } else {
    adjustedPrice = Math.round(adjustedPrice / 20) * 20;
  }
  
  return adjustedPrice;
};

// ==================== REST OF THE CODE ====================
const createCountryPricing = (countryCode: string): CountryPricing => {
  const config = COUNTRY_PRICING_CONFIG[countryCode] || COUNTRY_PRICING_CONFIG.DEFAULT;
  const ukPricing = createUKPricing();
  const countryPricing: PricingServices = {};
  
  for (const [key, pricing] of Object.entries(ukPricing)) {
    if (pricing.pricingType === 'free') {
      countryPricing[key] = { ...pricing };
    } else {
      const adjustedMin = calculateAdjustedPrice(pricing.min, countryCode, pricing.valueTier);
      const adjustedMax = pricing.max === pricing.min ? adjustedMin : calculateAdjustedPrice(pricing.max, countryCode, pricing.valueTier);
      
      countryPricing[key] = {
        ...pricing,
        min: adjustedMin,
        max: adjustedMax
      };
    }
  }
  
  return {
    name: config.name,
    currency: config.currency,
    symbol: config.symbol,
    services: countryPricing,
    affordability: config.affordability,
    purchasingPowerIndex: config.purchasingPowerIndex,
    gdpPerCapita: config.gdpPerCapita,
    marketTier: config.marketTier,
    localMultiplier: config.localMultiplier
  };
};

const COUNTRY_PRICING: CountryPricingMap = {};
for (const countryCode of Object.keys(COUNTRY_PRICING_CONFIG)) {
  if (countryCode !== 'DEFAULT') {
    COUNTRY_PRICING[countryCode] = createCountryPricing(countryCode);
  }
}
COUNTRY_PRICING.DEFAULT = createCountryPricing('GB');

// ==================== EXPORTED FUNCTIONS ====================
export const getPricingByCountry = (countryCode: string): CountryPricing => {
  return COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.DEFAULT;
};

export const getServiceById = (serviceId: string, countryCode: string) => {
  const pricing = getPricingByCountry(countryCode);
  const service = pricing.services[serviceId];
  
  if (!service) {
    console.error(`Service not found: ${serviceId}`);
    return null;
  }
  
  return {
    ...service,
    countryInfo: {
      name: pricing.name,
      currency: pricing.currency,
      symbol: pricing.symbol,
      marketTier: pricing.marketTier
    }
  };
};

export const formatPrice = (amount: number, currency: string, symbol: string, pricingType?: 'fixed' | 'percentage' | 'free'): string => {
  if (pricingType === 'free' || amount === 0) return 'Free';
  if (pricingType === 'percentage') return `${(amount * 100)}%`;
  
  const formatted = amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
  
  if (['AED', 'SAR', 'QAR', 'KWD', 'OMR', 'BHD', 'JOD'].includes(currency)) {
    return `${formatted} ${symbol}`;
  }
  
  return `${symbol}${formatted}`;
};

export const getPriceRange = (serviceKey: string, countryCode: string | null, isAnnual: boolean = false): string => {
  if (!countryCode) return 'Loading...';
  
  const pricing = getPricingByCountry(countryCode);
  const servicePricing = pricing.services[serviceKey];
  
  if (!servicePricing) {
    console.warn(`Service key not found: ${serviceKey}`);
    return 'Price on request';
  }
  
  if (servicePricing.pricingType === 'free') return 'Free';
  if (servicePricing.pricingType === 'percentage') {
    return formatPrice(servicePricing.min, pricing.currency, pricing.symbol, 'percentage');
  }
  
  const applyDiscount = (price: number): number => isAnnual ? Math.round(price * 0.85) : price;

  const minPrice = applyDiscount(servicePricing.min);
  const maxPrice = applyDiscount(servicePricing.max);

  const formattedMin = formatPrice(minPrice, pricing.currency, pricing.symbol, 'fixed');

  // Fixed price (e.g. monthly care plans where min === max)
  if (servicePricing.min === servicePricing.max) {
    return formattedMin;
  }

  const formattedMax = formatPrice(maxPrice, pricing.currency, pricing.symbol, 'fixed');
  return `${formattedMin} – ${formattedMax}`;
};

export const getCountryInfo = (countryCode: string) => {
  const pricing = getPricingByCountry(countryCode);
  return {
    countryCode,
    countryName: pricing.name,
    currency: pricing.currency,
    symbol: pricing.symbol,
    affordability: pricing.affordability,
    purchasingPowerIndex: pricing.purchasingPowerIndex,
    gdpPerCapita: pricing.gdpPerCapita,
    marketTier: pricing.marketTier,
    localMultiplier: pricing.localMultiplier
  };
};

export const getAllCountries = () => {
  return Object.entries(COUNTRY_PRICING_CONFIG)
    .filter(([code]) => code !== 'DEFAULT')
    .map(([code, config]) => ({
      code,
      name: config.name,
      currency: config.currency,
      symbol: config.symbol,
      affordability: config.affordability,
      marketTier: config.marketTier,
      gdpPerCapita: config.gdpPerCapita
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getMerchPrice = (baseGBP: number, countryCode: string): number => {
  const config = COUNTRY_PRICING_CONFIG[countryCode] || COUNTRY_PRICING_CONFIG.DEFAULT;
  const currencyRate = CURRENCY_RATES[config.currency] || 1;
  // PPP floor at 20% so prices never collapse to near-zero for any country
  const pppFactor = Math.max(config.purchasingPowerIndex * config.localMultiplier, 0.2);
  const raw = baseGBP * pppFactor * currencyRate;
  // Consumer-friendly rounding (never rounds to 0)
  if (raw < 10)   return Math.max(1, Math.round(raw));
  if (raw < 100)  return Math.round(raw / 5) * 5;
  if (raw < 1000) return Math.round(raw / 10) * 10;
  if (raw < 5000) return Math.round(raw / 100) * 100;
  return Math.round(raw / 500) * 500;
};

export const getCurrencyRate = (fromCurrency: string, toCurrency: string): number => {
  const fromRate = CURRENCY_RATES[fromCurrency] || 1;
  const toRate = CURRENCY_RATES[toCurrency] || 1;
  return toRate / fromRate;
};

export const estimatePriceInCurrency = (price: number, fromCountryCode: string, toCountryCode: string): number => {
  const fromConfig = COUNTRY_PRICING_CONFIG[fromCountryCode] || COUNTRY_PRICING_CONFIG.DEFAULT;
  const toConfig = COUNTRY_PRICING_CONFIG[toCountryCode] || COUNTRY_PRICING_CONFIG.DEFAULT;
  
  const conversionRate = getCurrencyRate(fromConfig.currency, toConfig.currency);
  let convertedPrice = price * conversionRate;
  
  const pppAdjustment = toConfig.purchasingPowerIndex / fromConfig.purchasingPowerIndex;
  convertedPrice = convertedPrice * pppAdjustment;
  
  return Math.round(convertedPrice);
};
