const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const axios = require("axios");

const analyzeResume = async (resumeText, role, experience) => {

    try {

        const prompt = `

You are a Senior Resume Reviewer with 15+ years of experience in Technical Hiring, HR Recruitment and ATS Resume Screening.

Your job is to analyze ONLY the uploaded resume for the TARGET ROLE.

Role:
${role}

Experience:
${experience}

Resume:
${resumeText}

========================================================
TASKS
========================================================

1. First determine whether this uploaded file is actually a resume.

If it is NOT a resume
(example:
movie ticket,
bank statement,
college marksheet,
blank document,
invoice,
random text,
certificate,
image OCR garbage,
etc.)

Return:

{
"isResume": false,
"message": "Invalid Resume. Please upload a professional resume.",
"atsScore":0,
"profileSummary":"",
"strongSkills":[],
"missingSkills":[],
"weaknesses":[],
"resumeImprovements":[],
"recommendedProjects":[],
"learningRoadmap":[]
}

STOP.

========================================================

If it IS a resume

Return

{
"isResume": true,
"message":"Resume Analysis Successful",

"atsScore":85,

"profileSummary":"Write a professional 5-7 line summary about this candidate based on the resume and target role.",

"strongSkills":[
"...",
"...",
"...",
"...",
"..."
],

"missingSkills":[
"...",
"...",
"...",
"...",
"..."
],

"weaknesses":[
"...",
"...",
"...",
"...",
"..."
],

"resumeImprovements":[
"...",
"...",
"...",
"...",
"..."
],

"recommendedProjects":[
"...",
"...",
"..."
],

"learningRoadmap":[
"...",
"...",
"...",
"...",
"..."
]

}

========================================================
SCORING RULE
========================================================

ATS Score should consider

• Resume format
• Keywords
• Skills
• Experience
• Projects
• Certifications
• Education
• Resume readability
• Role match

Return score between 0-100.

========================================================
PROFILE SUMMARY
========================================================

Generate like a real recruiter.

Mention

• Experience level
• Strong technologies
• Career level
• Overall impression
• Suitability for selected role

========================================================
STRONG SKILLS
========================================================

Mention ONLY skills found in resume.

Examples

React
Node.js
MongoDB
Express
JavaScript
Python
SQL

========================================================
MISSING SKILLS
========================================================

You are an expert technical recruiter.

Candidate Resume:
{resumeText}

Target Role:
{role}

Tasks:

1. Read the resume carefully.
2. Compare it with the target role.
3. Identify only the important skills that are missing.
4. Do NOT output generic examples.
5. Do NOT repeat skills already present in the resume.
6. Return only the actual missing skills.

Output Format:

Missing Skills:
- Skill 1
- Skill 2
- Skill 3
- Skill 4
- Skill 5

========================================================
WEAKNESSES
========================================================
You are a Senior Technical HR.

Candidate Resume:
{resumeText}

Target Role:
{role}

Analyze the resume and compare it with the target role.

Identify only realistic weaknesses.

Focus on:

- Missing technologies
- Missing tools
- Missing frameworks
- Missing practical experience
- Missing project complexity
- Missing deployment experience
- Missing testing knowledge
- Missing architecture knowledge

Do NOT generate generic weaknesses.

Do NOT copy examples.

Only mention weaknesses that are actually missing from this resume for this role.

Return 4-6 bullet points.

========================================================
RESUME IMPROVEMENTS
========================================================

Give practical recruiter suggestions.

Examples

Quantify achievements

Improve project descriptions

Add GitHub links

Add portfolio

Improve ATS keywords

========================================================
RECOMMENDED PROJECTS
========================================================

Suggest only 3 portfolio-quality projects that will improve chances for the selected role.

========================================================
LEARNING ROADMAP
========================================================

Provide a step-by-step roadmap.

Example

Week 1

Week 2

Week 3

Week 4

Week 5

========================================================
IMPORTANT RULES
========================================================

Return ONLY JSON.

No markdown.

No explanation.

No \`\`\`

No extra text.

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

                temperature: 0.3

            },

            {

                headers: {

                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,

                    "Content-Type": "application/json"

                }

            }

        );

        // Get AI response
        let aiResponse = response.data.choices[0].message.content;

        // Remove markdown if Groq returns it
        aiResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Convert JSON string to JavaScript object
        const parsedResponse = JSON.parse(aiResponse);

        return parsedResponse;

    }

    catch (error) {

        console.log("========== GROQ ERROR ==========");

        console.log(error.response?.data || error.message);

        console.log("================================");

        throw new Error("Groq AI Error");

    }
    

};


module.exports = analyzeResume;