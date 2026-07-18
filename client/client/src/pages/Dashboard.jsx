import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [report, setReport] = useState({});
  const [company, setCompany] = useState({});

  useEffect(() => {
const userId = localStorage.getItem("userId");

const reportData =
JSON.parse(
localStorage.getItem(`interviewReport_${userId}`)
) || {};

const companyData =
JSON.parse(
localStorage.getItem(`companyInterviewCompany_${userId}`)
) || {};
    setReport(reportData);

    setCompany(companyData);

  }, []);

return (
  <div className="min-h-screen bg-[#f8fafc] p-3 text-slate-900 font-sans md:p-6">
    <div className="mx-auto max-w-6xl">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] transition-all duration-300 hover:shadow-[0_20px_55px_rgba(15,23,42,.1)] md:p-6">
        <div className="mb-6">
          <h1 className="bg-gradient-to-r from-sky-700 via-blue-600 to-sky-500 bg-clip-text text-2xl font-extrabold tracking-tight md:text-4xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View your latest interview performance.
          </p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-sky-200 md:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
              🚀 Latest Interview
            </h2>

            <div className="inline-flex w-fit items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700">
              Recent
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-sm md:p-5">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                Company
              </p>
              <h3 className="break-words text-lg font-semibold text-slate-900 md:text-xl">
                {company.company || "-"}
              </h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-sm md:p-5">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                Role
              </p>
              <h3 className="break-words text-lg font-semibold text-slate-900 md:text-xl">
                {company.role || "-"}
              </h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-sm md:p-5">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                Interview Date
              </p>
              <h3 className="text-base font-semibold text-slate-900 md:text-lg">
                {report.date || "-"}
              </h3>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50 p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-sm md:p-5">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                Overall Score
              </p>
              <h3 className="text-3xl font-bold text-sky-700 md:text-4xl">
                {report.overallScore || 0}%
              </h3>
            </div>
          </div>

          <div className="mt-6 flex justify-end md:mt-8">
            <button
              onClick={() => navigate("/history")}
              className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(14,165,233,.22)] transition-all duration-300 hover:bg-sky-700 hover:scale-[1.01] hover:shadow-[0_12px_26px_rgba(14,165,233,.3)] md:px-6 md:text-base"
            >
              View History →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
export default Dashboard;
