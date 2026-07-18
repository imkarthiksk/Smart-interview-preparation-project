const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  generateInterviewQuestions,
  evaluateInterview,
  getInterviewHistory,
} = require("../controllers/interviewController");

// Generate Questions
router.post(
  "/generate",
  authMiddleware,
  generateInterviewQuestions
);

// Evaluate Interview
router.post(
  "/evaluate",
  authMiddleware,
  evaluateInterview
);

// Interview History
router.get(
  "/history",
  authMiddleware,
  getInterviewHistory
);

module.exports = router;