const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
    imageURL: {
        type: String,
        required:false
    },
    name: {
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    }
}, { timestamps: true })

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery
