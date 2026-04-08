import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
}

/**
 * SEO-friendly animated text — each word fades/slides in with stagger.
 * The full text is always in the DOM (semantic HTML), only visually animated.
 */
export default function AnimatedText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  staggerChildren = 0.04,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        transition={{ staggerChildren, delayChildren: delay }}
        className="inline"
        aria-hidden="true"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-[0.15em]"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        ))}
      </motion.span>
      {/* SEO: screen-reader accessible, full text in DOM */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
