function CompanyMatch({ companies = {} }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-cyan-600 mb-6">
        🏢 Company Match
      </h2>

      {Object.keys(companies).length === 0 ? (

        <p className="text-gray-500">
          No Company Match Available
        </p>

      ) : (

        <div className="space-y-5">

          {Object.entries(companies).map(([company, score]) => (

            <div key={company}>

              <div className="flex justify-between mb-2">

                <span className="font-semibold">
                  {company}
                </span>

                <span className="text-blue-600 font-bold">
                  {score}%
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${score}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default CompanyMatch;