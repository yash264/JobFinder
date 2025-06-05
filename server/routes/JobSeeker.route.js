const express = require('express');

const UserRoute = express.Router();

const { register, login, verifyToken, updateUser , fetchUser} = require('../controller/JobSeeker.controller');
const authenticateUser = require('../middleware/auth.middleware');

UserRoute.post('/jobSeeker/register', register);
UserRoute.post('/jobSeeker/login', login);
UserRoute.post('/jobSeeker/verifyToken',authenticateUser,verifyToken);
UserRoute.get('/jobSeeker/fetchUser', authenticateUser, fetchUser);
UserRoute.post('/jobSeeker/updateUser', authenticateUser, updateUser);

module.exports = UserRoute ;