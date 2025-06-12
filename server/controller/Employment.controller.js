const moment = require("moment");
const jobSeekerData = require("../schema/JobSeekerData");
const jobProviderData = require("../schema/JobProviderData");
const employmentData = require("../schema/EmploymentData");
const applicationData = require("../schema/ApplicationData");


const { congratulation } = require("../SendMail/congratulation");

const jobCreate = async (req, res) => {
    try {
        const ifExists = await employmentData.findOne({
            refId:req.user.id,
            role:req.body.role
        });

        if (ifExists) {
            res.status(201).json("role must be unique");
        }
        
        else{
            const scheduledTime = req.body.lastDate+'T'+req.body.lastTime+'Z';
            const applyTill = moment(scheduledTime).subtract(330, 'minute').format();

            const createdJob = new employmentData({
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
        const fetchJobData = await employmentData.find(
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

const fetchCandidates = async (req, res) => {
    try {
        const ifExists = await employmentData.findOne(
            {
                refId: req.user.id,
                role: req.body.role,
            }
        );

        if (ifExists) {
            const jobExists = await applicationData.find({
                jobRefId: ifExists._id,
            });

            const mergedData = [];

            for (let i = 0; i < jobExists.length; i++) {

                const personExists = await jobSeekerData.findOne({
                    _id: jobExists[i].refId,
                });

                mergedData.push({
                    name: personExists.name,
                    email: personExists.email,

                    document: jobExists[i].document,
                    pdfUrl: jobExists[i].pdfUrl,
                    status: jobExists[i].status,
                });
            }

            res.status(201).json({
                success: true,
                message: mergedData,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const acceptConfirmation = async (req, res) => {
    try {
        const personExists = await jobSeekerData.findOne(
            {
                email: req.body.email,
            }
        );

        const roleExists = await employmentData.findOne(
            {
                refId: req.user.id,
                role: req.body.role,
            }
        );

        if (personExists && roleExists) {
            const accepted = await applicationData.updateOne(
                {
                    refId: personExists._id,
                    jobRefId: roleExists._id,
                },
                {
                    status: true,
                }
            );

            const fermExists = await jobProviderData.findOne(
                {
                    _id: req.user.id,
                }
            );

            const name = personExists.name;
            const email = personExists.email;
            const fermName = fermExists.fermName;
            const role = req.body.role;

            // to send the mail
            congratulation(name, email, fermName, role);

            res.status(201).json({
                success: true,
                message: "accepted",
            });
        }

    }
    catch (error) {
        console.log(error);
    }
}

const fetchProfile = async (req, res) => {
    try {
        const ifExists = await employmentData.findOne(
            {
                refId: req.user.id,
                role: req.body.role
            }
        );

        if (ifExists) {
            const mergedData = [];

            const jobData = await applicationData.findOne(
                {
                    jobRefId: ifExists._id,
                }
            );

            const profileData = await jobSeekerData.findOne(
                {
                    email: req.body.email,
                }
            );

            mergedData.push({
                name: profileData.name,
                email: profileData.email,
                gender: profileData.gender,
                mobile: profileData.mobile,
                qualification: profileData.qualification,
                homeTown: profileData.homeTown,

                imageUrl: jobData.imageUrl,
                yourSelf: jobData.yourSelf,
            });

            res.status(201).json({
                success: true,
                message: mergedData,
            });
        }

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { jobCreate, fetchJob ,
    fetchCandidates, acceptConfirmation, fetchProfile,
}