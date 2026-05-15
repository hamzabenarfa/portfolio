export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] relative animate-pulse">
      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 pt-32">
        <div className="space-y-8">
          <div className="h-12 w-3/4 bg-white/5 rounded" />
          <div className="h-12 w-2/3 bg-white/5 rounded" />
          <div className="space-y-2 max-w-2xl pt-4">
            <div className="h-5 w-full bg-white/5 rounded" />
            <div className="h-5 w-5/6 bg-white/5 rounded" />
          </div>
        </div>
      </main>
    </div>
  );
}
