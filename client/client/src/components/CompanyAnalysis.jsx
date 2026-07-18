function CompanyAnalysis({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="mt-6 md:mt-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between md:mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">
            AI Company Analysis
          </p>
          <h1 className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">
            {analysis.company}
          </h1>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-3xl md:h-16 md:w-16 md:text-4xl">
          🏢
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-5">
          <p className="mb-2 text-xs text-slate-500">Interview Difficulty</p>
          <h2 className="text-2xl font-bold text-sky-700 md:text-3xl">
            {analysis.difficulty}
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-5">
          <p className="mb-2 text-xs text-slate-500">Estimated Duration</p>
          <h2 className="text-2xl font-bold text-indigo-700 md:text-3xl">
            {analysis.duration}
          </h2>
        </div>
      </div>

      {/* Hiring Process */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 md:mt-6 md:p-5">
        <h2 className="mb-4 text-base font-bold text-slate-900 md:text-lg">
          Hiring Process
        </h2>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {analysis.rounds?.map((round, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-sky-300 md:p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white md:h-11 md:w-11 md:text-base">
                {index + 1}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 md:text-base">
                  {round}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Topics - Marquee */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 md:mt-6 md:p-5">
        <h2 className="mb-4 text-base font-bold text-slate-900 md:text-lg">
          Frequently Asked Topics
        </h2>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-2 whitespace-nowrap">
            {[...(analysis.topics || []), ...(analysis.topics || [])].map(
              (topic, index) => (
                <div
                  key={index}
                  className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 md:px-4 md:py-2 md:text-sm"
                >
                  {topic}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 md:mt-6 md:p-5">
        <h2 className="mb-4 text-base font-bold text-slate-900 md:text-lg">
          AI Preparation Tips
        </h2>
        <div className="space-y-3 md:space-y-4">
          {analysis.tips?.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-emerald-300 md:p-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white md:h-10 md:w-10 md:text-base">
                ✓
              </div>
              <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyAnalysis;