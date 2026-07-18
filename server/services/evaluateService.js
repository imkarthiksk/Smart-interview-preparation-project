const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const evaluateAnswer = async (question, answer) => {

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
You are an experienced technical interviewer.

Evaluate the candidate's answer.

Give:

1. Score out of 10
2. Strengths
3. Weaknesses
4. Correct Answer
5. Suggestions for improvement

Return plain text.
`,
      },
      {
        role: "user",
        content: `
Question:
${question}

Candidate Answer:
${answer}
`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = evaluateAnswer;