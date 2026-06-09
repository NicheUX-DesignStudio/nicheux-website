import { motion } from "framer-motion";
import { FileText, Briefcase, CreditCard, Scale, AlertCircle } from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: FileText,
      title: "Agreement & Acceptance",
      content: `By engaging NicheUX for services or using our website, you agree to these Terms.

Scope: These terms apply to all services provided by NicheUX, including UI/UX design, web development, branding, and related services.

Proposals: Specific project details, deliverables, timelines, and pricing will be outlined in a separate proposal or contract that incorporates these terms.

Pricing: Prices are displayed in your local currency based on country detection and market-specific rates.

Amendments: We may update these terms periodically. Continued use of our services constitutes acceptance of updated terms.`
    },
    {
      icon: Briefcase,
      title: "Services & Deliverables",
      content: `Project Scope: Services are provided as described in the approved proposal. Any significant changes to scope require a written change order.

Timelines: Estimated timelines are provided in good faith but are not guarantees. Delays caused by client feedback, content provision, or circumstances beyond our control may extend timelines.

Revisions: We include 3 rounds of revisions in our standard packages. Additional revisions may incur extra charges.

Client Responsibilities: You agree to provide timely feedback, content, and approvals. Delays on your part may impact project timelines.

International Delivery: We work with our global team to deliver services according to your regional requirements and timezone.`
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: `Fees: All fees are displayed in your local currency using market-appropriate rates.

Payment Schedule:
• 50% deposit required to commence work
• 50% balance due upon project completion
• Additional services billed monthly

Currency: Payments are processed in your local currency through our payment partners. Exchange rates are updated daily.

Late Payments: Late payments incur 1.5% monthly interest.

Expenses: Client-approved expenses (licenses, stock assets, etc.) are billed in original currency.

Tax: All prices exclude VAT/tax where applicable according to your country's regulations.`
    },
    {
      icon: Scale,
      title: "Intellectual Property & Liability",
      content: `Ownership: Upon full payment, final deliverables become your property. We retain the right to display work in our portfolio unless otherwise agreed in writing.

Third-Party Assets: You warrant that all materials provided do not infringe third-party rights.

Confidentiality: Both parties agree to maintain confidentiality of proprietary information for 3 years post-project.

Liability Limitation: Our maximum liability is limited to the total fees paid for the project. We are not liable for indirect or consequential damages.

Force Majeure: Not liable for delays due to circumstances beyond reasonable control.

Jurisdiction: These terms are governed by English law for all clients, regardless of location.`
    }
  ];

  const importantPoints = [
    "UK Law: These terms are governed by English law. English courts have exclusive jurisdiction.",
    "Local Pricing: Prices displayed in your local currency with market-appropriate rates.",
    "Global Team: Services delivered by our UK-based company with international talent.",
    "Currency Processing: Payments processed in your local currency via secure partners.",
    "Data Protection: GDPR-compliant for all international clients."
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
              <Scale size={32} className="text-[#E9C672]" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-light tracking-tight">
                  Terms of Service
                </h1>
                <p className="text-base sm:text-lg text-white/80 mt-1">
                  For UK-based company serving international clients with local currency pricing.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-[#E9C672] mt-1" size={20} />
              <div>
                <h2 className="text-xl font-playfair font-light mb-4">Important Notice for International Clients</h2>
                <p className="text-base text-white/80 leading-relaxed">
                  NicheUX is a UK-based company providing services internationally. We display prices 
                  in your local currency using market-appropriate rates. By engaging our services, 
                  you agree to these UK-governed terms, which apply regardless of your location.
                </p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importantPoints.map((point, index) => (
              <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm text-white/80">{point}</p>
              </div>
            ))}
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

            {/* International Service Specifics */}
            <div className="pt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-xl font-playfair font-light mb-4">International Delivery</h3>
                  <div className="space-y-3">
                    <p className="text-base text-white/80">
                      Our service model includes:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#89B1CC] mt-2" />
                        <span className="text-base text-white/80">
                          UK-based project management
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#89B1CC] mt-2" />
                        <span className="text-base text-white/80">
                          Global talent collaboration (India team)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#89B1CC] mt-2" />
                        <span className="text-base text-white/80">
                          Timezone-optimized communication
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-xl font-playfair font-light mb-4">Currency & Pricing</h3>
                  <div className="space-y-3">
                    <p className="text-base text-white/80">
                      Our pricing approach:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B097BE] mt-2" />
                        <span className="text-base text-white/80">
                          Automatic country detection
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B097BE] mt-2" />
                        <span className="text-base text-white/80">
                          Market-appropriate pricing algorithms
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B097BE] mt-2" />
                        <span className="text-base text-white/80">
                          Real-time currency conversion
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Acceptance Section */}
            <div className="pt-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-playfair font-light">Acceptance of Terms</h3>
                <p className="text-lg text-white/80">
                  By engaging our services, you confirm acceptance of these Terms, including 
                  our international service delivery model and local currency pricing system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="px-6 py-3 bg-[#E9C672] text-[#121212] font-medium rounded-lg hover:bg-[#E9C672]/90 transition-colors"
                  >
                    Contact for Clarification
                  </a>
                  <a
                    href="mailto:hellonicheux@gmail.com?subject=Terms%20of%20Service"
                    className="px-6 py-3 bg-white/5 border border-white/20 rounded-lg hover:border-[#E9C672] transition-colors"
                  >
                    Email Questions
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-base text-white/80 mb-1">
                    Legal questions?
                  </p>
                  <a
                    href="mailto:hellonicheux@gmail.com?subject=Terms%20of%20Service%20Question"
                    className="text-[#89B1CC] hover:text-[#89B1CC]/80 transition-colors text-sm"
                  >
                    Email our legal contact
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex gap-4">
                    <a
                      href="/privacy"
                      className="text-base text-white/70 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="/cookies"
                      className="text-base text-white/70 hover:text-white transition-colors"
                    >
                      Cookies Policy
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


