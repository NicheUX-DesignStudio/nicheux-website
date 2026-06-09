import { motion } from "framer-motion";

// Replace the MAIN CONTENT section (around line 280) with this:

{/* Main Content - Mobile Reordered */}
<div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
  {/* MOBILE ORDER: 1. Contact Details Form */}
  <div className="lg:hidden lg:col-span-1 lg:order-2">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      {/* YOUR FORM CONTENT HERE - Keep all your form code */}
    </motion.div>
  </div>

  {/* MOBILE ORDER: 2. Services Section */}
  <div className="lg:hidden lg:col-span-2 lg:order-1 space-y-8">
    {/* Services Selection Card */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      id="services-section"
    >
      {/* YOUR SERVICES CONTENT HERE */}
    </motion.div>

    {/* Contact Info Card - MOBILE ORDER: 3 */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      {/* YOUR GET IN TOUCH CONTENT HERE */}
    </motion.div>
  </div>

  {/* DESKTOP ORDER: Services first (left), Form second (right) */}
  <div className="hidden lg:block lg:col-span-2 lg:order-1 space-y-8">
    {/* Services Selection Card - Desktop */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      id="services-section"
    >
      {/* YOUR SERVICES CONTENT HERE */}
    </motion.div>

    {/* Contact Info Card - Desktop */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      {/* YOUR GET IN TOUCH CONTENT HERE */}
    </motion.div>
  </div>

  <div className="hidden lg:block lg:col-span-1 lg:order-2">
    {/* Form Section - Desktop */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      {/* YOUR FORM CONTENT HERE */}
    </motion.div>
  </div>
</div>