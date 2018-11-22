const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'Users', required: true },
    title: { type: String, required: true },
    // createdAt: { type: Date },
    // updatedat: { type: Date },
    likeCount: { type: Number },
    body: { type: String, required: [true, 'body is required'] }

});
module.exports = mongoose.model('Post', schema);