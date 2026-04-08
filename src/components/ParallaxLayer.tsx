import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  /** Parallax speed: 0 = static, positive = slower than scroll, negative = faster */
  speed?: number;
  className?: string;
}

/**
 * Lightweight parallax wrapper using Framer Motion's useScroll + useTransform.
 * Only uses CSS transforms (GPU-accelerated), no layout thrashing.
 * Decorative content only — does not affect SEO content flow.
 */
export default function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);

  return (
    <div ref={ref} className={`absolute ${className ?? ""}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
