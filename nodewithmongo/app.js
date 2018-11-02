const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
ObjectId = require('mongodb').ObjectID;
var faker = require('faker');
var userId;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'nodewithmongodb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);


    insertDocuments(db, function() {

    });

    insertPostData(db, function() {

    });

    InsertedComment(db, function() {

    })
});


const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    for (let i = 0; i < 100; i++) {
        let userData = { "firstName": faker.name.firstName(), "lastName": faker.name.lastName(), "Email": faker.internet.email(), "Title": faker.name.title() };
        db.collection('documents').insertOne(userData, function(err, userInfo) {
            //console.log(userInfo);
        });
    }

}

const insertPostData = function(db, callback) {

    for (let i = 0; i <= 50; i++) {
        db.collection('documents').aggregate(
            [{ $sample: { size: 1 } }]
        ).toArray(function(err, result) {
            const userData = { "Title": faker.name.title(), body: 'body' + i.toString(), userId: result[0]._id };
            db.collection('postData').insertOne(userData, function(err, result) {
                if (err) {
                    throw err;
                }
                //console.log("result", result);
            });
        });
    }
}

const InsertedComment = function(db, callback) {
    // console.log("Inserted 50 comments into the collection");

    // Inserting comment
    for (let i = 0; i <= 100; i++) {
        db.collection('documents').aggregate([{ $sample: { size: 1 } }]).toArray(function(err, userInfo) {
            if (err) {
                throw err;
            }
            db.collection('postData').aggregate([{ $sample: { size: 1 } }]).toArray(function(err, postInfo) {
                if (err) {
                    throw err;
                }
                const commentData = { "comment": faker.lorem.paragraph(), userId: userInfo[0]._id, postId: postInfo[0]._id };
                db.collection("commentData").insertOne(commentData, function(err, commentInfo) {
                    //console.log("commentInfo", commentInfo);
                });
            })
        });
    }
}