// src/utils/packageMappings.ts - COMPLETE WITH ALL PACKAGES AND SERVICES
// Main function to get selection from URL
export const getSelectionFromURL = (): { type: 'package' | 'service' | null; name: string | null } => {
  const params = new URLSearchParams(window.location.search);
  const selection = params.get('selection');
  const selectionType = params.get('selectionType');
  
  if (!selection) return { type: null, name: null };
  
  const cleanName = selection.replace(/\([^)]*\)/g, '').trim();
  
  if (selectionType === 'package' || selectionType === 'service') {
    return { type: selectionType, name: cleanName };
  }
  
  if (isPackage(cleanName)) {
    return { type: 'package', name: cleanName };
  }
  
  return { type: 'service', name: cleanName };
};

export const isPackage = (serviceName: string): boolean => {
  const cleanName = serviceName.replace(/\([^)]*\)/g, '').trim();
  
  const packageKeywords = [
    // WEB DEVELOPMENT PACKAGES
    'Hand-Built Website',
    'Custom merchify Store',
    'Enterprise Solutions',
    'Essential Care',
    'Professional Care',
    'Enterprise Care',
    'Web Development Project',
    
    // STRATEGY & DESIGN PACKAGES
    'UX Audit & Strategy',
    'Complete UI/UX Design',
    'Design System',
    'Design Maintenance',
    'Design Partnership',
    'Enterprise Design Ops',
    
    // PRINT & BRAND DESIGN PACKAGES - ADDED ALL PRINT SERVICES
    'Logo Design',
    'Basic Brand Kit',
    'Complete Brand Identity',
    'Brand Guidelines Document',
    '4-page Brochure',
    '8-page Brochure',
    '12-page Catalogue',
    '16-page Catalogue',
    'Custom folds',
    'Single-sided Flyer',
    'Double-sided Flyer',
    'Poster (up to A2)',
    'Menu (4 pages)',
    'Social Media Kit',
    'Email Template',
    'Web Banners',
    'Presentation Design',
    'Business Cards',
    'Letterhead + Envelope',
    'Presentation Folder',
    'Complete Stationery Suite',
    'Pull-up Banner',
    'Retail Store Banner',
    'Window Graphics',
    'Billboard Design',
    'Main Menu (4 pages)',
    'Drinks Menu',
    'Specials Board',
    'Takeaway Menu',
    'Starter Brand Kit',
    'Complete Brand Launch',
    'Marketing Pro Package',
    'Business Cards',
    
    // SOCIAL MEDIA PACKAGES
    'Social Media Starter Plan',
    'Social Media Professional Plan',
    'Social Media Enterprise Plan',
    
    // MOTION GRAPHICS PACKAGES
    'Motion Excellence',
    'AI Innovation Suite',
    'Creative Power Duo',
    'Starter Creative Suite',
    'Pro Creative Powerhouse',
    'Enterprise Visual Suite',
    '30s Explainer Video',
    'Logo Animation',
    
    // ILLUSTRATION PACKAGES
    'Game Character Package',
    'Children\'s Book Package',
    'Visual Development Kit',
    'Book Illustration Suite',
    'Brand Essentials Package',
    'Character Design Suite',
    'Single Character Design',
    'Character Turnaround Sheet',
    'Character Expression Sheet',
    'Character Series (3 characters)',
    'Character Style Guide',
    'Character Portrait',
    'Children\'s Book Page',
    'Book Cover Illustration',
    'Editorial Illustration',
    'Digital Painting',
    'Coloring Book Page',
    'Package Illustration',
    'Visual Sequence Panel',
    'Storyboard Page (6 panels)',
    'Commercial Sequence',
    'Comic Strip Page',
    'Keyframe Art',
    'Pre-visualization Set',
    'Character Concept Sheet',
    'Environment Concept',
    'Prop Design',
    'Mood Board Creation',
    'Game Asset Concept',
    
    // CONSULTATION PACKAGES
    'UI/UX Design Consultation',
    'Web Development Consultation',
    'Print Design Consultation',
    'Social Media Consultation',
    'Motion Graphics Consultation',
    'Motion Graphics & AI Video Consultation',
    'Illustration Consultation',
    'Illustration & Character Design Consultation'
  ];
  
  return packageKeywords.some(keyword => 
    cleanName === keyword || cleanName.includes(keyword)
  );
};

