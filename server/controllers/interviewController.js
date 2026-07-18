const Interview = require("../models/Interview");
const Resume = require("../models/Resume");
const {
  generateQuestions,
  evaluateAnswers,
} = require("../services/groqInterviewService");

// =========================
// Generate Questions
// =========================

const generateInterviewQuestions = async (req, res) => {
  try {

    const { company, location, type } = req.body;

    const resume = await Resume.findOne({
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const resumeText = resume.resumeText;

    const role = resume.role;

    const experience = resume.experience;

    const data = await generateQuestions({

      role,

      experience,

      company,

      location,

      type,

      resumeText,

    });

    res.status(200).json({

      success: true,

      company,

      role,

      location,

      experience,

      type,

      questions: data.questions,

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================
// Evaluate Interview
// =========================

const evaluateInterview = async (req, res) => {
  try {
    const { questions, answers } = req.body;

    const result = await evaluateAnswers(
      questions,
      answers
    );

    await Interview.create({
      user: req.user.id,
      questions,
      answers,
      result,
    });

    res.status(200).json({
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

// =========================
// Interview History
// =========================

const getInterviewHistory = async (req, res) => {
  try {
    const history = await Interview.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  evaluateInterview,
  getInterviewHistory,
};