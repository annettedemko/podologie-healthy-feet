import {
  BookOpen,
  Stethoscope,
  Shield,
  Snowflake,
  CreditCard,
  Activity,
  Footprints,
  Scissors,
  type LucideIcon,
} from "lucide-react";

interface BlogCardImageProps {
  slug: string;
  title: string;
  className?: string;
}

interface CardDesign {
  Icon: LucideIcon;
  bg: string;
  accent: string;
  blob1: string;
  blob2: string;
}

const designs: Record<string, CardDesign> = {
  "was-ist-podologie": {
    Icon: BookOpen,
    bg: "from-blue-500 to-blue-700",
    accent: "bg-blue-300/20",
    blob1: "bg-blue-400/30",
    blob2: "bg-sky-300/20",
  },
  "nagelpilz-erkennen-behandeln": {
    Icon: Stethoscope,
    bg: "from-sky-500 to-blue-600",
    accent: "bg-sky-300/20",
    blob1: "bg-sky-400/30",
    blob2: "bg-blue-300/20",
  },
  "diabetischer-fuss-vorsorge": {
    Icon: Shield,
    bg: "from-blue-600 to-indigo-700",
    accent: "bg-indigo-300/20",
    blob1: "bg-blue-400/25",
    blob2: "bg-indigo-400/20",
  },
  "eingewachsener-nagel-was-tun": {
    Icon: Scissors,
    bg: "from-cyan-500 to-blue-600",
    accent: "bg-cyan-300/20",
    blob1: "bg-cyan-400/30",
    blob2: "bg-blue-300/20",
  },
  "warzen-kryotherapie": {
    Icon: Snowflake,
    bg: "from-sky-400 to-cyan-600",
    accent: "bg-sky-200/20",
    blob1: "bg-sky-300/30",
    blob2: "bg-cyan-300/20",
  },
  "fusspflege-im-winter": {
    Icon: Footprints,
    bg: "from-blue-400 to-sky-600",
    accent: "bg-sky-300/20",
    blob1: "bg-blue-300/30",
    blob2: "bg-sky-200/20",
  },
  "krankenkasse-podologie": {
    Icon: CreditCard,
    bg: "from-indigo-500 to-blue-600",
    accent: "bg-indigo-300/20",
    blob1: "bg-indigo-400/25",
    blob2: "bg-blue-400/20",
  },
  "komplexbehandlung-erklaert": {
    Icon: Activity,
    bg: "from-blue-500 to-indigo-600",
    accent: "bg-blue-300/20",
    blob1: "bg-blue-400/25",
    blob2: "bg-indigo-300/20",
  },
};

const fallback: CardDesign = {
  Icon: Footprints,
  bg: "from-blue-500 to-blue-700",
  accent: "bg-blue-300/20",
  blob1: "bg-blue-400/30",
  blob2: "bg-sky-300/20",
};

export default function BlogCardImage({ slug, title, className = "" }: BlogCardImageProps) {
  const d = designs[slug] ?? fallback;
  const { Icon } = d;

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br ${d.bg} overflow-hidden ${className}`}
      aria-label={title}
      role="img"
    >
      {/* Decorative blobs */}
      <div
        className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${d.blob1} blur-2xl`}
        aria-hidden="true"
      />
      <div
        className={`absolute -bottom-6 -left-6 w-28 h-28 rounded-full ${d.blob2} blur-2xl`}
        aria-hidden="true"
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full ${d.accent} blur-3xl`}
        aria-hidden="true"
      />

      {/* Glass circle with icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
          <Icon className="w-10 h-10 text-white/90" strokeWidth={1.5} />
        </div>
      </div>

      {/* Small HF branding */}
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5 opacity-60">
        <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">
          Healthy Feet
        </span>
      </div>

      {/* Subtle grid/dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
}
