const mongoose = require("mongoose");
const userData = require("../schema/UserData");
const adminData = require("../schema/AdminData");
const jobData = require("../schema/JobData");
const applicationData = require("../schema/ApplicationData");
const { congratulationMail } = require("../middleware/congratulationMail");

const fetchNotification = async (req, res) => {
    try {
        const jobExists = await jobData.find({});

        res.status(201).json({
            success: true,
            data: jobExists,
        });

    }
    catch (error) {
    console.log(error);
}
}

const application = async (req, res) => {
    try {
        const adminExists = await adminData.findOne({ ferm: req.body.ferm });

        if (adminExists) {
            const jobExists = await jobData.findOne({ refId: adminExists._id, role: req.body.role });

            res.status(201).json({
                success: true,
                data: adminExists,
                message: jobExists,
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
                ferm: req.body.ferm,
                role: req.body.role,
            }
        );
        if (ifExists) {
            res.status(201).json("application already submitted");
        }
        else {
            const submittedForm = new applicationData({
                refId: req.user.id,
                ferm: req.body.ferm,
                role: req.body.role,
                name: req.user.name,
                email: req.user.email,
                imageUrl: req.body.imageUrl,
                document: req.body.document,
                pdfUrl: req.body.pdfUrl,
                yourself: req.body.yourself
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

const fetchCandidates = async (req, res) => {
    try {
        const ifExists = await applicationData.find(
            {
                ferm: req.user.ferm,
                role: req.body.role,
            }
        );

        res.status(201).json({
            success: true,
            message: ifExists
        });

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
                email: req.user.email,
            }
        );

        res.status(201).json({
            success: true,
            message: ifExists
        });

    }
    catch (error) {
        console.log(error);
    }
}

const acceptConfirmation = async (req, res) => {
    try {
        const ifExists = await applicationData.findOne(
            {
                name: req.body.name,
                email: req.body.email,
                ferm: req.user.ferm,
                role: req.body.role,
            }
        );



        if (ifExists) {
            const accepted = await applicationData.updateOne(
                {
                    _id: ifExists._id
                },
                {
                    status: true,
                }
            );

            // to send the mail
            congratulationMail(req.body.name, req.body.email, req.user.ferm, req.body.role);

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
        const ifExists = await applicationData.findOne(
            {
                name: req.body.name,
                email: req.body.email,
                ferm: req.user.ferm,
                role: req.body.role,
            }
        );

        if (ifExists) {
            const profileData = await userData.findOne(
                {
                    _id: ifExists.refId,
                    email: ifExists.email,
                }
            );

            res.status(201).json({
                success: true,
                data: ifExists,
                message: profileData,
            });
        }

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { fetchNotification, application, submitForm,
    fetchCandidates, fetchPastApplication,
    acceptConfirmation, fetchProfile }