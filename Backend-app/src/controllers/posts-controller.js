const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addPost = async (req, res) => {
    const { user, body } = req;
    console.log('user = ', user);
    const post = await prisma.posts.create({
        data: {
            body: body.body,
            title: body.title,
            user_id: user?.user_id,
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
            post_id: +params.post_id,
        },
    });
    res.status(200).json({
        msg: 'Post deleted successfully...!',
        success: true,
    });
};

const getPostByUser = async (req, res) => {
    const { user } = req;

    const posts =
        await prisma.$queryRaw`select * from posts where user_id=${user.user_id}`;

    console.log('raw query posts = ', posts);
    // const posts = await prisma.posts.findMany({
    // 	where: {
    // 		user_id: user.user_id,
    // 	},
    // });
    res.status(200).json({
        msg: 'Success',
        success: true,
        posts: posts,
    });
};

const getAllPosts = async (req, res) => {
    const posts = await prisma.posts.findMany({
        include: {
            users: {
                select: {
                    email: true,
                    first_name: true,
                    last_name: true,
                    user_id: true,
                    profile_pic: true,
                },
            },
        },
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
