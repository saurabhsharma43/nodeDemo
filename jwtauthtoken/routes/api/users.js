const mongoose = require('mongoose');
//const passport = require('passport');
const passport = require('./../../config/passport');
const router = require('express').Router();
// const auth = require('../auth');
const jwt = require('jsonwebtoken');
const userController = require('../../controller/user');
const isAdmin = require('../../middleware/isAdmin');
//POST new user route (optional, everyone has access)
// router.post('/', (req, res, next) => {
//     console.log('body', req.body);
//     const { user } = req.body;



//     if (!user.email) {
//         return res.status(422).json({
//             errors: {
//                 email: 'is required',
//             },
//         });
//     }

//     if (!user.password) {
//         return res.status(422).json({
//             errors: {
//                 password: 'is required',
//             },
//         });
//     }

//     const finalUser = new Users(user);

//     finalUser.setPassword(user.password);

//     return finalUser.save(function(err, result) {
//             res.json({ success: true, data: result });
//         })
//         // .then(() => res.json({ success: true, user: finalUser.toAuthJSON() }));
// });
//POST new user route (optional, everyone has access)
router.post('/', userController.create);

//POST login route (optional, everyone has access)
router.post('/login', (req, res, next) => {
    console.log('login', req.body);
    const { user } = req.body;

    if (!user.userName) {
        return res.status(422).json({
            errors: {
                UserName: 'is required',
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

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        try {
            if (err || !passportUser) {
                const error = new Error('An Error occured')
                return next(error);
            }
            if (passportUser) {
                console.log('kdhush', passportUser._id)
                UserId = passportUser._id;
                const id = parseInt(UserId);

                console.log('id', id)
                const user = passportUser;

                user.token = passportUser.generateJWT();
                console.log('user', user.token)
                const tokendecoded = user.token;
                if (tokendecoded) {
                    console.log('dihsadgsiagdsgfsgfshdyfgsfj', tokendecoded);
                    try {
                        return jwt.verify(tokendecoded, 'secret', function(err, decode) {
                            if (err) {
                                console.log('error', err);
                            }
                            // return res.json({ succes2: true, decodedtoken: decode, user2: user.toAuthJSON() });
                        });
                    } catch (error) {
                        return res.status(401).json({ message: 'Auth failed' });
                    }
                    // return res.json({});
                }

            }


        } catch (error) {
            return next(error);
        }
    })(req, res, next)
});



//GET current route (required, only authenticated users have access)
router.get('/current', passport.authenticate('jwt', { session: false }), isAdmin, (req, res, next) => {
    console.log('sadasdddsadsad', req.user);
    console.log('sdasdd', res);
    return res.json({ user: req.user });

});


router.get('/', userController.list);
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdmin, userController.listById);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, userController.updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, userController.deleteUser);

module.exports = router;