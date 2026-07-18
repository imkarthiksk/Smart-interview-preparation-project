function InterviewAnswerReview({ review }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold text-blue-700 mb-5">
                {review.question}
            </h2>

            <div className="mb-6">

                <h3 className="font-bold text-gray-700 mb-2">
                    Your Answer
                </h3>

                <div className="bg-gray-100 rounded-xl p-4">
                    {review.userAnswer}
                </div>

            </div>

            <div className="mb-6">

                <h3 className="font-bold text-green-700 mb-2">
                    Expected Answer
                </h3>

                <div className="bg-green-50 rounded-xl p-4">
                    {review.expectedAnswer}
                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <div className="bg-blue-100 rounded-xl p-4 text-center">
                    <p className="font-bold">Technical</p>
                    <p>{review.technicalScore}/10</p>
                </div>

                <div className="bg-yellow-100 rounded-xl p-4 text-center">
                    <p className="font-bold">Communication</p>
                    <p>{review.communicationScore}/10</p>
                </div>

                <div className="bg-green-100 rounded-xl p-4 text-center">
                    <p className="font-bold">Grammar</p>
                    <p>{review.grammarScore}/10</p>
                </div>

                <div className="bg-purple-100 rounded-xl p-4 text-center">
                    <p className="font-bold">Confidence</p>
                    <p>{review.confidenceScore}/10</p>
                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <h3 className="font-bold text-green-700 mb-3">
                        ✅ Strengths
                    </h3>

                    <ul className="list-disc ml-5">

                        {review.strengths?.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>

                <div>

                    <h3 className="font-bold text-red-700 mb-3">
                        ❌ Weaknesses
                    </h3>

                    <ul className="list-disc ml-5">

                        {review.weaknesses?.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>

            </div>

        </div>

    );

}

export default InterviewAnswerReview;