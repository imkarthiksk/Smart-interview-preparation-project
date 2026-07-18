function RoadmapCard({ roadmap = [] }) {
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
        📚 Learning Roadmap
      </h2>

      {roadmap.length === 0 ? (
        <p className="text-sm text-slate-400">No roadmap</p>
      ) : (
        <ul className="space-y-2">
          {roadmap.map((step, index) => (
            <li
              key={index}
              className="
                rounded-xl border border-violet-200 bg-violet-50
                px-4 py-3 text-sm font-medium text-violet-800
                transition-all duration-300
                hover:bg-violet-100 hover:scale-[1.01]
              "
            >
              {step}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RoadmapCard;