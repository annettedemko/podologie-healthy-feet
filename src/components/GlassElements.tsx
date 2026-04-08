export default function GlassElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Left readability zone */}
      <div className="absolute inset-y-0 left-0 w-[90%] sm:w-[60%] bg-gradient-to-r from-[#eef6ff]/90 via-[#eef6ff]/60 to-transparent" />

      {/* Bottom blend — transition into trust bar */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F0F6FF] to-transparent" />
    </div>
  );
}
