const ObjectId = require('mongodb').ObjectID;
const commentController = {
    list: function(req, res) {
        const db = req.app.locals.db;
        db.collection('comment').find({}).toArray(function(err, item) {
            if (err) {
                throw err;
            }
            res.json({ success: true, data: item });
        })
    },

    commentCreate: function(req, res, next) {
        try {
            if (!req.body.comment || req.body.comment === '') {
                throw new Error("Comment is required");
            }

            const db = req.app.locals.db
            db.collection('test').aggregate([{ $sample: { size: 1 } }]).toArray(function(err, userResult) {
                db.collection('post').aggregate([{ $sample: { size: 1 } }]).toArray(function(err, postResult) {
                    if (err) {
                        throw err;
                    }
                    const commentData = req.body;
                    commentData.userId = userResult[0]._id;
                    commentData.postId = postResult[0]._id;
                    const db = req.app.locals.db;
                    db.collection('comment').insertOne(commentData, function(err, item) {
                        if (err) {
                            next(err);
                        }
                        res.json({
                            success: true,
                            data: item
                        })
                    })
                });
            });
        } catch (err) {
            next(err);
        }

    },

    commentUpdate: function(req, res) {
        const db = req.app.locals.db;
        db.collection('comment').updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body }, function(err, item) {
            if (err) {
                throw err;
            }
            res.json({ success: true, data: item });
        })
    },
    commentDelete: function(req, res) {
        const db = req.app.locals.db;
        db.collection('comment').deleteOne({ _id: ObjectId(req.params.id) }, function(err, item) {
            if (err) {
                throw err;
            }
            res.json({ success: true, data: item });
        });
    }
}

module.exports = commentController;