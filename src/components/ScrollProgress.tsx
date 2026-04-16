import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar at the top of the page showing scroll progress.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-clinic-teal to-primary origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
