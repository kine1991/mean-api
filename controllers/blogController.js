const Blog = require('../models/blogModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    console.log('queryObj', queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Blog.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // query = query.sort('createdAt');
    }

    // Field limiting
    if (req.query.fields) {
      console.log(req.query.fields);
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    
    const totalResults = await Blog.countDocuments(JSON.parse(queryStr));

    if (req.query.page) {
      // console.log('skip', skip);
      // console.log('totalResults', totalResults);
      if (skip >= totalResults) throw new Error('This page does not exist');
    }

    // EXECUTE QUERY
    const posts = await query;
    
    // console.log('queryStr', JSON.parse(queryStr));
    // const posts = await Blog.find();
    res.status(200).json({
      status: 'success',
      results: posts.length,
      totalResults,
      data: {
        posts
      }
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      status: 'error',
      massage: error
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

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      const error = new Error('This post was not found!');
      error.statusCode = 404;
      throw error;
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    // console.log('ERR', error);
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }
}

// 18.-sunt-aut-facere-repellat-provident-occaecati-excepturi-optio-reprehenderit-5e4c1c885451fc08ca440519
// 5eb16608f7540d06cff6ce10
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Blog.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators: true
    });

    if (!post) {
      const error = new Error('This post was not found!');
      error.statusCode = 404;
      throw error;
    };
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }
};

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

exports.getFilterDistinctValues = async (req, res, next) => {
  try {
    const topic = await Blog.distinct('topic');
    const tags = await Blog.distinct('tags');

    res.status(200).json({
      status: 'success',
      filter: {
        topic,
        tags
      }
    })
  } catch (error) {
    console.log(error);
  }
}