const Resume = require("../models/Resume");
const parseResume = require("../utils/parseResume");
const analyzeResume = require("../services/groqService");

// ======================
// Upload Resume
// ======================

const uploadResume = async (req, res) => {

  try {

    const file = req.file;
    const { role, experience } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    if (!role || !experience) {
      return res.status(400).json({
        success: false,
        message: "Role and Experience are required",
      });
    }

    // Parse Resume
    const resumeText = await parseResume(file.path);

    console.log("Resume Parsed Successfully");

    // AI Analysis
   // AI Analysis
const analysis = await analyzeResume(
  resumeText,
  role,
  experience
);

// Check Resume Validity
if (!analysis.isResume) {

  return res.status(400).json({

    success: false,

    message: analysis.message

  });

}

    // Delete old resume
    await Resume.findOneAndDelete({
      user: req.user.id,
    });

    // Save new resume
    const resume = await Resume.create({

      user: req.user.id,

      role,

      experience,

      resumePath: file.path,

      resumeText,

      analysis

    });

    return res.status(201).json({

      success: true,

      message: "Resume Uploaded Successfully",

      resume,

      analysis

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ======================
// Get Resume
// ======================

const getResume = async (req, res) => {

  try {

    const resume = await Resume.findOne({
      user: req.user.id,
    });

    if (!resume) {

      return res.status(404).json({

        success: false,

        message: "Resume not found",

      });

    }

    return res.status(200).json({

      success: true,

      resume,

      analysis: resume.analysis

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ======================
// Delete Resume
// ======================

const deleteResume = async (req, res) => {

  try {

    const resume = await Resume.findOne({
      user: req.user.id,
    });

    if (!resume) {

      return res.status(404).json({

        success: false,

        message: "Resume not found",

      });

    }

    await Resume.findByIdAndDelete(resume._id);

    return res.status(200).json({

      success: true,

      message: "Resume Deleted Successfully",

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

module.exports = {

  uploadResume,

  getResume,

  deleteResume,

};