export const getServicesForPackage = (packageName: string): string[] => {
  const cleanPackageName = packageName.replace(/\([^)]*\)/g, '').trim();
  
  const packageServicesMap: Record<string, string[]> = {
    // WEB DEVELOPMENT
    'Hand-Built Website': [
      'Custom-Coded Design',
      'CMS Integration',
      'Mobile-Responsive Build',
      'SEO Setup',
      'Contact Form Integration',
      'Training & Documentation'
    ],
    'Custom merchify Store': [
      'Custom Theme Development',
      'Product & Collection Setup',
      'Essential App Integrations',
      'Payment & Shipping Configuration',
      'Checkout Optimization',
      'Mobile merchping Experience',
      'Inventory Management Setup',
      'Launch Support & Training'
    ],
    'Enterprise Solutions': [
      'Custom App Development',
      'ERP/CRM Integrations',
      'Multi-currency Support',
      'Advanced Analytics',
      'API Development',
      'Dedicated Support',
      'Ongoing Optimization'
    ],
    'Essential Care': [
      'Weekly Security Updates',
      'Monthly Performance Optimization',
      'Daily Automated Backups',
      'Uptime Monitoring',
      'Basic Bug Fixes',
      'Core Software Updates',
      '24/7 Security Monitoring',
      'Monthly Performance Reports'
    ],
    'Professional Care': [
      'All Essential Care Services',
      'Content Updates (4 hours/month)',
      'SEO Monitoring & Optimization',
      'Conversion Rate Optimization',
      'Advanced Performance Tuning',
      'Priority Support (4-hour response)',
      'Monthly Strategy Calls',
      'Advanced Analytics Reporting',
      'Plugin/Extension Updates',
      'Database Optimization'
    ],
    'Enterprise Care': [
      'All Professional Care Services',
      'Unlimited Content Updates',
      'Dedicated Account Manager',
      '24/7 Priority Support (1-hour response)',
      'Advanced Security Hardening',
      'A/B Testing Implementation',
      'Custom Feature Development (2 hours/month)',
      'Weekly Performance Reviews',
      'Competitor Analysis',
      'Advanced Caching Optimization',
      'CDN Management',
      'Emergency Response Team'
    ],
    
    // STRATEGY & DESIGN
    'UX Audit & Strategy': [
      'Heuristic Evaluation',
      'User Flow Analysis',
      'Usability Report',
      'Prioritized Recommendations',
      'Quick Wins Document'
    ],
    'Complete UI/UX Design': [
      'User Research & Personas',
      'Information Architecture',
      'Wireframes & User Flows',
      'High-Fidelity UI Design',
      'Interactive Prototypes',
      'Usability Testing',
      'Developer Handoff Package'
    ],
    'Design System': [
      'Component Library',
      'Design Tokens & Variables',
      'Usage Guidelines',
      'Accessibility Standards',
      'Figma/Sketch Files',
      'Documentation Site'
    ],
    
    // PRINT & BRAND DESIGN - ADDED ALL PRINT SERVICES
    'Logo Design': ['3 concepts, 2 revisions, final files'],
    'Basic Brand Kit': ['Logo + colors + typography + basic guidelines'],
    'Complete Brand Identity': ['Full brand system with comprehensive guidelines'],
    'Brand Guidelines Document': ['Detailed usage rules and specifications'],
    '4-page Brochure': ['Standard tri-fold or bi-fold'],
    '8-page Brochure': ['Perfect for product catalogs'],
    '12-page Catalogue': ['Comprehensive product showcase'],
    '16-page Catalogue': ['Extensive brand storytelling'],
    'Custom folds': ['Z-fold, Gate fold options'],
    'Single-sided Flyer': ['Standard A5 or A4'],
    'Double-sided Flyer': ['Front and back design'],
    'Poster (up to A2)': ['Large format attention-grabber'],
    'Menu (4 pages)': ['Restaurant or cafe menu'],
    'Social Media Kit': ['Set of 10 platform-optimized graphics'],
    'Email Template': ['Responsive email newsletter design'],
    'Web Banners': ['Set of 5 banner ads'],
    'Presentation Design': ['10-slide branded template'],
    'Business Cards': ['Front/back, standard stock'],
    'Letterhead + Envelope': ['Professional correspondence'],
    'Presentation Folder': ['With pockets and branding'],
    'Complete Stationery Suite': ['Cards, letterhead, envelope'],
    'Pull-up Banner': ['Retractable exhibition banner'],
    'Retail Store Banner': ['Storefront or in-store'],
    'Window Graphics': ['Frosted or full-color prints'],
    'Billboard Design': ['Large-scale outdoor advertising'],
    'Main Menu (4 pages)': ['Complete food menu'],
    'Drinks Menu': ['Beverage and wine list'],
    'Specials Board': ['Daily or weekly specials'],
    'Takeaway Menu': ['Optimized for takeout'],
    'Starter Brand Kit': [
      'Logo Design',
      'Business Cards',
      'Basic Brand Guidelines',
      'Social Media Kit'
    ],
    'Complete Brand Launch': [
      'Full Brand Identity',
      'Stationery Suite',
      'Marketing Brochure',
      'Digital Graphics Package'
    ],
    'Marketing Pro Package': [
      'Brochure + Flyers',
      'Social Media Kit',
      'Email Templates',
      'Presentation Design'
    ],
    
    // SOCIAL MEDIA
    'Social Media Starter Plan': [
      'Strategy Development',
      'Content Calendar',
      '10 Posts/Month',
      'Basic Analytics',
      'Community Management'
    ],
    'Social Media Professional Plan': [
      'All Starter Plan Features',
      '20 Posts/Month',
      'Advanced Analytics',
      'Paid Advertising Setup',
      'Influencer Outreach',
      'Competitor Analysis'
    ],
    
    // MOTION GRAPHICS
    'Motion Excellence': [
      '60s Explainer Video',
      'Logo Animation',
      'Social Media Video Pack',
      'Professional Editing'
    ],
    'AI Innovation Suite': [
      'AI Video Generation',
      'Style Transfer',
      'Concept Testing',
      'Content Expansion'
    ],
    'Creative Power Duo': [
      'Motion Graphics',
      'AI Video Generation',
      'Professional Editing',
      'Multiple Formats'
    ],
    
    // ILLUSTRATION PACKAGES
    'Game Character Package': [
      'Single Character Design',
      'Turnaround Sheet',
      'Expression Sheet',
      'Character Portrait'
    ],
    'Children\'s Book Package': [
      '15 Illustrated Pages',
      'Cover Illustration',
      'Character Design',
      'Print Preparation'
    ],
    'Brand Essentials Package': [
      'Character Concepts',
      'Environment Concepts',
      'Mood Boards',
      'Style Guide'
    ],
    'Character Design Suite': [
      'Multiple Character Designs',
      'Turnaround Sheets',
      'Expression Sets',
      'Style Guide'
    ],
    'Book Illustration Suite': [
      'Multiple Pages',
      'Cover Design',
      'Character Consistency',
      'Print Setup'
    ],
    
    // INDIVIDUAL ILLUSTRATION SERVICES (treated as packages for selection)
    'Single Character Design': ['Complete character design with personality and backstory'],
    'Character Turnaround Sheet': ['Front, side, back, and 3/4 views with proportions'],
    'Character Expression Sheet': ['8+ emotions and poses showing personality'],
    'Character Series (3 characters)': ['Family or team with relationship dynamics'],
    'Character Style Guide': ['Complete usage documentation and specifications'],
    'Character Portrait': ['High-quality rendered character artwork'],
    'Children\'s Book Page': ['Single illustrated page with character consistency'],
    'Book Cover Illustration': ['Complete cover artwork with typography'],
    'Editorial Illustration': ['Article or blog concept visualization'],
    'Digital Painting': ['Environmental or scene illustration'],
    'Coloring Book Page': ['Line art illustration for coloring'],
    'Package Illustration': ['Product packaging custom artwork'],
    'Visual Sequence Panel': ['Single storyboard panel with composition notes'],
    'Storyboard Page (6 panels)': ['Complete page with camera angles and timing'],
    'Commercial Sequence': ['Advertisement visual planning panels'],
    'Comic Strip Page': ['Complete comic page with panels and text'],
    'Keyframe Art': ['Detailed key moment illustration'],
    'Pre-visualization Set': ['Set of concept panels for planning'],
    'Character Concept Sheet': ['Multiple design explorations for one character'],
    'Environment Concept': ['Location or setting visualization'],
    'Prop Design': ['Object or item design with multiple views'],
    'Mood Board Creation': ['Style exploration and direction board'],
    'Game Asset Concept': ['Character or item design for games'],
    
    // COMBINED PACKAGES
    'Starter Creative Suite': [
      'Logo Design',
      'Basic Website',
      'Social Media Kit',
      'Brand Guidelines'
    ],
    'Pro Creative Powerhouse': [
      'Full Brand Identity',
      'Custom Website',
      'Marketing Materials',
      'Social Media Strategy'
    ],
    'Enterprise Visual Suite': [
      'Complete Brand System',
      'Advanced Website',
      'Multi-platform Content',
      'Ongoing Support'
    ],
    
    // CONSULTATIONS (free)
    'UI/UX Design Consultation': [
      'Strategy Discussion',
      'Project Assessment',
      'Recommendations',
      'Next Steps Planning'
    ],
    'Web Development Consultation': [
      'Technical Assessment',
      'Platform Recommendations',
      'Feature Planning',
      'Timeline Estimation'
    ],
    'Print Design Consultation': [
      'Print Requirements Analysis',
      'Material Selection',
      'Cost Estimation',
      'Production Planning'
    ],
    'Social Media Consultation': [
      'Platform Strategy',
      'Content Planning',
      'Audience Analysis',
      'Performance Metrics'
    ],
    'Motion Graphics Consultation': [
      'Video Strategy',
      'Style Direction',
      'Technical Requirements',
      'Timeline Planning'
    ],
    'Motion Graphics & AI Video Consultation': [
      'Video Strategy',
      'Style Direction',
      'AI Integration',
      'Technical Requirements',
      'Timeline Planning'
    ],
    'Illustration Consultation': [
      'Style Direction',
      'Project Scope',
      'Technical Requirements',
      'Timeline Planning'
    ],
    'Illustration & Character Design Consultation': [
      'Character Development',
      'Style Direction',
      'Project Scope',
      'Technical Requirements',
      'Timeline Planning'
    ]
  };
  
  // Return the services if found, otherwise return the package name itself
  return packageServicesMap[cleanPackageName] || [cleanPackageName];
};

