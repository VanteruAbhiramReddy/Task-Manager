export default function HeroSection() {
  return (
    <section className="grid min-h-[calc(100vh-8rem)] items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-6">
        <span className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
          Plan smarter, ship faster
        </span>
        <div className="space-y-4">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Build your perfect task workflow in one place.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Keep your team aligned with focused boards, smart reminders, and a clean workspace designed for modern productivity.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Get started
          </button>
          <button className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400">
            Learn more
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-200/60">
          <img
            className="block h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80"
            alt="Person managing tasks on a laptop"
          />
        </div>
      </div>
    </section>
  );
}
