const express = require('express');

const ApplicationRoute = express.Router();

const { 
    fetchNotification, application, submitForm,
    fetchCandidates, fetchPastApplication,
    acceptConfirmation, fetchProfile }
    = require('../controller/Application.controller');

const authenticateUser = require('../middleware/auth.middleware');

ApplicationRoute.get('/fetchNotification', authenticateUser, fetchNotification);
ApplicationRoute.post('/application', authenticateUser, application);
ApplicationRoute.post('/submitForm', authenticateUser, submitForm);
ApplicationRoute.post('/fetchCandidates', authenticateUser, fetchCandidates);
ApplicationRoute.get('/fetchPastApplication', authenticateUser, fetchPastApplication);
ApplicationRoute.post('/acceptConfirmation', authenticateUser, acceptConfirmation);
ApplicationRoute.post('/fetchProfile', authenticateUser, fetchProfile);

module.exports = ApplicationRoute ;