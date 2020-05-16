const ReviewPost = require('../models/reviewPostModel');

// exports.setPostUserIds = (req, res, next) => {
//   // Allow nested routes
//   if (!req.body.post) req.body.post = req.params.postId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };
// const users = await User.find();
// res.status(200).json({
//   status: 'success',
//   results: users.length,
//   data: {
//     users
//   }
// });
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewPost.find({});

    res.status(200).json({
      status: 'success',
      data: {
        reviews
      }
    });
  } catch (error) {
    console.log('errrr', error);
    res.status(500).json({
      status: 'error',
      massage: error
    });
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await ReviewPost.create({
      ...req.body,
      user: req.user.id,
      post: req.params.postId
    });

    res.status(201).json({
      status: 'success',
      data: {
        newReview
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      massage: error
    });
  }
};
