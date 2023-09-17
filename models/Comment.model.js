const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    text: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gallery',
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
