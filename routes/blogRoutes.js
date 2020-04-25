const express = require('express');
const blogController =  require('../controllers/blogController');
const authController =  require('../controllers/authController');

const router = express.Router();

router.route('/')
  .get(blogController.getAllPosts)
  .post(authController.protect, blogController.createPost);
// router.route('/').get(blogController.getAllPosts);

module.exports = router;