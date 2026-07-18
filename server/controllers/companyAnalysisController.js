const { analyzeCompany } = require("../services/companyAnalysisService");

const companyAnalysis = async (req, res) => {

  console.log("BODY =>", req.body);

  try {

    const { company, role } = req.body;

    console.log("Company :", company);
    console.log("Role :", role);

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and Role are required.",
      });
    }

    const result = await analyzeCompany(company, role);

    res.status(200).json({
      success: true,
      analysis: result,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = { companyAnalysis };