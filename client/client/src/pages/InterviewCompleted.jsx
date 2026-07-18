import { useNavigate } from "react-router-dom";

function InterviewCompleted() {
  const navigate = useNavigate();
const userId = localStorage.getItem("userId");

const report =
  JSON.parse(localStorage.getItem(`interviewReport_${userId}`)) || {};

const company =
  JSON.parse(localStorage.getItem(`companyInterviewCompany_${userId}`)) || {};

  const overallScore = report.overallScore || 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-900 md:p-6">
      <div className="mx-auto flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:p-8">
          <div className="text-center border-b border-slate-100 pb-6">
            <div className="text-6xl">🤝</div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
              Interview Completed
            </h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Congratulations! Your interview has been successfully evaluated.
            </p>
          </div>

          <div className="mt-6 space-y-4 md:mt-8">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 md:px-5 md:py-4">
              <h2 className="text-sm font-semibold text-slate-600 md:text-base">
                Company
              </h2>
              <span className="text-sm font-medium text-slate-900 md:text-base">
                {company.company || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 md:px-5 md:py-4">
              <h2 className="text-sm font-semibold text-slate-600 md:text-base">
                Role
              </h2>
              <span className="text-sm font-medium text-slate-900 md:text-base">
                {company.role || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 md:px-5 md:py-4">
              <h2 className="text-sm font-semibold text-slate-600 md:text-base">
                Overall Score
              </h2>
              <span className="text-lg font-bold text-sky-700 md:text-xl">
                {overallScore}%
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 md:mt-10 md:flex-row md:justify-center">
            <button
              onClick={() => navigate("/report")}
              className="w-full rounded-2xl bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,.25)] transition-all duration-300 hover:bg-sky-700 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(14,165,233,.35)] md:w-auto md:px-8 md:py-4 md:text-base"
            >
              📄 View Detailed Report
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:scale-[1.01] md:w-auto md:px-8 md:py-4 md:text-base"
            >
              View Dashboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewCompleted;
