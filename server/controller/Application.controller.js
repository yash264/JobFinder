const jobProviderData = require("../schema/JobProviderData");
const employmentData = require("../schema/EmploymentData");
const applicationData = require("../schema/ApplicationData");


const fetchNotification = async (req, res) => {
    try {
        const ifExists = await employmentData.find({});

        if (ifExists) {
            const mergedData = [];

            for (let i = 0; i < ifExists.length; i++) {
                const jobExists = await jobProviderData.findOne({
                    _id: ifExists[i].refId,
                });

                if (jobExists) {
                    mergedData.push({
                        fermName: jobExists.fermName,
                        email: jobExists.email,
                        location: jobExists.location,

                        role: ifExists[i].role,
                        applyTill: ifExists[i].applyTill,
                    });
                }
            }

            return res.status(200).json({
                success: true,
                message: mergedData,
            });
        }

    }
    catch (error) {
        console.log(error);
    }
}

const application = async (req, res) => {
    try {
        const jobExists = await jobProviderData.findOne({
            email: req.body.email
        });

        if (jobExists) {
            const mergedData = [];

            const roleExists = await employmentData.findOne({
                refId: jobExists._id,
                role: req.body.role
            });

            mergedData.push({
                fermName: jobExists.fermName,
                email: jobExists.email,
                mobile: jobExists.mobile,
                location: jobExists.location,

                jobRefId: roleExists._id,
                role: roleExists.role,
                eligibility: roleExists.eligibility,
                skills: roleExists.skills,
                salary: roleExists.salary,
                applyTill: roleExists.applyTill,
                about: roleExists.about,
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


const submitForm = async (req, res) => {
    try {
        const ifExists = await applicationData.findOne(
            {
                refId: req.user.id,
                jobRefId: req.body.jobRefId,
            }
        );

        if (ifExists) {
            res.status(201).json("application already submitted");
        }
        else {
            const submittedForm = new applicationData({
                refId: req.user.id,
                jobRefId: req.body.jobRefId,
                imageUrl: req.body.imageUrl,
                document: req.body.document,
                pdfUrl: req.body.pdfUrl,
                yourSelf: req.body.yourSelf,
                status: false,
            })
            const submitted = await submittedForm.save();

            res.status(201).json({
                success: true,
                message: "application submitted"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const fetchPastApplication = async (req, res) => {
    try {
        const ifExists = await applicationData.find(
            {
                refId: req.user.id,
            }
        );
        if (ifExists) {
            const mergedData = [];

            for (let i = 0; i < ifExists.length; i++) {

                const roleExists = await employmentData.findOne({
                    _id: ifExists[i].jobRefId,
                });

                const jobExists = await jobProviderData.findOne({
                    _id: roleExists.refId,
                });

                mergedData.push({
                    fermName: jobExists.fermName,
                    role: roleExists.role,

                    imageUrl: ifExists[i].imageUrl,
                    document: ifExists[i].document,
                    pdfUrl: ifExists[i].pdfUrl,
                    status: ifExists[i].status,
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


module.exports = {
    fetchNotification, application, submitForm, fetchPastApplication,
}