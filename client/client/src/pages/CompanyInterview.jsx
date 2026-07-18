import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { evaluateCompanyInterview } from "../services/api";

function CompanyInterview() {

  const navigate = useNavigate();

  const [interview, setInterview] = useState([]);

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [expectedAnswer, setExpectedAnswer] = useState("");

  const [isCorrect, setIsCorrect] = useState(false);

  const [canProceed, setCanProceed] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [showSkipModal, setShowSkipModal] = useState(false);
const userId = localStorage.getItem("userId");

const company =
  JSON.parse(
    localStorage.getItem(`companyInterviewCompany_${userId}`)
  ) || {};
  useEffect(() => {

   const userId = localStorage.getItem("userId");

const storedInterview =
  JSON.parse(
    localStorage.getItem(`companyInterview_${userId}`)
  ) || [];

    setInterview(storedInterview);

  }, []);

  if (interview.length === 0) {

    return (

      <div className="flex justify-center items-center min-h-screen">

        <h1 className="text-3xl font-bold">

          Loading Interview...

        </h1>

      </div>

    );

  }

  const currentRound =
    interview[currentRoundIndex];

  const questions =
    currentRound.questions;

  const currentQuestion =
    questions[currentQuestionIndex];
    // ======================================
// Save Skipped Question
// ======================================

const saveSkippedQuestion = (questionText) => {

  const userId = localStorage.getItem("userId");

const report =
  JSON.parse(
    localStorage.getItem(`interviewReport_${userId}`)
  ) || {};

  if (!report.rounds) {

    report.rounds = {};

  }

  const roundName = currentRound.round;

  if (!report.rounds[roundName]) {

    report.rounds[roundName] = [];

  }

  // Prevent duplicate save
  const alreadyExists =
    report.rounds[roundName].some(
      (item) => item.question === questionText
    );

  if (alreadyExists) return;

  report.rounds[roundName].push({

    skipped: true,

    question: questionText,

    answer: "Not Answered",

    score: 0,

    feedback: "Question skipped by candidate.",

    expectedAnswer: "",

    isCorrect: false,

    strengths: [],

    improvements: []

  });

 localStorage.setItem(

  `interviewReport_${userId}`,

  JSON.stringify(report)

);

};

 // ======================================
// Submit Answer
// ======================================

const submitAnswer = async () => {
  if (submitting) return;
  if (!answer.trim()) {

    alert("Please enter your answer.");

    return;

  }

  try {

    setSubmitting(true);

    const res = await evaluateCompanyInterview({

      question: currentQuestion,

      answer,

    });

    const result = res.data.result;

 
const userId = localStorage.getItem("userId");

const report =
  JSON.parse(
    localStorage.getItem(`interviewReport_${userId}`)
  ) || {};
    if (!report.rounds) {

      report.rounds = {};

    }

    const roundName =
      currentRound.round;

    if (!report.rounds[roundName]) {

      report.rounds[roundName] = [];

    }

    report.rounds[roundName].push({

      skipped: false,

      question: currentQuestion,

      answer,

      score: Number(result.score) || 0,

      feedback: result.feedback,

      expectedAnswer: result.expectedAnswer,

      isCorrect: result.isCorrect,

      strengths: result.strengths || [],

      improvements: result.improvements || []

    });
localStorage.setItem(
  `interviewReport_${userId}`,
  JSON.stringify(report)
);

    setFeedback(result.feedback);

    setExpectedAnswer(result.expectedAnswer);

    setIsCorrect(result.isCorrect);

    setCanProceed(true);

  }

  catch (error) {

    alert(

      error.response?.data?.message ||

      "Evaluation Failed"

    );

  }

  finally {

    setSubmitting(false);

  }

};// ======================================
// Finish Interview
// ======================================

const finishInterview = () => {

  alert("🎉 Interview Completed");

 
const userId = localStorage.getItem("userId");

const report =
  JSON.parse(
    localStorage.getItem(`interviewReport_${userId}`)
  ) || {};
  const rounds = report.rounds || {};

  let overallRoundScore = 0;

  let totalRounds = 0;

  Object.keys(rounds).forEach((roundName) => {

    const roundQuestions = rounds[roundName];

    const totalQuestions = roundQuestions.length;

    const totalScore = roundQuestions.reduce(

      (sum, item) => sum + (Number(item.score) || 0),

      0

    );

    const roundAverage =
      totalQuestions > 0
        ? Math.round(totalScore / totalQuestions)
        : 0;

    report[roundName] = roundAverage;

    overallRoundScore += roundAverage;

    totalRounds++;

  });

  report.overallScore =
    totalRounds > 0
      ? Math.round(overallRoundScore / totalRounds)
      : 0;

  report.date = new Date().toLocaleDateString();


localStorage.setItem(
  `interviewReport_${userId}`,
  JSON.stringify(report)
);

localStorage.setItem(
  `interviewReport_${userId}`,
  JSON.stringify(report)
);

  const history =
  JSON.parse(
    localStorage.getItem(`interviewHistory_${userId}`)
  ) || [];
const interviewId = Date.now();

const alreadyExists = history.some(

  (item) =>

    item.company === company.company &&

    item.role === company.role &&

    item.date === report.date

);

if (!alreadyExists) {

  history.unshift({

    id: interviewId,

    company: company.company,

    role: company.role,

    date: report.date,

    overallScore: report.overallScore,

    report,

  });

}

localStorage.setItem(
  `interviewHistory_${userId}`,
  JSON.stringify(history)
);

  navigate("/interview-completed");

};

// ======================================
// Next Question
// ======================================

const nextQuestion = () => {

  setAnswer("");

  setFeedback("");

  setExpectedAnswer("");

  setIsCorrect(false);

  setCanProceed(false);

  

  if (currentQuestionIndex < questions.length - 1) {

    setCurrentQuestionIndex((prev) => prev + 1);

    return;

  }

  // ==========================
  // Round Finished
  // Save Remaining Questions
  // ==========================

  questions.forEach((q) => {

    saveSkippedQuestion(q);

  });

  // ==========================
  // Next Round
  // ==========================

  if (currentRoundIndex < interview.length - 1) {

    alert(`${currentRound.round} Completed`);

    setCurrentRoundIndex((prev) => prev + 1);

    setCurrentQuestionIndex(0);

    return;

  }

  // ==========================
  // Interview Finished
  // ==========================

  finishInterview();

};
// ======================================
// Skip Round
// ======================================

const skipRound = () => {

  // Save every question in this round

  questions.forEach((q) => {

    saveSkippedQuestion(q);

  });

  setShowSkipModal(false);

  // Next Round

  if (currentRoundIndex < interview.length - 1) {

    alert(`${currentRound.round} Skipped`);

    setCurrentRoundIndex((prev) => prev + 1);

    setCurrentQuestionIndex(0);

    setAnswer("");

    setFeedback("");

    setExpectedAnswer("");

    setCanProceed(false);

    setIsCorrect(false);

    return;

  }

  // Last Round

  finishInterview();

};

return (
  <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-900 md:p-6">
    <div className="mx-auto max-w-5xl">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,.07)] md:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
              {currentRound.round}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Round {currentRoundIndex + 1} of {interview.length}
            </p>
          </div>
          <button
            onClick={() => setShowSkipModal(true)}
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 md:px-6 md:py-3"
          >
            Skip Round
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-end justify-between">
            <p className="text-sm font-semibold text-slate-700 md:text-base">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-sm font-semibold text-sky-700">
              {Math.round(
                ((currentQuestionIndex + 1) / questions.length) * 100
              )}%
            </p>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 md:h-3">
            <div
              className="h-full bg-sky-600 transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
          <h2 className="text-base font-semibold leading-relaxed text-slate-900 md:text-lg">
            {currentQuestion}
          </h2>
        </div>

        {/* Answer */}
        <textarea
          rows={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100 md:mt-6 md:py-4"
        />

        <div className="mt-4 md:mt-6">
          <button
            onClick={submitAnswer}
            disabled={submitting}
            className="w-full rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,.25)] transition-all duration-300 hover:bg-sky-700 hover:shadow-[0_14px_30px_rgba(14,165,233,.35)] disabled:opacity-70 md:w-auto md:px-8 md:py-3.5"
          >
            {submitting ? "Checking..." : "Submit Answer"}
          </button>
        </div>

        {/* AI Feedback */}
        {feedback && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:mt-8 md:p-6">
            <h2 className="text-base font-bold text-slate-900 md:text-lg">
              AI Feedback
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {feedback}
            </p>

            {!isCorrect && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-sky-700 md:text-base">
                  View Expected Answer
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  {expectedAnswer}
                </p>
              </details>
            )}

            {canProceed && (
              <button
                onClick={nextQuestion}
                className="mt-4 w-full rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(16,185,129,.25)] transition-all duration-300 hover:bg-emerald-700 hover:shadow-[0_14px_30px_rgba(16,185,129,.35)] md:w-auto md:px-8 md:py-3.5"
              >
                {currentQuestionIndex === questions.length - 1
                  ? currentRoundIndex === interview.length - 1
                    ? "🎉 Finish Interview"
                    : "Next Round →"
                  : "Next Question →"}
              </button>
            )}
          </div>
        )}

        {/* Skip Round Modal */}
        {showSkipModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,.2)]">
              <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                Skip Round?
              </h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                Are you sure you want to skip
                <br />
                <span className="font-bold text-rose-600">
                  {currentRound.round}
                </span>
                ?
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => setShowSkipModal(false)}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:px-8"
                >
                  Cancel
                </button>
                <button
                  onClick={skipRound}
                  className="rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 md:px-8"
                >
                  Skip Round
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

}

export default CompanyInterview;