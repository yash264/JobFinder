const express = require('express');

const ApplicationRoute = express.Router();

const { 
    fetchNotification, application, 
        submitForm, fetchPastApplication,
    }
    = require('../controller/Application.controller');

const authenticateUser = require('../middleware/auth.middleware');

ApplicationRoute.get('/fetchNotification', authenticateUser, fetchNotification);
ApplicationRoute.post('/application', authenticateUser, application);
ApplicationRoute.post('/submitForm', authenticateUser, submitForm);
ApplicationRoute.get('/fetchPastApplication', authenticateUser, fetchPastApplication);

module.exports = ApplicationRoute ;