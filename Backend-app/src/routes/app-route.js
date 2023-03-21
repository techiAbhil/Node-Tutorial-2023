const express = require('express');
const route = express.Router();
const {
	addPost,
	updatePost,
	deletePost,
	getPostByUser,
	getAllPosts,
} = require('../controllers/posts-controller');
const {
	addPostSchema,
	updatePostSchema,
} = require('../validations/validation-schema');
const schemaMiddleware = require('../validations/validation-middleware');

route.post('/post', schemaMiddleware(addPostSchema), addPost);
route.patch('/post', schemaMiddleware(updatePostSchema), updatePost);
route.delete('/post/:post_id', deletePost);
route.get('/post', getPostByUser);
route.get('/post/all', getAllPosts);

module.exports = route;
