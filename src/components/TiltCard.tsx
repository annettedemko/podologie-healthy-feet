import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Default 6. Keep subtle. */
  maxTilt?: number;
  /** Whether to show spotlight glow at cursor. Default true. */
  spotlight?: boolean;
}

/**
 * 3D tilt card with cursor-following spotlight. Apple-style subtle.
 * Disabled on touch devices (no hover).
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  spotlight = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const spotlightBackground = useMotionTemplate`radial-gradient(300px circle at ${mouseX}% ${mouseY}%, hsl(var(--primary) / 0.12), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    // Map 0..1 to -maxTilt..maxTilt, inverted for natural tilt
    rotateY.set((xPct - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - yPct) * maxTilt * 2);
    mouseX.set(xPct * 100);
    mouseY.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {children}
      {spotlight && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background: spotlightBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
    </motion.div>
  );
}
