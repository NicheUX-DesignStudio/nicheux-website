import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  delay?: number;
}

const SectionWrapper = ({ children, delay = 0 }: SectionWrapperProps) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
    viewport={{ once: true }}
    className="relative z-10"
  >
    {children}
  </motion.section>
);

export default SectionWrapper;


