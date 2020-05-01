const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.route('/').get(authorController.getAllAuthors);

router.route('/:authorId').get(authorController.getAuthor);
// .post(
//   authorController.createReview
// );

module.exports = router;
