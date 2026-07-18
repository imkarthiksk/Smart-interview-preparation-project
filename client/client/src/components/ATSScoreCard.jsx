function ATSScoreCard({ score }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * score) / 100;

  return (
    <div
      className="
        rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-[0_14px_40px_rgba(15,23,42,.12)]
        md:p-6
      "
    >
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        ATS Score
      </h2>

      <div className="flex justify-center">
        <div className="relative h-40 w-40">
          <svg className="h-40 w-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#0284c7"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900 md:text-4xl">
              {score}%
            </span>
            <span className="text-xs text-slate-400">score</span>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        {score >= 85 && (
          <p className="text-xs font-semibold text-emerald-600">
            Excellent Resume 🚀
          </p>
        )}
        {score >= 70 && score < 85 && (
          <p className="text-xs font-semibold text-amber-600">
            Good Resume 👍
          </p>
        )}
        {score < 70 && (
          <p className="text-xs font-semibold text-rose-600">
            Needs Improvement ⚠️
          </p>
        )}
      </div>
    </div>
  );
}

export default ATSScoreCard;