const Author = require('../models/authorModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllAuthors = catchAsync(async (req, res, next) => {
  const authors = await Author.find();

  res.status(200).json({
    status: 'success',
    results: authors.length,
    data: {
      authors
    }
  });
});

exports.getAuthor = catchAsync(async (req, res, next) => {
  const author = await Author.findById(req.params.authorId).populate('books');

  res.status(200).json({
    status: 'success',
    data: {
      author
    }
  });
});

exports.createAuthor = catchAsync(async (req, res, next) => {
  const newAuthor = await Author.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      author: newAuthor
    }
  });
});
