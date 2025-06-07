const express = require('express');

const JobProvider = express.Router();

const { register, login, verifyToken, fetchUser, updateUser } = require('../controller/JobProvider.controller');
const authenticateUser = require('../middleware/auth.middleware');

JobProvider.post('/jobProvider/register', register);
JobProvider.post('/jobProvider/login', login);
JobProvider.post('/jobProvider/verifyToken',authenticateUser,verifyToken);
JobProvider.get('/jobProvider/fetchUser', authenticateUser, fetchUser);
JobProvider.post('/jobProvider/updateUser', authenticateUser, updateUser);

module.exports = JobProvider ;