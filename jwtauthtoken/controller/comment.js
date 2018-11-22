const commentModel = require('../models/Comments');

const commentController = {
    createComment: function(req, res, next) {
        console.log("TestVar", req.testVar);
        commentModel.create(req.body, function(err, result) {
            res.json({ success: true, data: result });
        })
    },
    list: function(req, res, next) {
        commentModel.find({})
            .populate('post', 'title')
            .populate('user', 'name.firstName name.lastName')
            .exec(function(err, result) {
                res.json({ success: true, data: result })
            });
    },
    listById: function(req, res, next) {
        commentModel.findOne({ _id: req.params.id })
            .populate('post')
            .populate('user', 'name.firstName')
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