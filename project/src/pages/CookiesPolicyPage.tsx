import { motion } from "framer-motion";
import { Cookie, Settings, Shield, Info, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function CookiesPolicyPage() {
  const [cookieConsent, setCookieConsent] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function and cannot be switched off.',
      legallyRequired: 'Yes - cannot opt out',
      examples: [
        { 
          name: 'PHPSESSID', 
          provider: 'NicheUX Website',
          purpose: 'Maintains user session state across page requests',
          duration: 'Session',
          type: 'First-party'
        },
        { 
          name: 'XSRF-TOKEN', 
          provider: 'NicheUX Website',
          purpose: 'Security cookie to prevent Cross-Site Request Forgery attacks',
          duration: 'Session',
          type: 'First-party'
        },
        { 
          name: 'nicheux_country_pref', 
          provider: 'NicheUX Website',
          purpose: 'Stores your detected country for currency and pricing display',
          duration: '1 year',
          type: 'First-party'
        },
        { 
          name: 'nicheux_currency', 
          provider: 'NicheUX Website',
          purpose: 'Stores your selected currency preference',
          duration: '1 year',
          type: 'First-party'
        },
        { 
          name: 'cookie_consent', 
          provider: 'NicheUX Website',
          purpose: 'Stores your cookie consent preferences',
          duration: '1 year',
          type: 'First-party'
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Performance & Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      legallyRequired: 'No - requires consent',
      examples: [
        { 
          name: '_ga', 
          provider: 'Google Analytics',
          purpose: 'Distinguishes unique users',
          duration: '2 years',
          type: 'Third-party'
        },
        { 
          name: '_gid', 
          provider: 'Google Analytics',
          purpose: 'Distinguishes unique users for 24-hour period',
          duration: '24 hours',
          type: 'Third-party'
        },
        { 
          name: '_gat', 
          provider: 'Google Analytics',
          purpose: 'Throttles request rate on high traffic sites',
          duration: '1 minute',
          type: 'Third-party'
        }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing & Social Media Cookies',
      description: 'These cookies are used to track visitors across websites for advertising.',
      legallyRequired: 'No - requires explicit consent',
      examples: [
        { 
          name: '_fbp', 
          provider: 'Facebook (Meta)',
          purpose: 'Used for Facebook advertising and retargeting',
          duration: '3 months',
          type: 'Third-party'
        },
        { 
          name: 'lidc', 
          provider: 'LinkedIn',
          purpose: 'LinkedIn routing and data center optimization',
          duration: '1 day',
          type: 'Third-party'
        }
      ]
    }
  ];

  const handleToggle = (type: 'analytics' | 'marketing') => {
    setCookieConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('nicheux_cookie_consent', JSON.stringify(cookieConsent));
    alert('Cookie preferences saved successfully!');
  };

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
                UK PECR Compliant
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Cookie size={32} className="text-[#E9C672]" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-light tracking-tight">
                  Cookies Policy
                </h1>
                <p className="text-base sm:text-lg text-white/80 mt-1">
                  Real cookies used by a UK design agency
                </p>
              </div>
            </div>
          </div>

          {/* Quick Summary Box */}
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-start gap-4">
              <Info className="text-[#89B1CC] mt-1 flex-shrink-0" size={20} />
              <div>
                <h2 className="text-xl font-playfair font-light mb-4">UK Cookie Law Explained</h2>
                <div className="space-y-3">
                  <p className="text-base text-white/80">
                    Under UK PECR regulations:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-[#89B1CC] mt-0.5 flex-shrink-0" />
                      <span className="text-base text-white/80">
                        <strong>Essential cookies</strong> don't need consent
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-[#89B1CC] mt-0.5 flex-shrink-0" />
                      <span className="text-base text-white/80">
                        <strong>Analytics cookies</strong> need consent
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-[#89B1CC] mt-0.5 flex-shrink-0" />
                      <span className="text-base text-white/80">
                        <strong>Marketing cookies</strong> need explicit opt-in
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie Consent Manager */}
          <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-playfair font-light mb-2">Your Cookie Preferences</h2>
                <p className="text-base text-white/80">Manage consent for non-essential cookies</p>
              </div>
              <button
                onClick={savePreferences}
                className="px-6 py-2.5 bg-[#E9C672] text-[#121212] font-medium rounded-lg hover:bg-[#E9C672]/90 transition-colors"
              >
                Save Preferences
              </button>
            </div>

            <div className="space-y-4">
              {/* Analytics Cookies Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B097BE]" />
                    <h3 className="text-lg font-medium">Analytics Cookies</h3>
                  </div>
                  <p className="text-base text-white/80">
                    Help us understand how visitors use our site (Google Analytics)
                  </p>
                  <div className="mt-2 text-sm text-white/60">
                    Status: {cookieConsent.analytics ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ml-4 ${
                    cookieConsent.analytics ? 'bg-[#B097BE]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      cookieConsent.analytics ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Marketing Cookies Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E9C672]" />
                    <h3 className="text-lg font-medium">Marketing & Social Media</h3>
                  </div>
                  <p className="text-base text-white/80">
                    Facebook, LinkedIn for advertising and retargeting
                  </p>
                  <div className="mt-2 text-sm text-white/60">
                    Status: {cookieConsent.marketing ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ml-4 ${
                    cookieConsent.marketing ? 'bg-[#E9C672]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      cookieConsent.marketing ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Cookie Tables */}
          <div className="space-y-12">
            {cookieTypes.map((type) => (
              <div key={type.id} className="border-b border-white/10 pb-12 last:border-b-0">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-playfair font-light mb-3">{type.name}</h2>
                    <p className="text-base text-white/80 mb-4">{type.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        Legal Requirement: {type.legallyRequired}
                      </div>
                      <div className="text-sm text-white/60">
                        {type.examples.length} cookies
                      </div>
                    </div>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-3">
                    {type.examples.map((cookie, idx) => (
                      <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-white/60 mb-1">Cookie Name</div>
                            <div className="font-mono text-sm break-all">{cookie.name}</div>
                          </div>
                          <div>
                            <div className="text-sm text-white/60 mb-1">Provider</div>
                            <div className="text-sm">{cookie.provider}</div>
                          </div>
                          <div>
                            <div className="text-sm text-white/60 mb-1">Purpose</div>
                            <div className="text-sm text-white/80">{cookie.purpose}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-white/60 mb-1">Duration</div>
                              <div className="text-sm">{cookie.duration}</div>
                            </div>
                            <div>
                              <div className="text-sm text-white/60 mb-1">Type</div>
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                                cookie.type === 'First-party' 
                                  ? 'bg-blue/20 text-blue' 
                                  : 'bg-lavender/20 text-lavender'
                              }`}>
                                {cookie.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 font-normal text-sm">Cookie Name</th>
                          <th className="text-left py-3 px-4 font-normal text-sm">Provider</th>
                          <th className="text-left py-3 px-4 font-normal text-sm">Purpose</th>
                          <th className="text-left py-3 px-4 font-normal text-sm">Duration</th>
                          <th className="text-left py-3 px-4 font-normal text-sm">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.examples.map((cookie, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 font-mono text-sm">{cookie.name}</td>
                            <td className="py-3 px-4 text-sm">{cookie.provider}</td>
                            <td className="py-3 px-4 text-sm text-white/80 max-w-md">
                              {cookie.purpose}
                            </td>
                            <td className="py-3 px-4 text-sm">{cookie.duration}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                                cookie.type === 'First-party' 
                                  ? 'bg-blue/20 text-blue' 
                                  : 'bg-lavender/20 text-lavender'
                              }`}>
                                {cookie.type}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* UK Legal Requirements */}
          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-start gap-4">
              <Shield className="text-[#89B1CC] mt-1" size={20} />
              <div>
                <h2 className="text-xl font-playfair font-light mb-6">UK Legal Requirements We Follow</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">PECR Regulations</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-[#89B1CC] mt-0.5 flex-shrink-0" />
                        <span className="text-base text-white/80">
                          Clear consent before non-essential cookies
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-[#89B1CC] mt-0.5 flex-shrink-0" />
                        <span className="text-base text-white/80">
                          Easy withdrawal of consent
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3">ICO Guidance</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-[#89B1CC] mt-0.5 flex-shrink-0" />
                        <span className="text-base text-white/80">
                          Detailed information about each cookie
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-[#89B1CC] mt-0.5 flex-shrink-0" />
                        <span className="text-base text-white/80">
                          Granular consent options
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Control Cookies */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Settings size={24} className="text-[#E9C672]" />
              <h2 className="text-2xl font-playfair font-light">How to Control Cookies</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Browser Settings</h3>
                <p className="text-base text-white/80 mb-4">
                  Most browsers allow you to refuse cookies:
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Chrome</h4>
                    <p className="text-sm text-white/80">
                      Settings → Privacy and security → Cookies
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Safari</h4>
                    <p className="text-sm text-white/80">
                      Preferences → Privacy → Cookies
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Third-Party Opt-Outs</h3>
                <p className="text-base text-white/80 mb-4">
                  Opt-out of specific services:
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Google Analytics</h4>
                    <p className="text-sm text-white/80">
                      Install the Google Analytics Opt-out Add-on
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Facebook</h4>
                    <p className="text-sm text-white/80">
                      Ad Preferences in Facebook settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="space-y-3">
              <h3 className="text-xl font-playfair font-light mb-4">Important Notes</h3>
              <div className="space-y-2">
                <p className="text-base text-white/80">
                  • <strong>Essential cookies cannot be disabled</strong> - they make our website work
                </p>
                <p className="text-base text-white/80">
                  • <strong>Blocking cookies may affect functionality</strong> - local prices and forms may not work
                </p>
                <p className="text-base text-white/80">
                  • <strong>Consent lasts 1 year</strong> - we'll ask again after this period
                </p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-base text-white/80 mb-1">
                  Questions about cookies?
                </p>
                <a
                  href="mailto:hellonicheux@gmail.com?subject=Cookie%20Policy%20Question"
                  className="text-[#89B1CC] hover:text-[#89B1CC]/80 transition-colors text-sm"
                >
                  hellonicheux@gmail.com
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
      </main>
    </div>
  );
}


