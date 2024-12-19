const mongoose = require("mongoose");
const adminData = require("../schema/AdminData");
const jwt = require("jsonwebtoken");
const { registrationMail } = require("../middleware/registrationMail"); 

const adminRegister = async (req, res) => {
    try {
        const ifExists = await adminData.findOne({ gmail: req.body.gmail });
        if (ifExists) {
            res.status(201).json("Email Already Exists");
        }
        else {
            const registerAdmin = new adminData({
                ferm: req.body.ferm,
                gmail: req.body.gmail,
                password: req.body.password
            })
            const registered = await registerAdmin.save();

            // to send the mail
            registrationMail(req.body.ferm, req.body.gmail);

            res.status(201).json({
                success: true,
                message: "registered"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const adminLogin = async (req, res) => {
    try {
        const { gmail, password } = req.body;
        const ifExists = await adminData.findOne({ gmail: gmail })

        if (ifExists) {
            if (ifExists.password == password) {

                const token = jwt.sign(
                    { id:ifExists._id, ferm:ifExists.ferm, gmail:ifExists.gmail },
                    'jwt-secret-2k24',
                    { expiresIn: '30d'}
                );
                res.cookie('token',token,{
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.json({
                    success: true,
                    token: token,
                    gmail: ifExists.gmail,
                    message: "success"
                });
            }
            else {
                res.json({message: "Incorrect Password"});
            }
        }
        else {
            res.json({message:"Please Register"});
        }
    }
    catch (error) {
        console.log(error);
    }
}

const verifyToken=async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ valid: false,data:null});

    jwt.verify(token, 'jwt-secret-2k24', (err, decoded) => {
        if (err) return res.status(401).json({ valid: false ,data:null});
        return res.json({ valid: true ,data:decoded, message: "ok"});
    });
}

const fetchAdmin = async (req, res) => {
    try {
        const fetchAdminData = await adminData.findOne({_id:req.user.id});

        res.status(201).json({
            success: true,
            data: "updated",
            message: fetchAdminData,
        });
    }
    catch (error) {
        console.log(error);
    }
}

const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await adminData.updateMany({_id:req.user.id},
            {
                ferm:req.body.ferm,
                gmail:req.body.gmail,
            }
        );
        const adminDetail = await adminData.updateOne({_id:req.user.id},
            {    
                $set:
                {
                    adminDetails:
                    { 
                        phone:req.body.phone,
                        city:req.body.city,
                        state:req.body.state,
                    }
                }
            }
        );
        res.status(201).json({
            success: true,
            data: "updated user profile",
            message: updatedAdmin,
            value: adminDetail,
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { adminRegister, adminLogin, verifyToken, fetchAdmin, updateAdmin }