const express = require('express');

const JobSeeker = express.Router();

const { register, login, verifyToken, updateUser , fetchUser} = require('../controller/JobSeeker.controller');
const authenticateUser = require('../middleware/auth.middleware');

JobSeeker.post('/jobSeeker/register', register);
JobSeeker.post('/jobSeeker/login', login);
JobSeeker.post('/jobSeeker/verifyToken',authenticateUser,verifyToken);
JobSeeker.get('/jobSeeker/fetchUser', authenticateUser, fetchUser);
JobSeeker.post('/jobSeeker/updateUser', authenticateUser, updateUser);

module.exports = JobSeeker ;