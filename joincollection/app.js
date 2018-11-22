const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const assert = require('assert');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const routes = require('./routes/');
//connect to mongodb
mongoose.connect('mongodb://localhost/joincollection1');
mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
});
mongoose.Promise = global.Promise;


app.use(bodyparser.json());
app.use(cors({ origin: 'http://localhost:8081' }));
// to initialize the route
app.use('/', routes)

// error handlimg middaleware
app.use(function(err, req, res, next) {
    res.status(422).send({ error: err.message });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Dummy api on port: ${port}`); // eslint-disable-line
});
module.exports = app;