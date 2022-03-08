const mongoose = require('mongoose')

const childSchema = mongoose.Schema({
    imageURL: {
        type: String,
        required:false
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: false,
    },
}, { timestamps: true })

const Child = mongoose.model('Child', childSchema)

module.exports = Child
