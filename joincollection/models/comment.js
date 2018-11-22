const mongoose = require('mongoose');
const schema = mongoose.Schema({
    post: { type: mongoose.Schema.ObjectId, ref: 'Post', required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comment: { type: String, required: true }
})

module.exports = mongoose.model('Comment', schema);