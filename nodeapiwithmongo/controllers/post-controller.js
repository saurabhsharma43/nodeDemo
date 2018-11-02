const ObjectID = require('mongodb').ObjectID;
const postController = {
    list: function(req, res) {
        const db = req.app.locals.db;
        db.collection('post').find({}).toArray(function(err, item) {
            res.json({ success: true, data: item });
        });
    },

    postCreate: function(req, res) {
        const db = req.app.locals.db;
        db.collection('test').aggregate([{ $sample: { size: 1 } }]).toArray(function(err, result) {
            const postData = req.body;
            postData.userId = result[0]._id;
            db.collection('post').insertOne(postData, function(err, item) {
                if (err) {
                    throw err;
                }
                res.json({ success: true, data: item, body: req.body });
            })
        })

    },

    postUpdate: function(req, res) {
        const db = req.app.locals.db;
        db.collection('post').updateOne({ _id: ObjectID(req.params.id) }, { $set: req.body }, function(err, item) {
            if (err) {
                throw err;
            }
            res.json({ success: true, data: item, body: req.body, id: req.params._id });
        })
    },
    postDelete: function(req, res) {
        const db = req.app.locals.db;
        db.collection('post').deleteOne({ _id: req.params.id }, function(err, item) {
            if (err) {
                throw err;
            }
            res.json({ success: true, data: item });
        })
    }

};
module.exports = postController;