import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { uploadResume, getResume } from "../services/api";

import ATSScoreCard from "../components/ATSScoreCard";
import StrongSkills from "../components/StrongSkills";
import MissingSkills from "../components/MissingSkills";
import WeaknessCard from "../components/WeaknessCard";
import ResumeImprovement from "../components/ResumeImprovement";
import ProjectCard from "../components/ProjectCard";
import RoadmapCard from "../components/RoadmapCard";

function Resume() {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState(null);

  const [analysis, setAnalysis] = useState(null);

  const [atsScore, setAtsScore] = useState(0);
  const [strongSkills, setStrongSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [resumeImprovements, setResumeImprovements] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [learningRoadmap, setLearningRoadmap] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {

    try {

      const res = await getResume();

      if (!res.data.success) return;

      const resume = res.data.resume;
      const data = resume.analysis;

      setRole(resume.role || "");
      setExperience(resume.experience || "");

      setAnalysis(data);

      setAtsScore(data.atsScore || 0);
      setStrongSkills(data.strongSkills || []);
      setMissingSkills(data.missingSkills || []);
      setWeaknesses(data.weaknesses || []);
      setResumeImprovements(data.resumeImprovements || []);
      setRecommendedProjects(data.recommendedProjects || []);
      setLearningRoadmap(data.learningRoadmap || []);

    } catch (error) {

      console.log(error);

    }

  };

  const handleUpload = async () => {

    if (!role) {
      return alert("Please Select Target Role");
    }

    if (!experience) {
      return alert("Please Select Experience");
    }

    if (!file) {
      return alert("Please Select Resume");
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("role", role);
    formData.append("experience", experience);

    try {

      setLoading(true);

      const res = await uploadResume(formData);

      alert(res.data.message);

      const data = res.data.analysis;

      // ✅ Save for Interview Generator
      localStorage.setItem("role", role);
      localStorage.setItem("experience", experience);

      setAnalysis(data);

      setAtsScore(data.atsScore);
      setStrongSkills(data.strongSkills);
      setMissingSkills(data.missingSkills);
      setWeaknesses(data.weaknesses);
      setResumeImprovements(data.resumeImprovements);
      setRecommendedProjects(data.recommendedProjects);
      setLearningRoadmap(data.learningRoadmap);

    } catch (error) {

      alert(error.response?.data?.message || "Upload Failed");

    } finally {

      setLoading(false);

    }

  };

 return (
  <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-900 md:p-6">
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="bg-gradient-to-r from-sky-700 via-blue-600 to-sky-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-4xl">
          AI Career Resume Analyzer
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload your resume and receive AI-powered insights.
        </p>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:p-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Target Role
            </label>
            <input
              type="text"
              placeholder="e.g., Frontend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Experience Level
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            >
              <option value="">Select Experience</option>
              <option>Fresher</option>
              <option>0-1 Years</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 file:me-3 file:rounded-lg file:border-0 file:bg-sky-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-sky-200"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,.25)] transition-all duration-300 hover:bg-sky-700 hover:shadow-[0_14px_30px_rgba(14,165,233,.35)] disabled:opacity-70 md:w-auto md:px-8"
        >
          {loading ? "Uploading..." : "Upload & Analyze Resume"}
        </button>

        {analysis && (
          <>
            <div className="mt-8 grid gap-6 lg:grid-cols-2 md:mt-10 md:gap-8">
              <ATSScoreCard score={atsScore} />
              <StrongSkills skills={strongSkills} />
              <MissingSkills skills={missingSkills} />
              <WeaknessCard weaknesses={weaknesses} />
              <ResumeImprovement improvements={resumeImprovements} />
              <ProjectCard projects={recommendedProjects} />
              <RoadmapCard roadmap={learningRoadmap} />
            </div>

            <div className="mt-8 flex justify-center md:mt-10">
              <button
                onClick={() => {
                  if (!role) {
                    alert("⚠ Please select your Target Role.");
                    return;
                  }
                  if (!experience) {
                    alert("⚠ Please select your Experience Level.");
                    return;
                  }
                  if (!analysis) {
                    alert(
                      "⚠ Please upload and analyze your resume before continuing."
                    );
                    return;
                  }
                  localStorage.setItem("role", role);
                  localStorage.setItem("experience", experience);
                  navigate("/interview-generator");
                }}
                className="w-full rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(15,23,42,.25)] transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_14px_30px_rgba(15,23,42,.35)] md:w-auto md:px-8"
              >
                Continue →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
}

export default Resume;