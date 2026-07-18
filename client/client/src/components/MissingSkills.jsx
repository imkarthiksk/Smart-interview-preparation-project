import { FaTimesCircle } from "react-icons/fa";

function MissingSkills({ skills = [] }) {
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
        ❌ Missing Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-sm text-slate-400">No missing skills 🎉</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="
                flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50
                px-3 py-1.5 text-xs font-medium text-rose-700
                transition-all duration-300
                hover:bg-rose-100 hover:scale-105
              "
            >
              <FaTimesCircle className="text-[15px]" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MissingSkills;