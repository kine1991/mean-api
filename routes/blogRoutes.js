const express = require('express');
const blogController =  require('../controllers/blogController');
const authController =  require('../controllers/authController');

const router = express.Router();

router.route('/')
  .get(blogController.getAllPosts)
  .post(authController.protect, blogController.createPost);

router.route('/getFilter')
  .get(blogController.getFilterDistinctValues)

router.route('/:slug')
  .get(blogController.getPostBySlug)

module.exports = router;