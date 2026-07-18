const axios = require("axios");
const { getHiringProcess } = require("./getHiringProcess");

const generateCompanyInterview = async (
  company,
  role,
  experience
) => {

  // Get hiring rounds
  const rounds = await getHiringProcess(
    company,
    role,
    experience
  );

  const interview = [];

  for (const round of rounds) {

   const prompt = `
You are a REAL Senior Interviewer at ${company}.

Candidate Information

Company:
${company}

Role:
${role}

Experience:
${experience}

Current Hiring Round:
${round}

---------------------------------------------------

IMPORTANT

First understand the candidate's ROLE.

Do NOT assume the candidate belongs to IT.

The candidate may belong to ANY profession.

Examples include (not limited to):

- Software
- Mechanical
- Civil
- Electrical
- Electronics
- Automobile
- Aerospace
- Biotechnology
- Biology
- Chemistry
- Physics
- Mathematics
- Medical
- Nursing
- Pharmacy
- Dentistry
- Veterinary
- Law
- Finance
- Banking
- Accounting
- Human Resources
- Marketing
- Sales
- Customer Support
- Teaching
- Research
- Journalism
- Graphic Design
- UI/UX
- Fashion
- Architecture
- Hotel Management
- Aviation
- Logistics
- Agriculture
- Government
- Business
- Any other profession.

---------------------------------------------------

Your job is to FIRST identify the candidate's industry from the role.

Then generate interview questions ONLY for that profession.

Never generate programming questions unless the role actually requires programming.

Every question should match:

1. Candidate Role
2. Candidate Experience
3. Current Hiring Round
4. Company

---------------------------------------------------

Hiring Round Behaviour

Resume Screening

Ask about:

- Resume
- Projects
- Experience
- Achievements
- Career
- Introduction

Technical Round

Ask ONLY technical questions related to the candidate's profession.

Examples

Doctor

Medical diagnosis
Patient care
Emergency treatment

Mechanical Engineer

CAD
Thermodynamics
Machine Design

Sales Executive

Negotiation
Customer Handling
Sales Strategy

Teacher

Teaching Methods
Subject Knowledge
Classroom Management

Software Engineer

Programming
DSA
Frameworks
Projects

Manager Round

Leadership

Ownership

Decision Making

Problem Solving

Real Scenarios

Team Matching

Communication

Teamwork

Conflict Resolution

Behaviour

Culture Fit

HR Round

Strength

Weakness

Salary

Relocation

Career Goals

Why ${company}

---------------------------------------------------

Generate EXACTLY 5 interview questions.

Questions should become gradually harder.

Do NOT repeat questions.

Behave exactly like a real interviewer.

Return ONLY JSON.

{
  "round":"${round}",
  "questions":[
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}
`;

    try {

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

          temperature: 0.3,
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

      interview.push(JSON.parse(data));

    } catch (err) {

      console.log(err.response?.data || err.message);

    }

  }

  return interview;

};
// ========================================
// Evaluate Interview Answer
// ========================================

const evaluateAnswer = async (

  question,

  answer

) => {

  try {

   const prompt = `
You are a Senior Professional Interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate exactly like a real interviewer.

Rules:

1. Check whether the answer actually answers the question.

2. Give a score out of 20.

3. Give constructive feedback.

4. Explain what is missing if the answer is weak.

5. Provide an ideal answer.

6. Mention strengths.

7. Mention improvements.

Return ONLY JSON.

{
  "score":18,
  "isCorrect":true,
  "feedback":"...",
  "expectedAnswer":"...",
  "strengths":[
    "...",
    "..."
  ],
  "improvements":[
    "...",
    "..."
  ]
}
`;

    const response = await axios.post(

      "https://api.groq.com/openai/v1/chat/completions",

      {

        model: "llama-3.3-70b-versatile",

        messages: [

          {

            role: "user",

            content: prompt

          }

        ],

        temperature: 0.2

      },

      {

        headers: {

          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,

          "Content-Type": "application/json"

        }

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

    console.log(

      error.response?.data ||

      error.message

    );

    throw new Error("Evaluation Failed");

  }

};
module.exports = {
  generateCompanyInterview,
  evaluateAnswer,
};