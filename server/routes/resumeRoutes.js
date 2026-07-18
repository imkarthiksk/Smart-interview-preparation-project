const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getResume,
  deleteResume,
} = require("../controllers/resumeController");

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/",
  authMiddleware,
  getResume
);

router.delete(
  "/",
  authMiddleware,
  deleteResume
);

module.exports = router;