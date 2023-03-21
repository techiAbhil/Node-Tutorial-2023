const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const yup = require('yup');

const router = express.Router();

const registrationSchema = yup.object().shape({
	first_name: yup.string().required(),
	last_name: yup.string().required(),
	password: yup.string().required(),
	email: yup.string().email().required(),
});

const loginSchema = yup.object().shape({
	password: yup.string().required(),
	email: yup.string().email().required(),
});

router.post('/register', async (req, res) => {
	try {
		const params = req.body;
		await registrationSchema.validate(req.body);
		const salt = bcrypt.genSaltSync(10);
		const encryptedPassword = bcrypt.hashSync(params.password, salt);
		const user = await prisma.users.create({
			data: {
				email: params.email,
				first_name: params.first_name,
				last_name: params.last_name,
				password: encryptedPassword,
			},
		});
		res.status(201).json({
			msg: 'User created successfully...!',
			user: user,
			success: true,
		});
	} catch (error) {
		console.log('error', error);
		res.status(500).json({
			msg: 'invalid user details',
			error,
			success: false,
		});
	}
});

router.post('/login', async (req, res) => {
	try {
		const body = req.body;
		await loginSchema.validate(body);
		const user = await prisma.users.findFirst({ where: { email: body.email } });
		if (user && bcrypt.compareSync(body.password, user.password)) {
			res.status(200).json({
				msg: 'success',
				user: user,
				success: true,
			});
		} else {
			res.status(200).json({
				msg: 'invalid user credentials',
				success: false,
			});
		}
	} catch (error) {
		console.log('error', error);
		res.status(500).json({
			msg: 'invalid user details',
			error,
			success: false,
		});
	}
});

module.exports = router;
