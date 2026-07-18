const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  companyAnalysis,
} = require("../controllers/companyAnalysisController");

router.post(
  "/analyze",
  authMiddleware,
  companyAnalysis
);

module.exports = router;