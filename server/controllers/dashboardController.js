const User = require("../models/User");
const Resume = require("../models/Resume");
const Interview = require("../models/Interview");

const getDashboard = async (req, res) => {

    try {

        const userId = req.user.id;

        const user = await User.findById(userId);

        const resume = await Resume.findOne({ user: userId });

        const interviews = await Interview.find({ user: userId });

        let bestScore = 0;
        let totalScore = 0;
        let latestInterview = null;

        interviews.forEach((item) => {

            const score = item.result?.overallScore || 0;

            totalScore += score;

            if (score > bestScore) {
                bestScore = score;
            }

        });

        const averageScore =
            interviews.length > 0
                ? Math.round(totalScore / interviews.length)
                : 0;

        if (interviews.length > 0) {

            latestInterview = interviews.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )[0];

        }

        res.status(200).json({

            success: true,

            dashboard: {

                name: user.name,

                email: user.email,

                atsScore: resume?.analysis?.atsScore || 0,

                companyMatch: resume?.analysis?.companyMatch || {},

                totalInterviews: interviews.length,

                bestScore,

                averageScore,

                latestInterview,

                profileCompleted: !!user,

                resumeUploaded: !!resume,

                interviewCompleted: interviews.length > 0

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboard
};