const express = require('express');

const EmploymentRoute = express.Router();

const { jobCreate, fetchJob,
        fetchCandidates, acceptConfirmation, fetchProfile
    } = require('../controller/Employment.controller');
const authenticateUser = require('../middleware/auth.middleware');

EmploymentRoute.post('/jobCreate', authenticateUser, jobCreate);
EmploymentRoute.get('/fetchJob', authenticateUser, fetchJob);
EmploymentRoute.post('/fetchCandidates', authenticateUser, fetchCandidates);
EmploymentRoute.post('/acceptConfirmation', authenticateUser, acceptConfirmation);
EmploymentRoute.post('/fetchProfile', authenticateUser, fetchProfile);

module.exports = EmploymentRoute;