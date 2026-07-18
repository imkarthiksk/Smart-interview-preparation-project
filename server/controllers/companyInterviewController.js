const {
  generateCompanyInterview,
  evaluateAnswer,
} = require("../services/companyInterviewService");

// ============================
// Start Interview
// ============================

const startInterview = async (req, res) => {
  try {
    const { company, role, experience } = req.body;

    if (!company || !role || !experience) {
      return res.status(400).json({
        success: false,
        message: "Company, Role and Experience are required",
      });
    }

    const interview = await generateCompanyInterview(
      company,
      role,
      experience
    );

    res.json({
      success: true,
      interview,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ============================
// Evaluate Answer
// ============================

const evaluateInterviewAnswer = async (req, res) => {
  try {

    const { question, answer } = req.body;

    const result = await evaluateAnswer(
      question,
      answer
    );

    res.json({
      success: true,
      result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  startInterview,
  evaluateInterviewAnswer,
};