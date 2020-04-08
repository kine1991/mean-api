const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../config.env` });

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
// const faker = require('faker');
const Author = require('../models/authorModel');

// eslint-disable-next-line no-unused-vars
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const localDb = process.env.DATABASE_LOCAL; //eslint-disable-line no-unused-vars

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log(err));
// console.log('32323');

const authorsString = fs.readFileSync(
  path.resolve(__dirname, './author.json'),
  'utf8'
);

const authorsJson = JSON.parse(authorsString);
authorsJson.forEach(async authorJson => {
  console.log(authorJson);
  await Author.create(authorJson);
});

// const xx = async => {
//   await Author.create(authorJson);
// };
// console.log(authorsJson[0]);

Author.create(authorsJson[0]);
