const mongoose = require("mongoose");

const interviewHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    evaluation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewHistory",
  interviewHistorySchema
);