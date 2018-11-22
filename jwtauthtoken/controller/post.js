const mongoose = require('mongoose');
const PostModel = require('../models/Posts');
// const Posts = mongoose.model('Post');

const PostController = {
    create: function(req, res, next) {
        // const db = req.app.locals.db;
        //return res.json({ success1: true, data: postData });

        const postData = new PostModel(req.body);

        console.log(postData);
        postData.create(function(err, result) {
            if (err) {
                throw res.send(err);
            }
            console.log('result', result);
            res.json({ success: true, data: req.body });
        });

        // PostModel.find({})
        //     .populate('user')
        //     .exec(function(err, result) {
        //         res.json({ success: true, data: result });
        //     });
    },
    list: function(req, res, next) {
        PostModel.find({})
            .populate('user')
            .exec(function(err, result) {
                console.log('data', result);
                res.json({ success1: true, data: result });
            });
    },
    updatePost: function(req, res, next) {
        console.log('id', req.params.id);
        PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, result) {
            console.log('result', result);

            res.json({ success: true, data: req.body });
        })
    },

    listById: function(req, res) {
        PostModel.findOne({ _id: req.params.id })
            .populate('user')
            .exec(function(err, result) {
                console.log('result', result);

                res.json({ success1: true, data: result });
            });
    },
    deletePost: function(req, res, next) {
        PostModel.findOneAndDelete({ _id: req.params.id }, function(err, result) {
            if (err) {
                throw next(err);
            }
            res.json({ success3: true, data: result });
        })
    }
}

module.exports = PostController;