// Old function kept for compatibility
export const getPackageFromURL = () => {
  return getSelectionFromURL();
};

// Helper function to check if it's a consultation (free service)
export const isFreeConsultation = (serviceName: string): boolean => {
  const cleanName = serviceName.replace(/\([^)]*\)/g, '').trim();
  const freeServices = [
    'UI/UX Design Consultation',
    'Web Development Consultation',
    'Print Design Consultation',
    'Social Media Consultation',
    'Motion Graphics Consultation',
    'Motion Graphics & AI Video Consultation',
    'Illustration Consultation',
    'Illustration & Character Design Consultation'
  ];
  
  return freeServices.includes(cleanName);
};

// Helper function to get the category of a service
export const getServiceCategory = (serviceName: string): string => {
  const cleanName = serviceName.replace(/\([^)]*\)/g, '').trim();
  
  if (cleanName.includes('Website') || cleanName.includes('merchify') || cleanName.includes('Care')) {
    return 'Web Development';
  } else if (cleanName.includes('UI/UX') || cleanName.includes('Design System') || cleanName.includes('UX Audit')) {
    return 'Strategy & Design';
  } else if (cleanName.includes('Brand') || cleanName.includes('Logo') || cleanName.includes('Business Card') || 
             cleanName.includes('Brochure') || cleanName.includes('Flyer') || cleanName.includes('Poster') ||
             cleanName.includes('Menu') || cleanName.includes('Banner') || cleanName.includes('Stationery')) {
    return 'Print & Brand';
  } else if (cleanName.includes('Social Media')) {
    return 'Social Media';
  } else if (cleanName.includes('Motion') || cleanName.includes('Video') || cleanName.includes('Animation') || cleanName.includes('AI')) {
    return 'Motion Graphics & AI';
  } else if (cleanName.includes('Character') || cleanName.includes('Illustration') || cleanName.includes('Storyboard') || cleanName.includes('Concept')) {
    return 'Illustration & Character Design';
  } else if (cleanName.includes('Consultation')) {
    return 'Consultation';
  }
  
  return 'Other';
};

