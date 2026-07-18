import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function History() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId");
  // Load History
  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem(`interviewHistory_${userId}`)
      ) || [];

    console.log("History Data:", data);

    setHistory(data);

  }, []);

  // Initialize AOS
  useEffect(() => {

    AOS.init({
      duration: 800,
      once: true,
    });

  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:mb-8 md:p-6">
          <h1 className="bg-gradient-to-r from-sky-700 via-blue-600 to-sky-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-4xl">
            📜 Interview History
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track all your previous AI Interview Reports.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center md:p-10">
            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
              No Interview History
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Complete your first interview to see reports here.
            </p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {history.map((item, index) => (
              <div
                key={item.id}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                className="
                group rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)]
                transition-all duration-300
                hover:scale-[1.01] hover:shadow-[0_20px_55px_rgba(15,23,42,.1)]
                md:p-6
              "
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-sky-500"></div>
                      <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                        {item.company}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-600 md:text-base">
                      💼 {item.role}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 md:text-sm">
                      📅 {item.date}
                    </p>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-xl font-bold text-white shadow-[0_8px_25px_rgba(14,165,233,.35)] md:h-24 md:w-24 md:text-2xl">
                      {item.overallScore}%
                    </div>

                    <button
                      onClick={() => {
                        localStorage.setItem(
                          `selectedInterview_${userId}`,
                          JSON.stringify(item)
                        );
                        navigate("/report");
                      }}
                      className="
                      mt-4 w-full rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white
                      shadow-[0_10px_25px_rgba(14,165,233,.25)] transition-all duration-300
                      hover:bg-sky-700 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(14,165,233,.35)]
                      md:mt-6 md:w-auto md:px-6 md:py-3
                    "
                    >
                      📄 View Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

}

export default History;
