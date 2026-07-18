function InterviewQuestions({ questions = [] }) {
  return (
    <div
      className="
        rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
        transition-all duration-300
        hover:scale-[1.01] hover:shadow-[0_14px_40px_rgba(15,23,42,.12)]
        md:p-6
      "
    >
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        🎤 Interview Questions
      </h2>

      {questions.length === 0 ? (
        <p className="text-sm text-slate-400">No interview questions</p>
      ) : (
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div
              key={index}
              className="
                rounded-xl border border-rose-200 bg-rose-50 p-4
                transition-all duration-300
                hover:bg-rose-100 hover:scale-[1.01]
              "
            >
              <h3 className="mb-2 text-sm font-semibold text-rose-700">
                Question {index + 1}
              </h3>
              <p className="text-sm leading-relaxed text-slate-700">
                {question}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewQuestions;