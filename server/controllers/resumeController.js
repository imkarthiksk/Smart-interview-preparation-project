const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {

    try {

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        const resume = await Resume.create({

            user: req.user.id,

            resumePath: file.path

        });

        return res.status(201).json({

            success: true,

            message: "Resume Uploaded Successfully",

            resume

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
const getResume = async (req, res) => {

    try{

        const resume = await Resume.findOne({

            user:req.user.id

        });

        if(!resume){

            return res.status(404).json({

                success:false,

                message:"Resume not found"

            });

        }

        res.status(200).json({

            success:true,

            resume

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
const deleteResume = async (req, res) => {

    try {

        const resume = await Resume.findOne({
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        await Resume.findByIdAndDelete(resume._id);

        res.status(200).json({
            success: true,
            message: "Resume deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    uploadResume,
    getResume,
    deleteResume
};