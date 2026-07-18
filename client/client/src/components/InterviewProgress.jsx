function InterviewProgress({ currentQuestion, totalQuestions }) {

  const percentage =
    totalQuestions === 0
      ? 0
      : Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold text-blue-700">
          Interview Progress
        </h2>

        <span className="text-xl font-bold text-blue-700">
          {percentage}%
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">

        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-4 text-center text-gray-600 font-medium">

        Question {currentQuestion + 1} of {totalQuestions}

      </div>

    </div>
  );
}

export default InterviewProgress;