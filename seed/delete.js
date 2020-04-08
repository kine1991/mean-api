const fs = require('fs');
const path = require('path');

// const book = {
//   name: 'name3331',
//   author: 'author3331',
//   genre: 'genre3331',
//   ratingsAverage: 5
// };

const book = {
  "name": "name33312",
  "author": "author33312",
  "genre": "genre33312",
  "ratingsAverage": 5
}

const booksFinal = fs.readFileSync(path.resolve(__dirname, './booksFinal.json'), 'utf-8');

// console.log(typeof book);
// console.log(typeof JSON.stringify(book));

console.log(typeof JSON.parse(booksFinal));
console.log(typeof JSON.stringify(booksFinal));


