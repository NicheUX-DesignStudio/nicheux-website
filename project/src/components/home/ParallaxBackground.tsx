import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxBackgroundProps {
  image: string;
}

const ParallaxBackground = ({ image }: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]); // slower movement

  return (
    <motion.div
      ref={ref}
      style={{ y, backgroundImage: `url(${image})` }}
      className="absolute inset-0 bg-cover bg-center z-0"
    >
      <div className="absolute inset-0 bg-black/40" />
    </motion.div>
  );
};

export default ParallaxBackground;


