// review / rating / createdAt / ref to tour / ref to user

const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name' //僅回傳 name 這個欄位
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});
// Statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
// statics are the methods defined on the Model. methods are defined on the document (instance).
reviewSchema.statics.calcAverageRating = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  // console.log('stats', stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5 //default
    });
  }
};

// Middleware can't call next post => middle
reviewSchema.post('save', function() {
  // This points to current review
  // this.constructor ->
  // console.log('save', this.constructor);
  this.constructor.calcAverageRating(this.tour);
  // console.log('middle post ', this.constructor);
});

// Run before save a document in DB -> PRE
// Run after save a document in DB -> POST
reviewSchema.pre(/^findOneAnd/, async function(next) {
  // console.log('Run pre findOneAnd');

  this.r = await this.findOne();
  // console.log('Run pre', this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  // console.log('Run post(Before)', this.r.constructor);

  await this.r.constructor.calcAverageRating(this.r.tour);
  // console.log('Run post', this.r);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
