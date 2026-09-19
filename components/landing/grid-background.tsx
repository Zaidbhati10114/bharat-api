export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

      {/* Orange glow */}
      <div className="absolute top-24 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-orange-500/12 blur-[140px]" />

      {/* Blue glow */}
      <div className="absolute top-40 right-[-120px] h-[320px] w-[320px] rounded-full bg-sky-500/8 blur-[120px]" />

      {/* Top fade */}
      <div className="from-background via-background/80 absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent" />

      {/* Bottom fade */}
      <div className="from-background via-background/80 absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t to-transparent" />
    </div>
  );
}
