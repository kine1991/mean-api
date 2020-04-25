const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
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
    type: String,
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
  date: { type: Date, default: Date.now },
  tag: [String],
  imageUrl: String
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
blogSchema.pre('save', function(next) {
  this.slug = slugify(`${this.title} ${this.publisher}`, { lower: true });
  // this.slug = slugify(`${this.title} ${Date.now()}`, { lower: true });
  next();
});

// QUERY MIDDLEWARE
blogSchema.pre(/^find/, function(next) {
  this.find({ private: { $ne: true } });
  next();
});

blogSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'publisher'
  })
  next();
});

blogSchema.index({ title: 1, publisher: 1 }, { unique: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;