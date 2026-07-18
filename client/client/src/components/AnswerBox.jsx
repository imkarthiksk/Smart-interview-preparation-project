function AnswerBox({ answer, setAnswer }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-5">
        Your Answer
      </h2>

      <textarea
        rows={10}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full border-2 border-gray-300 rounded-xl p-5 resize-none focus:outline-none focus:border-blue-600"
      />

      <div className="flex justify-between mt-4 text-gray-500">

        <span>
          Characters : {answer.length}
        </span>

        <span>
          Words : {
            answer.trim()
              ? answer.trim().split(/\s+/).length
              : 0
          }
        </span>

      </div>

    </div>
  );
}

export default AnswerBox;