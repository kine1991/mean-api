const Blog = require('../models/blogModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Blog.find();
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: null
    })
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const newPost = await Blog.create({ publisher: req.user.id, ...req.body });
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost
      }
    });
  } catch (error) {
    console.log(error.code);
    if (error.code === 11000) {
      res.status(409).json({
        status: 'error',
        message: 'A title with the same name already exists change it'
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: error
      });

    }
  }
}

exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (error) {
    console.log(error);
  }
}