const mongoose = require("mongoose");

const companyInterviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: String,

    role: String,

    experience: String,

    currentRound: {
      type: Number,
      default: 0,
    },

    rounds: [
      {
        roundName: String,

        questions: [String],

        answers: [String],

        score: {
          type: Number,
          default: 0,
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    finalScore: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CompanyInterview",
  companyInterviewSchema
);