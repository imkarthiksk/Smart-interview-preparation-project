import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InterviewHeader from "../components/InterviewHeader";
import ResumeStatus from "../components/ResumeStatus";
import CompanySearch from "../components/CompanySearch";
import CompanyAnalysis from "../components/CompanyAnalysis";

import {
  analyzeCompany,
  startCompanyInterview,
  getResume,
} from "../services/api";

function InterviewGenerator() {

  const navigate = useNavigate();

  const [resume, setResume] = useState(null);

  const [company, setCompany] = useState("");

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  // ==========================
  // Fetch Resume
  // ==========================

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {

      const res = await getResume();

      setResume(res.data.resume);

    } catch (err) {

      console.log(err);

    }
  };

  // Resume values

  const role = resume?.role;

  const experience = resume?.experience;

  // ==========================
  // Analyze Company
  // ==========================

  const handleAnalyzeCompany = async () => {

    if (!company.trim()) {
      return alert("Please enter a company name.");
    }

    try {

      setLoading(true);

      const res = await analyzeCompany({

        company,

        role,

      });

      setAnalysis(res.data.analysis);

    }

    catch (error) {

      alert(error.response?.data?.message || "Unable to analyze company.");

    }

    finally {

      setLoading(false);

    }

  };

  // ==========================
  // Start Interview
  // ==========================

  const startInterview = async () => {

    if (!analysis) {
      return alert("Please analyze company first.");
    }

    try {

      setLoading(true);

      const res = await startCompanyInterview({

        company,

        role,

        experience,

      });

 const userId = localStorage.getItem("userId");

localStorage.setItem(
  `companyInterview_${userId}`,
  JSON.stringify(res.data.interview)
);
localStorage.setItem(
  `companyInterviewCompany_${userId}`,
  JSON.stringify({
    company,
    role,
  })
);
// ✅ Clear previous interview report
localStorage.removeItem(`interviewReport_${userId}`);

navigate("/company-interview");

    }

    catch (error) {

      alert(error.response?.data?.message || "Unable to start interview.");

    }

    finally {

      setLoading(false);

    }

  };

 return (
  <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-900 md:p-6">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:p-6">
        <InterviewHeader />
      </div>

      {/* Resume */}
      <div className="mt-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:mt-6 md:p-6">
        <ResumeStatus resume={resume} />
      </div>

      {/* Company Search */}
      <div className="mt-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] transition-all duration-300 hover:border-sky-200 hover:shadow-[0_20px_55px_rgba(15,23,42,.1)] md:mt-6 md:p-6">
        <h2 className="mb-6 text-xl font-bold text-slate-900 md:text-2xl">
          Analyze Company
        </h2>

        <CompanySearch company={company} setCompany={setCompany} />

        <div className="mt-6 flex justify-center md:mt-8">
          <button
            onClick={handleAnalyzeCompany}
            disabled={loading}
            className="
              w-full rounded-2xl bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white
              shadow-[0_10px_25px_rgba(14,165,233,.25)] transition-all duration-300
              hover:bg-sky-700 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(14,165,233,.35)]
              disabled:opacity-70 md:w-auto md:px-8
            "
          >
            {loading ? "Analyzing..." : "🔍 Analyze Company"}
          </button>
        </div>
      </div>

      {/* Company Analysis */}
      {analysis && (
        <div className="mt-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:mt-6 md:p-6">
          <CompanyAnalysis analysis={analysis} />
          <div className="mt-6 flex justify-center md:mt-8">
            <button
              onClick={startInterview}
              className="
                w-full rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white
                shadow-[0_10px_25px_rgba(15,23,42,.25)] transition-all duration-300
                hover:bg-slate-800 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(15,23,42,.35)]
                md:w-auto md:px-8
              "
            >
              🚀 Start AI Interview
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Loading */}
    {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="mx-4 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,.2)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
          </div>
          <h2 className="mt-5 text-lg font-bold text-slate-900">
            AI is analyzing...
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Collecting company insights
          </p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>
          </div>
        </div>
      </div>
    )}
  </div>
);

}

export default InterviewGenerator;