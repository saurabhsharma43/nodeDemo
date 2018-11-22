const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    userName: { type: String, required: true },
    email: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date },
    contactNumber: { type: String },
    address: {
        type: { type: String },
        street: { type: String },
        city: { type: String },
        zip: { type: String }
    },
})
module.exports = mongoose.model('User', schema)