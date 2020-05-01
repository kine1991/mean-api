const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Author schema
const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Author can not be empty!']
    },
    born: Date,
    died: Date,
    imageUrl: String,
    about: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

authorSchema.virtual('books', {
  ref: 'Book',
  foreignField: 'authorRef',
  localField: '_id'
});

// authorSchema.pre(/^find/, function(next) {
//   this.populate('books');
//   next();
// });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
