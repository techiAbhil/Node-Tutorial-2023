const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const updateUserDetails = async (req, res) => {
	const { user, body } = req;
	console.log('user = ', user);
	const updatedUser = await prisma.users.update({
		data: {
			email: body.email,
			first_name: body.first_name,
			last_name: body.last_name,
		},
		where: {
			user_id: user.user_id,
		},
	});
	delete updatedUser.password;
	const token = jwt.sign(updatedUser, process.env.JWT_SECRET);
	res.status(200).json({
		msg: 'User details successfully updated...!',
		success: true,
		token: token,
	});
};

const uploadUserProfilePic = async (req, res) => {
	const { user, file } = req;
	console.log('and the file name is = ', user);
	const updatedUser = await prisma.users.update({
		data: { profile_pic: file.filename },
		where: {
			user_id: user.user_id,
		},
	});
	delete updatedUser.password;
	const token = jwt.sign(updatedUser, process.env.JWT_SECRET);
	res.status(200).json({
		msg: 'User details successfully updated...!',
		success: true,
		token: token,
	});
};

module.exports = {
	updateUserDetails,
	uploadUserProfilePic,
};
