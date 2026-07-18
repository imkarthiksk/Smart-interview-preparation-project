const axios = require("axios");

// ==========================
// Generate Interview Questions
// ==========================
const generateQuestions = async ({
  role,
  experience,
  company,
  location,
  type,
  resumeText,
}) => {

  try {

    const prompt = `

You are a Senior Interviewer.

Conduct a REAL company interview.

Candidate Details

Role:
${role}

Experience:
${experience}

Target Company:
${company}

Location:
${location}

Interview Type:
${type}

Resume:
${resumeText}

--------------------------------------------------

Your task is to generate exactly 101interview questions.

The interview MUST feel exactly like a real interview conducted by ${company}.

Rules

• Questions must match the role.

• Questions must match the company.

• Questions must match the experience level.

• Questions must match the resume.

• Questions must become harder gradually.

• Do NOT ask random questions.

--------------------------------------------------

If type = Technical

Generate:
javascript
java
spring boot
Ui and UX
React
dev tools
Node

Express

MongoDB

Projects

Internship

API

JWT

Performance

Scenario

--------------------------------------------------

If type = HR

Generate:

Tell me about yourself

Strengths

Weakness

Conflict

Leadership

Teamwork

Career Goal

Why ${company}

Relocation

Salary

--------------------------------------------------

If type = Aptitude

Generate logical reasoning,

problem solving,

percentages,

time complexity,

basic coding logic,

arrays,

output questions,

simple puzzles.

--------------------------------------------------

Return ONLY JSON

{
  "questions":[
     "...",
     "...",
     "...",
     "...",
     "...",
     "...",
     "...",
     "...",
     "...",
     "..."
  ]
}

Do NOT return explanation.

Do NOT use markdown.

Return ONLY JSON.

`;

    const response = await axios.post(

      "https://api.groq.com/openai/v1/chat/completions",

      {

        model: "llama-3.3-70b-versatile",

        messages: [

          {

            role: "user",

            content: prompt,

          },

        ],

        temperature: 0.4,

      },

      {

        headers: {

          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,

          "Content-Type": "application/json",

        },

      }

    );

    let data = response.data.choices[0].message.content;

    data = data
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(data);

  }

  catch (error) {

    console.log(error.response?.data || error.message);

    throw new Error("Question Generation Failed");

  }

};

// ==========================
// Evaluate Interview Answers
// ==========================
const evaluateAnswers = async (questions, answers) => {
  try {

  const prompt = `
You are a Senior Technical Interviewer at Google.

Evaluate each answer individually.

Return ONLY valid JSON.

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "confidenceScore": 0,
  "grammarScore": 0,
  "suggestions": [],
  "questionReview": [
    {
      "question": "",
      "userAnswer": "",
      "expectedAnswer": "",
      "technicalScore": 0,
      "communicationScore": 0,
      "grammarScore": 0,
      "confidenceScore": 0,
      "strengths": [],
      "weaknesses": []
    }
  ]
}

Interview Questions:
${JSON.stringify(questions)}

Candidate Answers:
${JSON.stringify(answers)}

Rules:

- Evaluate EVERY question separately.
- Give technical score out of 10.
- Give communication score out of 10.
- Give grammar score out of 10.
- Give confidence score out of 10.
- Generate a professional expected answer.
- Mention strengths.
- Mention weaknesses.
- Give an overall interview score out of 100.
- Return ONLY JSON.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let data = response.data.choices[0].message.content;

    console.log("========== AI RESPONSE ==========");
    console.log(data);
    console.log("=================================");

    data = data
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(data);

  } catch (error) {

    console.log("========== GROQ ERROR ==========");
    console.log(error.response?.data || error.message);
    console.log("================================");

    throw new Error("Interview Evaluation Failed");
  }
};

module.exports = {
  generateQuestions,
  evaluateAnswers,
};