const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'jwt-secret-2k24');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


module.exports = authenticateUser;