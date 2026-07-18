const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    role:{
        type:String,
        required:true
    },

    experience:{
        type:String,
        required:true
    },

    resumePath:{
        type:String,
        required:true
    },

    resumeText:{
        type:String,
        required:true
    },

    analysis:{

        atsScore:{
            type:Number,
            default:0
        },

        strongSkills:{
            type:[String],
            default:[]
        },

        missingSkills:{
            type:[String],
            default:[]
        },

        weaknesses:{
            type:[String],
            default:[]
        },

        resumeImprovements:{
            type:[String],
            default:[]
        },

        recommendedProjects:{
            type:[String],
            default:[]
        },

        learningRoadmap:{
            type:[String],
            default:[]
        },

        companyMatch:{
            type:Object,
            default:{}
        },

        interviewQuestions:{
            type:[String],
            default:[]
        }

    }

},{
    timestamps:true
});

module.exports = mongoose.model("Resume",resumeSchema);