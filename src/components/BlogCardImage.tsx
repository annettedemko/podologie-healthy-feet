interface BlogCardImageProps {
  slug: string;
  title: string;
  category?: string;
  className?: string;
}

/**
 * Each card gets a unique gradient angle + subtle color shift so
 * the grid looks varied but cohesive. All cards share the same
 * premium structure: brand logo watermark + category label.
 */
const gradients: Record<string, string> = {
  "was-ist-podologie":
    "linear-gradient(135deg, #e8f0fe 0%, #dbeafe 40%, #bfdbfe 70%, #93c5fd 100%)",
  "nagelpilz-erkennen-behandeln":
    "linear-gradient(150deg, #eef2ff 0%, #dbeafe 35%, #c7d2fe 75%, #a5b4fc 100%)",
  "diabetischer-fuss-vorsorge":
    "linear-gradient(120deg, #ecfdf5 0%, #d1fae5 30%, #bfdbfe 70%, #93c5fd 100%)",
  "eingewachsener-nagel-was-tun":
    "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 75%, #7dd3fc 100%)",
  "warzen-kryotherapie":
    "linear-gradient(140deg, #f0fdf4 0%, #dcfce7 30%, #d1fae5 60%, #bfdbfe 100%)",
  "fusspflege-im-winter":
    "linear-gradient(130deg, #eff6ff 0%, #dbeafe 45%, #c7d2fe 80%, #a5b4fc 100%)",
  "krankenkasse-podologie":
    "linear-gradient(145deg, #eef2ff 0%, #e0e7ff 35%, #dbeafe 70%, #bfdbfe 100%)",
  "komplexbehandlung-erklaert":
    "linear-gradient(155deg, #ecfdf5 0%, #d1fae5 35%, #a7f3d0 60%, #bfdbfe 100%)",
  "checkliste-diabetischer-fuss":
    "linear-gradient(125deg, #f0fdf4 0%, #d1fae5 40%, #bbf7d0 65%, #bfdbfe 100%)",
};

const fallbackGradient =
  "linear-gradient(135deg, #e8f0fe 0%, #dbeafe 40%, #bfdbfe 70%, #93c5fd 100%)";

export default function BlogCardImage({
  slug,
  title,
  category,
  className = "",
}: BlogCardImageProps) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ background: gradients[slug] ?? fallbackGradient }}
      aria-label={title}
      role="img"
    >
      {/* Large logo watermark — the main visual */}
      <img
        src="/Healthy Feet Logo Color/Healthy Feet Color Logo.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] max-w-[280px] opacity-[0.12] select-none pointer-events-none"
        draggable={false}
      />

      {/* Soft radial glow behind logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Category label — elegant, minimal */}
      {category && (
        <div className="absolute bottom-4 left-5">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1e40af]/50">
            {category}
          </span>
        </div>
      )}

      {/* Thin decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(59,130,246,0.15), transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
