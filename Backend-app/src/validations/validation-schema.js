const yup = require('yup');

const registrationSchema = yup.object().shape({
	email: yup.string().required().email(),
	first_name: yup.string().required(),
	last_name: yup.string().required(),
	password: yup.string().required(),
});

const loginSchema = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required(),
});

module.exports = {
	registrationSchema,
	loginSchema,
};
