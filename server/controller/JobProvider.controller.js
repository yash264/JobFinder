const dotenv = require('dotenv')
const path = require('path');

const jobProviderData = require("../schema/JobProviderData");
const jwt = require("jsonwebtoken");
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const { registration } = require("../SendMail/registration");

const register = async (req, res) => {
    try {
        const { fermName, email } = req.body.payload;

        const ifExists = await jobProviderData.findOne({ gmail: req.body.payload.email });

        if (ifExists) {
            res.status(201).json(
                {
                    success: false,
                    message: "Email Already Exists"
                }
            );
        }
        else {
            const registerPerson = new jobProviderData({
                fermName: req.body.payload.fermName,
                email: req.body.payload.email,
                password: req.body.payload.password
            })
            const registered = await registerPerson.save();

            // to send the mail
            registration(fermName, email);

            res.status(201).json({
                success: true,
                message: "Registered Successfully."
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body.payload;
        const ifExists = await jobProviderData.findOne({ email: email })

        if (ifExists) {
            if (ifExists.password == password) {

                const token = jwt.sign(
                    {
                        id: ifExists._id,
                        email: ifExists.email
                    },
                    process.env.jwt_secret,
                    { expiresIn: '30d' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.json({
                    success: true,
                    token: token,
                    email: ifExists.email,
                    message: "success"
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Incorrect Password"
                });
            }
        }
        else {
            res.json({
                success: false,
                message: "Please Register"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

const verifyToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ valid: false, data: null });

    jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
        if (err) return res.status(401).json({ valid: false, data: null });
        return res.json({ valid: true, data: decoded, message: "ok" });
    });
}

const fetchUser = async (req, res) => {
    try {
        const fetchUserData = await jobProviderData
            .findOne({ _id: req.user.id })
            .select("-password");

        res.status(201).json({
            success: true,
            value: fetchUserData,
        });
    }
    catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await jobProviderData.updateOne({ _id: req.user.id },
            {
                fermName: req.body.fermName,
                mobile: req.body.mobile,
                about: req.body.about,
                location: req.body.location,
            }
        );

        res.status(201).json({
            success: true,
            message: "updated user profile",
            value: updatedUser,
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { register, login, verifyToken, fetchUser, updateUser }
