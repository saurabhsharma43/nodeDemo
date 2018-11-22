const commentModel = require('../models/comment');

const commentController = {
    createComment: function(req, res, next) {
        commentModel.create(req.body, function(err, result) {
            res.json({ success: true, data: result });
        })
    },
    list: function(req, res, next) {
        commentModel.find({})
            .populate('post', '_id')
            .populate('user', 'firstName lastName')
            .exec(function(err, result) {
                res.json({ success: true, data: result })
            });
    },
    listById: function(req, res, next) {
        commentModel.findOne({ _id: req.params.id })
            .populate('post')
            .populate('user', 'firstName')
            .exec(function(err, result) {
                res.json({ success: true, data: result })
            });
    },
    updateComment: function(req, res, next) {
        commentModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, result) {
            res.json({ success: true, data: result })
        });
    },
    deleteComment: function(req, res, next) {
        commentModel.findByIdAndUpdate({ _id: req.params.id }, function(err, result) {
            res.json({ success: true, data: result })
        });
    }
}
module.exports = commentController;