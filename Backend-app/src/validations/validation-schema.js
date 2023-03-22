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

const addPostSchema = yup.object().shape({
	body: yup.string().required(),
	title: yup.string().required(),
});

const updatePostSchema = yup.object().shape({
	body: yup.string().required(),
	title: yup.string().required(),
	post_id: yup.number().required(),
});

const updateUserSchema = yup.object().shape({
	email: yup.string().required().email(),
	first_name: yup.string().required(),
	last_name: yup.string().required(),
});

module.exports = {
	registrationSchema,
	loginSchema,
	addPostSchema,
	updatePostSchema,
	updateUserSchema,
};
