const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addPost = async (req, res) => {
	const params = req.body;

	const post = await prisma.posts.create({
		data: {
			body: params.body,
			title: params.title,
			user_id: 1,
		},
	});
	res.status(201).json({
		msg: 'Post added successfully...!',
		success: true,
		post: post,
	});
};

const updatePost = async (req, res) => {
	const params = req.body;

	const post = await prisma.posts.update({
		data: {
			body: params.body,
			title: params.title,
		},
		where: {
			post_id: params.post_id,
		},
	});
	res.status(200).json({
		msg: 'Post updated successfully...!',
		success: true,
		post: post,
	});
};

const deletePost = async (req, res) => {
	const params = req.params;

	const post = await prisma.posts.delete({
		where: {
			post_id: params.post_id,
		},
	});
	res.status(200).json({
		msg: 'Post deleted successfully...!',
		success: true,
	});
};

const getPostByUser = async (req, res) => {
	const params = req.params;

	const posts = await prisma.posts.findMany({
		where: {
			user_id: 1,
		},
	});
	res.status(200).json({
		msg: 'Success',
		success: true,
		posts: posts,
	});
};

const getAllPosts = async (req, res) => {
	const posts = await prisma.posts.findMany({
		include: { users: true },
	});
	res.status(200).json({
		msg: 'Success...!',
		success: true,
		posts: posts,
	});
};

module.exports = {
	addPost,
	updatePost,
	deletePost,
	getPostByUser,
	getAllPosts,
};
