const express = require('express');

const reviewPostController = require('../controllers/reviewPostController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(reviewPostController.getAllReviews);
router.route('/:postId').get(reviewPostController.getReviewsByPost);

router
  .route('/:postId/create')
  .post(authController.protect, reviewPostController.createReview);

module.exports = router;
