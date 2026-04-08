import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How far the button follows the cursor (px). Default 6. */
  strength?: number;
}

/**
 * Magnetic hover effect — button content subtly follows the cursor.
 * Uses transform only (GPU), no layout shift. Falls back to static on touch devices.
 */
export default function MagneticButton({
  children,
  className,
  strength = 6,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPos({
        x: ((e.clientX - cx) / (rect.width / 2)) * strength,
        y: ((e.clientY - cy) / (rect.height / 2)) * strength,
      });
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
