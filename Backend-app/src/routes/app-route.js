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
	updateUserSchema,
} = require('../validations/validation-schema');
const {
	updateUserDetails,
	uploadUserProfilePic,
} = require('../controllers/user-controller');
const profileUploadMiddleware = require('../middlewares/image-upload');
const schemaMiddleware = require('../validations/validation-middleware');

route.post('/post', schemaMiddleware(addPostSchema), addPost);
route.put('/post', schemaMiddleware(updatePostSchema), updatePost);
route.delete('/post/:post_id', deletePost);
route.get('/post', getPostByUser);
route.get('/post/all', getAllPosts);

route.put('/user', schemaMiddleware(updateUserSchema), updateUserDetails);
route.put(
	'/profile-pic',
	profileUploadMiddleware.single('profile_pic'),
	uploadUserProfilePic
);

module.exports = route;
