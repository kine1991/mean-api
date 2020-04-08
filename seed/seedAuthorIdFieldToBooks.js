const axios = require('axios');
const faker = require('faker');
const fs = require('fs');
const path = require('path');

let arrFromAuthorsDb;

const getAllAuthors = async () => {
  try {
    const authors = await axios.get('http://localhost:5000/api/v1/authors');
    const authorsString = JSON.stringify(authors.data.data.authors);
    fs.writeFileSync(path.resolve(__dirname, './authors2.json'), authorsString);
    return authors;
  } catch (error) {
    console.log(error);
  }
};

const getAllBooks = async () => {
  try {
    const books = await axios.get('http://localhost:5000/api/v1/books');
    const booksDiffer = books.data.data.books.map(book => {
      const releaseBook = [
        faker.date.between(1965, 2020),
        faker.date.between(1965, 2020),
        faker.date.between(1965, 2020)
      ];
      return {
        ...book,
        publisher: book.publisher._id,
        releaseBook: releaseBook
      };
    });
    const booksString = JSON.stringify(booksDiffer);
    console.log(booksString);
    // console.log(path.resolve(__dirname, './loadedFromDbBooks.json'));
    fs.writeFileSync(
      path.resolve(__dirname, './loadedFromDbBooks.json'),
      booksString
    );

    return books;
  } catch (error) {
    console.log(error);
  }
};

const books = fs.readFileSync(path.resolve(__dirname, './loadedFromDbBooks.json'), 'utf-8');
const authors = fs.readFileSync(path.resolve(__dirname, './authors2.json'), 'utf-8');
const booksJSON = JSON.parse(books);
const authorsJSON = JSON.parse(authors);

const booksFinalPush = booksJSON.map(book => {
  const findedAuthor = authorsJSON.find(author => {
    return book.author === author.name;
  });
  return {
    ...book,
    authorRef: findedAuthor._id
  };
});

fs.writeFileSync(path.resolve(__dirname, './booksFinal.json'), JSON.stringify(booksFinalPush))


// console.log();

// getAllAuthors().then(() => {
//   console.log('success');
// });

// getAllBooks().then(() => {
//   console.log('success');
// });

// getAllAuthors()
//   .then(res => {
//     arrFromAuthorsDb = res.data.data.authors;
//     return arrFromAuthorsDb;
//   })
//   .then(arrF => {
//     const fff = arrF.map(x => {
//       return {
//         name: x.name,
//         _id: x._id
//       };
//     });

//     console.log(fff);
//   });

// try {
//   const = await getAllAuthors();
// } catch (error) {
// }
