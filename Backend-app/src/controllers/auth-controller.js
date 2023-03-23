const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	const params = req.body;

	const salt = bcrypt.genSaltSync(10);
	const encryptedPassword = bcrypt.hashSync(params.password, salt);

	const user = await prisma.users.create({
		data: {
			email: params.email,
			first_name: params.first_name,
			last_name: params.last_name,
			password: encryptedPassword,
			profile_pic: '',
		},
	});
	delete user.password;
	res.status(201).json({
		msg: 'user successfully regisrtred...!',
		success: true,
		user: user,
	});
};

const login = async (req, res) => {
	const params = req.body;
	const user = await prisma.users.findFirst({
		where: {
			email: params.email,
		},
	});
	if (!user || !bcrypt.compareSync(params.password, user.password)) {
		res.status(500).json({
			msg: 'Invalid user credentials',
			success: false,
		});
	} else {
		delete user.password;
		const token = jwt.sign(user, process.env.JWT_SECRET);
		res.status(200).json({
			msg: 'You have successfully logged in',
			success: true,
			token: token,
		});
	}
};

module.exports = {
	login,
	register,
};
