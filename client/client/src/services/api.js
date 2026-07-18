import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ======================
// Attach JWT Token
// ======================

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

// ======================
// AUTH
// ======================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ======================
// DASHBOARD
// ======================

export const getDashboard = () =>
  API.get("/dashboard");

// ======================
// PROFILE
// ======================

export const getProfile = () =>
  API.get("/profile");

export const updateProfile = (data) =>
  API.put("/profile", data);

// ======================
// RESUME
// ======================

export const uploadResume = (formData) =>
  API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getResume = () =>
  API.get("/resume");

export const deleteResume = () =>
  API.delete("/resume");

// ======================
// INTERVIEW
// ======================

export const generateInterviewQuestions = (data) =>
  API.post("/interview/generate", data);

export const evaluateInterviewAnswer = (data) =>
  API.post("/interview/evaluate", data);

export const getInterviewHistory = () =>
  API.get("/interview/history");

// ======================
// COMPANY INTERVIEW
// ======================

export const analyzeCompany = (data) =>
  API.post("/company/analyze", data);

export const startCompanyInterview = (data) =>
  API.post("/company-interview/start", data);

export const evaluateCompanyInterview = (data) =>
  API.post("/company-interview/evaluate", data);


export default API;