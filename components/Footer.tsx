export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-[#050505]/90 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 px-8 md:px-14 lg:px-20 py-3">
        <div className="flex items-center gap-5 text-[9px] uppercase tracking-widest">
          <span className="text-[#dc2626] font-bold">REDLINE</span>
          <span className="text-slate-700">v0.1_protocol</span>
          <span className="hidden md:inline text-slate-700">
            AI_TRAINING_SYSTEM
          </span>
        </div>
        <div className="flex items-center gap-5 text-[9px] uppercase tracking-widest text-slate-700">
          <span className="hidden sm:inline">NORTH_AM</span>
          <span className="text-slate-800 hidden md:inline">
            &copy; 2024 REDLINE SYSTEMS
          </span>
        </div>
      </div>
    </footer>
  );
}
