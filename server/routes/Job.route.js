const express = require('express');

const JobRoute = express.Router();

const { jobCreate , fetchJob, deleteJob} = require('../controller/Job.controller');
const authenticateUser = require('../middleware/auth.middleware');

JobRoute.post('/jobCreate', authenticateUser, jobCreate);
JobRoute.get('/fetchJob', authenticateUser, fetchJob);
JobRoute.post('/deleteJob', authenticateUser, deleteJob);

module.exports = JobRoute ;