const ObjectID = require('mongodb').ObjectID;
// var BSON = require('mongodb').BSONPure;

const UserModel = require('../model/user');


const userController = {
    list: function(req, res, next) {
        const db = req.app.locals.db;
        console.log(db);
        db.collection('test').find({}).toArray(function(err, items) {
            if (err) throw err;
            res.json({ success: true, data: items });
        });
    },
    create: function(req, res, next) {
        const db = req.app.locals.db;
        db.collection('test').insertOne(req.body, function(err, item) {
            res.json({ success: true, data: item });
        });
    },

    update: async function(req, res, next) {

        const db = req.app.locals.db;
        await db.collection('test').updateOne({ _id: ObjectID(req.params.id) }, { $set: req.body }, function(err, item) {
            if (err) {
                throw err;
            }
            res.json({ success: true, data: item, body: req.body, id: req.params.id });
            console.log('item', item);
        });
    },

    deleteUser: function(req, res, next) {
        const db = req.app.locals.db;
        db.collection('test').deleteOne({ _id: ObjectID(req.params.id) }, function(err, item) {
            if (err) {
                throw err;
            }
            res.json({ success: true, data: item });
        })
    }
};
module.exports = userController;