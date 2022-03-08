const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User