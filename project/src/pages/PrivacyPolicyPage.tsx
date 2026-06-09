import { motion } from "framer-motion";
import { Shield, Lock, User, Mail, Globe, Calendar } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: User,
      title: "Information We Collect",
      content: `We collect information necessary to provide our design services effectively:

• Personal Information: Name, email address, phone number, company details
• Project Information: Briefs, specifications, content you provide
• Payment Information: Billing details (processed securely via Stripe/Wise)
• Communication Data: Emails, messages, and project feedback
• Usage Data: Anonymized website analytics via Google Analytics

We only collect what is necessary and always with your knowledge.`
    },
    {
      icon: Mail,
      title: "How We Use Your Information",
      content: `Your information helps us deliver exceptional service:

• To provide and manage our design and development services
• To process payments in your local currency using country-specific rates
• To communicate about projects, updates, and support
• To improve our services and user experience
• To send marketing communications (with explicit consent only)
• To comply with UK legal and tax obligations`
    },
    {
      icon: Lock,
      title: "Data Sharing & Security",
      content: `We take data protection seriously:

Team Collaboration: We work with qualified designers and developers in India under strict confidentiality agreements and GDPR-compliant safeguards including Standard Contractual Clauses.

Service Providers: We use trusted partners for payments (Stripe/Wise with local currency processing), hosting, and communication tools.

Security Measures: Encryption in transit and at rest, access controls, regular security audits, and secure data storage.

We never sell your personal data.`
    },
    {
      icon: Calendar,
      title: "Data Retention & Your Rights",
      content: `Retention Periods:
• Project data: 6 years for legal/tax compliance
• Marketing data: Until consent withdrawal
• Analytics: 26 months maximum
• Pricing data: Market-specific rates stored for 1 year

Your GDPR Rights:
• Access your personal data
• Correct inaccurate information
• Request data deletion
• Restrict or object to processing
• Data portability
• Withdraw consent anytime

To exercise these rights, contact: hellonicheux@gmail.com`
    },
    {
      icon: Globe,
      title: "International Data Transfers",
      content: `As a UK-based company working with international talent:

• We transfer data to India under GDPR Article 46 safeguards
• We use Standard Contractual Clauses approved by UK ICO
• All contractors sign confidentiality agreements
• Data is encrypted during transfer and storage
• We conduct regular compliance reviews
• Local pricing data processed in client's region when possible

These measures ensure your data receives equivalent protection outside the UK.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <a href="/" className="text-base text-white/70 hover:text-white transition-colors">
                ← Back to Home
              </a>
              <div className="text-sm text-white/50">
                Effective: November 2024
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <Shield size={32} className="text-[#89B1CC]" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-light tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-base sm:text-lg text-white/80 mt-1">
                  UK GDPR Compliant • Local Currency Processing • International Standards
                </p>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-lg text-white/80 leading-relaxed">
              At NicheUX, we respect your privacy and are committed to protecting your personal 
              data in compliance with UK GDPR and the Data Protection Act 2018. This policy 
              explains how we handle your information, including our country-specific pricing 
              and payment processing.
            </p>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={section.title} className="border-b border-white/10 pb-12 last:border-b-0">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <section.icon size={24} className="text-[#89B1CC]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-playfair font-light mb-2">{section.title}</h2>
                    <div className="h-px w-16 bg-[#89B1CC]" />
                  </div>
                </div>
                
                <div className="pl-16">
                  <pre className="text-base text-white/80 leading-relaxed whitespace-pre-wrap font-sans">
                    {section.content}
                  </pre>
                </div>
              </div>
            ))}

            {/* Contact Information */}
            <div className="pt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-xl font-playfair font-light mb-4">Contact Us</h3>
                  <p className="text-base text-white/80 mb-4">
                    For privacy-related questions or to exercise your rights:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Mail size={18} className="text-[#89B1CC]" />
                      <div>
                        <div className="text-sm text-white/60">EMAIL</div>
                        <div className="text-base">hellonicheux@gmail.com</div>
                      </div>
                    </div>
                    <p className="text-sm text-white/60">
                      Response time: 1-2 business days
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-xl font-playfair font-light mb-4">Pricing & Currency</h3>
                  <p className="text-base text-white/80 mb-4">
                    We display prices in your local currency and offer market-appropriate pricing:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E9C672]" />
                      <span className="text-base">Real-time currency conversion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E9C672]" />
                      <span className="text-base">Country-specific market rates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E9C672]" />
                      <span className="text-base">Local payment processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates Notice */}
            <div className="pt-8">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-base text-center text-white/80">
                  This policy may be updated periodically. Significant changes will be 
                  communicated via email or website notice. Continued use of our services 
                  constitutes acceptance of updated terms.
                </p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-base text-white/80 mb-1">
                    Need help with privacy matters?
                  </p>
                  <a
                    href="mailto:hellonicheux@gmail.com?subject=Privacy%20Policy%20Question"
                    className="text-[#89B1CC] hover:text-[#89B1CC]/80 transition-colors text-sm"
                  >
                    Email our privacy contact
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex gap-4">
                    <a
                      href="/cookies"
                      className="text-base text-white/70 hover:text-white transition-colors"
                    >
                      Cookies Policy
                    </a>
                    <a
                      href="/terms"
                      className="text-base text-white/70 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </a>
                  </div>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 text-base text-white/70 hover:text-white transition-colors"
                  >
                    ← Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


