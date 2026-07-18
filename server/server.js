const express = require("express");
const dotenv = require("dotenv");

// Load .env
dotenv.config();

const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");



// Connect Database
connectDB();

// Create Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
const companyInterviewRoutes = require("./routes/companyInterviewRoutes");
const companyAnalysisRoutes = require("./routes/companyAnalysisRoutes");

app.use(
  "/api/company-interview",
  companyInterviewRoutes
);
app.use(
  "/api/company",
  companyAnalysisRoutes
);
app.use(
"/api/company-interview",
companyInterviewRoutes
);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("Smart Interview Preparation Platform API Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});