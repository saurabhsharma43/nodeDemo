const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const assert = require('assert');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const routes = require('./routes/');
// Connection URL
const url = 'mongodb://localhost:27017';


// Database Name
const dbName = 'nodeapiwithmongodb';


MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    app.locals.db = db;
});

// app.get("/", function(req, res, next) {
//     //console.log(req.app.locals.db);
//     const db = req.app.locals.db;
//     //     db.collection("test").insert({ firstName: 'Talib3', lastName: 'Aziz3' }, function(err, result) {
//     //         res.json({ success: true, data: result });
//     //     });

// });
app.use(bodyparser.json({ extended: true, limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
// app.use(function(req, res, next) {
//     if (!req.body.token || req.body.token === '') {
//         const error = new Error("Token not found");
//         //error.statusCode = 400;
//         throw error;
//     }
//     next();
// })
app.use("/", routes);
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});
// error handlimg middaleware
app.use(function(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "";
    res.status(statusCode).send({ success: false, error: message });
});

app.listen(3000, function() {
    console.log('listening on 300');
});

module.exports = app;