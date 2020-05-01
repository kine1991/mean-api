const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const mongoose = require('mongoose');
const axios = require('axios');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log(err));

// IMPORT DATA
const importData = () => {
  for (let i = 1; i <= 10; i++) {
    const user = {
      name: `user${i}`,
      email: `user${i}@mail.ru`,
      password: '12345678',
      passwordConfirm: '12345678'
    };

    (async () => {
      try {
        await axios.post(`http://localhost:5000/api/v1/users/signup`, user);
      } catch (error) {
        console.log(error);
      }
    })();
  }
};
importData();
