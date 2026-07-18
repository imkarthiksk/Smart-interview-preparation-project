import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Report() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);
const userId = localStorage.getItem("userId");
  useEffect(() => {

   const report = JSON.parse(
  localStorage.getItem(`selectedInterview_${userId}`)
);

    if (report) {
      setData(report);
    }

  }, []);
    if (!data) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-3xl font-bold">

          Loading Report...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-blue-700">

              Interview Report

            </h1>

            <p className="text-gray-500 mt-2">

              Complete Performance Analysis

            </p>

          </div>

          <button

            onClick={() => navigate("/history")}

            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"

          >

            ← Back

          </button>

        </div>

        {/* Basic Details */}

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-gray-100 p-6 rounded-xl">

            <p className="text-gray-500">

              Company

            </p>

            <h2 className="text-2xl font-bold">

              {data.company}

            </h2>

          </div>

          <div className="bg-gray-100 p-6 rounded-xl">

            <p className="text-gray-500">

              Role

            </p>

            <h2 className="text-2xl font-bold">

              {data.role}

            </h2>

          </div>

          <div className="bg-gray-100 p-6 rounded-xl">

            <p className="text-gray-500">

              Date

            </p>

            <h2 className="text-2xl font-bold">

              {data.date}

            </h2>

          </div>

          <div className="bg-blue-100 p-6 rounded-xl">

            <p className="text-blue-700">

              Overall Score

            </p>

            <h2 className="text-4xl font-bold text-blue-700">

              {data.overallScore}%

            </h2>

          </div>

        </div>
                {/* Round Details */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-8">

            Round Wise Performance

          </h2>

          {

            Object.entries(data.report.rounds || {}).map(

              ([roundName, questions], index) => (

                <div

                  key={index}

                  className="bg-gray-100 rounded-2xl p-8 mb-10"

                >

                  <h2 className="text-2xl font-bold text-blue-700 mb-6">

                    {roundName}

                  </h2>

                  {

                    questions.map((item, i) => (

                      <div

                        key={i}

                        className="bg-white rounded-xl shadow-md p-6 mb-6"

                      >

                        <h3 className="font-bold text-lg">

                          Question {i + 1}

                        </h3>

                        <p className="mt-2">

                          {item.question}

                        </p>

<h3 className="font-bold mt-6">

  Your Answer

</h3>

<p className="mt-2">

  {item.answer}

</p>

{item.skipped && (

  <div className="mt-5 bg-yellow-100 border border-yellow-400 rounded-xl p-5">

    <h3 className="text-xl font-bold text-yellow-700">

      ⚠ You skipped this round

    </h3>

    <p className="mt-2 text-gray-700">

      This interview round was skipped.

      No evaluation was performed.

    </p>

  </div>

)}

                        <div className="grid grid-cols-2 gap-6 mt-6">

                          <div>

                            <h3 className="font-bold text-green-700">

                              Score

                            </h3>

             <p className="text-xl font-bold">

  {

    item.skipped

      ? "Skipped"

      : `${item.score}/20`

  }

</p>

                          </div>

                          <div>

                            <h3 className="font-bold text-blue-700">

                              Result

                            </h3>

   <p className="text-xl font-bold">

  {

    item.skipped

      ? "⚠ Skipped"

      : item.isCorrect

      ? "✅ Correct"

      : "❌ Incorrect"

  }

</p>

                          </div>

                        </div>

                        <div className="mt-6">

                          <h3 className="font-bold text-blue-700">

                            AI Feedback

                          </h3>

                          <p className="mt-2">

                            {item.feedback}

                          </p>

                        </div>

                        <div className="mt-6">

                          <h3 className="font-bold text-purple-700">

                            Expected Answer

                          </h3>

                          <p className="mt-2">

                            {item.expectedAnswer}

                          </p>

                        </div>

                      </div>

                    ))

                  }

                </div>

              )

                    )}

        </div>

        {/* Action Buttons */}

        <div className="flex justify-center gap-5 mt-10">

          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
          >
            🖨 Print Report
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>

  );

}

export default Report;