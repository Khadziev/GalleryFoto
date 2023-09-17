const mongoose = require('mongoose');

const dataSchema = mongoose.Schema(
  {
    pathImages: {
      type: String,
      required: false,
    },
    name: {
      type: String,
    },
    age: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true }
);

const Data = mongoose.model('Child', dataSchema);

module.exports = Data;
