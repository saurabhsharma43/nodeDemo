const dateformat = require('dateformat');
const userModel = require('../models/user');
const UserController = {
    create: function(req, res, next) {
        let userData = new userModel(req.body);
        userData.createdAt = Date.now();
        let today = new Date();
        // to fromat date
        function GetFormattedDate() {
            var todayTime = new Date();
            var month = todayTime.getMonth() + 1;
            var day = todayTime.getDate();
            var year = todayTime.getFullYear();
            return month + "/" + day + "/" + year;
        }
        userData.save(function(err, result) {
            if (err) {
                throw next(err);
            }
            // if (err) {
            //     throw res.send({ error: err.errors.userName.message });

            // }
            //  result.createdAt = dateformat(today.toDateString());
            // console.log('sdfsdfsdfsdsdfsdfsdf', GetFormattedDate());
            // userData = userData.toJSON();
            // userData.createdAt = GetFormattedDate();
            result = result.toJSON();
            result.createdAt = dateformat(today.toISOString());
            // result.createdAt = GetFormattedDate();
            console.log('gdhsgdd', userData.createdAt);

            res.json({ success: true, data: result });
        });

    },
    list: function(req, res, next) {
        userModel.find({}, function(err, result) {
            res.json({ success: true, data: result });
        });
    },
    listById: function(req, res, next) {
        userModel.findOne({ _id: req.params.id }, function(err, result) {
            res.json({ success: true, data: result });
        });
    },
    updateUser: function(req, res, next) {
        const userData = req.body;
        userData.updatedAt = Date.now();
        userModel.findByIdAndUpdate({ _id: req.params.id }, userData, { new: true }, function(err, result) {
            res.json({ success: true, data: result });
        });
    },
    deleteUser: function(req, res, next) {
        userModel.findByIdAndDelete({ _id: req.params.id }, function(err, result) {
            res.json({ success: true, data: result });
        });
    }
}

module.exports = UserController;