const mongoose = require("mongoose");
const moment = require("moment");
const jobData = require("../schema/EmploymentData");

const jobCreate = async (req, res) => {
    try {
        const ifExists = await jobData.findOne({
            refId:req.user.id,
            role:req.body.role
        });

        if (ifExists) {
            res.status(201).json("role must be unique");
        }
        
        else{
            const scheduledTime = req.body.lastDate+'T'+req.body.lastTime+'Z';
            const applyTill = moment(scheduledTime).subtract(330, 'minute').format();

            const createdJob = new jobData({
                refId: req.user.id,
                role: req.body.role,
                salary: req.body.salary,
                eligibility: req.body.eligibility,
                skills: req.body.skills,
                applyTill: applyTill,
                about: req.body.about
            })
            const created = await createdJob.save();
    
            res.status(201).json({
                success: true,
                message: "job created"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const fetchJob = async (req, res) => {
    try {
        const fetchJobData = await jobData.find(
            {
                refId:req.user.id
            }
        );
        
        res.status(201).json({
            success: true,
            message: fetchJobData,
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { jobCreate, fetchJob }