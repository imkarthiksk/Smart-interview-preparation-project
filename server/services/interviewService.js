const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateQuestions = async (resumeText) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
You are an expert technical interviewer.

Based on the candidate's resume generate:

1. Five Technical Questions
2. Three HR Questions
3. Three Behavioral Questions

Return only plain text.
`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ],
  });

  return completion.choices[0].message.content;
};

module.exports = generateQuestions;