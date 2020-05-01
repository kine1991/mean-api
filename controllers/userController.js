const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user: user
    }
  });
});

// exports.getExistingEmail = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.params.email })
//     if (user) {
//       res.status(200).json({
//         status: 'success',
//         email: user.email
//       })
//     } else {
//       res.status(404).json({
//         status: 'error',
//         email: null
//       })
//     }
//     console.log('user', user)
//   } catch (error) {
//     console.log('###error', error);
//   }
// }

exports.getExistingEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email })
  if (user) {
    res.status(422).json({
      status: 'error',
      email: user.email
    })
  } else {
    res.status(200).json({
      status: 'success',
      email: null
    })
  }
})

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // console.log(user);
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// exports.checkAuth = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   // console.log(user);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user
//     }
//   });
// });
exports.checkAuth = async (req, res, next) => {
  try {
    // 1) Get Token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)('token', process.env.JWT_SECRET);
    // 3) Get User
    const user = await User.findById(decoded.id);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      res.status(200).json({
        status: 'success',
        data: {
          user: null
        }
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'error'
      });
    }
  }
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'message'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'message'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'message'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'message'
  });
};
