const mongoose = require('mongoose');
// const slugify = require('slugify');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title']
  },
  topic: {
    type: String,
    required: [true, 'A post must have a title']
  },
  content: {
    type: String,
    required: [true, 'A post must have a content']
  },
  description: {
    type: String
  },
  private: {
    type: Boolean,
    default: false
  },
  publisher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  showCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: [String]
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  date: { type: Date, default: Date.now },
  tags: [String],
  imageUrl: String
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// postSchema.pre('save', function(next) {
//   this.slug = slugify(`${this.title} ${this.publisher}`, { lower: true });
//   // this.slug = slugify(`${this.title} ${Date.now()}`, { lower: true });
//   next();
// });

// // QUERY MIDDLEWARE
// postSchema.pre(/^find/, function(next) {
//   this.find({ private: { $ne: true } });
//   next();
// });

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'publisher',
    select: '-__v'
  });
  next();
});

// postSchema.index({ title: 1, publisher: 1 }, { unique: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
