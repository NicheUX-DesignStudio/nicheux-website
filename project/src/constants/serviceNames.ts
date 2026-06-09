// File: src/constants/serviceNames.ts
export const SERVICE_NAMES = {
  // ========== WEB DEVELOPMENT & E-COMMERCE ==========
  'Hand-Built Website': 'web-dev',
  'Custom merchify Store': 'web-dev',
  'Enterprise Solutions': 'web-dev',
  'Essential Care': 'web-dev',
  'Professional Care': 'web-dev',
  'Enterprise Care': 'web-dev',
  'Web Development Consultation': 'consultation',
  
  // ========== STRATEGY & DESIGN ==========
  'UX Audit & Strategy': 'strategy-design',
  'Complete UI/UX Design': 'strategy-design',
  'Design System': 'strategy-design',
  'UI/UX Design Consultation': 'consultation',
  
  // ========== PRINT & BRAND DESIGN ==========
  'Logo Design': 'print-brand',
  'Basic Brand Kit': 'print-brand',
  'Complete Brand Identity': 'print-brand',
  'Brand Guidelines Document': 'print-brand',
  'Starter Brand Kit': 'print-brand',
  'Complete Brand Launch': 'print-brand',
  'Marketing Pro Package': 'print-brand',
  '4-page Brochure': 'print-brand',
  '8-page Brochure': 'print-brand',
  '12-page Catalogue': 'print-brand',
  '16-page Catalogue': 'print-brand',
  'Custom folds': 'print-brand',
  'Print Design Project': 'print-brand',
  'Single-sided Flyer': 'print-brand',
  'Double-sided Flyer': 'print-brand',
  'Poster (up to A2)': 'print-brand',
  'Menu (4 pages)': 'print-brand',
  'Main Menu (4 pages)': 'print-brand',
  'Drinks Menu': 'print-brand',
  'Specials Board': 'print-brand',
  'Takeaway Menu': 'print-brand',
  'Social Media Kit': 'print-brand',
  'Email Template': 'print-brand',
  'Web Banners': 'print-brand',
  'Presentation Design': 'print-brand',
  'Business Cards': 'print-brand',
  'Letterhead + Envelope': 'print-brand',
  'Presentation Folder': 'print-brand',
  'Complete Stationery Suite': 'print-brand',
  'Pull-up Banner': 'print-brand',
  'Retail Store Banner': 'print-brand',
  'Window Graphics': 'print-brand',
  'Billboard Design': 'print-brand',
  'Print Management': 'print-brand-addon',
  'Rush Delivery': 'print-brand-addon',
  'Custom Illustrations': 'print-brand-addon',
  'Print Design Consultation': 'consultation',
  
  // ========== SOCIAL MEDIA MARKETING ==========
  'Social Media Starter Plan': 'social-media',
  'Social Media Professional Plan': 'social-media',
  'Social Media Enterprise Plan': 'social-media',
  'Social Media Consultation': 'consultation',
  
  // ========== MOTION DESIGN & AI VISUALS ==========
  '30s Explainer Video': 'motion-ai',
  'Logo Animation': 'motion-ai',
  'Social Media Video Pack': 'motion-ai',
  'Character Animation': 'motion-ai',
  'AI Video Generation': 'motion-ai',
  'AI Style Transfer': 'motion-ai',
  'Rapid Concept Testing': 'motion-ai',
  'AI Content Expansion': 'motion-ai',
  'Motion Excellence': 'motion-ai',
  'AI Innovation Suite': 'motion-ai',
  'Creative Power Duo': 'motion-ai',
  'Starter Creative Suite': 'motion-ai',
  'Pro Creative Powerhouse': 'motion-ai',
  'Enterprise Visual Suite': 'motion-ai',
  'Motion Graphics Consultation': 'consultation',
  'Motion Graphics & AI Video Consultation': 'consultation',
  
  // ========== ILLUSTRATION & CHARACTER DESIGN ==========
  'Single Character Design': 'illustration',
  'Character Turnaround Sheet': 'illustration',
  'Character Expression Sheet': 'illustration',
  'Character Series (3 characters)': 'illustration',
  'Character Style Guide': 'illustration',
  'Character Portrait': 'illustration',
  'Children\'s Book Page': 'illustration',
  'Book Cover Illustration': 'illustration',
  'Editorial Illustration': 'illustration',
  'Digital Painting': 'illustration',
  'Coloring Book Page': 'illustration',
  'Package Illustration': 'illustration',
  'Visual Sequence Panel': 'illustration',
  'Storyboard Page (6 panels)': 'illustration',
  'Commercial Sequence': 'illustration',
  'Comic Strip Page': 'illustration',
  'Keyframe Art': 'illustration',
  'Pre-visualization Set': 'illustration',
  'Character Concept Sheet': 'illustration',
  'Environment Concept': 'illustration',
  'Prop Design': 'illustration',
  'Mood Board Creation': 'illustration',
  'Game Asset Concept': 'illustration',
  'Game Character Package': 'illustration',
  'Children\'s Book Package': 'illustration',
  'Brand Essentials Package': 'illustration',
  'Character Design Suite': 'illustration',
  'Book Illustration Suite': 'illustration',
  'Illustration Consultation': 'consultation',
  'Illustration & Character Design Consultation': 'consultation',
} as const;

export type ServiceName = keyof typeof SERVICE_NAMES;
export type ServiceCategory = typeof SERVICE_NAMES[ServiceName];

// Helper function to get all service names by category
export const getServicesByCategory = (category: ServiceCategory): ServiceName[] => {
  return Object.entries(SERVICE_NAMES)
    .filter(([_, cat]) => cat === category)
    .map(([name]) => name as ServiceName);
};

// Helper function to get category for a service
export const getCategoryForService = (serviceName: ServiceName): ServiceCategory => {
  return SERVICE_NAMES[serviceName];
};

// List of all service names for easy iteration
export const ALL_SERVICE_NAMES = Object.keys(SERVICE_NAMES) as ServiceName[];