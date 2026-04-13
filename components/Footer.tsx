export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-[#050505]/90 backdrop-blur-sm mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-10 lg:px-14 xl:px-20 py-4">
        <div className="flex items-center gap-5 font-mono text-[9px] uppercase tracking-[0.22em]">
          <span
            className="text-red"
            style={{
              fontFamily: "var(--font-syne), 'Syne', sans-serif",
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            REDLINE
          </span>
          <span className="text-bone-600">v0.1_PROTOCOL</span>
          <span className="hidden md:inline text-bone-600">
            AI_TRAINING_SYSTEM
          </span>
        </div>
        <div className="flex items-center gap-5 font-mono text-[9px] uppercase tracking-[0.22em] text-bone-500">
          <a
            href="/privacy"
            className="hover:text-bone-200 transition-colors"
          >
            Privacy Policy
          </a>
          <span className="hidden sm:inline text-bone-600">NORTH_AM</span>
          <span className="text-bone-700 hidden md:inline">
            &copy; 2026 REDLINE SYSTEMS
          </span>
        </div>
      </div>
    </footer>
  );
}
