const mongoose = require('mongoose');
const dateformat = require('dateformat');
const userModel = require('../models/Users');
const Users = mongoose.model('User');


const UserController = {
    create: function(req, res, next) {
        // let userData = new userModel(req.body);
        // userData.createdAt = Date.now();
        let today = new Date();

        const { user } = req.body;
        console.log('user', user);
        if (!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }
        // to check if email already registered
        userModel.findOne({ userName: user.userName }, function(err, exitingUser) {

            if (err) {
                return next(err);
            }
            if (exitingUser) {
                return res.status(422).send({ error: 'That userName is already in use.' });
            }


            const finalUser = new Users(user);
            finalUser.setPassword(user.password);
            if (!exitingUser) {
                finalUser.save(function(err, result) {
                    console.log('fgdfgdgdg');
                    if (err) {
                        return res.status(422).send({ error: 'email Or pass is not correct' });
                    }
                    res.json({
                        success: true,
                        data: result,
                        user: finalUser.toAuthJSON()
                    });
                })
            }

            // .then(() => res.json({ success: true, user: finalUser.toAuthJSON() }));
        })
    },
    // to fromat date
    // function GetFormattedDate() {
    //     var todayTime = new Date();
    //     var month = todayTime.getMonth() + 1;
    //     var day = todayTime.getDate();
    //     var year = todayTime.getFullYear();
    //     return month + "/" + day + "/" + year;
    // }
    // userData.save(function(err, result) {
    //     if (err) {
    //         throw next(err);
    //     }
    //     // if (err) {
    //     //     throw res.send({ error: err.errors.userName.message });

    //     // }
    //     //  result.createdAt = dateformat(today.toDateString());
    //     // console.log('sdfsdfsdfsdsdfsdfsdf', GetFormattedDate());
    //     // userData = userData.toJSON();
    //     // userData.createdAt = GetFormattedDate();
    //     result = result.toJSON();
    //     result.createdAt = dateformat(today.toISOString());
    //     // result.createdAt = GetFormattedDate();
    //     console.log('gdhsgdd', userData.createdAt);
    //     console.log('data', result);
    //     res.json({ success: true, data: result });
    // });


    list: function(req1, res, next) {
        // not to send in thr response { _id: 0, hash: 0, salt: 0, __v: 0 },
        userModel.find({}, { _id: 0, hash: 0, salt: 0, __v: 0 },

            // 'name.firstName name.lastName userName email',
            function(err, result) {

                res.send(result);
            });
    },
    listById: function(req, res, next) {
        const id = mongoose.Types.ObjectId(req.params.id);
        userModel.findOne({ _id: id }, function(err, result) {
            res.json({ success1: true, data: result });
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