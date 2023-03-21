const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
	try {
		const params = req.body;

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
			msg: 'user successfully regisrtred...!',
			success: true,
			user: user,
		});
	} catch (e) {
		res.status(500).json({
			msg: 'Internal server error...!',
			success: false,
			error: e,
		});
	}
};

const login = async (req, res) => {
	try {
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
			res.status(200).json({
				msg: 'You have successfyullyt logged in',
				success: true,
				user: user,
			});
		}
	} catch (e) {
		res.status(500).json({
			msg: 'Internal server error...!',
			success: false,
			error: e,
		});
	}
};

module.exports = {
	login,
	register,
};
