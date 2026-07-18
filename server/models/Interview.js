const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questions: {
      type: [String],
      default: [],
    },

    answers: {
      type: [String],
      default: [],
    },

  result: {

    overallScore: {
        type: Number,
        default: 0,
    },

    technicalScore: {
        type: Number,
        default: 0,
    },

    communicationScore: {
        type: Number,
        default: 0,
    },

    confidenceScore: {
        type: Number,
        default: 0,
    },

    grammarScore: {
        type: Number,
        default: 0,
    },

    suggestions: {
        type: [String],
        default: [],
    },

    questionReview: [
        {
            question: String,

            userAnswer: String,

            expectedAnswer: String,

            technicalScore: Number,

            communicationScore: Number,

            grammarScore: Number,

            confidenceScore: Number,

            strengths: [String],

            weaknesses: [String]
        }
    ]

  },
  },
  { timestamps: true }
);  

module.exports = mongoose.model("Interview", interviewSchema);