const mongoose = require('mongoose');

const ipAddressSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    device: {
        type: String,
        default: "Unknown"
    },
    duration: { 
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const IpAddress = mongoose.model('IpAddress', ipAddressSchema);

module.exports = IpAddress;
