/* eslint-disable no-console */ //отключить для всего файла консоль
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
// const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');
const authorRouter = require('./routes/authorRoutes');
const articleRouter = require('./routes/articleRoutes');
const bookRouter = require('./routes/bookRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
app.use(morgan('dev'));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

// Limit requests from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'To many request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); // от подобных атак "email": { "$gt": "" }, удаляет знаки $ ect

// Data sanitization against XSS
app.use(xss()); // удаляет html code <script></script>

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log('req.headers');
  console.log('Cookies: ', req.cookies);
  next();
});

// 3) ROUTES
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/authors', authorRouter);

if (process.env.NODE_ENV === 'production') {
  console.log('***prod***');
  app.use(express.static('client2/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client2', 'build', 'index.html'));
    // res.sendFile(path.join(__dirname, 'client2', 'build', 'index.html'));
  });
}
if (process.env.NODE_ENV === 'development') {
  console.log('***dev***');
  app.use(express.static('client2/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client2', 'build', 'index.html'));
  });
}

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Любая ошибка типа next(err...) будет обрабатываться здесь
app.use(globalErrorHandler);

module.exports = app;
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client",
