const express = require('express');

const UserRoute = express.Router();

const { register, login, verifyToken, updateUser , fetchUser} = require('../controller/User.controller');
const authenticateUser = require('../middleware/auth.middleware');

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.post('/verify-token',authenticateUser,verifyToken);
UserRoute.get('/fetchUser', authenticateUser, fetchUser);
UserRoute.post('/updateUser', authenticateUser, updateUser);

module.exports = UserRoute ;