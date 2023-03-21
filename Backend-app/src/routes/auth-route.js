const express = require('express');
const route = express.Router();
const { login, register } = require('../controllers/auth-controller');
const {
	registrationSchema,
	loginSchema,
} = require('../validations/validation-schema');
const schemaMiddleware = require('../validations/validation-middleware');

route.post('/register', schemaMiddleware(registrationSchema), register);

route.post('/login', schemaMiddleware(loginSchema), login);

module.exports = route;
