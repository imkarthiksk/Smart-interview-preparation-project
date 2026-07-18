import { FaCheckCircle } from "react-icons/fa";

function StrongSkills({ skills = [] }) {
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
        💪 Strong Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-sm text-slate-400">No skills found</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="
                flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50
                px-3 py-1.5 text-xs font-medium text-emerald-700
                transition-all duration-300
                hover:bg-emerald-100 hover:scale-105
              "
            >
              <FaCheckCircle className="text-[15px]" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StrongSkills;