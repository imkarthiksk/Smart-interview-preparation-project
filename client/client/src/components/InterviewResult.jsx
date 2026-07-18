function InterviewResult({ result }) {
  if (!result) return null;

  return (
    <div
      className="
        mx-auto mt-6 max-w-5xl rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)]
        transition-all duration-300
        hover:scale-[1.01] hover:shadow-[0_20px_55px_rgba(15,23,42,.1)]
        md:mt-8 md:p-6
      "
    >
      <h1 className="mb-6 text-lg font-bold text-slate-900 md:mb-8 md:text-xl">
        🎉 AI Interview Report
      </h1>

      {/* Overall Score */}
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-center md:mb-8 md:p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Overall Score
        </h2>
        <h1 className="mt-2 text-4xl font-bold text-sky-700 md:mt-3 md:text-5xl">
          {result.overallScore}%
        </h1>
      </div>

      {/* Individual Scores */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 transition-all duration-300 hover:scale-[1.02] md:p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Technical Knowledge
          </h3>
          <p className="mt-2 text-3xl font-bold text-emerald-700 md:mt-3 md:text-4xl">
            {result.technicalScore}%
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 transition-all duration-300 hover:scale-[1.02] md:p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Communication
          </h3>
          <p className="mt-2 text-3xl font-bold text-indigo-700 md:mt-3 md:text-4xl">
            {result.communicationScore}%
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 transition-all duration-300 hover:scale-[1.02] md:p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Confidence
          </h3>
          <p className="mt-2 text-3xl font-bold text-amber-700 md:mt-3 md:text-4xl">
            {result.confidenceScore}%
          </p>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 transition-all duration-300 hover:scale-[1.02] md:p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Grammar
          </h3>
          <p className="mt-2 text-3xl font-bold text-rose-700 md:mt-3 md:text-4xl">
            {result.grammarScore}%
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-6 md:mt-8">
        <h2 className="mb-4 text-base font-bold text-slate-900 md:text-lg">
          💡 AI Suggestions
        </h2>
        <div className="space-y-3 md:space-y-4">
          {result.suggestions?.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 transition hover:bg-slate-100 md:p-5"
            >
              ✅ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewResult;