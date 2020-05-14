const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router.route('/getFilter').get(postController.getFilterDistinctValues);

router
  .route('/:slug')
  .get(postController.getPostBySlug)
  .patch(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);

module.exports = router;
