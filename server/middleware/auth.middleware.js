const jwt = require("jsonwebtoken");
const dotenv=require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 


const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


module.exports = authenticateUser;