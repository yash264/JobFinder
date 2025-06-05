const express = require('express');

const AdminRoute = express.Router();

const { register, login, verifyToken, fetchUser, updateUser } = require('../controller/JobProvider.controller');
const authenticateUser = require('../middleware/auth.middleware');

AdminRoute.post('/jobProvider/register', register);
AdminRoute.post('/jobProvider/login', login);
AdminRoute.post('/jobProvider/verifyToken',authenticateUser,verifyToken);
AdminRoute.get('/jobProvider/fetchUser', authenticateUser, fetchUser);
AdminRoute.post('/jobProvider/updateUser', authenticateUser, updateUser);

module.exports = AdminRoute ;