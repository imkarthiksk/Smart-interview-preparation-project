import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [type, setType] = useState("Technical");

  const handleViewResources = () => {
    if (!role || !company || !location) {
      return alert("Please fill all fields.");
    }

    navigate("/interview-resources", {
      state: {
        role,
        company,
        location,
        experience,
        type,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mb-6 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:mb-8 md:p-6">
          <h1 className="bg-gradient-to-r from-sky-700 via-blue-600 to-sky-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-4xl">
            📚 AI Interview Resources
          </h1>
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            Find the best free interview preparation resources for your dream
            company.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:p-6">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            {/* Job Role */}
            <div>
              <label className="text-sm font-semibold text-slate-600 md:text-base">
                Job Role
              </label>
              <input
                type="text"
                placeholder="Example: MERN Stack Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                  mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400
                  outline-none transition
                  focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100
                  md:mt-3 md:px-5 md:py-4 md:text-base
                "
              />
            </div>

            {/* Company */}
            <div>
              <label className="text-sm font-semibold text-slate-600 md:text-base">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Example: Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="
                  mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400
                  outline-none transition
                  focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100
                  md:mt-3 md:px-5 md:py-4 md:text-base
                "
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-semibold text-slate-600 md:text-base">
                Location
              </label>
              <input
                type="text"
                placeholder="Example: Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="
                  mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400
                  outline-none transition
                  focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100
                  md:mt-3 md:px-5 md:py-4 md:text-base
                "
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-semibold text-slate-600 md:text-base">
                Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="
                  mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900
                  outline-none transition
                  focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100
                  md:mt-3 md:px-5 md:py-4 md:text-base
                "
              >
                <option>Fresher</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>5+ Years</option>
              </select>
            </div>

            {/* Interview Type */}
            <div className="lg:col-span-2">
              <label className="text-sm font-semibold text-slate-600 md:text-base">
                Interview Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="
                  mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900
                  outline-none transition
                  focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100
                  md:mt-3 md:px-5 md:py-4 md:text-base
                "
              >
                <option>Technical</option>
                <option>Non-Technical</option>
                <option>HR</option>
                <option>Managerial</option>
                <option>Behavioral</option>
                <option>System Design</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center md:mt-8">
            <button
              onClick={handleViewResources}
              className="
                w-full rounded-2xl bg-sky-600 px-8 py-3.5 text-base font-semibold text-white
                shadow-[0_10px_25px_rgba(14,165,233,.25)] transition-all duration-300
                hover:bg-sky-700 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(14,165,233,.35)]
                md:w-auto md:px-12 md:py-4 md:text-lg
              "
            >
              📚 View Interview Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;