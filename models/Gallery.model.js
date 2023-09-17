const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
  {
    pathImages: String,
    name: String,
    description: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
