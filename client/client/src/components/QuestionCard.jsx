function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  previousQuestion,
  nextQuestion,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-blue-700">
          AI Interview Question
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          {currentQuestion + 1} / {totalQuestions}
        </span>

      </div>

      <div className="bg-gray-100 rounded-xl p-6 min-h-[140px] flex items-center">

        <p className="text-xl text-gray-700 leading-8">
          {question || "Loading question..."}
        </p>

      </div>

      <div className="flex justify-between mt-8">

        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl transition"
        >
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentQuestion === totalQuestions - 1}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl transition"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default QuestionCard;