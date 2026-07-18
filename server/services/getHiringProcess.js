const companyProcess = require("../data/companyProcess");

const getHiringProcess = async (company) => {

  if (companyProcess[company]) {
    return companyProcess[company].rounds;
  }

  return [
    "Resume Screening",
    "Technical Interview",
    "HR Interview"
  ];

};

module.exports = {
  getHiringProcess,
};