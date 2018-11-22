const mongoose = require('mongoose');
const user = require('../models/Users');


const regitrationController = {
    signUp: function(req, res, next) {
        const userData = req.body;
        user.create(userData, function(err, result) {
            req.json({ success: true, data: result });
        })
    }
}