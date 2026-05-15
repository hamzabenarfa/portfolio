export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-24 pb-16 animate-pulse">
      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        <div className="h-4 w-24 bg-white/5 rounded mb-8" />
        <div className="h-10 w-3/4 sm:w-1/2 bg-white/5 rounded mb-4" />
        <div className="flex gap-4 mb-10">
          <div className="h-6 w-20 bg-white/5 rounded-full" />
          <div className="h-6 w-16 bg-white/5 rounded-full" />
        </div>
        <div className="aspect-video w-full bg-white/5 rounded-xl mb-12" />
        <div className="space-y-4 max-w-3xl">
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-11/12 bg-white/5 rounded" />
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-5/6 bg-white/5 rounded" />
        </div>
      </main>
    </div>
  );
}
