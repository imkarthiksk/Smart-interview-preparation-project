function ResumeStatus({ resume }) {

  if (!resume) {

    return (

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Resume Status
        </h2>

        <p className="text-gray-500">
          Loading Resume...
        </p>

      </div>

    );

  }

  return (

    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8">

      <h2 className="text-2xl font-bold mb-4">

        Resume Status

      </h2>

      <div className="space-y-3">

        <p>

          ✅ Resume Uploaded Successfully

        </p>

        <p>

          💼 Role Detected :

          <span className="font-bold text-blue-700">

            {" "}{resume.role}

          </span>

        </p>

        <p>

          👨‍💻 Experience :

          <span className="font-bold text-blue-700">

            {" "}{resume.experience}

          </span>

        </p>

        <p>

          📊 ATS Score :

          <span className="font-bold text-green-600">

            {" "}{resume.analysis?.atsScore || 0}%

          </span>

        </p>

      </div>

    </div>

  );

}

export default ResumeStatus;