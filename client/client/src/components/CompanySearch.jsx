import { useState } from "react";

const companies = [
  "Google",
  "Amazon",
  "Microsoft",
  "Apple",
  "Meta",
  "Netflix",
  "OpenAI",
  "Tesla",
  "NVIDIA",
  "Adobe",
  "Oracle",
  "IBM",
  "Intel",
  "Cisco",
  "Zoho",
  "TCS",
  "Infosys",
  "Wipro",
  "Accenture",
  "Capgemini",
  "Cognizant",
  "HCL",
  "Freshworks",
  "Flipkart",
  "Swiggy",
  "Zomato",
  "PhonePe",
  "Razorpay"
];

function CompanySearch({ company, setCompany }) {

  const [filtered, setFiltered] = useState([]);

  const handleSearch = (value) => {

    setCompany(value);

    if (!value.trim()) {
      setFiltered([]);
      return;
    }

    setFiltered(
      companies.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="relative">

      <label className="font-semibold block mb-2">
        Search Company
      </label>

      <input
        type="text"
        placeholder="Example : Google"
        value={company}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full border rounded-xl p-3"
      />

      {filtered.length > 0 && (

        <div className="absolute bg-white w-full shadow rounded-xl border mt-1 max-h-60 overflow-y-auto z-50">

          {filtered.map((item, index) => (

            <div
              key={index}
              onClick={() => {

                setCompany(item);

                setFiltered([]);

              }}
              className="p-3 hover:bg-blue-100 cursor-pointer"
            >
              {item}
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default CompanySearch;