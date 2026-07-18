const axios = require("axios");
const analyzeCompany = async (company, role) => {

  try {

    const prompt = `
You are an expert Technical Recruiter.

Company:
${company}

Role:
${role}

Return ONLY valid JSON.

{
  "company":"",
  "difficulty":"",
  "duration":"",
  "rounds":[],
  "topics":[],
  "tips":[]
}

Rules:

Difficulty should be:
Easy
Medium
Hard
Very Hard

Rounds should contain actual interview rounds followed by the company.

Topics should contain technologies frequently asked.

Tips should contain 5 preparation tips.

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

    return JSON.parse(data);

  }

  catch (error) {

    console.log(error.response?.data || error.message);

    throw new Error("Company Analysis Failed");

  }

};

module.exports = {

  analyzeCompany,

};