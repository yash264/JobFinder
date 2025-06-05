const express = require('express');

const JobRoute = express.Router();

const { jobCreate , fetchJob } = require('../controller/Employment.controller');
const authenticateUser = require('../middleware/auth.middleware');

JobRoute.post('/jobCreate', authenticateUser, jobCreate);
JobRoute.get('/fetchJob', authenticateUser, fetchJob);

module.exports = JobRoute ;